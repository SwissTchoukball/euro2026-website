<template>
  <div>
    <h3 class="t-headline-2 c-schedule-day__title">
      {{ date.toLocaleDateString(`${locale}-CH`, { weekday: "long", day: "numeric", month: "long" }) }}
    </h3>

    <div v-if="dayStatus === 'error'">Error loading day data.</div>
    <template v-if="sortedMatches">
      <euro-game-list :games="sortedMatches" hide-date-headings hide-date />
    </template>
    <euro-loading-indicator v-else-if="dayStatus === 'pending'" for-section />
  </div>
</template>

<script lang="ts" setup>
import { tchoukNetApiService } from "@/services/tchoukNetApiService";

const appConfig = useAppConfig();
const { locale, t } = useI18n();
const route = useRoute();
const month = computed(() => route.params.month as string);
const day = computed(() => route.params.day as string);
const date = computed(() => new Date(appConfig.eventYear, Number(month.value) - 1, Number(day.value)));

const {
  data: dayData,
  status: dayStatus,
  refresh,
} = useAsyncData(
  `day-${date.value}`,
  () => {
    if (!date.value) {
      throw new Error(`Undefined date: ${date.value}`);
    }
    return tchoukNetApiService.getDay(
      `${appConfig.eventYear}-${month.value.padStart(2, "0")}-${day.value.padStart(2, "0")}`,
    );
  },
  { server: false },
);

usePolling(refresh);

const sortedMatches = computed(() => {
  return dayData.value?.matches.toSorted((a, b) => a.start_at!.localeCompare(b.start_at!));
});

const pageTitle = computed(
  () =>
    `${t("schedule.title")} · ${date.value.toLocaleDateString(`${locale.value}-CH`, { day: "numeric", month: "long" })} · ${t("eventName")}`,
);

useSeoMeta({
  title: () => pageTitle.value,
  ogTitle: () => pageTitle.value,
});
</script>

<style scoped>
.c-schedule-day__title {
  margin-bottom: var(--euro-spacing-8);

  &::first-letter {
    text-transform: capitalize;
  }
}
</style>
