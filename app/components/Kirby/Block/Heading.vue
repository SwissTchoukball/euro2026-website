<template>
  <component :is="block.content.level" :id="slugify(block.content.text)" class="kb-heading" :class="headingClass">
    <span v-html="block.content.text" />
  </component>
</template>

<script setup lang="ts">
import type { KirbyBlock } from "#nuxt-kirby";
import slugify from "@sindresorhus/slugify";

const { block } = defineProps<{
  block: KirbyBlock<"heading">;
}>();

const headingClass = computed(() => {
  switch (block.content.level) {
    case "h1": // It should not be used, as it is reserver for the website title.
    case "h2":
      return "t-headline-1";
    case "h3":
      return "t-headline-2";
    case "h4":
      return "t-headline-3";
    case "h5":
      return "t-headline-4";
    case "h6":
    default:
      return "t-headline-5";
  }
});
</script>

<style scoped>
.kb-heading {
  max-width: 45rem;
  margin-inline: auto;
  scroll-margin-top: var(--euro-header-height);
}
</style>
