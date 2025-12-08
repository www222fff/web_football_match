'use client'
import { useState } from 'react';
import { PlayerCard } from '@/components/players/PlayerCard';
import { Input } from '@/components/ui/input';
import { type Player } from '@/lib/types';
import { Search } from 'lucide-react';

export function PlayerList({ players }: { players: Player[] }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="搜索球员姓名或位置..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 gap-4">
        {filteredPlayers.length > 0 ? (
            filteredPlayers.map(player => (
                <PlayerCard key={player.id} player={player} />
            ))
        ) : (
            <p className="text-center text-muted-foreground mt-8">未找到匹配的球员。</p>
        )}
      </div>
    </div>
  );
}
