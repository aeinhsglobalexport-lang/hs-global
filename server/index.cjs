/* Simple Express server for Razorpay order creation and signature verification (CommonJS) */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Razorpay = require('razorpay');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', 'my.env') });
const { insertOrder, updateOrderStatus, insertPayment } = require('./db.cjs');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || '';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || '';

// Note: Razorpay SDK sometimes throws normalizeError issues in certain versions.
// We'll use the REST API via fetch for order creation to avoid SDK edge cases.

app.get('/api/health', (_req, res) => res.json({ ok: true }));

// --- Simple in-memory OTP store (for demo). For production, use Redis/DB.
const otpStore = new Map();

// Send OTP via Twilio SMS
app.post('/api/otp/send', async (req, res) => {
  try {
    const { phone } = req.body || {};
    if (!phone) return res.status(400).json({ ok: false, error: 'Missing phone' });

    // Generate 6-digit OTP
    const code = ('' + Math.floor(100000 + Math.random() * 900000));
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes
    otpStore.set(phone, { code, expiresAt, attempts: 0 });

    const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM } = process.env;
    if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_FROM) {
      console.warn('Twilio env not configured. Logging OTP only.');
      console.log(`[OTP] ${phone} => ${code}`);
      return res.json({ ok: true, note: 'log-only (configure Twilio env to send)', ttlMs: 5 * 60 * 1000, otpToken: code });
    }

    let twilioLib;
    try {
      twilioLib = require('twilio');
    } catch (err) {
      console.warn('Twilio SDK not installed. Logging OTP only.');
      console.log(`[OTP] ${phone} => ${code}`);
      return res.json({ ok: true, note: 'log-only (install twilio to send)', ttlMs: 5 * 60 * 1000, otpToken: code });
    }

    const twilio = twilioLib(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
    try {
      const msg = await twilio.messages.create({
        body: `Your verification code is ${code}. It expires in 5 minutes.`,
        from: TWILIO_FROM,
        to: `+${String(phone).replace(/\D/g, '')}`,
      });
      return res.json({ ok: true, sid: msg.sid, ttlMs: 5 * 60 * 1000, otpToken: code });
    } catch (err) {
      // Handle Twilio trial/unverified phone gracefully for development
      const codeStr = err && (err.code || err.status);
      if (codeStr === 21608 || codeStr === 400) {
        console.warn('Twilio trial/unverified destination. Proceeding in log-only mode.');
        console.log(`[OTP] ${phone} => ${code}`);
        return res.json({ ok: true, note: 'twilio_trial_unverified', ttlMs: 5 * 60 * 1000, otpToken: code, dev: process.env.NODE_ENV !== 'production' ? { code } : undefined });
      }
      // Any other send error: in development, log+proceed; in production, fail
      console.error('Twilio send error:', err);
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Dev mode fallback: logging OTP and returning ok.');
        console.log(`[OTP] ${phone} => ${code}`);
        return res.json({ ok: true, note: 'twilio_send_error_dev_fallback', ttlMs: 5 * 60 * 1000, otpToken: code, dev: { code } });
      }
      throw err;
    }
  } catch (e) {
    console.error('OTP send failed', e);
    if (process.env.NODE_ENV !== 'production') {
      // As a last resort in dev, respond ok so the flow is testable
      return res.json({ ok: true, note: 'dev_fallback', ttlMs: 5 * 60 * 1000, otpToken: code || '000000' });
    }
    return res.status(500).json({ ok: false, error: 'OTP send failed' });
  }
});

// Verify OTP
app.post('/api/otp/verify', (req, res) => {
  try {
    const { phone, code } = req.body || {};
    if (!phone || !code) return res.status(400).json({ ok: false, error: 'Missing phone/code' });
    const entry = otpStore.get(phone);
    if (!entry) return res.status(400).json({ ok: false, error: 'Code not found' });
    if (Date.now() > entry.expiresAt) {
      otpStore.delete(phone);
      return res.status(400).json({ ok: false, error: 'Code expired' });
    }
    entry.attempts += 1;
    if (entry.attempts > 5) {
      otpStore.delete(phone);
      return res.status(429).json({ ok: false, error: 'Too many attempts' });
    }
    if (String(code) !== String(entry.code)) {
      return res.status(400).json({ ok: false, error: 'Invalid code' });
    }
    otpStore.delete(phone);
    return res.json({ ok: true });
  } catch (e) {
    console.error('OTP verify failed', e);
    return res.status(500).json({ ok: false, error: 'OTP verify failed' });
  }
});

