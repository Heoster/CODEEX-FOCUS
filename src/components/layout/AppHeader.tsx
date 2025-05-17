'use client';

import type { Dispatch, SetStateAction } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FocusForgeLogo } from '@/components/icons';
import { usePathname } from 'next/navigation';

interface AppHeaderProps {
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
  pageTitle?: string;
}

function getTitleFromPath(pathname: string): string {
  if (pathname === '/dashboard') return 'Dashboard';
  if (pathname === '/planner') return 'Study Planner';
  if (pathname === '/ai-assistant') return 'Wikinet AI Assistant';
  if (pathname === '/tasks-notes') return 'Tasks & Notes';
  if (pathname === '/rewards') return 'Motivation & Rewards';
  return 'FocusForge';
}

export function AppHeader({ setSidebarOpen }: AppHeaderProps) {
  const pathname = usePathname();
  const pageTitle = getTitleFromPath(pathname);

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-md md:justify-end">
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
      <h1 className="hidden text-xl font-semibold text-foreground md:block">
        {pageTitle}
      </h1>
      {/* Placeholder for User Profile Dropdown */}
      {/* <UserNav /> */}
    </header>
  );
}
