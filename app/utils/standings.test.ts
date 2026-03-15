import { describe, expect, it } from "vitest";

import type { TchoukNetGame, TchoukNetGameTeam, TchoukNetTeam } from "~/services/tchoukNetApi";

import { generateStandingsTeams, sortStandings, StandingSystem } from "./standings";

// --- Helpers ---

function makeTeam(id: string, name: string): TchoukNetTeam {
  return { id, name, identifier: id, countries: [] };
}

function makeGameTeam(team: TchoukNetTeam, totalPoints: number): TchoukNetGameTeam {
  return {
    id: `gt-${team.id}`,
    name: team.name,
    team,
    total_points: totalPoints,
    period_points: { "1": 0, "2": 0, "3": 0 },
  };
}

function makeEndedGame(teamA: TchoukNetTeam, scoreA: number, teamB: TchoukNetTeam, scoreB: number): TchoukNetGame {
  return {
    id: `${teamA.id}-vs-${teamB.id}`,
    status: "ended",
    has_ended: true,
    selection_a: makeGameTeam(teamA, scoreA),
    selection_b: makeGameTeam(teamB, scoreB),
  };
}

function makeUnfinishedGame(teamA: TchoukNetTeam, teamB: TchoukNetTeam): TchoukNetGame {
  return {
    id: `${teamA.id}-vs-${teamB.id}`,
    status: "planned",
    has_ended: false,
    selection_a: makeGameTeam(teamA, 0),
    selection_b: makeGameTeam(teamB, 0),
  };
}

const teamA = makeTeam("1", "Alpha");
const teamB = makeTeam("2", "Bravo");
const teamC = makeTeam("3", "Charlie");

// --- Tests ---

