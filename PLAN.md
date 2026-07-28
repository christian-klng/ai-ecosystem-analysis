# Angebotskompass Berliner KI-Ökosystem — Konzept und Umsetzungsplan

*Arbeitsstand 22.07.2026 · Kontext: KI-InnoX (IFAF Berlin, HWR/HTW/ASH, 01.2026–12.2027) · Anschluss an AP1 (Akteursmapping, Monate 1–4), AP3 (Reifegradkriterien, Monate 1–24), AP5 (Transfer, Monate 21–24)*

---

## 1. Kurzfassung

Ein öffentlich zugängliches, statisch ausgeliefertes Webangebot mit redaktionell gepflegten **Steckbriefen von Unterstützungsangeboten** für Berliner KMU im Umfeld von KI und Digitalisierung. Kein Login, keine Registrierung, keine Personalisierung. Jeder Steckbrief trägt am Fuß eine nachvollziehbare Aktualisierungsangabe. Eine Startseite ordnet Einstiegspunkte nach Bedarfslage statt nach Trägerinstitution. Alle Inhalte sind maschinenlesbar abrufbar und in fremde Websites einbettbar.

Das Tool ist zugleich **Transferprodukt und Forschungsinstrument**: Die strukturierte Erhebung erzeugt die Datenbasis, mit der Auffindbarkeit, Bewertbarkeit und Navigierbarkeit des Ökosystems überhaupt erst messbar werden.

**Was es nicht ist:** kein Anbieterverzeichnis, kein Bewertungsportal, keine Vermittlungsplattform, keine Beratungsleistung. Es bewertet keine Angebote, sondern beschreibt sie einheitlich und dokumentiert die Qualität ihrer öffentlichen Kommunikation.

---

## 2. Was die Vorrecherche am Design geändert hat

Am 22.07.2026 wurden drei Segmente des Berliner Ökosystems explorativ erhoben (Dokumentation unter `recherche/vorrecherche-2026-07-22/`, ca. 90 Angebote). Sechs Befunde haben unmittelbare Designfolgen:

**B1 — Der Engpass ist nicht Vollständigkeit, sondern Aktualität.** Beendet oder ersetzt, ohne dass es auf den Trägerseiten sichtbar wäre: Digitalprämie Berlin, Berliner InvestitionsBONUS, Coaching BONUS (nach 27 Jahren, Domain-Redirect ohne Statushinweis), go-digital, Digital Jetzt, hub.berlin, Factory Berlin, K.I.E.Z. (aufgegangen in AI NATION), mehrere Meetups. Absehbar auslaufend: Mittelstand-Digital Zentrum Berlin (09/2026), das gesamte Bundesnetz (Ende 2026, Nachfolgenetz erst 2027), BAFA-Beratungsförderung (31.12.2026). Umgekehrt war die EDIH-Trägerseite selbst veraltet, während Drittquellen eine Verlängerung bis 2028 belegten.
→ **Status und Finanzierungshorizont werden Felder erster Ordnung. Beendete Angebote bleiben online — mit Statuskennzeichnung und Nachfolgeverweis.** Genau das leistet die Landschaft heute nicht.

**B2 — „Organisation" und „Angebot" sind nicht dasselbe, und das ist die häufigste Fehlerquelle.** Fremdverzeichnisse führen „Digitalagentur Berlin" oder „Mittelstand-Digital Zentrum Berlin" als *ein* Angebot. Der „#ai_berlin hub" ist ein Ort mit Formaten ohne abgrenzbares Leistungsversprechen. „HWK-BIT" ist eine geförderte Stellenkategorie, nicht eine Leistung.
→ **Erhebungseinheit ist das Angebot; der Träger ist ein eigener, schlanker Datensatz.**

**B3 — Kostenschweigen ist ein Systemmerkmal des Wissenschaftssystems.** Praktisch alle hochschulischen und außeruniversitären Seiten machen keine Angabe zu Kosten, Vorlaufzeit oder Zielgruppe. Die einzigen Angebote mit klarer Zielgruppen-, Kosten- und Umfangsangabe sind durchweg geförderte Intermediäre außerhalb der Hochschulen — plus Fraunhofer IPK als einzige Forschungseinrichtung, die ihr Fördermodell offenlegt.
→ **„Keine Angabe" wird als Wert erfasst und angezeigt, nicht durch eine Schätzung überschrieben.** Die Leerstelle ist der Befund.

