import type { Handler } from '@netlify/functions';

// Minimal webhook receiver stub. Validate signatures with your PSP before trusting.
const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };
  try {
    const body = event.body || '';
    // TODO: verify signature from headers with your PSP secret
    console.log('[payment-webhook] received:', body);
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (e) {
    console.log('[payment-webhook] error:', (e as Error).message);
    return { statusCode: 500, body: JSON.stringify({ ok: false }) };
  }
};

export { handler };






