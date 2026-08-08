import type { TchoukNetGame, TchoukNetGameTeam, TchoukNetTeam } from "~/services/tchoukNetApi";

export interface StandingTeam {
  team: TchoukNetTeam;
  played: number;
  won: number;
  lost: number;
  drawn: number;
  points: number;
  for: number;
  against: number;
  ineligible: boolean;
}

export enum StandingSystem {
  FITB = "fitb",
  SwissTchoukball = "swiss-tchoukball",
}

export const standingPoints = {
  [StandingSystem.FITB]: {
    win: 3,
    draw: 2,
    loss: 1,
    forfeit: 0,
  },
  [StandingSystem.SwissTchoukball]: {
    win: 3,
    draw: 2,
    loss: 1,
    forfeit: 0,
  },
};

// TODO: Make it less hardcoded
const ineligibleTeamIds = [
  "1f14163d-204b-6cd4-9ed3-3bc7f2227f91", // Switzerland B Women
  "1f10f15e-6df3-6f92-8219-b37f37944f41", // Switzerland B M18 Boys
  "1f141642-5b4e-68f4-8c31-a158ab8a006d", // Switzerland BEJUNE M15 Girls
  "1f131c23-5ec1-6c80-a238-1519de508deb", // Switzerland GE M15 Boys
];

export const rankingGamesNumberingStart: Record<string, number> = {
  "1f13445c-ab5a-62de-8992-99d2b783d635": 5,
};

export function phaseHasStandings(phaseSlug: string): boolean {
  return (
    phaseSlug.includes("group") ||
    phaseSlug.includes("qualification") ||
    phaseSlug.includes("round-robin") ||
    phaseSlug.includes("ranking-games")
  );
}

export function generateStandingsTeams(
  games: TchoukNetGame[],
  options: { system: StandingSystem } = { system: StandingSystem.FITB },
): Record<string, StandingTeam> {
  const teams: Record<string, StandingTeam> = {};

  const systemStandingPoints = standingPoints[options.system];

  games.forEach((game) => {
    if (!game.selection_a || !game.selection_b) {
      return;
    }

    const selections: TchoukNetGameTeam[] = [game.selection_a, game.selection_b];

    // Initialisation, played, and points for.
    selections.forEach((selection) => {
      if (!teams[selection.team.id]) {
        teams[selection.team.id] = {
          team: selection.team,
          played: 0,
          won: 0,
          lost: 0,
          drawn: 0,
          points: 0,
          for: 0,
          against: 0,
          ineligible: ineligibleTeamIds.includes(selection.team.team_entity.id),
        };
      }
      if (game.has_ended) {
        teams[selection.team.id]!.played++;
        teams[selection.team.id]!.for += selection.total_points || 0;
      }
    });

    if (!game.has_ended) {
      return;
    }

    // Points against
    teams[game.selection_a.team.id]!.against += game.selection_b.total_points || 0;
    teams[game.selection_b.team.id]!.against += game.selection_a.total_points || 0;

    // Standings points
    if (game.selection_a.total_points != null && game.selection_b.total_points != null) {
      if (game.selection_a.total_points > game.selection_b.total_points) {
        teams[game.selection_a.team.id]!.won++;
        teams[game.selection_b.team.id]!.lost++;
        teams[game.selection_a.team.id]!.points += systemStandingPoints.win;
        if (game.selection_a.total_points === 30 && game.selection_b.total_points === 0) {
          // Forfeit
          teams[game.selection_b.team.id]!.points += systemStandingPoints.forfeit;
        } else {
          // Lost
          teams[game.selection_b.team.id]!.points += systemStandingPoints.loss;
        }
      } else if (game.selection_a.total_points < game.selection_b.total_points) {
        teams[game.selection_a.team.id]!.lost++;
        teams[game.selection_b.team.id]!.won++;
        teams[game.selection_b.team.id]!.points += systemStandingPoints.win;
        if (game.selection_b.total_points === 30 && game.selection_a.total_points === 0) {
          // Forfeit
          teams[game.selection_a.team.id]!.points += systemStandingPoints.forfeit;
        } else {
          // Lost
          teams[game.selection_a.team.id]!.points += systemStandingPoints.loss;
        }
      } else {
        teams[game.selection_a.team.id]!.drawn++;
        teams[game.selection_b.team.id]!.drawn++;
        teams[game.selection_a.team.id]!.points += systemStandingPoints.draw;
        teams[game.selection_b.team.id]!.points += systemStandingPoints.draw;
      }
    }
  });

  return teams;
}

function getGamesBetweenTwoTeams(teamAId: string, teamBId: string, games: TchoukNetGame[]) {
  return games.filter((game) => {
    if (!game.selection_a || !game.selection_b) {
      return false;
    }
    return (
      (game.selection_a.team.id === teamAId && game.selection_b.team.id === teamBId) ||
      (game.selection_a.team.id === teamBId && game.selection_b.team.id === teamAId)
    );
  });
}

function tieBreakByHeadToHead(
  teamA: StandingTeam,
  teamB: StandingTeam,
  games: TchoukNetGame[],
  options: { system: StandingSystem } = { system: StandingSystem.FITB },
): number {
  const headToHeadGames = getGamesBetweenTwoTeams(teamA.team.id, teamB.team.id, games);
  if (headToHeadGames.length === 0) {
    return 0;
  }

  const standingTeams = generateStandingsTeams(headToHeadGames, { system: options.system });
  const teamAStanding = standingTeams[teamA.team.id];
  const teamBStanding = standingTeams[teamB.team.id];

  if (!teamAStanding) {
    throw new Error(`Team A (${teamA.team.name}) not found in head-to-head standings`);
  }

  if (!teamBStanding) {
    throw new Error(`Team B (${teamB.team.name}) not found in head-to-head standings`);
  }

  if (teamBStanding.points !== teamAStanding.points) {
    return teamBStanding.points - teamAStanding.points;
  }

  const diffA = teamAStanding.for - teamAStanding.against;
  const diffB = teamBStanding.for - teamBStanding.against;
  if (diffB !== diffA) {
    return diffB - diffA;
  }
  if (teamBStanding.for !== teamAStanding.for) {
    return teamBStanding.for - teamAStanding.for;
  }
  return 0;
}

export function sortStandings(
  standingTeams: Record<string, StandingTeam>,
  games: TchoukNetGame[],
  options: { system: StandingSystem } = { system: StandingSystem.FITB },
): StandingTeam[] {
  return Object.values(standingTeams).sort((teamA, teamB) => {
    if (teamA.ineligible) {
      return 1;
    }

    if (teamB.ineligible) {
      return -1;
    }

    if (teamB.points !== teamA.points) {
      return teamB.points - teamA.points;
    }

    const tieBreakResult = tieBreakByHeadToHead(teamA, teamB, games, { system: options.system });
    if (tieBreakResult !== 0) {
      return tieBreakResult;
    }

    const diffA = teamA.for - teamA.against;
    const diffB = teamB.for - teamB.against;
    if (diffB !== diffA) {
      return diffB - diffA;
    }

    switch (options.system) {
      case StandingSystem.FITB:
        if (teamB.against !== teamA.against) {
          return teamA.against - teamB.against;
        }
        break;
      case StandingSystem.SwissTchoukball:
        if (teamB.for !== teamA.for) {
          return teamB.for - teamA.for;
        }
        break;
    }
    return teamA.team.name.localeCompare(teamB.team.name);
  });
}