**B4 — Wer die Landschaft über Suchmaschinen kartiert, kartiert zuerst den Beratungsmarkt.** Ein erheblicher Teil der Toptreffer zu „KI-Förderung Berlin KMU" sind Lead-Generierungsseiten, die als neutrale Förderübersichten auftreten.
→ **Explizite, veröffentlichte Aufnahmekriterien sind Voraussetzung für Glaubwürdigkeit** (Abschnitt 4.2).

**B5 — Es gibt eine faktische Zugangskaskade, aber niemand beschreibt sie.** Für ein 30-Personen-KMU realistisch: erst kostenfreie Qualifizierung und Erprobung, dann ein Lotse (z. B. HTW KMU-Büro), dann ein Förderinstrument (Transfer BONUS), und erst dann die eigentliche Forschungseinrichtung. Wer diese Reihenfolge nicht kennt, landet auf Seiten wie BIFOLD oder ECDF und findet keinen Einstieg.
→ **Die Startseite bildet die Kaskade ab, nicht das Organigramm des Ökosystems.**

**B6 — Fördermittel sind oft nicht das Angebot, sondern der Schlüssel zum Angebot.** Der Transfer BONUS entscheidet darüber, ob marktlich bepreiste Wissenschaftsangebote für ein KMU überhaupt erreichbar sind.
→ **Steckbriefe brauchen Beziehungsfelder** (`ermoeglicht_durch`, `kombinierbar_mit`, `nachfolger_von`). Der Datenbestand ist ein Graph, keine Liste.

---

## 3. Nutzersicht

### 3.1 Startseite: Einstieg über Bedarfslage

Drei parallele Einstiege, nicht einer:

**A — Nach Situation** (der Hauptweg, entspricht der Kaskade aus B5)
> „Ich will verstehen, was KI für mich bedeutet" · „Ich will etwas ausprobieren, ohne zu investieren" · „Ich habe eine konkrete Idee und suche Umsetzung" · „Ich suche Geld" · „Ich suche Personal oder Qualifizierung" · „Ich muss regulatorische Anforderungen erfüllen"

**B — Nach Voraussetzung** (die Filterfrage, die am meisten Zeit spart)
> „Kostenfrei und ohne Antrag sofort nutzbar" · „Mit Antrag und Vorlauf" · „Nur für bestimmte Gruppen" (Handwerk, Solo-Selbstständige, Startups, Mitglieder)

**C — Vollständige Liste mit Facettenfilter und Volltextsuche**

Dazu prominent, weil es das Alleinstellungsmerkmal ist: **„Zuletzt geändert"** — ein chronologischer Änderungsstrom über alle Steckbriefe, inkl. Statuswechseln („Programm X endet am …"). Für Multiplikatoren wie IHK, Kammern und die DAB ist das der eigentliche Nutzwert.

### 3.2 Steckbrief-Detailseite

Aufbau von oben nach unten, bewusst in der Reihenfolge der KMU-Entscheidungsfragen:

1. **Statusbanner**, falls nicht „aktiv" (auslaufend / beendet / unklar) mit Datum und Nachfolgeverweis
2. Name, Träger, Einzeiler „Was bekomme ich hier?"
3. **Die vier Kernfragen als hervorgehobener Block:** Für wen? · Was kostet es? · Wie komme ich rein? · Wie viel Zeit kostet es mich?
4. Ausführliche Beschreibung in eigenen Worten, keine übernommene Selbstdarstellung
5. Voraussetzungen und Ausschlüsse
6. Kontaktweg und Ansprechperson
7. Verwandte Angebote (ähnlich / ermöglicht durch / Nachfolger von)
8. Quellen mit Abrufdatum
9. **Aktualisierungsfußzeile** (Abschnitt 5.3)
10. „Angabe ist falsch oder veraltet?" — Meldeweg

---

## 4. Systematik

### 4.1 Erhebungseinheit

Ein Steckbrief beschreibt **ein Angebot**: eine für ein Unternehmen abgrenzbare, in Anspruch nehmbare Leistung mit erkennbarem Zugangsweg. Träger sind eine eigene, schlanke Entität (Name, Typ, Rechtsform, Rolle, URL), auf die Steckbriefe verweisen.

