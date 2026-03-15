<template>
  <main>
    <euro-breadcrumbs :items="breadcrumbs" />

    <euro-competition-header :competition="competitionData?.competition" :async-data-status="competitionStatus" />

    <section class="l-section">
      <div v-if="status === 'error'">Error loading competition data.</div>
      <div v-if="data">
        <h2 class="t-headline-1">{{ localizeCompetitionEntityName(data.competition_phase.name) }}</h2>
      </div>
      <euro-loading-indicator v-else-if="status === 'pending'" for-section />
    </section>

    <section v-if="data && (phaseSlug.includes('group') || phaseSlug.includes('qualification'))" class="l-section">
      <euro-phase-standings :games="data.games" />
    </section>

    <section v-if="data" class="l-section">
      <euro-game-list :games="data.games" :show-competition="false" />
    </section>
    <!-- <pre>{{ data }}</pre> -->
    <euro-powered-by-tchouk-net />
  </main>
</template>

<script setup lang="ts">
import { tchoukNetApiService } from "@/services/tchoukNetApiService";
import { tchoukNetSlugIdMapping } from "@/services/tchoukNetSlugIdMapping";
import type { BreadcrumbItem } from "~/components/euro-breadcrumbs.vue";

const { t } = useI18n();
const localePath = useLocalePath();
const { localizeCompetitionEntityName } = useI18nHelper();
const route = useRoute();

const competitionSlug = computed(() => route.params.competition as string);
const competitionId = computed(() => tchoukNetSlugIdMapping.competitions?.[competitionSlug.value]?.id);
const phaseSlug = computed(() => route.params.phase as string);
const phaseId = computed(() => tchoukNetSlugIdMapping.competitions?.[competitionSlug.value]?.phases?.[phaseSlug.value]);

const { data: competitionData, status: competitionStatus } = useAsyncCompetitionData(competitionId.value);

const { data, status, refresh } = useAsyncData(
  () => `phase-${phaseId.value}`,
  () => {
    if (!phaseId.value) {
      throw new Error(`Unknown phase slug: ${phaseSlug.value}`);
    }
    return tchoukNetApiService.getPhase(phaseId.value);
  }
);

usePolling(refresh);

const breadcrumbs = computed(() => {
  const items: BreadcrumbItem[] = [
    { text: t("navigation.competitions"), to: localePath("/competitions") },
    {
      text: competitionData.value ? localizeCompetitionEntityName(competitionData.value.competition.name) : "",
      to: localePath(`/competitions/${competitionSlug.value}`),
    },
  ];

  if (phaseSlug.value) {
    const phaseId = tchoukNetSlugIdMapping.competitions[competitionSlug.value]?.phases?.[phaseSlug.value];
    const phase = competitionData.value?.competition.phases?.find((p) => p.id === phaseId);
    if (phase) {
      items.push({
        text: localizeCompetitionEntityName(phase.name),
      });
    }
  }

  return items;
});
</script>
