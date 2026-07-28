# syntax=docker/dockerfile:1

# --- Stufe 1: Bauen ---------------------------------------------------------
FROM node:22-alpine AS build
WORKDIR /app

# Öffentliche Adresse zur Buildzeit (Coolify: als Build-Variable setzen).
# Bestimmt die absoluten URLs im Atom-Feed und im JSON.
ARG SITE_URL=https://ki-angebote.berlin
ENV SITE_URL=${SITE_URL}

# Abhängigkeiten zuerst (bessere Layer-Nutzung). Dev-Deps werden für den
# Changelog-Validator (js-yaml) benötigt, daher kein --omit=dev.
COPY package.json package-lock.json ./
RUN npm ci

# Quellcode und Inhalte
COPY . .

# Validiert (npm run validate) und baut nach dist/
RUN npm run build

# --- Stufe 2: Ausliefern ----------------------------------------------------
FROM nginx:1.27-alpine AS serve

# Eigene Server-Konfiguration (Clean URLs, Caching, Framing erlaubt für Embeds)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Statisches Ergebnis
COPY --from=build /app/dist /usr/share/nginx/html

# Coolify/Traefik terminiert TLS und leitet auf diesen Port weiter.
EXPOSE 80

# Einfacher Health-Check (Coolify kann ihn zusätzlich extern prüfen).
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
