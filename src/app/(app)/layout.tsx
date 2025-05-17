
'use client';

import type { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { AppHeader } from '@/components/layout/AppHeader';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';
import { AppTourDialog } from '@/components/app-tour/AppTourDialog'; // Import the tour dialog

export default function AppLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false); // State for tour dialog
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.replace(`/login?redirect=${pathname}`);
    }
  }, [user, loading, router, pathname]);

  // Effect to show tour on first visit (example using localStorage)
  // useEffect(() => {
  //   const tourShown = localStorage.getItem('focusForgeTourShown');
  //   if (!tourShown && user) { // Show only if logged in and not shown before
  //     setIsTourOpen(true);
  //     localStorage.setItem('focusForgeTourShown', 'true');
  //   }
  // }, [user]); // Rerun when user context changes

  if (loading || !user) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background text-foreground">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg">Verifying session...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex flex-1 flex-col md:ml-64">
        <AppHeader setSidebarOpen={setSidebarOpen} setIsTourOpen={setIsTourOpen} /> {/* Pass setIsTourOpen */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          {children}
        </main>
      </div>
      <AppTourDialog isOpen={isTourOpen} onOpenChange={setIsTourOpen} /> {/* Render tour dialog */}
    </div>
  );
}
