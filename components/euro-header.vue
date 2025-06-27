<template>
  <header class="c-header">
    <NuxtLink :to="localePath('/')" class="c-header__logo-link">
      <img
        class="c-header__logo"
        src="/images/logo_euro2026_horizontal.svg"
        alt="European Tchoukball Championships 2026"
      />
      <img
        class="c-header__logo c-header__logo--dark"
        src="/images/logo_euro2026_horizontal_white-red.svg"
        alt="European Tchoukball Championships 2026"
      />
    </NuxtLink>
    <h1 class="u-visually-hidden">{{ $t("eventName") }}</h1>
    <nav class="c-header__nav">
      <ul class="u-unstyled-list c-header__nav-list">
        <li>
          <NuxtLink :to="localePath('/schedule')">{{ $t("navigation.schedule") }}</NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localePath('/location')">{{ $t("navigation.location") }}</NuxtLink>
        </li>
      </ul>
    </nav>
    <EuroLanguageSwitcher class="c-header__language-switcher" />
  </header>
</template>

<script setup lang="ts">
const localePath = useLocalePath();
</script>

<style scoped>
.c-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  backdrop-filter: blur(10px);
  z-index: 2;
  color: white;
}

.c-header:deep(+ *) {
  margin-top: var(--euro-header-logo-height);
}

.body-header-hover .c-header:deep(+ *) {
  margin-top: 0;
}

.body-header-hover .c-header {
  a,
  :deep(.c-header__language-switcher) {
    color: white;
  }

  a:hover {
    color: var(--euro-sky-blue-100);
  }
}

.c-header__logo--dark {
  display: none;
}

.body-header-hover .c-header__logo--dark {
  display: block;
}

.body-header-hover .c-header__logo:not(.c-header__logo--dark) {
  display: none;
}

.c-header__logo-link {
  max-width: 13rem;
  flex-grow: 1;
}

.c-header__logo {
  height: var(--euro-header-logo-height);
  margin: var(--euro-spacing-4);
  margin-right: 0;
}

.c-header__nav {
  margin-block: var(--euro-spacing-4);
}

.c-header__nav-list {
  display: flex;
  gap: clamp(var(--euro-spacing-2), 2vw, var(--euro-spacing-4));
}

.c-header__nav-list a {
  font-weight: bold;
  text-decoration: none;
  padding: var(--euro-spacing-2) var(--euro-spacing-4);
  border-radius: 0.5rem;
}

.c-header__nav-list a.router-link-active {
  background-color: var(--euro-sky-blue-100);
}

.c-header__nav-list a:hover,
.c-header__nav-list a.router-link-active:hover {
  background-color: var(--euro-blue-100);
}

.c-header:deep(.c-header__language-switcher) {
  color: black;
  max-width: 13rem;
  flex-grow: 1;

  .body-header-hover & {
    color: white;
  }
}
</style>
