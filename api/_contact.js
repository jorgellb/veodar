// Contact form logic, shared by the Vercel Function (api/contacto.js), the form
// component (src/components/ContactForm.astro) and the tests (tests/contact.test.js).
// Files in api/ that start with "_" are not deployed as endpoints.

/** What the visitor can ask for. Keys travel in the form; labels go in the email. */
export const NEEDS = {
  ia: 'Automatización con IA',
  web: 'Web o plataforma',
  movil: 'App móvil',
  escritorio: 'App de escritorio',
  marca: 'Marca y diseño web',
  '3d': '3D y configuradores',
  seo: 'SEO y visibilidad',
  otro: 'Aún no lo sé',
};

export const BUDGETS = {
  'menos-5k': 'Menos de 5.000 €',
  '5-15k': '5.000 – 15.000 €',
  '15-40k': '15.000 – 40.000 €',
  'mas-40k': 'Más de 40.000 €',
  hablar: 'Prefiero hablarlo',
};

export const TIMING = {
  ya: 'Cuanto antes',
  trimestre: 'En los próximos tres meses',
  'sin-fecha': 'Sin fecha',
};

export const LIMITS = { name: [2, 80], email: 160, company: 120, message: [20, 5000], body: 20_000 };

// A person needs more than this to fill the form; most bots do not wait.
const MIN_FILL_MS = 2500;
const EMAIL_RE = /^[^\s@<>()",;]+@[^\s@<>()",;]+\.[^\s@<>()",;]{2,}$/;

const text = (value) => (typeof value === 'string' ? value.trim() : '');
const list = (value) => (Array.isArray(value) ? value : value === undefined || value === null || value === '' ? [] : [value]);
const truthy = (value) => value === true || value === 'on' || value === 'true' || value === '1';

/**
 * Check and normalise a submission (a JSON body or the fields of a plain form post).
 * Returns { ok, data, errors, spam }. Unknown options are dropped, not reported.
 */
export function parseSubmission(input, now = Date.now()) {
  const raw = input ?? {};
  const data = {
    name: text(raw.name).replace(/\s+/g, ' '),
    email: text(raw.email).toLowerCase(),
    company: text(raw.company).replace(/\s+/g, ' '),
    needs: [...new Set(list(raw.needs).map(String))].filter((key) => key in NEEDS),
    budget: text(raw.budget) in BUDGETS ? text(raw.budget) : '',
    timing: text(raw.timing) in TIMING ? text(raw.timing) : '',
    message: text(raw.message).replace(/\r\n/g, '\n'),
    consent: truthy(raw.consent),
  };

  const errors = {};
  if (data.name.length < LIMITS.name[0] || data.name.length > LIMITS.name[1]) errors.name = 'Escribe tu nombre.';
  if (!EMAIL_RE.test(data.email) || data.email.length > LIMITS.email) errors.email = 'Revisa el correo: lo necesitamos para responderte.';
  if (data.company.length > LIMITS.company) errors.company = 'El nombre de la empresa es demasiado largo.';
  if (data.needs.length === 0) errors.needs = 'Elige al menos una opción, aunque sea «Aún no lo sé».';
  if (data.message.length < LIMITS.message[0]) errors.message = 'Cuéntanos un poco más: con dos o tres frases basta.';
  else if (data.message.length > LIMITS.message[1]) errors.message = 'El mensaje es demasiado largo. Resume y adjunta el resto cuando respondamos.';
  if (!data.consent) errors.consent = 'Necesitamos tu permiso para responderte.';

  const started = Number(raw.t);
  const tooFast = Number.isFinite(started) && started > 0 && now - started < MIN_FILL_MS;
  const spam = text(raw.website) !== '' || tooFast;

  return { ok: Object.keys(errors).length === 0, data, errors, spam };
}

const escape = (value) =>
  String(value).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]);

/** CONTACT_TO holds one or more inboxes, separated by commas. */
export const inboxes = (env) =>
  String(env.CONTACT_TO ?? '')
    .split(',')
    .map((address) => address.trim())
    .filter(Boolean);

