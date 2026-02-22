<template>
  <main>
    <euro-breadcrumbs :items="breadcrumbs" />
    <euro-competition-header :competition="data?.competition" :async-data-status="status" />
    <section v-if="data?.competition.participations" class="l-section">
      <h3 class="t-headline-2">{{ $t("competition.team.title", data.competition.participations.length) }}</h3>
      <euro-sub-navigation
        :title="$t('competition.title', teamsNavigationItems.length)"
        :items="teamsNavigationItems"
      />
    </section>
    <euro-game-planning-overview v-if="data" :planning-overview="data?.overview" />
    <!-- <pre>{{ data }}</pre> -->
    <euro-powered-by-tchouk-net />
  </main>
</template>

<script setup lang="ts">
import { getSlugFromId, tchoukNetSlugIdMapping } from "@/services/tchoukNetSlugIdMapping";
import type { BreadcrumbItem } from "~/components/euro-breadcrumbs.vue";
import type { TchoukNetParticipation } from "~/services/tchoukNetApi";

const route = useRoute();
const { t } = useI18n();
const localePath = useLocalePath();
const { localizeCompetitionEntityName } = useI18nHelper();

const competitionSlug = computed(() => route.params.competition as string);
const competitionId = computed(() => tchoukNetSlugIdMapping.competitions?.[competitionSlug.value]?.id);

const { data, status } = useAsyncCompetitionData(competitionId.value);

const breadcrumbs = computed<BreadcrumbItem[]>(() => {
  return [
    { text: t("navigation.competitions"), to: localePath("/competitions") },
    {
      text: data.value ? localizeCompetitionEntityName(data.value.competition.name) : "",
    },
  ];
});

const teamsNavigationItems = computed(() => {
  if (!data.value?.competition.participations) {
    return [];
  }
  return data.value.competition.participations.map((participation: TchoukNetParticipation) => ({
    text: `${participation.team.countries.map((country) => country.emoji).join("")} ${localizeCompetitionEntityName(
      participation.team.name
    )}`,
    to: localePath(
      `/competitions/${competitionSlug.value}/team/${getSlugFromId(
        participation.team.identifier,
        competitionSlug.value,
        "teams"
      )}`
    ),
  }));
});
</script>
