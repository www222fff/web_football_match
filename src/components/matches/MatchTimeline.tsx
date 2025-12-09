'use client';
import { type EnrichedMatch, type Team, type EnrichedMatchEvent } from "@/lib/types";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { SoccerBall } from "lucide-react";

function EventIcon({type}: {type: EnrichedMatchEvent['type']}) {
    switch (type) {
        case 'goal':
            return <SoccerBall className="h-4 w-4 text-foreground" />;
        case 'yellow-card':
            return <div className="h-4 w-4 bg-yellow-400 rounded-sm border border-black/20" />;
        case 'red-card':
            return <div className="h-4 w-4 bg-red-600 rounded-sm border border-black/20" />;
        default:
            return null;
    }
}

function EventCard({ event, team, isHome }: { event: EnrichedMatchEvent; team: Team; isHome: boolean }) {
    return (
        <div className={cn(
            "flex items-center gap-3 w-full",
            isHome ? 'flex-row' : 'flex-row-reverse'
        )}>
             <div className="flex items-center gap-2">
                <span className="font-bold">{event.minute}&apos;</span>
            </div>
            <div className={cn(
                "flex-1 p-2 rounded-lg bg-card border flex items-center gap-2",
                isHome ? 'flex-row' : 'flex-row-reverse'
            )}>
                <Image src={team.logoUrl} alt={team.name} width={24} height={24} className="rounded-full bg-muted" />
                <span className="text-sm font-medium flex-1">{event.playerName}</span>
            </div>
        </div>
    );
}

export function MatchTimeline({ match }: { match: EnrichedMatch }) {

    if (!match.events || match.events.length === 0) {
        return <p className="text-muted-foreground text-center py-8">本场比赛暂无关键事件记录。</p>;
    }

    const sortedEvents = [...match.events].sort((a, b) => a.minute - b.minute);

    return (
        <div className="relative pt-8 pb-8">
            <div className="flex flex-col items-center w-full space-y-4">
                {/* Center Line */}
                <div className="absolute top-8 bottom-8 w-[2px] bg-border left-1/2 -translate-x-1/2"></div>
                
                {sortedEvents.map((event, index) => (
                    <div key={index} className="relative z-10 w-full flex justify-center items-center">
                        <div className="w-[calc(50%-2.5rem)] px-2">
                            {event.teamId === match.team1.id && (
                                <EventCard event={event} team={match.team1} isHome={true} />
                            )}
                        </div>
                        <div className="absolute left-1/2 -translate-x-1/2 bg-background p-1.5 rounded-full border-2 border-border">
                        <EventIcon type={event.type}/>
                        </div>
                        <div className="w-[calc(50%-2.5rem)] px-2">
                            {event.teamId === match.team2.id && (
                            <EventCard event={event} team={match.team2} isHome={false} />
                            )}
                        </div>
                    </div>
                ))}
                <div className="absolute top-0 w-8 h-8 left-1/2 -translate-x-1/2 rounded-full border-2 border-border bg-background flex items-center justify-center font-bold text-xs">
                    <span>0'</span>
                </div>
                <div className="absolute bottom-0 w-8 h-8 left-1/2 -translate-x-1/2 rounded-full border-2 border-border bg-background flex items-center justify-center font-bold text-xs">
                    <span>90'</span>
                </div>
            </div>
        </div>
    );
}
