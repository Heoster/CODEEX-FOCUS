
import type { Timestamp } from 'firebase/firestore';

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

// Updated types for Forums
export interface ForumCategory {
  id: string; // Document ID from Firestore
  name: string;
  description: string;
  iconName: string;
  topics: number; // Placeholder for topic count, managed in Firestore document
  posts: number;  // Placeholder for post count, managed in Firestore document
}

export interface Topic {
  id: string; // Document ID from Firestore
  categoryId: string;
  title: string;
  content: string; // Content of the first post
  authorId: string; // User ID
  authorName: string; // User display name
  createdAt: Timestamp; // Firestore Timestamp
  lastActivityAt: Timestamp; // Firestore Timestamp, updated on new reply
  replyCount: number;
  // viewCount?: number; // Optional
  // isPinned?: boolean; // Optional
  // isLocked?: boolean; // Optional
}

export interface Post {
  id: string; // Document ID from Firestore
  topicId: string;
  authorId: string;
  authorName: string;
  content: string; // Markdown or plain text
  createdAt: Timestamp; // Firestore Timestamp
  updatedAt?: Timestamp; // Firestore Timestamp
}
