import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { messageThreads as initialThreads, detailedMessages as initialMessages, ConversationThread, Message } from '@/data/MockMessages';
import { toast } from 'sonner';

// NEW: Simulate a user database that we can look up emails in.
// In a real app, this would be an API call.
const mockUserDatabase = [
  { email: 'elara@example.com', name: 'Elara Vance' },
  { email: 'liam@example.com', name: 'Liam Sterling' },
  { email: 'chloe@example.com', name: 'Chloe Decker' },
];

type AllMessages = { [key: number]: Message[] };

interface MessagesContextType {
  threads: ConversationThread[];
  setThreads: React.Dispatch<React.SetStateAction<ConversationThread[]>>;
  selectedConversation: ConversationThread | null;
  conversationMessages: Message[];
  setSelectedConversation: (conversation: ConversationThread | null) => void;
  // FIX: Signature updated to remove 'name'
  handleCreateConversation: (email: string, subject: string, body: string) => void;
  handleSendMessage: (content: string, attachment?: any) => void;
  handleEditMessage: (messageId: string, newContent: string) => void;
  handleDeleteMessage: (messageId: string) => void;
  handleAddReaction: (messageId: string, emoji: string) => void;
  replyTo: Message | null;
  setReplyTo: React.Dispatch<React.SetStateAction<Message | null>>;
  findMessageById: (id: string) => Message | undefined;
}

const MessagesContext = createContext<MessagesContextType | undefined>(undefined);

export const MessagesProvider = ({ children }: { children: ReactNode }) => {
  const [threads, setThreads] = useState<ConversationThread[]>(initialThreads);
  const [messages, setMessages] = useState<AllMessages>(initialMessages);
  const [selectedConversation, setSelectedConversation] = useState<ConversationThread | null>(null);
  const [conversationMessages, setConversationMessages] = useState<Message[]>([]);
  const [replyTo, setReplyTo] = useState<Message | null>(null);

  useEffect(() => {
    if (selectedConversation) {
      setConversationMessages(messages[selectedConversation.id] || []);
    } else {
      setConversationMessages([]);
    }
  }, [selectedConversation, messages]);

  const handleSelectConversation = (conversation: ConversationThread) => {
    setSelectedConversation(conversation);
    setReplyTo(null); 

    // Mark as read logic
    const threadIndex = threads.findIndex(t => t.id === conversation.id);
    if (threadIndex !== -1 && threads[threadIndex].unread) {
      const updatedThreads = [...threads];
      updatedThreads[threadIndex].unread = false;
      setThreads(updatedThreads);
    }
  };

  // FIX: The core logic is updated here.
  const handleCreateConversation = (email: string, subject: string, body: string) => {
    // 1. Look up the recipient's name from our "database".
    const foundUser = mockUserDatabase.find(user => user.email.toLowerCase() === email.toLowerCase());
    
    // 2. If found, use their name. If not, use their email as the name.
    const recipientName = foundUser ? foundUser.name : email;

    const newThreadId = Date.now();
    const newTimestamp = new Date().toISOString();

    // 3. Create the new conversation thread using the looked-up or fallback name.
    const newThread: ConversationThread = {
      id: newThreadId,
      name: recipientName, // Add name property
      sender: recipientName, // Use the determined name
      email: email,
      subject: subject,
      preview: body.substring(0, 50) + '...',
      timestamp: newTimestamp,
      lastMessage: body,
      unreadCount: 0,
      initials: recipientName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase(), // Use it for initials too
      avatar: 'bg-gray-400', 
      unread: false,
      archive: false,
      starred: false,
    };

    const newMessage: Message = {
      id: (Date.now() + 1).toString(),
      sender: 'You',
      text: body,
      content: body,
      timestamp: new Date(),
      read: true,
      isFromContact: false,
    };

    setThreads(prev => [newThread, ...prev]);
    setMessages(prev => ({
      ...prev,
      [newThreadId]: [newMessage],
    }));
    setSelectedConversation(newThread);
  };
  

  const findMessageById = (id: string) => conversationMessages.find(m => m.id === id);
  
  const handleSendMessage = (content: string, attachment?: any) => {
    if (!selectedConversation) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'You',
      text: content,
      content,
      timestamp: new Date(),
      read: true,
      isFromContact: false,
      ...(replyTo && { replyTo }),
      ...(attachment && { attachment }),
    };
    
    // FIX: Update the global `messages` state, not the local `conversationMessages`
    setMessages(prev => ({
      ...prev,
      [selectedConversation.id]: [...(prev[selectedConversation.id] || []), newMessage]
    }));

    setReplyTo(null);
  };
  
  const handleEditMessage = (messageId: string, newContent: string) => {
    if (!selectedConversation) return;
    setMessages(prev => ({
        ...prev,
        [selectedConversation.id]: prev[selectedConversation.id].map(msg => 
            msg.id === messageId ? { ...msg, text: newContent, content: newContent, isEdited: true } : msg
        )
    }));
    toast.info("Message Edited");
  };

  const handleDeleteMessage = (messageId: string) => {
    if (!selectedConversation) return;
    setMessages(prev => ({
        ...prev,
        [selectedConversation.id]: prev[selectedConversation.id].filter(msg => msg.id !== messageId)
    }));
    toast.error("Message Deleted");
  };

  const handleAddReaction = (messageId: string, emoji: string) => {
    if (!selectedConversation) return;
    setMessages(prev => ({
        ...prev,
        [selectedConversation.id]: prev[selectedConversation.id].map(msg => {
            if (msg.id === messageId) {
                const reactions = msg.reactions || [];
                const existingReaction = reactions.find(r => r.emoji === emoji);
                
                let newReactions: Array<{ emoji: string; count: number }>;
                if (existingReaction) {
                  // Remove reaction if it exists
                  newReactions = reactions.filter(r => r.emoji !== emoji);
                } else {
                  // Add new reaction
                  newReactions = [...reactions, { emoji, count: 1 }];
                }
                return { ...msg, reactions: newReactions };
            }
            return msg;
        })
    }));
  };

  return (
    <MessagesContext.Provider value={{
      threads,
      setThreads,
      selectedConversation,
      conversationMessages,
      setSelectedConversation: handleSelectConversation, // Use the handler here
      handleCreateConversation, // Expose the new function
      handleSendMessage,
      handleEditMessage,
      handleDeleteMessage,
      handleAddReaction,
      replyTo,
      setReplyTo,
      findMessageById,
    }}>
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessages = () => {
  const context = useContext(MessagesContext);
  if (context === undefined) {
    throw new Error('useMessages must be used within a MessagesProvider');
  }
  return context;
};