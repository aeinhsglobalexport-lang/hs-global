import type { Handler } from '@netlify/functions';

// Simple verify that matches provided code with otpToken (temporary approach)
const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const code = String(body.code || '').trim();
    const otpToken = String(body.otpToken || '').trim();
    const valid = code && otpToken && code === otpToken;

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: valid })
    };
  } catch {
    return { statusCode: 500, body: JSON.stringify({ ok: false }) };
  }
};

export { handler };






