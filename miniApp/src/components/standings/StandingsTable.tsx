import { View, Text, Image } from '@tarojs/components';
import { type Standing } from '@/lib/types';
import './StandingsTable.css';

export function StandingsTable({ standings }: { standings: Standing[] }) {
  return (
    <View className="standings-card">
      <View className="standings-table">
        <View className="table-header">
          <Text className="table-head rank-col">#</Text>
          <Text className="table-head team-col">球队</Text>
          <Text className="table-head played-col">赛</Text>
          <Text className="table-head wdl-col">胜/平/负</Text>
          <Text className="table-head gd-col">净胜球</Text>
          <Text className="table-head pts-col">积分</Text>
        </View>
        <View className="table-body">
          {standings.map((s, index) => (
            <View key={s.team.id} className={`table-row ${index < 3 ? 'highlight-row' : ''}`}>
              <Text className="table-cell rank-col">{s.rank}</Text>
              <View className="table-cell team-col">
                <View className="team-cell-content">
                  <Image src={s.team.logoUrl} className="team-logo" />
                  <Text className="team-name">{s.team.name}</Text>
                </View>
              </View>
              <Text className="table-cell played-col">{s.played}</Text>
              <Text className="table-cell wdl-col">{`${s.win}/${s.draw}/${s.loss}`}</Text>
              <Text className="table-cell gd-col">{s.goalDifference}</Text>
              <Text className="table-cell pts-col pts-value">{s.points}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
