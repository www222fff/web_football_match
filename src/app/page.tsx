import { MatchCard } from "@/components/matches/MatchCard";
import { TopHeader } from "@/components/layout/TopHeader";
import { getMatches } from "@/lib/data";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { type EnrichedMatch } from "@/lib/types";

export default async function Home() {
  const allMatches: EnrichedMatch[] = await getMatches();
  const upcomingMatches = allMatches.filter(m => m.status === 'scheduled').sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const latestResults = allMatches.filter(m => m.status === 'finished').sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const nextMatch = upcomingMatches[0];
  const lastResult = latestResults[0];

  return (
    <div className="flex flex-col">
      <TopHeader title="首页" />
      <div className="p-4 space-y-6">
        {nextMatch && (
          <section>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold font-headline">即将开始</h2>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/schedule">
                  查看全部 <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <MatchCard match={nextMatch} />
          </section>
        )}
        
        {lastResult && (
          <section>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold font-headline">最新赛果</h2>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/results">
                  查看全部 <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <MatchCard match={lastResult} />
          </section>
        )}
      </div>
    </div>
  );
}
