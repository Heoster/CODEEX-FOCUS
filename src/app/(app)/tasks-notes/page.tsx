
import { TaskList } from '@/components/tasks-notes/TaskList';
import { NotesEditor } from '@/components/tasks-notes/NotesEditor';
import { Separator } from '@/components/ui/separator';
import { ListChecks, StickyNote } from 'lucide-react';

export default function TasksNotesPage() {
  return (
    <div className="space-y-8 animate-in fade-in-0 slide-in-from-top-4 duration-500 ease-out">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Tasks & Notes</h1>
        <p className="text-lg text-muted-foreground">Manage your to-do list and capture your thoughts.</p>
      </div>
      
      <section id="tasks" className="space-y-6">
        <div className="flex items-center gap-3">
            <ListChecks className="h-8 w-8 text-primary" />
            <h2 className="text-2xl font-semibold text-foreground">My Tasks</h2>
        </div>
        <TaskList />
      </section>

      <Separator className="my-12" />

      <section id="notes" className="space-y-6">
         <div className="flex items-center gap-3">
            <StickyNote className="h-8 w-8 text-primary" />
            <h2 className="text-2xl font-semibold text-foreground">My Notes</h2>
        </div>
        <NotesEditor />
      </section>
    </div>
  );
}
