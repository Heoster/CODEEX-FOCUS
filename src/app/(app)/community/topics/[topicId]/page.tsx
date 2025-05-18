// Suggested code may be subject to a license. Learn more: ~LicenseLog:4215366625.

'use client';

import { Button} from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Loader2, MessageCircle, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation'; // Added useRouter
import { useEffect, useState } from 'react';
import { doc, getDoc, type Timestamp, collection, query, where, orderBy, onSnapshot, serverTimestamp, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Topic as TopicData, Post as PostData } from '@/lib/types';
import { format } from 'date-fns';
import { CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

// A simple markdown to basic HTML renderer (for demonstration)
// For a production app, use a library like 'marked' or 'react-markdown'
const renderMarkdown = (text: string) => {
  // Basic link and bold/italic support for now
  text = text.replace(/\[([^\]]+)]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">$1</a>');
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
  text = text.replace(/\n/g, '<br />');
  return { __html: text };
};


export default function TopicPage() {
  const params = useParams();
  const router = useRouter(); // For navigation
  const topicId = params.topicId as string;
  const { user } = useAuth();
  const { toast } = useToast();

  const [topic, setTopic] = useState<TopicData | null>(null);
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loadingTopic, setLoadingTopic] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newReply, setNewReply] = useState('');
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);


  useEffect(() => {
    if (!topicId || !db) {
      setError("Topic ID is missing or Firestore is unavailable.");
      setLoadingTopic(false);
      setLoadingPosts(false);
      return;
    }

    // Fetch Topic
    const topicDocRef = doc(db, 'forum_topics', topicId);
    const unsubscribeTopic = onSnapshot(topicDocRef, (docSnap) => {
      if (docSnap.exists()) {
        setTopic({ id: docSnap.id, ...docSnap.data() } as TopicData);
      } else {
        setError(`Topic with ID "${topicId}" not found.`);
      }
      setLoadingTopic(false);
    }, (err) => {
      console.error("Error fetching topic:", err);
      setError("Failed to load topic details.");
      setLoadingTopic(false);
    });

    // Fetch Posts for this topic
    // Assuming posts are in a subcollection 'posts' under each topic document
    // Or a top-level 'forum_posts' collection filtered by topicId
    const postsQuery = query(
      collection(db, `forum_topics/${topicId}/posts`), // Subcollection path
      orderBy("createdAt", "asc")
    );

    const unsubscribePosts = onSnapshot(postsQuery, (snapshot) => {
      const fetchedPosts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PostData));
      setPosts(fetchedPosts);
      setLoadingPosts(false);
    }, (err) => {
      console.error("Error fetching posts:", err);
      // setError(prevError => prevError || "Failed to load posts for this topic.");
      setLoadingPosts(false);
    });

    return () => {
      unsubscribeTopic();
      unsubscribePosts();
    };

  }, [topicId]);
  
  const handleReplySubmit = async () => {
    if (!user) {
      toast({ title: "Not Logged In", description: "Please log in to reply.", variant: "destructive" });
      return;
    }
    if (newReply.trim().length < 5) {
      toast({ title: "Reply Too Short", description: "Your reply must be at least 5 characters.", variant: "destructive" });
      return;
    }
    setIsSubmittingReply(true);
    try {
      const postsCollectionRef = collection(db, `forum_topics/${topicId}/posts`);
      await addDoc(postsCollectionRef, {
        topicId: topicId,
        authorId: user.uid,
        authorName: user.displayName || user.email || "Anonymous",
        content: newReply,
        createdAt: serverTimestamp(),
      });

      // Optionally update topic's lastActivityAt and replyCount here or via Cloud Function
      // For simplicity, we'll rely on re-fetching or assume a Cloud Function handles this.
      
      setNewReply('');
      toast({ title: "Reply Posted!", description: "Your reply has been added to the discussion." });
    } catch (err) {
      console.error("Error submitting reply:", err);
      toast({ title: "Error", description: "Could not post your reply. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmittingReply(false);
    }
  };


  if (loadingTopic) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading topic...</p>
      </div>
    );
  }

  if (error && !topic) {
    return (
       <div className="space-y-6 animate-in fade-in-0 slide-in-from-top-4 duration-500 ease-out">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight text-destructive">Error</h1>
        </div>
        <Card className="bg-destructive/10 border-destructive">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-destructive" />
              Could Not Load Topic
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-destructive-foreground">{error}</p>
            <Button asChild className="mt-6">
              <Link href="/community/forums">Back to Forums</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="space-y-6 animate-in fade-in-0 slide-in-from-top-4 duration-500 ease-out">
        <div className="flex items-center gap-4"> {/* This div was causing the parsing error */}
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Topic Not Found</h1>
        </div>
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-lg text-muted-foreground">The requested topic could not be found.</p>
             <Button asChild className="mt-6">
              <Link href={`/community/forums/${topic?.categoryId || ''}`}>Back to Category</Link>            </Button>
          </CardContent>
        </Card>
     </div>
    );
  }
  
  // Combine topic content (first post) with replies
  const allPosts: Array<Partial<PostData> & { isOriginalPost?: boolean }> = [
    { 
        content: topic.content, 
        authorId: topic.authorId, 
        authorName: topic.authorName, 
        createdAt: topic.createdAt,
        isOriginalPost: true,
        id: `topic-${topic.id}-original`
    },
    ...posts,
  ];


  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-top-4 duration-500 ease-out">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href={`/community/forums/${topic.categoryId}`}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to Category</span>
          </Link>
        </Button>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground line-clamp-2">
          {topic.title}
        </h1>
      </div>
      <CardDescription className="ml-12 pl-1 text-sm">
        Started by <span className="font-semibold text-foreground">{topic.authorName}</span> on {topic.createdAt ? format(topic.createdAt.toDate(), 'PPP p') : 'N/A'}
      </CardDescription>

      {/* Posts Display */}
      <div className="space-y-6">
        {loadingPosts && posts.length === 0 ? (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-3 text-muted-foreground">Loading posts...</p>
          </div>
        ) : allPosts.map((post, index) => (
          <Card key={post.id || `post-${index}`} className={`shadow-md ${post.isOriginalPost ? 'border-2 border-primary/50 bg-primary/5' : 'bg-card'}`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">{post.authorName}</p>
                <p className="text-xs text-muted-foreground">
                  {post.createdAt ? format(post.createdAt.toDate(), 'MMM d, yyyy HH:mm') : 'Just now'}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              {/* For basic display. Use react-markdown for proper rendering */}
              <div className="prose prose-sm max-w-none dark:prose-invert text-foreground" dangerouslySetInnerHTML={renderMarkdown(post.content || "")} />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reply Form */}
      {user && (
        <Card className="shadow-lg mt-8">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-primary"/>
                    Post a Reply
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Textarea
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    placeholder="Write your reply here... Markdown is supported."
                    rows={6}
                    className="min-h-[120px] resize-y"
                />
            </CardContent>
            <CardFooter>
                <Button onClick={handleReplySubmit} disabled={isSubmittingReply || newReply.trim().length < 5} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    {isSubmittingReply && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                    Submit Reply
                </Button>
            </CardFooter>
        </Card>
      )}
      {!user && (
        <Card className="shadow-lg mt-8 text-center p-6 bg-muted/50">
            <p className="text-muted-foreground">
                <Link href={`/login?redirect=/community/topics/${topicId}`} className="text-primary hover:underline font-semibold">Log in</Link> or <Link href={`/register?redirect=/community/topics/${topicId}`} className="text-primary hover:underline font-semibold">sign up</Link> to post a reply.
            </p>
        </Card>
      )}
    </div>
  );
}
