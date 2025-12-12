'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export function BackButton() {
  const router = useRouter();

  return (
    <Button variant="ghost" size="icon" onClick={() => router.back()} className="h-8 w-8">
      <ArrowLeft className="h-5 w-5" />
      <span className="sr-only">返回</span>
    </Button>
  );
}
