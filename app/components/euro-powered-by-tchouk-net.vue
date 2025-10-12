<template>
  <div class="c-euro-powered-by-tchouk-net">
    <span>Competitions powered by</span>
    <a href="https://tchouk.net" class="c-euro-powered-by-tchouk-net__link">
      <span class="u-visually-hidden">tchouk.net</span>
      <euro-tchouk-net-logo role="presentation" class="c-euro-powered-by-tchouk-net__logo" />
    </a>
  </div>
</template>

<style scoped>
.c-euro-powered-by-tchouk-net {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--euro-spacing-2);
  font-size: 0.875rem;
  color: var(--euro-gray-500);
  margin-block: var(--euro-spacing-4);
}

.c-euro-powered-by-tchouk-net__logo {
  width: 6rem;
  height: auto;
}
</style>
