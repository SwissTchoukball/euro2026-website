<template>
  <button class="c-go-to-top-button" :class="{ 'c-go-to-top-button--hidden': !isVisible }" @click="scrollToTop">
    <span class="c-go-to-top-button__icon">↑</span>
    <span class="u-visually-hidden">{{ $t("goToTop") }}</span>
  </button>
</template>

<script lang="ts" setup>
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const isVisible = ref(false);

onMounted(() => {
  window.addEventListener("scroll", () => {
    isVisible.value = window.scrollY > 100;
  });
});
</script>

<style scoped>
.c-go-to-top-button {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: var(--euro-blue-500);
  color: white;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.5);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
}

.c-go-to-top-button--hidden {
  transform: translateY(4rem);
}

.c-go-to-top-button__icon {
  font-size: 1.5rem;
}
</style>
