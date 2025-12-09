'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getAvailableEditions } from '@/lib/data';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronsUpDown } from 'lucide-react';

export function EditionSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentEditionId = searchParams.get('edition') || '7';

  const [editions, setEditions] = useState<{ id: string; name: string }[]>([]);
  const [currentEditionName, setCurrentEditionName] = useState('');

  useEffect(() => {
    getAvailableEditions().then(availableEditions => {
        setEditions(availableEditions);
        const current = availableEditions.find(e => e.id === currentEditionId);
        setCurrentEditionName(current?.name || '');
    });
  }, [currentEditionId]);

  const handleValueChange = (newEditionId: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('edition', newEditionId);
    router.push(`${pathname}?${params.toString()}`);
  };

  if (editions.length < 2) {
    return null;
  }

  return (
    <Select value={currentEditionId} onValueChange={handleValueChange}>
      <SelectTrigger className="w-auto h-8 text-xs gap-1 border-0 bg-transparent focus:ring-0 focus:ring-offset-0">
        <SelectValue placeholder="选择赛事">
         {currentEditionName}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {editions.map(edition => (
          <SelectItem key={edition.id} value={edition.id}>
            {edition.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
