<template>
  <div
    class="c-game"
    :class="{ 'c-game--semi-final': isSemiFinal, 'c-game--final': isFinal, 'c-game--3rd-place-final': is3rdPlaceFinal }"
  >
    <div class="c-game__metadata">
      <div class="c-game__status">
        <euro-game-status :game="game" />
        <NuxtLink
          v-if="game.field && !hideField"
          :to="$localePath(`/competitions/field/${getFieldSlugFromId(game.field.id)}`)"
          class="c-game__field"
        >
          <Icon icon="ph:court-basketball-fill" width="16" height="16" />
          {{ localizeCompetitionEntityName(game.field.name) }}
        </NuxtLink>
      </div>

      <div class="c-game__name-and-phase">
        <div v-if="game.name" class="c-game__name">{{ localizeCompetitionEntityName(game.name) }}</div>
        <div v-if="showCompetition && phase?.name && !game.name">{{ localizeCompetitionEntityName(phase?.name) }}</div>
        <div v-if="showCompetition && phase?.competition" class="c-game__competition">
          <NuxtLink :to="$localePath(`/competitions/${getCompetitionSlugFromId(phase?.competition.id)}`)">
            {{ localizeCompetitionEntityName(phase.competition.name) }}
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="c-game__content">
      <euro-layout-separation class="countries">
        <template #a>
          <Icon
            :icon="`twemoji:flag-${getCountryFlagNameFromId(game.selection_a?.team?.team_entity?.countries?.[0]?.id)}`"
            class="c-game__country-flag"
          />
        </template>
        <template #b>
          <Icon
            :icon="`twemoji:flag-${getCountryFlagNameFromId(game.selection_b?.team?.team_entity?.countries?.[0]?.id)}`"
            class="c-game__country-flag"
          />
        </template>
      </euro-layout-separation>
      <euro-layout-separation class="teams" light name>
        <template #a>
          <euro-team-name
            :team="game.selection_a?.team"
            :label="game.label_a"
            :winner="teamAWon"
            :competition="phase?.competition"
          />
        </template>
        <template #b>
          <euro-team-name
            :team="game.selection_b?.team"
            :label="game.label_b"
            :winner="teamBWon"
            :competition="phase?.competition"
          />
        </template>
      </euro-layout-separation>

      <div class="c-game__scores">
        <euro-layout-separation score>
          <template #a>
            {{ game?.selection_a?.total_points || "-" }}
          </template>
          <template #b>
            {{ game?.selection_b?.total_points || "-" }}
          </template>
        </euro-layout-separation>
        <euro-layout-separation v-for="(periodScore, period) in periodScores" :key="period" center>
          <template #a>
            {{ periodScore.a || (periodScore.b ? "0" : "-") }}
          </template>
          <template #b>
            {{ periodScore.b || (periodScore.a ? "0" : "-") }}
          </template>
        </euro-layout-separation>
      </div>
    </div>

    <nuxt-link v-if="showMore" class="c-game__more" :to="`https://tchouk.net/game/${game.id}`" :title="showMoreLabel">
      <Icon :icon="showMoreIcon" width="24" height="24" />
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";

import type { TchoukNetGame } from "~/services/tchoukNetApi";
import {
  getCompetitionSlugFromId,
  getCountryFlagNameFromId,
  getFieldSlugFromId,
} from "~/services/tchoukNetSlugIdMapping";

const { localizeCompetitionEntityName } = useI18nHelper();
const {
  game,
  showMore = true,
  showCompetition = true,
  hideField = false,
} = defineProps<{
  game: TchoukNetGame;
  showMore?: boolean;
  showCompetition?: boolean;
  hideField?: boolean;
}>();

const phase = computed(() => {
  return game.competition_phase || null;
});

const teamAWon = computed(() => {
  return (
    (game.has_ended || game.status === "forfeited") &&
    (game.selection_a?.total_points || 0) > (game.selection_b?.total_points || 0)
  );
});

const teamBWon = computed(() => {
  return (
    (game.has_ended || game.status === "forfeited") &&
    (game.selection_b?.total_points || 0) > (game.selection_a?.total_points || 0)
  );
});

