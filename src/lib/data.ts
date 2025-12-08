import { type Team, type Player, type Match, type Standing, type EnrichedMatch } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || '';

const teamsData: { id: string; name: string }[] = [
    { id: 't1', name: '山东交通学院' },
    { id: 't2', name: '四川大学' },
    { id: 't3', name: '同济大学' },
    { id: 't4', name: '西北工业大学' },
    { id: 't5', name: '华科山一医' },
    { id: 't6', name: '湖南大学' },
    { id: 't7', name: '北航西大武大' },
    { id: 't8', name: '山东建筑大学' },
    { id: 't9', name: '清华山理工' },
    { id: 't10', name: '吉林大学' },
    { id: 't11', name: '山东农业大学' },
    { id: 't12', name: '济南大学' },
    { id: 't13', name: '大连理工大学' },
    { id: 't14', name: '哈尔滨工程大学' },
    { id: 't15', name: '天大重大' },
    { id: 't16', name: '武理工地大' },
    { id: 't17', name: '青岛大学' },
    { id: 't18', name: '华理南理工' },
    { id: 't19', name: '烟台大学' },
    { id: 't20', name: '山东财经大学' },
    { id: 't21', name: '山东科技大学' },
    { id: 't22', name: '中国海洋大学' },
    { id: 't23', name: '青岛科技大学' },
    { id: 't24', name: '中国石油大学' },
    { id: 't25', name: '延边大学' },
    { id: 't26', name: '厦大北大' },
];

const players: Player[] = teamsData.flatMap((team, index) => [
    { id: `p${index * 3 + 1}`, name: `${team.name}球员1`, position: '前锋', number: 9, imageUrl: getImage('player-1'), teamId: team.id, stats: { gamesPlayed: 0, goals: 0, assists: 0, shotsPerGame: 0, passSuccessRate: 80, yellowCards: 0, redCards: 0 } },
    { id: `p${index * 3 + 2}`, name: `${team.name}球员2`, position: '中场', number: 10, imageUrl: getImage('player-2'), teamId: team.id, stats: { gamesPlayed: 0, goals: 0, assists: 0, shotsPerGame: 0, passSuccessRate: 88, yellowCards: 0, redCards: 0 } },
    { id: `p${index * 3 + 3}`, name: `${team.name}球员3`, position: '后卫', number: 4, imageUrl: getImage('player-3'), teamId: team.id, stats: { gamesPlayed: 0, goals: 0, assists: 0, shotsPerGame: 0, passSuccessRate: 85, yellowCards: 0, redCards: 0 } },
]);

const teams: Team[] = teamsData.map(t => ({
    id: t.id,
    name: t.name,
    logoUrl: getImage(`team-logo-${t.id.substring(1)}`),
    players: players.filter(p => p.teamId === t.id),
    coach: `${t.name.substring(0, 1)}教练`
}));


