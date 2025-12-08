import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type Standing } from "@/lib/types";
import { Card } from '../ui/card';

export function StandingsTable({ standings }: { standings: Standing[] }) {
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12 text-center px-2">#</TableHead>
            <TableHead>球队</TableHead>
            <TableHead className="text-center px-2">赛</TableHead>
            <TableHead className="text-center px-2 hidden sm:table-cell">胜/平/负</TableHead>
            <TableHead className="text-center px-2 hidden sm:table-cell">净胜球</TableHead>
            <TableHead className="text-center px-2">积分</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {standings.map((s, index) => (
            <TableRow key={s.team.id} className={index < 3 ? 'bg-primary/5 dark:bg-primary/10' : ''}>
              <TableCell className="font-medium text-center px-2">{s.rank}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Image data-ai-hint="team logo" src={s.team.logoUrl} alt={s.team.name} width={24} height={24} className="rounded-full bg-muted" />
                  <span className="font-medium">{s.team.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-center px-2">{s.played}</TableCell>
              <TableCell className="text-center px-2 hidden sm:table-cell">{`${s.win}/${s.draw}/${s.loss}`}</TableCell>
              <TableCell className="text-center px-2 hidden sm:table-cell">{s.goalDifference}</TableCell>
              <TableCell className="font-bold text-center px-2">{s.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
