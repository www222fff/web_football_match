import { useEffect, useState } from 'react';
import { View, Text } from '@tarojs/components';
import { getMatches } from '@/lib/data';
import { type EnrichedMatch } from '@/lib/types';
import { MatchCard } from '@/components/matches/MatchCard';
import { TopHeader } from '@/components/TopHeader';
import Taro, { useRouter } from '@tarojs/taro';
import './index.css';

export default function ResultsPage() {
  const router = useRouter();
  const editionId = router.params.edition || '7';
  const [finishedMatches, setFinishedMatches] = useState<EnrichedMatch[]>([]);

  useEffect(() => {
    Taro.showLoading({ title: '加载中...' });
    getMatches(editionId).then(allMatches => {
      const filtered = allMatches
        .filter(m => m.status === 'finished')
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setFinishedMatches(filtered);
      Taro.hideLoading();
    });
  }, [editionId]);

  return (
    <View className="page-container">
      <TopHeader title="比赛结果" />
      <View className="p-4 space-y-4">
        {finishedMatches.length > 0 ? (
          finishedMatches.map(match => (
            <MatchCard key={match.id} match={match} edition={editionId} />
          ))
        ) : (
          <Text className="empty-text">暂无已结束的比赛。</Text>
        )}
      </View>
    </View>
  );
}
