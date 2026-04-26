<template>
  <main>
    <euro-breadcrumbs :items="breadcrumbs" />

    <section class="l-section">
      <div v-if="teamCompetitionStatus === 'error'">Error loading team data.</div>

      <h2 v-if="teamName" class="t-headline-1">
        {{ teamName }}
        <template v-if="teamTypeName">{{ teamTypeName }}</template>
      </h2>
      <h2 v-else class="t-headline-1">&nbsp;</h2>

      <p class="c-team__description">
        <NuxtLink :to="localePath(`/competitions/country/${countrySlug}`)">
          {{ $t("competition.team.seeAllFromCountry", { countryName: localizeCompetitionEntityName(countryName) }) }}
        </NuxtLink>
      </p>

      <nav>
        <ul class="u-unstyled-list c-team__sub-navigation">
          <li>
            <NuxtLink :to="localePath(`/competitions/${competitionSlug}/team/${teamSlug}/members`)">
              {{ $t("competition.team.members.title") }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath(`/competitions/${competitionSlug}/team/${teamSlug}/games`)">
              {{ $t("competition.team.games") }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
      <euro-loading-indicator v-if="!teamCompetitionData && teamCompetitionStatus === 'pending'" for-section />
    </section>

    <NuxtPage v-if="teamTypeSlug" :team-competition-data="teamCompetitionData" :team-type-slug="teamTypeSlug" />
  </main>
</template>

<script setup lang="ts">
import { tchoukNetApiService } from "@/services/tchoukNetApiService";
import { getCountrySlugFromId, getTeamTypeSlugFromId, tchoukNetSlugIdMapping } from "@/services/tchoukNetSlugIdMapping";
import type { BreadcrumbItem } from "~/components/euro-breadcrumbs.vue";

const route = useRoute();
const { t } = useI18n();
const localePath = useLocalePath();
const { localizeCompetitionEntityName } = useI18nHelper();

// Redirect from index team page to games page
if (route.name?.toString().startsWith("competitions-competition-team-team__")) {
  navigateTo(localePath("competitions-competition-team-team-members"));
}

const competitionSlug = computed(() => route.params.competition as string);
const competitionId = computed(() => tchoukNetSlugIdMapping.competitions?.[competitionSlug.value]?.id);
const teamSlug = computed(() => route.params.team as string);
const teamId = computed(() => tchoukNetSlugIdMapping.competitions?.[competitionSlug.value]?.teams?.[teamSlug.value]);

const { data: competitionData } = useAsyncCompetitionData(competitionId.value);

const {
  data: teamCompetitionData,
  status: teamCompetitionStatus,
  refresh,
} = useAsyncData(`team-${teamId.value}`, () => {
  if (!teamId.value) {
    throw new Error(`Undefined team ID: ${teamId.value} / slug: ${teamSlug.value}`);
  }
  return tchoukNetApiService.getTeam(teamId.value);
});
usePolling(refresh);

const countryName = computed(() => teamCompetitionData.value?.team.team_entity.countries[0]?.name || "");
const countrySlug = computed(() => getCountrySlugFromId(teamCompetitionData.value?.team.team_entity.countries[0]?.id));

const teamName = computed(() =>
  teamCompetitionData.value ? localizeCompetitionEntityName(teamCompetitionData.value.team.name) : ""
);
const competitionName = computed(() =>
  competitionData.value ? localizeCompetitionEntityName(competitionData.value.competition.name) : ""
);
const teamTypeSlug = computed(() => getTeamTypeSlugFromId(teamCompetitionData.value?.team.team_entity.team_type.id));
const teamTypeName = computed(() => (teamTypeSlug.value ? t(`competition.team.type.${teamTypeSlug.value}`) : ""));

const breadcrumbs = computed<BreadcrumbItem[]>(() => {
  const crumbs = [
    { text: t("navigation.competitions"), to: localePath("/competitions") },
    {
      text: competitionName.value,
      to: localePath(`/competitions/${competitionSlug.value}`),
    },
    {
      text: teamName.value + (competitionName.value !== teamTypeName.value ? ` ${teamTypeName.value}` : ""),
    },
  ];

  if (route.name?.toString().startsWith("competitions-competition-team-team-games")) {
    crumbs.push({
      text: t("competition.team.games"),
    });
  } else if (route.name?.toString().startsWith("competitions-competition-team-team-members")) {
    crumbs.push({
      text: t("competition.team.members.title"),
    });
  }

  return crumbs;
});
</script>

<style scoped>
.c-team__description {
  margin-top: 0.5rem;
  color: var(--euro-gray-700);
}

.c-team__sub-navigation {
  margin-top: var(--euro-spacing-8);
  display: flex;
  gap: var(--euro-spacing-4);
  flex-wrap: wrap;

  font-size: 1.2rem;
  font-weight: bold;

  a {
    text-decoration: none;
    color: inherit;

    &.router-link-exact-active {
      color: var(--euro-blue-500);
      text-decoration: underline;
      text-decoration-thickness: 0.2em;
      text-underline-offset: 0.3em;
    }
  }
}
</style>
