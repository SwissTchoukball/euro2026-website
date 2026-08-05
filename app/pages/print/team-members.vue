<template>
  <div class="c-print-team-members">
    <button type="button" class="c-print-team-members__print-button" @click="print">
      {{ $t("competition.team.members.print") }}
    </button>

    <euro-print-team-roster :competition-slug="competitionSlug" :team-slug="teamSlug" />
  </div>
</template>

<script setup lang="ts">
// This page is intentionally kept outside the `competitions/[competition]/team/[team]/` route tree so that
// it doesn't inherit that layout's header, breadcrumbs and sub-navigation - it's meant to be a clean,
// print-only view of a team roster, reachable via the custom `path` below.
definePageMeta({
  layout: false,
  path: "/competitions/:competition/team/:team/members/print",
});

const route = useRoute();
const { t } = useI18n();

const competitionSlug = computed(() => route.params.competition as string);
const teamSlug = computed(() => route.params.team as string);

// Shares its underlying data fetches with <euro-print-team-roster> below (same cache keys), used here
// only to build the document <title>.
const { title } = usePrintTeamRoster(competitionSlug.value, teamSlug.value);
const pageTitle = computed(() => `${title.value} · ${t("competition.team.members.title")}`);

useHead({
  title: () => pageTitle.value,
});

function print() {
  window.print();
}
</script>

<style scoped>
.c-print-team-members {
  max-width: 50rem;
  margin-inline: auto;
  padding: var(--euro-spacing-8) var(--euro-spacing-4);
}

.c-print-team-members__print-button {
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
</style>
