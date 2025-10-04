import React from 'react';
import { MessageCircle, Clock, CheckCircle2 } from 'lucide-react';

interface ChatItem {
  id: string;
  name: string;
  role: 'industry' | 'professional' | 'vendor';
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  status: 'interested' | 'quotation_sent' | 'negotiating' | 'completed';
  avatar?: string;
}

interface ChatListProps {
  chats: ChatItem[];
  onChatSelect: (chatId: string) => void;
  currentUserRole: 'industry' | 'professional' | 'vendor';
}

const ChatList: React.FC<ChatListProps> = ({ chats, onChatSelect, currentUserRole }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'interested': return 'text-blue-600 bg-blue-100';
      case 'quotation_sent': return 'text-orange-600 bg-orange-100';
      case 'negotiating': return 'text-purple-600 bg-purple-100';
      case 'completed': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'interested': return 'Interested';
      case 'quotation_sent': return 'Quotation Sent';
      case 'negotiating': return 'Negotiating';
      case 'completed': return 'Completed';
      default: return 'Active';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'industry': return 'text-[#2F80ED]';
      case 'professional': return 'text-[#27AE60]';
      case 'vendor': return 'text-[#F2994A]';
      default: return 'text-[#828282]';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#E0E0E0]">
      <div className="p-4 border-b border-[#E0E0E0]">
        <h3 className="text-lg font-semibold text-[#333333] flex items-center">
          <MessageCircle className="w-5 h-5 mr-2" />
          Active Conversations
        </h3>
      </div>
      
      <div className="divide-y divide-[#E0E0E0]">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onChatSelect(chat.id)}
            className="p-4 hover:bg-[#FAFAFA] cursor-pointer transition-colors"
          >
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#2F80ED] to-[#27AE60] rounded-full flex items-center justify-center text-white font-medium">
                {chat.name.charAt(0)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium text-[#333333] truncate">{chat.name}</h4>
                  <div className="flex items-center space-x-2">
                    {chat.unreadCount > 0 && (
                      <span className="bg-[#2F80ED] text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                        {chat.unreadCount}
                      </span>
                    )}
                    <span className="text-xs text-[#828282]">{chat.timestamp}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <p className="text-sm text-[#828282] truncate flex-1 mr-2">{chat.lastMessage}</p>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs capitalize ${getRoleColor(chat.role)}`}>
                      {chat.role}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(chat.status)}`}>
                      {getStatusText(chat.status)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {chats.length === 0 && (
        <div className="p-8 text-center">
          <MessageCircle className="w-12 h-12 text-[#E0E0E0] mx-auto mb-3" />
          <p className="text-[#828282]">No conversations yet</p>
          <p className="text-sm text-[#828282] mt-1">
            {currentUserRole === 'industry' && 'Professionals and vendors will appear here when they show interest'}
            {currentUserRole === 'professional' && 'Your conversations with industries will appear here'}
            {currentUserRole === 'vendor' && 'Your conversations with industries will appear here'}
          </p>
        </div>
      )}
    </div>
  );
};

export default ChatList;