
'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FocusForgeLogo } from '@/components/icons';
import {
  LayoutDashboard,
  CalendarDays,
  Brain,
  ListChecks,
  Award,
  Settings,
  Rocket,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface TourStep {
  title: string;
  content: React.ReactNode;
  icon?: LucideIcon;
}

const tourSteps: TourStep[] = [
  {
    title: 'Welcome to FocusForge!',
    icon: FocusForgeLogo,
    content: "Your ultimate digital companion for focused learning and productive planning. Let's take a quick tour of the main features.",
  },
  {
    title: 'Dashboard Overview',
    icon: LayoutDashboard,
    content: "This is your Dashboard. Get a quick glance at your upcoming tasks, scheduled study sessions, and points earned. It's your mission control for productivity!",
  },
  {
    title: 'Study Planner',
    icon: CalendarDays,
    content: 'Plan your studies effectively using the Study Planner. It features a Pomodoro Timer to help you stay focused during sessions and a calendar to schedule your study blocks.',
  },
  {
    title: 'Wikinet AI Assistant',
    icon: Brain,
    content: 'Meet Wikinet AI, your intelligent study partner. Use it to generate personalized study plans, get summaries of complex content, or ask subject-specific questions.',
  },
  {
    title: 'Tasks & Notes',
    icon: ListChecks,
    content: 'Manage your to-do lists and capture important thoughts, ideas, or lecture notes in the Tasks & Notes section. Keep everything organized in one convenient place.',
  },
  {
    title: 'Motivation & Rewards',
    icon: Award,
    content: 'Stay motivated by tracking your progress and earning badges for your achievements in the Rewards section. Gamify your learning journey and celebrate your successes!',
  },
  {
    title: 'Application Settings',
    icon: Settings,
    content: 'Customize your FocusForge experience in the Settings area. (More personalization options will be added soon!)',
  },
  {
    title: "You're All Set!",
    icon: Rocket,
    content: "You've completed the tour! We hope FocusForge helps you achieve your learning and productivity goals. Happy studying!",
  },
];

interface AppTourDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function AppTourDialog({ isOpen, onOpenChange }: AppTourDialogProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onOpenChange(false); // Finish tour
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const step = tourSteps[currentStep];
  const IconComponent = step.icon;

  const progressPercentage = ((currentStep + 1) / tourSteps.length) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      onOpenChange(open);
      if (!open) { // Reset to first step if dialog is closed
        setTimeout(() => setCurrentStep(0), 300); // Delay to allow close animation
      }
    }}>
      <DialogContent className="sm:max-w-lg p-0">
        <DialogHeader className="p-6 pb-4">
          <div className="flex items-center space-x-3 mb-3">
            {IconComponent && <IconComponent className="h-7 w-7 text-primary" />}
            <DialogTitle className="text-2xl font-semibold">{step.title}</DialogTitle>
          </div>
          <DialogDescription className="text-base text-muted-foreground">
            {step.content}
          </DialogDescription>
        </DialogHeader>
        
        <div className="px-6 pb-6 space-y-4">
            <Progress value={progressPercentage} className="w-full h-2" />
            <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                    Step {currentStep + 1} of {tourSteps.length}
                </span>
                <div className="flex space-x-2">
                {currentStep > 0 && (
                    <Button variant="outline" onClick={handlePrevious}>
                    <ChevronLeft className="mr-1 h-4 w-4" /> Previous
                    </Button>
                )}
                <Button onClick={handleNext} className="bg-primary hover:bg-primary/90">
                    {currentStep === tourSteps.length - 1 ? 'Finish Tour' : 'Next'}
                    {currentStep < tourSteps.length - 1 && <ChevronRight className="ml-1 h-4 w-4" />}
                </Button>
                </div>
            </div>
        </div>

        <DialogFooter className="p-6 pt-4 border-t bg-muted/50 sm:justify-start">
            <DialogClose asChild>
                <Button type="button" variant="ghost" onClick={() => {
                    onOpenChange(false);
                    setTimeout(() => setCurrentStep(0), 300);
                }}>
                Skip Tour
                </Button>
            </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
