import React from 'react';
import { ChatMessage } from './types';
import { ChatbotHeader } from './ChatbotHeader';
import { ChatMessageList } from './ChatMessageList';
import { ChatInput } from './ChatInput';
import { cn } from '@/lib/utils';

interface ChatbotWindowProps {
  isOpen: boolean;
  messages: ChatMessage[];
  isTyping: boolean;
  onClose: () => void;
  onSendMessage: (message: string) => void;
}

export const ChatbotWindow: React.FC<ChatbotWindowProps> = ({
  isOpen,
  messages,
  isTyping,
  onClose,
  onSendMessage,
}) => {
  if (!isOpen) return null;
  
  return (
    <div
      className={cn(
        "fixed z-50 flex flex-col",
        "bg-background border border-border rounded-2xl",
        "shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25),0_0_25px_-5px_rgba(21,59,96,0.15)]",
        // Desktop
        "bottom-24 right-6 w-[380px] h-[520px]",
        // Mobile
        "max-sm:bottom-20 max-sm:right-3 max-sm:left-3 max-sm:w-auto max-sm:h-[450px]",
        // Animation
        "animate-scale-in origin-bottom-right"
      )}
    >
      {/* Header */}
      <ChatbotHeader onClose={onClose} />
      
      {/* Messages */}
      <ChatMessageList 
        messages={messages}
        isTyping={isTyping}
        onSuggestedAction={onSendMessage}
      />
      
      {/* Input */}
      <ChatInput 
        onSend={onSendMessage}
        disabled={isTyping}
      />
    </div>
  );
};
