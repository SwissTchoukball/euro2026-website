<template>
  <div>
    <section v-if="teamCompetitionData" class="l-section">
      <euro-game-list :games="sortedGames" />
    </section>
    <euro-powered-by-tchouk-net />
  </div>
</template>

<script setup lang="ts">
import type { TchoukNetGame, TchoukNetTeam } from "~/services/tchoukNetApi";

const { teamCompetitionData } = defineProps<{
  teamCompetitionData: {
    team: TchoukNetTeam;
    games: TchoukNetGame[];
  };
}>();

const sortedGames = computed(() => {
  return teamCompetitionData?.games.toSorted((a, b) => a.start_at!.localeCompare(b.start_at!));
});
</script>
