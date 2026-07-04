<template>
  <main>
    <euro-breadcrumbs :items="breadcrumbs" />
    <section class="l-section">
      <div v-if="fieldStatus === 'error'">Error loading field data.</div>
      <template v-if="fieldData">
        <h2 class="t-headline-1">
          {{ fieldName }}
        </h2>
        <div class="c-field__address">
          {{ fieldData.field.venue.address }}
        </div>
        <euro-swisstopo-map :center="coordinates" :zoom="10" crosshair="marker" />
      </template>
      <euro-loading-indicator v-else-if="fieldStatus === 'pending'" for-section />
    </section>
    <euro-game-list v-if="fieldData?.games" :games="fieldData.games" hide-field />
    <euro-powered-by-tchouk-net />
  </main>
</template>

<script setup lang="ts">
import { WGStoLV95 } from "swiss-projection";

import { tchoukNetApiService } from "@/services/tchoukNetApiService";
import { tchoukNetSlugIdMapping } from "@/services/tchoukNetSlugIdMapping";
import type { BreadcrumbItem } from "~/components/euro-breadcrumbs.vue";

const route = useRoute();
const { t } = useI18n();
const localePath = useLocalePath();
const { localizeCompetitionEntityName } = useI18nHelper();

const fieldSlug = computed(() => route.params.field as string);
const fieldId = computed(() => tchoukNetSlugIdMapping.fields?.[fieldSlug.value]);
const fieldName = computed(() => (fieldData.value ? localizeCompetitionEntityName(fieldData.value.field.name) : ""));

const {
  data: fieldData,
  status: fieldStatus,
  refresh,
} = useAsyncData(
  `field-${fieldId.value}`,
  () => {
    if (!fieldId.value) {
      throw new Error(`Undefined field ID: ${fieldId.value} / slug: ${fieldSlug.value}`);
    }
    return tchoukNetApiService.getField(fieldId.value);
  },
  { server: false },
);
usePolling(refresh);

const breadcrumbs = computed<BreadcrumbItem[]>(() => {
  return [
    { text: t("navigation.competitions"), to: localePath("/competitions") },
    {
      text: fieldData.value ? localizeCompetitionEntityName(fieldData.value.field.name) : "",
    },
  ];
});

const coordinates = computed<string>(() => {
  if (!fieldData.value?.field.venue.coordinates?.longitude || !fieldData.value.field.venue.coordinates.latitude) {
    return "";
  }

  return WGStoLV95([
    fieldData.value.field.venue.coordinates.longitude,
    fieldData.value.field.venue.coordinates.latitude,
  ]).join(",");
});
const pageTitle = computed(() => `${fieldName.value} · ${$t("eventName")}`);

useSeoMeta({
  title: () => pageTitle.value,
  ogTitle: () => pageTitle.value,
});
</script>

<style scoped>
.c-field__address {
  white-space: pre-wrap;
}
</style>
