<template>
  <ul v-if="games.length > 0" class="u-unstyled-list c-game-list">
    <li v-for="game in games" :key="game.id" class="c-game-list__item">
      <euro-game :game="game" :show-competition="showCompetition" :hide-field="hideField" />
    </li>
  </ul>
  <div v-else class="blank-slate">
    <p>{{ $t("competition.game.emptyList") }}</p>
  </div>
</template>

<script setup lang="ts">
import type { TchoukNetGame } from "~/services/tchoukNetApi";

const { showCompetition = true } = defineProps<{
  games: TchoukNetGame[];
  showCompetition?: boolean;
  hideField?: boolean;
}>();
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

.blank-slate {
  text-align: center;
}
</style>
