// Contact form: validation, spam traps, the email Resend receives, and the
// HTTP handler. Run with `npm test` (node --test, no extra dependencies).
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { buildEmail, handle, parseSubmission } from '../api/_contact.js';

const NOW = 1_800_000_000_000;
const valid = {
  name: 'Ana Pérez',
  email: 'ana@empresa.es',
  company: 'Talleres Pérez',
  needs: ['ia', 'web'],
  budget: '5-15k',
  timing: 'trimestre',
  message: 'El técnico anota la avería en papel y por la noche alguien la pasa al ERP.',
  consent: true,
  website: '',
  t: NOW - 20_000,
  'cf-turnstile-response': 'token-ok',
};
const env = {
  RESEND_API_KEY: 're_test',
  CONTACT_TO: 'buzon@example.com',
  CONTACT_FROM: 'Veodar <web@veodar.com>',
  TURNSTILE_SECRET: 'ts_secret',
  TURNSTILE_HOSTNAMES: 'veodar.com',
};

const post = (body, { form = false, origin = 'https://veodar.com' } = {}) => {
  const headers = { origin, 'x-forwarded-for': '203.0.113.7, 10.0.0.1' };
  let payload;
  if (form) {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(body)) {
      if (Array.isArray(value)) value.forEach((v) => params.append(key, v));
      else if (value === true) params.append(key, 'on');
      else if (value !== false && value !== undefined) params.append(key, String(value));
    }
    payload = params.toString();
    headers['content-type'] = 'application/x-www-form-urlencoded';
  } else {
    payload = JSON.stringify(body);
    headers['content-type'] = 'application/json';
  }
  return new Request('https://veodar.com/api/contacto/', { method: 'POST', headers, body: payload });
};

const SITEVERIFY = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const PASS = { success: true, action: 'contacto', hostname: 'veodar.com', 'error-codes': [] };

// Cloudflare's siteverify in front of any Resend stand-in: answers with `verdict`
// (an object, or a function of the request) and records what it was asked.
const withTurnstile = (resendImpl, verdict = PASS, checks = []) => async (url, init) => {
  if (url !== SITEVERIFY) return resendImpl(url, init);
  checks.push(Object.fromEntries(new URLSearchParams(init.body)));
  const answer = typeof verdict === 'function' ? verdict() : verdict;
  if (answer instanceof Error) throw answer;
  return new Response(JSON.stringify(answer), { status: 200 });
};

// A stand-in for Resend that records what it was sent (Turnstile passes unless told otherwise).
const resend = (status = 200, verdict = PASS) => {
  const calls = [];
  const checks = [];
  const fetchImpl = withTurnstile(
    async (url, init) => {
      calls.push({ url, init, body: JSON.parse(init.body) });
      return new Response(JSON.stringify(status < 300 ? { id: 'email_1' } : { message: 'boom' }), { status });
    },
    verdict,
    checks,
  );
  return { calls, checks, fetchImpl };
};

describe('parseSubmission', () => {
  it('accepts a complete message and normalises it', () => {
    const result = parseSubmission({ ...valid, name: '  Ana Pérez  ', email: ' ANA@Empresa.es ' }, NOW);
    assert.equal(result.ok, true);
    assert.equal(result.data.name, 'Ana Pérez');
    assert.equal(result.data.email, 'ana@empresa.es');
    assert.deepEqual(result.data.needs, ['ia', 'web']);
  });

  it('names every field that is wrong', () => {
    const result = parseSubmission({ ...valid, name: 'A', email: 'no-es-un-correo', message: 'corto', needs: [], consent: false }, NOW);
    assert.equal(result.ok, false);
    assert.deepEqual(Object.keys(result.errors).sort(), ['consent', 'email', 'message', 'name', 'needs']);
  });

  it('drops options that are not on the list', () => {
    const result = parseSubmission({ ...valid, needs: ['ia', 'hackear'], budget: 'un-millon', timing: 'ayer' }, NOW);
    assert.equal(result.ok, true);
    assert.deepEqual(result.data.needs, ['ia']);
    assert.equal(result.data.budget, '');
    assert.equal(result.data.timing, '');
  });

  it('takes a single need as a string, as a plain form post sends it', () => {
    const result = parseSubmission({ ...valid, needs: 'movil', consent: 'on' }, NOW);
    assert.equal(result.ok, true);
    assert.deepEqual(result.data.needs, ['movil']);
  });

  it('flags the honeypot and a form sent faster than a person can type', () => {
    assert.equal(parseSubmission({ ...valid, website: 'https://spam.example' }, NOW).spam, true);
    assert.equal(parseSubmission({ ...valid, t: NOW - 800 }, NOW).spam, true);
    assert.equal(parseSubmission({ ...valid, t: undefined }, NOW).spam, false);
  });
});

