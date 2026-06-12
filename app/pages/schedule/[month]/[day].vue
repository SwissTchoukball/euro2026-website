<template>
  <div>
    <h3 class="t-headline-2 c-schedule-day__title">
      {{ date.toLocaleDateString(`${locale}-CH`, { weekday: "long", day: "numeric", month: "long" }) }}
    </h3>

    <div v-if="dayStatus === 'error'">Error loading day data.</div>
    <template v-if="dayData">
      <euro-game-list :games="dayData.matches" hide-field />
    </template>
    <euro-loading-indicator v-else-if="dayStatus === 'pending'" for-section />
  </div>
</template>

<script lang="ts" setup>
import { tchoukNetApiService } from "@/services/tchoukNetApiService";

const appConfig = useAppConfig();
const { locale } = useI18n();
const route = useRoute();
const month = computed(() => route.params.month as string);
const day = computed(() => route.params.day as string);
const date = computed(() => new Date(appConfig.eventYear, Number(month.value) - 1, Number(day.value)));

const { data: dayData, status: dayStatus } = useAsyncData(`day-${date.value}`, () => {
  if (!date.value) {
    throw new Error(`Undefined date: ${date.value}`);
  }
  return tchoukNetApiService.getDay(date.value.toISOString().split("T")[0]!);
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
