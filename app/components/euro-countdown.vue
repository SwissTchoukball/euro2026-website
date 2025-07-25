<template>
  <ol v-if="isCountdownActive" class="c-euro-countdown u-unstyled-list">
    <!-- TODO: Add support for pluralization -->
    <li class="c-euro-countdown__item--days">
      <div class="c-euro-countdown__figure">{{ years * 365 + days }}</div>
      <div class="c-euro-countdown__label">{{ $t("countdown.days", years * 365 + days) }}</div>
    </li>
    <li class="c-euro-countdown__item--hours">
      <div class="c-euro-countdown__figure">{{ hours }}</div>
      <div class="c-euro-countdown__label">{{ $t("countdown.hours", hours) }}</div>
    </li>
    <li class="c-euro-countdown__item--minutes">
      <div class="c-euro-countdown__figure">{{ minutes }}</div>
      <div class="c-euro-countdown__label">{{ $t("countdown.minutes", minutes) }}</div>
    </li>
    <li class="c-euro-countdown__item--seconds">
      <div class="c-euro-countdown__figure">{{ seconds }}</div>
      <div class="c-euro-countdown__label">{{ $t("countdown.seconds", seconds) }}</div>
    </li>
  </ol>
</template>

<script setup lang="ts">
import type { DateTimeArray } from "@maas/vue-equipment/composables";
import JSConfetti from "js-confetti";

let jsConfetti: JSConfetti;

const startDate = ref(new Date(`2026-08-01 09:00:00`));

const startDateArray = computed<DateTimeArray>(() => {
  return [
    startDate.value.getFullYear(),
    startDate.value.getMonth() + 1,
    startDate.value.getDate(),
    startDate.value.getHours(),
    startDate.value.getMinutes(),
    startDate.value.getSeconds(),
  ];
});

const wasStartDatePassedOnLoad = startDate.value.getTime() <= Date.now();

onMounted(() => {
  jsConfetti = new JSConfetti();
});

const { years, days, hours, minutes, seconds } = useCountdown(
  {
    endDateTime: startDateArray.value,
    timezone: "Europe/Berlin",
  },
  () => {
    if (wasStartDatePassedOnLoad) {
      return;
    }
    jsConfetti.addConfetti({
      confettiColors: ["#ff0000", "#00567C", "#6BE2E4"],
    });
  }
);

const isCountdownActive = computed(() => {
  return years.value > 0 || days.value > 0 || hours.value > 0 || minutes.value > 0 || seconds.value > 0;
});
</script>

<style scoped>
.c-euro-countdown {
  display: flex;
  align-items: end;
  flex-wrap: wrap;
  row-gap: 0.5rem;
  padding: 1rem 1rem 1.5rem;
  text-align: center;
  background-color: var(--euro-blue-500);
  border-radius: 3rem;
  color: white;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
}

.c-euro-countdown__label {
  color: var(--euro-sky-blue-500);
}

.c-euro-countdown__figure,
.c-euro-countdown__label {
  font-weight: bold;
}

.c-euro-countdown__item--days {
  width: 100%;

  .c-euro-countdown__figure,
  .c-euro-countdown__label {
    display: inline-block;
  }

  .c-euro-countdown__figure {
    font-size: 4rem;
    margin-right: 0.5rem;
  }

  .c-euro-countdown__label {
    font-size: 2rem;
  }
}

.c-euro-countdown__item--hours,
.c-euro-countdown__item--minutes,
.c-euro-countdown__item--seconds {
  width: 33%;

  .c-euro-countdown__figure {
    font-size: 2rem;
  }
}

@media (min-width: 768px) {
  .c-euro-countdown {
    align-items: center;
    padding: 1rem;
  }
  .c-euro-countdown__item--days {
    width: 50%;
  }

  .c-euro-countdown__item--hours,
  .c-euro-countdown__item--minutes,
  .c-euro-countdown__item--seconds {
    width: 16.5%;

    .c-euro-countdown__figure {
      font-size: 2.5rem;
    }
  }
}
</style>
