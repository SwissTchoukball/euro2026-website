<template>
  <iframe
    :src="`//map.geo.admin.ch/#/embed?center=${block.content.center}&z=${block.content.zoom}&lang=${locale}&bgLayer=ch.swisstopo.pixelkarte-farbe&featureInfo=tooltip`"
    frameborder="0"
    class="kb-swisstopo-map l-cancel-section-padding"
  />
</template>

<script setup lang="ts">
import type { KirbyBlock } from "#nuxt-kirby";
import type { KirbySwisstopoMapData } from "~/queries/swisstopo-map";

const { locale } = useI18n();

defineProps<{
  block: KirbyBlock<"swisstopo-map", KirbySwisstopoMapData>;
}>();
</script>

<style scoped>
.kb-swisstopo-map {
  height: 50vh;
  border: none;
  margin-top: var(--euro-spacing-4);
}
</style>
