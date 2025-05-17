export interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
}

export interface StudySession {
  id: string;
  title: string;
  subject: string;
  startTime: Date;
  endTime: Date;
  notes?: string;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType; // Lucide icon component
  achieved: boolean;
}

export interface Note {
  id: string;
  title: string;
  content: string; // Markdown content
  createdAt: Date;
  updatedAt: Date;
}
