<template>
  <main>
    <euro-breadcrumbs :items="breadcrumbs" />
    <section class="l-section">
      <euro-loading-indicator v-if="fieldStatus === 'pending'" for-section />
      <div v-else-if="fieldStatus === 'error'">Error loading field data.</div>
      <template v-else-if="fieldData">
        <h2 class="t-headline-1">
          {{ localizeCompetitionEntityName(fieldData.field.name) }}
        </h2>
      </template>
    </section>
    <euro-game-list v-if="fieldData?.games" :games="fieldData.games" hide-field />
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
const { localizeCompetitionEntityName } = useI18nHelper();

const fieldSlug = computed(() => route.params.field as string);
const fieldId = computed(() => tchoukNetSlugIdMapping.fields?.[fieldSlug.value]);

const { data: fieldData, status: fieldStatus } = useAsyncData(`field-${fieldId.value}`, () => {
  if (!fieldId.value) {
    throw new Error(`Undefined field ID: ${fieldId.value} / slug: ${fieldSlug.value}`);
  }
  return tchoukNetApiService.getField(fieldId.value);
});

const breadcrumbs = computed<BreadcrumbItem[]>(() => {
  return [
    { text: t("navigation.competitions"), to: localePath("/competitions") },
    {
      text: fieldData.value ? localizeCompetitionEntityName(fieldData.value.field.name) : "",
    },
  ];
});
</script>
