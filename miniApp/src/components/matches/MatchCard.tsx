import { View, Text, Image, Navigator } from '@tarojs/components';
import { type EnrichedMatch } from '@/lib/types';
import './MatchCard.css';

export function MatchCard({ match, edition }: { match: EnrichedMatch; edition: string }) {
  const { team1, team2, date, time, venue, status, score, id } = match;

  const href = `/pages/match/index?id=${id}&edition=${edition}`;

  const formatDate = new Date(date).toLocaleDateString('zh-CN', {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  return (
    <Navigator url={href} className="match-card-navigator">
      <View className="match-card">
        <View className="card-content">
          <View className="teams-row">
            <View className="team-info">
              <Image src={team1.logoUrl} className="team-logo" />
              <Text className="team-name large-screen">{team1.name}</Text>
            </View>
            <View className="score-or-time">
              {status === 'scheduled' ? (
                <Text className="time-text">{time.split('-')[0]}</Text>
              ) : (
                <View className="score-display">
                  <Text>{score?.team1}</Text>
                  <Text className="score-separator">-</Text>
                  <Text>{score?.team2}</Text>
                </View>
              )}
              {status === 'live' && <View className="badge live-badge"><Text>进行中</Text></View>}
              {status === 'finished' && <View className="badge finished-badge"><Text>已结束</Text></View>}
            </View>
            <View className="team-info justify-end">
              <Text className="team-name large-screen text-right">{team2.name}</Text>
              <Image src={team2.logoUrl} className="team-logo" />
            </View>
          </View>

          <View className="teams-row-small">
            <Text className="team-name-small">{team1.name}</Text>
            <Text className="vs-text">vs</Text>
            <Text className="team-name-small">{team2.name}</Text>
          </View>

          <View className="match-details">
            <View className="details-inner">
              <View className="detail-item">
                <Text>🗓️</Text>
                <Text>{formatDate}</Text>
              </View>
              <View className="detail-item">
                <Text>📍</Text>
                <Text>{venue}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Navigator>
  );
}
