import type { Handler } from '@netlify/functions';

// Optional Twilio import is dynamic to avoid bundling issues when not configured
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
    const phone = String(body.phone || '').trim();
    if (!/^\+?\d{10,15}$/.test(phone)) {
      return { statusCode: 400, body: JSON.stringify({ ok: false, error: 'Invalid phone' }) };
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Try Twilio if configured; otherwise, log-only fallback
    ensureTwilio();
    try {
      if (twilioClient && process.env.TWILIO_FROM) {
        await twilioClient.messages.create({
          to: phone,
          from: process.env.TWILIO_FROM,
          body: `Your verification code is ${otp}`,
        });
      } else {
        console.log('[send-otp] Fallback OTP (no Twilio configured):', { phone, otp });
      }
    } catch (e) {
      console.log('[send-otp] Twilio send failed, falling back to log-only:', (e as Error).message);
      console.log('[send-otp] OTP:', { phone, otp });
    }

    // Return the OTP hash/token for client verify flow (temporary simple approach)
    // For simplicity, return otpToken as the code itself; in production, use HMAC or store in KV/DB
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: true, otpToken: otp }),
    };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ ok: false, error: 'Server error' }) };
  }
};

export { handler };






