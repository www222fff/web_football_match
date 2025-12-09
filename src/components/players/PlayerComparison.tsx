'use client';

import { useState, useTransition } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Loader2, Zap, BrainCircuit } from 'lucide-react';
import { type Player } from '@/lib/types';
import { playerComparisonAction } from '@/app/players/actions';
import Image from 'next/image';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

export function PlayerComparison({ players }: { players: Player[] }) {
  const [player1Id, setPlayer1Id] = useState<string | undefined>();
  const [player2Id, setPlayer2Id] = useState<string | undefined>();
  const [comparisonResult, setComparisonResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleCompare = () => {
    if (!player1Id || !player2Id) return;
    
    const player1 = players.find(p => p.id === player1Id);
    const player2 = players.find(p => p.id === player2Id);

    if (!player1 || !player2) return;

    startTransition(async () => {
      setComparisonResult(null);
      setError("AI 对比功能当前不可用。");
    });
  };
  
  const selectedPlayer1 = players.find(p => p.id === player1Id);
  const selectedPlayer2 = players.find(p => p.id === player2Id);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI 球员对比</CardTitle>
          <CardDescription>选择两名球员，使用 AI 进行技术统计对比分析。</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select onValueChange={setPlayer1Id} value={player1Id}>
              <SelectTrigger>
                <SelectValue placeholder="选择球员 1" />
              </SelectTrigger>
              <SelectContent>
                {players.map(player => (
                  <SelectItem key={player.id} value={player.id} disabled={player.id === player2Id}>
                    {player.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={setPlayer2Id} value={player2Id}>
              <SelectTrigger>
                <SelectValue placeholder="选择球员 2" />
              </SelectTrigger>
              <SelectContent>
                {players.map(player => (
                  <SelectItem key={player.id} value={player.id} disabled={player.id === player1Id}>
                    {player.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleCompare} disabled={!player1Id || !player2Id || player1Id === player2Id} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <BrainCircuit className="mr-2 h-4 w-4" />}
            开始对比
          </Button>
        </CardContent>
      </Card>
      
      {isPending && (
         <Card className="flex flex-col items-center justify-center p-8 space-y-2 border-dashed">
            <Loader2 className="h-8 w-8 animate-spin text-primary"/>
            <p className="text-muted-foreground">AI 正在分析中...</p>
         </Card>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertTitle>功能不可用</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {comparisonResult && (
        <Card className="animate-in fade-in-50">
          <CardHeader className="flex-row items-center justify-center gap-4 sm:gap-8 space-y-0 text-center">
             {selectedPlayer1 && <div className="flex flex-col items-center"><Image data-ai-hint="player portrait" src={selectedPlayer1.imageUrl} alt={selectedPlayer1.name} width={60} height={60} className="rounded-full bg-muted"/><p className="font-bold mt-2">{selectedPlayer1.name}</p></div>}
             <p className="text-2xl font-bold text-muted-foreground">VS</p>
             {selectedPlayer2 && <div className="flex flex-col items-center"><Image data-ai-hint="player portrait" src={selectedPlayer2.imageUrl} alt={selectedPlayer2.name} width={60} height={60} className="rounded-full bg-muted"/><p className="font-bold mt-2">{selectedPlayer2.name}</p></div>}
          </CardHeader>
          <CardContent>
            <h3 className="font-bold text-lg mb-2 text-primary">AI 分析结果</h3>
            <div className="text-sm text-foreground space-y-3">
                {comparisonResult.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
