<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const { t, locale } = useI18n();
const title = ref(`${t("eventName")} · ${t("eventDates")} · ${t("eventLocation")}, ${t("eventCountry")}`);

useHead({
  htmlAttrs: {
    lang: () => locale.value,
  },
});

useSeoMeta({
  title,
  ogTitle: () => t("eventName"),
  description: () => t("description"),
  ogDescription: () => t("description"),
  keywords:
    "Tchoukball, Europe, Euro, European championships, championships, FITB, ETBF, Swiss Tchoukball, Switzerland, Macolin, Magglingen",
  ogType: "website",
  ogLocale: () => locale.value,
  ogUrl: "https://euro2026.ch",
  ogImage: "https://euro2026.ch/open-graph.png",
});
</script>
