
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

// New types for Forums
export interface ForumCategory {
  id: string;
  name: string;
  description: string;
  iconName: string;
  topics: number; // Placeholder for topic count
  posts: number;  // Placeholder for post count
}

export interface Topic {
  id: string;
  categoryId: string;
  title: string;
  authorId: string; // User ID
  authorName: string; // User display name
  createdAt: Date;
  lastReplyAt?: Date;
  postCount: number;
  // viewCount?: number; // Optional
  // isPinned?: boolean; // Optional
  // isLocked?: boolean; // Optional
}

export interface Post {
  id:string;
  topicId: string;
  authorId: string;
  authorName: string;
  content: string; // Markdown or plain text
  createdAt: Date;
  updatedAt?: Date;
}
