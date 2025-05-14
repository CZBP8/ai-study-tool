export interface Document {
  id: string;
  name: string;
  type: string;
  content: string;
  dateAdded: Date;
  source: 'computer' | 'google-drive' | 'image' | 'video';
}

export interface ExternalResource {
  id: string;
  title: string;
  type: 'article' | 'book' | 'video' | 'course';
  url: string;
  description: string;
}

export interface MindMapNode {
  id: string;
  label: string;
  children?: MindMapNode[];
}

export interface NotebookPage {
  id: string;
  title: string;
  content: string;
  order: number;
}

export interface Notebook {
  id: string;
  documentId: string;
  pages: NotebookPage[];
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}