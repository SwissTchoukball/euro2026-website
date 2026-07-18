<template>
  <NuxtLink
    v-if="team"
    ref="containerRef"
    :to="$localePath(`/competitions/${competitionSlug}/team/${teamSlug}`)"
    class="c-team-name"
    :class="{ 'c-team-name--winner': winner }"
  >
    <span ref="textRef" class="c-team-name__text">
      {{ localizeCompetitionEntityName(team.name) }}
    </span>
  </NuxtLink>
  <span v-else ref="containerRef" class="c-team-name c-team-name--placeholder">
    <span ref="textRef" class="c-team-name__text">
      {{ label ? localizeCompetitionEntityName(label) : "---" }}
    </span>
  </span>
</template>

<script setup lang="ts">
import type { TchoukNetCompetition, TchoukNetTeam } from "~/services/tchoukNetApi";
import { getCompetitionSlugFromId, getSlugFromId } from "~/services/tchoukNetSlugIdMapping";

const route = useRoute();
const { localizeCompetitionEntityName } = useI18nHelper();

const {
  team = undefined,
  label = undefined,
  competition = undefined,
} = defineProps<{
  team?: TchoukNetTeam;
  label?: string;
  winner?: boolean;
  competition?: TchoukNetCompetition;
}>();

const competitionSlugFromRoute = computed(() => route.params.competition as string);
const competitionSlugFromProps = computed(() => competition?.id && getCompetitionSlugFromId(competition.id));
const competitionSlug = computed(() => competitionSlugFromProps.value || competitionSlugFromRoute.value);
const teamSlug = computed(() => getSlugFromId(team?.team_entity_identifier, competitionSlug.value, "teams"));

const containerRef = ref<HTMLElement | { $el: HTMLElement }>();
const textRef = ref<HTMLElement | { $el: HTMLElement }>();

const updateOverflow = () => {
  if (!containerRef.value || !textRef.value) return;

  const container = containerRef.value instanceof HTMLElement ? containerRef.value : containerRef.value.$el;
  const text = textRef.value instanceof HTMLElement ? textRef.value : textRef.value.$el;

  if (!container || !text) return;

  const overflowAmount = text.scrollWidth - container.clientWidth;
  if (overflowAmount > 0) {
    const duration = Math.max(2, overflowAmount / 25);
    container.style.setProperty("--overflow", `${overflowAmount}px`);
    container.style.setProperty("--duration", `${duration}s`);
    container.classList.add("is-overflowing");
  } else {
    container.classList.remove("is-overflowing");
  }
};

onMounted(() => {
  updateOverflow();
  window.addEventListener("resize", updateOverflow);
});

watchEffect(async () => {
  await nextTick();
  updateOverflow();
});

onUnmounted(() => {
  window.removeEventListener("resize", updateOverflow);
});
</script>

<style scoped>
.c-team-name {
  color: inherit;
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  display: inline-block;
  max-width: 100%;

  a&:hover {
    text-decoration: underline;
  }
}

.c-team-name__text {
  display: inline-block;
  white-space: nowrap;
}

.c-team-name.is-overflowing .c-team-name__text {
  animation: marquee calc(2s + var(--duration, 5s)) ease-in-out infinite alternate;
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  30% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(var(--overflow, 0px) * -1));
  }
}

.c-team-name--winner {
  font-weight: bold;
}

.c-team-name--placeholder {
  color: var(--euro-gray-400);
}

.c-team-name__country-flag {
  transform: scale(2) translateX(0.1rem);
}
</style>
