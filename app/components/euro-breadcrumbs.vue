<template>
  <nav class="c-breadcrumbs">
    <h2 class="u-visually-hidden">{{ $t("breadcrumbs") }}</h2>
    <ol class="u-unstyled-list c-breadcrumbs__list">
      <li class="c-breadcrumbs__item">
        <NuxtLink :to="$localePath('/')">{{ $t("home.breadcrumbTitle") }}</NuxtLink>
      </li>
      <li v-for="item in items" :key="item.to" class="c-breadcrumbs__item">
        <NuxtLink v-if="item.to" :to="item.to">{{ item.text }}</NuxtLink>
        <template v-else>{{ item.text }}</template>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
export interface BreadcrumbItem {
  text: string;
  to?: string;
}

defineProps<{
  items: BreadcrumbItem[];
}>();
</script>

<style scoped>
.c-breadcrumbs {
  --breadcrumb-spacing: clamp(var(--euro-spacing-1), 1vw, var(--euro-spacing-2));

  margin-inline: var(--euro-page-side-spacing);
  padding-block: var(--euro-spacing-2);

  &:deep(+ .l-section .t-headline-1) {
    padding-top: 0;
  }
}

.c-breadcrumbs__list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--breadcrumb-spacing);
  font-size: 0.8rem;
}

.c-breadcrumbs__item:not(:last-child)::after {
  content: "▸";
  margin-left: var(--breadcrumb-spacing);
  color: var(--euro-color-text-secondary);
}
</style>
