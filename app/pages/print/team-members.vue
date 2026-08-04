<template>
  <div class="c-print-team-members">
    <button type="button" class="c-print-team-members__print-button" @click="print">
      {{ $t("competition.team.members.print") }}
    </button>

    <h1 class="t-headline-1 c-print-team-members__title">{{ title || '\u00A0' }}</h1>

    <euro-loading-indicator v-if="teamCmsStatus === 'pending'" for-section />
    <ul v-else-if="players.length" class="u-unstyled-list c-print-team-members__grid">
      <li v-for="member in players" :key="member.uuid" class="c-print-team-members__card">
        <img
          v-if="member.portrait[0]"
          class="c-print-team-members__portrait"
          :src="member.portrait[0].url"
          :alt="member.firstName + ' ' + member.lastName"
        />
        <div v-else class="c-print-team-members__portrait"></div>
        <p class="c-print-team-members__name">{{ member.firstName }} {{ member.lastName }}</p>
        <p class="c-print-team-members__meta">
          <template v-if="member.position">
            <strong class="c-print-team-members__number">{{ member.jerseyNumber }}</strong>
            <span v-if="isCaptain(member.role)" class="c-print-team-members__captain-badge">{{ captainLetter }}</span>
            • {{ $t(`competition.team.member.position.${member.position}`) }}
          </template>
          <template v-else-if="member.role">{{ member.role }}</template>
        </p>
      </li>
    </ul>
    <p v-else>{{ $t("competition.team.members.emptyList") }}</p>
  </div>
</template>

<script setup lang="ts">
import { getTeamQuery } from "~/queries";
import { tchoukNetApiService } from "~/services/tchoukNetApiService";
import { tchoukNetSlugIdMapping } from "~/services/tchoukNetSlugIdMapping";

// This page is intentionally kept outside the `competitions/[competition]/team/[team]/` route tree so that
// it doesn't inherit that layout's header, breadcrumbs and sub-navigation - it's meant to be a clean,
// print-only view of a team roster, reachable via the custom `path` below.
definePageMeta({
  layout: false,
  path: "/competitions/:competition/team/:team/members/print",
});

const route = useRoute();
const { locale, t } = useI18n();
const { localizeCompetitionEntityName } = useI18nHelper();

const competitionSlug = computed(() => route.params.competition as string);
const teamSlug = computed(() => route.params.team as string);

const competitionId = computed(() => tchoukNetSlugIdMapping.competitions?.[competitionSlug.value]?.id);
const teamId = computed(() => tchoukNetSlugIdMapping.competitions?.[competitionSlug.value]?.teams?.[teamSlug.value]);

const { data: competitionData } = useAsyncCompetitionData(competitionId.value);

const { data: teamCompetitionData } = useAsyncData(
  `team-${teamId.value}`,
  () => {
    if (!teamId.value) {
      throw new Error(`Undefined team ID: ${teamId.value} / slug: ${teamSlug.value}`);
    }
    return tchoukNetApiService.getTeam(teamId.value);
  },
  { server: false },
);

const { data: teamCmsData, status: teamCmsStatus } = await useKql(
  getTeamQuery(teamSlug.value, competitionSlug.value),
  {
    language: locale.value,
    // Retry transient 503s when the Kirby host throttles concurrent connections during prerender
    retry: 3,
    retryDelay: 500,
  },
);

const competitionName = computed(() =>
  competitionData.value ? localizeCompetitionEntityName(competitionData.value.competition.name) : "",
);
const teamName = computed(() =>
  teamCompetitionData.value ? localizeCompetitionEntityName(teamCompetitionData.value.team.name) : "",
);

const title = computed(() => [teamName.value, competitionName.value].filter(Boolean).join(" · "));

const players = computed(() => teamCmsData.value?.result?.players ?? []);

// The CMS "role" field is free text entered in the team's own language, not a translated enum.
const CAPTAIN_ROLE_LABELS = ["captain", "capitaine", "kapitän"];
function isCaptain(role: string) {
  return CAPTAIN_ROLE_LABELS.includes(role?.trim().toLowerCase());
}
const captainLetter = computed(() => (locale.value === "de" ? "K" : "C"));

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

.c-print-team-members__title {
  margin-top: 0;
  margin-bottom: var(--euro-spacing-6);
  text-align: center;
}

.c-print-team-members__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--euro-spacing-6) var(--euro-spacing-4);
}

.c-print-team-members__card {
  break-inside: avoid;
}

.c-print-team-members__portrait {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  background-color: var(--euro-gray-100);
  border-radius: 0.5rem;
}

.c-print-team-members__name {
  margin-top: var(--euro-spacing-2);
  font-weight: bold;
}

.c-print-team-members__meta {
  color: var(--euro-gray-700);
}

.c-print-team-members__number {
  font-weight: bold;
}

.c-print-team-members__captain-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.2em;
  height: 1.2em;
  margin-inline-start: 0.2em;
  border-radius: 50%;
  background-color: black;
  color: white;
  font-size: 0.85em;
  font-weight: bold;
  line-height: 1;
}
</style>
