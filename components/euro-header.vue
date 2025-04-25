<template>
  <header class="c-header">
    <NuxtLink to="/">
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
    <h1 class="u-visually-hidden">European Tchoukball Championships 2026</h1>
    <nav class="c-header__nav">
      <ul class="u-unstyled-list c-header__nav-list">
        <li><NuxtLink to="/schedule">Schedule</NuxtLink></li>
        <li><NuxtLink to="/location">Location</NuxtLink></li>
      </ul>
    </nav>
  </header>
</template>

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
  a {
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

/* .body-header-hover .c-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  backdrop-filter: blur(10px);
  z-index: 2;
  color: white;

  a {
    color: white;
  }

  a:hover {
    color: var(--euro-sky-blue-100);
  }
} */

.c-header__logo {
  height: var(--euro-header-logo-height);
  margin: var(--euro-spacing-4);
  margin-right: 0;
}

.c-header__nav {
  margin: var(--euro-spacing-4);
  margin-left: 0;
}

.c-header__nav-list {
  display: flex;
  gap: clamp(var(--euro-spacing-2), 2vw, var(--euro-spacing-4));
}
</style>
