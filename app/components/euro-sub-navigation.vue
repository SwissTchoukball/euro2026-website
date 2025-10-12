<template>
  <nav class="c-sub-navigation">
    <h3 class="u-visually-hidden">{{ $t("navigationFor", { name: title }) }}</h3>
    <ul class="u-unstyled-list c-sub-navigation__list">
      <li v-for="item in items" :key="item.to">
        <NuxtLink :to="item.to" class="c-sub-navigation__item-link">{{ item.text }}</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  items: { text: string; to: string }[];
}>();
</script>

<style scoped>
.c-sub-navigation {
  padding-block: var(--euro-spacing-2);
}

.c-sub-navigation__list {
  display: flex;
  gap: var(--euro-spacing-2);
  flex-wrap: wrap;
}

.c-sub-navigation__item-link {
  display: block;
  padding: var(--euro-spacing-1) var(--euro-spacing-2);
  background-color: var(--euro-gray-050);
  color: var(--euro-color-text-primary);
  border-radius: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.2s, color 0.2s;

  &:hover,
  &:focus-visible {
    background-color: var(--euro-sky-blue-500);
    color: white;
  }

  &.router-link-exact-active {
    background-color: var(--euro-blue-500);
    color: white;
  }
}
</style>
