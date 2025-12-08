import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { type EnrichedMatch } from '@/lib/types';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function MatchCard({ match }: { match: EnrichedMatch }) {
  const { team1, team2, date, time, venue, status, score } = match;

  const formatDate = new Date(date).toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' });

  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 w-1/3">
            <Image data-ai-hint="team logo" src={team1.logoUrl} alt={team1.name} width={40} height={40} className="rounded-full bg-muted" />
            <span className="font-bold text-base hidden sm:inline">{team1.name}</span>
          </div>
          <div className="text-center">
            {status === 'scheduled' ? (
              <div className="text-muted-foreground font-bold text-lg">{time}</div>
            ) : (
              <div className="text-3xl font-bold">
                <span>{score?.team1}</span>
                <span className="mx-2 text-muted-foreground">-</span>
                <span>{score?.team2}</span>
              </div>
            )}
            {status === 'live' && <Badge variant="destructive" className="mt-1 animate-pulse bg-accent text-accent-foreground">进行中</Badge>}
            {status === 'finished' && <Badge variant="secondary" className="mt-1">已结束</Badge>}
          </div>
          <div className="flex items-center gap-3 w-1/3 justify-end">
            <span className="font-bold text-base hidden sm:inline text-right">{team2.name}</span>
            <Image data-ai-hint="team logo" src={team2.logoUrl} alt={team2.name} width={40} height={40} className="rounded-full bg-muted" />
          </div>
        </div>

        <div className="flex justify-center items-center mt-2 sm:hidden">
          <span className="font-bold text-sm">{team1.name}</span>
          <span className="mx-4 text-muted-foreground">vs</span>
          <span className="font-bold text-sm">{team2.name}</span>
        </div>
        
        <div className="text-center text-sm text-muted-foreground mt-3 pt-3 border-t">
          <div className="flex justify-center items-center gap-x-4 gap-y-1 flex-wrap">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>{formatDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              <span>{venue}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
