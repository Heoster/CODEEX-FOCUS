'use client';

// Import necessary hooks and components
import { useEffect, useState } from 'react'; // Import useState
import { useRouter } from 'next/navigation';
// Import the authentication context hook
import { useAuth } from '@/context/AuthContext';
// Import a loading spinner component
import { Loader2 } from 'lucide-react';

// Define the Home page component
export default function HomePage() {
  // Get the router instance for navigation
  const router = useRouter();
  // Use the authentication context to get user info and loading status
  const { user, loading } = useAuth();

  // State to control the visibility of the content for animation
  const [showContent, setShowContent] = useState(false); // Initialize to false

  // Use a side effect hook to handle redirection based on auth status
  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace('/dashboard');
      } else {
        router.replace('/login');
      }
    }
  }, [user, loading, router]); // Dependencies array: rerun effect if user, loading, or router changes

  // Effect to trigger the fade-in animation after component mounts
  useEffect(() => {
    // Set showContent to true after the component mounts
    setShowContent(true);
  }, []); // Empty dependency array means this effect runs only once after the initial render

  // Render a loading screen while authentication status is being determined
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-background text-foreground">
      {/* Apply fade-in transition to this inner div */}
      <div className={`flex flex-col items-center transition-opacity duration-700 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        {/* Loading spinner */}
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        {/* Loading text */}
        <p className="mt-4 text-lg">Loading CODEEX-FOCUS...</p>
      </div>
    </div>
  );
}