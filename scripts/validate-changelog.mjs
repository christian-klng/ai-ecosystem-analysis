#!/usr/bin/env node
/*
 * Redaktionelle Validierung der Steckbriefe (PLAN.md 5.3).
 *
 * Läuft vor jedem Build (npm run build). Harte Fehler brechen den Build ab –
 * das erzwingt die Changelog-Disziplin, ohne die die Pflege erfahrungsgemäß
 * nach wenigen Monaten verfällt. Weiche Hinweise werden nur gemeldet.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import yaml from 'js-yaml';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'src', 'content', 'angebote');
const heute = new Date();
heute.setHours(23, 59, 59, 999);

const fehler = [];
const warnungen = [];

/** Frontmatter aus einer .md-Datei extrahieren. */
function frontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return null;
  return yaml.load(m[1]);
}

function toDate(v) {
  if (v instanceof Date) return v;
  if (typeof v === 'string') return new Date(v);
  return null;
}

const dateien = readdirSync(dir).filter((f) => f.endsWith('.md'));
const alle = new Map(); // id -> data

for (const datei of dateien) {
  const id = datei.replace(/\.md$/, '');
  const text = readFileSync(join(dir, datei), 'utf8');
  const data = frontmatter(text);
  if (!data) {
    fehler.push(`${datei}: kein gültiger Frontmatter-Block gefunden.`);
    continue;
  }
  alle.set(id, data);

  const cl = Array.isArray(data.changelog) ? data.changelog : [];
  if (cl.length === 0) {
    fehler.push(`${id}: Changelog fehlt oder ist leer.`);
  }

  // Genau ein "neu"-Eintrag als Anlage-Marke.
  const neuCount = cl.filter((c) => c.art === 'neu').length;
  if (neuCount === 0) fehler.push(`${id}: kein Changelog-Eintrag mit art: neu (Anlage).`);
  if (neuCount > 1) warnungen.push(`${id}: mehr als ein "neu"-Eintrag im Changelog.`);

  // Keine Zukunftsdaten.
  for (const c of cl) {
    const d = toDate(c.datum);
    if (d && d > heute) fehler.push(`${id}: Changelog-Datum liegt in der Zukunft (${c.datum}).`);
    // "geaendert" und "statuswechsel" müssen ein Feld benennen.
    if ((c.art === 'geaendert' || c.art === 'statuswechsel') && !c.feld) {
      fehler.push(`${id}: Changelog-Eintrag "${c.art}" ohne Angabe des geänderten Feldes.`);
    }
  }

  const geprueft = toDate(data.geprueft_am);
  if (!geprueft) fehler.push(`${id}: geprueft_am fehlt oder ist ungültig.`);
  else if (geprueft > heute) fehler.push(`${id}: geprueft_am liegt in der Zukunft (${data.geprueft_am}).`);

  // Nicht-aktive Status müssen begründet sein.
  if (['beendet', 'auslaufend', 'ausgesetzt'].includes(data.status)) {
    const hatWechsel = cl.some((c) => c.art === 'statuswechsel');
    if (!data.status_begruendung && !hatWechsel) {
      fehler.push(`${id}: Status "${data.status}" ohne status_begruendung und ohne Statuswechsel-Eintrag.`);
    }
  }

  // auslaufend ohne Enddatum ist verdächtig.
  if (data.status === 'auslaufend' && !data.finanzierung_bis) {
    warnungen.push(`${id}: Status "auslaufend", aber kein finanzierung_bis gesetzt.`);
  }
}

// Nachfolge-Reziprozität prüfen (weich).
for (const [id, data] of alle) {
  if (data.nachfolger) {
    const ziel = alle.get(data.nachfolger);
    if (!ziel) warnungen.push(`${id}: nachfolger verweist auf unbekanntes Angebot "${data.nachfolger}".`);
    else if (ziel.nachfolger_von !== id) {
      warnungen.push(`${id}: nachfolger "${data.nachfolger}" verweist nicht mit nachfolger_von zurück.`);
    }
  }
  if (data.nachfolger_von) {
    const quelle = alle.get(data.nachfolger_von);
    if (!quelle) warnungen.push(`${id}: nachfolger_von verweist auf unbekanntes Angebot "${data.nachfolger_von}".`);
  }
}

for (const w of warnungen) console.warn(`  Hinweis  ${w}`);
if (fehler.length > 0) {
  console.error(`\n✗ Validierung fehlgeschlagen (${fehler.length} Fehler):`);
  for (const f of fehler) console.error(`  FEHLER   ${f}`);
  process.exit(1);
}
console.log(`✓ ${alle.size} Steckbriefe validiert, ${warnungen.length} Hinweise.`);