/** The message as Resend receives it: to the inboxes, with replies going to the visitor. */
export function buildEmail(data, env) {
  const needs = data.needs.map((key) => NEEDS[key]);
  const rows = [
    ['Nombre', data.name],
    ['Correo', data.email],
    ['Empresa', data.company || '—'],
    ['Necesita', needs.join(', ')],
    ['Presupuesto', data.budget ? BUDGETS[data.budget] : '—'],
    ['Plazo', data.timing ? TIMING[data.timing] : '—'],
  ];
  const who = data.company ? `${data.name} (${data.company})` : data.name;
  const subject = `Nuevo mensaje de ${who} · ${needs.join(', ')}`.slice(0, 160);

  const html = `<!doctype html><html lang="es"><body style="margin:0;padding:24px;background:#f4f0e6;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#16142c">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:620px;margin:0 auto;background:#fbf8f1;border-radius:18px;border:1px solid #e3ddcf">
<tr><td style="padding:28px 32px 8px"><p style="margin:0;font:600 11px/1.4 ui-monospace,Menlo,monospace;letter-spacing:.14em;text-transform:uppercase;color:#b8360a">Formulario de veodar.com</p>
<h1 style="margin:10px 0 0;font:500 24px/1.2 Georgia,serif;color:#16142c">${escape(who)}</h1></td></tr>
<tr><td style="padding:16px 32px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${rows
  .map(
    ([label, value]) =>
      `<tr><td style="padding:8px 0;border-top:1px solid #ece6d8;width:120px;font:12px/1.5 ui-monospace,Menlo,monospace;color:#615d76;vertical-align:top">${label}</td><td style="padding:8px 0;border-top:1px solid #ece6d8;font:15px/1.5 -apple-system,Segoe UI,Helvetica,Arial,sans-serif">${escape(value)}</td></tr>`,
  )
  .join('\n')}
</table></td></tr>
<tr><td style="padding:8px 32px 28px"><p style="margin:0 0 8px;font:12px/1.5 ui-monospace,Menlo,monospace;color:#615d76">Mensaje</p>
<div style="padding:16px 18px;border-radius:12px;background:#f4f0e6;font:15px/1.6 -apple-system,Segoe UI,Helvetica,Arial,sans-serif;white-space:pre-wrap">${escape(data.message)}</div>
<p style="margin:18px 0 0;font:13px/1.5 -apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#615d76">Responde a este correo y le llegará a ${escape(data.email)}.</p></td></tr>
</table></body></html>`;

  const text = [
    `Formulario de veodar.com`,
    '',
    ...rows.map(([label, value]) => `${label}: ${value}`),
    '',
    'Mensaje:',
    data.message,
  ].join('\n');

  return { from: env.CONTACT_FROM || 'Veodar <onboarding@resend.dev>', to: inboxes(env), reply_to: data.email, subject, html, text };
}

const json = (status, body) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });
// Without JavaScript the result is an anchor on the contact page, shown with :target in CSS.
const back = (anchor) => new Response(null, { status: 303, headers: { location: `/contacto/#${anchor}`, 'cache-control': 'no-store' } });
const SENT = 'enviado';
const CHECK = 'revisar';
const FAILED = 'no-enviado';

/**
 * The endpoint. A fetch() submission (JSON) gets JSON back; a plain form post
 * (no JavaScript) gets sent back to the contact page with the result in the URL.
 */
export async function handle(request, env, { fetchImpl = fetch, now = Date.now() } = {}) {
  if (request.method !== 'POST') return new Response(null, { status: 405, headers: { allow: 'POST' } });

  // Browsers send Origin on a POST: only this site may post here.
  const origin = request.headers.get('origin');
  if (origin) {
    let host = '';
    try {
      host = new URL(origin).host;
    } catch {
      // "null" (sandboxed frames, file://) is refused below.
    }
    if (host !== new URL(request.url).host) return json(403, { ok: false, error: 'origin' });
  }

  const type = request.headers.get('content-type') ?? '';
  const isForm = type.includes('application/x-www-form-urlencoded') || type.includes('multipart/form-data');
  const raw = await request.text();
  if (raw.length > LIMITS.body) return isForm ? back(CHECK) : json(413, { ok: false, error: 'size' });

  let input;
  try {
    if (isForm) {
      const params = new URLSearchParams(raw);
      input = Object.fromEntries(params);
      input.needs = params.getAll('needs');
    } else {
      input = JSON.parse(raw);
    }
  } catch {
    return json(400, { ok: false, error: 'format' });
  }

  const result = parseSubmission(input, now);
  // Bots get the same answer as people, so they learn nothing.
  if (result.spam) return isForm ? back(SENT) : json(200, { ok: true });
  if (!result.ok) return isForm ? back(CHECK) : json(400, { ok: false, errors: result.errors });

  if (!env.RESEND_API_KEY || inboxes(env).length === 0) return isForm ? back(FAILED) : json(503, { ok: false, error: 'config' });

  try {
    const response = await fetchImpl('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(buildEmail(result.data, env)),
    });
    if (!response.ok) {
      console.error('Resend rejected the contact email', response.status, await response.text().catch(() => ''));
      return isForm ? back(FAILED) : json(502, { ok: false, error: 'send' });
    }
  } catch (error) {
    console.error('Resend could not be reached', error);
    return isForm ? back(FAILED) : json(502, { ok: false, error: 'send' });
  }

  return isForm ? back(SENT) : json(200, { ok: true });
}
