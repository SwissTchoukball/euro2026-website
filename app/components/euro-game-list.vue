<template>
  <ul v-if="games.length > 0" class="u-unstyled-list c-game-list">
    <template v-for="(game, index) in games" :key="game.id">
      <li class="c-game-list__item">
        <h3 v-if="showDateHeading(game, index)" class="c-game-list__heading t-headline-4">
          {{ formatDate(game.start_at!) }}
        </h3>
        <euro-game :game="game" :show-competition="showCompetition" :hide-field="hideField" :hide-date="hideDate" />
      </li>
    </template>
  </ul>
  <div v-else class="c-game-list__empty">
    <p>{{ $t("competition.game.emptyList") }}</p>
    <Icon icon="ph:court-basketball-duotone" width="100" height="100" />
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";

import type { TchoukNetGame } from "~/services/tchoukNetApi";

const {
  games,
  showCompetition = true,
  hideDateHeadings,
} = defineProps<{
  games: TchoukNetGame[];
  showCompetition?: boolean;
  hideField?: boolean;
  hideDateHeadings?: boolean;
  hideDate?: boolean;
}>();

const { locale } = useI18n();

function showDateHeading(game: TchoukNetGame, index: number): boolean {
  if (hideDateHeadings) return false;
  if (!game.start_at) return false;
  if (index === 0) return true;
  const prevGame = games[index - 1];
  if (!prevGame?.start_at) return true;
  const currentDate = new Date(game.start_at).toDateString();
  const prevDate = new Date(prevGame?.start_at).toDateString();
  return currentDate !== prevDate;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(`${locale.value}-CH`, {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}
</script>

<style scoped>
.c-game-list {
  display: flex;
  flex-direction: column;
  gap: var(--euro-spacing-8);
  align-items: center;
}

.c-game-list__item {
  width: 100%;
  max-width: 45rem;
}

.c-game-list__heading {
  margin-bottom: var(--euro-spacing-4);
}

.c-game-list__empty {
  text-align: center;

  svg {
    opacity: 0.5;
  }
}
</style>
