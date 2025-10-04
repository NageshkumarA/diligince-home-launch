// Mock message data types and sample data

export interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
  read: boolean;
  type?: 'text' | 'file' | 'image';
  content?: string;
  isFromContact?: boolean;
  replyTo?: Message;
  isEdited?: boolean;
  reactions?: Array<{ emoji: string; count: number }>;
  attachment?: {
    name: string;
    url: string;
    type: string;
  };
  attachments?: Array<{
    name: string;
    url: string;
    type: string;
  }>;
}

export interface ConversationThread {
  id: number;
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  avatar?: string;
  initials: string;
  isArchived?: boolean;
  isPinned?: boolean;
  category?: 'vendor' | 'professional' | 'internal' | 'expert';
  email?: string;
  sender?: string;
  starred?: boolean;
  archive?: boolean;
  unread?: boolean;
  subject?: string;
  preview?: string;
}

// Sample conversation threads
export const messageThreads: ConversationThread[] = [
  {
    id: 1,
    name: "Elara Vance",
    lastMessage: "Thanks for the quick response!",
    timestamp: "2 min ago",
    unreadCount: 2,
    initials: "EV",
    category: 'vendor',
  },
  {
    id: 2,
    name: "Liam Sterling",
    lastMessage: "Can we schedule a call?",
    timestamp: "1 hour ago",
    unreadCount: 0,
    initials: "LS",
    category: 'professional',
  },
  {
    id: 3,
    name: "Chloe Decker",
    lastMessage: "Project update attached",
    timestamp: "Yesterday",
    unreadCount: 1,
    initials: "CD",
    category: 'expert',
  },
];

// Sample detailed messages for conversations
export const detailedMessages: { [key: number]: Message[] } = {
  1: [
    {
      id: "1",
      text: "Hello! I wanted to discuss the recent requirement.",
      sender: "Elara Vance",
      timestamp: new Date(Date.now() - 3600000),
      read: true,
    },
    {
      id: "2",
      text: "Sure, what would you like to know?",
      sender: "You",
      timestamp: new Date(Date.now() - 3500000),
      read: true,
    },
    {
      id: "3",
      text: "Thanks for the quick response!",
      sender: "Elara Vance",
      timestamp: new Date(Date.now() - 120000),
      read: false,
    },
  ],
  2: [
    {
      id: "4",
      text: "Hi, I reviewed the proposal.",
      sender: "Liam Sterling",
      timestamp: new Date(Date.now() - 7200000),
      read: true,
    },
    {
      id: "5",
      text: "Can we schedule a call?",
      sender: "Liam Sterling",
      timestamp: new Date(Date.now() - 3600000),
      read: true,
    },
  ],
  3: [
    {
      id: "6",
      text: "I've attached the latest project update.",
      sender: "Chloe Decker",
      timestamp: new Date(Date.now() - 86400000),
      read: false,
      type: 'file',
      attachments: [{
        name: 'project-update.pdf',
        url: '#',
        type: 'application/pdf',
      }],
    },
  ],
};
