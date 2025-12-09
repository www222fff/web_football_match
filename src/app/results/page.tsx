import { MatchCard } from "@/components/matches/MatchCard";
import { TopHeader } from "@/components/layout/TopHeader";
import { getMatches, getAvailableEditions } from "@/lib/data";
import { type EnrichedMatch } from "@/lib/types";

export async function generateStaticParams() {
  const editions = await getAvailableEditions();
  const params = editions.map(e => ({ edition: e.id }));
  // Add an entry for the default path with no search params
  return [{}, ...params];
}

export default async function ResultsPage({ searchParams }: { searchParams: { edition?: string } }) {
  const editionId = searchParams.edition;
  const allMatches: EnrichedMatch[] = await getMatches(editionId);
  const finishedMatches = allMatches.filter(m => m.status === 'finished').sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="flex flex-col">
      <TopHeader title="比赛结果" />
      <div className="p-4 space-y-4">
        {finishedMatches.length > 0 ? (
            finishedMatches.map(match => (
                <MatchCard key={match.id} match={match} />
            ))
        ) : (
            <p className="text-center text-muted-foreground mt-8">暂无已结束的比赛。</p>
        )}
      </div>
    </div>
  );
}
