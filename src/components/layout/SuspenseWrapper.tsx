'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function Wrapper({ children }: { children: React.ReactNode }) {
  // This is a dummy hook to trigger the Suspense fallback
  useSearchParams();
  return <>{children}</>;
}

export function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <Wrapper>{children}</Wrapper>
    </Suspense>
  );
}
