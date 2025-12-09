'use client';
import { BottomNav } from '@/components/layout/BottomNav';
import { SuspenseWrapper } from './SuspenseWrapper';

export function AppWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-neutral-800 dark:bg-black min-h-screen flex justify-center items-center p-0 md:p-4 lg:p-8">
      <div className="relative w-full max-w-xl h-screen md:max-h-[900px] md:h-[calc(100vh-4rem)] md:rounded-2xl overflow-hidden shadow-2xl bg-background flex flex-col">
        <header className="bg-card/80 backdrop-blur-sm p-4 text-center border-b">
          <h1 className="text-xl font-bold font-headline text-foreground">
            全国高校青岛校友足球赛
          </h1>
        </header>
        <main className="flex-1 overflow-y-auto pb-20">
          {children}
        </main>
        <SuspenseWrapper>
            <BottomNav />
        </SuspenseWrapper>
      </div>
    </div>
  );
}
