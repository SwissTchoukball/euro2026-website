<template>
  <div class="c-game" :class="{ 'c-game--final': isFinal }" :style="{ backgroundColor }">
    <div class="c-game__metadata">
      <div class="c-game__status">
        <euro-game-status :game="game" :hide-date="hideDate" />
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
          <div class="c-game__team-name-and-jersey-color">
            <euro-team-name
              :team="game.selection_a?.team"
              :label="game.label_a"
              :winner="teamAWon"
              :competition="phase?.competition"
            />
            <Icon
              v-if="game.selection_a?.jersey_color"
              icon="fluent:shirt-20-filled"
              class="c-game__jersey-color"
              width="20"
              height="20"
              :style="{ color: game.selection_a.jersey_color }"
            />
          </div>
        </template>
        <template #b>
          <div class="c-game__team-name-and-jersey-color">
            <euro-team-name
              :team="game.selection_b?.team"
              :label="game.label_b"
              :winner="teamBWon"
              :competition="phase?.competition"
            />
            <Icon
              v-if="game.selection_b?.jersey_color"
              icon="fluent:shirt-20-filled"
              class="c-game__jersey-color"
              width="20"
              height="20"
              :style="{ color: game.selection_b.jersey_color }"
            />
          </div>
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
  hideDate?: boolean;
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

const isFinal = computed(() => {
  return phase.value?.phase_type?.name.toLowerCase() === "final";
});

const backgroundColor = computed(() => {
  if (!phase.value?.phase_type?.color_hue) return undefined;

  let lightness = 90;
  let saturation = 100;

  if (isFinal.value) {
    lightness = 75;
  }

  if (
    phase.value.phase_type?.name.toLowerCase().includes("semi-final") ||
    phase.value.phase_type?.name.toLowerCase().includes("semifinal") ||
    phase.value.phase_type?.name.toLowerCase().includes("quarter-final") ||
    phase.value.phase_type?.name.toLowerCase().includes("quarterfinal")
  ) {
    saturation = 50;
  }

  return `hsl(${phase.value.phase_type.color_hue}, ${saturation}%, ${lightness}%)`;
});

const showMoreIcon = computed(() => {
  return game.link_youtube_url ? "streamline:live-video-remix" : "mage:chart-fill";
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

  .c-game__jersey-color {
    height: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    flex-shrink: 0;

    &:deep(path) {
      stroke: var(--euro-gray-500);
      stroke-width: 1;
    }
  }

  .c-game__team-name-and-jersey-color {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: var(--euro-spacing-2);
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
