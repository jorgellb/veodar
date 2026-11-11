// IndexNow: which pages get announced after a deployment. The network and the
// state file live in scripts/indexnow.mjs; the decisions tested here are pure.
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { parseSitemap, pickUrls } from '../scripts/indexnow-plan.mjs';

const A = 'https://veodar.com/';
const B = 'https://veodar.com/servicios/';
const C = 'https://veodar.com/glosario/oee/';
const pages = { [A]: '2026-11-10', [B]: '2026-11-08', [C]: '2026-10-01' };
const today = new Date('2026-11-10T09:00:00Z');

describe('parseSitemap', () => {
  it('reads each url with its lastmod and ignores the alternates', () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
      <url><loc>${A}</loc><lastmod>2026-11-10</lastmod><xhtml:link rel="alternate" hreflang="en" href="https://veodar.com/en/"/></url>
      <url>
        <loc>${B}</loc>
        <lastmod>2026-11-08</lastmod>
      </url>
    </urlset>`;
    assert.deepEqual(parseSitemap(xml), { [A]: '2026-11-10', [B]: '2026-11-08' });
  });

  it('keeps a url that has no lastmod', () => {
    assert.deepEqual(parseSitemap(`<urlset><url><loc>${A}</loc></url></urlset>`), { [A]: '' });
  });

  it('returns nothing for something that is not a sitemap', () => {
    assert.deepEqual(parseSitemap('HTTP 500'), {});
  });
});

describe('pickUrls', () => {
  it('sends every live page when asked for all of them', () => {
    assert.deepEqual(pickUrls(pages, { all: true, previous: pages, today }), [A, B, C]);
  });

  it('sends nothing when the sitemap is the one already submitted', () => {
    assert.deepEqual(pickUrls(pages, { previous: { ...pages }, today }), []);
  });

  it('sends the pages that are new or whose lastmod changed since the last run', () => {
    const previous = { [A]: '2026-11-01', [B]: '2026-11-08' };
    assert.deepEqual(pickUrls(pages, { previous, today }), [A, C]);
  });

  it('also sends the pages that disappeared, so search engines drop them', () => {
    const gone = 'https://veodar.com/pagina-retirada/';
    assert.deepEqual(pickUrls(pages, { previous: { ...pages, [gone]: '2026-09-01' }, today }), [gone]);
  });

  it('treats an empty memory as a first run: everything is new', () => {
    assert.deepEqual(pickUrls(pages, { previous: {}, today }), [A, B, C]);
  });

  it('with no memory at all, sends the pages changed in the last two days', () => {
    assert.deepEqual(pickUrls(pages, { today }), [A, B]);
    assert.deepEqual(pickUrls(pages, { today: new Date('2026-11-11T09:00:00Z') }), [A]);
    assert.deepEqual(pickUrls(pages, { today: new Date('2026-11-20T09:00:00Z') }), []);
  });
});
