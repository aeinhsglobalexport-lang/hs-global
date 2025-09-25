import type { Handler } from '@netlify/functions';

// Example: Create a payment order (Razorpay-like). Replace with actual SDK if needed.
const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };
  try {
    const body = JSON.parse(event.body || '{}');
    const amount = Number(body.amount || 0);
    if (!amount || amount < 1) return { statusCode: 400, body: JSON.stringify({ ok: false, error: 'Invalid amount' }) };
    // Here you would call Razorpay or your PSP to create an order and return order_id.
    const mockOrderId = 'order_' + Math.random().toString(36).slice(2, 10);
    return { statusCode: 200, body: JSON.stringify({ ok: true, order_id: mockOrderId, currency: 'INR', amount }) };
  } catch {
    return { statusCode: 500, body: JSON.stringify({ ok: false }) };
  }
};

export { handler };






