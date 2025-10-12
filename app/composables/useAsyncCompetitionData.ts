import { tchoukNetApiService } from "~/services/tchoukNetApiService";

export function useAsyncCompetitionData(competitionId: string | undefined) {
  return useAsyncData(`competition-${competitionId}`, () => {
    if (!competitionId) {
      throw new Error(`Undefined competition ID: ${competitionId}`);
    }
    return tchoukNetApiService.getCompetition(competitionId);
  });
}
