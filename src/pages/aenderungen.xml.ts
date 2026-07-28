import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { aenderungsstrom, ART_LABEL } from '../lib/steckbrief';

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export const GET: APIRoute = async ({ site }) => {
  const base = site?.href.replace(/\/$/, '') ?? 'https://ki-angebote.berlin';
  const angebote = await getCollection('angebote');
  const strom = aenderungsstrom(angebote).slice(0, 100);
  const aktualisiert = strom[0]?.datum.toISOString() ?? new Date().toISOString();

  const entries = strom
    .map((e, i) => {
      const url = `${base}/angebote/${e.angebotSlug}`;
      const art = ART_LABEL[e.art] ?? e.art;
      const titel = `${art}: ${e.angebotName}`;
      const inhalt = [e.feld ? `Feld: ${e.feld}.` : '', e.notiz].filter(Boolean).join(' ');
      const id = `tag:ki-angebote.berlin,2026:${e.angebotSlug}:${e.datum.toISOString().slice(0, 10)}:${i}`;
      return `  <entry>
    <title>${esc(titel)}</title>
    <link href="${esc(url)}"/>
    <id>${esc(id)}</id>
    <updated>${e.datum.toISOString()}</updated>
    <category term="${esc(e.art)}"/>
    <content type="text">${esc(inhalt)}</content>
  </entry>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>KI-Angebote Berlin – Änderungen</title>
  <subtitle>Neue, geänderte und beendete Unterstützungsangebote für Berliner KMU rund um KI</subtitle>
  <link href="${base}/aenderungen.xml" rel="self"/>
  <link href="${base}/aenderungen"/>
  <id>${base}/aenderungen.xml</id>
  <updated>${aktualisiert}</updated>
${entries}
</feed>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/atom+xml; charset=utf-8' },
  });
};
