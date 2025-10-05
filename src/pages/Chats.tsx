import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ChatList from '../components/ChatList';
import { MessageCircle, Send, Paperclip, Smile } from 'lucide-react';
import { isIndustryRole } from '@/utils/roleUtils';

const Chats: React.FC = () => {
  const { user } = useAuth();
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');

  // Mock chat data
  const isIndustry = isIndustryRole(user?.role);
  const mockChats = [
    {
      id: '1',
      name: isIndustry ? 'John Smith (Professional)' : 'Tech Solutions Inc.',
      role: isIndustry ? 'professional' as const : 'industry' as const,
      lastMessage: isIndustry ? "I'm interested in your mobile app project" : "Looking forward to working with you",
      timestamp: '2 min ago',
      unreadCount: 2,
      status: 'interested' as const
    },
    {
      id: '2',
      name: isIndustry ? 'Global Services Ltd. (Vendor)' : 'Innovation Corp.',
      role: isIndustry ? 'vendor' as const : 'industry' as const,
      lastMessage: isIndustry ? "Quotation sent for cloud infrastructure" : "When can we start the project?",
      timestamp: '1 hour ago',
      unreadCount: 0,
      status: 'quotation_sent' as const
    },
    {
      id: '3',
      name: isIndustry ? 'Sarah Johnson (Professional)' : 'StartupHub Inc.',
      role: isIndustry ? 'professional' as const : 'industry' as const,
      lastMessage: isIndustry ? "Can we schedule a call to discuss?" : "Project completed successfully",
      timestamp: '1 day ago',
      unreadCount: 1,
      status: 'negotiating' as const
    }
  ];

  const selectedChat = mockChats.find(chat => chat.id === selectedChatId);

  const mockMessages = [
    {
      id: '1',
      sender: selectedChat?.name.split(' ')[0] || 'User',
      message: isIndustry ? "I'm interested in your mobile app development project. I have 5+ years of experience in React Native." : "Thank you for your interest! Could you share your portfolio?",
      timestamp: '10:30 AM',
      isOwn: false
    },
    {
      id: '2',
      sender: 'You',
      message: isIndustry ? "Great! Could you share your portfolio and previous work examples?" : "Sure! Here's my portfolio link and some recent projects I've completed.",
      timestamp: '10:35 AM',
      isOwn: true
    },
    {
      id: '3',
      sender: selectedChat?.name.split(' ')[0] || 'User',
      message: isIndustry ? "Here's my portfolio: portfolio.example.com. I've worked on similar e-commerce apps." : "I'm available to start immediately. What's the timeline?",
      timestamp: '10:40 AM',
      isOwn: false
    }
  ];

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // In real app, send message to API
      console.log('Sending message:', messageText);
      setMessageText('');
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#333333] mb-2">Messages</h1>
        <p className="text-[#828282]">Communicate with {isIndustry ? 'professionals and vendors' : 'industries'} about your projects.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Chat List */}
        <div className="lg:col-span-1">
          <ChatList
            chats={mockChats}
            onChatSelect={setSelectedChatId}
            currentUserRole={isIndustry ? 'industry' : 'professional'}
          />
        </div>

        {/* Chat Window */}
        <div className="lg:col-span-2">
          {selectedChatId ? (
            <div className="bg-white rounded-xl shadow-sm border border-[#E0E0E0] h-full flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-[#E0E0E0]">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#2F80ED] to-[#27AE60] rounded-full flex items-center justify-center text-white font-medium">
                    {selectedChat?.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-medium text-[#333333]">{selectedChat?.name}</h3>
                    <p className="text-sm text-[#828282] capitalize">{selectedChat?.role}</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {mockMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.isOwn
                            ? 'bg-[#2F80ED] text-white'
                            : 'bg-[#FAFAFA] text-[#333333]'
                        }`}
                      >
                        <p className="text-sm">{message.message}</p>
                        <p className={`text-xs mt-1 ${message.isOwn ? 'text-blue-100' : 'text-[#828282]'}`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-[#E0E0E0]">
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-[#828282] hover:text-[#2F80ED] transition-colors">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type your message..."
                      className="w-full px-4 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F80ED] focus:border-transparent"
                    />
                  </div>
                  <button className="p-2 text-[#828282] hover:text-[#2F80ED] transition-colors">
                    <Smile className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleSendMessage}
                    className="bg-[#2F80ED] text-white p-2 rounded-lg hover:bg-[#1A2A4F] transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-[#E0E0E0] h-full flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="w-16 h-16 text-[#E0E0E0] mx-auto mb-4" />
                <h3 className="text-lg font-medium text-[#333333] mb-2">Select a conversation</h3>
                <p className="text-[#828282]">Choose a chat from the list to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chats;