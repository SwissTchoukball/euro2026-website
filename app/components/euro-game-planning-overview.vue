<template>
  <section v-if="planningOverview.current_games.length > 0" class="l-section">
    <h3 class="t-headline-2">{{ $t("competition.game.ongoing", planningOverview.current_games.length) }}</h3>
    <euro-game-list :games="planningOverview.current_games" />
  </section>

  <section v-if="planningOverview.next_games.length > 0" class="l-section">
    <h3 class="t-headline-2">{{ $t("competition.game.upcoming", planningOverview.next_games.length) }}</h3>
    <euro-game-list :games="planningOverview.next_games" />
  </section>

  <section v-if="planningOverview.last_games.length > 0" class="l-section">
    <h3 class="t-headline-2">{{ $t("competition.game.last", planningOverview.last_games.length) }}</h3>
    <euro-game-list :games="planningOverview.last_games" />
  </section>

  <section
    v-if="
      planningOverview.current_games.length === 0 &&
      planningOverview.next_games.length === 0 &&
      planningOverview.last_games.length === 0
    "
    class="l-section no-games-section"
  >
    <p>{{ $t("competition.game.emptyList") }}</p>
    <Icon icon="ph:court-basketball-duotone" width="100" height="100" />
  </section>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";

import type { TchoukNetPlanningOverview } from "~/services/tchoukNetApi";

defineProps<{
  planningOverview: TchoukNetPlanningOverview;
}>();
</script>

<style scoped>
.t-headline-2 {
  margin-bottom: var(--euro-spacing-4);
}

.no-games-section {
  text-align: center;

  svg {
    opacity: 0.5;
  }
}
</style>
