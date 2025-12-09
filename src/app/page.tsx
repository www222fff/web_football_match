import { MatchCard } from "@/components/matches/MatchCard";
import { TopHeader } from "@/components/layout/TopHeader";
import { getMatches, getAvailableEditions } from "@/lib/data";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Info } from 'lucide-react';
import { type EnrichedMatch } from "@/lib/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export async function generateStaticParams() {
  const editions = await getAvailableEditions();
  const params = editions.map((edition) => ({
    edition: edition.id,
  }));
  // Add an empty object for the default route without search params
  return [...params, {}];
}


export default async function Home({ searchParams }: { searchParams: { edition?: string } }) {
  const editionId = searchParams.edition;
  const allMatches: EnrichedMatch[] = await getMatches(editionId);
  const upcomingMatches = allMatches.filter(m => m.status === 'scheduled').sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const latestResults = allMatches.filter(m => m.status === 'finished').sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const nextMatch = upcomingMatches[0];
  const lastResult = latestResults[0];

  const editionParams = editionId ? `?edition=${editionId}` : '';

  return (
    <div className="flex flex-col">
      <TopHeader title="首页" />
      <div className="p-4 space-y-6">
        <section>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold font-headline">即将开始</h2>
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/schedule${editionParams}`}>
                  查看全部 <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            {nextMatch ? (
                <MatchCard match={nextMatch} edition={editionId} />
            ) : (
                <Card className="flex items-center justify-center h-24">
                    <p className="text-muted-foreground">暂无即将开始的比赛</p>
                </Card>
            )}
        </section>
        
        <section>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold font-headline">最新赛果</h2>
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/results${editionParams}`}>
                  查看全部 <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            {lastResult ? (
                <MatchCard match={lastResult} edition={editionId} />
            ) : (
                <Card className="flex items-center justify-center h-24">
                    <p className="text-muted-foreground">暂无最新赛果</p>
                </Card>
            )}
        </section>

        <section>
           <Card>
            <CardHeader className="flex-row items-center gap-2 space-y-0">
                <Info className="h-5 w-5 text-primary"/>
                <CardTitle className="text-xl font-bold font-headline">赛事信息</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 px-2 sm:px-4">
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="px-4">赛事介绍</AccordionTrigger>
                        <AccordionContent className="px-4 text-muted-foreground">
                        欢迎来到第七届全国高校青岛校友足球赛！本赛事旨在通过足球这项充满激情与活力的运动，联络校友情谊，促进各高校校友之间的交流与合作。我们倡导“友谊第一，比赛第二”的体育精神，希望大家在绿茵场上尽情挥洒汗水，享受足球带来的快乐。
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className="px-4">赛事须知</AccordionTrigger>
                        <AccordionContent className="px-4 text-muted-foreground">
                        <ul className="list-disc pl-5 space-y-2">
                            <li>所有参赛队员必须为各高校正式校友，并已完成赛事注册。</li>
                            <li>请各球队提前30分钟到达比赛场地进行热身和检录。</li>
                            <li>比赛期间，请尊重裁判判罚，服从组委会统一安排。</li>
                            <li>注意人身及财产安全，比赛中请注意自我保护，避免受伤。</li>
                            <li>保持场地卫生，请勿乱扔垃圾。文明观赛，为所有球队加油。</li>
                        </ul>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3" className="border-b-0">
                        <AccordionTrigger className="px-4">赛事规则</AccordionTrigger>
                        <AccordionContent className="px-4 text-muted-foreground">
                        <ul className="list-disc pl-5 space-y-2">
                            <li>比赛采用8人制足球规则，上下半场各40分钟。</li>
                            <li>小组赛阶段，胜一场积3分，平一场积1分，负一场积0分。</li>
                            <li>红黄牌规则：累计两张黄牌停赛一场，直接红牌停赛一场。</li>
                            <li>换人名额：每场比赛每队可替换5名球员。</li>
                            <li>若对比赛结果有异议，请在赛后2小时内由领队向组委会提出书面申诉。</li>
                        </ul>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
           </Card>
        </section>
      </div>
    </div>
  );
}
