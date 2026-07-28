/*
 * Anzeige-Beschriftungen für die kontrollierten Vokabulare aus content/config.ts.
 * Eine einzige Quelle der Wahrheit, damit Seiten und Komponenten konsistent bleiben.
 */

export const LEISTUNGSART_LABEL: Record<string, string> = {
  orientierung: 'Orientierung / Erstberatung',
  selbstcheck: 'Selbstcheck',
  qualifizierung: 'Qualifizierung',
  'peer-learning': 'Peer-Learning',
  demonstration: 'Demonstration / Erlebnis',
  umsetzungsbegleitung: 'Umsetzungsbegleitung',
  'umsetzung-im-betrieb': 'Umsetzung im Betrieb',
  forschungskooperation: 'Forschungskooperation',
  testinfrastruktur: 'Testinfrastruktur',
  rechenressourcen: 'Rechenressourcen',
  'daten-wissen': 'Daten / Wissen',
  zuschuss: 'Zuschuss / Förderung',
  kapital: 'Kapital',
  vernetzung: 'Vernetzung',
  navigationshilfe: 'Navigationshilfe / Lotse',
  talentkanal: 'Talent- / Fachkräftekanal',
  notfalldienst: 'Notfall- / Reaktionsdienst',
};

export const BEDARFSPHASE_LABEL: Record<string, string> = {
  orientieren: 'Orientieren',
  bewerten: 'Bewerten',
  erproben: 'Erproben',
  umsetzen: 'Umsetzen',
  betreiben: 'Betreiben / Skalieren',
};

export const ZUGANGSREGIME_LABEL: Record<string, string> = {
  offen: 'Offen zugänglich',
  anmeldepflichtig: 'Anmeldepflichtig',
  antragspflichtig: 'Antragspflichtig',
  kompetitiv: 'Kompetitiv (Call / Auswahl)',
  mitgliedschaftsgebunden: 'Mitgliedschaft erforderlich',
  'nur-ueber-lotse': 'Nur über Lotse',
  'nur-ueber-netzwerk': 'Nur über persönliches Netzwerk',
};

export const KOSTENMODELL_LABEL: Record<string, string> = {
  kostenfrei: 'Kostenfrei',
  gefoerdert: 'Gefördert mit Eigenanteil',
  marktlich: 'Marktlich',
  mitgliedschaftsgebunden: 'Über Mitgliedschaft',
  datengegenleistung: 'Gegenleistung in Daten / Rechten',
  'nicht-angegeben': 'Keine Angabe',
};

export const BINDUNGSTIEFE_LABEL: Record<string, string> = {
  punktuell: 'Punktuell (unter 2 Stunden)',
  kurz: 'Kurz (bis 1 Tag)',
  mittel: 'Mittel (mehrtägig)',
  begleitend: 'Begleitend (Wochen bis Monate)',
  dauerhaft: 'Dauerhaft',
};

export const KI_KOMPETENZ_LABEL: Record<string, string> = {
  'setzt-voraus': 'Setzt KI-Kompetenz voraus',
  erzeugt: 'Erzeugt KI-Kompetenz',
  beides: 'Setzt voraus und erzeugt',
  irrelevant: 'KI-Kompetenz irrelevant',
};

export const ZIELGRUPPE_LABEL: Record<string, string> = {
  'bestands-kmu': 'Bestands-KMU',
  'kleinst-solo': 'Kleinstunternehmen / Solo',
  handwerk: 'Handwerk',
  startups: 'Startups / Gründung',
  'oeffentliche-orgs': 'Öffentliche Organisationen',
  beschaeftigte: 'Beschäftigte',
  branchenspezifisch: 'Branchenspezifisch',
};

export const TRAEGERTYP_LABEL: Record<string, string> = {
  'land-berlin': 'Land Berlin',
  bund: 'Bund',
  eu: 'EU',
  kammer: 'Kammer',
  verband: 'Verband',
  hochschule: 'Hochschule',
  auf: 'Außeruniversitäre Forschung',
  stiftung: 'Stiftung',
  verein: 'Verein',
  privatwirtschaft: 'Privatwirtschaft',
  community: 'Community',
};

export const RESSORTLOGIK_LABEL: Record<string, string> = {
  wirtschaftsfoerderung: 'Wirtschaftsförderung',
  arbeitswelt: 'Arbeitswelt (BMAS / ESF+)',
  'forschung-technologie': 'Forschung / Technologie',
  bildung: 'Bildung',
  sonstige: 'Sonstige',
};

export const RAEUMLICH_LABEL: Record<string, string> = {
  berlin: 'Berlin',
  'berlin-brandenburg': 'Berlin-Brandenburg',
  'bundesweit-berlin-zugang': 'Bundesweit (mit Berlin-Zugang)',
  eu: 'EU',
};

export const STATUS_LABEL: Record<string, string> = {
  aktiv: 'Aktiv',
  auslaufend: 'Läuft aus',
  ausgesetzt: 'Ausgesetzt',
  beendet: 'Beendet',
  unklar: 'Status unklar',
};

/** Einstiegssituationen der Startseite (Bedarfslage, PLAN.md 3.1 A). */
export const SITUATIONEN: { id: string; frage: string; phase: string; leistungsarten: string[] }[] = [
  {
    id: 'verstehen',
    frage: 'Ich will verstehen, was KI für mich bedeutet',
    phase: 'orientieren',
    leistungsarten: ['orientierung', 'selbstcheck', 'qualifizierung', 'peer-learning', 'demonstration'],
  },
  {
    id: 'ausprobieren',
    frage: 'Ich will etwas ausprobieren, ohne zu investieren',
    phase: 'erproben',
    leistungsarten: ['demonstration', 'testinfrastruktur', 'rechenressourcen', 'peer-learning'],
  },
  {
    id: 'umsetzen',
    frage: 'Ich habe eine konkrete Idee und suche Umsetzung',
    phase: 'umsetzen',
    leistungsarten: ['umsetzungsbegleitung', 'umsetzung-im-betrieb', 'forschungskooperation', 'testinfrastruktur'],
  },
  {
    id: 'geld',
    frage: 'Ich suche Geld',
    phase: 'umsetzen',
    leistungsarten: ['zuschuss', 'kapital'],
  },
  {
    id: 'personal',
    frage: 'Ich suche Personal oder Qualifizierung',
    phase: 'betreiben',
    leistungsarten: ['qualifizierung', 'talentkanal'],
  },
  {
    id: 'regulatorik',
    frage: 'Ich muss regulatorische Anforderungen erfüllen',
    phase: 'betreiben',
    leistungsarten: ['qualifizierung', 'orientierung', 'notfalldienst'],
  },
];

export function label(map: Record<string, string>, key: string): string {
  return map[key] ?? key;
}

/** Deutsches Datum, stabil (kein Locale-Zufall zur Buildzeit). */
export function datum(d: Date): string {
  return new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(d);
}

/** Prüfintervall in Tagen aus der Volatilitätsklasse (PLAN.md 5.2). */
export function pruefintervallTage(volatilitaet: string): number {
  return volatilitaet === 'hoch' ? 90 : volatilitaet === 'niedrig' ? 365 : 180;
}
