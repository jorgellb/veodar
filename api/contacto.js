// Vercel Function behind the contact form: POST /api/contacto/.
// Needs RESEND_API_KEY and CONTACT_TO (one or more inboxes, comma separated) and,
// once veodar.com is verified in Resend, CONTACT_FROM in the project's environment variables.
import { handle } from './_contact.js';

export default {
  fetch(request) {
    return handle(request, process.env);
  },
};
