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
  
  const params: {id: string, edition: string}[] = [];

  for (const edition of allEditions) {
    const matches = await getMatches(edition.id);
    matches.forEach(match => {
        params.push({ id: match.id, edition: edition.id });
    });
  }
 
  // Also generate for default (no edition param)
  const defaultMatches = await getMatches();
   defaultMatches.forEach(match => {
        params.push({ id: match.id, edition: undefined as any });
    });


  return params;
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
