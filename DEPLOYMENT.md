# Deployment auf Coolify

Die Seite ist rein statisch. Empfohlen wird ein **Dockerfile-Deployment**: Ein Multi-Stage-Build
baut die Seite mit Node und liefert sie mit nginx aus. Coolify übernimmt Reverse Proxy und
TLS-Zertifikat automatisch (Traefik + Let's Encrypt).

Die dafür nötigen Dateien liegen bereits im Repo: [`Dockerfile`](Dockerfile),
[`nginx.conf`](nginx.conf), [`.dockerignore`](.dockerignore), [`docker-compose.yml`](docker-compose.yml).

---

## Voraussetzung: Git-Remote

Coolify deployt aus einem Git-Repository. Dieses Projekt ist noch kein Git-Repo. Einmalig:

```bash
git init
git add .
git commit -m "Angebotskompass: initialer Stand mit Deployment"
git branch -M main
git remote add origin <URL eures GitHub/GitLab/Gitea-Repos>
git push -u origin main
```

> Coolify kann öffentliche Repos ohne Zugangsdaten anbinden. Für private Repos in Coolify
> vorher eine **GitHub-App** bzw. einen **Deploy-Key** hinterlegen (Coolify → *Sources*).

---

## Deployment anlegen (Dockerfile-Weg, empfohlen)

1. In Coolify: **Project** wählen oder neu anlegen → **+ New Resource** → **Application**.
2. Als Quelle das Git-Repository wählen (bzw. „Public Repository" und die URL einfügen), Branch `main`.
3. **Build Pack: `Dockerfile`** auswählen. Coolify findet das `Dockerfile` im Repo-Wurzelverzeichnis.
4. **Port**: `80` eintragen (der Container liefert per nginx auf Port 80 aus; „Ports Exposes" = `80`).
5. **Domain**: unter *Domains* die gewünschte Adresse setzen, z. B. `https://ki-angebote.<eure-domain>`.
   Coolify stellt automatisch ein Let's-Encrypt-Zertifikat aus. DNS-A-Record vorher auf den
   Coolify-Server zeigen lassen.
6. **Build-Variable** setzen (*Environment Variables* → als *Build Variable* markieren):

   | Name       | Wert                                   |
   |------------|----------------------------------------|
   | `SITE_URL` | die finale Adresse, z. B. `https://ki-angebote.<eure-domain>` |

   Wichtig: `SITE_URL` wirkt **zur Buildzeit** (bestimmt die absoluten URLs im Atom-Feed und im
   JSON). Nach einer Domain-Änderung neu deployen.
7. **Deploy** klicken. Coolify baut das Image und startet den Container.

Fertig. Weitere Deployments laufen automatisch bei jedem Push auf `main` (Coolify richtet den
Webhook selbst ein; unter *Configuration → General* aktivierbar).

---

## Alternative: Static / Nixpacks

Ohne Docker geht es auch über den Static-Build-Pack:

- **Build Pack**: `Nixpacks` (oder „Static Site")
- **Build Command**: `npm run build`
- **Publish/Output Directory**: `dist`
- **Install Command**: `npm ci`
- `SITE_URL` ebenfalls als Build-Variable setzen.

Der Dockerfile-Weg ist vorzuziehen, weil `nginx.conf` Clean URLs, Caching und die für die
Einbettung nötige Framing-Freigabe explizit und reproduzierbar festlegt.

---

## Lokaler Test (optional, wenn Docker vorhanden)

```bash
SITE_URL=https://ki-angebote.example docker compose up --build
# dann http://localhost:8080 öffnen
```

Oder ohne Compose:

```bash
docker build --build-arg SITE_URL=https://ki-angebote.example -t ki-angebote .
docker run --rm -p 8080:80 ki-angebote
```

Ganz ohne Docker prüft `npm run build` lokal denselben Build (Validator + Astro); das Ergebnis
liegt in `dist/` und lässt sich mit `npm run preview` ansehen.

---

## Nach dem ersten Deployment prüfen

- Startseite lädt, Filter auf `/angebote` funktioniert (URL-Parameter, z. B. `?zielgruppe=handwerk`).
- Ein Steckbrief-Detail lädt, Statusbanner und Aktualisierungsfußzeile erscheinen.
- Offene Daten erreichbar: `/api/angebote.json`, `/aenderungen.xml` (Feed).
- Einbettung testbar: `/angebote?embed=1` zeigt die Seite ohne Kopf-/Fußbereich und lässt sich
  in einen fremden `<iframe>` laden (siehe Seite **Einbetten**). Läuft das nicht, prüfen, ob ein
  vorgelagerter Proxy `X-Frame-Options` setzt — das würde die Einbettung blockieren.
- Absolute URLs im Feed zeigen auf die richtige Domain (⇒ `SITE_URL` korrekt gesetzt?).

---

## Hinweise

- **TLS/HTTPS** kommt von Coolify (Traefik). Der Container spricht intern nur HTTP auf Port 80 –
  das ist korrekt so.
- **Kein Persistenz-Volume nötig.** Der Zustand steckt vollständig im Git-Repo; jedes Deployment
  baut aus den Inhalten neu. Redaktionelle Änderungen = Commit + Push.
- **Ressourcen** sind minimal (nginx auf Alpine). Ein kleiner Coolify-Server genügt.
