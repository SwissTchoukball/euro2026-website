<template>
  <main class="c-catch-all">
    <KirbyBlocks v-if="page?.blocks" :blocks="page.blocks" />
    <div v-else class="c-catch-all__not-found">
      {{ $t("pageNotFound") }}<br />
      <NuxtLink :to="localePath('/')" class="c-catch-all__not-found-link">{{ $t("backHome") }}</NuxtLink>
    </div>
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
const localePath = useLocalePath();

// Extract the non-localized slug
const pageUri = getNonLocalizedSlug(route.params.slug!, availableLocales);

// Retry transient failures (e.g. 503s when the Kirby host throttles concurrent connections during prerender)
const kqlFetchOptions = { retry: 3, retryDelay: 500 };

const { data: pageData, error: pageError } = await useKql(getPageQuery(pageUri || "home"), {
  language: locale.value,
  ...kqlFetchOptions,
});

let data = pageData.value;
let fetchError = pageError.value;

// If page content is empty, load the error page
if (!data?.result) {
  const { data: pageData, error: pageError } = await useKql(getPageQuery("error"), {
    language: locale.value,
    ...kqlFetchOptions,
  });
  data = pageData.value;
  fetchError = pageError.value;
  const event = useRequestEvent();
  if (event) setResponseStatus(event, 404);
}

// Store page data
const page = computed(() => data?.result);
setPage(page.value);
</script>

<style scoped>
.c-catch-all {
  padding: var(--euro-spacing-8);
}

.c-catch-all__not-found {
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--euro-color-text-secondary);
  line-height: 1.5;
}
</style>