const periodScores = computed(() => {
  const scores = [];

  const periodCounts = [
    3,
    Object.keys(game.selection_a?.period_points || {}).length || 0,
    Object.keys(game.selection_b?.period_points || {}).length || 0,
  ];
  const periodCount = Math.max(...periodCounts);

  let score_a, score_b;
  for (let i = 1; i <= periodCount; i++) {
    const period = i.toString() as "1" | "2" | "3";
    score_a = game?.selection_a?.period_points ? game.selection_a.period_points[period] || 0 : 0;
    score_b = game?.selection_b?.period_points ? game.selection_b.period_points[period] || 0 : 0;

    scores.push({
      a: score_a,
      b: score_b,
    });
  }
  return scores;
});

const isSemiFinal = computed(() => {
  return game.competition_phase?.name?.toLowerCase().includes("semi-final");
});

const is3rdPlaceFinal = computed(() => {
  return !isSemiFinal.value && game.competition_phase?.name?.toLowerCase().includes("3rd place final");
});

const isFinal = computed(() => {
  return !isSemiFinal.value && !is3rdPlaceFinal.value && game.competition_phase?.name?.toLowerCase().includes("final");
});

const showMoreIcon = computed(() => {
  return game.link_youtube_url ? "streamline:live-video-remix" : "streamline:add-1-solid";
});

const showMoreLabel = computed(() => {
  return game.link_youtube_url ? $t("competition.game.watchVideo") : $t("competition.game.moreDetails");
});
</script>

<style scoped>
.c-game {
  display: grid;
  align-items: center;
  grid-template-columns: auto 4rem;
  grid-template-areas: "status more" "content content";
  gap: var(--euro-spacing-2);
  padding: var(--euro-spacing-2);
  box-shadow: 0 0 0.5em rgba(0, 0, 0, 0.03);
  background-color: white;
  border-radius: 0.5rem;
  overflow: hidden;

  &.c-game--semi-final {
    background-color: var(--euro-sky-blue-200);
  }

  &.c-game--final {
    background-color: var(--euro-gold-200);
  }

  &.c-game--3rd-place-final {
    background-color: var(--euro-bronze-200);
  }

  @media (min-width: 40rem) {
    grid-template-columns: 25% auto 3rem;
    grid-template-areas: "status content more";
    padding-inline: var(--euro-spacing-4);
  }

  .c-game__metadata {
    display: flex;
    flex-direction: column;
    gap: var(--euro-spacing-2);
    justify-content: space-between;
  }

  .c-game__status {
    display: flex;
    align-items: end;
    gap: var(--euro-spacing-2);

    @media (min-width: 40rem) {
      flex-direction: column;
      align-items: start;
    }
  }

  .c-game__field {
    display: flex;
    align-items: center;
    gap: var(--euro-spacing-1);
    font-size: 0.8em;
    color: var(--euro-gray-500);
  }

  .c-game__name-and-phase {
    display: flex;
    align-items: baseline;
    gap: var(--euro-spacing-2);

    @media (min-width: 40rem) {
      flex-direction: column;
      align-items: start;
    }
  }

  .c-game__name {
    .c-game--final & {
      font-weight: bold;
    }
  }

  .c-game__competition {
    font-size: 0.8em;
  }

  .c-game__content {
    display: grid;
    gap: var(--euro-spacing-2);

    grid-template-columns: min-content auto min-content;

    @media (max-width: 40rem) {
      grid-area: content;
    }

    .c-game__scores {
      display: flex;
      gap: var(--euro-spacing-2);
    }
  }

  .c-game__country-flag {
    transform: scale(2.3);
  }

  .c-game__more {
    height: 100%;
    display: flex;
    gap: var(--euro-spacing-2);
    align-items: center;
    justify-content: center;
    background-color: var(--euro-blue-500);
    color: white;
    padding: var(--euro-spacing-2);
    border-radius: 0.5rem;
    text-decoration: none;
    font-size: 0.8rem;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.05em;

    &:hover {
      background-color: var(--euro-sky-blue-500);
    }
  }
}
</style>
