'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Wand2 } from 'lucide-react';
import { generateStudyPlan, type GenerateStudyPlanOutput } from '@/ai/flows/generate-study-plan';
import { useToast } from '@/hooks/use-toast';

export function GenerateStudyPlanForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GenerateStudyPlanOutput | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setResult(null);

    const formData = new FormData(event.currentTarget);
    const input = {
      subjects: formData.get('subjects') as string,
      availableTime: formData.get('availableTime') as string,
      examDates: formData.get('examDates') as string,
    };

    try {
      const response = await generateStudyPlan(input);
      setResult(response);
    } catch (error) {
      console.error('Error generating study plan:', error);
      toast({
        title: "Error",
        description: "Failed to generate study plan. Please try again.",
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
          <Wand2 className="h-6 w-6 text-primary" />
          Generate Study Plan
        </CardTitle>
        <CardDescription>Let AI create a personalized study plan for you.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="subjects">Subjects (comma-separated)</Label>
            <Input id="subjects" name="subjects" placeholder="e.g., Math, Physics, History" required />
          </div>
          <div>
            <Label htmlFor="availableTime">Available Study Time</Label>
            <Input id="availableTime" name="availableTime" placeholder="e.g., 2 hours per day, 10 hours per week" required />
          </div>
          <div>
            <Label htmlFor="examDates">Exam Dates (comma-separated)</Label>
            <Input id="examDates" name="examDates" placeholder="e.g., Math: Dec 15, Physics: Dec 20" required />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-4">
          <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary/90">
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Wand2 className="mr-2 h-4 w-4" />
            )}
            Generate Plan
          </Button>
          {result && (
            <div className="mt-4 w-full space-y-2 rounded-md border bg-muted/50 p-4">
              <h3 className="font-semibold text-foreground">Your Study Plan:</h3>
              <pre className="whitespace-pre-wrap text-sm text-muted-foreground">{result.studyPlan}</pre>
            </div>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
