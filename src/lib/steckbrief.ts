import type { CollectionEntry } from 'astro:content';
import { pruefintervallTage } from './labels';

export type Angebot = CollectionEntry<'angebote'>;

/*
 * Ableitungen für die Aktualisierungslogik (PLAN.md 5.3).
 *
 * Kern: "geprüft" (kontrolliert, war richtig) und "geändert" (ein Feld hat sich
 * inhaltlich geändert) sind zwei verschiedene Ereignisse. Ein einzelnes
 * "zuletzt bearbeitet"-Datum kann das nicht abbilden.
 */

export type ChangelogEintrag = Angebot['data']['changelog'][number];

// Bei gleichem Datum ist ein Statuswechsel aussagekräftiger als die reine Anlage.
const AENDERUNG_RANG: Record<string, number> = { statuswechsel: 3, geaendert: 2, neu: 1, geprueft: 0 };

/** Letzte inhaltliche Änderung: jüngster Eintrag, der kein reines "geprüft" ist. */
export function letzteAenderung(a: Angebot): ChangelogEintrag | null {
  const inhaltlich = a.data.changelog
    .filter((c) => c.art !== 'geprueft')
    .sort((x, y) => {
      const dt = y.datum.getTime() - x.datum.getTime();
      return dt !== 0 ? dt : (AENDERUNG_RANG[y.art] ?? 0) - (AENDERUNG_RANG[x.art] ?? 0);
    });
  return inhaltlich[0] ?? null;
}

/** Nächster vorgesehener Prüftermin = letzte Prüfung + Intervall der Volatilitätsklasse. */
export function naechstePruefung(a: Angebot): Date {
  const tage = pruefintervallTage(a.data.volatilitaet);
  const d = new Date(a.data.geprueft_am);
  d.setDate(d.getDate() + tage);
  return d;
}

/** Ist die Prüfung überfällig? Erzeugt den sichtbaren Veraltungshinweis (PLAN.md 5.2). */
export function pruefungUeberfaellig(a: Angebot, heute: Date): boolean {
  return naechstePruefung(a) < heute;
}

/** Tage seit der letzten Prüfung. */
export function tageSeitPruefung(a: Angebot, heute: Date): number {
  const ms = heute.getTime() - new Date(a.data.geprueft_am).getTime();
  return Math.floor(ms / (1000 * 60 * 60 * 24));
}

/** Läuft die Finanzierung in den nächsten `monate` Monaten aus? */
export function finanzierungLaeuftAus(a: Angebot, heute: Date, monate = 12): boolean {
  if (!a.data.finanzierung_bis) return false;
  const grenze = new Date(heute);
  grenze.setMonth(grenze.getMonth() + monate);
  return a.data.finanzierung_bis <= grenze;
}

export type StromEintrag = {
  datum: Date;
  art: ChangelogEintrag['art'];
  feld: string | null;
  notiz: string;
  angebotSlug: string;
  angebotName: string;
  status: string;
};

/** Chronologischer Änderungsstrom über alle Steckbriefe (Startseite + Feed). */
export function aenderungsstrom(angebote: Angebot[]): StromEintrag[] {
  const strom: StromEintrag[] = [];
  for (const a of angebote) {
    for (const c of a.data.changelog) {
      strom.push({
        datum: c.datum,
        art: c.art,
        feld: c.feld,
        notiz: c.notiz,
        angebotSlug: a.slug,
        angebotName: a.data.name,
        status: a.data.status,
      });
    }
  }
  return strom.sort((x, y) => y.datum.getTime() - x.datum.getTime());
}

export const ART_LABEL: Record<string, string> = {
  neu: 'Neu aufgenommen',
  geaendert: 'Inhaltlich geändert',
  geprueft: 'Geprüft, unverändert',
  statuswechsel: 'Statuswechsel',
};

/** Sortierschlüssel: aktive zuerst, dann auslaufend/ausgesetzt/unklar, beendet zuletzt. */
export const STATUS_RANG: Record<string, number> = {
  aktiv: 0,
  auslaufend: 1,
  ausgesetzt: 2,
  unklar: 3,
  beendet: 4,
};
