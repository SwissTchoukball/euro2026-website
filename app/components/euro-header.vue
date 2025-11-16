<template>
  <DefineNavTemplate>
    <nav class="c-header__nav">
      <ul class="u-unstyled-list c-header__nav-list">
        <li v-for="(item, index) in listedChildren" :key="index">
          <NuxtLink
            :to="localePath(`/${item.uri}`)"
            :aria-current="route.path.startsWith(`/${locale}/${item.uri}`) ? 'page' : undefined"
            @click="isSidePanelOpen = false"
          >
            {{ item.title }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </DefineNavTemplate>
  <DefineLangSwitcherTemplate>
    <div class="c-header__language-switcher-wrapper">
      <EuroLanguageSwitcher class="c-header__language-switcher" />
    </div>
  </DefineLangSwitcherTemplate>

  <div v-if="isSidePanelOpen" class="c-header__side-panel-backdrop" @click="isSidePanelOpen = false"></div>
  <div class="c-header__side-panel" :class="{ 'c-header__side-panel--open': isSidePanelOpen }">
    <ReuseLangSwitcherTemplate />
    <ReuseNavTemplate />
  </div>

  <header class="c-header__bar">
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
    <ReuseNavTemplate />
    <ReuseLangSwitcherTemplate />
    <EuroBurgerButton v-model="isSidePanelOpen" class="c-header__burger-button" />
  </header>
</template>

<script setup lang="ts">
const localePath = useLocalePath();
const route = useRoute();
const { locale } = useI18n();
const site = useSite();

const [DefineNavTemplate, ReuseNavTemplate] = createReusableTemplate();
const [DefineLangSwitcherTemplate, ReuseLangSwitcherTemplate] = createReusableTemplate();

const listedChildren = computed(() => [...(site.value.children ?? []).filter((i) => i.isListed)]);

const isSidePanelOpen = ref(false);
</script>

<style scoped>
.c-header__bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 0;
  color: var(--euro-blue-500);

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  backdrop-filter: blur(10px);
  z-index: 2;

  .c-header__nav {
    display: none;

    @media (min-width: 768px) {
      display: block;
    }
  }
}

/* Shifting content after header down */
.c-header__bar:deep(+ *) {
  margin-top: var(--euro-header-logo-height);
}

.body-header-hover .c-header__bar:deep(+ *) {
  margin-top: 0;
}

.body-header-hover .c-header__bar {
  color: white;

  a,
  :deep(.c-header__language-switcher) {
    color: white;
  }

  a:hover {
    color: var(--euro-sky-blue-500);
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
  line-height: 0;
}

.c-header__logo {
  height: var(--euro-header-logo-height);
  margin: var(--euro-header-logo-margin);
  margin-right: 0;
}

.c-header__nav {
  margin-block: var(--euro-spacing-4);
  line-height: 1;
}

.c-header__nav-list {
  display: flex;
  gap: clamp(var(--euro-spacing-2), 2vw, var(--euro-spacing-4));
}

.c-header__nav-list a {
  display: block;
  font-weight: bold;
  text-decoration: none;
  padding: var(--euro-spacing-2) var(--euro-spacing-4);
  border-radius: 0.5rem;
}

.c-header__nav-list a.router-link-active {
  background-color: var(--euro-sky-blue-500);
}

.c-header__nav-list a:hover,
.c-header__nav-list a.router-link-active:hover {
  background-color: var(--euro-blue-500);
}

.c-header__language-switcher-wrapper {
  max-width: 13rem;
  flex-grow: 1;
  text-align: right;
}

.c-header__bar:deep(.c-header__language-switcher) {
  &.c-header__language-switcher {
    display: none;

    @media (min-width: 768px) {
      display: inline-flex;
    }
  }

  .body-header-hover & {
    color: white;
  }
}

.c-header__burger-button {
  margin-right: 1rem;
  @media (min-width: 768px) {
    display: none;
  }
}

.c-header__side-panel {
  position: fixed;
  width: 100%;
  max-width: 20rem;
  top: var(--euro-header-height);
  left: 100vw;
  bottom: 0;
  z-index: 5;
  opacity: 0;
  height: calc(100vh - var(--euro-header-height));
  background-color: white;
  color: var(--euro-blue-500);
  transition: left 0.25s ease-in-out, opacity 0s 0.25s;

  .c-header__nav {
    margin-inline: var(--euro-spacing-4);
  }

  .c-header__nav-list {
    flex-direction: column;
    gap: var(--euro-spacing-1);
  }

  .c-header__language-switcher-wrapper {
    margin: var(--euro-spacing-4);
    margin-bottom: 0;
    max-width: none;
  }
}

.c-header__side-panel--open {
  left: calc(100vw - 20rem);
  opacity: 1;
  transition: left 0.25s ease-in-out, opacity 0s 0s;
}

.c-header__side-panel-backdrop {
  position: fixed;
  top: var(--euro-header-height);
  left: 0;
  right: 0;
  bottom: 0;
  height: calc(100vh - var(--euro-header-height));
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  z-index: 2; /* Behind the side panel */
}
</style>
