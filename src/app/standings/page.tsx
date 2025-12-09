import { StandingsTable } from "@/components/standings/StandingsTable";
import { TopHeader } from "@/components/layout/TopHeader";
import { getStandings, getAvailableEditions } from "@/lib/data";

export async function generateStaticParams() {
  const editions = await getAvailableEditions();
  const params = editions.map(e => ({ edition: e.id }));
  params.push({ edition: undefined! }); // For the default route without query params
  return params;
}

export default async function StandingsPage({ searchParams }: { searchParams: { edition?: string } }) {
  const editionId = searchParams.edition;
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
