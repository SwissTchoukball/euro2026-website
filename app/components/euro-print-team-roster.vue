<template>
  <section class="c-print-team-roster">
    <h1 class="t-headline-1 c-print-team-roster__title">{{ title || '\u00A0' }}</h1>

    <euro-loading-indicator v-if="status === 'idle' || status === 'pending'" for-section />
    <ul v-else-if="players.length" class="u-unstyled-list c-print-team-roster__list">
      <li v-for="member in players" :key="member.uuid" class="c-print-team-roster__row">
        <img
          v-if="member.portrait[0]"
          class="c-print-team-roster__portrait"
          :src="member.portrait[0].url"
          :alt="member.firstName + ' ' + member.lastName"
        />
        <div v-else class="c-print-team-roster__portrait"></div>
        <p class="c-print-team-roster__line">
          <strong v-if="member.jerseyNumber" class="c-print-team-roster__number">{{ member.jerseyNumber }}</strong>
          <span v-if="isCaptain(member.role)" class="c-print-team-roster__captain-badge">{{ captainLetter }}</span>
          <span class="c-print-team-roster__name">{{ member.firstName }} {{ member.lastName }}</span>
          <span v-if="member.position" class="c-print-team-roster__position">
            {{ $t(`competition.team.member.position.${member.position}`) }}
          </span>
          <span v-else-if="!member.jerseyNumber && member.role" class="c-print-team-roster__position">
            {{ member.role }}
          </span>
        </p>
      </li>
    </ul>
    <p v-else>{{ $t("competition.team.members.emptyList") }}</p>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  competitionSlug: string;
  teamSlug: string;
}>();

const { title, players, status, isCaptain, captainLetter } = usePrintTeamRoster(
  props.competitionSlug,
  props.teamSlug,
);
</script>

<style scoped>
.c-print-team-roster__title {
  margin-top: 0;
  margin-bottom: var(--euro-spacing-6);
  text-align: center;
}

.c-print-team-roster__list {
  display: flex;
  flex-direction: column;
  gap: var(--euro-spacing-3);
}

.c-print-team-roster__row {
  display: flex;
  align-items: center;
  gap: var(--euro-spacing-3);
  font-size: 1.15rem;
  break-inside: avoid;
}

.c-print-team-roster__portrait {
  flex-shrink: 0;
  width: 3rem;
  height: 3rem;
  object-fit: cover;
  background-color: var(--euro-gray-100);
  border-radius: 50%;
}

.c-print-team-roster__line {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.4em;
}

.c-print-team-roster__number {
  font-weight: bold;
}

.c-print-team-roster__name {
  font-weight: bold;
}

.c-print-team-roster__position {
  color: var(--euro-gray-700);
}

.c-print-team-roster__captain-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.2em;
  height: 1.2em;
  border-radius: 50%;
  background-color: black;
  color: white;
  font-size: 0.85em;
  font-weight: bold;
  line-height: 1;
}
</style>
