import { OverviewCard } from '@/components/dashboard/OverviewCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ListChecks, CalendarClock, Brain, Award, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  // Mock data reset for new user
  const upcomingTasks = 0;
  const studySessionsToday = 0;
  const pointsEarned = 0;

  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-top-8 duration-700 ease-out">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome to CODEEX-FOCUS!</h1>
          <p className="text-muted-foreground">Here's your study overview for today.</p>
        </div>
        <Button asChild className="bg-primary hover:bg-primary/90">
          <Link href="/planner">Plan Your Day</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <OverviewCard
          title="Upcoming Tasks"
          value={upcomingTasks}
          icon={ListChecks}
          description="Tasks due soon"
        />
        <OverviewCard
          title="Study Sessions Today"
          value={studySessionsToday}
          icon={CalendarClock}
          description="Scheduled for today"
        />
        <OverviewCard
          title="Points Earned"
          value={pointsEarned}
          icon={Award}
          description="Keep up the great work!"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="shadow-lg hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 ease-in-out">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-primary" />
              CODEEX-FOCUS AI Assistant
            </CardTitle>
            <CardDescription>Get instant help with your studies.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <p>Need a study plan, content summary, or quick answers? CODEEX-FOCUS AI is here to help you learn smarter.</p>
            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
              <Link href="/ai-assistant">Ask CODEEX-FOCUS AI</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 ease-in-out">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-accent" />
              Daily Motivation
            </CardTitle>
            <CardDescription>Stay inspired on your learning journey.</CardDescription>
          </CardHeader>
          <CardContent>
            <blockquote className="border-l-4 border-accent pl-4 italic text-muted-foreground">
              "The secret of getting ahead is getting started." - Mark Twain
            </blockquote>
             <Button asChild variant="link" className="mt-2 p-0 text-accent hover:text-accent/80">
              <Link href="/rewards">View Achievements</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
