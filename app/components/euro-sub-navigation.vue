<template>
  <nav class="c-sub-navigation">
    <h3 class="u-visually-hidden">{{ $t("navigationFor", { name: title }) }}</h3>
    <ul class="u-unstyled-list c-sub-navigation__list">
      <li v-for="item in items" :key="item.to">
        <NuxtLink
          :to="item.to"
          class="c-sub-navigation__item-link"
          :class="{ 'c-sub-navigation__item-link--has-flags': !!item.flags }"
        >
          <template v-if="item.flags">
            <Icon
              v-for="flag in item.flags"
              :key="flag"
              :name="`twemoji:flag-${flag}`"
              class="c-sub-navigation__item-flag"
            />
          </template>
          {{ item.text }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  items: { text: string; to: string; flags?: string[] }[];
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
  display: flex;
  align-items: center;
  gap: var(--euro-spacing-2);
  padding: var(--euro-spacing-1) var(--euro-spacing-2);
  background-color: var(--euro-gray-100);
  color: var(--euro-color-text-primary);
  border-radius: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  transition:
    background-color 0.2s,
    color 0.2s;

  &:hover,
  &:focus-visible {
    background-color: var(--euro-sky-blue-500);
    color: inherit;
  }

  &.router-link-exact-active {
    background-color: var(--euro-blue-500);
    color: white;
  }
}

.c-sub-navigation__item-link--has-flags {
  margin-left: var(--euro-spacing-1);
}

.c-sub-navigation__item-flag {
  transform: scale(2.45);
  margin-right: var(--euro-spacing-3);

  &.i-twemoji\:flag-switzerland {
    transform: scale(2.45) translateX(-0.1rem);
    margin-right: var(--euro-spacing-1);
  }
}
</style>
