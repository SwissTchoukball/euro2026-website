<template>
  <div class="status-over" v-if="game.has_ended">
    <b>Finished</b>
  </div>
  <div class="status-live" v-else-if="game.is_playing">
    <b>LIVE</b>
    <!-- TODO: Add icon + link -->
    <!-- <image-icons-camera v-if="game.link_youtube_url" /> -->
  </div>
  <div class="status-date" v-else-if="date">
    <b>{{ date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }}</b>
    <small>{{ date.toLocaleDateString() }}</small>
  </div>
</template>

<script setup lang="ts">
import type { TchoukNetGame } from "~/services/tchoukNetApi";

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
