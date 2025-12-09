import { type Team, type Player, type Match, type Standing, type EnrichedMatch, type TournamentEdition, type MatchEvent } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || '';

const editions: { [key: string]: { name: string, year: number } } = {
    '7': { name: '第七届', year: 2025 },
    '6': { name: '第六届', year: 2024 },
};

const teamsData: { [edition: string]: { id: string; name: string }[] } = {
    '7': [
        { id: 't1', name: '山东交通学院' }, { id: 't2', name: '四川大学' }, { id: 't3', name: '同济大学' }, { id: 't4', name: '西北工业大学' }, { id: 't5', name: '华科山一医' }, { id: 't6', name: '湖南大学' }, { id: 't7', name: '北航西大武大' }, { id: 't8', name: '山东建筑大学' }, { id: 't9', name: '清华山理工' }, { id: 't10', name: '吉林大学' }, { id: 't11', name: '山东农业大学' }, { id: 't12', name: '济南大学' }, { id: 't13', name: '大连理工大学' }, { id: 't14', name: '哈尔滨工程大学' }, { id: 't15', name: '天大重大' }, { id: 't16', name: '武理工地大' }, { id: 't17', name: '青岛大学' }, { id: 't18', name: '华理南理工' }, { id: 't19', name: '烟台大学' }, { id: 't20', name: '山东财经大学' }, { id: 't21', name: '山东科技大学' }, { id: 't22', name: '中国海洋大学' }, { id: 't23', name: '青岛科技大学' }, { id: 't24', name: '中国石油大学' }, { id: 't25', name: '延边大学' }, { id: 't26', name: '厦大北大' },
    ],
    '6': [ // Assuming fewer teams for the previous edition for variety
        { id: 't1-6', name: '老朋友队' }, { id: 't2-6', name: '青春风暴' }, { id: 't3-6', name: '蓝色火焰' }, { id: 't4-6', name: '城市精英' }, { id: 't5-6', name: '绿茵荣耀' }, { id: 't6-6', name: '黑马奇迹' }, { id: 't7-6', name: '永不言弃' }, { id: 't8-6', name: '黄金一代' },
    ],
};

const tournamentData: { [key: string]: TournamentEdition } = {};

for (const editionId in editions) {
    const teamList = teamsData[editionId];
    const players: Player[] = teamList.flatMap((team, index) => [
        { id: `p${index * 3 + 1}-${editionId}`, name: `${team.name.substring(0,4)}球员A`, position: '前锋', number: 9, imageUrl: getImage('player-1'), teamId: team.id, stats: { gamesPlayed: 5, goals: 3, assists: 1, shotsPerGame: 2.5, passSuccessRate: 80, yellowCards: 1, redCards: 0 } },
        { id: `p${index * 3 + 2}-${editionId}`, name: `${team.name.substring(0,4)}球员B`, position: '中场', number: 10, imageUrl: getImage('player-2'), teamId: team.id, stats: { gamesPlayed: 5, goals: 1, assists: 4, shotsPerGame: 1.2, passSuccessRate: 88, yellowCards: 0, redCards: 0 } },
        { id: `p${index * 3 + 3}-${editionId}`, name: `${team.name.substring(0,4)}球员C`, position: '后卫', number: 4, imageUrl: getImage('player-3'), teamId: team.id, stats: { gamesPlayed: 5, goals: 0, assists: 1, shotsPerGame: 0.5, passSuccessRate: 85, yellowCards: 2, redCards: 0 } },
    ]);

    const teams: Team[] = teamList.map(t => ({
        id: t.id,
        name: t.name,
        logoUrl: getImage(`team-logo-${parseInt(t.id.replace('t','').split('-')[0])}`),
        players: players.filter(p => p.teamId === t.id),
        coach: `${t.name.substring(0, 1)}教练`
    }));

    const matchEvents: { [matchId: string]: MatchEvent[] } = editionId === '7' ? {
        'm1': [
            { minute: 23, type: 'goal', playerId: 'p1-7', teamId: 't1' },
            { minute: 48, type: 'goal', playerId: 'p4-7', teamId: 't2' },
            { minute: 78, type: 'goal', playerId: 'p2-7', teamId: 't1' },
            { minute: 85, type: 'yellow-card', playerId: 'p6-7', teamId: 't2' },
        ],
        'm3': [
            { minute: 11, type: 'goal', playerId: 'p13-7', teamId: 't5' },
            { minute: 34, type: 'yellow-card', playerId: 'p18-7', teamId: 't6' },
            { minute: 45, type: 'goal', playerId: 'p14-7', teamId: 't5' },
            { minute: 55, type: 'goal', playerId: 'p16-7', teamId: 't6' },
            { minute: 68, type: 'goal', playerId: 'p17-7', teamId: 't6' },
            { minute: 92, type: 'goal', playerId: 'p13-7', teamId: 't5' },
        ],
        'm4': [
            { minute: 50, type: 'goal', playerId: 'p22-7', teamId: 't8' },
            { minute: 90, type: 'red-card', playerId: 'p20-7', teamId: 't7' },
            { minute: 91, type: 'goal', playerId: 'p19-7', teamId: 't7' },
        ]
    } : {};


    const matches: Match[] = editionId === '7' ? [
        { id: 'm1', team1Id: 't1', team2Id: 't2', date: '2025-09-14', time: '10:00-12:00', venue: '极地南场', status: 'finished', score: { team1: 2, team2: 1 }, events: matchEvents['m1'] },
        { id: 'm2', team1Id: 't3', team2Id: 't4', date: '2025-09-14', time: '10:00-12:00', venue: '极地北场', status: 'finished', score: { team1: 0, team2: 0 }, events: [] },
        { id: 'm3', team1Id: 't5', team2Id: 't6', date: '2025-09-14', time: '12:00-14:00', venue: '极地南场', status: 'finished', score: { team1: 3, team2: 2 }, events: matchEvents['m3'] },
        { id: 'm4', team1Id: 't7', team2Id: 't8', date: '2025-09-14', time: '12:00-14:00', venue: '极地北场', status: 'finished', score: { team1: 1, team2: 1 }, events: matchEvents['m4'] },
        { id: 'm5', team1Id: 't9', team2Id: 't10', date: '2025-09-14', time: '14:00-16:00', venue: '极地南场', status: 'scheduled' },
        { id: 'm6', team1Id: 't11', team2Id: 't12', date: '2025-09-14', time: '14:00-16:00', venue: '极地北场', status: 'scheduled' },
    ] : [
        { id: 'm1-6', team1Id: 't1-6', team2Id: 't2-6', date: '2024-08-10', time: '10:00', venue: '白沙湾球场', status: 'finished', score: { team1: 4, team2: 2 } },
        { id: 'm2-6', team1Id: 't3-6', team2Id: 't4-6', date: '2024-08-10', time: '12:00', venue: '白沙湾球场', status: 'finished', score: { team1: 1, team2: 0 } },
        { id: 'm3-6', team1Id: 't5-6', team2Id: 't6-6', date: '2024-08-11', time: '10:00', venue: '白沙湾球场', status: 'finished', score: { team1: 2, team2: 2 } },
        { id: 'm4-6', team1Id: 't7-6', team2Id: 't8-6', date: '2024-08-11', time: '12:00', venue: '白沙湾球场', status: 'finished', score: { team1: 0, team2: 3 } },
    ];

    tournamentData[editionId] = {
        id: editionId,
        name: editions[editionId].name,
        year: editions[editionId].year,
        teams,
        players,
        matches,
    };
}

