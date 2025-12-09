'use client';

import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
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
  const params = useParams();
  const edition = params.edition as string | undefined;

  const createHref = (baseHref: string) => {
    let finalHref = baseHref;

    if (edition) {
      if (baseHref === '/') {
        finalHref = `/edition/${edition}`;
      } else {
        finalHref = `/edition/${edition}${baseHref}`;
      }
    }
    
    return finalHref;
  };

  const isActive = (baseHref: string) => {
    // For homepage, it can be '/' or '/edition/...'
    if (baseHref === '/') {
      return pathname === '/' || /^\/edition\/\d+$/.test(pathname);
    }
    // For other pages, check if the pathname ends with the base href
    return pathname.endsWith(baseHref);
  }

  return (
    <div className="absolute bottom-0 left-0 right-0 h-16 bg-card/80 backdrop-blur-sm border-t border-border flex justify-around items-center">
      {navItems.map((item) => {
        const href = createHref(item.href);
        return (
          <Link
            key={item.href}
            href={href}
            className={cn(
              "flex flex-col items-center justify-center text-muted-foreground w-full h-full transition-colors duration-200",
              isActive(item.href) ? "text-primary font-bold" : "hover:text-primary/80"
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
