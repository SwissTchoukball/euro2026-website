<template>
  <nav class="c-team-navigation">
    <h3 class="u-visually-hidden">{{ $t("navigationFor", { name: title }) }}</h3>
    <ul class="u-unstyled-list c-team-navigation__list">
      <li v-for="item in teamsNavigationItems" :key="item.to">
        <NuxtLink :to="item.to" class="c-team-navigation__item-link">
          <span v-if="showCompetition && item.competitionName" class="c-team-navigation__item-competition-name">
            {{ item.competitionName }}
          </span>
          <span v-if="!hideFlag">{{ item.flags }}</span>
          <span>{{ item.name }}</span>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import type { TchoukNetParticipation } from "~/services/tchoukNetApi";
import { getCompetitionSlugFromId, getSlugFromId } from "~/services/tchoukNetSlugIdMapping";

const { localizeCompetitionEntityName } = useI18nHelper();
const localePath = useLocalePath();

const {
  participations,
  competitionSlug: givenCompetitionSlug = undefined,
  hideFlag,
  showCompetition,
  skipSorting,
} = defineProps<{
  title: string;
  participations: TchoukNetParticipation[];
  competitionSlug?: string;
  hideFlag?: boolean;
  showCompetition?: boolean;
  skipSorting?: boolean;
}>();

const teamsNavigationItems = computed(() => {
  return participations
    .toSorted((a, b) => {
      if (skipSorting) {
        return 0;
      }
      return localizeCompetitionEntityName(a.team.name).localeCompare(localizeCompetitionEntityName(b.team.name));
    })
    .map((participation: TchoukNetParticipation) => {
      const competitionSlug = givenCompetitionSlug || getCompetitionSlugFromId(participation.competition?.id);
      return {
        name: localizeCompetitionEntityName(participation.team.name),
        flags: participation.team.team_entity.countries.map((country) => country.emoji).join(""),
        competitionName: participation.competition
          ? localizeCompetitionEntityName(participation.competition?.name)
          : "",
        to: competitionSlug
          ? localePath(
              `/competitions/${competitionSlug}/team/${getSlugFromId(
                participation.team.team_entity_identifier,
                competitionSlug,
                "teams"
              )}`
            )
          : "",
      };
    });
});
</script>

<style scoped>
.c-team-navigation {
  padding-block: var(--euro-spacing-2);
}

.c-team-navigation__list {
  display: flex;
  gap: var(--euro-spacing-2);
  flex-wrap: wrap;
}

.c-team-navigation__item-link {
  display: flex;
  gap: var(--euro-spacing-1);
  align-items: center;
  padding: var(--euro-spacing-1) var(--euro-spacing-2);
  background-color: var(--euro-gray-100);
  color: var(--euro-color-text-primary);
  border-radius: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.2s, color 0.2s;

  &:hover,
  &:focus-visible {
    background-color: var(--euro-sky-blue-500);
    color: inherit;
  }

  &.router-link-exact-active {
    background-color: var(--euro-blue-500);
    color: white;
  }

  &:has(.c-team-navigation__item-competition-name) {
    padding-left: var(--euro-spacing-1);
  }
}

.c-team-navigation__item-competition-name {
  color: white;
  background-color: var(--euro-gray-400);
  padding: var(--euro-spacing-0-5) var(--euro-spacing-1);
  border-top-left-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
  font-size: 0.8rem;
  font-weight: 600;
  transition: background-color 0.2s;

  .c-team-navigation__item-link:hover & {
    background-color: var(--euro-blue-500);
  }
}
</style>
