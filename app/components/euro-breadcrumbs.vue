<template>
  <nav class="c-breadcrumbs">
    <h2 class="u-visually-hidden">{{ $t("breadcrumbs") }}</h2>
    <ol class="u-unstyled-list c-breadcrumbs__list">
      <li class="c-breadcrumbs__item"><NuxtLink to="/">Home</NuxtLink></li>
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
  margin-inline: var(--euro-spacing-8);
  padding-block: var(--euro-spacing-2);

  &:deep(+ .l-section .t-headline-1) {
    padding-top: 0;
  }
}

.c-breadcrumbs__list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--euro-spacing-2);
  font-size: 0.8rem;
}

.c-breadcrumbs__item:not(:last-child)::after {
  content: "▸";
  margin-left: var(--euro-spacing-2);
  color: var(--euro-color-text-secondary);
}
</style>
