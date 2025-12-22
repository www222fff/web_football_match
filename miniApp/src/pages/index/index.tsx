import { useEffect, useState } from 'react';
import { View, Text, Button, Navigator } from '@tarojs/components';
import { getMatches, getAvailableEditions } from '@/lib/data';
import { type EnrichedMatch } from '@/lib/types';
import { MatchCard } from '@/components/matches/MatchCard';
import { TopHeader } from '@/components/TopHeader';
import Taro from '@tarojs/taro';
import './index.css';

export default function Home() {
  const [editionId, setEditionId] = useState('7');
  const [allMatches, setAllMatches] = useState<EnrichedMatch[]>([]);
  const [upcomingMatches, setUpcomingMatches] = useState<EnrichedMatch[]>([]);
  const [latestResults, setLatestResults] = useState<EnrichedMatch[]>([]);
  const [editions, setEditions] = useState<{ id: string; name: string }[]>([]);
  
  useEffect(() => {
    Taro.showLoading({ title: '加载中...' });
    getAvailableEditions().then(setEditions);
    getMatches(editionId).then(matches => {
      setAllMatches(matches);
      setUpcomingMatches(matches.filter(m => m.status === 'scheduled').sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
      setLatestResults(matches.filter(m => m.status === 'finished').sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      Taro.hideLoading();
    });
  }, [editionId]);

  const nextMatch = upcomingMatches[0];
  const lastResult = latestResults[0];

  const handleEditionChange = (e) => {
    const selectedIndex = e.detail.value;
    setEditionId(editions[selectedIndex].id);
  }
  
  const currentEditionName = editions.find(e => e.id === editionId)?.name || '';

  return (
    <View className='page-container'>
      <TopHeader title='首页' />

      <View className='p-4 space-y-6'>
        <View className="edition-switcher-container">
            <Picker mode='selector' range={editions.map(e => e.name)} onChange={handleEditionChange}>
                <View className='picker'>
                    <Text>{currentEditionName || '选择赛事'}</Text>
                    <Text>▼</Text>
                </View>
            </Picker>
        </View>

        <View>
          <View className='section-header'>
            <Text className='section-title'>即将开始</Text>
            <Navigator url='/pages/schedule/index' className='section-link'>
              查看全部 &gt;
            </Navigator>
          </View>
          {nextMatch ? (
            <MatchCard match={nextMatch} edition={editionId} />
          ) : (
            <View className='empty-card'><Text>暂无即将开始的比赛</Text></View>
          )}
        </View>
        
        <View>
          <View className='section-header'>
            <Text className='section-title'>最新赛果</Text>
            <Navigator url='/pages/results/index' className='section-link'>
              查看全部 &gt;
            </Navigator>
          </View>
          {lastResult ? (
            <MatchCard match={lastResult} edition={editionId} />
          ) : (
            <View className='empty-card'><Text>暂无最新赛果</Text></View>
          )}
        </View>

        <View className='info-card'>
            <View className='info-card-header'>
                <Text>ℹ️</Text>
                <Text className='section-title'>赛事信息</Text>
            </View>
            <View className='info-card-content'>
                <View className='accordion-item'>
                    <Text className='accordion-trigger'>赛事介绍</Text>
                    <Text className='accordion-content'>欢迎来到第七届全国高校青岛校友足球赛！本赛事旨在通过足球这项充满激情与活力的运动，联络校友情谊，促进各高校校友之间的交流与合作。我们倡导“友谊第一，比赛第二”的体育精神，希望大家在绿茵场上尽情挥洒汗水，享受足球带来的快乐。</Text>
                </View>
                 <View className='accordion-item'>
                    <Text className='accordion-trigger'>赛事须知</Text>
                    <View className='accordion-content'>
                        <Text>• 所有参赛队员必须为各高校正式校友，并已完成赛事注册。</Text>
                        <Text>• 请各球队提前30分钟到达比赛场地进行热身和检录。</Text>
                        <Text>• 比赛期间，请尊重裁判判罚，服从组委会统一安排。</Text>
                        <Text>• 注意人身及财产安全，比赛中请注意自我保护，避免受伤。</Text>
                        <Text>• 保持场地卫生，请勿乱扔垃圾。文明观赛，为所有球队加油。</Text>
                    </View>
                </View>
                <View className='accordion-item'>
                    <Text className='accordion-trigger'>赛事规则</Text>
                    <View className='accordion-content'>
                        <Text>• 比赛采用8人制足球规则，上下半场各40分钟。</Text>
                        <Text>• 小组赛阶段，胜一场积3分，平一场积1分，负一场积0分。</Text>
                        <Text>• 红黄牌规则：累计两张黄牌停赛一场，直接红牌停赛一场。</Text>
                        <Text>• 换人名额：每场比赛每队可替换5名球员。</Text>
                        <Text>• 若对比赛结果有异议，请在赛后2小时内由领队向组委会提出书面申诉。</Text>
                    </View>
                </View>
            </View>
        </View>
      </View>
    </View>
  );
}
