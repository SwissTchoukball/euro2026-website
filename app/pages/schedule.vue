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

onMounted(() => {
  // If we are not on the route of a specific day, redirect to the day matching the current date, or, if there is no matching day, to the closest upcoming day.
  if (!selectedDate.value) {
    const today = new Date();
    const matchingDay = days.find(
      (day: Date) =>
        day.getDate() === today.getDate() &&
        day.getMonth() === today.getMonth() &&
        day.getFullYear() === today.getFullYear(),
    );

    if (matchingDay) {
      return navigateTo(localePath(`/schedule/${matchingDay.getMonth() + 1}/${matchingDay.getDate()}`));
    }

    const closestUpcomingDay = days.find((day: Date) => day > today);
    if (closestUpcomingDay) {
      return navigateTo(localePath(`/schedule/${closestUpcomingDay.getMonth() + 1}/${closestUpcomingDay.getDate()}`));
    }
  }
});

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
