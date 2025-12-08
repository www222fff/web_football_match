'use server';

import { comparePlayerStats } from '@/ai/flows/compare-player-stats';
import { type PlayerStats } from '@/lib/types';

// A helper function to translate stat keys to Chinese for better AI understanding.
const translateStatKey = (key: string): string => {
    switch (key) {
        case 'goals': return '进球数';
        case 'assists': return '助攻数';
        case 'gamesPlayed': return '出场次数';
        case 'yellowCards': return '黄牌数';
        case 'redCards': return '红牌数';
        case 'shotsPerGame': return '场均射门';
        case 'passSuccessRate': return '传球成功率(%)';
        default: return key;
    }
}

export async function playerComparisonAction(player1Stats: PlayerStats, player2Stats: PlayerStats) {
  try {
    // Convert stats objects to a readable string format for the AI.
    const formatStats = (stats: PlayerStats) => {
      return Object.entries(stats)
        .map(([key, value]) => `${translateStatKey(key)}: ${value}`)
        .join('; ');
    };

    const player1StatsString = formatStats(player1Stats);
    const player2StatsString = formatStats(player2Stats);

    const result = await comparePlayerStats({
      player1Stats: player1StatsString,
      player2Stats: player2StatsString,
    });
    
    return result;
  } catch (error) {
    console.error("AI comparison failed:", error);
    return { comparison: "抱歉，AI 分析时出现错误。请稍后再试。" };
  }
}
