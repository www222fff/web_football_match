'use server';

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
    // This is a placeholder since the AI backend has been removed.
    console.log("Comparing players:", player1Stats, player2Stats);
    
    const formatStats = (stats: PlayerStats) => {
        return Object.entries(stats)
          .map(([key, value]) => `${translateStatKey(key)}: ${value}`)
          .join('; ');
      };
  
    const player1StatsString = formatStats(player1Stats);
    const player2StatsString = formatStats(player2Stats);
    
    const comparison = `球员1数据: ${player1StatsString}\n球员2数据: ${player2StatsString}\n\nAI对比功能已禁用。`;

    return Promise.resolve({ comparison });
}
