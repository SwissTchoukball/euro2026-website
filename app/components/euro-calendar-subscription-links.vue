<template>
  <div class="c-calendar-subscription-links">
    <button
      class="c-calendar-subscription-links__cta u-unstyled-button"
      type="button"
      :aria-expanded="isOpen"
      @click="isOpen = !isOpen"
    >
      <Icon name="ph:calendar-plus-bold" />
      {{ cta }}
      <Icon name="mdi:chevron-down" />
    </button>
    <ul v-show="isOpen" class="u-unstyled-list c-calendar-subscription-links__menu">
      <li class="c-calendar-subscription-links__menu-item">
        <a :href="webcalUrl" @click.prevent="onAnyCalendarAppClick">
          <Icon name="ph:calendar-dots-bold" />
          <span>{{ $t("calendarSubscription.anyCalendarApp") }}</span>
        </a>
      </li>
      <li class="c-calendar-subscription-links__menu-item">
        <a :href="googleCalendarUrl" @click.prevent="onGoogleCalendarClick">
          <Icon name="ph:google-logo-bold" />
          <span>Google Calendar</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import type { TchoukNetTeam } from "~/services/tchoukNetApi";

const { localizeCompetitionEntityName } = useI18nHelper();

const { eventId, team = undefined } = defineProps<{
  eventId: string;
  team?: TchoukNetTeam;
}>();

const isOpen = ref(false);

const cta = computed(() => {
  if (team) {
    return $t("calendarSubscription.cta.teamGames", {
      teamName: `${localizeCompetitionEntityName(team.name)} ${localizeCompetitionEntityName(team.team_entity.team_type.name)}`,
    });
  }

  return $t("calendarSubscription.cta.allGames");
});

const webcalUrl = computed(() => {
  let url = `webcal://data.tchouk.net/calendar/event/${eventId}`;

  if (team) {
    url += `/teams/${team.team_entity.id}`;
  }

  url += ".ics";

  return url;
});

const googleCalendarUrl = computed(() => {
  return `https://calendar.google.com/render?cid=${encodeURI(webcalUrl.value)}`;
});

const showRefreshWarning = () => {
  window.alert($t("calendarSubscription.refreshWarning"));
};

const onAnyCalendarAppClick = () => {
  showRefreshWarning();
  location.href = webcalUrl.value;
};

const onGoogleCalendarClick = () => {
  showRefreshWarning();
  location.href = googleCalendarUrl.value;
};
</script>

<style scoped>
.c-calendar-subscription-links {
  position: relative;
  display: inline-block;
}

.c-calendar-subscription-links__cta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--euro-blue-500);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;

  color: white;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;

  > .iconify {
    flex: 1 0 auto;
  }
}

.c-calendar-subscription-links__menu {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 0.25rem;
  padding: 0.5rem 0;
  background-color: white;
  border: 1px solid var(--euro-silver-300, #ccc);
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 10;
  min-width: 100%;
  white-space: nowrap;

  a {
    display: block;
    padding: 0.5rem 1rem;
    color: var(--euro-black-500);
    text-decoration: none;

    &:hover {
      background-color: var(--euro-gray-050);
    }
  }
}

.c-calendar-subscription-links__menu-item a {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  color: var(--euro-black-500);
  text-decoration: none;

  &:hover {
    background-color: var(--euro-gray-050);
  }
}
</style>
