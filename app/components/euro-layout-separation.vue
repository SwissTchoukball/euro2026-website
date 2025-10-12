<template>
  <div
    class="c-layout-separation"
    :class="{
      'c-layout-separation--score': score,
      'c-layout-separation--light': light,
      'c-layout-separation--center': center,
    }"
  >
    <div>
      <slot name="a" />
    </div>
    <div>
      <slot name="b" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  score?: boolean;
  light?: boolean;
  center?: boolean;
}>();
</script>

<style>
.c-layout-separation {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, 1fr);
  gap: 0.2rem;

  > * {
    display: flex;
    align-items: center;
    border-radius: 0.3rem;
    padding: 0.25rem 0.5rem;
  }

  &.c-layout-separation--light > * {
    background: var(--euro-gray-050);
  }

  &.c-layout-separation--score > * {
    background: var(--euro-gray-600);
    color: white;
    justify-content: center;
  }

  &.c-layout-separation--center > * {
    justify-content: center;
  }
}
</style>
