import { type Team, type Player, type Match, type Standing, type EnrichedMatch } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || '';

const players: Player[] = [
  { id: 'p1', name: '李伟', position: '前锋', number: 9, imageUrl: getImage('player-1'), teamId: 't1', stats: { gamesPlayed: 5, goals: 5, assists: 2, shotsPerGame: 3.2, passSuccessRate: 78, yellowCards: 1, redCards: 0 } },
  { id: 'p2', name: '王强', position: '中场', number: 10, imageUrl: getImage('player-2'), teamId: 't1', stats: { gamesPlayed: 5, goals: 2, assists: 4, shotsPerGame: 2.1, passSuccessRate: 88, yellowCards: 0, redCards: 0 } },
  { id: 'p3', name: '张勇', position: '后卫', number: 4, imageUrl: getImage('player-3'), teamId: 't1', stats: { gamesPlayed: 5, goals: 0, assists: 1, shotsPerGame: 0.5, passSuccessRate: 85, yellowCards: 2, redCards: 0 } },
  { id: 'p4', name: '陈浩', position: '前锋', number: 11, imageUrl: getImage('player-4'), teamId: 't2', stats: { gamesPlayed: 5, goals: 4, assists: 1, shotsPerGame: 2.8, passSuccessRate: 80, yellowCards: 0, redCards: 0 } },
  { id: 'p5', name: '刘洋', position: '中场', number: 8, imageUrl: getImage('player-5'), teamId: 't2', stats: { gamesPlayed: 5, goals: 1, assists: 5, shotsPerGame: 1.9, passSuccessRate: 90, yellowCards: 1, redCards: 0 } },
  { id: 'p6', name: '赵磊', position: '门将', number: 1, imageUrl: getImage('player-6'), teamId: 't2', stats: { gamesPlayed: 5, goals: 0, assists: 0, shotsPerGame: 0.1, passSuccessRate: 65, yellowCards: 0, redCards: 0 } },
  { id: 'p7', name: '孙宇', position: '前锋', number: 7, imageUrl: getImage('player-1'), teamId: 't3', stats: { gamesPlayed: 5, goals: 3, assists: 3, shotsPerGame: 2.5, passSuccessRate: 82, yellowCards: 1, redCards: 1 } },
  { id: 'p8', name: '周鹏', position: '中场', number: 6, imageUrl: getImage('player-2'), teamId: 't3', stats: { gamesPlayed: 5, goals: 1, assists: 3, shotsPerGame: 1.5, passSuccessRate: 87, yellowCards: 3, redCards: 0 } },
  { id: 'p9', name: '吴杰', position: '后卫', number: 2, imageUrl: getImage('player-3'), teamId: 't3', stats: { gamesPlayed: 5, goals: 1, assists: 0, shotsPerGame: 0.8, passSuccessRate: 84, yellowCards: 1, redCards: 0 } },
  { id: 'p10', name: '郑明', position: '前锋', number: 14, imageUrl: getImage('player-4'), teamId: 't4', stats: { gamesPlayed: 5, goals: 2, assists: 1, shotsPerGame: 2.2, passSuccessRate: 75, yellowCards: 0, redCards: 0 } },
  { id: 'p11', name: '冯涛', position: '中场', number: 5, imageUrl: getImage('player-5'), teamId: 't4', stats: { gamesPlayed: 5, goals: 0, assists: 2, shotsPerGame: 1.0, passSuccessRate: 89, yellowCards: 2, redCards: 0 } },
  { id: 'p12', name: '蒋龙', position: '后卫', number: 3, imageUrl: getImage('player-6'), teamId: 't4', stats: { gamesPlayed: 5, goals: 0, assists: 0, shotsPerGame: 0.3, passSuccessRate: 81, yellowCards: 1, redCards: 0 } },
];

const teams: Team[] = [
  { id: 't1', name: '猛龙队', logoUrl: getImage('team-logo-1'), players: players.filter(p => p.teamId === 't1'), coach: '李教练' },
  { id: 't2', name: '赤焰队', logoUrl: getImage('team-logo-2'), players: players.filter(p => p.teamId === 't2'), coach: '王教练' },
  { id: 't3', name: '钢人队', logoUrl: getImage('team-logo-3'), players: players.filter(p => p.teamId === 't3'), coach: '张教练' },
  { id: 't4', name: '冰狼队', logoUrl: getImage('team-logo-4'), players: players.filter(p => p.teamId === 't4'), coach: '刘教练' },
];

const today = new Date();
const getFutureDate = (days: number) => {
  const date = new Date(today);
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
};
const getPastDate = (days: number) => {
    const date = new Date(today);
    date.setDate(date.getDate() - days);
    return date.toISOString().split('T')[0];
  };

const matches: Match[] = [
    { id: 'm1', team1Id: 't1', team2Id: 't2', date: getPastDate(7), time: '19:00', venue: '市体育场', status: 'finished', score: { team1: 2, team2: 1 } },
    { id: 'm2', team1Id: 't3', team2Id: 't4', date: getPastDate(6), time: '19:00', venue: '大学体育馆', status: 'finished', score: { team1: 0, team2: 0 } },
    { id: 'm3', team1Id: 't1', team2Id: 't3', date: getPastDate(1), time: '21:00', venue: '市体育场', status: 'finished', score: { team1: 3, team2: 1 } },
    { id: 'm4', team1Id: 't2', team2Id: 't4', date: today.toISOString().split('T')[0], time: '19:30', venue: '海滨体育场', status: 'live', score: { team1: 1, team2: 1 } },
    { id: 'm5', team1Id: 't1', team2Id: 't4', date: getFutureDate(2), time: '20:00', venue: '市体育场', status: 'scheduled' },
    { id: 'm6', team1Id: 't2', team2Id: 't3', date: getFutureDate(3), time: '18:00', venue: '公园球场', status: 'scheduled' },
];

const standings: Standing[] = [
  { rank: 1, team: teams[0], played: 2, win: 2, draw: 0, loss: 0, goalsFor: 5, goalsAgainst: 2, goalDifference: 3, points: 6 },
  { rank: 2, team: teams[1], played: 2, win: 0, draw: 1, loss: 1, goalsFor: 2, goalsAgainst: 3, goalDifference: -1, points: 1 },
  { rank: 3, team: teams[3], played: 2, win: 0, draw: 2, loss: 0, goalsFor: 1, goalsAgainst: 1, goalDifference: 0, points: 2 },
  { rank: 4, team: teams[2], played: 2, win: 0, draw: 1, loss: 1, goalsFor: 1, goalsAgainst: 3, goalDifference: -2, points: 1 },
].sort((a,b) => b.points - a.points || b.goalDifference - a.goalDifference).map((s, i) => ({...s, rank: i + 1}));


// Simulate API calls
export const getTeams = async (): Promise<Team[]> => {
  return new Promise(resolve => setTimeout(() => resolve(teams), 500));
};

export const getPlayers = async (): Promise<Player[]> => {
    return new Promise(resolve => setTimeout(() => resolve(players), 500));
};

export const getMatches = async (): Promise<EnrichedMatch[]> => {
  const enrichedMatches = matches.map(match => {
    const team1 = teams.find(t => t.id === match.team1Id)!;
    const team2 = teams.find(t => t.id === match.team2Id)!;
    return { ...match, team1, team2 };
  });
  return new Promise(resolve => setTimeout(() => resolve(enrichedMatches), 500));
};

export const getStandings = async (): Promise<Standing[]> => {
  return new Promise(resolve => setTimeout(() => resolve(standings), 500));
};
