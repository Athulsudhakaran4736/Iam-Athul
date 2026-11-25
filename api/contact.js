import { profile } from '../src/content.js';

const limits = { name: 100, email: 254, subject: 150, message: 3000 };
const emailPattern = /^[^\s@<>(),;:"\\]+@[^\s@<>(),;:"\\]+\.[^\s@<>(),;:"\\]+$/;

function respond(status, body, headers = {}) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store', ...headers } });
}

export default {
  async fetch(request) {
    if (request.method !== 'POST') {
      return respond(405, { error: 'Method not allowed.' }, { Allow: 'POST' });
    }
    if (request.headers.get('sec-fetch-site') === 'cross-site') {
      return respond(403, { error: 'Cross-site requests are rejected.' });
    }
    if (request.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !== 'application/json') {
      return respond(415, { error: 'Expected JSON.' });
    }

    let data;
    try {
      data = await request.json();
    } catch {
      return respond(400, { error: 'Invalid JSON.' });
    }

    const values = {};
    for (const [field, maxLength] of Object.entries(limits)) {
      const value = data?.[field];
      if (typeof value !== 'string' || value.length > maxLength || !value.trim()) {
        return respond(400, { error: 'Check your contact form fields.' });
      }
      values[field] = value.trim();
    }
    const { name, email, subject, message } = values;
    if (!emailPattern.test(email) || /[\p{Cc}\p{Zl}\p{Zp}]/u.test(subject)) {
      return respond(400, { error: 'Check your email address and subject.' });
    }

    const apiKey = process.env.RESEND_API_KEY?.trim();
    if (!apiKey) {
      console.error('Portfolio contact email is missing RESEND_API_KEY.');
      return respond(503, { error: 'Contact delivery is unavailable.' });
    }

    try {
      const delivery = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + apiKey, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL?.trim() || 'Portfolio <onboarding@resend.dev>',
          to: [process.env.CONTACT_TO_EMAIL?.trim() || profile.email],
          reply_to: email,
          subject: '[Portfolio] ' + subject,
          text: 'Name: ' + name + '\nEmail: ' + email + '\n\n' + message,
        }),
        signal: AbortSignal.timeout(10000),
      });
      if (delivery.ok && (await delivery.json()).id) return respond(200, { sent: true });
      console.error('Portfolio contact provider rejected delivery.', delivery.status);
    } catch {
      console.error('Portfolio contact provider request failed.');
    }
    return respond(502, { error: 'Contact delivery failed.' });
  },
};
