'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Newspaper } from 'lucide-react';
import { summarizeContent, type SummarizeContentOutput } from '@/ai/flows/summarize-content';
import { useToast } from '@/hooks/use-toast';

export function SummarizeContentForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SummarizeContentOutput | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setResult(null);

    const formData = new FormData(event.currentTarget);
    const input = {
      content: formData.get('contentToSummarize') as string,
    };

    if (input.content.trim().length === 0) {
        toast({
            title: "Input Required",
            description: "Please paste some content to summarize.",
            variant: "default"
        });
        setIsLoading(false);
        return;
    }
    
    try {
      const response = await summarizeContent(input);
      setResult(response);
    } catch (error) {
      console.error('Error summarizing content:', error);
      toast({
        title: "Error",
        description: "Failed to summarize content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-lg w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Newspaper className="h-6 w-6 text-primary" />
          Summarize Content
        </CardTitle>
        <CardDescription>Get a quick summary of any text or article.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="contentToSummarize">Content to Summarize</Label>
            <Textarea
              id="contentToSummarize"
              name="contentToSummarize"
              placeholder="Paste your article, chapter, or notes here..."
              rows={8}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-4">
          <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary/90">
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Newspaper className="mr-2 h-4 w-4" />
            )}
            Summarize
          </Button>
          {result && (
            <div className="mt-4 w-full space-y-2 rounded-md border bg-muted/50 p-4">
              <h3 className="font-semibold text-foreground">Summary:</h3>
              <p className="text-sm text-muted-foreground">{result.summary}</p>
            </div>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
