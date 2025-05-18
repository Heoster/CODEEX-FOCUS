
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
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
// import { useAuth } from '@/context/AuthContext'; // For authorId and authorName in future

const newTopicSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters.' }).max(150, { message: "Title cannot exceed 150 characters."}),
  content: z.string().min(10, { message: 'Content must be at least 10 characters.' }).max(5000, { message: "Content cannot exceed 5000 characters."}),
});

type NewTopicFormValues = z.infer<typeof newTopicSchema>;

interface NewTopicDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  categoryId: string;
}

export function NewTopicDialog({ isOpen, onOpenChange, categoryId }: NewTopicDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  // const { user } = useAuth(); // To get authorId and authorName later
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
    // if (!user) {
    //   toast({ title: "Authentication Error", description: "You must be logged in to create a topic.", variant: "destructive" });
    //   setIsLoading(false);
    //   return;
    // }

    console.log('New Topic Data:', {
      ...data,
      categoryId,
      // authorId: user.uid,
      // authorName: user.displayName || user.email,
      createdAt: new Date(),
    });

    // Placeholder: In a real app, you'd save this to Firestore
    // For example:
    // try {
    //   await addDoc(collection(db, 'topics'), {
    //     ...data,
    //     categoryId,
    //     authorId: user.uid,
    //     authorName: user.displayName || user.email,
    //     createdAt: serverTimestamp(), // Use serverTimestamp for consistency
    //     postCount: 1, // Initial post
    //   });
    //   // Then add the initial post to a 'posts' subcollection or separate collection
    // } catch (error) {
    //    console.error("Error creating topic:", error);
    //    toast({ title: "Error", description: "Failed to create topic.", variant: "destructive" });
    //    setIsLoading(false);
    //    return;
    // }

    toast({
      title: 'Topic Submitted (Placeholder)',
      description: 'Your new topic has been submitted (data logged to console).',
    });
    setIsLoading(false);
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
                  <FormLabel>Your Post</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share your thoughts, questions, or ideas..."
                      rows={8}
                      className="resize-y"
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
              <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={isLoading}>
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
