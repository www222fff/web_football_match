'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter, useParams } from 'next/navigation';
import { getAvailableEditions } from '@/lib/data';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from '../ui/skeleton';

export function EditionSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  
  const currentEditionId = (params.edition as string) || '7';

  const [editions, setEditions] = useState<{ id: string; name: string }[]>([]);
  const [currentEditionName, setCurrentEditionName] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    getAvailableEditions().then(availableEditions => {
        setEditions(availableEditions);
        const current = availableEditions.find(e => e.id === currentEditionId);
        setCurrentEditionName(current?.name || '');
    });
  }, [currentEditionId]);

  const handleValueChange = (newEditionId: string) => {
    // We need to figure out the base path to redirect to.
    // e.g. if we are on /edition/6/schedule, we want to go to /edition/7/schedule
    let basePath = pathname.split('/').slice(3).join('/');
    if (basePath === '') {
        // This is the root page for an edition
        router.push(`/edition/${newEditionId}`);
    } else if (newEditionId === '7') { // If switching to latest, go to root path
        router.push(`/${basePath}`);
    } else {
        router.push(`/edition/${newEditionId}/${basePath}`);
    }
  };

  if (!isMounted) {
    return <Skeleton className="w-28 h-8" />;
  }

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
