<script setup lang="ts">
import type { KirbyBlock } from "#nuxt-kirby";

defineProps<{
  block: KirbyBlock<"text">;
}>();
</script>

<template>
  <div class="l-centered-content" v-html="block.content.text" />
</template>
