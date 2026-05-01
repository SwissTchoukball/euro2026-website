import { tchoukNetApiService } from "@/services/tchoukNetApiService";
import type { TchoukNetCompetition, TchoukNetParticipation } from "~/services/tchoukNetApi";

export function useAsyncTchoukNetEvent() {
  const { data, status, refresh } = useAsyncData("event", () => tchoukNetApiService.getEvent());

  /**
   * Computed property that returns the competitions with their participations.
   */
  const competitions = computed<
    (Pick<TchoukNetCompetition, "id" | "name"> & {
      participations: TchoukNetParticipation[];
    })[]
  >(() => {
    return (
      data.value?.event.competitions.map((competition) => ({
        ...competition,
        participations: data.value?.participations.filter((p) => p.competition?.id === competition.id) || [],
      })) || []
    );
  });

  return { data, competitions, status, refresh };
}

// TODO: Probably delete this file.
