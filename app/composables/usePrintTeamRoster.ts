import { getTeamQuery } from "~/queries";
import { tchoukNetApiService } from "~/services/tchoukNetApiService";
import { tchoukNetSlugIdMapping } from "~/services/tchoukNetSlugIdMapping";

// The CMS "role" field is free text entered in the team's own language, not a translated enum.
const CAPTAIN_ROLE_LABELS = ["captain", "capitaine", "kapitän"];

export function usePrintTeamRoster(competitionSlug: string, teamSlug: string) {
  const { locale } = useI18n();
  const { localizeCompetitionEntityName } = useI18nHelper();

  const competitionId = computed(() => tchoukNetSlugIdMapping.competitions?.[competitionSlug]?.id);
  const teamId = computed(() => tchoukNetSlugIdMapping.competitions?.[competitionSlug]?.teams?.[teamSlug]);

  const { data: competitionData } = useAsyncCompetitionData(competitionId.value);

  const { data: teamCompetitionData } = useAsyncData(
    `team-${teamId.value}`,
    () => {
      if (!teamId.value) {
        throw new Error(`Undefined team ID: ${teamId.value} / slug: ${teamSlug}`);
      }
      return tchoukNetApiService.getTeam(teamId.value);
    },
    { server: false },
  );

  // Not awaited: this composable is called many times at once on the all-teams print page, and a
  // top-level await would require Suspense - one shared Suspense boundary would block every team's
  // roster on the slowest one instead of letting each render as soon as its own data is ready.
  const { data: teamCmsData, status } = useKql(getTeamQuery(teamSlug, competitionSlug), {
    language: locale.value,
    server: false,
    // Retry transient 503s when the Kirby host throttles concurrent connections (e.g. the all-teams
    // print page firing one request per team at once).
    retry: 3,
    retryDelay: 500,
  });

  const competitionName = computed(() =>
    competitionData.value ? localizeCompetitionEntityName(competitionData.value.competition.name) : "",
  );
  const teamName = computed(() =>
    teamCompetitionData.value ? localizeCompetitionEntityName(teamCompetitionData.value.team.name) : "",
  );
  const title = computed(() => [teamName.value, competitionName.value].filter(Boolean).join(" · "));

  const players = computed(() => teamCmsData.value?.result?.players ?? []);

  function isCaptain(role: string) {
    return CAPTAIN_ROLE_LABELS.includes(role?.trim().toLowerCase());
  }
  const captainLetter = computed(() => (locale.value === "de" ? "K" : "C"));

  return { title, players, status, isCaptain, captainLetter };
}
