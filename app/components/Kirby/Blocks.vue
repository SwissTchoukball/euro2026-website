<script setup lang="ts">
import type { KirbyBlock } from "#nuxt-kirby";
import type { Component } from "vue";
import {
  LazyKirbyBlockHeading,
  LazyKirbyBlockImage,
  LazyKirbyBlockLine,
  LazyKirbyBlockList,
  LazyKirbyBlockQuote,
  LazyKirbyBlockText,
  LazyKirbyBlockRichtext,
  LazyKirbyBlockPeerdomMap,
  LazyKirbyBlockSchedule,
  LazyKirbyBlockDeadlines,
  LazyKirbyBlockCompetitionFeesYouth,
  LazyKirbyBlockCompetitionFeesAdults,
  LazyKirbyBlockSwisstopoMap,
  LazyKirbyBlockTwintDonationForm,
} from "#components";

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
