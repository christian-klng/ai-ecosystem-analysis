import { defineCollection, reference, z } from 'astro:content';

/*
 * Datenmodell des Angebotskompass (PLAN.md, Abschnitt 4 & 5).
 *
 * Zwei Collections:
 *   - traeger:  schlanke Trägerdatensätze (Name, Typ, Rolle, URL)
 *   - angebote: die Steckbriefe; Erhebungseinheit ist das ANGEBOT, nicht die Organisation.
 *
 * Enum-Werte sind bewusst geschlossen: Ein Tippfehler bricht den Build.
 * Bei mehreren Bearbeitenden über zwei Jahre ist das die zentrale Qualitätssicherung.
 */

// --- Kontrollierte Vokabulare (Klassifikationsachsen, Abschnitt 4.3) ---

export const LEISTUNGSARTEN = [
  'orientierung',            // Orientierung / Erstberatung
  'selbstcheck',             // Self-Assessment
  'qualifizierung',
  'peer-learning',
  'demonstration',           // Demonstration / Erlebnis
  'umsetzungsbegleitung',
  'umsetzung-im-betrieb',    // Umsetzung im Betrieb durch Dritte
  'forschungskooperation',
  'testinfrastruktur',
  'rechenressourcen',
  'daten-wissen',
  'zuschuss',                // Zuschuss / Förderung
  'kapital',
  'vernetzung',
  'navigationshilfe',        // Lotse / Navigationshilfe
  'talentkanal',             // Talent- / Fachkräftekanal
  'notfalldienst',
] as const;

export const BEDARFSPHASEN = [
  'orientieren',
  'bewerten',
  'erproben',
  'umsetzen',
  'betreiben',               // Betreiben / Skalieren
] as const;

export const ZUGANGSREGIME = [
  'offen',
  'anmeldepflichtig',
  'antragspflichtig',
  'kompetitiv',              // Call / Auswahlgremium
  'mitgliedschaftsgebunden',
  'nur-ueber-lotse',
  'nur-ueber-netzwerk',      // nur über persönliches Netzwerk
] as const;

export const KOSTENMODELLE = [
  'kostenfrei',
  'gefoerdert',              // gefördert mit Eigenanteil
  'marktlich',
  'mitgliedschaftsgebunden',
  'datengegenleistung',      // Gegenleistung in Daten / Rechten
  'nicht-angegeben',
] as const;

export const BINDUNGSTIEFEN = [
  'punktuell',               // < 2 h
  'kurz',                    // bis 1 Tag
  'mittel',                  // mehrtägig
  'begleitend',              // Wochen bis Monate, mit Stundenkontingent
  'dauerhaft',
] as const;

export const KI_KOMPETENZ = [
  'setzt-voraus',
  'erzeugt',
  'beides',
  'irrelevant',
] as const;

export const ZIELGRUPPEN = [
  'bestands-kmu',
  'kleinst-solo',            // Kleinstunternehmen / Solo-Selbstständige
  'handwerk',
  'startups',                // Startups / Gründung
  'oeffentliche-orgs',
  'beschaeftigte',           // Beschäftigte (statt Betrieb)
  'branchenspezifisch',
] as const;

export const TRAEGERTYPEN = [
  'land-berlin',             // Land Berlin / Landesgesellschaft
  'bund',
  'eu',
  'kammer',
  'verband',
  'hochschule',
  'auf',                     // außeruniversitäre Forschung
  'stiftung',
  'verein',
  'privatwirtschaft',
  'community',               // informell / Community
] as const;

export const RESSORTLOGIK = [
  'wirtschaftsfoerderung',   // BMWE / SenWEB
  'arbeitswelt',             // BMAS / ESF+
  'forschung-technologie',   // BMFTR
  'bildung',
  'sonstige',
] as const;

export const RAEUMLICH = [
  'berlin',
  'berlin-brandenburg',
  'bundesweit-berlin-zugang',
  'eu',
] as const;

