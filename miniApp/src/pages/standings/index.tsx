import { useEffect, useState } from 'react';
import { View } from '@tarojs/components';
import { getStandings } from '@/lib/data';
import { type Standing } from '@/lib/types';
import { StandingsTable } from '@/components/standings/StandingsTable';
import { TopHeader } from '@/components/TopHeader';
import Taro, { useRouter } from '@tarojs/taro';
import './index.css';

export default function StandingsPage() {
  const router = useRouter();
  const editionId = router.params.edition || '7';
  const [standings, setStandings] = useState<Standing[]>([]);

  useEffect(() => {
    Taro.showLoading({ title: '加载中...' });
    getStandings(editionId).then(data => {
      setStandings(data);
      Taro.hideLoading();
    });
  }, [editionId]);

  return (
    <View className="page-container">
      <TopHeader title="积分榜" />
      <View className="p-2">
        <StandingsTable standings={standings} />
      </View>
    </View>
  );
}
