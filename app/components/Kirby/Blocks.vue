<script setup lang="ts">
import type { Component } from "vue";

import {
  LazyKirbyBlockCompetitionFeesAdults,
  LazyKirbyBlockCompetitionFeesYouth,
  LazyKirbyBlockDeadlines,
  LazyKirbyBlockHeading,
  LazyKirbyBlockImage,
  LazyKirbyBlockLine,
  LazyKirbyBlockList,
  LazyKirbyBlockPeerdomMap,
  LazyKirbyBlockQuote,
  LazyKirbyBlockRichtext,
  LazyKirbyBlockSchedule,
  LazyKirbyBlockSwisstopoMap,
  LazyKirbyBlockText,
  LazyKirbyBlockTwintDonationForm,
} from "#components";
import type { KirbyBlock } from "#nuxt-kirby";

defineProps<{
  blocks: KirbyBlock<string>[];
}>();

const blockComponents: Record<string, Component> = {
  // Built-in Kirby blocks
  heading: LazyKirbyBlockHeading,
  image: LazyKirbyBlockImage,
  line: LazyKirbyBlockLine,
  list: LazyKirbyBlockList,
  quote: LazyKirbyBlockQuote,
  text: LazyKirbyBlockText,
  richtext: LazyKirbyBlockRichtext,
  // Custom blocks
  "peerdom-map": LazyKirbyBlockPeerdomMap,
  "swisstopo-map": LazyKirbyBlockSwisstopoMap,
  schedule: LazyKirbyBlockSchedule,
  deadlines: LazyKirbyBlockDeadlines,
  "competition-fees-youth": LazyKirbyBlockCompetitionFeesYouth,
  "competition-fees-adults": LazyKirbyBlockCompetitionFeesAdults,
  "twint-donation-form": LazyKirbyBlockTwintDonationForm,
};

const content = useTemplateRef("content");
useInternalLinks(content);
</script>

<template>
  <div ref="content">
    <template v-for="(block, index) in blocks" :key="index">
      <component :is="blockComponents[block.type]" :block="block" class="kirby-block" />
    </template>
  </div>
</template>
