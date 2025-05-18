
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  CalendarDays,
  Brain,
  ListChecks,
  Award,
  Settings,
  X,
  Users, // Added Users icon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { CodeexFocusLogo } from '@/components/icons';
import type { Dispatch, SetStateAction } from 'react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/planner', label: 'Study Planner', icon: CalendarDays },
  { href: '/ai-assistant', label: 'CODEEX AI', icon: Brain },
  { href: '/tasks-notes', label: 'Tasks & Notes', icon: ListChecks },
  { href: '/rewards', label: 'Rewards', icon: Award },
  { href: '/community', label: 'Community', icon: Users }, // Added Community
];

interface AppSidebarProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function AppSidebar({ isOpen, setIsOpen }: AppSidebarProps) {
  const pathname = usePathname();

  const handleLinkClick = () => {
    if (window.innerWidth < 768) { // md breakpoint
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex h-full w-64 transform flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground shadow-lg transition-transform duration-300 ease-in-out md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
          <CodeexFocusLogo />
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(false)}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>
        <nav className="flex-1 space-y-2 overflow-y-auto p-4">
          {navItems.map((item) => (
            <Button
              key={item.label}
              variant={pathname.startsWith(item.href) ? 'default' : 'ghost'}
              className={cn(
                'w-full justify-start text-base',
                pathname.startsWith(item.href)
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              )}
              asChild
            >
              <Link href={item.href} onClick={handleLinkClick}>
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>
        <div className="mt-auto border-t border-sidebar-border p-4">
          <Button
            variant={pathname.startsWith('/settings') ? 'secondary' : 'ghost'}
            className={cn(
                'w-full justify-start text-base',
                 pathname.startsWith('/settings')
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/90'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                )}
            asChild
          >
            <Link href="/settings" onClick={handleLinkClick}>
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </Link>
          </Button>
        </div>
      </aside>
    </>
  );
}
