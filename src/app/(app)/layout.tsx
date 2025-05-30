// Enable client-side rendering
'use client';

// Import necessary React and Next.js modules
import type { ReactNode } from 'react';
import { useState, useEffect, lazy, Suspense } from 'react';
import { useRouter, usePathname } from 'next/navigation';

// Import layout components
import { AppSidebar } from '@/components/layout/AppSidebar';
import { AppHeader } from '@/components/layout/AppHeader';

// Import custom authentication hook and icon component
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

// Import Link component for navigation
import Link from 'next/link';

// Import Metadata type for defining page metadata
// import type { Metadata } from 'next'; // Removed metadata import

// Define metadata for the page (title and description)
// Metadata is not supported in client components, moved to a server component layout if needed
/*
export const metadata: Metadata = {
  title: 'CODEEX-FOCUS: AI Study Planner, Task Manager & Community',
  description: 'Boost your productivity with CODEEX-FOCUS. Leverage AI assistance for Q&A and summarization, plan your studies, manage tasks & notes, and connect with a community. Start focusing effectively!',
};
*/

// Lazy load the AppTourDialog component for performance
const AppTourDialog = lazy(() => import('@/components/app-tour/AppTourDialog'));

// Define the main application layout component
export default function AppLayout({ children }: { children: ReactNode }) {
  // State for controlling the sidebar open/close state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // State for controlling the visibility of the tour dialog
  const [isTourOpen, setIsTourOpen] = useState(false);

  // Get user authentication status and loading state from AuthContext
  const { user, loading } = useAuth();
  // Get router instance for navigation
  const router = useRouter();
  // Get the current pathname
  const pathname = usePathname();

  // Effect hook to check authentication status and redirect if the user is not logged in
  useEffect(() => {
    // If not loading and no user is authenticated, redirect to the login page
    if (!loading && !user) {
      router.replace(`/login?redirect=${pathname}`);
    }
    // Dependencies array: rerun the effect if user, loading, router, or pathname changes
  }, [user, loading, router, pathname]);

  // Effect hook to show the application tour on the first visit
  useEffect(() => {
    // Check if the tour has already been shown using localStorage
    const tourShown = localStorage.getItem('codeexFocusTourShown');
    // If the tour hasn't been shown and the user is logged in, open the tour dialog
    if (!tourShown && user) {
      setIsTourOpen(true);
      // Mark the tour as shown in localStorage
      localStorage.setItem('codeexFocusTourShown', 'true');
    }
    // Dependencies array: rerun the effect when the user context changes
  }, [user]);

  // Show a loading spinner while the authentication status is being verified
  if (loading || !user) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background text-foreground">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg">Verifying session...</p>
      </div>
    );
  }

  // Render the main application layout once authenticated
  return (
    <div className="flex min-h-screen bg-background">
      {/* Application Sidebar component */}
      <AppSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      {/* Main content area, adjusted for sidebar width */}
      <div className="flex flex-1 flex-col md:ml-64">
        {/* Application Header component */}
        <AppHeader setSidebarOpen={setSidebarOpen} setIsTourOpen={setIsTourOpen} />
        {/* Main content area where child routes will be rendered */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          {children}
        </main>
        {/* Footer section */}
        <footer className="border-t border-border bg-background/95 py-6 px-4 text-center text-sm text-muted-foreground sm:px-6 md:px-8">
          <p className="mb-1">
            This website is developed by Heoster.
          </p>
          {/* Feedback link */}
          <Link
            href="mailto:90freeplay98@gmail.com"
            className="hover:text-primary hover:underline"
          >
            Send Feedback
          </Link>
        </footer>
      </div>
      {/* Wrap the lazy-loaded AppTourDialog in Suspense */}
      <Suspense fallback={null}> {/* Fallback can be a loading indicator if needed */}
        {/* Conditionally render the tour dialog if isTourOpen is true */}
        {isTourOpen && <AppTourDialog isOpen={isTourOpen} onOpenChange={setIsTourOpen} />}
      </Suspense>
    </div>
  );
}
