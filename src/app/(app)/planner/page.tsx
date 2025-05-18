
import { PomodoroTimer } from '@/components/planner/PomodoroTimer';
import { StudyCalendar } from '@/components/planner/StudyCalendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function PlannerPage() {
  return (
    <div className="space-y-8 animate-in fade-in-0 slide-in-from-top-4 duration-500 ease-out">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Study Planner</h1>
        <p className="text-lg text-muted-foreground">Organize your study sessions and stay focused.</p>
      </div>
      
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <PomodoroTimer />
        </div>
        <div className="lg:col-span-2">
          <StudyCalendar />
        </div>
      </div>
    </div>
  );
}
