<template>
  <main class="c-catch-all">
    <KirbyBlocks v-if="page?.blocks" :blocks="page.blocks" />
    <div v-else>No blocks found</div>
    <DevOnly>
      <AppDebugHelper :error="fetchError" />
    </DevOnly>
  </main>
</template>

<script setup lang="ts">
// This Nuxt page will render every Kirby page

import { getPageQuery } from "~/queries";

const { locale, availableLocales } = useI18n();
const route = useRoute();

// Extract the non-localized slug
const pageUri = getNonLocalizedSlug(route.params.slug!, availableLocales);

const { data: pageData, error: pageError } = await useKql(getPageQuery(pageUri || "home"), { language: locale.value });

let data = pageData.value;
let fetchError = pageError.value;

// If page content is empty, load the error page
if (!data?.result) {
  const { data: pageData, error: pageError } = await useKql(getPageQuery("error"), { language: locale.value });
  data = pageData.value;
  fetchError = pageError.value;
  const event = useRequestEvent();
  if (event) setResponseStatus(event, 404);
}

// Store page data
const page = data?.result;
setPage(page);
</script>

<style scoped>
.c-catch-all {
  padding: var(--euro-spacing-8);
}
</style>
