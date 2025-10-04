// src/components/industry/messages/ChatWindow.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useMessages } from './MessagesContext';
import { ChatHeader } from './ChatHeader';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';
import { SharedMediaTab } from './SharedMediaTab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// --- START: MODIFIED CODE ---
// Helper to format date label to mm/dd/yyyy
const getDateLabel = (dateStr: string): string => {
    const date = new Date(dateStr);
    // Using 'en-US' locale gives us the desired mm/dd/yyyy format.
    // This is a cleaner and more standard approach.
    return date.toLocaleDateString('en-GB', {
        day: '2-digit',   // e.g., '23'
       
         month: '2-digit', // e.g., '07'
         year: 'numeric',  // e.g., '2025'
        
    });
};
// --- END: MODIFIED CODE ---

export const ChatWindow = () => {
    const { conversationMessages } = useMessages();
    const [activeTab, setActiveTab] = useState("messages");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to the bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [conversationMessages]);

    // Simulate typing indicator
    useEffect(() => {
        if (
            conversationMessages.length > 0 &&
            conversationMessages[conversationMessages.length - 1].isFromContact === false
        ) {
            setIsTyping(true);
            const timer = setTimeout(() => setIsTyping(false), 2500);
            return () => clearTimeout(timer);
        }
    }, [conversationMessages]);

    return (
        <>
            <ChatHeader />
            <div className="flex flex-col h-full max-h-full overflow-hidden">
                {/* Tabs */}
                <div className="shrink-0 border-b border-gray-200 px-6 py-3">
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="bg-transparent p-0">
                            <TabsTrigger value="messages" className="text-sm">Messages</TabsTrigger>
                            <TabsTrigger value="media" className="text-sm">Shared Media & Files</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                {/* Content Area */}
                <div ref={containerRef} className="flex-1 overflow-y-auto p-6">
                    {activeTab === 'messages' && (
                        <div className="space-y-4">
                            {conversationMessages.length === 0 && (
                                <div className="text-gray-400 text-center mt-10">No messages yet</div>
                            )}

                            {(() => {
                                let lastDateLabel: string | null = null;
                                return conversationMessages.map(msg => {
                                    const currentDateLabel = getDateLabel(msg.timestamp);
                                    const showDateLabel = currentDateLabel !== lastDateLabel;
                                    lastDateLabel = currentDateLabel;

                                    return (
                                        <React.Fragment key={msg.id}>
                                            {showDateLabel && (
                                                <div className="text-center my-4">
                                                    <span className="inline-block bg-gray-200 text-gray-700 text-xs font-medium px-4 py-1 rounded-full">
                                                        {currentDateLabel}
                                                    </span>
                                                </div>
                                            )}
                                            <MessageBubble message={msg} />
                                        </React.Fragment>
                                    );
                                });
                            })()}

                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-gray-100 text-gray-500 px-4 py-2 rounded-lg text-sm">
                                        <span className="typing-indicator">
                                            <span>.</span><span>.</span><span>.</span>
                                        </span>
                                    </div>
                                </div>
                            )}
                            
                            <div ref={messagesEndRef} />
                        </div>
                    )}

                    {activeTab === 'media' && <SharedMediaTab />}
                </div>

                {/* Message Input */}
                {activeTab === 'messages' && (
                    <div className="shrink-0 p-4 border-t border-gray-200">
                        <MessageInput />
                    </div>
                )}
            </div>
        </>
    );
};