describe('buildEmail', () => {
  it('sends to every inbox listed in CONTACT_TO, comma separated', () => {
    const parsed = parseSubmission(valid, NOW);
    const email = buildEmail(parsed.data, { ...env, CONTACT_TO: ' uno@example.com, dos@example.com ,' });
    assert.deepEqual(email.to, ['uno@example.com', 'dos@example.com']);
  });

  it('goes to the inbox, answers to the sender and escapes what they typed', () => {
    const parsed = parseSubmission({ ...valid, message: 'Hola <script>alert(1)</script> & adiós, esto es largo de sobra.' }, NOW);
    const email = buildEmail(parsed.data, env);
    assert.deepEqual(email.to, ['buzon@example.com']);
    assert.equal(email.from, 'Veodar <web@veodar.com>');
    assert.equal(email.reply_to, 'ana@empresa.es');
    assert.match(email.subject, /Ana Pérez/);
    assert.match(email.subject, /Automatización con IA/);
    assert.ok(!email.html.includes('<script>'));
    assert.match(email.html, /&lt;script&gt;/);
    assert.match(email.text, /5\.000 – 15\.000 €/);
  });
});

describe('handle', () => {
  it('sends a valid JSON message through Resend and answers ok', async () => {
    const { calls, fetchImpl } = resend();
    const response = await handle(post(valid), env, { fetchImpl, now: NOW });
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { ok: true });
    assert.equal(calls.length, 1);
    assert.equal(calls[0].url, 'https://api.resend.com/emails');
    assert.equal(calls[0].init.headers.Authorization, 'Bearer re_test');
    assert.equal(calls[0].body.reply_to, 'ana@empresa.es');
  });

  it('returns the field errors and sends nothing', async () => {
    const { calls, fetchImpl } = resend();
    const response = await handle(post({ ...valid, email: 'mal' }), env, { fetchImpl, now: NOW });
    assert.equal(response.status, 400);
    const body = await response.json();
    assert.equal(body.ok, false);
    assert.ok(body.errors.email);
    assert.equal(calls.length, 0);
  });

  it('answers ok to a bot but sends nothing', async () => {
    const { calls, fetchImpl } = resend();
    const response = await handle(post({ ...valid, website: 'x' }), env, { fetchImpl, now: NOW });
    assert.equal(response.status, 200);
    assert.equal(calls.length, 0);
  });

  it('redirects a plain form post back to the page', async () => {
    const { calls, fetchImpl } = resend();
    const ok = await handle(post(valid, { form: true }), env, { fetchImpl, now: NOW });
    assert.equal(ok.status, 303);
    assert.equal(ok.headers.get('location'), '/contacto/#enviado');
    assert.equal(calls.length, 1);
    const bad = await handle(post({ ...valid, message: 'x' }, { form: true }), env, { fetchImpl, now: NOW });
    assert.equal(bad.status, 303);
    assert.equal(bad.headers.get('location'), '/contacto/#revisar');
    const down = await handle(post(valid, { form: true }), { ...env, RESEND_API_KEY: '' }, { fetchImpl, now: NOW });
    assert.equal(down.headers.get('location'), '/contacto/#no-enviado');
  });

  it('refuses an origin it cannot read', async () => {
    const response = await handle(post(valid, { origin: 'null' }), env, { now: NOW });
    assert.equal(response.status, 403);
  });

  it('refuses other methods, other sites and oversized bodies', async () => {
    const get = await handle(new Request('https://veodar.com/api/contacto/'), env, { now: NOW });
    assert.equal(get.status, 405);
    const foreign = await handle(post(valid, { origin: 'https://otro.example' }), env, { now: NOW });
    assert.equal(foreign.status, 403);
    const big = await handle(post({ ...valid, message: 'a'.repeat(40_000) }), env, { now: NOW });
    assert.equal(big.status, 413);
  });

  it('sends to each inbox on its own, so one rejected inbox does not block the other', async () => {
    const calls = [];
    // Resend in test mode: only the account owner's address is accepted.
    const fetchImpl = withTurnstile(async (url, init) => {
      const body = JSON.parse(init.body);
      calls.push(body.to);
      const okay = body.to.length === 1 && body.to[0] === 'owner@example.com';
      return new Response(JSON.stringify(okay ? { id: 'email_1' } : { message: 'testing emails only' }), { status: okay ? 200 : 403 });
    });
    const twoInboxes = { ...env, CONTACT_TO: 'owner@example.com, info@example.com' };
    const response = await handle(post(valid), twoInboxes, { fetchImpl, now: NOW });
    assert.equal(response.status, 200);
    assert.deepEqual(calls, [['owner@example.com'], ['info@example.com']]);
    const none = await handle(post(valid), { ...env, CONTACT_TO: 'info@example.com, otro@example.com' }, { fetchImpl, now: NOW });
    assert.equal(none.status, 502);
  });

  it('says when the inbox is not configured and when Resend fails', async () => {
    const unset = await handle(post(valid), { ...env, RESEND_API_KEY: '' }, { fetchImpl: resend().fetchImpl, now: NOW });
    assert.equal(unset.status, 503);
    assert.equal((await unset.json()).error, 'config');
    const failing = await handle(post(valid), env, { fetchImpl: resend(500).fetchImpl, now: NOW });
    assert.equal(failing.status, 502);
    assert.equal((await failing.json()).error, 'send');
  });
});

