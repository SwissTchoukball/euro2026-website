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
}

export function generateStandingsTeams(games: TchoukNetGame[]): Record<string, StandingTeam> {
  const teams: Record<string, StandingTeam> = {};

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
        teams[game.selection_a.team.id]!.points += 3;
        if (game.selection_a.total_points === 30 && game.selection_b.total_points === 0) {
          // Forfeit
          teams[game.selection_b.team.id]!.points += 0;
        } else {
          // Lost
          teams[game.selection_b.team.id]!.points += 1;
        }
      } else if (game.selection_a.total_points < game.selection_b.total_points) {
        teams[game.selection_a.team.id]!.lost++;
        teams[game.selection_b.team.id]!.won++;
        teams[game.selection_b.team.id]!.points += 3;
        if (game.selection_b.total_points === 30 && game.selection_a.total_points === 0) {
          // Forfeit
          teams[game.selection_a.team.id]!.points += 0;
        } else {
          // Lost
          teams[game.selection_a.team.id]!.points += 1;
        }
      } else {
        teams[game.selection_a.team.id]!.drawn++;
        teams[game.selection_b.team.id]!.drawn++;
        teams[game.selection_a.team.id]!.points += 2;
        teams[game.selection_b.team.id]!.points += 2;
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

function tieBreakByHeadToHead(teamA: StandingTeam, teamB: StandingTeam, games: TchoukNetGame[]): number {
  const headToHeadGames = getGamesBetweenTwoTeams(teamA.team.id, teamB.team.id, games);
  if (headToHeadGames.length === 0) {
    return 0;
  }

  const standingTeams = generateStandingsTeams(headToHeadGames);
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

export function sortStandings(standingTeams: Record<string, StandingTeam>, games: TchoukNetGame[]): StandingTeam[] {
  return Object.values(standingTeams).sort((teamA, teamB) => {
    if (teamB.points !== teamA.points) {
      return teamB.points - teamA.points;
    }

    const tieBreakResult = tieBreakByHeadToHead(teamA, teamB, games);
    if (tieBreakResult !== 0) {
      return tieBreakResult;
    }

    const diffA = teamA.for - teamA.against;
    const diffB = teamB.for - teamB.against;
    if (diffB !== diffA) {
      return diffB - diffA;
    }
    if (teamB.for !== teamA.for) {
      return teamB.for - teamA.for;
    }
    return teamA.team.name.localeCompare(teamB.team.name);
  });
}
