import type { APIRoute } from 'astro';
import { getCollection, getEntries } from 'astro:content';
import { naechstePruefung, letzteAenderung } from '../../lib/steckbrief';

// Vollständiger Bestand als offene Daten (CC BY 4.0), maschinenlesbar.
export const GET: APIRoute = async ({ site }) => {
  const angebote = await getCollection('angebote');

  const refIds = (refs: { id: string }[]) => refs.map((r) => r.id);

  const items = await Promise.all(
    angebote.map(async (a) => {
      const traeger = await getEntries(a.data.traeger);
      const aenderung = letzteAenderung(a);
      return {
        id: a.slug,
        url: site ? new URL(`/angebote/${a.slug}`, site).href : `/angebote/${a.slug}`,
        eintragstyp: a.data.eintragstyp,
        name: a.data.name,
        kurzbeschreibung: a.data.kurzbeschreibung,
        traeger: traeger.map((t) => ({ id: t.id, name: t.data.name, typ: t.data.traegertyp })),
        status: a.data.status,
        status_begruendung: a.data.status_begruendung || null,
        finanzierung_bis: a.data.finanzierung_bis ?? null,
        nachfolger_von: a.data.nachfolger_von?.id ?? null,
        nachfolger: a.data.nachfolger?.id ?? null,
        klassifikation: {
          leistungsart: a.data.leistungsart,
          bedarfsphase: a.data.bedarfsphase,
          zugangsregime: a.data.zugangsregime,
          kostenmodell: a.data.kostenmodell,
          eigenanteil_prozent: a.data.eigenanteil_prozent,
          bindungstiefe: a.data.bindungstiefe,
          ki_kompetenz: a.data.ki_kompetenz,
          zielgruppe: a.data.zielgruppe,
          traegertyp: a.data.traegertyp,
          ressortlogik: a.data.ressortlogik,
          raeumlich: a.data.raeumlich,
        },
        beziehungen: {
          ermoeglicht_durch: refIds(a.data.ermoeglicht_durch),
          kombinierbar_mit: refIds(a.data.kombinierbar_mit),
          aehnlich_zu: refIds(a.data.aehnlich_zu),
        },
        kontakt: a.data.kontakt,
        links: a.data.links,
        hinweise: {
          abgrenzung: a.data.abgrenzung_hinweis || null,
          konflikt: a.data.konflikthinweis || null,
        },
        aktualisierung: {
          geprueft_am: a.data.geprueft_am,
          geprueft_von: a.data.geprueft_von,
          volatilitaet: a.data.volatilitaet,
          naechste_pruefung: naechstePruefung(a),
          letzte_aenderung: aenderung
            ? { datum: aenderung.datum, feld: aenderung.feld, notiz: aenderung.notiz }
            : null,
        },
      };
    }),
  );

  // Negativ-Liste: geprüfte, aber NICHT aufgenommene Kandidaten. Erscheint bewusst
  // nicht im Verzeichnis, nur hier — als Recherche-Gedächtnis und für die Wiedervorlage.
  const ausgeschlossenColl = await getCollection('ausgeschlossen');
  const ausgeschlossen = ausgeschlossenColl.map((a) => ({
    id: a.id.replace(/\.(ya?ml|json)$/i, ''),
    name: a.data.name,
    kurzbeschreibung: a.data.kurzbeschreibung,
    ausschlussgrund: a.data.ausschlussgrund,
    ausschluss_notiz: a.data.ausschluss_notiz,
    traeger_name: a.data.traeger_name ?? null,
    url: a.data.url ?? null,
    traegertyp: a.data.traegertyp ?? null,
    raeumlich: a.data.raeumlich ?? null,
    ki_bezug: a.data.ki_bezug ?? null,
    geprueft_am: a.data.geprueft_am,
    geprueft_von: a.data.geprueft_von,
    wiedervorlage_am: a.data.wiedervorlage_am ?? null,
    links: a.data.links,
  }));

  const payload = {
    quelle: 'KI-Angebote Berlin',
    lizenz: 'CC BY 4.0',
    stand: new Date().toISOString().slice(0, 10),
    anzahl: items.length,
    angebote: items,
    anzahl_ausgeschlossen: ausgeschlossen.length,
    ausgeschlossen,
  };

  return new Response(JSON.stringify(payload, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
