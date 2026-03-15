import { tchoukNetApiService } from "~/services/tchoukNetApiService";

export function useAsyncCompetitionData(
  competitionId: string | undefined,
  options: { polling?: boolean } = { polling: false }
) {
  const asyncDataResult = useAsyncData(`competition-${competitionId}`, () => {
    if (!competitionId) {
      throw new Error(`Undefined competition ID: ${competitionId}`);
    }
    return tchoukNetApiService.getCompetition(competitionId);
  });

  if (options.polling) {
    usePolling(asyncDataResult.refresh);
  }

  return asyncDataResult;
}
