import { getMatch, getMatches, getAvailableEditions } from "@/lib/data";
import { TopHeader } from "@/components/layout/TopHeader";
import { MatchCard } from "@/components/matches/MatchCard";
import { MatchTimeline } from "@/components/matches/MatchTimeline";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Suspense } from "react";

export async function generateStaticParams() {
  const allEditions = await getAvailableEditions();
  const allParams = new Set<string>();

  // Helper function to process matches for an edition
  const processMatches = async (editionId?: string) => {
    const matches = await getMatches(editionId);
    matches.forEach(match => {
      const param = JSON.stringify({
        id: match.id,
        edition: editionId || null
      });
      allParams.add(param);
    });
  };

  // Process for default edition
  await processMatches(undefined);

  // Process for all available editions
  for (const edition of allEditions) {
    await processMatches(edition.id);
  }

  // Next.js expects an object with the dynamic param name, not the searchParam.
  // The searchParam part is handled by Next.js when it renders pages based on links.
  // We just need to make sure all possible `id`s are generated.
  const allMatchIds = new Set<string>();
  const matches_default = await getMatches();
  matches_default.forEach(m => allMatchIds.add(m.id));
  for (const edition of allEditions) {
      const matches_edition = await getMatches(edition.id);
      matches_edition.forEach(m => allMatchIds.add(m.id));
  }

  return Array.from(allMatchIds).map(id => ({ id: id }));
}


export default async function MatchPage({ params, searchParams }: { params: { id: string }, searchParams: { edition?: string } }) {
  const editionId = searchParams.edition;
  const match = await getMatch(params.id, editionId);

  if (!match) {
    return (
      <div className="flex flex-col">
        <TopHeader title="比赛详情" />
        <div className="p-4">
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>错误</AlertTitle>
                <AlertDescription>未找到比赛信息。</AlertDescription>
            </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <TopHeader title="比赛详情" />
      <div className="p-4 space-y-6">
        <Suspense fallback={<Card className="h-48 animate-pulse"></Card>}>
          <MatchCard match={match} />
        </Suspense>
        
        <Card>
            <CardHeader>
                <CardTitle>比赛事件</CardTitle>
            </CardHeader>
            <CardContent>
                <MatchTimeline match={match} />
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
