
import React, { useState } from "react";
import VendorHeader from "@/components/vendor/VendorHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Send, Paperclip, Phone, Video, MoreVertical, Star, Archive, Filter, MessageSquare } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ServiceVendorMessages = () => {
  const [selectedConversation, setSelectedConversation] = useState("1");
  const [messageText, setMessageText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock conversations data
  const conversations = [
    {
      id: "1",
      name: "RetailMax Inc.",
      avatar: "RM",
      lastMessage: "Thanks for the project update. When can we schedule the next milestone review?",
      timestamp: "2 min ago",
      unread: 2,
      online: true,
      type: "client",
      project: "E-commerce Platform"
    },
    {
      id: "2",
      name: "TechStartup Pro",
      avatar: "TS",
      lastMessage: "The brand guidelines look great! Just a few minor adjustments needed.",
      timestamp: "1 hour ago",
      unread: 0,
      online: false,
      type: "client",
      project: "Brand Identity"
    },
    {
      id: "3",
      name: "Project Team - Marketing",
      avatar: "PT",
      lastMessage: "Lisa: I've completed the social media content calendar",
      timestamp: "3 hours ago",
      unread: 1,
      online: true,
      type: "team",
      project: "Digital Marketing Campaign"
    },
    {
      id: "4",
      name: "HealthPlus Solutions",
      avatar: "HP",
      lastMessage: "Can we discuss the campaign strategy for next quarter?",
      timestamp: "1 day ago",
      unread: 0,
      online: false,
      type: "client",
      project: "Marketing Campaign"
    }
  ];

  // Mock messages for selected conversation
  const messages = [
    {
      id: "1",
      sender: "RetailMax Inc.",
      senderAvatar: "RM",
      content: "Hi, how's the progress on the e-commerce platform development?",
      timestamp: "10:30 AM",
      type: "received"
    },
    {
      id: "2",
      sender: "You",
      senderAvatar: "TS",
      content: "Hello! We're making great progress. We've completed the user authentication system and are now working on the product catalog. We're on track to deliver the next milestone by Friday.",
      timestamp: "10:45 AM",
      type: "sent"
    },
    {
      id: "3",
      sender: "RetailMax Inc.",
      senderAvatar: "RM",
      content: "That sounds excellent! Can you send me the latest screenshots of the admin dashboard?",
      timestamp: "11:00 AM",
      type: "received"
    },
    {
      id: "4",
      sender: "You",
      senderAvatar: "TS",
      content: "Absolutely! I'll have our designer prepare the latest mockups and send them over by end of day.",
      timestamp: "11:15 AM",
      type: "sent"
    },
    {
      id: "5",
      sender: "RetailMax Inc.",
      senderAvatar: "RM",
      content: "Thanks for the project update. When can we schedule the next milestone review?",
      timestamp: "Just now",
      type: "received"
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "client": return "bg-blue-100 text-blue-700";
      case "team": return "bg-green-100 text-green-700";
      case "vendor": return "bg-purple-100 text-purple-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const selectedConv = conversations.find(c => c.id === selectedConversation);
  const unreadCount = conversations.filter(c => c.unread > 0).reduce((sum, c) => sum + c.unread, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <VendorHeader />
      
      <main className="pt-20 h-screen">
        <div className="h-full flex">
          {/* Conversations Sidebar */}
          <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-semibold text-gray-900">Messages</h1>
                {unreadCount > 0 && (
                  <Badge className="bg-yellow-600 hover:bg-yellow-700">
                    {unreadCount} unread
                  </Badge>
                )}
              </div>
              
              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search conversations..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Filter */}
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Filter conversations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Messages</SelectItem>
                  <SelectItem value="unread">Unread</SelectItem>
                  <SelectItem value="clients">Clients</SelectItem>
                  <SelectItem value="team">Team</SelectItem>
                  <SelectItem value="starred">Starred</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedConversation === conversation.id ? 'bg-yellow-50 border-l-4 border-l-yellow-600' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className={`h-10 w-10 ${conversation.online ? 'ring-2 ring-green-500' : ''}`}>
                        <AvatarFallback className="bg-yellow-100 text-yellow-700 font-medium">
                          {conversation.avatar}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.online && (
                        <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-gray-900 truncate">{conversation.name}</h3>
                        <div className="flex items-center gap-2">
                          {conversation.unread > 0 && (
                            <Badge className="bg-yellow-600 hover:bg-yellow-700 text-xs px-2">
                              {conversation.unread}
                            </Badge>
                          )}
                          <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getTypeColor(conversation.type)} variant="secondary">
                          {conversation.type}
                        </Badge>
                        <span className="text-xs text-gray-500">• {conversation.project}</span>
                      </div>
                      
                      <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedConv ? (
              <>
                {/* Chat Header */}
                <div className="p-4 bg-white border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-yellow-100 text-yellow-700 font-medium">
                        {selectedConv.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="font-semibold text-gray-900">{selectedConv.name}</h2>
                      <div className="flex items-center gap-2">
                        <Badge className={getTypeColor(selectedConv.type)} variant="secondary">
                          {selectedConv.type}
                        </Badge>
                        <span className="text-sm text-gray-500">• {selectedConv.project}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Star className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.type === 'sent' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.type === 'received' && (
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-yellow-100 text-yellow-700 text-sm">
                            {message.senderAvatar}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.type === 'sent' 
                          ? 'bg-yellow-600 text-white' 
                          : 'bg-white border border-gray-200'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.type === 'sent' ? 'text-yellow-100' : 'text-gray-500'
                        }`}>
                          {message.timestamp}
                        </p>
                      </div>

                      {message.type === 'sent' && (
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-yellow-600 text-white text-sm">
                            {message.senderAvatar}
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 bg-white border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Input
                      placeholder="Type your message..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      className="flex-1"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          console.log('Sending message:', messageText);
                          setMessageText('');
                        }
                      }}
                    />
                    <Button 
                      size="sm" 
                      className="bg-yellow-600 hover:bg-yellow-700"
                      onClick={() => {
                        console.log('Sending message:', messageText);
                        setMessageText('');
                      }}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <div className="mb-4">
                    <div className="h-16 w-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
                      <MessageSquare className="h-8 w-8 text-yellow-600" />
                    </div>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                  <p className="text-gray-500">Choose a conversation from the sidebar to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ServiceVendorMessages;
