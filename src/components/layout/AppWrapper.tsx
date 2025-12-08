'use client';
import { BottomNav } from '@/components/layout/BottomNav';

export function AppWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-neutral-800 dark:bg-black min-h-screen flex justify-center items-center p-0 md:p-8">
      <div className="relative w-full max-w-md h-screen md:max-h-[800px] md:h-[calc(100vh-4rem)] md:rounded-2xl overflow-hidden shadow-2xl bg-background flex flex-col">
        <main className="flex-1 overflow-y-auto pb-20">
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
