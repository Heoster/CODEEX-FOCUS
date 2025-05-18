
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Loader2, AlertTriangle, MessageSquare, PlusCircle, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { doc, getDoc, type FirestoreError } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { LucideIcon } from 'lucide-react';
import type { ForumCategory as ForumCategoryData } from '@/lib/types';
import { NewTopicDialog } from '@/components/community/NewTopicDialog'; // New import

// Placeholder for icon mapping if you decide to use iconName from Firestore
const iconMap: Record<string, LucideIcon> = {
  MessageSquare,
  BookOpen, // Added for potential use
  // Add other icons used in your forum_categories data here (e.g., Brain, FileText, Laptop)
};

export default function ForumCategoryPage() {
  const params = useParams();
  const categoryId = params.categoryId as string;

  const [category, setCategory] = useState<ForumCategoryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isNewTopicDialogOpen, setIsNewTopicDialogOpen] = useState(false);

  useEffect(() => {
    if (!categoryId || !db) {
      if (!db) setError("Firestore database is not available.");
      else setError("Category ID is missing.");
      setLoading(false);
      return;
    }

    const fetchCategory = async () => {
      setLoading(true);
      setError(null);
      try {
        const categoryDocRef = doc(db, 'forum_categories', categoryId);
        const categoryDocSnap = await getDoc(categoryDocRef);

        if (categoryDocSnap.exists()) {
          setCategory(categoryDocSnap.data() as ForumCategoryData);
        } else {
          setError(`Forum category with ID "${categoryId}" not found.`);
        }
      } catch (err: any) {
        console.error("Error fetching category:", err);
        setError(err.message || "Failed to load category details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [categoryId]);

  const CategoryIcon = category?.iconName ? iconMap[category.iconName] || MessageSquare : MessageSquare;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading category details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6 animate-in fade-in-0 slide-in-from-top-4 duration-500 ease-out">
        <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
            <Link href="/community/forums">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to Forums</span>
            </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight text-destructive">Error</h1>
        </div>
        <Card className="bg-destructive/10 border-destructive">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-6 w-6 text-destructive" />
                    Could Not Load Category
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-destructive-foreground">{error}</p>
                <Button asChild className="mt-6">
                    <Link href="/community/forums">Back to Forums List</Link>
                </Button>
            </CardContent>
        </Card>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="space-y-6 animate-in fade-in-0 slide-in-from-top-4 duration-500 ease-out">
         <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
            <Link href="/community/forums">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to Forums</span>
            </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Category Not Found</h1>
        </div>
        <Card>
            <CardContent className="text-center py-12">
                <p className="text-lg text-muted-foreground">The requested forum category could not be found.</p>
                <Button asChild className="mt-6">
                    <Link href="/community/forums">Back to Forums List</Link>
                </Button>
            </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-top-4 duration-500 ease-out">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/community/forums">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to Forums</span>
          </Link>
        </Button>
        <div className="flex items-center gap-3">
          <CategoryIcon className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {category.name}
          </h1>
        </div>
      </div>
      <p className="text-lg text-muted-foreground ml-12 pl-1">{category.description}</p>

      <div className="flex justify-end mb-6">
        <Button onClick={() => setIsNewTopicDialogOpen(true)} className="bg-primary hover:bg-primary/90">
          <PlusCircle className="mr-2 h-5 w-5" />
          New Topic
        </Button>
      </div>

      <NewTopicDialog
        isOpen={isNewTopicDialogOpen}
        onOpenChange={setIsNewTopicDialogOpen}
        categoryId={categoryId}
      />

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Topics</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-12">
            {/* Placeholder for topic list. In a real app, you'd fetch and map topics here. */}
            <BookOpen className="h-24 w-24 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg text-muted-foreground mb-2">
            No topics in <span className="font-semibold text-foreground">{category.name}</span> yet.
            </p>
            <p className="text-muted-foreground">
            Be the first to start a discussion!
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
