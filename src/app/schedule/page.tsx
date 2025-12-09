import { MatchCard } from "@/components/matches/MatchCard";
import { TopHeader } from "@/components/layout/TopHeader";
import { getMatches, getAvailableEditions } from "@/lib/data";
import { type EnrichedMatch } from "@/lib/types";

export async function generateStaticParams() {
  const editions = await getAvailableEditions();
  const params = editions.map((edition) => ({
    edition: edition.id,
  }));
  return [...params, {}];
}

export default async function SchedulePage({ searchParams }: { searchParams: { edition?: string } }) {
  const editionId = searchParams.edition;
  const allMatches: EnrichedMatch[] = await getMatches(editionId);
  const scheduledMatches = allMatches
    .filter(m => m.status === 'scheduled' || m.status === 'live')
    .sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="flex flex-col">
      <TopHeader title="比赛赛程" />
      <div className="p-4 space-y-4">
        {scheduledMatches.length > 0 ? (
            scheduledMatches.map(match => (
                <MatchCard key={match.id} match={match} />
            ))
        ) : (
            <p className="text-center text-muted-foreground mt-8">暂无即将开始的比赛。</p>
        )}
      </div>
    </div>
  );
}
