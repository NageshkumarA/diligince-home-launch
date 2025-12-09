import React, { useState, useCallback, useEffect, useRef } from 'react';
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
  
  // Attention animation state
  const [hasBeenOpened, setHasBeenOpened] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
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
  
  // Attention animation cycle - runs until user opens chat
  useEffect(() => {
    // Don't run if chat is open or has been opened before
    if (isOpen || hasBeenOpened) {
      return;
    }
    
    const runAnimationCycle = () => {
      // Start shake animation
      setIsShaking(true);
      setShowBubble(true);
      
      // Stop shake after animation completes (0.6s)
      setTimeout(() => {
        setIsShaking(false);
      }, 600);
      
      // Hide bubble after 3 seconds
      animationTimeoutRef.current = setTimeout(() => {
        setShowBubble(false);
      }, 3000);
    };
    
    // Run first cycle after 5 seconds (give user time to notice the page)
    const initialDelay = setTimeout(runAnimationCycle, 5000);
    
    // Repeat every 8 seconds
    const interval = setInterval(runAnimationCycle, 8000);
    
    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, [isOpen, hasBeenOpened]);
  
  const handleToggle = useCallback(() => {
    if (!isOpen) {
      // User is opening the chat - stop animation permanently
      setHasBeenOpened(true);
      setShowBubble(false);
      setIsShaking(false);
    }
    setIsOpen(prev => !prev);
  }, [isOpen]);
  
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
      {/* Floating Button with attention animation */}
      <ChatbotButton 
        isOpen={isOpen} 
        onClick={handleToggle}
        isShaking={isShaking}
        showBubble={showBubble}
      />
      
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
