
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Send } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const newTopicSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters.' }).max(150, { message: "Title cannot exceed 150 characters."}),
  content: z.string().min(10, { message: 'Content must be at least 10 characters.' }).max(10000, { message: "Content cannot exceed 10000 characters."}), // Increased limit
});

type NewTopicFormValues = z.infer<typeof newTopicSchema>;

interface NewTopicDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  categoryId: string;
  onTopicCreated?: () => void; // Optional callback
}

export function NewTopicDialog({ isOpen, onOpenChange, categoryId, onTopicCreated }: NewTopicDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const form = useForm<NewTopicFormValues>({
    resolver: zodResolver(newTopicSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const onSubmit = async (data: NewTopicFormValues) => {
    setIsLoading(true);
    if (!user) {
      toast({ title: "Authentication Error", description: "You must be logged in to create a topic.", variant: "destructive" });
      setIsLoading(false);
      return;
    }

    try {
      const newTopicData = {
        categoryId: categoryId,
        title: data.title,
        content: data.content, // Storing initial post content here
        authorId: user.uid,
        authorName: user.displayName || user.email || 'Anonymous User',
        createdAt: serverTimestamp(),
        lastActivityAt: serverTimestamp(),
        replyCount: 0,
        // viewCount: 0, // Consider adding later
      };

      await addDoc(collection(db, 'forum_topics'), newTopicData);
      
      // Note: Incrementing topic/post counts on the category document
      // would ideally be done via a Cloud Function for atomicity.
      // For now, this will be a manual update or future enhancement.

      toast({
        title: 'Topic Created!',
        description: 'Your new topic has been successfully posted.',
      });
      form.reset();
      onOpenChange(false);
      if (onTopicCreated) {
        onTopicCreated();
      }
    } catch (error) {
       console.error("Error creating topic:", error);
       toast({ title: "Error", description: "Failed to create topic. Please try again.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
        onOpenChange(open);
        if (!open) {
            form.reset(); // Reset form when dialog is closed
        }
    }}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New Topic</DialogTitle>
          <DialogDescription>
            Start a new discussion in this category. Fill in the title and your initial post.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Topic Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a concise and descriptive title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Initial Post</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share your thoughts, questions, or ideas... Markdown is supported."
                      rows={10}
                      className="resize-y min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline" disabled={isLoading}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" className="bg-accent hover:bg-accent/90" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Send className="mr-2 h-4 w-4" />
                )}
                Submit Topic
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
