const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');

// Load environment variables
if (fs.existsSync('.env')) {
  require('dotenv').config({ path: path.join(__dirname, '.env') });
} else {
  console.warn('.env file not found, using environment variables');
}

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from dist directory
app.use(express.static(path.join(__dirname, 'dist')));

const PORT = process.env.PORT || 3000;

// Razorpay configuration
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || '';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || '';

// Simple in-memory OTP store (for demo). For production, use Redis/DB.
const otpStore = new Map();

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ ok: true, timestamp: new Date().toISOString() });
});

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
      const fallbackCode = code || '123456';
      console.log(`[DEV FALLBACK] OTP for ${phone}: ${fallbackCode}`);
      return res.json({ ok: true, note: 'dev_fallback', ttlMs: 5 * 60 * 1000, otpToken: fallbackCode });
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

    const transporter = nodemailer.createTransporter({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT, 10),
      secure: SMTP_SECURE === 'true',
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const info = await transporter.sendMail({
      from: SMTP_USER,
      to,
      subject: subject || 'New Message',
      text: JSON.stringify(data, null, 2),
      html: `<pre>${JSON.stringify(data, null, 2)}</pre>`,
    });

    return res.json({ ok: true, messageId: info.messageId });
  } catch (e) {
    console.error('Email send failed', e);
    return res.status(500).json({ ok: false, error: 'Email send failed' });
  }
});

// Razorpay order creation
app.post('/api/create-order', async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt } = req.body;
    
    if (!amount) {
      return res.status(400).json({ ok: false, error: 'Amount is required' });
    }

    if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
      return res.status(500).json({ ok: false, error: 'Razorpay credentials not configured' });
    }

    // Use Razorpay REST API directly to avoid SDK issues
    const auth = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString('base64');
    
    const orderData = {
      amount: parseInt(amount) * 100, // Convert to paise
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
    };

    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    const order = await response.json();

    if (!response.ok) {
      throw new Error(order.error?.description || 'Failed to create order');
    }

    res.json({ ok: true, order });
  } catch (error) {
    console.error('Order creation failed:', error);
    res.status(500).json({ ok: false, error: error.message });
  }
});

// Razorpay payment verification
app.post('/api/verify-payment', (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ ok: false, error: 'Missing payment details' });
    }

    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      res.json({ ok: true, message: 'Payment verified successfully' });
    } else {
      res.status(400).json({ ok: false, error: 'Invalid signature' });
    }
  } catch (error) {
    console.error('Payment verification failed:', error);
    res.status(500).json({ ok: false, error: 'Payment verification failed' });
  }
});

// Catch-all handler: send back React's index.html file for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Serving static files from: ${path.join(__dirname, 'dist')}`);
});

module.exports = app;
