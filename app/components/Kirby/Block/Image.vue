<template>
  <figure ref="figure" class="kb-image-figure l-centered-content">
    <component
      :is="block.content.link ? 'a' : 'div'"
      :href="block.content.link || undefined"
      :data-contain="block.content.crop === false || undefined"
      :style="{
        aspectRatio: block.content.ratio || undefined,
      }"
    >
      <img
        :src="block.content.location === 'web' ? block.content.src : undefined"
        :srcset="block.content.location !== 'web' ? block.content.image?.[0]?.srcset : undefined"
        sizes="(max-width: 45rem) 95vw, 45rem"
        :alt="block.content.alt || block.content.image?.[0]?.alt || ''"
        class="kb-image"
      />
    </component>

    <figcaption v-if="block.content.caption || block.content.credits" class="kb-image__caption">
      <span v-html="block.content.caption"></span>
      <span v-html="block.content.credits"></span>
    </figcaption>
  </figure>
</template>

<script setup lang="ts">
import type { KirbyBlock } from "#nuxt-kirby";
import type { ResolvedKirbyImage } from "#shared/types/kirby";

defineProps<{
  block: KirbyBlock<
    "image-resolved",
    {
      location: string;
      // File UUIDs are resolved server-side to the actual image data
      // See: https://kirby.tools/docs/headless/field-methods
      image: ResolvedKirbyImage[];
      src: string;
      alt: string;
      caption: string;
      credits: string;
      link: string;
      ratio: string;
      crop: boolean;
    }
  >;
}>();

const figure = useTemplateRef("figure");
// const { width } = useElementSize(figure);
</script>

<style scoped>
.kb-image-figure {
  margin-top: 1rem;
}

.kb-image {
  width: 100%;
  max-width: 45rem;
  aspect-ratio: 16/9;
  object-fit: cover;
}

.kb-image__caption {
  font-size: 0.8rem;
  color: var(--euro-gray-700);
  display: flex;
  justify-content: space-between;
}
</style>
