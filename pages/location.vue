<template>
  <main>
    <section class="l-section">
      <h2 class="t-headline-1">{{ $t("location.title") }}</h2>
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
    <section class="l-section">
      <h2 class="t-headline-1">{{ $t("location.sportsHalls") }}</h2>

      <h3 class="t-headline-2">{{ $t("location.sportTotoHall.title") }}</h3>
      <p class="l-paragraph">{{ $t("location.sportTotoHall.description") }}</p>
      <div class="c-location__venue-images">
        <NuxtImg
          src="/images/sport-toto-outdoor.jpeg"
          format="webp"
          class="c-location__venue-image"
          sizes="100vw sm:100vw md: 100vw lg:100vw xl:100vw"
          aria-hidden="true"
          alt=""
          :placeholder="img(`/images/sport-toto-outdoor.jpeg`, { h: 1000, f: 'webp', blur: 10, q: 50 })"
        />

        <NuxtImg
          src="/images/sport-toto-indoor.jpeg"
          format="webp"
          class="c-location__venue-image"
          sizes="100vw sm:100vw md: 100vw lg:100vw xl:100vw"
          aria-hidden="true"
          alt=""
          :placeholder="img(`/images/sport-toto-indoor.jpeg`, { h: 1000, f: 'webp', blur: 10, q: 50 })"
        />
      </div>

      <h3 class="t-headline-2">{{ $t("location.oldSportsHall.title") }}</h3>
      <p class="l-paragraph">{{ $t("location.oldSportsHall.description") }}</p>
      <p class="l-paragraph">
        <em>{{ $t("location.picturesWillCome") }}</em>
      </p>

      <h3 class="t-headline-2">{{ $t("location.trainingHall.title") }}</h3>
      <p class="l-paragraph">{{ $t("location.trainingHall.description") }}</p>

      <div class="c-location__venue-images">
        <NuxtImg
          src="/images/training-hall-outdoor.jpeg"
          format="webp"
          class="c-location__venue-image"
          sizes="100vw sm:100vw md: 100vw lg:100vw xl:100vw"
          aria-hidden="true"
          alt=""
          :placeholder="img(`/images/training-hall-outdoor.jpeg`, { h: 1000, f: 'webp', blur: 10, q: 50 })"
        />

        <NuxtImg
          src="/images/training-hall-indoor.jpeg"
          format="webp"
          class="c-location__venue-image"
          sizes="100vw sm:100vw md: 100vw lg:100vw xl:100vw"
          aria-hidden="true"
          alt=""
          :placeholder="img(`/images/training-hall-indoor.jpeg`, { h: 1000, f: 'webp', blur: 10, q: 50 })"
        />
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
const { locale } = useI18n();
const img = useImage();

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

.c-location__venue-images {
  display: flex;
  flex-wrap: wrap;
  gap: var(--euro-spacing-4);
  margin-top: var(--euro-spacing-4);
}

.c-location__venue-image {
  max-width: 40rem;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}
</style>
