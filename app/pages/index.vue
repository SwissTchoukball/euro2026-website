<template>
  <main>
    <section class="c-index__hero">
      <NuxtImg
        src="/images/main_hero.jpg"
        class="c-index__hero-image"
        format="webp"
        width="8192"
        height="5464"
        sizes="100vw sm:100vw md: 100vw lg:100vw xl:100vw"
        aria-hidden="true"
        alt=""
        :placeholder="img(`/images/main_hero.jpg`, { height: 1000, format: 'webp', blur: 10, quality: 50 })"
        :modifiers="{ blur: 5 }"
      />
      <div class="c-index__hero-overlay">
        <img src="/images/logo_euro2026_white-red.svg" :alt="$t('logoAltText')" class="c-index__hero-logo" />
        <div class="c-index__hero-dates">{{ $t("eventDates") }}</div>
        <div class="c-index__hero-location">{{ $t("eventLocation") }}</div>
      </div>
    </section>

    <section class="l-section c-index__countdown-section">
      <EuroCountdown class="c-index__countdown" @over="isCountdownOver = true" />

      <template v-if="isCountdownOver">
        <euro-loading-indicator v-if="!eventData && eventStatus === 'pending'" for-section />
        <euro-game-planning-overview v-if="eventData" :planning-overview="eventData?.overview" />
      </template>
    </section>

    <section class="l-section c-index__countries">
      <ul class="u-unstyled-list c-index__countries-list">
        <li v-for="country in countries" :key="country.slug">
          <NuxtLink
            :to="localePath(`/competitions/country/${country.slug}`)"
            :title="$t('competition.team.seeAllFromCountry', { countryName: $t(`country.${country.slug}`) })"
          >
            <Icon :name="`twemoji:flag-${country.nameForFlag}`" class="c-index__country-flag" />
          </NuxtLink>
        </li>
      </ul>
      <NuxtLink :to="localePath('/teams')" class="c-index__teams-link">
        {{ $t("home.discoverAllTeams") }}
      </NuxtLink>
    </section>

    <section class="l-section">
      <div class="c-index__engagement-links">
        <a href="https://tchouk.ch/benevoles-euro2026" class="c-index__engagement-link-button">
          🫶 {{ $t("home.becomeVolunteer") }}
        </a>
        <NuxtLink :to="localePath('/support')" class="c-index__engagement-link-button">
          🌟 {{ $t("home.supportTheEvent") }}
        </NuxtLink>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { tchoukNetApiService } from "@/services/tchoukNetApiService";
import { tchoukNetSlugIdMapping } from "@/services/tchoukNetSlugIdMapping";

const img = useImage();
const localePath = useLocalePath();

useHead({
  bodyAttrs: {
    class: "body-header-hover",
  },
});

const isCountdownOver = ref(false);
const countries = Object.keys(tchoukNetSlugIdMapping.countries)
  .toSorted((a, b) => a.localeCompare(b))
  .map((country) => ({ slug: country, nameForFlag: country === "czech-republic" ? "czechia" : country }));

const {
  data: eventData,
  status: eventStatus,
  refresh: eventRefresh,
} = useAsyncData("event", () => tchoukNetApiService.getEvent());
usePolling(eventRefresh);
</script>

<style scoped>
.c-index__hero {
  position: relative;
  width: 100vw;
  height: max(70vw, 50vh);
  min-height: 25rem;
  max-height: 70vh;
}

.c-index__hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}

.c-index__hero-overlay {
  width: 100%;
  height: 100%;
  background-color: rgb(0 0 0 / 0.5);
  text-align: center;
  color: white;
  text-shadow: 0 0 1rem black;
}

.c-index__hero-logo {
  margin-top: calc(var(--euro-header-height) + clamp(var(--euro-spacing-8), 4vw, var(--euro-spacing-12)));
  max-height: 50%;
  width: clamp(12rem, 40vw, 20rem);
}

.c-index__hero-dates {
  margin-top: clamp(1rem, 4vw, 5rem);
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: bold;
}

.c-index__hero-location {
  display: block;
  margin-top: clamp(0.8rem, 2vw, 3rem);
  font-size: clamp(1.5rem, 3.5vw, 2rem);
  font-weight: bold;
  color: white;
}

.c-index__countdown {
  width: 20rem;
  margin: auto;
}

.c-index__countries {
  background-color: var(--euro-sky-blue-500);
  clip-path: polygon(0 4vw, 100% 0, 100% calc(100% - 4vw), 0 100%);
  padding-block: clamp(var(--euro-spacing-16), 4vw, var(--euro-spacing-24));
  padding-inline: var(--euro-page-side-spacing);
  margin-inline: 0;
}

.c-index__countries-list {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: clamp(var(--euro-spacing-3), 2vw, var(--euro-spacing-6));
}

.c-index__country-flag {
  width: clamp(3rem, 8vw, 6rem);
  height: clamp(3rem, 8vw, 6rem);
  transition: transform 0.1s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
}

.c-index__teams-link {
  display: block;
  margin-inline: auto;
  margin-top: var(--euro-spacing-6);
  text-align: center;
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: bold;

  &:hover {
    color: white;
  }
}

.c-index__engagement-links {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--euro-spacing-6);
  margin-inline: auto;
  margin-top: var(--euro-spacing-12);
}

.c-index__engagement-link-button {
  display: inline-block;
  padding: var(--euro-spacing-4) var(--euro-spacing-8);
  border-radius: 1rem;
  text-align: center;
  font-size: clamp(1.5rem, 4vw, 2rem);
  text-decoration: none;
  font-weight: bold;
  color: var(--euro-sky-blue-500);
  background-color: var(--euro-blue-500);
}

@media (min-width: 768px) {
  .c-index__hero {
    min-height: 38rem;
  }

  .c-index__countdown {
    width: 90%;
    max-width: 40rem;
  }
}
</style>
