'use client';

import type { Reward } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Star, Zap, Trophy, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


const mockBadges: Reward[] = [
  { id: '1', name: 'First Task Completed', description: 'You completed your first task!', icon: CheckCircle, achieved: true },
  { id: '2', name: 'Pomodoro Power', description: 'Completed 5 Pomodoro sessions.', icon: Star, achieved: true },
  { id: '3', name: 'Study Streak', description: 'Studied for 7 days in a row.', icon: Zap, achieved: false },
  { id: '4', name: 'AI Collaborator', description: 'Used Wikinet AI 10 times.', icon: Trophy, achieved: true },
  { id: '5', name: 'Early Bird', description: 'Completed a task before 8 AM.', icon: Clock, achieved: false },
  { id: '6', name: 'Note Taker Pro', description: 'Created 10 notes.', icon: CheckCircle, achieved: true },
];

export function BadgesDisplay() {
  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle>Your Badges</CardTitle>
        <CardDescription>Collect badges for your achievements and progress.</CardDescription>
      </CardHeader>
      <CardContent>
        {mockBadges.length === 0 ? (
           <p className="text-center text-muted-foreground">No badges earned yet. Keep up the good work!</p>
        ) : (
        <TooltipProvider>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {mockBadges.map((badge) => (
              <Tooltip key={badge.id}>
                <TooltipTrigger asChild>
                  <div
                    className={cn(
                      'flex flex-col items-center space-y-2 rounded-lg border p-4 text-center transition-all hover:shadow-md',
                      badge.achieved ? 'border-accent bg-accent/10' : 'border-border bg-muted/30 opacity-60'
                    )}
                  >
                    <badge.icon className={cn('h-12 w-12', badge.achieved ? 'text-accent' : 'text-muted-foreground')} />
                    <span className="text-xs font-medium text-foreground">{badge.name}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-semibold">{badge.name}</p>
                  <p className="text-sm text-muted-foreground">{badge.description}</p>
                  {!badge.achieved && <p className="text-xs text-destructive-foreground/80 bg-destructive/80 px-1 rounded-sm mt-1">Not yet achieved</p>}
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
        )}
      </CardContent>
    </Card>
  );
}
