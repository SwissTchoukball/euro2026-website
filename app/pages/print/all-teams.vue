<template>
  <div class="c-print-all-teams">
    <button type="button" class="c-print-all-teams__print-button" @click="print">
      {{ $t("competition.team.members.print") }}
    </button>

    <euro-print-team-roster
      v-for="entry in teamEntries"
      :key="`${entry.competitionSlug}-${entry.teamSlug}`"
      :competition-slug="entry.competitionSlug"
      :team-slug="entry.teamSlug"
      class="c-print-all-teams__team"
    />
  </div>
</template>

<script setup lang="ts">
import { tchoukNetSlugIdMapping } from "~/services/tchoukNetSlugIdMapping";

// Hidden page: not linked from anywhere in the site, reachable only by direct URL. See
// `nuxt.config.ts` for the explicit prerender route (the static crawler can't discover it either).
definePageMeta({
  layout: false,
});

const { t } = useI18n();

const teamEntries = Object.entries(tchoukNetSlugIdMapping.competitions).flatMap(([competitionSlug, { teams }]) =>
  Object.keys(teams).map((teamSlug) => ({ competitionSlug, teamSlug })),
);

const pageTitle = computed(() => `${t("navigation.teams")} · ${t("eventName")}`);

useHead({
  title: () => pageTitle.value,
});

function print() {
  window.print();
}
</script>

<style scoped>
.c-print-all-teams {
  max-width: 50rem;
  margin-inline: auto;
  padding: var(--euro-spacing-8) var(--euro-spacing-4);
}

.c-print-all-teams__print-button {
  margin-bottom: var(--euro-spacing-6);
  padding: var(--euro-spacing-2) var(--euro-spacing-4);
  border: 1px solid var(--euro-gray-300);
  border-radius: 0.4rem;
  background: var(--euro-gray-050);
  font: inherit;
  cursor: pointer;

  @media print {
    display: none;
  }
}

.c-print-all-teams__team {
  margin-bottom: var(--euro-spacing-12);
  break-after: page;
  page-break-after: always;
}

.c-print-all-teams__team:last-child {
  margin-bottom: 0;
  break-after: auto;
  page-break-after: auto;
}
</style>
