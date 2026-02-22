<template>
  <main>
    <euro-breadcrumbs :items="breadcrumbs" />

    <section class="l-section">
      <h2 class="t-headline-1">{{ $t("competition.team.title", 2) }}</h2>
      <euro-loading-indicator v-if="status === 'pending'" for-section />
      <template v-for="country in countries" :key="country.id">
        <h3 class="t-headline-2">
          {{ country.emoji }}
          {{ localizeCompetitionEntityName(country.name) }}
        </h3>
        <NuxtLink :to="$localePath(`/competitions/country/${getCountrySlugFromId(country.id)}`)">
          {{ $t("competition.seeAllGames") }}
        </NuxtLink>
        <euro-sub-navigation
          :title="$t('competition.team.title', country.teamsNavigationItems.length)"
          :items="country.teamsNavigationItems"
        />
      </template>
    </section>
  </main>
</template>

<script setup lang="ts">
import { tchoukNetApiService } from "@/services/tchoukNetApiService";
import { getCompetitionSlugFromId, getCountrySlugFromId, getSlugFromId } from "@/services/tchoukNetSlugIdMapping";
import type { TchoukNetCountry, TchoukNetParticipation } from "~/services/tchoukNetApi";

const { t } = useI18n();
const localePath = useLocalePath();
const { localizeCompetitionEntityName } = useI18nHelper();

const { data, status } = useAsyncData("event", () => tchoukNetApiService.getEvent());

const breadcrumbs = computed(() => {
  const items = [{ text: t("navigation.teams"), to: localePath("/teams") }];

  return items;
});

const countries = computed<(TchoukNetCountry & { teamsNavigationItems: { text: string; to: string }[] })[]>(() => {
  return (
    data.value?.countries.map((country: TchoukNetCountry) => ({
      ...country,
      teamsNavigationItems:
        data.value?.participations
          ?.filter((participation: TchoukNetParticipation) =>
            participation.team.countries.find((c: TchoukNetCountry) => c.id === country.id)
          )
          .map((participation: TchoukNetParticipation) => {
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
          }) || [],
    })) || []
  );
});
</script>
