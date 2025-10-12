<template>
  <div class="c-loading-indicator-container" :class="{ 'c-loading-indicator-container--for-section': forSection }">
    <div class="c-loading-indicator"></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  forSection?: boolean;
}>();
</script>

<style scoped>
.c-loading-indicator-container {
  height: 32px;
  width: 32px;
}
.c-loading-indicator-container--for-section {
  margin: auto;
  height: 50vh;
}

.c-loading-indicator {
  width: 32px;
  height: 32px;
  border: 4px solid var(--euro-blue-500);
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
