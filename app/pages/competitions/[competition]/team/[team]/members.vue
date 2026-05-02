<template>
  <section class="l-section">
    <euro-loading-indicator v-if="teamCmsStatus === 'pending'" for-section />
    <ul v-if="teamCmsData?.result?.players?.length" class="u-unstyled-list c-team-members">
      <li v-for="member in teamCmsData.result.players" :key="member.uuid">
        <euro-team-member :member="member" />
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
  display: flex;
  gap: var(--euro-spacing-4);
  flex-wrap: wrap;
}

.c-team-members__empty {
  text-align: center;

  svg {
    opacity: 0.5;
  }
}
</style>
