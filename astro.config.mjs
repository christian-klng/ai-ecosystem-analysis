import { defineConfig } from 'astro/config';

// Statischer Output, keine Datenbank, kein serverseitiger Code.
// Die öffentliche Adresse steuert die absoluten URLs in Feed und JSON. Zur Buildzeit über die
// Umgebungsvariable SITE_URL setzbar (Coolify: Build-Variable), sonst Platzhalter-Domain.
const SITE_URL = process.env.SITE_URL || 'https://ki-angebote.berlin';

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
  markdown: {
    // Keine externen Ressourcen; Syntaxhighlighting inline.
    shikiConfig: { theme: 'github-light' },
  },
});