Faustregel für die Abgrenzung: *Kann man einen Satz bilden, der mit „Ein Unternehmen erhält …" beginnt und mit „… indem es …" fortfährt?* Wenn nein, ist es eine Organisation, ein Ort oder eine Marke — und kein Steckbrief. Für solche Fälle gibt es einen kürzeren Eintragstyp **„Anlaufstelle"** (Ort/Institution ohne definierte Leistung), damit sie auffindbar bleiben, ohne die Angebotslogik zu verwässern.

### 4.2 Aufnahmekriterien

Aufgenommen wird ein Angebot, wenn es **alle vier** Kriterien erfüllt:

1. **Fortbestandstest** — Besteht das Angebot fort, wenn kein Auftrag zustande kommt?
2. **Zugangstest** — Ist Teilnahme ohne vorgeschaltetes Verkaufsgespräch möglich?
3. **Ergebnistest** — Ist geklärt und offengelegt, wem das Ergebnis gehört?
4. **Governancetest** — Gibt es eine offengelegte Trägerschaft, Finanzierung oder Mitgliedschaftsordnung?

Zusätzlich: erkennbarer Berlin-Bezug (Sitz, Zuständigkeit oder ausdrückliche Öffnung für Berliner Unternehmen) und thematischer Bezug zu KI oder KI-nahen Digitalisierungsfragen.

**Ausgeschlossen:** kommerzielle Beratungs-, Agentur- und Softwareangebote ohne strukturbildenden Charakter; Lead-Generierungsseiten im Gewand von Förderübersichten; reine Diskurs- und Positionsformate ohne Unterstützungsleistung.