describe('Turnstile', () => {
  it('checks the token with Cloudflare before anything is sent', async () => {
    const { calls, checks, fetchImpl } = resend();
    const response = await handle(post(valid), env, { fetchImpl, now: NOW });
    assert.equal(response.status, 200);
    assert.deepEqual(checks, [{ secret: 'ts_secret', response: 'token-ok', remoteip: '203.0.113.7' }]);
    assert.equal(calls.length, 1);
  });

  it('refuses a message without a token, and asks Cloudflare nothing', async () => {
    const { calls, checks, fetchImpl } = resend();
    const { 'cf-turnstile-response': _, ...noToken } = valid;
    const response = await handle(post(noToken), env, { fetchImpl, now: NOW });
    assert.equal(response.status, 403);
    assert.equal((await response.json()).error, 'turnstile');
    assert.equal(checks.length, 0);
    assert.equal(calls.length, 0);
  });

  it('refuses a token Cloudflare rejects, or one solved for another action or site', async () => {
    for (const verdict of [
      { success: false, 'error-codes': ['timeout-or-duplicate'] },
      { ...PASS, action: 'login' },
      { ...PASS, hostname: 'otro.example' },
    ]) {
      const { calls, fetchImpl } = resend(200, verdict);
      const response = await handle(post(valid), env, { fetchImpl, now: NOW });
      assert.equal(response.status, 403, JSON.stringify(verdict));
      assert.equal(calls.length, 0);
    }
  });

  it('fails closed when Cloudflare cannot be reached or the secret is missing', async () => {
    const down = resend(200, () => new Error('network'));
    assert.equal((await handle(post(valid), env, { fetchImpl: down.fetchImpl, now: NOW })).status, 403);
    assert.equal(down.calls.length, 0);
    const unset = resend();
    const response = await handle(post(valid), { ...env, TURNSTILE_SECRET: '' }, { fetchImpl: unset.fetchImpl, now: NOW });
    assert.equal(response.status, 503);
    assert.equal(unset.calls.length, 0);
  });

  it('expects the site it is served from when no hostname list is set', async () => {
    const { calls, fetchImpl } = resend();
    const { TURNSTILE_HOSTNAMES: _, ...noList } = env;
    assert.equal((await handle(post(valid), noList, { fetchImpl, now: NOW })).status, 200);
    assert.equal(calls.length, 1);
    const other = resend(200, { ...PASS, hostname: 'localhost' });
    assert.equal((await handle(post(valid), noList, { fetchImpl: other.fetchImpl, now: NOW })).status, 403);
  });

  it('sends a plain form post that fails the check back to the page', async () => {
    const { fetchImpl } = resend(200, { success: false });
    const response = await handle(post(valid, { form: true }), env, { fetchImpl, now: NOW });
    assert.equal(response.status, 303);
    assert.equal(response.headers.get('location'), '/contacto/#no-enviado');
  });
});
