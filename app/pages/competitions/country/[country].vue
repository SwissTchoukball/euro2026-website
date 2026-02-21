<template>
  <main>
    <euro-breadcrumbs :items="breadcrumbs" />
    <section class="l-section">
      <euro-loading-indicator v-if="countryStatus === 'pending'" for-section />
      <div v-else-if="countryStatus === 'error'">Error loading country data.</div>
      <template v-else-if="countryData">
        <h2 class="t-headline-1">{{ countryData.country.name }} {{ countryData.country.emoji }}</h2>
        <h3 class="t-headline-3">{{ $t("competition.team.title", countryData.participations.length) }}</h3>
        <euro-sub-navigation
          :title="$t('competition.team.title', countryData.participations.length)"
          :items="teamsNavigationItems"
        />
      </template>
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

const countrySlug = computed(() => route.params.country as string);
const countryId = computed(() => tchoukNetSlugIdMapping.countries?.[countrySlug.value]);

const { data: countryData, status: countryStatus } = useAsyncData(`country-${countryId.value}`, () => {
  if (!countryId.value) {
    throw new Error(`Undefined country ID: ${countryId.value} / slug: ${countrySlug.value}`);
  }
  return tchoukNetApiService.getCountry(countryId.value);
});

const breadcrumbs = computed<BreadcrumbItem[]>(() => {
  return [
    { text: t("navigation.competitions"), to: localePath("/competitions") },
    {
      text: countryData.value?.country.name || "",
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
      text: `${participation.team.name} ${participation.competition?.name}`,
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
