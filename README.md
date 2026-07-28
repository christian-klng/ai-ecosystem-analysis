# KI-Angebote Berlin

Redaktionell gepflegtes Verzeichnis von Unterstützungsangeboten für Berliner KMU rund um
Künstliche Intelligenz. Steckbriefe mit einheitlicher Systematik, nachvollziehbarem
Aktualisierungsstand und offenen Daten. Teil des Forschungsprojekts **KI-InnoX** (IFAF Berlin).

Konzept und Begründung: siehe [PLAN.md](PLAN.md). Rohdaten der Vorrecherche:
[recherche/vorrecherche-2026-07-22/](recherche/vorrecherche-2026-07-22/).

> **Status:** frühe Fassung mit 16 Seed-Steckbriefen (Phase 1 des Plans – Schematest an echten,
> bewusst schwierigen Fällen). Die systematische Vollrecherche erfolgt anschließend nach
> festem Protokoll.

## Schnellstart

```bash
npm install
npm run dev      # Entwicklungsserver auf http://localhost:4321
npm run build    # validiert + baut die statische Seite nach dist/
npm run preview  # dist/ lokal ausliefern
```

Kein Login, keine Datenbank, kein serverseitiger Code. Das Ergebnis ist eine rein statische
Website – bewusst so gewählt, damit sie ohne laufende Kosten betrieben und nach Projektende
übergeben werden kann.

## Projektstruktur

```
src/
  content/
    config.ts            Datenmodell (Zod-Schema); Enum-Tippfehler brechen den Build
    traeger/*.yaml        Trägerdatensätze
    angebote/*.md         die Steckbriefe (YAML-Frontmatter + Fließtext)
  lib/
    labels.ts             Anzeigebeschriftungen der Vokabulare (eine Quelle der Wahrheit)
    steckbrief.ts         Ableitungen: geprüft/geändert, Prüffristen, Änderungsstrom
  components/             StatusBanner, Kernblock (4 Fragen), Aktualisierung (Fußzeile), Card …
  pages/
    index.astro           Startseite: Einstieg nach Situation/Voraussetzung + Änderungsstrom
    angebote/index.astro  Liste mit Facettenfilter + Textsuche (URL-verlinkbar)
    angebote/[slug].astro Steckbrief-Detailseite
    aenderungen.astro     Änderungsverlauf + fällige Prüfungen
    kriterien.astro       offengelegte Aufnahmekriterien
    einbetten.astro       iFrame-Einbettung + offene Daten
    api/angebote.json.ts  vollständiger Bestand als JSON (CC BY 4.0)
    api/aenderungen.json.ts
    aenderungen.xml.ts    Atom-Feed der Änderungen
scripts/
  validate-changelog.mjs  erzwingt Changelog-Disziplin; läuft vor jedem Build
```

## Einen Steckbrief anlegen oder ändern

1. Datei unter `src/content/angebote/<slug>.md` anlegen bzw. bearbeiten. Als Vorlage eignet sich
   ein bestehender Steckbrief (z. B. `dab-orientierungsgespraech.md`).
2. Alle Pflichtfelder ausfüllen. Die erlaubten Werte je Feld stehen in
   [`src/content/config.ts`](src/content/config.ts); ein falscher Wert bricht den Build mit einer
   klaren Fehlermeldung ab.
3. **Wichtig – Aktualisierungsdisziplin:**
   - Bei einer **inhaltlichen Änderung** einen neuen `changelog`-Eintrag mit `art: geaendert`
     (oder `statuswechsel`) ergänzen und das geänderte `feld` benennen.
   - Bei einer **reinen Prüfung ohne Änderung** nur `geprueft_am` aktualisieren (und optional
     einen `art: geprueft`-Eintrag).
   - Diese Unterscheidung ist der Kern des Tools: „geprüft“ ≠ „geändert“.
4. `npm run build` ausführen. Der Validator meldet fehlende Changelog-Einträge, Zukunftsdaten,
   unbegründete Statuswechsel u. a.

## Redaktionsprozess (Kurzfassung)

- **Prüfintervalle nach Volatilität:** Förderprogramme 90 Tage, Beratung/Qualifizierung 180 Tage,
  Dauerangebote 365 Tage. Überschrittene Fristen erscheinen sichtbar auf dem Steckbrief und
  gesammelt unter „Was ist neu“.
- **Trägerrückmeldung** vor Erstveröffentlichung: Faktenprüfung, ausdrücklich kein Freigaberecht.
- **Öffentlicher Meldeweg** je Steckbrief per `mailto` (kein Formular, kein Backend).
- **Widersprüchliche Quellen** werden nicht stillschweigend aufgelöst, sondern im Feld
  `konflikthinweis` ausgewiesen.

## Forschungsanschluss

Die pro Steckbrief erfassten Recherchemetadaten (`recherche:`-Block – Zielgruppe klar? Kosten
klar? Klicktiefe? …) sind der Rohstoff für den **Transparenzindex**, die **Lückenmatrix** und die
longitudinale **Verfallsquote** (siehe PLAN.md, Abschnitt 7.4). Einzelwerte werden erhoben, aber
zunächst nur aggregiert veröffentlicht.

## Entscheidungen (Stand 2026-07-23)

- **Betreiberin: HWR Berlin** (federführende Hochschule). Die Rechtsseiten nennen sie bereits als
  Entwurf; verbindliche Angaben sind über die zentrale HWR-Verwaltung zu bestätigen.
- **Transparenzindex: nur aggregiert.** Auf Steckbrief-Ebene erscheint kein Einzelwert, nur die
  neutrale Angabe „Keine Angabe“. Aggregierte Auswertung folgt in einer späteren Phase.
- **Nächster Schritt: erst intern zeigen**, bevor die systematische Vollrecherche startet.

Vor dem Live-Gang zusätzlich: `site` in `astro.config.mjs` auf die reale Domain setzen und den
Arbeitstitel „KI-Angebote Berlin“ final entscheiden (Markenprüfung – „Kompass“ ist im Berliner
Feld bereits mehrfach belegt).

Lizenz: Inhalte **CC BY 4.0**, Code **MIT**.
