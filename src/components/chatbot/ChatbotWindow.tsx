import React from 'react';
import { ChatMessage } from './types';
import { ChatbotHeader } from './ChatbotHeader';
import { ChatMessageList } from './ChatMessageList';
import { ChatInput } from './ChatInput';
import { cn } from '@/lib/utils';
import { ChatWindowState } from './DiliginceChatbot';

interface ChatbotWindowProps {
  windowState: ChatWindowState;
  messages: ChatMessage[];
  isTyping: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onExpand: () => void;
  onSendMessage: (message: string) => void;
}

export const ChatbotWindow: React.FC<ChatbotWindowProps> = ({
  windowState,
  messages,
  isTyping,
  onClose,
  onMinimize,
  onExpand,
  onSendMessage,
}) => {
  if (windowState === 'closed') return null;
  
  const isMinimized = windowState === 'minimized';
  
  return (
    <div
      className={cn(
        "fixed z-50 flex flex-col",
        "bg-background border border-border rounded-2xl",
        "shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25),0_0_25px_-5px_rgba(21,59,96,0.15)]",
        // Position
        "bottom-24 right-6",
        // Mobile
        "max-sm:bottom-20 max-sm:right-3 max-sm:left-3 max-sm:w-auto",
        // Conditional sizing based on state
        isMinimized 
          ? "w-[280px] max-sm:w-[200px]" 
          : "w-[380px] h-[520px] max-sm:h-[450px]",
        // Smooth transition for minimize/expand
        "transition-all duration-300 ease-out",
        // Animation on initial open
        !isMinimized && "animate-scale-in origin-bottom-right"
      )}
    >
      {/* Header - always visible */}
      <ChatbotHeader 
        isMinimized={isMinimized}
        onClose={onClose}
        onMinimize={onMinimize}
        onExpand={onExpand}
      />
      
      {/* Messages & Input - hidden when minimized with smooth transition */}
      <div 
        className={cn(
          "flex flex-col flex-1 overflow-hidden transition-all duration-300",
          isMinimized ? "h-0 opacity-0" : "h-auto opacity-100"
        )}
      >
        <ChatMessageList 
          messages={messages}
          isTyping={isTyping}
          onSuggestedAction={onSendMessage}
        />
        
        <ChatInput 
          onSend={onSendMessage}
          disabled={isTyping}
        />
      </div>
    </div>
  );
};
