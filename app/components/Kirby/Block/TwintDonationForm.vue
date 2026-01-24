<template>
  <ClientOnly>
    <template #fallback>
      <div class="l-centered-content">
        <p>Loading donation form...</p>
      </div>
    </template>
    <div id="cont-01" class="cont">
      <rnw-solution-embed :url="`https://pay.raisenow.io/${block.content.key}`" />
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
import type { KirbyBlock } from "#nuxt-kirby";
import type { KirbyTwintDonationFormData } from "~/queries/twint-donation-form";

useHead({
  script: [{ type: "module", src: "https://cdn.jsdelivr.net/npm/@raisenow/solution-embed/dist/index.js" }],
});

defineProps<{
  block: KirbyBlock<"twint-donation-form", KirbyTwintDonationFormData>;
}>();
</script>

<style></style>
