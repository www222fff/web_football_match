import { useEffect, useState } from 'react';
import { View, Input, Text } from '@tarojs/components';
import { getPlayers } from '@/lib/data';
import { type Player } from '@/lib/types';
import { PlayerCard } from '@/components/players/PlayerCard';
import { TopHeader } from '@/components/TopHeader';
import Taro, { useRouter } from '@tarojs/taro';
import './index.css';

function PlayerList({ players }: { players: Player[] }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View className="player-list-container">
      <View className="search-bar-container">
        <Input
          placeholder="搜索球员姓名或位置..."
          className="search-input"
          value={searchTerm}
          onInput={(e) => setSearchTerm(e.detail.value)}
        />
      </View>
      <View className="player-grid">
        {filteredPlayers.length > 0 ? (
            filteredPlayers.map(player => (
                <PlayerCard key={player.id} player={player} />
            ))
        ) : (
            <Text className="empty-text">未找到匹配的球员。</Text>
        )}
      </View>
    </View>
  );
}


export default function PlayersPage() {
  const router = useRouter();
  const editionId = router.params.edition || '7';
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    Taro.showLoading({ title: '加载中...' });
    getPlayers(editionId).then(data => {
      setPlayers(data);
      Taro.hideLoading();
    });
  }, [editionId]);

  return (
    <View className="page-container">
      <TopHeader title="球员中心" />
      <PlayerList players={players} />
    </View>
  );
}
