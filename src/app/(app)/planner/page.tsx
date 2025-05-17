import { PomodoroTimer } from '@/components/planner/PomodoroTimer';
import { StudyCalendar } from '@/components/planner/StudyCalendar';

export default function PlannerPage() {
  return (
    <div className="space-y-8 animate-in fade-in-0 slide-in-from-top-8 duration-700 ease-out">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Study Planner</h1>
        <p className="text-muted-foreground">Organize your study sessions and stay focused.</p>
      </div>
      
      <div className="flex flex-col items-center justify-center lg:items-start">
         <PomodoroTimer />
      </div>

      <StudyCalendar />
    </div>
  );
}
