<template>
  <main>
    <euro-breadcrumbs :items="breadcrumbs" />
    <section class="l-section">
      <div v-if="countryStatus === 'error'">Error loading country data.</div>
      <template v-if="countryData">
        <h2 class="t-headline-1">
          {{ localizeCompetitionEntityName(countryData.country.name) }} {{ countryData.country.emoji }}
        </h2>
        <h3 class="t-headline-3">{{ $t("competition.team.title", countryData.participations.length) }}</h3>
        <euro-team-navigation
          :title="$t('competition.team.title', countryData.participations.length)"
          :participations="sortedParticipations"
          hide-flag
          show-competition
          skip-sorting
        />
      </template>
      <euro-loading-indicator v-else-if="countryStatus === 'pending'" for-section />
    </section>
    <euro-game-planning-overview v-if="countryData" :planning-overview="countryData?.overview" show-competition />
    <euro-powered-by-tchouk-net />
  </main>
</template>

<script setup lang="ts">
import { tchoukNetApiService } from "@/services/tchoukNetApiService";
import { tchoukNetSlugIdMapping } from "@/services/tchoukNetSlugIdMapping";
import type { BreadcrumbItem } from "~/components/euro-breadcrumbs.vue";

const route = useRoute();
const { t } = useI18n();
const localePath = useLocalePath();
const { localizeCompetitionEntityName } = useI18nHelper();

const countrySlug = computed(() => route.params.country as string);
const countryId = computed(() => tchoukNetSlugIdMapping.countries?.[countrySlug.value]);

const { data: eventData } = useAsyncData("event", () => tchoukNetApiService.getEvent());

const {
  data: countryData,
  status: countryStatus,
  refresh,
} = useAsyncData(`country-${countryId.value}`, () => {
  if (!countryId.value) {
    throw new Error(`Undefined country ID: ${countryId.value} / slug: ${countrySlug.value}`);
  }
  return tchoukNetApiService.getCountry(countryId.value);
});
usePolling(refresh);

const sortedParticipations = computed(() => {
  // TODO: Sort countryData.participations by competition, based on the order in which eventData.value.event.competitions are given.
  return (
    countryData.value?.participations.toSorted((a, b) => {
      if (!eventData.value) {
        return 0;
      }
      const aCompetitionIndex = eventData.value.event.competitions.findIndex((c) => c.id === a.competition?.id);
      const bCompetitionIndex = eventData.value.event.competitions.findIndex((c) => c.id === b.competition?.id);
      return aCompetitionIndex - bCompetitionIndex;
    }) || []
  );
});

const breadcrumbs = computed<BreadcrumbItem[]>(() => {
  return [
    { text: t("navigation.competitions"), to: localePath("/competitions") },
    {
      text: countryData.value ? localizeCompetitionEntityName(countryData.value.country.name) : "",
    },
  ];
});
</script>
