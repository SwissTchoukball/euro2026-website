<template>
  <div>
    <section v-if="teamCompetitionData" class="l-section">
      <euro-game-list :games="teamCompetitionData.games" />
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
</script>
