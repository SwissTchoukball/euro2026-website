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
    </section>
    <section class="l-section">
      <h2 class="t-headline-1">{{ $t("location.sportsHalls") }}</h2>
      <template v-for="sportsHall in sportsHalls" :key="sportsHall.key">
        <h3 class="t-headline-2">{{ $t(`location.${sportsHall.key}.title`) }}</h3>
        <p class="l-paragraph">{{ $t(`location.${sportsHall.key}.description`) }}</p>
        <div class="c-location__venue-images">
          <figure v-for="image in sportsHall.images" :key="image.filename">
            <NuxtImg
              :src="`images/${image.filename}`"
              format="webp"
              class="c-location__venue-image"
              sizes="100vw sm:100vw md: 100vw lg:100vw xl:100vw"
              aria-hidden="true"
              alt=""
              :placeholder="img(`/images/${image.filename}`, { h: 1000, f: 'webp', blur: 10, q: 50 })"
            />
            <figcaption class="c-location__venue-image-caption">{{ image.credit }}</figcaption>
          </figure>
        </div>
      </template>
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

const sportsHalls = ref([
  {
    key: "sportTotoHall",
    images: [
      {
        filename: "sport-toto-outdoor.jpg",
        credit: "© BASPO",
      },
      {
        filename: "sport-toto-indoor.jpg",
        credit: "© BASPO",
      },
    ],
  },
  {
    key: "oldSportsHall",
    images: [
      {
        filename: "old-sports-hall-outdoor.jpg",
        credit: "© BASPO",
      },
      {
        filename: "old-sports-hall-indoor.jpg",
        credit: "© BASPO",
      },
    ],
  },
  {
    key: "trainingHall",
    images: [
      {
        filename: "training-hall-outdoor.jpg",
        credit: "© BASPO",
      },
      {
        filename: "training-hall-indoor.jpg",
        credit: "© BASPO",
      },
    ],
  },
]);
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

.c-location__venue-image-caption {
  text-align: right;
  font-size: 0.8rem;
  color: var(--euro-gray-700);
}
</style>
