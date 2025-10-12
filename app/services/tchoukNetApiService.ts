import type {
  TchoukNetCompetition,
  TchoukNetCompetitionPhase,
  TchoukNetEvent,
  TchoukNetGame,
  TchoukNetPlanningOverview,
  TchoukNetTeam,
} from "./tchoukNetApi";

class TchoukNetApiService {
  private apiBaseUrl = "https://tchouk.net/api";

  // Euro 2026
  // private eventId = "1f0a5f2c-fb2a-64da-b726-dfb22bf931c9";
  // Ferrara 2024
  private eventId = "1ef411c5-9e4d-6f5c-b418-2361c26a7c4a";
  // TGI 2023
  // private eventId = "b9fec05a-2778-4b94-b440-ffd660dbff19";

  private sendRequest = async <T = any>(input: RequestInfo, init: RequestInit): Promise<T> => {
    const response = await fetch(input, init);

    if (!response.ok) {
      console.error(`API request failed: ${response.status} ${response.statusText}`);
      // return this.handleNonOkApiResponse<T>(response, { requestInput: input, requestInit: init, isSecondAttempt });
    }

    return response.json();
  };

  private sendGetRequest = async <T>(path: string): Promise<T> => {
    const input: RequestInfo = `${this.apiBaseUrl}${path}`;
    const init: RequestInit = {
      headers: {
        Accept: "application/json, text/plain, */*",
      },
    };

    const responseJson = this.sendRequest(input, init);
    return responseJson;
  };

  public getEvent = async (): Promise<{
    event: TchoukNetEvent;
    overview: TchoukNetPlanningOverview;
  }> => this.sendGetRequest(`/events/${this.eventId}`);

  public getCompetition = async (
    competitionId: string
  ): Promise<{
    competition: TchoukNetCompetition;
    overview: TchoukNetPlanningOverview;
  }> => this.sendGetRequest(`/competitions/${competitionId}`);

  public getPhase = async (
    phaseId: string
  ): Promise<{
    competition_phase: TchoukNetCompetitionPhase;
    games: TchoukNetGame[];
  }> => this.sendGetRequest(`/games/phase/${phaseId}`);

  public getTeam = async (
    teamIdentifier: string
  ): Promise<{
    team: TchoukNetTeam;
    games: TchoukNetGame[];
  }> => this.sendGetRequest(`/games/team/${teamIdentifier}`);

  public getCountry = async (
    countryId: string
  ): Promise<{
    country: { id: string; name: string; emoji: string };
    teams: TchoukNetTeam[];
    overview: TchoukNetPlanningOverview;
  }> => this.sendGetRequest(`/games/country/${countryId}`);
}

export const tchoukNetApiService = new TchoukNetApiService();
