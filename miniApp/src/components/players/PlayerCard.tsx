import { View, Text, Image } from '@tarojs/components';
import { type Player } from '@/lib/types';
import './PlayerCard.css';

export function PlayerCard({ player }: { player: Player }) {
  return (
    <View className="player-card">
      <View className="player-card-header">
        <Image src={player.imageUrl} className="player-image" />
        <View>
          <Text className="player-name">{player.name}</Text>
          <Text className="player-details">#{player.number} • {player.position}</Text>
        </View>
      </View>
      <View className="player-card-content">
        <View className="stats-grid">
          <View className="stat-item">
            <Text className="stat-value">{player.stats.gamesPlayed}</Text>
            <Text className="stat-label">出场</Text>
          </View>
          <View className="stat-item">
            <Text className="stat-value">{player.stats.goals}</Text>
            <Text className="stat-label">进球</Text>
          </View>
          <View className="stat-item">
            <Text className="stat-value">{player.stats.assists}</Text>
            <Text className="stat-label">助攻</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