describe("generateStandingsTeams", () => {
  it("returns empty record for no games", () => {
    expect(generateStandingsTeams([])).toEqual({});
  });

  it("skips games where selection_a or selection_b is missing", () => {
    const game: TchoukNetGame = { id: "1", status: "ended", has_ended: true };
    expect(generateStandingsTeams([game])).toEqual({});
  });

  it("initializes teams from unfinished games but does not count stats", () => {
    const game = makeUnfinishedGame(teamA, teamB);
    const result = generateStandingsTeams([game]);

    expect(Object.keys(result)).toHaveLength(2);
    expect(result["1"]!.played).toBe(0);
    expect(result["1"]!.points).toBe(0);
    expect(result["2"]!.played).toBe(0);
  });

  it("counts a win correctly with FITB system (default): 2 pts winner, 0 pts loser", () => {
    const game = makeEndedGame(teamA, 50, teamB, 30);
    const result = generateStandingsTeams([game]);

    expect(result["1"]!.played).toBe(1);
    expect(result["1"]!.won).toBe(1);
    expect(result["1"]!.lost).toBe(0);
    expect(result["1"]!.points).toBe(2);
    expect(result["1"]!.for).toBe(50);
    expect(result["1"]!.against).toBe(30);

    expect(result["2"]!.played).toBe(1);
    expect(result["2"]!.won).toBe(0);
    expect(result["2"]!.lost).toBe(1);
    expect(result["2"]!.points).toBe(0);
    expect(result["2"]!.for).toBe(30);
    expect(result["2"]!.against).toBe(50);
  });

  it("counts a win correctly with Swiss Tchoukball system: 3 pts winner, 1 pt loser", () => {
    const game = makeEndedGame(teamA, 50, teamB, 30);
    const result = generateStandingsTeams([game], { system: StandingSystem.SwissTchoukball });

    expect(result["1"]!.played).toBe(1);
    expect(result["1"]!.won).toBe(1);
    expect(result["1"]!.lost).toBe(0);
    expect(result["1"]!.points).toBe(3);
    expect(result["1"]!.for).toBe(50);
    expect(result["1"]!.against).toBe(30);

    expect(result["2"]!.played).toBe(1);
    expect(result["2"]!.won).toBe(0);
    expect(result["2"]!.lost).toBe(1);
    expect(result["2"]!.points).toBe(1);
    expect(result["2"]!.for).toBe(30);
    expect(result["2"]!.against).toBe(50);
  });

  it("counts a win for team B correctly with FITB system (default)", () => {
    const game = makeEndedGame(teamA, 20, teamB, 40);
    const result = generateStandingsTeams([game]);

    expect(result["2"]!.won).toBe(1);
    expect(result["2"]!.points).toBe(2);
    expect(result["1"]!.lost).toBe(1);
    expect(result["1"]!.points).toBe(0);
  });

  it("counts a win for team B correctly with Swiss Tchoukball system", () => {
    const game = makeEndedGame(teamA, 20, teamB, 40);
    const result = generateStandingsTeams([game], { system: StandingSystem.SwissTchoukball });

    expect(result["2"]!.won).toBe(1);
    expect(result["2"]!.points).toBe(3);
    expect(result["1"]!.lost).toBe(1);
    expect(result["1"]!.points).toBe(1);
  });

  it("counts a draw correctly with FITB system (default): 1 pt each", () => {
    const game = makeEndedGame(teamA, 35, teamB, 35);
    const result = generateStandingsTeams([game]);

    expect(result["1"]!.drawn).toBe(1);
    expect(result["1"]!.points).toBe(1);
    expect(result["2"]!.drawn).toBe(1);
    expect(result["2"]!.points).toBe(1);
  });

  it("counts a draw correctly with Swiss Tchoukball system", () => {
    const game = makeEndedGame(teamA, 35, teamB, 35);
    const result = generateStandingsTeams([game], { system: StandingSystem.SwissTchoukball });

    expect(result["1"]!.drawn).toBe(1);
    expect(result["1"]!.points).toBe(2);
    expect(result["2"]!.drawn).toBe(1);
    expect(result["2"]!.points).toBe(2);
  });

  it("handles forfeit (30-0) with FITB system (default): loser gets 0 points", () => {
    const game = makeEndedGame(teamA, 30, teamB, 0);
    const result = generateStandingsTeams([game]);

    expect(result["1"]!.won).toBe(1);
    expect(result["1"]!.points).toBe(2);
    expect(result["2"]!.lost).toBe(1);
    expect(result["2"]!.points).toBe(0);
  });

  it("handles forfeit (30-0) with Swiss Tchoukball system", () => {
    const game = makeEndedGame(teamA, 30, teamB, 0);
    const result = generateStandingsTeams([game], { system: StandingSystem.SwissTchoukball });

    expect(result["1"]!.won).toBe(1);
    expect(result["1"]!.points).toBe(3);
    expect(result["2"]!.lost).toBe(1);
    expect(result["2"]!.points).toBe(0);
  });

  it("handles forfeit when team B forfeits (0-30) with FITB system (default): team A gets 0 points", () => {
    const game = makeEndedGame(teamA, 0, teamB, 30);
    const result = generateStandingsTeams([game]);

    expect(result["1"]!.lost).toBe(1);
    expect(result["1"]!.points).toBe(0);
    expect(result["2"]!.won).toBe(1);
    expect(result["2"]!.points).toBe(2);
  });

  it("handles forfeit when team B forfeits (0-30) with Swiss Tchoukball system", () => {
    const game = makeEndedGame(teamA, 0, teamB, 30);
    const result = generateStandingsTeams([game], { system: StandingSystem.SwissTchoukball });

    expect(result["1"]!.lost).toBe(1);
    expect(result["1"]!.points).toBe(0);
    expect(result["2"]!.won).toBe(1);
    expect(result["2"]!.points).toBe(3);
  });

  it("accumulates stats across multiple games with FITB system (default)", () => {
    const games = [
      makeEndedGame(teamA, 50, teamB, 30),
      makeEndedGame(teamA, 40, teamC, 45),
      makeEndedGame(teamB, 35, teamC, 35),
    ];
    const result = generateStandingsTeams(games);

    // Team A: 1 win + 1 loss = 3 + 1 = 4 pts
    expect(result["1"]!.played).toBe(2);
    expect(result["1"]!.won).toBe(1);
    expect(result["1"]!.lost).toBe(1);
    expect(result["1"]!.points).toBe(2);
    expect(result["1"]!.for).toBe(90);
    expect(result["1"]!.against).toBe(75);

    // Team C: 1 win + 1 draw = 3 + 2 = 5 pts
    expect(result["3"]!.played).toBe(2);
    expect(result["3"]!.won).toBe(1);
    expect(result["3"]!.drawn).toBe(1);
    expect(result["3"]!.points).toBe(3);

    // Team B: 1 loss + 1 draw = 1 + 2 = 3 pts
    expect(result["2"]!.played).toBe(2);
    expect(result["2"]!.lost).toBe(1);
    expect(result["2"]!.drawn).toBe(1);
    expect(result["2"]!.points).toBe(1);
  });

  it("accumulates stats across multiple games with Swiss Tchoukball system", () => {
    const games = [
      makeEndedGame(teamA, 50, teamB, 30),
      makeEndedGame(teamA, 40, teamC, 45),
      makeEndedGame(teamB, 35, teamC, 35),
    ];
    const result = generateStandingsTeams(games, { system: StandingSystem.SwissTchoukball });

    // Team A: 1 win + 1 loss = 3 + 1 = 4 pts
    expect(result["1"]!.played).toBe(2);
    expect(result["1"]!.won).toBe(1);
    expect(result["1"]!.lost).toBe(1);
    expect(result["1"]!.points).toBe(4);
    expect(result["1"]!.for).toBe(90);
    expect(result["1"]!.against).toBe(75);

    // Team C: 1 win + 1 draw = 3 + 2 = 5 pts
    expect(result["3"]!.played).toBe(2);
    expect(result["3"]!.won).toBe(1);
    expect(result["3"]!.drawn).toBe(1);
    expect(result["3"]!.points).toBe(5);

    // Team B: 1 loss + 1 draw = 1 + 2 = 3 pts
    expect(result["2"]!.played).toBe(2);
    expect(result["2"]!.lost).toBe(1);
    expect(result["2"]!.drawn).toBe(1);
    expect(result["2"]!.points).toBe(3);
  });

  it("handles null total_points gracefully (no standings points awarded)", () => {
    const game: TchoukNetGame = {
      id: "1",
      status: "ended",
      has_ended: true,
      selection_a: {
        ...makeGameTeam(teamA, 0),
        total_points: null as unknown as number,
      },
      selection_b: {
        ...makeGameTeam(teamB, 0),
        total_points: null as unknown as number,
      },
    };
    const result = generateStandingsTeams([game]);

    expect(result["1"]!.played).toBe(1);
    expect(result["1"]!.won).toBe(0);
    expect(result["1"]!.lost).toBe(0);
    expect(result["1"]!.drawn).toBe(0);
    expect(result["1"]!.points).toBe(0);
  });
});

