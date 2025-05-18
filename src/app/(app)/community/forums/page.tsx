
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { MessageSquare, PlusCircle, Search, Users, FileText, Brain, Beaker, Laptop, FlaskConical, Construction, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { collection, onSnapshot, type FirestoreError } from 'firebase/firestore';
import { db } from '@/lib/firebase'; 
import { Loader2 } from 'lucide-react';

interface ForumCategory {
  id: string;
  name: string;
  description: string;
  iconName: string; 
  topics: number;
  posts: number;
}

const iconMap: Record<string, LucideIcon> = {
  MessageSquare,
  Brain,
  Users, 
  FileText,
  Laptop, 
  Beaker,
  FlaskConical,
  Search,
  Construction,
};


export default function ForumsPage() {
  const [forumCategories, setForumCategories] = useState<ForumCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!db) {
      setError("Firestore database is not available. Please check Firebase configuration or ensure it's initialized.");
      setLoading(false);
      return;
    }
    const categoriesCollection = collection(db, 'forum_categories');
    
    const unsubscribe = onSnapshot(categoriesCollection, (snapshot) => {
      const categoriesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ForumCategory));
      setForumCategories(categoriesData);
      setLoading(false);
      setError(null); // Clear previous errors on successful fetch
    }, (err: FirestoreError) => {
      console.error("Error fetching forum categories:", err);
      setError(`Failed to load forum categories: ${err.message}. Please try again later or check Firestore setup.`);
      setLoading(false);
    });

    return () => unsubscribe(); 
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in-0 slide-in-from-top-4 duration-500 ease-out">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Discussion Forums</h1>
          <p className="text-muted-foreground">
            Connect with peers, ask questions, and share your knowledge.
          </p>
        </div>
         {/* This button might be better placed within a specific category page or a global "new post" button later */}
        {/* <Button className="bg-primary hover:bg-primary/90" disabled>
          <PlusCircle className="mr-2 h-5 w-5" /> Start New Discussion (Coming Soon)
        </Button> */}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
            type="search"
            placeholder="Search forums..."
            className="max-w-xs pl-10"
            // Add search functionality later
          />
      </div>

      <Separator />

      {loading && (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="mt-3 text-lg text-muted-foreground">Loading forums...</p>
          <p className="text-sm text-muted-foreground">Please wait a moment.</p>
        </div>
      )}

      {error && !loading && (
        <Card className="border-destructive bg-destructive/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-6 w-6"/> Error Loading Forums
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-destructive-foreground">{error}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Please ensure Firestore is correctly set up and your security rules allow access to the 'forum_categories' collection.
            </p>
          </CardContent>
        </Card>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {forumCategories.map((category) => {
            const Icon = iconMap[category.iconName] || MessageSquare; 
            return (
              <Card key={category.id} className="shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:border-primary/50">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <Icon className="h-10 w-10 text-primary" />
                    <CardTitle className="text-2xl">
                      <Link href={`/community/forums/${category.id}`} className="hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm">
                        {category.name}
                      </Link>
                    </CardTitle>
                  </div>
                  <CardDescription className="pt-2 text-base">{category.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>{category.topics || 0} Topics</span>
                    <span>{category.posts || 0} Posts</span>
                  </div>
                  <Button variant="outline" asChild className="w-full border-primary text-primary hover:bg-primary/5 hover:text-primary">
                      <Link href={`/community/forums/${category.id}`}>
                          View Category &rarr;
                      </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
      {!loading && !error && forumCategories.length === 0 && (
         <Card className="text-center py-12 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-3 text-2xl">
             <Construction className="h-10 w-10 text-primary" /> No Forum Categories Found
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground">
              It looks like there are no forum categories set up in the database yet.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              An administrator may need to create some in the Firestore 'forum_categories' collection.
            </p>
          </CardContent>
         </Card>
      )}
    </div>
  );
}
