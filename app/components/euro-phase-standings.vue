<template>
  <ol class="u-unstyled-list c-phase-standings">
    <li class="c-phase-standings__row c-phase-standings__row--header">
      <div class="c-phase-standings__position-team-points">
        <span class="c-phase-standings__position"></span>
        <span class="c-phase-standings__team-name"></span>
        <span class="c-phase-standings__points">{{ $t("competition.standings.points") }}</span>
      </div>
      <div class="c-phase-standings__stats">
        <span class="c-phase-standings__stat c-phase-standings__stat--played">
          {{ $t("competition.standings.played") }}
        </span>
        <span class="c-phase-standings__stat c-phase-standings__stat--won">
          {{ $t("competition.standings.won") }}
        </span>
        <span class="c-phase-standings__stat c-phase-standings__stat--lost">
          {{ $t("competition.standings.lost") }}
        </span>
        <span class="c-phase-standings__stat c-phase-standings__stat--drawn">
          {{ $t("competition.standings.drawn") }}
        </span>
        <span class="c-phase-standings__stat c-phase-standings__stat--for">
          {{ $t("competition.standings.for") }}
        </span>
        <span class="c-phase-standings__stat c-phase-standings__stat--against">
          {{ $t("competition.standings.against") }}
        </span>
        <span class="c-phase-standings__stat c-phase-standings__stat--difference">
          {{ $t("competition.standings.difference") }}
        </span>
      </div>
    </li>
    <li v-for="(row, index) in standings" :key="row.team.id" class="c-phase-standings__row">
      <div class="c-phase-standings__position-team-points">
        <span class="c-phase-standings__position">{{ index + 1 }}</span>
        <span class="c-phase-standings__team-name">
          <euro-team-name :team="row.team" />
        </span>
        <span class="c-phase-standings__points">{{ row.points }}</span>
      </div>
      <div class="c-phase-standings__stats">
        <span class="c-phase-standings__stat c-phase-standings__stat--played">
          {{ row.played }}
          <label>{{ $t("competition.standings.played") }}</label>
        </span>
        <span class="c-phase-standings__stat c-phase-standings__stat--won">
          {{ row.won }}
          <label>{{ $t("competition.standings.won") }}</label>
        </span>
        <span class="c-phase-standings__stat c-phase-standings__stat--lost">
          {{ row.lost }}
          <label>{{ $t("competition.standings.lost") }}</label>
        </span>
        <span class="c-phase-standings__stat c-phase-standings__stat--drawn">
          {{ row.drawn }}
          <label>{{ $t("competition.standings.drawn") }}</label>
        </span>
        <span class="c-phase-standings__stat c-phase-standings__stat--for">
          {{ row.for }}
          <label>{{ $t("competition.standings.for") }}</label>
        </span>
        <span class="c-phase-standings__stat c-phase-standings__stat--against">
          {{ row.against }}
          <label>{{ $t("competition.standings.against") }}</label>
        </span>
        <span class="c-phase-standings__stat c-phase-standings__stat--difference">
          {{ row.for - row.against }}
          <label>{{ $t("competition.standings.difference") }}</label>
        </span>
      </div>
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
    "position-team-points position-team-points position-team-points" auto
    "stats stats stats" auto
    / 1rem min-content auto;
  align-items: center;
  gap: var(--euro-spacing-2);
  padding: var(--euro-spacing-2) var(--euro-spacing-4);
  border-bottom: 1px solid var(--euro-color-border);
  max-width: 45rem;
  margin-inline: auto;

  @media (min-width: 40rem) {
    grid-template-areas: "position-team-points position-team-points position-team-points stats";
    grid-template-columns: 1rem 1fr 2.5rem auto;
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
  display: none;

  @media (min-width: 40rem) {
    display: grid;
  }
}

.c-phase-standings__position-team-points {
  grid-area: position-team-points;
  /* display: grid;
  grid-template-columns: subgrid;
  grid-template-areas: "position team points";
  align-items: center; */
  display: flex;
  gap: var(--euro-spacing-2);

  /* @media (min-width: 40rem) {
    display: grid;
    grid-template-columns: subgrid;
    grid-template-areas: "position team points";
  } */
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
  font-weight: bold;
  flex-grow: 1;

  @media (min-width: 40rem) {
    font-weight: normal;
  }
}

.c-phase-standings__points {
  grid-area: points;
  font-weight: bold;
  white-space: nowrap;
  min-width: 2.5rem;
  &:after {
    content: " points";
  }
  .c-phase-standings__row--header & {
    display: none;
  }

  @media (min-width: 40rem) {
    text-align: center;
    &:after {
      content: "";
    }
    .c-phase-standings__row--header & {
      display: block;
    }
  }
}

.c-phase-standings__stats {
  grid-area: stats;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: var(--euro-spacing-2);
  align-items: center;

  @media (min-width: 40rem) {
    grid-template-columns: repeat(7, 2.5rem);
  }
}

.c-phase-standings__stat {
  text-align: center;

  label {
    display: block;
    font-size: 0.6rem;
    color: var(--euro-gray-400);
    text-transform: uppercase;

    @media (min-width: 34rem) {
      display: inline;
    }

    @media (min-width: 40rem) {
      display: none;
    }
  }
}

/* .c-phase-standings__stat--played {
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
} */
</style>
