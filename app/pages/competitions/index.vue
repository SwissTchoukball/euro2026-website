<template>
  <main>
    <euro-breadcrumbs :items="breadcrumbs" />

    <section class="l-section">
      <h2 class="t-headline-1">{{ $t("competition.title", data?.event.competitions.length || 2) }}</h2>
      <euro-loading-indicator v-if="status === 'pending'" for-section />
      <euro-sub-navigation
        v-if="data?.event"
        :title="$t('competition.title', subNavigationItems.length)"
        :items="subNavigationItems"
      />
    </section>

    <!-- TODO: Show list of countries -->

    <section v-if="data" class="l-section">
      <euro-game-planning-overview :planning-overview="data?.overview" />
    </section>

    <euro-powered-by-tchouk-net />
    <!-- <pre>{{ data }}</pre> -->
  </main>
</template>

<script setup lang="ts">
import { tchoukNetApiService } from "@/services/tchoukNetApiService";
import { getCompetitionSlugFromId } from "@/services/tchoukNetSlugIdMapping";

const { t } = useI18n();
const localePath = useLocalePath();

const { data, status } = useAsyncData("event", () => tchoukNetApiService.getEvent());

const breadcrumbs = computed(() => {
  const items = [{ text: t("navigation.competitions"), to: localePath("/competitions") }];

  return items;
});

const subNavigationItems = computed(() => {
  if (!data.value?.event.competitions) {
    return [];
  }
  return data.value.event.competitions.map((competition: any) => ({
    text: competition.name,
    to: localePath({
      name: "competitions-competition",
      params: { competition: getCompetitionSlugFromId(competition.id) },
    }),
  }));
});
</script>
