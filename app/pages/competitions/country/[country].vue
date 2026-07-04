<template>
  <main>
    <euro-breadcrumbs :items="breadcrumbs" />
    <section class="l-section">
      <div v-if="countryStatus === 'error'">Error loading country data.</div>
      <template v-if="countryData">
        <h2 class="t-headline-1 c-country__name">
          {{ countryName }}
          <Icon :name="`twemoji:flag-${getCountryFlagNameFromId(countryData.country.id)}`" class="c-country__flag" />
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
import { getCountryFlagNameFromId, tchoukNetSlugIdMapping } from "@/services/tchoukNetSlugIdMapping";
import type { BreadcrumbItem } from "~/components/euro-breadcrumbs.vue";

const route = useRoute();
const { t } = useI18n();
const localePath = useLocalePath();
const { localizeCompetitionEntityName } = useI18nHelper();

const countrySlug = computed(() => route.params.country as string);
const countryId = computed(() => tchoukNetSlugIdMapping.countries?.[countrySlug.value]);
const countryName = computed(() =>
  countryData.value ? localizeCompetitionEntityName(countryData.value.country.name) : "",
);

const { data: eventData } = useAsyncData("event", () => tchoukNetApiService.getEvent());

const {
  data: countryData,
  status: countryStatus,
  refresh,
} = useAsyncData(
  `country-${countryId.value}`,
  () => {
    if (!countryId.value) {
      throw new Error(`Undefined country ID: ${countryId.value} / slug: ${countrySlug.value}`);
    }
    return tchoukNetApiService.getCountry(countryId.value);
  },
  { server: false },
);
usePolling(refresh);

const sortedParticipations = computed(() => {
  return (
    countryData.value?.participations.toSorted((a, b) => {
      if (!eventData.value) {
        return 0;
      }
      const aCompetitionIndex = eventData.value.event.competitions.findIndex((c) => c.id === a.competition?.id);
      const bCompetitionIndex = eventData.value.event.competitions.findIndex((c) => c.id === b.competition?.id);
      if (aCompetitionIndex !== bCompetitionIndex) {
        return aCompetitionIndex - bCompetitionIndex;
      }
      return a.team.name.localeCompare(b.team.name);
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

const pageTitle = computed(() => `${countryName.value} · ${t("eventName")}`);

useSeoMeta({
  title: () => pageTitle.value,
  ogTitle: () => pageTitle.value,
});
</script>

<style scoped>
.c-country__name {
  display: flex;
  align-items: center;
  gap: var(--euro-spacing-4);
}
</style>
