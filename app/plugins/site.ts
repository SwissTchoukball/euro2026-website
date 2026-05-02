import type { NuxtApp } from "#app";
import { kirbySiteDe, kirbySiteEn, kirbySiteFr } from "#nuxt-kirby";

const siteByLocale: Record<string, typeof kirbySiteEn> = {
  en: kirbySiteEn,
  fr: kirbySiteFr,
  de: kirbySiteDe,
};

export default defineNuxtPlugin((nuxtApp) => {
  const site = useSite();
  const i18n = nuxtApp.$i18n as NuxtApp["$i18n"];

  site.value = siteByLocale[i18n.locale.value] ?? {};

  if (import.meta.client) {
    nuxtApp.hook("i18n:beforeLocaleSwitch", ({ oldLocale, newLocale }) => {
      if (oldLocale === newLocale) return;
      site.value = siteByLocale[newLocale] ?? {};
    });
  }
});
