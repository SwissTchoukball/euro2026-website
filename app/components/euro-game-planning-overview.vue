<template>
  <!-- TODO: Hide a section if it's empty -->
  <section class="l-section">
    <h3 class="t-headline-2">{{ $t("competition.game.ongoing", planningOverview.current_games.length) }}</h3>
    <euro-game-list :games="planningOverview.current_games" />
  </section>

  <section class="l-section">
    <h3 class="t-headline-2">{{ $t("competition.game.upcoming", planningOverview.next_games.length) }}</h3>
    <euro-game-list :games="planningOverview.next_games" />
  </section>

  <section class="l-section">
    <h3 class="t-headline-2">{{ $t("competition.game.last", planningOverview.last_games.length) }}</h3>
    <euro-game-list :games="planningOverview.last_games" />
  </section>
</template>

<script setup lang="ts">
import type { TchoukNetPlanningOverview } from "~/services/tchoukNetApi";

defineProps<{
  planningOverview: TchoukNetPlanningOverview;
}>();
</script>

<style scoped>
.t-headline-2 {
  margin-bottom: var(--euro-spacing-4);
}
</style>
