'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, HelpCircle } from 'lucide-react';
import { answerSubjectQuestion, type AnswerSubjectQuestionOutput } from '@/ai/flows/answer-subject-questions';
import { useToast } from '@/hooks/use-toast';

export function AnswerQuestionForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnswerSubjectQuestionOutput | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setResult(null);

    const formData = new FormData(event.currentTarget);
    const input = {
      subject: formData.get('subject') as string,
      question: formData.get('question') as string,
    };
    
    try {
      const response = await answerSubjectQuestion(input);
      setResult(response);
    } catch (error) {
      console.error('Error answering question:', error);
      toast({
        title: "Error",
        description: "Failed to answer question. Please try again.",
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
          <HelpCircle className="h-6 w-6 text-primary" />
          Ask a Question
        </CardTitle>
        <CardDescription>Get answers to your subject-specific questions.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" name="subject" placeholder="e.g., Biology, Calculus, World War II" required />
          </div>
          <div>
            <Label htmlFor="question">Your Question</Label>
            <Textarea
              id="question"
              name="question"
              placeholder="e.g., What is mitosis? How to solve quadratic equations?"
              rows={4}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-4">
          <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary/90">
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <HelpCircle className="mr-2 h-4 w-4" />
            )}
            Get Answer
          </Button>
          {result && (
            <div className="mt-4 w-full space-y-2 rounded-md border bg-muted/50 p-4">
              <h3 className="font-semibold text-foreground">Answer:</h3>
              <p className="text-sm text-muted-foreground">{result.answer}</p>
            </div>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
