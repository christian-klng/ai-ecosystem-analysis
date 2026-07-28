# CLAUDE.md

Projektleitfaden für Claude Code. Kurz halten; Details stehen in den verlinkten Dateien.

## Was das ist

**KI-Angebote Berlin** (Arbeitstitel) — ein statisches Astro-Webtool: redaktionell gepflegte
Steckbriefe von Unterstützungsangeboten für Berliner KMU rund um KI. Teil des Forschungsprojekts
**KI-InnoX** (IFAF Berlin, HWR/HTW/ASH). Konzept in [PLAN.md](PLAN.md), Bedienung in
[README.md](README.md).

## Befehle

```bash
npm run dev       # Entwicklungsserver auf http://localhost:4321
npm run build     # validiert (npm run validate) + baut nach dist/
npm run validate  # nur der Changelog-Validator
```

## Deployment

**Live (Test):** <http://w9ttotjebyn7i4rv5b4budiq.178.104.69.162.sslip.io> — deployt über
**Coolify** (Dockerfile-Build, nginx). Die sslip.io-Adresse ist die automatische Coolify-Test-URL;
eine endgültige Domain steht noch aus.

- **Deploy-Weg:** Push auf `main` → Coolify baut neu (Auto-Deploy on Push). `main` ist der
  Deploy-Branch — Änderungen, die live sollen, gehören nach `main`, **nicht** in einen Feature-Branch.
- **Dateien:** [`Dockerfile`](Dockerfile), [`nginx.conf`](nginx.conf), [`docker-compose.yml`](docker-compose.yml),
  Anleitung in [DEPLOYMENT.md](DEPLOYMENT.md).
- **`SITE_URL`** (Coolify-Build-Variable) bestimmt die absoluten URLs in Atom-Feed und JSON. Nach
  Domain-Wechsel neu deployen.

## Konventionen und Fallstricke (bitte beachten)

- **Geschlossenes Schema.** Alle Vokabulare sind Zod-Enums in
  [`src/content/config.ts`](src/content/config.ts). Ein falscher Wert bricht den Build — das ist
  gewollt. Anzeigetexte dazu in [`src/lib/labels.ts`](src/lib/labels.ts).
- **Aktualisierungsdisziplin.** „Geprüft" ≠ „Geändert". Bei inhaltlicher Änderung einen
  `changelog`-Eintrag (`art: geaendert`/`statuswechsel`, mit `feld`) ergänzen; bei reiner Prüfung
  nur `geprueft_am` setzen. Der Validator ([`scripts/validate-changelog.mjs`](scripts/validate-changelog.mjs))
  erzwingt das vor jedem Build.
- **Einbettbarkeit nicht kaputt machen.** `nginx.conf` setzt bewusst **kein** `X-Frame-Options`
  und keine restriktive `frame-ancestors`-CSP — Partner sollen das Verzeichnis per iFrame
  (`?embed=1`) einbetten können.
- **Suche ist ein clientseitiger Filter**, kein Pagefind (funktioniert so auch in dev und im
  Embed). Facetten-/Textfilter in [`src/pages/angebote/index.astro`](src/pages/angebote/index.astro).
- **Neuen Steckbrief anlegen:** Datei unter `src/content/angebote/<slug>.md`; bestehenden als
  Vorlage nehmen. Träger in `src/content/traeger/*.yaml`.

## Entschieden (2026-07)

- Betreiberin: **HWR Berlin** (Rechtsseiten als Entwurf gesetzt).
- Transparenzindex: **nur aggregiert** veröffentlichen, kein Einzelwert je Steckbrief.
- Reihenfolge: erst intern zeigen, dann die systematische Vollrecherche (Zielumfang 80–120
  Steckbriefe); aktuell 16 Seed-Steckbriefe.