const getEditionData = (editionId: string = '7'): TournamentEdition => {
    return tournamentData[editionId] || tournamentData['7'];
}

export const getAvailableEditions = async (): Promise<{ id: string; name: string }[]> => {
    return new Promise(resolve => setTimeout(() => resolve(Object.keys(editions).map(id => ({ id, name: `${editions[id].year}年 ${editions[id].name}` }))), 50));
}

export const getTeams = async (editionId?: string): Promise<Team[]> => {
  return new Promise(resolve => setTimeout(() => resolve(getEditionData(editionId).teams), 100));
};

export const getPlayers = async (editionId?: string): Promise<Player[]> => {
    return new Promise(resolve => setTimeout(() => resolve(getEditionData(editionId).players), 100));
};

export const getMatches = async (editionId?: string): Promise<EnrichedMatch[]> => {
  const edition = getEditionData(editionId);
  const enrichedMatches = edition.matches.map(match => {
    const team1 = edition.teams.find(t => t.id === match.team1Id)!;
    const team2 = edition.teams.find(t => t.id === match.team2Id)!;
    const enrichedEvents = match.events?.map(event => {
        const player = edition.players.find(p => p.id === event.playerId);
        return { ...event, playerName: player?.name || '未知球员' };
    })
    return { ...match, team1, team2, events: enrichedEvents };
  });
  return new Promise(resolve => setTimeout(() => resolve(enrichedMatches), 100));
};

export const getMatch = async (matchId: string, editionId?: string): Promise<EnrichedMatch | undefined> => {
    const matches = await getMatches(editionId);
    return matches.find(m => m.id === matchId);
}

export const getStandings = async (editionId?: string): Promise<Standing[]> => {
    const edition = getEditionData(editionId);

    let standings: Standing[] = edition.teams.map((team) => ({
        rank: 0,
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

    edition.matches.forEach(match => {
      if (match.status === 'finished' && match.score) {
        const team1Standing = standings.find(s => s.team.id === match.team1Id);
        const team2Standing = standings.find(s => s.team.id === match.team2Id);
        const score1 = match.score.team1;
        const score2 = match.score.team2;

        if (team1Standing && team2Standing) {
          team1Standing.played++;
          team2Standing.played++;
          team1Standing.goalsFor += score1;
          team2Standing.goalsFor += score2;
          team1Standing.goalsAgainst += score2;
          team2Standing.goalsAgainst += score1;
          team1Standing.goalDifference = team1Standing.goalsFor - team1Standing.goalsAgainst;
          team2Standing.goalDifference = team2Standing.goalsFor - team2Standing.goalsAgainst;

          if (score1 > score2) {
            team1Standing.win++;
            team2Standing.loss++;
            team1Standing.points += 3;
          } else if (score1 < score2) {
            team2Standing.win++;
            team1Standing.loss++;
            team2Standing.points += 3;
          } else {
            team1Standing.draw++;
            team2Standing.draw++;
            team1Standing.points += 1;
            team2Standing.points += 1;
          }
        }
      }
    });

  const sortedStandings = standings.sort((a,b) => b.points - a.points || b.goalDifference - a.goalDifference).map((s, i) => ({...s, rank: i + 1}));
  return new Promise(resolve => setTimeout(() => resolve(sortedStandings), 100));
};
