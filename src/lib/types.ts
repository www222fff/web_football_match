export type Team = {
  id: string;
  name: string;
  logoUrl: string;
  players: Player[];
  coach: string;
};

export type Player = {
  id: string;
  name: string;
  position: string;
  number: number;
  imageUrl: string;
  teamId: string;
  stats: PlayerStats;
};

export type PlayerStats = {
  goals: number;
  assists: number;
  gamesPlayed: number;
  yellowCards: number;
  redCards: number;
  shotsPerGame: number;
  passSuccessRate: number;
};

export type Match = {
  id: string;
  team1Id: string;
  team2Id: string;
  date: string;
  time: string;
  venue: string;
  status: 'scheduled' | 'live' | 'finished';
  score?: {
    team1: number;
    team2: number;
  };
  events?: MatchEvent[];
};

export type EnrichedMatch = Omit<Match, 'team1Id' | 'team2Id'> & {
  team1: Team;
  team2: Team;
}

export type MatchEvent = {
  minute: number;
  type: 'goal' | 'yellow-card' | 'red-card';
  playerId: string;
  teamId: string;
};

export type Standing = {
  rank: number;
  team: Team;
  played: number;
  win: number;
  draw: number;
  loss: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
};
