<template>
  <p class="l-centered-content">
    <button class="kb-peerdom-map-toggle-map-button" @click="togglePeerdomMapVisibility">
      {{ isPeerdomMapVisible ? "Hide" : "Show" }} the organising committee organigram
    </button>
  </p>

  <iframe
    v-if="isPeerdomMapVisible"
    src="https://peerdom.org/embed/euro2026/map"
    width="100%"
    class="kb-peerdom-map l-cancel-section-padding"
    frameborder="0"
  ></iframe>
</template>

<script setup lang="ts">
const isPeerdomMapVisible = ref(false);
function togglePeerdomMapVisibility() {
  isPeerdomMapVisible.value = !isPeerdomMapVisible.value;
}
</script>

<style scoped>
.kb-peerdom-map-toggle-map-button {
  font-size: 1rem;
  margin-block: var(--euro-spacing-3);
}

.kb-peerdom-map {
  height: 80vh;
}
</style>
