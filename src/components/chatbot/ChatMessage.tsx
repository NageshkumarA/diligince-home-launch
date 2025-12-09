import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Bot, User } from 'lucide-react';
import { ChatMessage as ChatMessageType } from './types';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div 
      className={cn(
        "flex items-start gap-2 animate-fade-in",
        isUser && "flex-row-reverse"
      )}
    >
      {/* Avatar */}
      <div 
        className={cn(
          "flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center",
          isUser 
            ? "bg-brand-primary text-white" 
            : "bg-brand-primary/10"
        )}
      >
        {isUser ? (
          <User className="w-3.5 h-3.5" />
        ) : (
          <Bot className="w-3.5 h-3.5 text-brand-primary" />
        )}
      </div>
      
      {/* Message Bubble */}
      <div 
        className={cn(
          "max-w-[80%] rounded-2xl px-3 py-2",
          isUser 
            ? "bg-brand-primary text-white rounded-tr-sm" 
            : "bg-muted text-foreground rounded-tl-sm"
        )}
      >
        {isUser ? (
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        ) : (
          <div className="prose prose-sm max-w-none dark:prose-invert 
                          prose-headings:text-foreground prose-headings:font-semibold
                          prose-h2:text-[15px] prose-h2:mt-3 prose-h2:mb-1.5
                          prose-h3:text-sm prose-h3:mt-2 prose-h3:mb-1
                          prose-p:text-foreground/90 prose-p:my-1.5 prose-p:leading-relaxed prose-p:text-sm
                          prose-strong:text-foreground prose-strong:font-semibold
                          prose-ul:my-1.5 prose-ul:pl-3.5 prose-li:my-0.5 prose-li:text-foreground/90 prose-li:text-sm
                          prose-ol:my-1.5 prose-ol:pl-3.5
                          prose-table:text-xs prose-th:px-1.5 prose-th:py-0.5 prose-td:px-1.5 prose-td:py-0.5
                          prose-blockquote:border-l-brand-primary prose-blockquote:bg-brand-primary/5 
                          prose-blockquote:py-0.5 prose-blockquote:px-2 prose-blockquote:rounded-r prose-blockquote:text-sm
                          prose-code:bg-brand-primary/10 prose-code:px-1 prose-code:rounded prose-code:text-brand-primary prose-code:text-xs
                          prose-pre:bg-foreground/5 prose-pre:rounded-lg prose-pre:text-xs">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        )}
        
        {/* Timestamp */}
        <p 
          className={cn(
            "text-[10px] mt-1 opacity-50",
            isUser ? "text-right" : "text-left"
          )}
        >
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
};
