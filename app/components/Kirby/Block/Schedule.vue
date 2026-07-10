<template>
  <table class="l-table l-table--styled l-table--centred kb-schedule">
    <template v-for="day in block.content.days" :key="day.day">
      <thead>
        <tr>
          <th colspan="2">
            {{
              Intl.DateTimeFormat(`${locale}-CH`, {
                weekday: "long",
                day: "numeric",
                month: "long",
                timeZone: "Europe/Zurich",
              }).format(new Date(day.day))
            }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(event, index) in day.events" :key="`${day.day}-${index}`">
          <td>
            {{ event.time }}<br />
            <div class="kb-schedule__time-description">{{ event.time_clarification }}</div>
          </td>
          <td>
            {{ event.description }}<br />
            <div class="kb-schedule__location">
              <Icon name="ph:map-pin-fill" />
              {{ event.location }}
            </div>
          </td>
        </tr>
      </tbody>
    </template>
  </table>
</template>

<script setup lang="ts">
import type { KirbyBlock } from "#nuxt-kirby";
import type { KirbyScheduleData } from "~/queries/schedule";

const { locale } = useI18n();

defineProps<{
  block: KirbyBlock<"schedule", KirbyScheduleData>;
}>();
</script>

<style scoped>
.kb-schedule {
  td:first-child {
    width: 1px;
    white-space: nowrap;
  }

  td,
  th {
    vertical-align: top;
  }

  td p {
    margin-bottom: 0.4rem;
  }
}

.kb-schedule__time-description {
  padding-top: 0.25rem;
  font-size: 0.8rem;
  color: var(--euro-gray-700);
}

.kb-schedule__location {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8rem;
  color: var(--euro-gray-700);

  padding-top: 0.25rem;
}
</style>
