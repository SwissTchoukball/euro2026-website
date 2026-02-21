<template>
  <div v-if="game.has_ended" class="status-over">
    <b>Finished</b>
  </div>
  <div v-else-if="game.status === 'cancelled'" class="status-cancelled">
    <b>Cancelled</b>
  </div>
  <div v-else-if="game.status === 'forfeited'" class="status-forfeited">
    <b>Forfeited</b>
  </div>
  <component
    :is="game.link_youtube_url ? NuxtLink : 'div'"
    v-else-if="game.is_playing"
    class="status-live"
    :to="`https://tchouk.net/game/${game.id}`"
  >
    <b>LIVE</b>
    <Icon v-if="game.link_youtube_url" icon="streamline:webcam-video-solid" />
  </component>
  <div v-else-if="date" class="status-date">
    <b>{{ date.toLocaleTimeString(`${locale}-CH`, { hour: "2-digit", minute: "2-digit" }) }}</b>
    <small>{{ date.toLocaleDateString(`${locale}-CH`) }}</small>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";

import { NuxtLink } from "#components";
import type { TchoukNetGame } from "~/services/tchoukNetApi";

const { locale } = useI18n();

const { game } = defineProps<{ game: TchoukNetGame }>();

const date = computed<Date | undefined>(() => (game.start_at ? new Date(game.start_at) : undefined));
</script>

<style scoped>
.game-preview {
  display: grid;
  grid-template-columns: 1fr 3fr 2fr;
}

.status-live {
  background: red;
  color: white;
  padding: 0.25rem 0.5rem;
  text-align: center;
  animation: blinkingAnimation 2s infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  border-radius: 0.5rem;
  text-decoration: none;

  svg {
    height: 1em;
  }
}

.status-date {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: flex-start;
  gap: 0.25rem;
}

@keyframes blinkingAnimation {
  0% {
    opacity: 1;
  }
  25% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}
</style>
