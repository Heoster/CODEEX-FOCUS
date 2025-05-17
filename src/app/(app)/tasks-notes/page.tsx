import { TaskList } from '@/components/tasks-notes/TaskList';
import { NotesEditor } from '@/components/tasks-notes/NotesEditor';

export default function TasksNotesPage() {
  return (
    <div className="space-y-8 animate-in fade-in-0 slide-in-from-top-8 duration-700 ease-out">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Tasks & Notes</h1>
        <p className="text-muted-foreground">Manage your to-do list and capture your thoughts.</p>
      </div>
      
      <section id="tasks">
        <TaskList />
      </section>

      <section id="notes" className="mt-12">
        <NotesEditor />
      </section>
    </div>
  );
}
