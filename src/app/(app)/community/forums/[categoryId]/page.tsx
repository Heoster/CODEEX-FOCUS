
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Loader2, AlertTriangle, MessageSquare, PlusCircle, BookOpen, Edit, Trash2, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { doc, getDoc, collection, query, where, orderBy, onSnapshot, type FirestoreError, type Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { LucideIcon } from 'lucide-react';
import type { ForumCategory as ForumCategoryData, Topic } from '@/lib/types';
import { NewTopicDialog } from '@/components/community/NewTopicDialog';
import { format, formatDistanceToNow } from 'date-fns';

const iconMap: Record<string, LucideIcon> = {
  MessageSquare,
  BookOpen,
  Brain: MessageSquare, // Assuming Brain icon might not exist, fallback
  FileText: MessageSquare,
  Laptop: MessageSquare,
  FlaskConical: MessageSquare,
  // Add other icons used in your forum_categories data here
};

export default function ForumCategoryPage() {
  const params = useParams();
  const categoryId = params.categoryId as string;

  const [category, setCategory] = useState<ForumCategoryData | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loadingCategory, setLoadingCategory] = useState(true);
  const [loadingTopics, setLoadingTopics] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isNewTopicDialogOpen, setIsNewTopicDialogOpen] = useState(false);

  useEffect(() => {
    if (!categoryId || !db) {
      if (!db) setError("Firestore database is not available.");
      else setError("Category ID is missing.");
      setLoadingCategory(false);
      setLoadingTopics(false);
      return;
    }

    const fetchCategory = async () => {
      setLoadingCategory(true);
      setError(null);
      try {
        const categoryDocRef = doc(db, 'forum_categories', categoryId);
        const categoryDocSnap = await getDoc(categoryDocRef);

        if (categoryDocSnap.exists()) {
          setCategory({ id: categoryDocSnap.id, ...categoryDocSnap.data() } as ForumCategoryData);
        } else {
          setError(`Forum category with ID "${categoryId}" not found.`);
        }
      } catch (err: any) {
        console.error("Error fetching category:", err);
        setError(err.message || "Failed to load category details.");
      } finally {
        setLoadingCategory(false);
      }
    };

    fetchCategory();

    // Fetch topics
    setLoadingTopics(true);
    const topicsQuery = query(
      collection(db, 'forum_topics'),
      where("categoryId", "==", categoryId),
      orderBy("lastActivityAt", "desc")
    );

    const unsubscribeTopics = onSnapshot(topicsQuery, (snapshot) => {
      const fetchedTopics = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Topic));
      setTopics(fetchedTopics);
      setLoadingTopics(false);
    }, (err: FirestoreError) => {
      console.error("Error fetching topics:", err);
      setError(prevError => prevError || "Failed to load topics."); // Keep existing error if any
      setLoadingTopics(false);
    });

    return () => {
      unsubscribeTopics();
    };

  }, [categoryId]);

  const CategoryIcon = category?.iconName ? iconMap[category.iconName] || MessageSquare : MessageSquare;

  if (loadingCategory) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading category details...</p>
      </div>
    );
  }

  if (error && !category) { // Show full error only if category loading failed critically
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
                    Could Not Load Page
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
    // This case might be redundant if error above catches it, but good for safety
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

  const handleTopicCreated = () => {
    // Optionally re-fetch topics or rely on onSnapshot
    // For now, onSnapshot should handle this automatically
  }

  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-top-4 duration-500 ease-out">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/community/forums">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to Forums</span>
            </Link>
          </Button>
          <div className="flex items-center gap-3">
            <CategoryIcon className="h-8 w-8 text-primary" />
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              {category.name}
            </h1>
          </div>
        </div>
        <Button onClick={() => setIsNewTopicDialogOpen(true)} className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <PlusCircle className="mr-2 h-5 w-5" />
          New Topic
        </Button>
      </div>
      <p className="text-lg text-muted-foreground sm:ml-16">{category.description}</p>


      <NewTopicDialog
        isOpen={isNewTopicDialogOpen}
        onOpenChange={setIsNewTopicDialogOpen}
        categoryId={categoryId}
        onTopicCreated={handleTopicCreated}
      />

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Topics in {category.name}</CardTitle>
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </CardHeader>
        <CardContent>
            {loadingTopics ? (
                 <div className="flex items-center justify-center py-10">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="ml-3 text-muted-foreground">Loading topics...</p>
                 </div>
            ) : topics.length === 0 ? (
                <div className="text-center py-12">
                    <BookOpen className="h-24 w-24 text-muted-foreground/50 mx-auto mb-4" />
                    <p className="text-lg text-muted-foreground mb-2">
                    No topics in <span className="font-semibold text-foreground">{category.name}</span> yet.
                    </p>
                    <p className="text-muted-foreground">
                    Be the first to start a discussion!
                    </p>
                </div>
            ) : (
                <ul className="space-y-4">
                    {topics.map(topic => (
                        <li key={topic.id} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-card">
                            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                                <div className="flex-grow">
                                    <Link href={`/community/topics/${topic.id}`} className="text-lg font-semibold text-primary hover:underline hover:text-primary/80 line-clamp-2">
                                        {topic.title}
                                    </Link>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Started by <span className="font-medium text-foreground">{topic.authorName}</span>
                                        {' '}&bull;{' '}
                                        {topic.createdAt ? formatDistanceToNow(topic.createdAt.toDate(), { addSuffix: true }) : 'a while ago'}
                                    </p>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground shrink-0">
                                   <div className="text-center sm:text-right">
                                        <p className="font-semibold text-foreground">{topic.replyCount || 0}</p>
                                        <p className="text-xs">Replies</p>
                                   </div>
                                   {/* Placeholder for views if you add it */}
                                   {/* <div className="text-center sm:text-right">
                                        <p className="font-semibold text-foreground">{topic.viewCount || 0}</p>
                                        <p className="text-xs">Views</p>
                                   </div> */}
                                   <Button variant="outline" size="sm" asChild>
                                        <Link href={`/community/topics/${topic.id}`}>
                                            View Topic <ExternalLink className="ml-2 h-3 w-3" />
                                        </Link>
                                   </Button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
