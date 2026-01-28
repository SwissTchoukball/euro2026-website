import { defineNuxtPlugin } from "#app";
import VueMatomo from "vue-matomo";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueMatomo, {
    host: "https://analytics.tchoukball.ch",
    siteId: 7,
    // Enables automatically registering pageviews on the router
    router: nuxtApp.$router,
    requireConsent: false,
    trackInitialView: true,
    disableCookies: true,
    requireCookieConsent: false,
    enableDebugMode: false,
  });
});
