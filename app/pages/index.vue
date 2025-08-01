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
        :placeholder="img(`/images/main_hero.jpg`, { h: 1000, f: 'webp', blur: 10, q: 50 })"
        :modifiers="{ blur: 5 }"
      />
      <div class="c-index__hero-overlay">
        <img src="/images/logo_euro2026_white-red.svg" :alt="$t('logoAltText')" class="c-index__hero-logo" />
        <div class="c-index__hero-dates">{{ $t("eventDates") }}</div>
        <div class="c-index__hero-location">{{ $t("eventLocation") }}</div>
      </div>
    </section>

    <section class="l-section c-index__countdown-section">
      <EuroCountdown class="c-index__countdown" />
    </section>

    <section class="l-section">
      <i18n-t keypath="home.intro" tag="p" class="l-paragraph c-index__intro-text">
        <template #formattedEtc>
          <em>{{ $t("etc.long") }}</em>
        </template>
        <template #formattedFitb>
          <a href="https://fitb.org">{{ $t("fitb.long") }}</a>
        </template>
        <template #formattedEtbf>
          <a href="https://tchoukball.eu">{{ $t("etbf.long") }}</a>
        </template>
      </i18n-t>
      <i18n-t keypath="home.bidWon" tag="p" class="l-paragraph c-index__intro-text">
        <template #formattedSwissTchoukball>
          <a href="https://tchoukball.ch">Swiss Tchoukball</a>
        </template>
        <template #wonWithLinkToNews>
          <a
            href="https://tchoukball.ch/news/470-la-suisse-va-accueillir-les-championnats-d-europe-de-tchoukball-en-2026"
            >{{ $t("home.won") }}</a
          >
        </template>
      </i18n-t>
      <ul class="u-unstyled-list c-index__federation-logos">
        <li>
          <a href="https://fitb.org" :title="$t('websiteOf', { name: $t('fitb.longWithDefiniteArticle') })">
            <img class="c-index__federation-logo" src="/images/logo-fitb.svg" alt="Logo of the FITB" />
          </a>
        </li>
        <li>
          <a href="https://etbf.org" :title="$t('websiteOf', { name: $t('etbf.longWithDefiniteArticle') })">
            <img class="c-index__federation-logo" src="/images/logo-etbf.svg" alt="Logo of the ETBF" />
          </a>
        </li>
        <li>
          <a href="https://tchoukball.ch" :title="$t('websiteOf', { name: 'Swiss Tchoukball' })">
            <img
              class="c-index__federation-logo"
              src="/images/logo-swiss-tchoukball.svg"
              alt="Logo of Swiss Tchoukball"
            />
          </a>
        </li>
      </ul>
      <div class="c-index__volunteer-link-wrapper">
        <a href="https://tchouk.ch/benevoles-euro2026" class="c-index__volunteer-link"
          >🤲 {{ $t("home.becomeVolunteer") }}</a
        >
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
const img = useImage();

useHead({
  bodyAttrs: {
    class: "body-header-hover",
  },
});
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
  width: clamp(18rem, 40vw, 20rem);
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

.c-index__intro-text {
  font-size: clamp(1rem, 4vw, 1.5rem);
  font-weight: bold;
  text-align: center;
  text-wrap: balance;
  margin-inline: auto;
}

.c-index__federation-logos {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: var(--euro-spacing-12);
  gap: var(--euro-spacing-12);
}

.c-index__federation-logo {
  height: 15vw;
  max-height: 5rem;
}

.c-index__volunteer-link-wrapper {
  text-align: center;
}

.c-index__volunteer-link {
  display: inline-block;
  margin-inline: auto;
  padding: var(--euro-spacing-4) var(--euro-spacing-8);
  border-radius: 1rem;
  text-align: center;
  margin-top: var(--euro-spacing-12);
  font-size: clamp(1rem, 4vw, 2rem);
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
