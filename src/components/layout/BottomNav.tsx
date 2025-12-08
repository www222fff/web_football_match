'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CalendarDays, Trophy, BarChart3, Users, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: '首页', icon: Home },
  { href: '/schedule', label: '赛程', icon: CalendarDays },
  { href: '/results', label: '赛果', icon: Trophy },
  { href: '/standings', label: '积分榜', icon: BarChart3 },
  { href: '/players', label: '球员', icon: Users },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="absolute bottom-0 left-0 right-0 h-16 bg-card/80 backdrop-blur-sm border-t border-border flex justify-around items-center">
      {navItems.map((item) => {
        const isActive = (pathname === '/' && item.href === '/') || (pathname.startsWith(item.href) && item.href !== '/');
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center text-muted-foreground w-full h-full transition-colors duration-200",
              isActive ? "text-primary font-bold" : "hover:text-primary/80"
            )}
          >
            <item.icon className="h-6 w-6" />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
