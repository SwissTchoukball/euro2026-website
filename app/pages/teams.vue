<template>
  <main>
    <euro-breadcrumbs :items="breadcrumbs" />

    <section class="l-section">
      <h2 class="t-headline-1">{{ $t("competition.team.title", 2) }}</h2>
      <euro-loading-indicator v-if="status === 'pending'" for-section />
      <template v-for="competition in competitions" :key="competition.id">
        <h3 class="t-headline-2">
          <NuxtLink :to="$localePath(`/competitions/${getCompetitionSlugFromId(competition.id)}`)">
            {{ localizeCompetitionEntityName(competition.name) }}
          </NuxtLink>
        </h3>
        <euro-team-navigation
          :title="$t('competition.team.title', competition.participations.length)"
          :participations="competition.participations"
          class="c-teams__navigation"
        />
      </template>
    </section>
  </main>
</template>

<script setup lang="ts">
import { tchoukNetApiService } from "@/services/tchoukNetApiService";
import { getCompetitionSlugFromId } from "@/services/tchoukNetSlugIdMapping";
import type { TchoukNetCompetition, TchoukNetParticipation } from "~/services/tchoukNetApi";

const { t } = useI18n();
const localePath = useLocalePath();
const { localizeCompetitionEntityName } = useI18nHelper();

const { data, status } = useAsyncData("event", () => tchoukNetApiService.getEvent());

const breadcrumbs = computed(() => {
  const items = [{ text: t("navigation.teams"), to: localePath("/teams") }];

  return items;
});

const competitions = computed<
  (Pick<TchoukNetCompetition, "id" | "name"> & {
    participations: TchoukNetParticipation[];
  })[]
>(() => {
  return (
    data.value?.event.competitions.map((competition) => ({
      ...competition,
      participations: data.value?.participations.filter((p) => p.competition?.id === competition.id) || [],
    })) || []
  );
});
const pageTitle = computed(() => `${t("competition.team.title", 2)} · ${t("eventName")}`);

useSeoMeta({
  title: () => pageTitle.value,
  ogTitle: () => pageTitle.value,
});
</script>

<style scoped>
.c-teams__navigation {
  margin-top: var(--euro-spacing-4);
  margin-bottom: var(--euro-spacing-12);
}
</style>
