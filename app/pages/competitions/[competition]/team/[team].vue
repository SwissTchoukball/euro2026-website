<template>
  <main>
    <euro-breadcrumbs :items="breadcrumbs" />
    <section class="l-section">
      <euro-loading-indicator v-if="teamStatus === 'pending'" for-section />
      <div v-else-if="teamStatus === 'error'">Error loading team data.</div>
      <template v-else-if="teamData">
        <h2 class="t-headline-1">{{ teamData.team.name }}</h2>
        <p v-if="competitionData?.competition.name">
          {{ $t("competition.team.category", { category: competitionData.competition.name }) }}
        </p>
        <p v-if="countrySlug">
          <NuxtLink :to="localePath(`/competitions/country/${countrySlug}`)">
            {{ $t("competition.team.seeAllFromCountry", { countryName }) }}
          </NuxtLink>
        </p>
      </template>
    </section>
    <section v-if="teamData" class="l-section">
      <euro-game-list :games="teamData.games" :show-competition="false" />
    </section>
    <!-- <pre>{{ data }}</pre> -->
    <euro-powered-by-tchouk-net />
  </main>
</template>

<script setup lang="ts">
import { tchoukNetApiService } from "@/services/tchoukNetApiService";
import { getCountrySlugFromId, getSlugFromId, tchoukNetSlugIdMapping } from "@/services/tchoukNetSlugIdMapping";
import type { BreadcrumbItem } from "~/components/euro-breadcrumbs.vue";

const route = useRoute();
const { t } = useI18n();
const localePath = useLocalePath();

const competitionSlug = computed(() => route.params.competition as string);
const competitionId = computed(() => tchoukNetSlugIdMapping.competitions?.[competitionSlug.value]?.id);
const teamSlug = computed(() => route.params.team as string);
const teamId = computed(() => tchoukNetSlugIdMapping.competitions?.[competitionSlug.value]?.teams?.[teamSlug.value]);

const { data: competitionData, status: competitionStatus } = useAsyncCompetitionData(competitionId.value);

const { data: teamData, status: teamStatus } = useAsyncData(`team-${teamId.value}`, () => {
  if (!teamId.value) {
    throw new Error(`Undefined team ID: ${teamId.value} / slug: ${teamSlug.value}`);
  }
  return tchoukNetApiService.getTeam(teamId.value);
});

const countryName = computed(() => teamData.value?.team.countries[0]?.name || "");
const countrySlug = computed(() => getCountrySlugFromId(teamData.value?.team.countries[0]?.id));

const breadcrumbs = computed<BreadcrumbItem[]>(() => {
  return [
    { text: t("navigation.competitions"), to: localePath("/competitions") },
    {
      text: competitionData.value?.competition.name || "",
      to: localePath(`/competitions/${competitionSlug.value}`),
    },
    {
      text: teamData.value?.team.name || "",
    },
  ];
});
</script>
