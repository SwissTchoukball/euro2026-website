<template>
  <NuxtLink
    v-if="team"
    :to="`/competitions/${competitionSlug}/team/${teamSlug}`"
    class="c-team-name"
    :class="{ 'c-team-name--winner': winner }"
  >
    {{ emojis }} {{ team.name }}
  </NuxtLink>
  <span v-else class="c-team-name c-team-name--placeholder">{{ label || "---" }}</span>
</template>

<script setup lang="ts">
import type { TchoukNetCompetition, TchoukNetTeam } from "~/services/tchoukNetApi";
import { getCompetitionSlugFromId, getSlugFromId } from "~/services/tchoukNetSlugIdMapping";

const route = useRoute();

const { team, competition } = defineProps<{
  team?: TchoukNetTeam;
  label?: string;
  winner?: boolean;
  competition?: TchoukNetCompetition;
}>();

const competitionSlugFromRoute = computed(() => route.params.competition as string);
const competitionSlugFromProps = computed(() => competition?.id && getCompetitionSlugFromId(competition.id));
const competitionSlug = computed(() => competitionSlugFromProps.value || competitionSlugFromRoute.value);
const teamSlug = computed(() => getSlugFromId(team?.identifier, competitionSlug.value, "teams"));

const emojis = team?.countries?.map((country) => country.emoji).join(" ");
</script>

<style scoped>
.c-team-name {
  color: inherit;
  text-decoration: none;
  white-space: nowrap;

  a&:hover {
    text-decoration: underline;
  }
}

.c-team-name--winner {
  font-weight: bold;
}

.c-team-name--placeholder {
  color: var(--euro-gray-400);
}
</style>
