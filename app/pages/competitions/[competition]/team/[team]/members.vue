<template>
  <section class="l-section">
    <euro-loading-indicator v-if="teamCmsStatus === 'pending'" for-section />
    <ul v-if="teamCmsData?.result" class="u-unstyled-list c-team-members">
      <li v-for="member in teamCmsData.result.players" :key="member.uuid">
        <euro-team-member :member="member" />
      </li>
    </ul>
    <div v-else class="blank-slate">
      <p>{{ $t("competition.team.members.emptyList") }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { getTeamQuery } from "~/queries";

const route = useRoute();
const { locale } = useI18n();

const { teamTypeSlug = undefined } = defineProps<{
  teamTypeSlug?: string;
}>();

const teamSlug = computed(() => route.params.team as string);

const { data: teamCmsData, status: teamCmsStatus } = await useKql(getTeamQuery(teamSlug.value, teamTypeSlug || ""), {
  language: locale.value,
});
</script>

<style scoped>
.c-team-members {
  display: flex;
  gap: var(--euro-spacing-4);
  flex-wrap: wrap;
}

.blank-slate {
  text-align: center;
}
</style>
