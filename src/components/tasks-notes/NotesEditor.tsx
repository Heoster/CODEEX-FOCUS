'use client';

import { useState } from 'react';
import type { Note } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { PlusCircle, Save, Trash2, Edit3 } from 'lucide-react';
import { format } from 'date-fns';

const initialNotes: Note[] = [
  { id: '1', title: 'Lecture Recap - Quantum Physics', content: '# Quantum Entanglement\n\n- Key concepts:\n  - Superposition\n  - Non-locality\n\n## Experiments\n\n- Bell\'s theorem', createdAt: new Date(), updatedAt: new Date() },
  { id: '2', title: 'Project Ideas - AI Ethics', content: '# Brainstorming\n\n1. Bias in algorithms\n2. Autonomous decision making\n3. Privacy concerns with large language models', createdAt: new Date(), updatedAt: new Date() },
];


export function NotesEditor() {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [selectedNote, setSelectedNote] = useState<Note | null>(notes[0] || null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [currentContent, setCurrentContent] = useState(selectedNote?.content || '');

  const handleSelectNote = (note: Note) => {
    setSelectedNote(note);
    setCurrentContent(note.content);
    setIsCreatingNew(false);
  };

  const handleContentChange = (content: string) => {
    setCurrentContent(content);
    if (selectedNote && !isCreatingNew) {
      setNotes(notes.map(n => n.id === selectedNote.id ? { ...n, content, updatedAt: new Date() } : n));
      // In a real app, debounce this save operation
    }
  };
  
  const handleTitleChange = (title: string) => {
     if (selectedNote && !isCreatingNew) {
        setNotes(notes.map(n => n.id === selectedNote.id ? { ...n, title, updatedAt: new Date() } : n));
        setSelectedNote(prev => prev ? {...prev, title} : null);
     }
  }

  const handleSaveNewNote = () => {
    if (newNoteTitle.trim() === '') return;
    const newNote: Note = {
      id: Date.now().toString(),
      title: newNoteTitle,
      content: currentContent,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setNotes([newNote, ...notes]);
    setSelectedNote(newNote);
    setIsCreatingNew(false);
    setNewNoteTitle('');
  };

  const startNewNote = () => {
    setSelectedNote(null);
    setIsCreatingNew(true);
    setCurrentContent('');
    setNewNoteTitle('');
  };
  
  const deleteNote = (noteId: string) => {
    setNotes(notes.filter(n => n.id !== noteId));
    if (selectedNote?.id === noteId) {
      setSelectedNote(notes.length > 1 ? notes.filter(n => n.id !== noteId)[0] : null);
      setCurrentContent(notes.length > 1 ? notes.filter(n => n.id !== noteId)[0].content : '');
    }
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <Card className="md:col-span-1 shadow-xl h-fit">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>My Notes</CardTitle>
          <Button variant="ghost" size="icon" onClick={startNewNote}>
            <PlusCircle className="h-5 w-5 text-primary" />
          </Button>
        </CardHeader>
        <CardContent>
          {notes.length === 0 && !isCreatingNew ? (
             <p className="text-center text-muted-foreground">No notes yet. Create one!</p>
          ) : (
            <ul className="space-y-2">
              {notes.map(note => (
                <li key={note.id}>
                  <Button
                    variant={selectedNote?.id === note.id && !isCreatingNew ? 'secondary' : 'ghost'}
                    className={`w-full justify-start h-auto py-2 text-left ${selectedNote?.id === note.id && !isCreatingNew ? 'bg-secondary text-secondary-foreground' : ''}`}
                    onClick={() => handleSelectNote(note)}
                  >
                    <div className="flex flex-col">
                        <span className="font-medium">{note.title}</span>
                        <span className="text-xs text-muted-foreground">
                            Last updated: {format(note.updatedAt, 'MMM d, HH:mm')}
                        </span>
                    </div>
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <Card className="md:col-span-2 shadow-xl">
        <CardHeader>
          {isCreatingNew ? (
            <Input 
              placeholder="New Note Title" 
              value={newNoteTitle} 
              onChange={(e) => setNewNoteTitle(e.target.value)}
              className="text-xl font-semibold h-auto p-0 border-0 focus-visible:ring-0 shadow-none"
            />
          ) : selectedNote ? (
             <Input 
              value={selectedNote.title} 
              onChange={(e) => handleTitleChange(e.target.value)}
              className="text-xl font-semibold h-auto p-0 border-0 focus-visible:ring-0 shadow-none"
            />
          ) : (
            <CardTitle>Select or Create a Note</CardTitle>
          )}
          {selectedNote && !isCreatingNew && (
             <div className="flex items-center justify-between">
                <CardDescription>Last updated: {format(selectedNote.updatedAt, 'PPP p')}</CardDescription>
                <Button variant="ghost" size="icon" onClick={() => deleteNote(selectedNote.id)}>
                    <Trash2 className="h-4 w-4 text-destructive"/>
                </Button>
             </div>
          )}
        </CardHeader>
        <CardContent>
          {(selectedNote || isCreatingNew) ? (
            <Textarea
              placeholder="Start typing your markdown notes here..."
              value={currentContent}
              onChange={(e) => handleContentChange(e.target.value)}
              rows={15}
              className="text-base leading-relaxed"
            />
          ) : (
            <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed">
                <p className="text-muted-foreground">Select a note to view/edit or create a new one.</p>
            </div>
          )}
        </CardContent>
        {isCreatingNew && (
          <CardFooter>
            <Button onClick={handleSaveNewNote} className="bg-primary hover:bg-primary/90">
              <Save className="mr-2 h-5 w-5" /> Save Note
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
