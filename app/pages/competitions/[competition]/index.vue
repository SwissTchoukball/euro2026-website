<template>
  <main>
    <euro-breadcrumbs :items="breadcrumbs" />
    <euro-competition-header :competition="data?.competition" :async-data-status="status" />
    <section v-if="data?.competition.participations" class="l-section">
      <h3 class="t-headline-2">{{ $t("competition.team.title", data.competition.participations.length) }}</h3>
      <euro-team-navigation
        :title="$t('competition.team.title', data?.competition.participations.length)"
        :participations="data?.competition.participations"
        :competition-slug="competitionSlug"
      />
      <ul class="u-unstyled-list c-competitions__standing-list">
        <li v-for="phase in phasesWithStandings" :key="phase?.id">
          <NuxtLink
            :href="
              localePath({
                name: 'competitions-competition-phase',
                params: { competition: competitionSlug, phase: getSlugFromId(phase.id, competitionSlug, 'phases') },
              })
            "
            class="c-competitions__standings-cta"
          >
            <Icon name="ph:list-numbers" />
            {{ $t("competition.standings.cta", { phaseName: localizeCompetitionEntityName(phase.name) }) }}
          </NuxtLink>
        </li>
      </ul>
    </section>
    <euro-game-planning-overview v-if="data" :planning-overview="data?.overview" />
    <euro-powered-by-tchouk-net />
  </main>
</template>

<script setup lang="ts">
import { tchoukNetSlugIdMapping } from "@/services/tchoukNetSlugIdMapping";
import type { BreadcrumbItem } from "~/components/euro-breadcrumbs.vue";
import { getSlugFromId } from "~/services/tchoukNetSlugIdMapping";

const route = useRoute();
const { t } = useI18n();
const localePath = useLocalePath();
const { localizeCompetitionEntityName } = useI18nHelper();

const competitionSlug = computed(() => route.params.competition as string);
const competitionId = computed(() => tchoukNetSlugIdMapping.competitions?.[competitionSlug.value]?.id);
const competitionName = computed(() => (data.value ? localizeCompetitionEntityName(data.value.competition.name) : ""));

const { data, status } = useAsyncCompetitionData(competitionId.value, { polling: true });

const breadcrumbs = computed<BreadcrumbItem[]>(() => {
  return [
    { text: t("navigation.competitions"), to: localePath("/competitions") },
    {
      text: competitionName.value,
    },
  ];
});

const pageTitle = computed(() => `${t("competition.nameOf", { name: competitionName.value })} · ${t("eventName")}`);

const phasesWithStandings = computed(() => {
  return data.value?.competition.phases?.filter((phase) => {
    const phaseSlug = getSlugFromId(phase.id, competitionSlug.value, "phases");
    if (!phaseSlug) {
      return false;
    }
    return phaseHasStandings(phaseSlug);
  });
});

useSeoMeta({
  title: () => pageTitle.value,
  ogTitle: () => pageTitle.value,
});
</script>

<style scoped>
.c-competitions__standing-list {
  margin-top: var(--euro-spacing-10);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--euro-spacing-2);
}

.c-competitions__standings-cta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--euro-blue-500);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;

  color: white;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  text-decoration: none;

  > .iconify {
    flex: 1 0 auto;
  }
}
</style>
