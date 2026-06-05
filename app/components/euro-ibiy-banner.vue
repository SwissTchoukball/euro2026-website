<template>
  <a class="c-ibiy-banner" href="https://ibiy.net/swisstchoukball">
    <img
      :src="`/images/banner-ibiy-euro2026-medium-${locale}.svg`"
      loading="lazy"
      :alt="$t('home.ibiyAltText')"
      class="c-ibiy-banner__image c-ibiy-banner__image--medium"
    />
    <img
      :src="`/images/banner-ibiy-euro2026-small-${locale}.svg`"
      loading="lazy"
      :alt="$t('home.ibiyAltText')"
      class="c-ibiy-banner__image c-ibiy-banner__image--small"
    />
  </a>
</template>

<script lang="ts" setup>
const { locale } = useI18n();
</script>

<style scoped>
.c-ibiy-banner {
  display: block;
  width: 100%;
  margin-block: var(--st-length-spacing-s);
}

.c-ibiy-banner__image {
  width: 100%;
}

.c-ibiy-banner__image--medium {
  display: none;
  max-width: 40rem;
  margin-inline: auto;

  @media (min-width: 40rem) {
    display: block;
  }
}

.c-ibiy-banner__image--small {
  display: block;

  @media (min-width: 40rem) {
    display: none;
  }
}
</style>
