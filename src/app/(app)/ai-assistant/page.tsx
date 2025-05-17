import { GenerateStudyPlanForm } from '@/components/ai-assistant/GenerateStudyPlanForm';
import { SummarizeContentForm } from '@/components/ai-assistant/SummarizeContentForm';
import { AnswerQuestionForm } from '@/components/ai-assistant/AnswerQuestionForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wand2, Newspaper, HelpCircle } from 'lucide-react';

export default function AiAssistantPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">CODEEX-FOCUS AI Assistant</h1>
        <p className="text-muted-foreground">Your intelligent study partner. Powered by Genkit.</p>
      </div>

      <Tabs defaultValue="study-plan" className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 mb-6">
          <TabsTrigger value="study-plan" className="text-base py-2.5">
            <Wand2 className="mr-2 h-5 w-5" /> Study Plan
          </TabsTrigger>
          <TabsTrigger value="summarize" className="text-base py-2.5">
            <Newspaper className="mr-2 h-5 w-5" /> Summarizer
          </TabsTrigger>
          <TabsTrigger value="qa" className="text-base py-2.5">
            <HelpCircle className="mr-2 h-5 w-5" /> Q&A
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="study-plan">
          <GenerateStudyPlanForm />
        </TabsContent>
        <TabsContent value="summarize">
          <SummarizeContentForm />
        </TabsContent>
        <TabsContent value="qa">
          <AnswerQuestionForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