export const STATUS = [
  'aktiv',
  'auslaufend',              // Enddatum bekannt und < 12 Monate entfernt
  'ausgesetzt',              // Warteliste / Call geschlossen
  'beendet',
  'unklar',
] as const;

export const EINTRAGSTYP = [
  'angebot',                 // abgrenzbare, in Anspruch nehmbare Leistung
  'anlaufstelle',            // Ort / Institution ohne definierte Leistung (Abschnitt 4.1)
] as const;

export const VOLATILITAET = ['hoch', 'mittel', 'niedrig'] as const; // Prüfintervall 90 / 180 / 365 Tage

// Gründe, warum ein geprüfter Kandidat NICHT als Angebot aufgenommen wurde (Negativ-Liste).
// Geschlossenes Vokabular, damit die Ausschlüsse systematisch auswertbar und wiedervorlagefähig bleiben.
export const AUSSCHLUSSGRUND = [
  'kein-ki-bezug',              // kein hinreichender Bezug zu Künstlicher Intelligenz
  'ausserhalb-berlin',         // kein Berlin-/Brandenburg-Bezug, kein Berliner Zugang
  'falsche-zielgruppe',        // richtet sich nicht an KMU (z. B. nur Konzerne, Verbraucher, Studierende)
  'kein-abgrenzbares-angebot', // reine Information/News/Blog, keine in Anspruch nehmbare Leistung
  'dublette',                  // Dublette zu einem bereits erfassten Steckbrief
  'eingestellt',               // existiert nicht mehr / dauerhaft eingestellt
  'zu-unspezifisch',           // nicht profilierbar (kein greifbarer Leistungskern)
  'nicht-oeffentlich',         // intern / nicht öffentlich zugänglich
  'sonstiges',
] as const;

// Dreistufige Bewertung der Informationsqualität der Quelle (Forschungsmetadaten)
const jaTeilweiseNein = z.enum(['ja', 'teilweise', 'nein']);

const changelogEintrag = z.object({
  datum: z.date(),
  art: z.enum(['neu', 'geaendert', 'geprueft', 'statuswechsel']),
  feld: z.string().nullable().default(null), // welches Feld sich geändert hat; null bei "neu"/"geprueft"
  notiz: z.string(),
});

// --- Träger-Collection ---

const traeger = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    kurzname: z.string().optional(),
    traegertyp: z.enum(TRAEGERTYPEN),
    rechtsform: z.string().optional(),
    rolle: z.string().optional(),        // z. B. "Landesgesellschaft, Wirtschaftsförderung"
    url: z.string().url().optional(),
  }),
});

// --- Angebote-Collection (Steckbriefe) ---