// Send email using SMTP via Nodemailer (configure env vars to enable)
app.post('/api/send-email', async (req, res) => {
  try {
    const { to, subject, data } = req.body || {};
    if (!to) return res.status(400).json({ ok: false, error: 'Missing recipient' });

    // Lazy-require nodemailer to avoid startup failure if not installed
    let nodemailer;
    try { nodemailer = require('nodemailer'); } catch { nodemailer = null; }

    if (!nodemailer) {
      console.warn('Nodemailer not installed. Falling back to log-only email.');
      console.log('Email request (log-only):', { to, subject, data });
      return res.json({ ok: true, note: 'log-only (install nodemailer to send)' });
    }

    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } = process.env;
    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
      console.warn('SMTP env not configured. Falling back to log-only email.');
      console.log('Email request (log-only):', { to, subject, data });
      return res.json({ ok: true, note: 'log-only (configure SMTP env to send)' });
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: SMTP_SECURE === 'true' || Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const html = `
      <div style="font-family:Arial,Helvetica,sans-serif;">
        <h2 style="margin:0 0 12px;">${subject || 'New Submission'}</h2>
        <table cellpadding="6" cellspacing="0" border="0" style="border-collapse:collapse;">
          ${Object.entries(data || {}).map(([k,v]) => `<tr><td style="font-weight:bold;">${k}</td><td>${String(v)}</td></tr>`).join('')}
        </table>
      </div>
    `;

    const info = await transporter.sendMail({
      from: SMTP_USER,
      to,
      subject: subject || 'New Submission',
      text: JSON.stringify(data || {}, null, 2),
      html,
    });

    return res.json({ ok: true, messageId: info.messageId });
  } catch (e) {
    console.error('Email send failed', e);
    return res.status(500).json({ ok: false, error: 'Email send failed' });
  }
});

// Send WhatsApp message via Meta Cloud API (configure env vars to enable)
app.post('/api/send-whatsapp', async (req, res) => {
  try {
    const { to, text } = req.body || {};
    const WA_TOKEN = process.env.WHATSAPP_TOKEN || '';
    const WA_PHONE_ID = process.env.WHATSAPP_PHONE_NUMBER_ID || '';
    const defaultTo = process.env.WHATSAPP_TO || '';

    if (!to && !defaultTo) return res.status(400).json({ ok: false, error: 'Missing recipient' });
    if (!WA_TOKEN || !WA_PHONE_ID) {
      console.warn('WhatsApp Cloud API env not configured. Logging only.');
      console.log('WhatsApp request (log-only):', { to: to || defaultTo, text });
      return res.json({ ok: true, note: 'log-only (configure WhatsApp env to send)' });
    }

    const url = `https://graph.facebook.com/v20.0/${WA_PHONE_ID}/messages`;
    const payload = {
      messaging_product: 'whatsapp',
      to: (to || defaultTo).replace(/\D/g, ''),
      type: 'text',
      text: { body: String(text || '').slice(0, 4000) },
    };

    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WA_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const data = await resp.json();
    if (!resp.ok) {
      const msg = data && data.error && data.error.message ? data.error.message : `HTTP ${resp.status}`;
      throw new Error(msg);
    }
    return res.json({ ok: true, data });
  } catch (e) {
    console.error('WhatsApp send failed', e);
    return res.status(500).json({ ok: false, error: 'WhatsApp send failed' });
  }
});

// Create order
app.post('/api/razorpay/order', async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt } = req.body || {};
    if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
      return res.status(500).json({ error: 'Server payment keys are not configured' });
    }
    // Razorpay minimum amount is 100 paise (₹1.00)
    if (!amount || amount < 100) return res.status(400).json({ error: 'Invalid amount (min ₹1.00)' });
    const auth = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString('base64');
    const resp = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: Math.round(amount),
        currency,
        receipt: receipt || `rcpt_${Date.now()}`,
      }),
    });
    const order = await resp.json();
    if (!resp.ok) {
      const msg = order && order.error && order.error.description ? order.error.description : `HTTP ${resp.status}`;
      throw new Error(msg);
    }
    insertOrder({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt || null,
      status: order.status || 'created',
      created_at: Date.now(),
    });
    return res.json({ order, keyId: RAZORPAY_KEY_ID });
  } catch (e) {
    const apiErr = e && e.error ? e.error : null;
    const msg = apiErr && apiErr.description ? apiErr.description : (e && e.message ? e.message : 'Failed to create order');
    console.error('Order create failed', e);
    return res.status(500).json({ error: msg });
  }
});

// Verify payment signature
app.post('/api/razorpay/verify', (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body || {};
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ valid: false, error: 'Missing params' });
    }
    const payload = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac('sha256', RAZORPAY_KEY_SECRET)
      .update(payload)
      .digest('hex');
    const isValid = expectedSignature === razorpay_signature;
    insertPayment({ id: razorpay_payment_id, order_id: razorpay_order_id, signature: razorpay_signature, status: isValid ? 'verified' : 'invalid', created_at: Date.now() });
    if (isValid) updateOrderStatus(razorpay_order_id, 'paid');
    return res.json({ valid: isValid });
  } catch (e) {
    console.error('Verify failed', e);
    return res.status(500).json({ valid: false, error: 'Verification failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});


