import { type Team, type Player, type Match, type Standing, type EnrichedMatch, type TournamentEdition, type MatchEvent, type EnrichedMatchEvent } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import edition7Data from '@/data/edition-7.json';
import edition6Data from '@/data/edition-6.json';
import { getDocs, collection, doc, getDoc, query, where } from 'firebase/firestore';
import { getSdks } from '@/firebase';

const dataSource = process.env.NEXT_PUBLIC_DATA_SOURCE || 'local';

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || '';

// --- Local Data (JSON) ---
const processLocalEditionData = (editionData: any): TournamentEdition => {
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

const localTournamentData: { [key: string]: TournamentEdition } = {
    '7': processLocalEditionData(edition7Data),
    '6': processLocalEditionData(edition6Data),
};

const getLocalEditionData = (editionId: string = '7'): TournamentEdition => {
    return localTournamentData[editionId] || localTournamentData['7'];
}

// --- Remote Data (Firestore) ---

const getRemoteEditionData = async (editionId: string = '7'): Promise<TournamentEdition> => {
    const { firestore } = getSdks();
    
    const editionRef = doc(firestore, 'tournaments', editionId);
    const editionSnap = await getDoc(editionRef);

    if (!editionSnap.exists()) {
        console.error(`Edition ${editionId} not found in Firestore.`);
        return { id: editionId, name: '', year: 0, teams: [], players: [], matches: [] };
    }

    const editionData = editionSnap.data();

    // Fetch teams for the edition
    const teamsQuery = query(collection(firestore, 'teams'), where('tournamentId', '==', editionId));
    const teamsSnap = await getDocs(teamsQuery);
    const teams: Team[] = teamsSnap.docs.map(doc => ({ id: doc.id, ...doc.data(), logoUrl: getImage(doc.data().logoImageId), players: [] } as Team));

    // Fetch players for all teams in the edition
    const allPlayers: Player[] = [];
    for (const team of teams) {
        const playersQuery = query(collection(firestore, 'players'), where('teamId', '==', team.id));
        const playersSnap = await getDocs(playersQuery);
        const teamPlayers = playersSnap.docs.map(doc => ({ id: doc.id, ...doc.data(), imageUrl: getImage(doc.data().imageId) } as Player));
        allPlayers.push(...teamPlayers);
        const teamInList = teams.find(t => t.id === team.id);
        if (teamInList) {
            teamInList.players = teamPlayers;
        }
    }
    
    // Fetch matches for the edition
    const matchesQuery = query(collection(firestore, 'match_schedules'), where('tournamentId', '==', editionId));
    const matchesSnap = await getDocs(matchesQuery);

    const matches: Match[] = [];
    for (const matchDoc of matchesSnap.docs) {
        const matchData = matchDoc.data();

        // Fetch events for each match
        const eventsQuery = query(collection(firestore, `match_schedules/${matchDoc.id}/events`));
        const eventsSnap = await getDocs(eventsQuery);
        const events: MatchEvent[] = eventsSnap.docs.map(eventDoc => eventDoc.data() as MatchEvent);
        
        matches.push({ id: matchDoc.id, ...matchData, events } as Match);
    }
    
    return {
        id: editionId,
        name: editionData.name,
        year: editionData.year,
        teams,
        players: allPlayers,
        matches,
    };
};

const getEditionData = async (editionId: string = '7'): Promise<TournamentEdition> => {
    if (dataSource === 'remote') {
        return getRemoteEditionData(editionId);
    }
    return getLocalEditionData(editionId);
}


// --- Public API ---

export const getAvailableEditions = async (): Promise<{ id: string; name: string }[]> => {
    if (dataSource === 'remote') {
        const { firestore } = getSdks();
        const editionsSnap = await getDocs(collection(firestore, 'tournaments'));
        const editions = editionsSnap.docs.map(doc => ({
            id: doc.id,
            name: `${doc.data().year}年 ${doc.data().name}`
        })).sort((a,b) => parseInt(b.id) - parseInt(a.id));
         return new Promise(resolve => setTimeout(() => resolve(editions), 50));
    }
    const editions = Object.values(localTournamentData).map(e => ({
        id: e.id,
        name: `${e.year}年 ${e.name}`
    })).sort((a,b) => parseInt(b.id) - parseInt(a.id));
    return new Promise(resolve => setTimeout(() => resolve(editions), 50));
}

export const getTeams = async (editionId?: string): Promise<Team[]> => {
    const edition = await getEditionData(editionId);
    return new Promise(resolve => setTimeout(() => resolve(edition.teams), 100));
};

export const getPlayers = async (editionId?: string): Promise<Player[]> => {
    const edition = await getEditionData(editionId);
    return new Promise(resolve => setTimeout(() => resolve(edition.players), 100));
};

export const getMatches = async (editionId?: string): Promise<EnrichedMatch[]> => {
  const edition = await getEditionData(editionId);
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
    const edition = await getEditionData(editionId);

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
