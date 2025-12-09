import React from 'react';
import { X, Bot, Sparkles } from 'lucide-react';

interface ChatbotHeaderProps {
  onClose: () => void;
}

export const ChatbotHeader: React.FC<ChatbotHeaderProps> = ({ onClose }) => {
  return (
    <div className="relative overflow-hidden rounded-t-2xl">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-primary via-brand-primary/95 to-brand-primary" />
      
      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
      </div>
      
      {/* Content */}
      <div className="relative flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Bot Avatar */}
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            {/* Online Indicator */}
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-brand-primary" />
          </div>
          
          {/* Title */}
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-white font-semibold text-sm">Diligince AI</h3>
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            </div>
            <p className="text-white/70 text-xs">Procurement Assistant</p>
          </div>
        </div>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 
                     flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
};
