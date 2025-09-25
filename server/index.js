/* Simple Express server for Razorpay order creation and signature verification */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Razorpay = require('razorpay');
require('dotenv').config();
const { insertOrder, updateOrderStatus, insertPayment } = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || '';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || '';

const crypto = require('crypto');

const rzp = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});

app.get('/api/health', (_req, res) => res.json({ ok: true }));

// Create order
app.post('/api/razorpay/order', async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt } = req.body || {};
    if (!amount || amount <= 0) return res.status(400).json({ error: 'Invalid amount' });
    const order = await rzp.orders.create({
      amount: Math.round(amount), // in paise
      currency,
      receipt: receipt || `rcpt_${Date.now()}`,
    });
    // persist order
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
    console.error('Order create failed', e);
    return res.status(500).json({ error: 'Failed to create order' });
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


