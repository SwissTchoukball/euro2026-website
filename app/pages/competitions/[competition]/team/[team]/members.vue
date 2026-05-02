<template>
  <section class="l-section">
    <euro-loading-indicator v-if="teamCmsStatus === 'pending'" for-section />
    <ul v-if="teamCmsData?.result?.players?.length" class="u-unstyled-list c-team-members">
      <li v-for="member in teamCmsData.result.players" :key="member.uuid">
        <euro-team-member :member="member" class="c-team-members__member" />
      </li>
    </ul>
    <div v-else class="c-team-members__empty">
      <p>{{ $t("competition.team.members.emptyList") }}</p>
      <Icon icon="ph:users-three-duotone" width="100" height="100" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";

import { getTeamQuery } from "~/queries";

const route = useRoute();
const { locale } = useI18n();

const competitionSlug = computed(() => route.params.competition as string);

const teamSlug = computed(() => route.params.team as string);

const { data: teamCmsData, status: teamCmsStatus } = await useKql(getTeamQuery(teamSlug.value, competitionSlug.value), {
  language: locale.value,
  // Retry transient 503s when the Kirby host throttles concurrent connections during prerender
  retry: 3,
  retryDelay: 500,
});
</script>

<style scoped>
.c-team-members {
  --gap-size: var(--euro-spacing-4);
  --team-members-per-row: 2;
  --number-of-gaps: calc(var(--team-members-per-row) - 1);
  --length-team-member-size: calc(
    (100vw - (2 * var(--euro-spacing-8)) - (var(--number-of-gaps) * var(--gap-size))) / var(--team-members-per-row)
  );

  @media (min-width: 36rem) {
    --team-members-per-row: 3;
  }

  @media (min-width: 52rem) {
    --team-members-per-row: 4;
  }

  @media (min-width: 69rem) {
    --team-members-per-row: 5;
  }

  display: flex;
  gap: var(--gap-size);
  flex-wrap: wrap;
}

.c-team-members__member {
  width: var(--length-team-member-size);
}

.c-team-members__empty {
  text-align: center;

  svg {
    opacity: 0.5;
  }
}
</style>
