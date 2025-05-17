'use client';

import { useState, type FormEvent } from 'react';
import type { Task } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlusCircle, Trash2, Edit3, GripVertical } from 'lucide-react';
import { Label } from '../ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from '../ui/dialog';

const initialTasks: Task[] = [
  { id: '1', text: 'Read Chapter 3 of Biology', completed: false, priority: 'high' },
  { id: '2', text: 'Complete Math homework Set 5', completed: true, priority: 'medium' },
  { id: '3', text: 'Prepare presentation for History class', completed: false, priority: 'high' },
  { id: '4', text: 'Review notes for Physics quiz', completed: false, priority: 'low' },
];

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<'low' | 'medium' | 'high'>('medium');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editText, setEditText] = useState('');
  const [editPriority, setEditPriority] = useState<'low' | 'medium' | 'high'>('medium');


  const handleAddTask = (e: FormEvent) => {
    e.preventDefault();
    if (newTaskText.trim() === '') return;
    const newTask: Task = {
      id: Date.now().toString(),
      text: newTaskText,
      completed: false,
      priority: newTaskPriority,
    };
    setTasks([newTask, ...tasks]);
    setNewTaskText('');
    setNewTaskPriority('medium');
  };

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };
  
  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setEditText(task.text);
    setEditPriority(task.priority);
    setIsModalOpen(true);
  };

  const handleEditTask = (e: FormEvent) => {
    e.preventDefault();
    if (!editingTask || editText.trim() === '') return;
    setTasks(tasks.map(task => 
      task.id === editingTask.id ? { ...task, text: editText, priority: editPriority } : task
    ));
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const getPriorityColor = (priority: 'low' | 'medium' | 'high') => {
    if (priority === 'high') return 'border-red-500 text-red-700';
    if (priority === 'medium') return 'border-yellow-500 text-yellow-700';
    return 'border-green-500 text-green-700';
  };

  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle>My Tasks</CardTitle>
        <CardDescription>Stay organized and keep track of your to-dos.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddTask} className="mb-6 flex items-center gap-3">
          <Input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="Add a new task..."
            className="flex-grow"
          />
          <Select value={newTaskPriority} onValueChange={(val: 'low' | 'medium' | 'high') => setNewTaskPriority(val)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit" className="bg-primary hover:bg-primary/90">
            <PlusCircle className="mr-2 h-5 w-5" /> Add
          </Button>
        </form>

        {tasks.length === 0 ? (
          <p className="text-center text-muted-foreground">No tasks yet. Add one above!</p>
        ) : (
          <ul className="space-y-3">
            {tasks.map((task) => (
              <li
                key={task.id}
                className={`flex items-center justify-between rounded-lg border p-3 shadow-sm transition-all hover:shadow-md ${
                  task.completed ? 'bg-muted/50 opacity-70' : 'bg-card'
                }`}
              >
                <div className="flex items-center gap-3">
                  <GripVertical className="h-5 w-5 cursor-grab text-muted-foreground" />
                  <Checkbox
                    id={`task-${task.id}`}
                    checked={task.completed}
                    onCheckedChange={() => toggleTaskCompletion(task.id)}
                    aria-label={`Mark task ${task.text} as ${task.completed ? 'incomplete' : 'complete'}`}
                  />
                  <label
                    htmlFor={`task-${task.id}`}
                    className={`flex-grow cursor-pointer ${
                      task.completed ? 'text-muted-foreground line-through' : 'text-foreground'
                    }`}
                  >
                    {task.text}
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 text-xs font-semibold rounded-full border ${getPriorityColor(task.priority)} bg-opacity-20 bg-current`}>
                    {task.priority}
                  </span>
                  <Button variant="ghost" size="icon" onClick={() => openEditModal(task)} aria-label={`Edit task ${task.text}`}>
                    <Edit3 className="h-4 w-4 text-blue-600" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => deleteTask(task.id)} aria-label={`Delete task ${task.text}`}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
      
      {editingTask && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
              <DialogDescription>Update your task details below.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleEditTask} className="space-y-4 py-2">
                <div>
                  <Label htmlFor="editText">Task Description</Label>
                  <Input id="editText" value={editText} onChange={(e) => setEditText(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="editPriority">Priority</Label>
                   <Select value={editPriority} onValueChange={(val: 'low' | 'medium' | 'high') => setEditPriority(val)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit" className="bg-primary hover:bg-primary/90">Save Changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
}
