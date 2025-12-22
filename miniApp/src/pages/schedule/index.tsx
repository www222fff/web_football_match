import { useEffect, useState } from 'react';
import { View, Text } from '@tarojs/components';
import { getMatches } from '@/lib/data';
import { type EnrichedMatch } from '@/lib/types';
import { MatchCard } from '@/components/matches/MatchCard';
import { TopHeader } from '@/components/TopHeader';
import Taro, { useRouter } from '@tarojs/taro';
import './index.css';

export default function SchedulePage() {
  const router = useRouter();
  const editionId = router.params.edition || '7';
  const [scheduledMatches, setScheduledMatches] = useState<EnrichedMatch[]>([]);

  useEffect(() => {
    Taro.showLoading({ title: '加载中...' });
    getMatches(editionId).then(allMatches => {
      const filtered = allMatches
        .filter(m => m.status === 'scheduled' || m.status === 'live')
        .sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      setScheduledMatches(filtered);
      Taro.hideLoading();
    });
  }, [editionId]);

  return (
    <View className="page-container">
      <TopHeader title="比赛赛程" />
      <View className="p-4 space-y-4">
        {scheduledMatches.length > 0 ? (
          scheduledMatches.map(match => (
            <MatchCard key={match.id} match={match} edition={editionId} />
          ))
        ) : (
          <Text className="empty-text">暂无即将开始的比赛。</Text>
        )}
      </View>
    </View>
  );
}
