<template>
  <div class="c-game">
    <div class="c-game__status">
      <div>
        <euro-game-status :game="game" />
      </div>
      <div class="c-game__phase" v-if="showCompetition">
        {{ phase?.name }}
        <span v-if="phase?.competition" class="c-game__competition">
          <NuxtLink :to="`/competitions/${phase?.competition.id}`">{{ phase?.competition.name }}</NuxtLink>
        </span>
      </div>
    </div>

    <div class="c-game__content">
      <euro-layout-separation class="teams" light>
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

    <div class="c-game__more" v-if="showMore">
      <nuxt-link :to="`https://tchouk.net/game/${game.id}`" class="btn btn-primary">
        <!-- TODO: Add icons + link -->
        <!-- <image-icons-movie v-if="game.link_youtube_url" />
        <image-icons-more v-else /> -->
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TchoukNetGame } from "~/services/tchoukNetApi";

const {
  game,
  showMore = true,
  showCompetition = true,
} = defineProps<{
  game: TchoukNetGame;
  showMore?: boolean;
  showCompetition?: boolean;
}>();

const phase = computed(() => {
  return game.competition_phase || null;
});

const teamAWon = computed(() => {
  return game.has_ended && (game.selection_a?.total_points || 0) > (game.selection_b?.total_points || 0);
});

const teamBWon = computed(() => {
  return game.has_ended && (game.selection_b?.total_points || 0) > (game.selection_a?.total_points || 0);
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
</script>

<style scoped>
.c-game {
  display: grid;
  align-items: center;
  grid-template-columns: 25% auto 3rem;
  gap: var(--euro-spacing-2);
  padding: var(--euro-spacing-2) var(--euro-spacing-4);
  box-shadow: 0 0 0.5em rgba(0, 0, 0, 0.03);
  border-radius: 0.5rem;
  overflow: hidden;

  @media (max-width: 40rem) {
    grid-template-columns: auto 4rem;
    grid-template-areas: "status more" "content content";
  }

  .c-game__status {
    display: flex;
    flex-direction: column;
    gap: var(--euro-spacing-2);
    justify-content: space-between;

    .c-game__phase {
      .c-game__competition {
        display: block;
        font-size: 0.8em;
      }
    }
  }

  .c-game__content {
    display: grid;
    gap: var(--euro-spacing-2);

    grid-template-columns: auto min-content;

    @media (max-width: 40rem) {
      grid-area: content;
    }

    .c-game__scores {
      display: flex;
      gap: var(--euro-spacing-2);
    }
  }

  .c-game__more {
    height: 100%;
    display: flex;
    gap: var(--euro-spacing-2);
    align-items: stretch;

    > * {
      flex: 1;
    }
  }
}
</style>
