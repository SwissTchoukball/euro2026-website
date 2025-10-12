<template>
  <main>
    <euro-breadcrumbs :items="breadcrumbs" />
    <section class="l-section">
      <euro-loading-indicator v-if="countryStatus === 'pending'" for-section />
      <div v-else-if="countryStatus === 'error'">Error loading country data.</div>
      <template v-else-if="countryData">
        <h2 class="t-headline-1">{{ countryData.country.name }}</h2>
      </template>
    </section>
    <euro-game-planning-overview v-if="countryData" :planning-overview="countryData?.overview" />
    <!-- <pre>{{ data }}</pre> -->
    <euro-powered-by-tchouk-net />
  </main>
</template>

<script setup lang="ts">
import { tchoukNetApiService } from "@/services/tchoukNetApiService";
import { tchoukNetSlugIdMapping } from "@/services/tchoukNetSlugIdMapping";
import type { BreadcrumbItem } from "~/components/euro-breadcrumbs.vue";

const route = useRoute();
const { t } = useI18n();
const localePath = useLocalePath();

const competitionSlug = computed(() => route.params.competition as string);
const competitionId = computed(() => tchoukNetSlugIdMapping.competitions?.[competitionSlug.value]?.id);
const countrySlug = computed(() => route.params.country as string);
const countryId = computed(() => tchoukNetSlugIdMapping.countries?.[countrySlug.value]);

const { data: competitionData, status: competitionStatus } = useAsyncCompetitionData(competitionId.value);

const { data: countryData, status: countryStatus } = useAsyncData(`country-${countryId.value}`, () => {
  if (!countryId.value) {
    throw new Error(`Undefined country ID: ${countryId.value} / slug: ${countrySlug.value}`);
  }
  return tchoukNetApiService.getCountry(countryId.value);
});

const breadcrumbs = computed<BreadcrumbItem[]>(() => {
  return [
    { text: t("navigation.competitions"), to: localePath("/competitions") },
    {
      text: competitionData.value?.competition.name || "",
      to: localePath(`/competitions/${competitionSlug.value}`),
    },
    {
      text: countryData.value?.country.name || "",
    },
  ];
});
</script>
