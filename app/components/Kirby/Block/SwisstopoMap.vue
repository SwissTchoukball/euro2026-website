<template>
  <euro-swisstopo-map :center="block.content.center" :zoom="block.content.zoom" :layers="block.content.layers" />
</template>

<script setup lang="ts">
import type { KirbyBlock } from "#nuxt-kirby";
import type { KirbySwisstopoMapData } from "~/queries/swisstopo-map";

defineProps<{
  block: KirbyBlock<"swisstopo-map", KirbySwisstopoMapData>;
}>();
</script>
