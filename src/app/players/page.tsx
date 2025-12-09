import { TopHeader } from "@/components/layout/TopHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlayerList } from "./PlayerList";
import { PlayerComparison } from "@/components/players/PlayerComparison";
import { getPlayers, getAvailableEditions } from "@/lib/data";

export async function generateStaticParams() {
  const editions = await getAvailableEditions();
  const params = editions.map(e => ({ edition: e.id }));
  // Add an entry for the default path with no search params
  return [{}, ...params];
}

export default async function PlayersPage({ searchParams }: { searchParams: { edition?: string } }) {
  const editionId = searchParams.edition;
  const allPlayers = await getPlayers(editionId);

  return (
    <div className="flex flex-col h-full">
      <TopHeader title="球员中心" />
      <Tabs defaultValue="list" className="flex-1 flex flex-col">
        <div className="px-4 pt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="list">球员列表</TabsTrigger>
            <TabsTrigger value="compare">AI 对比</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="list" className="flex-1 overflow-y-auto p-4 focus-visible:ring-0">
          <PlayerList players={allPlayers} />
        </TabsContent>
        <TabsContent value="compare" className="flex-1 overflow-y-auto p-4 focus-visible:ring-0">
          <PlayerComparison players={allPlayers} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
