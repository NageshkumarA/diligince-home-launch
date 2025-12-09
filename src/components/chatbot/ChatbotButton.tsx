import React from 'react';
import { MessageCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatbotButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export const ChatbotButton: React.FC<ChatbotButtonProps> = ({ isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "fixed z-50 bottom-6 right-6",
        "w-14 h-14 rounded-full",
        "bg-gradient-to-br from-brand-primary to-brand-primary/90",
        "text-white shadow-lg",
        "flex items-center justify-center",
        "transition-all duration-300 ease-out",
        // Hover effects
        "hover:scale-105",
        "hover:shadow-[0_0_25px_rgba(21,59,96,0.5)]",
        // Active state
        "active:scale-95",
        // Mobile adjustments
        "max-sm:bottom-4 max-sm:right-4 max-sm:w-12 max-sm:h-12",
        // Pulse animation when closed
        !isOpen && "animate-pulse-subtle"
      )}
      aria-label={isOpen ? "Close chat" : "Open chat"}
    >
      <div className={cn(
        "transition-transform duration-300",
        isOpen && "rotate-90"
      )}>
        {isOpen ? (
          <X className="w-6 h-6 max-sm:w-5 max-sm:h-5" />
        ) : (
          <MessageCircle className="w-6 h-6 max-sm:w-5 max-sm:h-5" />
        )}
      </div>
      
      {/* Glow Ring */}
      {!isOpen && (
        <div className="absolute inset-0 rounded-full bg-brand-primary/30 animate-ping opacity-75" 
             style={{ animationDuration: '3s' }} />
      )}
    </button>
  );
};
