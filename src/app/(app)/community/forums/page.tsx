
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { MessageSquare, PlusCircle, Search, Users, FileText, Brain, Beaker, Laptop } from 'lucide-react';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { collection, onSnapshot, type FirestoreError } from 'firebase/firestore';
import { db } from '@/lib/firebase'; // Assuming db is exported from your firebase setup
import { Loader2 } from 'lucide-react';

interface ForumCategory {
  id: string;
  name: string;
  description: string;
  iconName: string; // Store name of the icon
  topics: number;
  posts: number;
}

const iconMap: Record<string, LucideIcon> = {
  MessageSquare,
  Brain,
  Users, // Could also be Group, Users2, etc.
  FileText,
  Laptop, // Or Tablet, Smartphone
  Beaker, // Good for science
  Search,
  // Add more as needed
};


export default function ForumsPage() {
  const [forumCategories, setForumCategories] = useState<ForumCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const categoriesCollection = collection(db, 'forum_categories');
    
    const unsubscribe = onSnapshot(categoriesCollection, (snapshot) => {
      const categoriesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ForumCategory));
      setForumCategories(categoriesData);
      setLoading(false);
    }, (err: FirestoreError) => {
      console.error("Error fetching forum categories:", err);
      setError("Failed to load forum categories. Please try again later.");
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener on component unmount
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in-0 slide-in-from-top-8 duration-700 ease-out">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Discussion Forums</h1>
          <p className="text-muted-foreground">
            Connect with peers, ask questions, and share your knowledge.
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90" disabled>
          <PlusCircle className="mr-2 h-5 w-5" /> Start New Discussion (Coming Soon)
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Input
            type="search"
            placeholder="Search forums..."
            className="max-w-xs"
          />
      </div>

      <Separator />

      {loading && (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="ml-3 text-muted-foreground">Loading forums...</p>
        </div>
      )}

      {error && (
        <Card className="bg-destructive/10 border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-destructive-foreground">{error}</p>
          </CardContent>
        </Card>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 gap-6">
          {forumCategories.map((category) => {
            const Icon = iconMap[category.iconName] || MessageSquare; // Default icon
            return (
              <Card key={category.id} className="shadow-lg hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 ease-in-out">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <Icon className="h-8 w-8 text-primary" />
                    <CardTitle className="text-2xl">
                      <Link href={`/community/forums/${category.id}`} className="hover:underline">
                        {category.name}
                      </Link>
                    </CardTitle>
                  </div>
                  <CardDescription className="pt-1">{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>{category.topics} Topics</span>
                    <span>{category.posts} Posts</span>
                  </div>
                  <Button variant="link" asChild className="p-0 h-auto mt-2 text-primary">
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
         <p className="text-center text-sm text-muted-foreground mt-8">
          No forum categories found. An admin may need to create some!
        </p>
      )}
       {forumCategories.length > 0 && (
         <p className="text-center text-sm text-muted-foreground mt-8">
          Individual category views and posting are currently under development.
        </p>
       )}
    </div>
  );
}
