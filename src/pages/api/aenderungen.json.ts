import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { aenderungsstrom } from '../../lib/steckbrief';

export const GET: APIRoute = async ({ site }) => {
  const angebote = await getCollection('angebote');
  const strom = aenderungsstrom(angebote).map((e) => ({
    datum: e.datum,
    art: e.art,
    feld: e.feld,
    notiz: e.notiz,
    angebot: e.angebotSlug,
    angebot_name: e.angebotName,
    status: e.status,
    url: site ? new URL(`/angebote/${e.angebotSlug}`, site).href : `/angebote/${e.angebotSlug}`,
  }));

  const payload = {
    quelle: 'KI-Angebote Berlin',
    lizenz: 'CC BY 4.0',
    stand: new Date().toISOString().slice(0, 10),
    anzahl: strom.length,
    aenderungen: strom,
  };

  return new Response(JSON.stringify(payload, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
