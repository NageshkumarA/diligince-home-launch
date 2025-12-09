import React from 'react';
import { Bot } from 'lucide-react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-start gap-3 animate-fade-in">
      {/* Bot Avatar */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center">
        <Bot className="w-4 h-4 text-brand-primary" />
      </div>
      
      {/* Typing Dots */}
      <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
        <span 
          className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce"
          style={{ animationDelay: '0ms', animationDuration: '600ms' }}
        />
        <span 
          className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce"
          style={{ animationDelay: '150ms', animationDuration: '600ms' }}
        />
        <span 
          className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce"
          style={{ animationDelay: '300ms', animationDuration: '600ms' }}
        />
      </div>
    </div>
  );
};
