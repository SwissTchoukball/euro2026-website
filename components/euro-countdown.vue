<template>
  <ol class="c-euro-countdown u-unstyled-list">
    <!-- TODO: Add support for pluralization -->
    <li class="c-euro-countdown__item--days">
      <div class="c-euro-countdown__figure">{{ years * 365 + days }}</div>
      <div class="c-euro-countdown__label">days</div>
    </li>
    <li class="c-euro-countdown__item--hours">
      <div class="c-euro-countdown__figure">{{ hours }}</div>
      <div class="c-euro-countdown__label">hours</div>
    </li>
    <li class="c-euro-countdown__item--minutes">
      <div class="c-euro-countdown__figure">{{ minutes }}</div>
      <div class="c-euro-countdown__label">minutes</div>
    </li>
    <li class="c-euro-countdown__item--seconds">
      <div class="c-euro-countdown__figure">{{ seconds }}</div>
      <div class="c-euro-countdown__label">seconds</div>
    </li>
  </ol>
</template>

<script setup lang="ts">
import type { DateTimeArray } from "@maas/vue-equipment/composables";

const startDate = ref(`2026-08-01 09:00:00`);

const startDateArray = computed<DateTimeArray>(() => {
  const date = new Date(startDate.value);
  return [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  ];
});

function callback() {
  console.log("Countdown finished!");
}

const { years, days, hours, minutes, seconds } = useCountdown(
  {
    endDateTime: startDateArray.value,
    timezone: "Europe/Berlin",
  },
  callback
);
</script>

<style scoped>
.c-euro-countdown {
  display: flex;
  align-items: end;
  flex-wrap: wrap;
  row-gap: 0.5rem;
  padding: 1rem 1rem 1.5rem;
  text-align: center;
  background-color: var(--euro-blue-100);
  border-radius: 3rem;
  color: white;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
}

.c-euro-countdown__label {
  color: var(--euro-sky-blue-100);
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
