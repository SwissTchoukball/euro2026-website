import type { KirbySiteDe, KirbySiteEn, KirbySiteFr } from "#nuxt-kirby";

type KirbySite = KirbySiteEn | KirbySiteFr | KirbySiteDe;

/**
 * Access the global site context, similar to Kirby's `$site` global variable
 */
export function useSite() {
  return useState<Partial<KirbySite>>("app.site", () => ({}));
}
