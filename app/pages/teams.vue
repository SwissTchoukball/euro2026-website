<template>
  <main>
    <euro-breadcrumbs :items="breadcrumbs" />

    <section class="l-section">
      <h2 class="t-headline-1">{{ $t("competition.team.title", 2) }}</h2>
      <euro-loading-indicator v-if="status === 'pending'" for-section />
      <template v-for="competition in competitions" :key="competition.id">
        <h3 class="t-headline-2">
          <NuxtLink :to="$localePath(`/competitions/${getCompetitionSlugFromId(competition.id)}`)">
            {{ localizeCompetitionEntityName(competition.name) }}
          </NuxtLink>
        </h3>
        <euro-sub-navigation
          :title="$t('competition.team.title', competition.teamsNavigationItems.length)"
          :items="competition.teamsNavigationItems"
        />
      </template>
    </section>
  </main>
</template>

<script setup lang="ts">
import { tchoukNetApiService } from "@/services/tchoukNetApiService";
import { getCompetitionSlugFromId, getSlugFromId } from "@/services/tchoukNetSlugIdMapping";
import type { TchoukNetCompetition, TchoukNetParticipation } from "~/services/tchoukNetApi";

const { t } = useI18n();
const localePath = useLocalePath();
const { localizeCompetitionEntityName } = useI18nHelper();

const { data, status } = useAsyncData("event", () => tchoukNetApiService.getEvent());

const breadcrumbs = computed(() => {
  const items = [{ text: t("navigation.teams"), to: localePath("/teams") }];

  return items;
});

const competitions = computed<
  (Pick<TchoukNetCompetition, "id" | "name"> & { teamsNavigationItems: { text: string; to: string }[] })[]
>(() => {
  return (
    data.value?.event.competitions.map((competition) => ({
      ...competition,
      teamsNavigationItems:
        data.value?.participations
          .filter((p) => p.competition?.id === competition.id)
          .sort((a, b) =>
            localizeCompetitionEntityName(a.team.name).localeCompare(localizeCompetitionEntityName(b.team.name))
          )
          .map((participation: TchoukNetParticipation) => {
            const competitionSlug = getCompetitionSlugFromId(participation.competition?.id);
            return {
              text: `${participation.team.team_entity.countries
                .map((country) => country.emoji)
                .join("")} ${localizeCompetitionEntityName(participation.team.name)}`,
              to: competitionSlug
                ? localePath(
                    `/competitions/${competitionSlug}/team/${getSlugFromId(
                      participation.team.team_entity_identifier,
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
