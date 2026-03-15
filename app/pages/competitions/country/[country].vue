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
        <euro-sub-navigation
          :title="$t('competition.team.title', countryData.participations.length)"
          :items="teamsNavigationItems"
        />
      </template>
      <euro-loading-indicator v-else-if="countryStatus === 'pending'" for-section />
    </section>
    <euro-game-planning-overview v-if="countryData" :planning-overview="countryData?.overview" show-competition />
    <!-- <pre>{{ data }}</pre> -->
    <euro-powered-by-tchouk-net />
  </main>
</template>

<script setup lang="ts">
import { tchoukNetApiService } from "@/services/tchoukNetApiService";
import { getCompetitionSlugFromId, getSlugFromId, tchoukNetSlugIdMapping } from "@/services/tchoukNetSlugIdMapping";
import type { BreadcrumbItem } from "~/components/euro-breadcrumbs.vue";
import type { TchoukNetParticipation } from "~/services/tchoukNetApi";

const route = useRoute();
const { t } = useI18n();
const localePath = useLocalePath();
const { localizeCompetitionEntityName } = useI18nHelper();

const countrySlug = computed(() => route.params.country as string);
const countryId = computed(() => tchoukNetSlugIdMapping.countries?.[countrySlug.value]);

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

const breadcrumbs = computed<BreadcrumbItem[]>(() => {
  return [
    { text: t("navigation.competitions"), to: localePath("/competitions") },
    {
      text: countryData.value ? localizeCompetitionEntityName(countryData.value.country.name) : "",
    },
  ];
});

const teamsNavigationItems = computed(() => {
  if (!countryData.value?.participations) {
    return [];
  }
  return countryData.value.participations.map((participation: TchoukNetParticipation) => {
    const competitionSlug = getCompetitionSlugFromId(participation.competition?.id);
    return {
      text: `${localizeCompetitionEntityName(participation.team.name)} ${
        participation.competition ? localizeCompetitionEntityName(participation.competition?.name) : ""
      }`,
      to: competitionSlug
        ? localePath(
            `/competitions/${competitionSlug}/team/${getSlugFromId(
              participation.team.identifier,
              competitionSlug,
              "teams"
            )}`
          )
        : "",
    };
  });
});
</script>
