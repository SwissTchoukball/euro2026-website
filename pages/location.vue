<template>
  <main>
    <section class="l-section">
      <h2>{{ $t("location.title") }}</h2>
      <i18n-t keypath="location.description" tag="p" class="l-paragraph">
        <template #eventName>
          <em>{{ $t("etc.long") }} 2026</em>
        </template>
        <template #locationName>
          <em>{{ $t("eventLocation") }}</em>
        </template>
        <template #nationalSportsCenterLink>
          <a :href="$t('location.nationalSportsCenterUrl')">{{ $t("location.nationalSportsCenter") }}</a>
        </template>
        <template #federalOfficeOfSportLink>
          <a :href="$t('location.federalOfficeOfSportUrl')">{{ $t("location.federalOfficeOfSport") }}</a>
        </template>
        <template #swissFederalInstituteOfSportLink>
          <a :href="$t('location.swissFederalInstituteOfSportUrl')">{{
            $t("location.swissFederalInstituteOfSport")
          }}</a>
        </template>
      </i18n-t>
      <iframe
        :src="`//map.geo.admin.ch/#/embed?center=2582611.01,1220891.04&z=8&lang=${locale}&bgLayer=ch.swisstopo.pixelkarte-farbe&featureInfo=tooltip`"
        frameborder="0"
        class="c-location__map"
      />
      <p>
        <a href="https://www.openstreetmap.org/node/130286973#map=15/47.14023/7.21587">
          {{ $t("location.seeOnOpenStreetMap") }}
        </a>
        /
        <a
          href="https://maps.apple.com/place?address=Magglingen,%20Switzerland&auid=15632740880420030654&coordinate=47.141316,7.202105&lsp=7618&name=Magglingen&map=transit"
        >
          {{ $t("location.seeOnAppleMaps") }}
        </a>
        /
        <a href="https://maps.app.goo.gl/zp2d3kd3gHq1M6WZ9">
          {{ $t("location.seeOnGoogleMaps") }}
        </a>
      </p>
      <!-- TODO: Add information about sports facilities for the competition -->
    </section>
  </main>
</template>

<script setup lang="ts">
const { locale } = useI18n();

defineI18nRoute({
  paths: {
    fr: "/lieu",
    de: "/standort",
  },
});
</script>

<style scoped>
.c-location__description {
  padding-block: var(--euro-spacing-4);
}

.c-location__map {
  width: 100%;
  height: 50vh;
  border: none;
  margin-top: var(--euro-spacing-4);
}
</style>
