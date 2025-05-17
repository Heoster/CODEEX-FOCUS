
'use client';

import type { Dispatch, SetStateAction } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FocusForgeLogo } from '@/components/icons';
import { UserNav } from '@/components/layout/UserNav';
import { usePathname } from 'next/navigation';

interface AppHeaderProps {
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

function getTitleFromPath(pathname: string): string {
  if (pathname.startsWith('/dashboard')) return 'Dashboard';
  if (pathname.startsWith('/planner')) return 'Study Planner';
  if (pathname.startsWith('/ai-assistant')) return 'Wikinet AI Assistant';
  if (pathname.startsWith('/tasks-notes')) return 'Tasks & Notes';
  if (pathname.startsWith('/rewards')) return 'Motivation & Rewards';
  if (pathname.startsWith('/settings')) return 'Settings';
  return 'FocusForge';
}

export function AppHeader({ setSidebarOpen }: AppHeaderProps) {
  const pathname = usePathname();
  const pageTitle = getTitleFromPath(pathname);

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-md">
      <div className="flex items-center gap-4 md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <Menu className="h-6 w-6" />
        </Button>
        <FocusForgeLogo />
      </div>
      <h1 className="hidden text-xl font-semibold text-foreground md:block md:flex-1">
        {pageTitle}
      </h1>
      <UserNav />
    </header>
  );
}
