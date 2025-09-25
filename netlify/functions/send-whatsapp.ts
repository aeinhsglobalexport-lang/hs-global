import type { Handler } from '@netlify/functions';

let twilioClient: any = null;
const ensureTwilio = () => {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  if (sid && token) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const twilio = require('twilio');
    twilioClient = twilio(sid, token);
  }
};

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  try {
    const body = JSON.parse(event.body || '{}');
    const to = String(body.to || '').trim();
    const text = String(body.text || '').trim();
    if (!to || !text) {
      return { statusCode: 400, body: JSON.stringify({ ok: false, error: 'Missing to/text' }) };
    }

    ensureTwilio();
    try {
      if (twilioClient && process.env.TWILIO_WHATSAPP_FROM) {
        await twilioClient.messages.create({
          to: `whatsapp:${to.startsWith('whatsapp:') ? to.slice(9) : to}`,
          from: process.env.TWILIO_WHATSAPP_FROM,
          body: text,
        });
      } else {
        console.log('[send-whatsapp] Fallback log-only:', { to, text });
      }
    } catch (e) {
      console.log('[send-whatsapp] send failed, fallback log-only:', (e as Error).message);
      console.log('[send-whatsapp] message:', { to, text });
    }
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch {
    return { statusCode: 500, body: JSON.stringify({ ok: false }) };
  }
};

export { handler };






