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
        <div className="absolute top-0 right-0 w-24 h-24 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
      </div>
      
      {/* Content */}
      <div className="relative flex items-center justify-between px-3 py-2.5">
        <div className="flex items-center gap-2.5">
          {/* Bot Avatar */}
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Bot className="w-4.5 h-4.5 text-white" />
            </div>
            {/* Online Indicator */}
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-brand-primary" />
          </div>
          
          {/* Title */}
          <div>
            <div className="flex items-center gap-1">
              <h3 className="text-white font-semibold text-sm">Diligince AI</h3>
              <Sparkles className="w-3 h-3 text-amber-300" />
            </div>
            <p className="text-white/60 text-[10px]">Procurement Assistant</p>
          </div>
        </div>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 
                     flex items-center justify-center transition-colors"
        >
          <X className="w-3.5 h-3.5 text-white" />
        </button>
      </div>
    </div>
  );
};
