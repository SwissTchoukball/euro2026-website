export type TchoukNetOrganisation = {
  name: string;
  id: string;

  theme_color_background?: string;
  theme_color_text?: string;
  theme_background_image_url?: string;
  theme_icon_url?: string;
};

export type TchoukNetCompetition = {
  id: string;
  name: string;
  organisation?: TchoukNetOrganisation;
  event?: TchoukNetEvent;
  phases?: TchoukNetCompetitionPhase[];
};

export type TchoukNetCompetitionPhase = {
  id: string;
  name: string;
  competition?: TchoukNetCompetition;
};

export type TchoukNetEvent = {
  id: string;
  name: string;
  organisation: TchoukNetOrganisation;
  competitions: TchoukNetCompetition[];
};

export type TchoukNetCountry = {
  id: string;
  name: string;
  emoji: string;
};

export type TchoukNetTeamType = {
  id: string;
  name: string;
};

export type TchoukNetTeam = {
  id: string;
  name: string;
  identifier: string;
  type_type?: TchoukNetTeamType;
  countries: TchoukNetCountry[];
};

export interface TchoukNetGameTeam {
  name: string;
  team: TchoukNetTeam;
  total_points: number;
  period_points: {
    "1": number;
    "2": number;
    "3": number;
  };
  id: string;
}

export interface TchoukNetGameLog {
  id: string;
}

export interface TchoukNetGame {
  id: string;
  selection_a?: TchoukNetGameTeam;
  selection_b?: TchoukNetGameTeam;
  score_a?: number;
  score_b?: number;
  label_a?: string;
  label_b?: string;
  start_at?: string;
  logs?: TchoukNetGameLog[];
  link_youtube_url?: string;
  is_playing?: boolean;
  has_ended?: boolean;
  organisation?: TchoukNetOrganisation;
  competition_phase?: TchoukNetCompetitionPhase;
}

export type TchoukNetPlanningOverview = {
  next_games: TchoukNetGame[];
  last_games: TchoukNetGame[];
  current_games: TchoukNetGame[];
};
