<template>
  <ol class="u-unstyled-list c-phase-standings">
    <li class="c-phase-standings__row c-phase-standings__row--header">
      <span class="c-phase-standings__position"></span>
      <span class="c-phase-standings__team-name"></span>
      <span class="c-phase-standings__points">{{ $t("competition.standings.points") }}</span>
      <span class="c-phase-standings__stat">{{ $t("competition.standings.played") }}</span>
      <span class="c-phase-standings__stat">{{ $t("competition.standings.won") }}</span>
      <span class="c-phase-standings__stat">{{ $t("competition.standings.lost") }}</span>
      <span class="c-phase-standings__stat">{{ $t("competition.standings.drawn") }}</span>
      <span class="c-phase-standings__stat">{{ $t("competition.standings.for") }}</span>
      <span class="c-phase-standings__stat">{{ $t("competition.standings.against") }}</span>
      <span class="c-phase-standings__stat">{{ $t("competition.standings.difference") }}</span>
    </li>
    <li v-for="(row, index) in standings" :key="row.team.id" class="c-phase-standings__row">
      <span class="c-phase-standings__position">{{ index + 1 }}</span>
      <span class="c-phase-standings__team-name">
        <euro-team-name :team="row.team" />
      </span>
      <span class="c-phase-standings__points">{{ row.points }}</span>
      <span class="c-phase-standings__stat c-phase-standings__stat--played">{{ row.played }}</span>
      <span class="c-phase-standings__stat c-phase-standings__stat--won">{{ row.won }}</span>
      <span class="c-phase-standings__stat c-phase-standings__stat--lost">{{ row.lost }}</span>
      <span class="c-phase-standings__stat c-phase-standings__stat--drawn">{{ row.drawn }}</span>
      <span class="c-phase-standings__stat c-phase-standings__stat--for">{{ row.for }}</span>
      <span class="c-phase-standings__stat c-phase-standings__stat--against">{{ row.against }}</span>
      <span class="c-phase-standings__stat c-phase-standings__stat--difference">{{ row.for - row.against }}</span>
    </li>
  </ol>
  <!-- <pre>{{ standings }}</pre> -->
</template>

<script setup lang="ts">
import type { TchoukNetGame } from "~/services/tchoukNetApi";

const { games } = defineProps<{
  games: TchoukNetGame[];
}>();

const standings = computed<StandingTeam[]>(() => {
  const teams = generateStandingsTeams(games);
  return sortStandings(teams, games);
});
</script>

<style scoped>
.c-phase-standings__row {
  display: grid;
  grid-template:
    "position team team team points points points" auto
    "played won lost drawn for against difference" auto
    / 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: var(--euro-spacing-2);
  align-items: center;
  padding: var(--euro-spacing-2) var(--euro-spacing-4);
  border-bottom: 1px solid var(--euro-color-border);
  max-width: 45rem;
  margin-inline: auto;

  @media (min-width: 45rem) {
    grid-template-areas: "position team points played won lost drawn for against difference";
    grid-template-columns: 1rem 1fr repeat(8, 2.5rem);
    row-gap: 0;
  }

  &:nth-child(odd) {
    background-color: var(--euro-color-background-alt);
  }
}

.c-phase-standings__row:nth-child(even) {
  background-color: var(--euro-gray-050);
}

.c-phase-standings__row--header {
  font-weight: bold;
  color: var(--euro-gray-400);
  text-transform: uppercase;
  font-size: 0.6rem;
}

.c-phase-standings__position {
  grid-area: position;
  font-weight: bold;
  text-align: right;
}

.c-phase-standings__position::after {
  content: ".";
}

.c-phase-standings__team-name {
  grid-area: team;
}

.c-phase-standings__points {
  grid-area: points;
  font-weight: bold;
  &:after {
    content: " points";
  }
  .c-phase-standings__row--header & {
    display: none;
  }

  @media (min-width: 45rem) {
    text-align: center;
    &:after {
      content: "";
    }
    .c-phase-standings__row--header & {
      display: block;
    }
  }
}

.c-phase-standings__stat {
  text-align: center;
}

.c-phase-standings__stat--played {
  grid-area: played;
}
.c-phase-standings__stat--won {
  grid-area: won;
}
.c-phase-standings__stat--lost {
  grid-area: lost;
}
.c-phase-standings__stat--drawn {
  grid-area: drawn;
}
.c-phase-standings__stat--for {
  grid-area: for;
}
.c-phase-standings__stat--against {
  grid-area: against;
}
.c-phase-standings__stat--difference {
  grid-area: difference;
}
</style>