**Grenzfälle werden aufgenommen und gekennzeichnet**, nicht stillschweigend weggelassen — mit einem Feld `abgrenzung_hinweis`. Die Vorrecherche liefert die Referenzfälle: eindeutig strukturbildend (KI-Netzwerk Handwerk, Zukunftszentrum, KI-Servicezentrum, KI-Campus, PyData Berlin, daten.berlin.de); bewusst hybrid mit tragfähiger Struktur (KI Bundesverband, KI Park e. V.); Strukturanmutung über kommerziellem Kern (Merantix AI Campus, ai.berlin); reine Dienstleistungswerbung mit Struktur-Vokabular (diverse „AI Accelerator"- und Förderratgeber-Angebote).

Diese Kriterien werden **auf der Website veröffentlicht**. Ohne offengelegte Aufnahmeregel ist ein kuratiertes Verzeichnis angreifbar.

### 4.3 Klassifikationsachsen

Facettiert, nicht hierarchisch — jedes Angebot trägt Werte auf allen Achsen.

| # | Achse | Werte |
|---|---|---|
| 1 | **Leistungsart** | Orientierung/Erstberatung · Selbstcheck · Qualifizierung · Peer-Learning · Demonstration/Erlebnis · Umsetzungsbegleitung · Umsetzung im Betrieb durch Dritte · Forschungskooperation · Testinfrastruktur · Rechenressourcen · Daten/Wissen · Zuschuss/Förderung · Kapital · Vernetzung · Navigationshilfe/Lotse · Talent-/Fachkräftekanal · Notfall-/Reaktionsdienst |
| 2 | **Bedarfsphase** | Orientieren · Bewerten · Erproben · Umsetzen · Betreiben/Skalieren |
| 3 | **Zugangsregime** | offen · anmeldepflichtig · antragspflichtig · kompetitiv (Call/Auswahlgremium) · mitgliedschaftsgebunden · nur über Lotse · nur über persönliches Netzwerk |
| 4 | **Kostenmodell** | kostenfrei · gefördert mit Eigenanteil (Quote) · marktlich · mitgliedschaftsgebunden · **Gegenleistung in Daten/Rechten** · nicht angegeben |
| 5 | **Bindungstiefe** | punktuell (< 2 h) · kurz (bis 1 Tag) · mittel (mehrtägig) · begleitend (Wochen bis Monate, mit Stundenkontingent) · dauerhaft |
| 6 | **KI-Kompetenz** | **setzt voraus** · **erzeugt** · beides · irrelevant |
| 7 | **Zielgruppenzuschnitt** | Bestands-KMU · Kleinstunternehmen/Solo · Handwerk · Startups/Gründung · öffentliche Organisationen · Beschäftigte (statt Betrieb) · branchenspezifisch |
| 8 | **Trägertyp** | Land Berlin/Landesgesellschaft · Bund · EU · Kammer · Verband · Hochschule · außeruniversitäre Forschung · Verein · privatwirtschaftlich · informell/Community |
| 9 | **Ressortlogik** | Wirtschaftsförderung (BMWE/SenWEB) · Arbeitswelt (BMAS/ESF+) · Forschung/Technologie (BMFTR) · Bildung · sonstige |
| 10 | **Räumlicher Zuschnitt** | Berlin · Berlin-Brandenburg · bundesweit mit Berlin-Zugang · EU |

Achse 6 ist die schärfste Trennlinie der Vorrecherche: Der marktnahe Teil des Ökosystems (Hubs, Acceleratoren, VC, technische Communities) **setzt** KI-Kompetenz voraus; für Anwenderbetriebe ohne ML-Team ist er faktisch leer. Achse 9 macht sichtbar, dass zwei Förderwelten dieselben Unternehmen mit unterschiedlicher Sprache adressieren, ohne voneinander zu wissen.

### 4.4 Statusmodell

| Status | Bedeutung | Darstellung |
|---|---|---|
| `aktiv` | nutzbar | normal |
| `auslaufend` | Enddatum bekannt und < 12 Monate entfernt | Hinweisbanner mit Datum |
| `ausgesetzt` | vorübergehend keine Aufnahme, Warteliste, Call geschlossen | Hinweisbanner |
| `beendet` | keine Neuaufnahme mehr | Banner, Eintrag bleibt erhalten, Nachfolgeverweis |
| `unklar` | keine belastbare Aussage möglich; Prüfdatum und Grund werden genannt | Hinweisbanner |

Der Wert `unklar` ist ausdrücklich erwünscht und kein Mangel. Bei mehreren Angeboten der Vorrecherche war „unklar" die einzig ehrliche Angabe — und ist als solche ein Reifegradbefund.

---

## 5. Datenmodell und Aktualisierungslogik

### 5.1 Speicherform

Eine Markdown-Datei je Steckbrief mit YAML-Frontmatter, versioniert in Git. Begründung: diffbar, review-fähig, ohne Datenbank betreibbar, für Nicht-Entwickler:innen les- und schreibbar, langlebig auch nach Projektende. Schemaverletzungen brechen den Build (Validierung per Zod-Schema in Astro Content Collections) — bei mehreren Bearbeitenden über zwei Jahre ist das entscheidend.

```yaml
id: dab-orientierungsgespraech           # stabil, ändert sich nie
slug: dab-orientierungsgespraech          # URL, änderbar mit Redirect
name: "DAB Orientierungsgespräche"
traeger: [digitalagentur-berlin]          # Referenz auf Trägerdatensatz
kurzbeschreibung: "45–60-minütiges anbieterneutrales Einzelgespräch …"

status: aktiv
status_begruendung: ""
finanzierung_bis: null                    # Datum oder null; null = nicht publiziert
nachfolger_von: null
nachfolger: null

leistungsart: [orientierung]
bedarfsphase: [orientieren]
zugangsregime: offen
kostenmodell: kostenfrei
eigenanteil_prozent: null
bindungstiefe: punktuell
aufwand_hinweis: "45–60 Minuten, einmalig"
ki_kompetenz: erzeugt
zielgruppe: [bestands-kmu, kleinst-solo]
zielgruppe_ausschluss: []
traegertyp: land-berlin
ressortlogik: wirtschaftsfoerderung
raeumlich: berlin

kontakt: { name: "…", mail: "…", tel: "…", weg: "Online-Buchung" }
links:
  - { url: "https://…", titel: "Angebotsseite", abgerufen: 2026-07-22 }

abgrenzung_hinweis: ""
konflikthinweis: ""                       # wenn Quellen sich widersprechen

# Forschungsmetadaten (Erhebung öffentlich, Einzelwerte intern — s. 7.4)
recherche:
  zielgruppe_klar: teilweise              # ja | teilweise | nein
  kosten_klar: ja
  leistungsumfang_klar: teilweise
  kapazitaet_genannt: nein
  laufzeit_genannt: nein
  ansprechperson_auffindbar: ja
  klicktiefe: 2                           # Klicks ab Trägerstartseite
  sprache_adressat: unternehmen           # unternehmen | wissenschaft | startup | verwaltung
  monitoring_moeglich: true               # false z. B. bei HTTP 403

pruefintervall: 180                       # Tage, aus Volatilitätsklasse
geprueft_am: 2026-07-22
geprueft_von: "CK"
changelog:
  - { datum: 2026-07-22, art: neu, feld: null, notiz: "Steckbrief angelegt" }
```

### 5.2 Prüfintervalle nach Volatilität

| Klasse | Beispiele | Intervall |
|---|---|---|
| hoch | Förderprogramme, befristete Projektangebote, Calls | 90 Tage |
| mittel | Beratungs- und Qualifizierungsangebote, Veranstaltungsreihen | 180 Tage |
| niedrig | Institutionelle Dauerangebote, Datenportale | 365 Tage |

Wird das Intervall überschritten, erscheint automatisch ein Hinweis („Angaben seit über 6 Monaten nicht geprüft"). Das ist ehrlicher als ein stilles Veralten und erzeugt redaktionellen Druck.

### 5.3 Die Aktualisierungsfußzeile

Die zentrale Anforderung. Sie verlangt eine Unterscheidung, die ein einzelnes „zuletzt geändert am"-Datum nicht leisten kann:

- **geprüft** = Inhalt wurde kontrolliert und war unverändert richtig
- **geändert** = ein bestimmtes Feld hat sich inhaltlich geändert

Beides muss sichtbar sein, sonst wirkt ein seit einem Jahr unverändert richtiger Steckbrief veraltet und ein gestern kosmetisch bearbeiteter aktuell.

**Darstellung im Fuß jedes Steckbriefs:**

> Zuletzt vollständig geprüft: **22.07.2026**
> Letzte inhaltliche Änderung: **14.05.2026** — *Kosten* (Fördersatz von 70 % auf 80 % angehoben)
> Nächste Prüfung vorgesehen: 20.01.2027 · [Vollständige Änderungshistorie ▸]

Aufgeklappt zeigt die Historie alle Einträge als Datum · Feld · Art · Notiz. Gepflegt wird sie **manuell im `changelog`-Block**, nicht aus Git-Commits abgeleitet: Commits unterscheiden Formulierungskorrekturen nicht von Faktenänderungen, und genau diese Unterscheidung ist der Zweck.

Redaktionsregel: Jede Bearbeitung setzt entweder `geprueft_am` (bei Bestätigung) oder erzeugt zusätzlich einen `changelog`-Eintrag (bei Änderung). Ein CI-Check erzwingt das — ändert sich ein inhaltliches Feld ohne neuen Changelog-Eintrag, schlägt der Build fehl. Ohne diese Erzwingung verfällt die Disziplin erfahrungsgemäß nach wenigen Monaten.

### 5.4 Umgang mit widersprüchlichen Quellen

Die Vorrecherche fand mehrfach widersprüchliche Angaben (BAFA-Fördersatz für Berlin: 50 % oder 80 %; KOMPASS-Höchstbetrag: 4.500 € oder 5.000 €; Sprechstundenzeiten des HTW-KMU-Büros). Regel: **nicht stillschweigend eine Variante wählen.** Das Feld `konflikthinweis` wird gefüllt und im Steckbrief als Hinweis ausgegeben („Die Quellen widersprechen sich; verbindlich ist die Auskunft des Trägers"). Diese Konflikte sind selbst ein Befund über die Informationsqualität des Ökosystems.

---

## 6. Technische Umsetzung

### 6.1 Stack

| Baustein | Wahl | Begründung |
|---|---|---|
| Generator | **Astro** (Static Output) | Content Collections mit Schemavalidierung, minimales JavaScript, gute Einbettungseigenschaften, langlebig |
| Inhalte | Markdown + YAML in Git | siehe 5.1 |
| Suche | **Pagefind** | statischer Index, kein Backend, funktioniert auch im Embed |
| Filter | URL-State (`?phase=orientieren&kosten=kostenfrei`) | Filterzustände sind verlinkbar und für Einbettungen vorbelegbar |
| Styling | eigenes CSS, keine Framework-Abhängigkeit | Einbettung in fremde Seiten mit unbekanntem CSS |
| Hosting | statisch (GitHub Pages / Netlify / Hochschulserver) | keine laufenden Kosten, minimale Betriebslast, übergabefähig |

Kein Login, keine Datenbank, kein serverseitiger Code. Das ist zugleich die Verstetigungsstrategie: Ein statisches Repository kann nach Projektende ohne Infrastrukturkosten weitergeführt oder übergeben werden.

### 6.2 Einbettung — drei Stufen

1. **iFrame** mit `?embed=1` (ohne Kopf-/Fußbereich) und optionalen Vorfiltern; Auto-Höhe per `postMessage`. Einzeiliger Copy-Paste-Snippet auf einer eigenen Seite „Einbetten".
2. **Web Component** (`<ki-angebote filter="…">` plus ein Script-Tag) für Partner, die keine iFrames einsetzen wollen. Shadow DOM verhindert CSS-Kollisionen.
3. **Offene Daten** — `/api/angebote.json` (vollständiger Bestand), `/api/aenderungen.json` und ein **Atom-Feed der Änderungen**, dazu JSON-LD je Steckbrief. Lizenz **CC BY 4.0** für Inhalte, MIT für Code.

Stufe 3 ist strategisch die wichtigste: Sie macht das Projekt zur *Datenquelle* statt zum konkurrierenden Portal. DAB, IHK, Kammern und die Technologiestiftung können die Daten in ihren eigenen Auftritten rendern. Damit entkräftet man den naheliegendsten Einwand — „noch ein Verzeichnis" — und erhöht zugleich die Chance auf Verstetigung.

### 6.3 Pflichten und Randbedingungen

- **Barrierefreiheit:** WCAG 2.1 AA / BITV 2.0. Bei Hochschulbetrieb rechtlich verpflichtend, inkl. Erklärung zur Barrierefreiheit. Von Beginn an mitplanen, nicht nachrüsten.
- **Datenschutz:** keine Cookies, kein Tracking, keine externen Ressourcen (Schriften lokal). Damit entfällt jedes Consent-Banner — was bei einem Angebot, das Navigierbarkeit predigt, auch inhaltlich stimmig ist.
- **Impressum, Datenschutzerklärung, Haftungsausschluss** für externe Links; Betreiberfrage klären (HWR als federführende Hochschule).
- **Druck-/PDF-Ansicht** je Steckbrief. KMU leiten solche Seiten intern weiter und drucken sie.
- **Stabile IDs und Permalinks**, Redirects bei Slug-Änderungen. Voraussetzung dafür, dass Partner dauerhaft verlinken können.

### 6.4 Halbautomatisiertes Monitoring

Ein wöchentlicher CI-Lauf erzeugt eine redaktionelle Arbeitsliste, ersetzt aber keine Prüfung:

- Linkcheck aller Quell-URLs (404, Redirects — der Coaching-BONUS-Fall wäre so aufgefallen)
- Inhaltsdiff der Quellseiten gegen den letzten Abruf; bei Änderung Flag „Quelle verändert"
- Fälligkeitsliste nach `pruefintervall`
- Fristenwarnung aus `finanzierung_bis`

Einschränkung, die im Design berücksichtigt sein muss: `ihk.de` (403), das KI-Servicezentrum und zeitweise die HTW-KI-Werkstatt (503) blockieren oder verweigern automatisierte Abrufe. Das Feld `monitoring_moeglich: false` markiert diese Einträge für rein manuelle Prüfung. Robots.txt wird respektiert.

---

## 7. Redaktion, Governance und Forschungsanschluss

### 7.1 Rollen

- **Redaktion** (Projektmitarbeitende): Recherche, Erstellung, Pflege
- **Fachprüfung** (Professur/wiss. Leitung): Freigabe neuer Steckbriefe, Entscheidung über Grenzfälle
- **Trägerrückmeldung**: Vor Erstveröffentlichung erhält jeder Träger seinen Steckbrief zur **Faktenprüfung** — ausdrücklich nicht zur Freigabe. Der Unterschied ist für die Neutralität entscheidend und sollte im Anschreiben klar benannt werden.
- **Öffentlicher Meldeweg**: „Angabe ist falsch oder veraltet?" als `mailto:`-Link mit vorbefülltem Betreff inkl. Steckbrief-ID. Kein Formular, kein Backend, keine personenbezogenen Daten.

### 7.2 Zyklus

Quartalsweise Sichtung der Fälligkeitsliste; ereignisgetriebene Sofortprüfung bei Monitoring-Flags; einmal jährlich eine vollständige Bestandsdurchsicht mit Suche nach neuen Angeboten.

### 7.3 Verstetigung

Ab Tag eins so bauen, dass das Ergebnis übergabefähig ist: offene Lizenz, statisches Repository, dokumentierter Redaktionsprozess, keine projektgebundene Infrastruktur. Kandidaten für die Übernahme nach Projektende: Digitalagentur Berlin, Technologiestiftung Berlin, IHK. Das Gespräch darüber sollte nicht erst in Monat 23 beginnen — die Vorrecherche zeigt, dass genau das der Punkt ist, an dem im Berliner Ökosystem regelmäßig Angebote still verschwinden.

### 7.4 Das Tool als Forschungsinstrument

Die Recherchemetadaten aus 5.1 sind kein Beiwerk, sondern der Forschungsertrag. Drei Auswertungen ergeben sich unmittelbar:

**Transparenzindex.** Aus `zielgruppe_klar`, `kosten_klar`, `leistungsumfang_klar`, `kapazitaet_genannt`, `laufzeit_genannt`, `klicktiefe` und `sprache_adressat` entsteht ein Maß dafür, wie gut ein Angebot kommuniziert wird. Aggregiert nach Trägertyp und Ressortlogik ist das ein empirisch unterlegter **Reifegradbefund zur Auffindbarkeit und Bewertbarkeit** — genau das Deliverable, das AP3 mit der Technologiestiftung vorsieht. Die Vorrecherche hat die Indikatoren bereits an rund 90 realen Angeboten erprobt; sie funktionieren.

**Lückenmatrix.** Leistungsart × Bedarfsphase × Zielgruppenzuschnitt. Weiße Flecken werden sichtbar — die Vorrecherche legt etwa nahe, dass die für nicht-technische Betriebe wirksamste Angebotsform („jemand baut die Lösung im Betrieb, kostenfrei") in Berlin praktisch nicht existiert, während sich fünf Träger eine nahezu identische kostenfreie Erstberatung teilen.

**Verfallsquote im Zeitverlauf.** Weil das Tool Statusänderungen protokolliert, lässt sich nach 12 und 24 Monaten sagen: Wie viel Prozent der erfassten Angebote waren beendet oder verändert — und in wie vielen Fällen war das beim Träger erkennbar? Das ist eine Ökosystem-Reifegradkennzahl, die sonst niemand erheben kann, weil sie eine longitudinale Erhebung voraussetzt. Sie ist der stärkste eigenständige Forschungsbeitrag dieses Instruments.

**Politisch heikel und deshalb explizit zu entscheiden:** Ein je Angebot ausgewiesener Transparenzwert bewertet faktisch die Kommunikationsqualität von Organisationen, die im Projekt Partner sind (DAB, Berlin Partner, Technologiestiftung, IHK). Empfehlung: Einzelwerte werden erhoben, aber zunächst **nur aggregiert und anonymisiert veröffentlicht**; öffentlich sichtbar ist auf Steckbriefebene lediglich die neutrale Angabe „Träger macht zu Kosten/Kapazität keine Angabe". Das ist inhaltlich dieselbe Information, aber als Beschreibung statt als Note.

---

## 8. Phasenplan

| Phase | Inhalt | Aufwand | Zeitbezug KI-InnoX |
|---|---|---|---|
| **0 — Systematik festzurren** | Aufnahmekriterien, Achsen und Feldschema im Team verabschieden; 3–4 Grenzfälle gemeinsam entscheiden; Namens- und Domainfrage klären | 3–5 PT | Monat 1–2 |
| **1 — Schematest an echtem Material** | 15 Steckbriefe von Hand nach Schema anlegen, quer über alle Trägertypen (bewusst inkl. der schwierigen Fälle: #ai_berlin hub, MDZ Berlin, HWK-BIT, Transfer BONUS). Schema danach überarbeiten. | 8–10 PT | Monat 2–3 |
| **2 — Tool-Build** | Astro-Setup, Schemavalidierung, Detail- und Übersichtsseite, Facettenfilter, Suche, Changelog-Fußzeile, Statusbanner, Embed-Stufen 1–3, Barrierefreiheit, Impressum | 15–20 PT | Monat 3–5 |
| **3 — Vollrecherche** | systematische Erhebung nach festem Protokoll; Erfassung der Recherchemetadaten im selben Arbeitsgang | 25–40 PT, abhängig vom Zielumfang | Monat 4–8 |
| **4 — Trägerrückmeldung und Launch** | Faktenprüfung durch Träger, Einarbeitung, Veröffentlichung, Einbettung bei Partnern | 8–12 PT | Monat 8–10 |
| **5 — Pflegebetrieb** | quartalsweise Prüfzyklen, Monitoring-Auswertung | ca. 2–3 PT je Quartal | fortlaufend |
| **6 — Forschungsauswertung** | Transparenzindex, Lückenmatrix, erste Verfallsquote | 10–15 PT | Monat 14–16 und 22–24 |

Phase 1 vor Phase 2 ist nicht verhandelbar. Ein Schema, das nicht an den schwierigen Fällen getestet wurde, wird während der Vollrecherche geändert — und dann sind bereits erfasste Steckbriefe inkonsistent.

---

## 9. Offene Entscheidungen

| # | Frage | Empfehlung |
|---|---|---|
| 1 | **Name und Domain** | „Kompass" ist im Berliner Feld bereits belegt (Zukunftszentrum-„Beratungskompass", DAB-„Ethik-Kompass für KI", Förderprogramm KOMPASS). Vor der Festlegung eine kurze Markenprüfung. Alternativen in Richtung „KI-Angebote Berlin" oder „Was gibt es für mich?" |
| 2 | **Räumlicher Zuschnitt** | Berlin als Kern, Berlin-Brandenburg-Angebote aufnehmen und als solche kennzeichnen — MDZ Berlin und EDIH pro_digital adressieren beide Länder, ein reiner Berlin-Filter würde sie verlieren |
| 3 | **Privatwirtschaftliche Angebote** | Aufnehmen, wenn die vier Kriterien aus 4.2 erfüllt sind — nicht pauschal ausschließen. Sonst fehlen strukturtragende Akteure wie der Merantix AI Campus. Kennzeichnung über Trägertyp und `abgrenzung_hinweis` |
| 4 | **Zielumfang** | 80–120 Steckbriefe sind realistisch pflegbar. Vollständigkeit ist kein sinnvolles Ziel; Aktualität ist es |
| 5 | **Öffentliche Sichtbarkeit des Transparenzindex** | zunächst nur aggregiert (siehe 7.4) |
| 6 | **Betreiber und Hosting** | HWR als federführende Hochschule; Hosting statisch. Barrierefreiheitspflicht und Impressumsfrage hängen daran |
| 7 | **Startsprache** | Deutsch. Englische Fassung erst, wenn die deutsche stabil gepflegt ist — sonst verdoppelt sich der Pflegeaufwand bei halber Qualität |

---

## 10. Risiken

| Risiko | Bewertung | Gegenmaßnahme |
|---|---|---|
| **Pflege schläft ein** | hoch, und der häufigste Grund für das Scheitern solcher Verzeichnisse | Prüfintervalle mit sichtbarem Veraltungshinweis; CI-erzwungene Changelog-Disziplin; früh geklärte Übergabeperspektive |
| **Wahrnehmung als „noch ein Portal"** | mittel bis hoch — es existieren bereits mindestens vier Lotsenverzeichnisse | Klare Differenzierung über Statuspflege und Änderungsstrom; offene Daten, damit andere die Inhalte nutzen statt konkurrieren |
| **Konflikt mit Projektpartnern über Darstellung** | mittel | Trägerrückmeldung als Faktenprüfung, kein Freigaberecht; Transparenzindex zunächst nur aggregiert; keine Bewertungen, nur Beschreibungen |
| **Haftung für falsche Angaben** | gering | Sichtbares Prüfdatum, Quellenangaben mit Abrufdatum, Haftungsausschluss, Verweis auf verbindliche Trägerauskunft |
| **Recherche wird zur Kartierung des Beratungsmarkts** | mittel | Aufnahmekriterien; Erhebung entlang von Trägern statt entlang von Suchmaschinenergebnissen |
| **Schemaänderung nach Beginn der Vollrecherche** | mittel | Phase 1 als verpflichtender Schematest an schwierigen Fällen |
