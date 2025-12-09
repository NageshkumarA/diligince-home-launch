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
          "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center",
          isUser 
            ? "bg-brand-primary text-white" 
            : "bg-brand-primary/10"
        )}
      >
        {isUser ? (
          <User className="w-3 h-3" />
        ) : (
          <Bot className="w-3 h-3 text-brand-primary" />
        )}
      </div>
      
      {/* Message Bubble */}
      <div 
        className={cn(
          "max-w-[85%] rounded-xl px-2.5 py-1.5",
          isUser 
            ? "bg-brand-primary text-white rounded-tr-sm" 
            : "bg-muted text-foreground rounded-tl-sm"
        )}
      >
        {isUser ? (
          <p className="text-xs leading-relaxed whitespace-pre-wrap">{message.content}</p>
        ) : (
          <div className="prose prose-xs max-w-none dark:prose-invert 
                          prose-headings:text-foreground prose-headings:font-semibold prose-headings:leading-tight
                          prose-h1:text-xs prose-h1:mt-2 prose-h1:mb-1
                          prose-h2:text-xs prose-h2:mt-1.5 prose-h2:mb-1
                          prose-h3:text-[11px] prose-h3:mt-1 prose-h3:mb-0.5
                          prose-p:text-foreground/90 prose-p:my-1 prose-p:leading-snug prose-p:text-xs
                          prose-strong:text-foreground prose-strong:font-semibold
                          prose-ul:my-1 prose-ul:pl-3 prose-li:my-0 prose-li:text-foreground/90 prose-li:text-xs prose-li:leading-snug
                          prose-ol:my-1 prose-ol:pl-3
                          prose-table:text-[10px] prose-th:px-1 prose-th:py-0.5 prose-td:px-1 prose-td:py-0.5
                          prose-blockquote:border-l-brand-primary prose-blockquote:bg-brand-primary/5 
                          prose-blockquote:py-0.5 prose-blockquote:px-1.5 prose-blockquote:rounded-r prose-blockquote:text-xs prose-blockquote:my-1
                          prose-code:bg-brand-primary/10 prose-code:px-1 prose-code:rounded prose-code:text-brand-primary prose-code:text-[10px]
                          prose-pre:bg-foreground/5 prose-pre:rounded-lg prose-pre:text-[10px] prose-pre:my-1">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        )}
        
        {/* Timestamp */}
        <p 
          className={cn(
            "text-[9px] mt-0.5 opacity-40",
            isUser ? "text-right" : "text-left"
          )}
        >
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
};
