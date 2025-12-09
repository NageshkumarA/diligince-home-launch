import React, { useState, useCallback, useEffect } from 'react';
import { ChatMessage } from './types';
// Switch between button variants by changing the import:
// import { ChatbotButton } from './ChatbotButton'; // Original solid button
import { ChatbotButtonGlass as ChatbotButton } from './ChatbotButtonGlass'; // Glassy button
import { ChatbotWindow } from './ChatbotWindow';
import { sendChatMessage, generateMessageId } from './chatbotService';

export const DiliginceChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  
  // Clear messages when window closes
  useEffect(() => {
    if (!isOpen) {
      // Small delay before clearing to allow animation
      const timer = setTimeout(() => {
        setMessages([]);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  
  const handleToggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);
  
  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);
  
  const handleSendMessage = useCallback(async (content: string) => {
    // Add user message
    const userMessage: ChatMessage = {
      id: generateMessageId(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    try {
      // Get AI response
      const response = await sendChatMessage(content, messages);
      
      // Add assistant message
      const assistantMessage: ChatMessage = {
        id: generateMessageId(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Failed to get chat response:', error);
      
      // Add error message
      const errorMessage: ChatMessage = {
        id: generateMessageId(),
        role: 'assistant',
        content: "I'm sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  }, [messages]);
  
  return (
    <>
      {/* Floating Button */}
      <ChatbotButton isOpen={isOpen} onClick={handleToggle} />
      
      {/* Chat Window */}
      <ChatbotWindow
        isOpen={isOpen}
        messages={messages}
        isTyping={isTyping}
        onClose={handleClose}
        onSendMessage={handleSendMessage}
      />
    </>
  );
};
