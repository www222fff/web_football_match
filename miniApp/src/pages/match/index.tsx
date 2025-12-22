import { useEffect, useState } from 'react';
import { View, Text, Image } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import { getMatch } from '@/lib/data';
import { type EnrichedMatch, type EnrichedMatchEvent, type Team } from '@/lib/types';
import { MatchCard } from '@/components/matches/MatchCard';
import { TopHeader } from '@/components/TopHeader';
import './index.css';

function SoccerBallIcon() {
    return (
        <View className="event-icon-container">
            <Text>⚽</Text>
        </View>
    )
}

function CardIcon({ type }: { type: 'yellow' | 'red' }) {
    const style = {
        backgroundColor: type === 'yellow' ? '#FBBF24' : '#DC2626'
    };
    return <View className="card-icon" style={style}></View>
}

function EventIcon({type}: {type: EnrichedMatchEvent['type']}) {
    switch (type) {
        case 'goal':
            return <SoccerBallIcon />;
        case 'yellow-card':
            return <CardIcon type="yellow" />;
        case 'red-card':
            return <CardIcon type="red" />;
        default:
            return null;
    }
}

function EventCard({ event, team, isHome }: { event: EnrichedMatchEvent; team: Team; isHome: boolean }) {
    return (
        <View className={`event-card-container ${isHome ? 'home' : 'away'}`}>
             <View className="event-minute-container">
                <Text className="event-minute">{event.minute}'</Text>
            </View>
            <View className={`event-card-content ${isHome ? 'home' : 'away'}`}>
                <Image src={team.logoUrl} className="event-team-logo" />
                <Text className="event-player-name">{event.playerName}</Text>
            </View>
        </View>
    );
}

export default function MatchPage() {
  const router = useRouter();
  const { id, edition } = router.params;
  const [match, setMatch] = useState<EnrichedMatch | null>(null);

  useEffect(() => {
    if (id && edition) {
      Taro.showLoading({ title: '加载中...' });
      getMatch(id, edition).then(data => {
        setMatch(data || null);
        Taro.hideLoading();
      });
    }
  }, [id, edition]);

  if (!match) {
    return (
      <View>
        <TopHeader title="比赛详情" showBackButton />
        <View className="p-4">
            <View className="alert-destructive">
                <Text>错误: 未找到比赛信息。</Text>
            </View>
        </View>
      </View>
    );
  }

  const sortedEvents = [...(match.events || [])].sort((a, b) => a.minute - b.minute);

  return (
    <View className="page-container">
      <TopHeader title="比赛详情" showBackButton />
      <View className="p-4 space-y-6">
        <MatchCard match={match} edition={edition} />
        
        <View className="timeline-card">
            <View className="timeline-header">
                <Text className="timeline-title">比赛事件</Text>
            </View>
            <View className="timeline-content">
                {sortedEvents.length > 0 ? (
                    <View className="timeline-container">
                        <View className="timeline-line"></View>
                        <View className="timeline-start-end-marker top">
                            <Text>0'</Text>
                        </View>
                        {sortedEvents.map((event, index) => (
                            <View key={index} className="timeline-event-row">
                                <View className="timeline-half">
                                    {event.teamId === match.team1.id && (
                                        <EventCard event={event} team={match.team1} isHome={true} />
                                    )}
                                </View>
                                <View className="timeline-icon-container">
                                    <EventIcon type={event.type}/>
                                </View>
                                <View className="timeline-half">
                                     {event.teamId === match.team2.id && (
                                        <EventCard event={event} team={match.team2} isHome={false} />
                                    )}
                                </View>
                            </View>
                        ))}
                        <View className="timeline-start-end-marker bottom">
                            <Text>90'</Text>
                        </View>
                    </View>
                ) : (
                    <Text className="empty-timeline-text">本场比赛暂无关键事件记录。</Text>
                )}
            </View>
        </View>
      </View>
    </View>
  );
}