const matches: Match[] = [
    { id: 'm1', team1Id: 't1', team2Id: 't2', date: '2023-09-14', time: '10:00-12:00', venue: '极地南场', status: 'scheduled' },
    { id: 'm2', team1Id: 't3', team2Id: 't4', date: '2023-09-14', time: '10:00-12:00', venue: '极地北场', status: 'scheduled' },
    { id: 'm3', team1Id: 't5', team2Id: 't6', date: '2023-09-14', time: '12:00-14:00', venue: '极地南场', status: 'scheduled' },
    { id: 'm4', team1Id: 't7', team2Id: 't8', date: '2023-09-14', time: '12:00-14:00', venue: '极地北场', status: 'scheduled' },
    { id: 'm5', team1Id: 't9', team2Id: 't10', date: '2023-09-14', time: '14:00-16:00', venue: '极地南场', status: 'scheduled' },
    { id: 'm6', team1Id: 't11', team2Id: 't12', date: '2023-09-14', time: '14:00-16:00', venue: '极地北场', status: 'scheduled' },
    { id: 'm7', team1Id: 't13', team2Id: 't14', date: '2023-09-14', time: '16:00-18:00', venue: '极地南场', status: 'scheduled' },
    { id: 'm8', team1Id: 't15', team2Id: 't16', date: '2023-09-14', time: '16:00-18:00', venue: '极地北场', status: 'scheduled' },
    { id: 'm9', team1Id: 't17', team2Id: 't18', date: '2023-09-21', time: '9:00-11:00', venue: '极地南场', status: 'scheduled' },
    { id: 'm10', team1Id: 't19', team2Id: 't20', date: '2023-09-21', time: '9:00-11:00', venue: '极地北场', status: 'scheduled' },
    { id: 'm11', team1Id: 't21', team2Id: 't22', date: '2023-09-21', time: '13:00-14:40', venue: '极地南场', status: 'scheduled' },
    { id: 'm12', team1Id: 't23', team2Id: 't24', date: '2023-09-21', time: '13:00-14:40', venue: '极地北场', status: 'scheduled' },
    { id: 'm13', team1Id: 't25', team2Id: 't7', date: '2023-09-21', time: '14:40-16:20', venue: '极地南场', status: 'scheduled' },
    { id: 'm14', team1Id: 't9', team2Id: 't6', date: '2023-09-21', time: '14:40-16:20', venue: '极地北场', status: 'scheduled' },
    { id: 'm15', team1Id: 't10', team2Id: 't8', date: '2023-09-21', time: '16:20-18:00', venue: '极地南场', status: 'scheduled' },
    { id: 'm16', team1Id: 't26', team2Id: 't13', date: '2023-09-21', time: '16:20-18:00', venue: '极地北场', status: 'scheduled' },
    { id: 'm17', team1Id: 't15', team2Id: 't12', date: '2023-09-21', time: '18:00-20:00', venue: '极地南场', status: 'scheduled' },
    { id: 'm18', team1Id: 't16', team2Id: 't14', date: '2023-09-21', time: '18:00-20:00', venue: '极地北场', status: 'scheduled' },
    { id: 'm19', team1Id: 't23', team2Id: 't1', date: '2023-09-27', time: '9:00-10:50', venue: '极地南场', status: 'scheduled' },
    { id: 'm20', team1Id: 't24', team2Id: 't3', date: '2023-09-27', time: '9:00-10:50', venue: '极地北场', status: 'scheduled' },
    { id: 'm21', team1Id: 't2', team2Id: 't4', date: '2023-09-27', time: '10:50-12:40', venue: '极地南场', status: 'scheduled' },
    { id: 'm22', team1Id: 't21', team2Id: 't17', date: '2023-09-27', time: '10:50-12:40', venue: '极地北场', status: 'scheduled' },
    { id: 'm23', team1Id: 't22', team2Id: 't19', date: '2023-09-27', time: '12:40-14:30', venue: '极地南场', status: 'scheduled' },
    { id: 'm24', team1Id: 't18', team2Id: 't20', date: '2023-09-27', time: '12:40-14:30', venue: '极地北场', status: 'scheduled' },
    { id: 'm25', team1Id: 't9', team2Id: 't5', date: '2023-09-27', time: '14:30-16:20', venue: '极地南场', status: 'scheduled' },
    { id: 'm26', team1Id: 't10', team2Id: 't25', date: '2023-09-27', time: '14:30-16:20', venue: '极地北场', status: 'scheduled' },
    { id: 'm27', team1Id: 't8', team2Id: 't6', date: '2023-09-27', time: '16:20-18:10', venue: '极地南场', status: 'scheduled' },
    { id: 'm28', team1Id: 't15', team2Id: 't11', date: '2023-09-27', time: '16:20-18:10', venue: '极地北场', status: 'scheduled' },
];

const standings: Standing[] = teams.map((team, index) => ({
    rank: index + 1,
    team: team,
    played: 0,
    win: 0,
    draw: 0,
    loss: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
}));

// Simulate API calls
export const getTeams = async (): Promise<Team[]> => {
  return new Promise(resolve => setTimeout(() => resolve(teams), 100));
};

export const getPlayers = async (): Promise<Player[]> => {
    return new Promise(resolve => setTimeout(() => resolve(players), 100));
};

export const getMatches = async (): Promise<EnrichedMatch[]> => {
  const enrichedMatches = matches.map(match => {
    const team1 = teams.find(t => t.id === match.team1Id)!;
    const team2 = teams.find(t => t.id === match.team2Id)!;
    return { ...match, team1, team2 };
  });
  return new Promise(resolve => setTimeout(() => resolve(enrichedMatches), 100));
};

export const getStandings = async (): Promise<Standing[]> => {
  // sort by points and goal difference before returning
  const sortedStandings = standings.sort((a,b) => b.points - a.points || b.goalDifference - a.goalDifference).map((s, i) => ({...s, rank: i + 1}));
  return new Promise(resolve => setTimeout(() => resolve(sortedStandings), 100));
};
