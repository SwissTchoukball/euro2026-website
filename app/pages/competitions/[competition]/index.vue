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
    </section>
    <euro-game-planning-overview v-if="data" :planning-overview="data?.overview" />
    <euro-powered-by-tchouk-net />
  </main>
</template>

<script setup lang="ts">
import { tchoukNetSlugIdMapping } from "@/services/tchoukNetSlugIdMapping";
import type { BreadcrumbItem } from "~/components/euro-breadcrumbs.vue";

const route = useRoute();
const { t } = useI18n();
const localePath = useLocalePath();
const { localizeCompetitionEntityName } = useI18nHelper();

const competitionSlug = computed(() => route.params.competition as string);
const competitionId = computed(() => tchoukNetSlugIdMapping.competitions?.[competitionSlug.value]?.id);

const { data, status } = useAsyncCompetitionData(competitionId.value, { polling: true });

const breadcrumbs = computed<BreadcrumbItem[]>(() => {
  return [
    { text: t("navigation.competitions"), to: localePath("/competitions") },
    {
      text: data.value ? localizeCompetitionEntityName(data.value.competition.name) : "",
    },
  ];
});
</script>
