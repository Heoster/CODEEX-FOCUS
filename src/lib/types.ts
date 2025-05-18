
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
  topics: number; // Aggregate count, ideally managed by Cloud Functions or server-side logic
  posts: number;  // Aggregate count, ideally managed by Cloud Functions or server-side logic
}

export interface Topic {
  id: string; // Document ID from Firestore
  categoryId: string; // Links to a ForumCategory document ID
  title: string;
  content: string; // Content of the first/original post
  authorId: string; // User ID of the topic creator
  authorName: string; // Display name of the topic creator
  createdAt: Timestamp; // Firestore Timestamp for topic creation
  lastActivityAt: Timestamp; // Firestore Timestamp, updated on new reply or topic creation
  replyCount: number; // Number of replies to this topic
  // Optional fields you might add later:
  // viewCount?: number;
  // isPinned?: boolean;
  // isLocked?: boolean;
  // tags?: string[];
}

export interface Post {
  id: string; // Document ID from Firestore (for the reply itself)
  topicId: string; // ID of the parent Topic document
  authorId: string; // User ID of the post author
  authorName: string; // Display name of the post author
  content: string; // Content of the post (Markdown or plain text)
  createdAt: Timestamp; // Firestore Timestamp for post creation
  updatedAt?: Timestamp; // Firestore Timestamp, if post editing is allowed
  // Optional fields:
  // reactions?: { [emoji: string]: string[] }; // UIDs of users who reacted
}

