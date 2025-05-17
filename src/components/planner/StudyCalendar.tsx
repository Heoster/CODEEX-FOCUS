'use client';

import { useState, type FormEvent } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import type { StudySession } from '@/lib/types';
import { PlusCircle, Edit3, Trash2, CalendarDays } from 'lucide-react';
import { format } from 'date-fns';

export function StudyCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [studySessions, setStudySessions] = useState<StudySession[]>([]); // Made fresh
  const [currentSession, setCurrentSession] = useState<Partial<StudySession> | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDayClick = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const openAddSessionDialog = () => {
    setCurrentSession({ startTime: selectedDate || new Date(), endTime: selectedDate || new Date() });
    setIsDialogOpen(true);
  };

  const openEditSessionDialog = (session: StudySession) => {
    setCurrentSession(session);
    setIsDialogOpen(true);
  };

  const handleDeleteSession = (sessionId: string) => {
    setStudySessions(sessions => sessions.filter(s => s.id !== sessionId));
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const title = formData.get('title') as string;
    const subject = formData.get('subject') as string;
    const notes = formData.get('notes') as string;
    // Simplified date/time handling - in a real app, use proper date/time pickers
    const startTime = selectedDate ? new Date(selectedDate) : new Date(); 
    const endTime = selectedDate ? new Date(selectedDate) : new Date();
    // For demonstration, let's assume start and end times are the same day.
    // You might want to add time inputs for a real application.


    const sessionData: Partial<StudySession> = {
      title,
      subject,
      notes,
      startTime, 
      endTime, 
    };

    if (currentSession?.id) {
      setStudySessions(sessions => 
        sessions.map(s => s.id === currentSession.id ? { ...s, ...sessionData } as StudySession : s)
      );
    } else {
      setStudySessions(sessions => [
        ...sessions,
        { ...sessionData, id: Date.now().toString() } as StudySession,
      ]);
    }
    setIsDialogOpen(false);
    setCurrentSession(null);
  };
  
  const sessionsForSelectedDate = selectedDate
    ? studySessions.filter(session => 
        format(session.startTime, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
      )
    : [];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-1 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><CalendarDays className="h-6 w-6 text-primary"/> Select Date</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDayClick}
            className="rounded-md border"
          />
        </CardContent>
      </Card>

      <Card className="lg:col-span-2 shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Study Sessions</CardTitle>
            <CardDescription>
              {selectedDate ? `For ${format(selectedDate, 'PPP')}` : 'Select a date to see sessions'}
            </CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openAddSessionDialog} className="bg-primary hover:bg-primary/90" disabled={!selectedDate}>
                <PlusCircle className="mr-2 h-5 w-5" /> Add Session
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{currentSession?.id ? 'Edit' : 'Add'} Study Session for {selectedDate ? format(selectedDate, 'PPP') : ''}</DialogTitle>
                <DialogDescription>
                  Fill in the details for your study session.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleFormSubmit} className="space-y-4 py-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" name="title" defaultValue={currentSession?.title || ''} required />
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" name="subject" defaultValue={currentSession?.subject || ''} required />
                </div>
                {/* Add time inputs here if needed for more precise scheduling */}
                <div>
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea id="notes" name="notes" defaultValue={currentSession?.notes || ''} />
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit" className="bg-primary hover:bg-primary/90">{currentSession?.id ? 'Save Changes' : 'Add Session'}</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {sessionsForSelectedDate.length > 0 ? (
            <ul className="space-y-3">
              {sessionsForSelectedDate.map(session => (
                <li key={session.id} className="rounded-lg border p-4 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{session.title}</h3>
                      <p className="text-sm text-muted-foreground">{session.subject}</p>
                      {session.notes && <p className="mt-1 text-xs text-gray-600">{session.notes}</p>}
                    </div>
                    <div className="flex space-x-2">
                       <Button variant="ghost" size="icon" onClick={() => openEditSessionDialog(session)}>
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteSession(session.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {/* Placeholder for time - a real app needs proper time handling */}
                    Time: {format(session.startTime, 'p')} - {format(session.endTime, 'p')}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-muted-foreground">
              No study sessions scheduled for this day.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
