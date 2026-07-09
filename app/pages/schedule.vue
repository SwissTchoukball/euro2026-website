<template>
  <main>
    <euro-breadcrumbs :items="breadcrumbs" />

    <section class="l-section">
      <h2 class="t-headline-1">{{ $t("schedule.title") }}</h2>
      <euro-sub-navigation
        :title="$t('schedule.title')"
        :items="subNavigationItems"
        class="c-schedule__sub-navigation"
      />

      <NuxtPage />
    </section>
  </main>
</template>

<script lang="ts" setup>
import type { BreadcrumbItem } from "~/components/euro-breadcrumbs.vue";
import scheduleRedirect from "~/middleware/schedule-redirect";

definePageMeta({
  middleware: [scheduleRedirect],
});

const { t, locale } = useI18n();
const localePath = useLocalePath();
const route = useRoute();
const appConfig = useAppConfig();

const month = computed(() => route.params.month as string);
const day = computed(() => route.params.day as string);
const selectedDate = computed(() => {
  if (!month.value || !day.value) {
    return undefined;
  }
  return new Date(appConfig.eventYear, Number(month.value) - 1, Number(day.value));
});

const breadcrumbs = computed<BreadcrumbItem[]>(() => {
  return [
    { text: t("navigation.schedule"), to: selectedDate.value ? localePath("/schedule") : undefined },
    ...(selectedDate.value
      ? [{ text: selectedDate.value.toLocaleDateString(`${locale.value}-CH`, { day: "numeric", month: "long" }) }]
      : []),
  ];
});

const days = appConfig.eventDays.map((day) => new Date(day));

const subNavigationItems = computed(() => {
  return days.map((day: Date) => ({
    text: day.toLocaleDateString(`${locale.value}-CH`, { weekday: "short", day: "numeric", month: "short" }),
    to: localePath(`/schedule/${day.getMonth() + 1}/${day.getDate()}`),
  }));
});

const pageTitle = computed(() => `${t("schedule.title")} · ${t("eventName")}`);

useSeoMeta({
  title: () => pageTitle.value,
  ogTitle: () => pageTitle.value,
});
</script>

<style scoped>
.c-schedule__sub-navigation {
  margin-top: var(--euro-spacing-2);
}
</style>
