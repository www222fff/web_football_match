import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type Player } from '@/lib/types';

export function PlayerCard({ player }: { player: Player }) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center gap-4">
        <Image data-ai-hint="player portrait" src={player.imageUrl} alt={player.name} width={56} height={56} className="rounded-full border-2 border-primary bg-muted" />
        <div>
          <CardTitle className="text-lg">{player.name}</CardTitle>
          <p className="text-sm text-muted-foreground">#{player.number} • {player.position}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2 text-center text-sm">
          <div>
            <p className="font-bold text-lg">{player.stats.gamesPlayed}</p>
            <p className="text-xs text-muted-foreground">出场</p>
          </div>
          <div>
            <p className="font-bold text-lg">{player.stats.goals}</p>
            <p className="text-xs text-muted-foreground">进球</p>
          </div>
          <div>
            <p className="font-bold text-lg">{player.stats.assists}</p>
            <p className="text-xs text-muted-foreground">助攻</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
