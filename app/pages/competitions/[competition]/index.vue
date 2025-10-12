<template>
  <main>
    <euro-breadcrumbs :items="breadcrumbs" />
    <euro-competition-header :competition="data?.competition" :async-data-status="status" />
    <euro-game-planning-overview v-if="data" :planning-overview="data?.overview" />
    <!-- <pre>{{ data }}</pre> -->
    <euro-powered-by-tchouk-net />
  </main>
</template>

<script setup lang="ts">
import { tchoukNetSlugIdMapping } from "@/services/tchoukNetSlugIdMapping";
import type { BreadcrumbItem } from "~/components/euro-breadcrumbs.vue";

const route = useRoute();
const { t } = useI18n();
const localePath = useLocalePath();

const competitionSlug = computed(() => route.params.competition as string);
const competitionId = computed(() => tchoukNetSlugIdMapping.competitions?.[competitionSlug.value]?.id);

const { data, status } = useAsyncCompetitionData(competitionId.value);

const breadcrumbs = computed<BreadcrumbItem[]>(() => {
  return [
    { text: t("navigation.competitions"), to: localePath("/competitions") },
    {
      text: data.value?.competition.name || "",
      to: localePath(`/competitions/${competitionSlug.value}`),
    },
  ];
});
</script>
