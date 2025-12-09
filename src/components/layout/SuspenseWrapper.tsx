'use client';

import { Suspense } from 'react';
import { useParams, usePathname } from 'next/navigation';

function Wrapper({ children }: { children: React.ReactNode }) {
  // These hooks trigger the Suspense fallback on navigation
  useParams();
  usePathname();
  return <>{children}</>;
}

export function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <Wrapper>{children}</Wrapper>
    </Suspense>
  );
}