const angebote = defineCollection({
  type: 'content',
  schema: z.object({
    // Identität
    eintragstyp: z.enum(EINTRAGSTYP).default('angebot'),
    name: z.string(),
    traeger: z.array(reference('traeger')).min(1),
    kurzbeschreibung: z.string(),        // "Was bekomme ich hier?" in einem Satz
    was_bekomme_ich: z.string().optional(), // ausführlicher Einzeiler für den Kernblock

    // Status & Lebenszyklus (Abschnitt 4.4)
    status: z.enum(STATUS).default('aktiv'),
    status_begruendung: z.string().default(''),
    finanzierung_bis: z.date().nullable().default(null), // null = nicht publiziert
    nachfolger_von: reference('angebote').nullable().default(null),
    nachfolger: reference('angebote').nullable().default(null),

    // Klassifikationsachsen
    leistungsart: z.array(z.enum(LEISTUNGSARTEN)).default([]),
    bedarfsphase: z.array(z.enum(BEDARFSPHASEN)).default([]),
    zugangsregime: z.enum(ZUGANGSREGIME),
    kostenmodell: z.enum(KOSTENMODELLE),
    eigenanteil_prozent: z.number().nullable().default(null),
    bindungstiefe: z.enum(BINDUNGSTIEFEN),
    aufwand_hinweis: z.string().default(''),
    ki_kompetenz: z.enum(KI_KOMPETENZ),
    zielgruppe: z.array(z.enum(ZIELGRUPPEN)).default([]),
    zielgruppe_ausschluss: z.array(z.string()).default([]),
    traegertyp: z.enum(TRAEGERTYPEN),
    ressortlogik: z.enum(RESSORTLOGIK),
    raeumlich: z.enum(RAEUMLICH),

    // Beziehungen (der Datenbestand ist ein Graph, Abschnitt 2/B6)
    ermoeglicht_durch: z.array(reference('angebote')).default([]),
    kombinierbar_mit: z.array(reference('angebote')).default([]),
    aehnlich_zu: z.array(reference('angebote')).default([]),

    // Kontakt & Quellen
    kontakt: z
      .object({
        name: z.string().optional(),
        mail: z.string().optional(),
        tel: z.string().optional(),
        weg: z.string().optional(),
      })
      .default({}),
    links: z
      .array(
        z.object({
          url: z.string().url(),
          titel: z.string(),
          abgerufen: z.date(),
        }),
      )
      .default([]),

    // Redaktionelle Hinweise
    abgrenzung_hinweis: z.string().default(''),  // warum Grenzfall aufgenommen
    konflikthinweis: z.string().default(''),     // wenn Quellen sich widersprechen

    // Forschungsmetadaten — Erhebung öffentlich aggregiert, Einzelwerte intern (Abschnitt 7.4)
    recherche: z
      .object({
        zielgruppe_klar: jaTeilweiseNein,
        kosten_klar: jaTeilweiseNein,
        leistungsumfang_klar: jaTeilweiseNein,
        kapazitaet_genannt: z.enum(['ja', 'nein']),
        laufzeit_genannt: z.enum(['ja', 'nein']),
        ansprechperson_auffindbar: jaTeilweiseNein,
        klicktiefe: z.number().int().min(0),
        sprache_adressat: z.enum(['unternehmen', 'wissenschaft', 'startup', 'verwaltung', 'gemischt']),
        monitoring_moeglich: z.boolean().default(true),
      })
      .optional(),

    // Aktualisierungslogik (Abschnitt 5.2 & 5.3)
    volatilitaet: z.enum(VOLATILITAET).default('mittel'),
    geprueft_am: z.date(),
    geprueft_von: z.string(),
    changelog: z.array(changelogEintrag).min(1),
  }),
});

// --- Negativ-Liste (ausgeschlossene Kandidaten) ---
//
// Abgespeckte Steckbriefe geprüfter, aber NICHT aufgenommener Kandidaten. Erscheinen
// bewusst nicht im Verzeichnis (nichts rendert diese Collection), nur in den offenen
// Daten (/api/angebote.json). Zweck: Recherche-Gedächtnis + Wiedervorlage zur
// periodischen Neuprüfung. Kein Changelog-Zwang; die Pflege steuert `wiedervorlage_am`.
const ausgeschlossen = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    kurzbeschreibung: z.string(),          // "Was ist das?" in einem Satz
    ausschlussgrund: z.enum(AUSSCHLUSSGRUND),
    ausschluss_notiz: z.string(),          // kurze Begründung im Klartext (öffentlich, sachlich halten)

    // Leichte Rahmendaten, alle optional, wiederverwendete Vokabulare
    traeger_name: z.string().optional(),   // frei, da meist kein eigener Trägerdatensatz existiert
    url: z.string().url().optional(),
    traegertyp: z.enum(TRAEGERTYPEN).optional(),
    raeumlich: z.enum(RAEUMLICH).optional(),
    ki_bezug: jaTeilweiseNein.optional(),

    // Pflege / Wiedervorlage
    geprueft_am: z.date(),
    geprueft_von: z.string(),
    wiedervorlage_am: z.date().nullable().default(null), // wann erneut prüfen; null = keine geplant
    links: z
      .array(
        z.object({
          url: z.string().url(),
          titel: z.string(),
          abgerufen: z.date(),
        }),
      )
      .default([]),
  }),
});

export const collections = { traeger, angebote, ausgeschlossen };
