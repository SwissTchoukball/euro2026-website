<template>
  <section class="l-section">
    <euro-loading-indicator v-if="!competition && asyncDataStatus === 'pending'" for-section />
    <div v-else-if="asyncDataStatus === 'error'">Error loading competition data.</div>
    <h2 v-if="competition" class="t-headline-1">{{ localizeCompetitionEntityName(competition.name) }}</h2>
    <euro-sub-navigation
      :title="$t('competition.phase.title', subNavigationItems.length)"
      :items="subNavigationItems"
    />
  </section>
</template>

<script setup lang="ts">
import type { TchoukNetCompetition } from "~/services/tchoukNetApi";
import { getCompetitionSlugFromId, getSlugFromId } from "~/services/tchoukNetSlugIdMapping";

const localePath = useLocalePath();
const { localizeCompetitionEntityName } = useI18nHelper();

const { competition = undefined, asyncDataStatus = undefined } = defineProps<{
  competition?: TchoukNetCompetition;
  asyncDataStatus?: string;
}>();

const competitionSlug = computed(() => getCompetitionSlugFromId(competition?.id));

const subNavigationItems = computed(() => {
  if (!competition?.phases) {
    return [];
  }
  return competition.phases.map((phase: any) => ({
    text: localizeCompetitionEntityName(phase.name),
    to: localePath({
      name: "competitions-competition-phase",
      params: {
        competition: competitionSlug.value,
        phase: competitionSlug.value ? getSlugFromId(phase.id, competitionSlug.value, "phases") : undefined,
      },
    }),
  }));
});
</script>
