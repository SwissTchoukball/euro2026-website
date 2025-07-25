// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/icon", "@nuxt/image", "@maas/vue-equipment/nuxt", "@nuxtjs/i18n", "@vueuse/nuxt"],
  css: ["~/assets/css/variables.css", "~/assets/css/typography.css", "~/assets/css/main.css"],
  app: {
    head: {
      charset: "UTF-8",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "apple-mobile-web-app-title", content: "Euro 2026" },
      ],
      link: [
        { rel: "icon", type: "image/png", sizes: "96x96", href: "/favicon-96x96.png" },
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "shortcut icon", href: "/favicon.ico" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
    },
  },
  routeRules: {
    "/qr": { redirect: "/" },
  },
  i18n: {
    locales: [
      { code: "en", language: "en-UK", file: "en.json" },
      { code: "fr", language: "fr-CH", file: "fr.json" },
      { code: "de", language: "de-CH", file: "de.json" },
    ],
    strategy: "prefix_except_default",
    defaultLocale: "en",
  },
  image: {
    quality: 80,
  },
  vueEquipment: {
    composables: ["useCountdown"],
  },
});
