'use client';

import React from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Newspaper, HelpCircle } from 'lucide-react';

import { SummarizeContentForm } from '@/components/ai-assistant/SummarizeContentForm';
import { AnswerQuestionForm } from '@/components/ai-assistant/AnswerQuestionForm';

export default function AiAssistantPage() {
  return (
    <div className="space-y-8 animate-in fade-in-0 slide-in-from-top-4 duration-500 ease-out">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">CODEEX AI Assistant</h1>
        <p className="text-lg text-muted-foreground">Your intelligent study partner.</p>
      </div>

      <Tabs defaultValue="summarize" className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 mb-6 shadow-sm">
          <TabsTrigger value="summarize" className="text-base py-2.5">
            <Newspaper className="mr-2 h-5 w-5" /> Summarizer
          </TabsTrigger>
          <TabsTrigger value="qa" className="text-base py-2.5">
            <HelpCircle className="mr-2 h-5 w-5" /> Q&amp;A
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="summarize" className="animate-in fade-in-0 duration-500">
          <SummarizeContentForm />
        </TabsContent>

        <TabsContent value="qa" className="animate-in fade-in-0 duration-500">
          <AnswerQuestionForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
