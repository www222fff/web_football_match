import { type Team, type Player, type Match, type Standing, type EnrichedMatch, type TournamentEdition, type MatchEvent, type EnrichedMatchEvent } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import edition7Data from '@/data/edition-7.json';
import edition6Data from '@/data/edition-6.json';

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || '';

const processEditionData = (editionData: any): TournamentEdition => {
    const players: Player[] = editionData.players.map((p: any) => ({ ...p, imageUrl: getImage(p.imageId) }));
    
    const teams: Team[] = editionData.teams.map((t: any) => ({
        ...t,
        logoUrl: getImage(t.logoImageId),
        players: players.filter(p => p.teamId === t.id)
    }));

    const matches: Match[] = editionData.matches.map((m: any) => {
        const matchEvents = editionData.matchEvents[m.id] || [];
        return { ...m, events: matchEvents };
    });

    return {
        id: editionData.id,
        name: editionData.name,
        year: editionData.year,
        teams,
        players,
        matches,
    };
};

const tournamentData: { [key: string]: TournamentEdition } = {
    '7': processEditionData(edition7Data),
    '6': processEditionData(edition6Data),
};

const getEditionData = (editionId: string = '7'): TournamentEdition => {
    return tournamentData[editionId] || tournamentData['7'];
}

export const getAvailableEditions = async (): Promise<{ id: string; name: string }[]> => {
    const editions = Object.values(tournamentData).map(e => ({
        id: e.id,
        name: `${e.year}年 ${e.name}`
    })).sort((a,b) => parseInt(b.id) - parseInt(a.id));
    return new Promise(resolve => setTimeout(() => resolve(editions), 50));
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
    const enrichedEvents: EnrichedMatchEvent[] = match.events?.map(event => {
        const player = edition.players.find(p => p.id === event.playerId);
        return { ...event, playerName: player?.name || '未知球员' };
    }) || []
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
