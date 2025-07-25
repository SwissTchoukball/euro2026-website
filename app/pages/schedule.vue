<template>
  <main class="c-schedule">
    <section class="l-section">
      <h2 class="t-headline-1">{{ $t("schedule.title") }}</h2>
      <h3 class="t-headline-2">{{ $t("schedule.youthCompetitions.title") }}</h3>
      <p class="l-paragraph">{{ $t("schedule.youthCompetitions.dates") }}</p>
      <p class="l-paragraph">
        <small>{{ $t("schedule.detailedScheduleTbd") }}</small>
      </p>

      <h3 class="t-headline-2">{{ $t("schedule.adultsCompetitions.title") }}</h3>
      <p class="l-paragraph">{{ $t("schedule.adultsCompetitions.dates") }}</p>
      <p class="l-paragraph">
        <small>{{ $t("schedule.detailedScheduleTbd") }}</small>
      </p>
    </section>
  </main>
</template>

<script setup lang="ts">
defineI18nRoute({
  paths: {
    fr: "/programme",
    de: "/zeitplan",
  },
});
</script>

<style scoped>
.c-schedule {
  text-align: center;

  h2 {
    margin-bottom: var(--euro-spacing-4);
  }

  h3 {
    margin-top: var(--euro-spacing-12);
  }

  .l-paragraph {
    margin-inline: auto;
  }
}
</style>
