import { StandingsTable } from "@/components/standings/StandingsTable";
import { TopHeader } from "@/components/layout/TopHeader";
import { getStandings, getAvailableEditions } from "@/lib/data";

export async function generateStaticParams() {
  const editions = await getAvailableEditions();
  return editions.map((edition) => ({
    edition: edition.id,
  }));
}

export default async function StandingsPage({ params }: { params: { edition: string } }) {
  const editionId = params.edition;
  const standings = await getStandings(editionId);

  return (
    <div className="flex flex-col">
      <TopHeader title="积分榜" />
      <div className="p-2 sm:p-4">
        <StandingsTable standings={standings} />
      </div>
    </div>
  );
}
