<template>
  <main>
    <euro-breadcrumbs :items="breadcrumbs" />

    <section class="l-section">
      <h2 class="t-headline-1">{{ $t("competition.title", data?.event.competitions.length || 2) }}</h2>
      <euro-sub-navigation
        v-if="data?.event"
        :title="$t('competition.title', subNavigationItems.length)"
        :items="subNavigationItems"
      />
      <euro-loading-indicator v-else-if="status === 'pending'" for-section />
    </section>

    <section v-if="data?.countries" class="l-section">
      <h3 class="t-headline-2">{{ $t("competition.countries.title") }}</h3>
      <euro-sub-navigation
        :title="$t('competition.title', countriesNavigationItems.length)"
        :items="countriesNavigationItems"
      />
    </section>

    <section v-if="data" class="l-section">
      <euro-game-planning-overview :planning-overview="data?.overview" />
    </section>

    <euro-powered-by-tchouk-net />
    <!-- <pre>{{ data }}</pre> -->
  </main>
</template>

<script setup lang="ts">
import { tchoukNetApiService } from "@/services/tchoukNetApiService";
import { getCompetitionSlugFromId, getCountrySlugFromId } from "@/services/tchoukNetSlugIdMapping";
import type { TchoukNetCompetition, TchoukNetCountry } from "~/services/tchoukNetApi";

const { t } = useI18n();
const localePath = useLocalePath();
const { localizeCompetitionEntityName } = useI18nHelper();

const { data, status, refresh } = useAsyncData("event", () => tchoukNetApiService.getEvent());
usePolling(refresh);

const breadcrumbs = computed(() => {
  const items = [{ text: t("navigation.competitions") }];

  return items;
});

const subNavigationItems = computed(() => {
  if (!data.value?.event.competitions) {
    return [];
  }
  return data.value.event.competitions.map((competition: TchoukNetCompetition) => ({
    text: localizeCompetitionEntityName(competition.name),
    to: localePath({
      name: "competitions-competition",
      params: { competition: getCompetitionSlugFromId(competition.id) },
    }),
  }));
});

const countriesNavigationItems = computed(() => {
  if (!data.value?.countries) {
    return [];
  }
  return data.value.countries.map((country: TchoukNetCountry) => ({
    text: `${country.emoji} ${localizeCompetitionEntityName(country.name)}`,
    to: localePath(`/competitions/country/${getCountrySlugFromId(country.id)}`),
  }));
});
</script>