describe("sortStandings", () => {
  it("sorts by points descending", () => {
    const games = [makeEndedGame(teamA, 50, teamB, 30), makeEndedGame(teamA, 45, teamC, 40)];
    const standings = generateStandingsTeams(games);
    const sorted = sortStandings(standings, games);

    expect(sorted[0]!.team.id).toBe("1"); // 6 pts
    expect(sorted[1]!.team.id).toBe("3"); // 1 pt
    expect(sorted[2]!.team.id).toBe("2"); // 1 pt (same pts as C, but worse goal diff)
  });

  it("breaks ties by head-to-head result (two teams)", () => {
    // A and B both beat C, so they are tied on points. A beat B head-to-head.
    const games = [
      makeEndedGame(teamA, 50, teamB, 30),
      makeEndedGame(teamA, 50, teamC, 30),
      makeEndedGame(teamB, 50, teamC, 30),
    ];
    const standings = generateStandingsTeams(games);
    const sorted = sortStandings(standings, games);

    // A: 2W = 6 pts, B: 1W 1L = 4 pts, C: 2L = 2 pts
    // A is clearly first. B second. C third.
    expect(sorted.map((s) => s.team.id)).toEqual(["1", "2", "3"]);
  });

  it("uses head-to-head to break a two-way tie with FITB system (default)", () => {
    // A beats B, both beat C and lose to D → A and D tied on pts, D wins head-to-head
    const teamD = makeTeam("4", "Delta");
    const games = [
      makeEndedGame(teamA, 50, teamB, 30), // A beats B
      makeEndedGame(teamA, 50, teamC, 30), // A beats C
      makeEndedGame(teamB, 50, teamC, 30), // B beats C
      makeEndedGame(teamD, 50, teamA, 30), // D beats A
      makeEndedGame(teamD, 50, teamB, 30), // D beats B
    ];
    const standings = generateStandingsTeams(games);
    const sorted = sortStandings(standings, games);

    // D: 2W = 4 pts, A: 2W 1L = 4 pts, B: 1W 2L = 2 pts, C: 3L = 0 pts
    // D: 4, A: 4, B: 2, C: 0 - D wins head-to-head
    expect(sorted[0]!.team.id).toBe("4"); // D first
    expect(sorted[1]!.team.id).toBe("1"); // A second
  });

  it("uses head-to-head to break a two-way tie with Swiss Tchoukball system", () => {
    // A beats B, both beat C and lose to D → A and B tied on pts, A wins h2h
    const teamD = makeTeam("4", "Delta");
    const games = [
      makeEndedGame(teamA, 50, teamB, 30), // A beats B
      makeEndedGame(teamA, 50, teamC, 30), // A beats C
      makeEndedGame(teamD, 50, teamA, 30), // D beats A
      makeEndedGame(teamD, 50, teamB, 30), // D beats B
      makeEndedGame(teamC, 50, teamD, 30), // C beats D
    ];
    const standings = generateStandingsTeams(games, { system: StandingSystem.SwissTchoukball });
    const sorted = sortStandings(standings, games, { system: StandingSystem.SwissTchoukball });

    // A: 2W 1L = 7 pts, B: 2L = 2 pts, C: 1W 1L = 3 pts, D: 2W 1L = 7 pts
    // A: 7, D: 7, C: 3, B: 2 - D wins head-to-head
    expect(sorted[0]!.team.id).toBe("4"); // D first
    expect(sorted[1]!.team.id).toBe("1"); // A second
  });

  it("breaks ties by overall goal difference when head-to-head is equal", () => {
    const teamD = makeTeam("4", "Delta");
    // A and B both beat the same teams by different margins, never play each other
    const games = [
      makeEndedGame(teamA, 50, teamC, 30), // A: +20
      makeEndedGame(teamB, 50, teamD, 30), // B: +20
      makeEndedGame(teamA, 40, teamD, 30), // A: +10 (total diff: +30)
      makeEndedGame(teamB, 50, teamC, 30), // B: +20 (total diff: +40)
    ];
    const standings = generateStandingsTeams(games);
    const sorted = sortStandings(standings, games);

    // A and B both have 4 pts, no head-to-head
    expect(sorted[0]!.team.id).toBe("2"); // B first (+40 goal difference)
    expect(sorted[1]!.team.id).toBe("1"); // A second (+30 goal difference)
  });

  it("sorts by best defence (lowest points-against is better) when goal difference is equal with FITB system (default)", () => {
    // A: for=60, against=40 → diff=+20
    // B: for=50, against=30 → diff=+20
    // No head-to-head between A and B
    const games = [makeEndedGame(teamA, 60, teamC, 40), makeEndedGame(teamB, 50, makeTeam("4", "Delta"), 30)];
    const standings = generateStandingsTeams(games);
    const sorted = sortStandings(standings, games);

    // Both 3 pts, no h2h, same diff (+20). A has more points-for (60 > 50).
    const topTwo = sorted.filter((s) => s.team.id === "1" || s.team.id === "2");
    expect(topTwo[0]!.team.id).toBe("2");
    expect(topTwo[1]!.team.id).toBe("1");
  });

  it("sorts by best attack (highest points-for is better) when goal difference is equal with Swiss Tchoukball system", () => {
    // A: for=60, against=40 → diff=+20
    // B: for=50, against=30 → diff=+20
    // No head-to-head between A and B
    const games = [makeEndedGame(teamA, 60, teamC, 40), makeEndedGame(teamB, 50, makeTeam("4", "Delta"), 30)];
    const standings = generateStandingsTeams(games, { system: StandingSystem.SwissTchoukball });
    const sorted = sortStandings(standings, games, { system: StandingSystem.SwissTchoukball });

    // Both 3 pts, no h2h, same diff (+20). A has more points-for (60 > 50).
    const topTwo = sorted.filter((s) => s.team.id === "1" || s.team.id === "2");
    expect(topTwo[0]!.team.id).toBe("1");
    expect(topTwo[1]!.team.id).toBe("2");
  });

  it("falls back to alphabetical name when all tiebreakers are equal", () => {
    // Two teams with identical records and no head-to-head
    const teamX = makeTeam("x", "Zulu");
    const teamY = makeTeam("y", "Yankee");

    const games = [makeEndedGame(teamX, 40, teamA, 30), makeEndedGame(teamY, 40, teamB, 30)];
    const standings = generateStandingsTeams(games);
    const sorted = sortStandings(standings, games);

    // X and Y: same pts (3), no head-to-head, same diff (+10), same for (40)
    // Yankee < Zulu alphabetically
    const topTwo = sorted.filter((s) => s.team.id === "x" || s.team.id === "y");
    expect(topTwo[0]!.team.name).toBe("Yankee");
    expect(topTwo[1]!.team.name).toBe("Zulu");
  });

  it("returns empty array for empty standings", () => {
    expect(sortStandings({}, [])).toEqual([]);
  });
});
