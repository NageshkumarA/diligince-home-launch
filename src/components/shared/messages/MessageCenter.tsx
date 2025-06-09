
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Search, Filter, Reply, Phone, Video, Clock, Paperclip, Send, MessageSquare } from "lucide-react";

export interface Message {
  id: number;
  sender: string;
  initials: string;
  message: string;
  timestamp: string;
  priority: string;
  color: string;
  unread: boolean;
  type: string;
  attachments?: string[];
  orderId?: string;
  projectId?: number;
  rfqId?: number;
}

export interface MessageTypeConfig {
  label: string;
  icon: string;
  color: string;
}

export interface MessageCenterConfig {
  title: string;
  theme: string;
  showSearch: boolean;
  showFilters: boolean;
  showReply: boolean;
  showCallActions: boolean;
  messageTypes: Record<string, MessageTypeConfig>;
  filters: Array<{ key: string; label: string }>;
}

interface MessageCenterProps {
  messages: Message[];
  config: MessageCenterConfig;
  onReply?: (messageId: number, reply: string) => void;
  onFilter?: (filterType: string) => void;
  className?: string;
}

export const MessageCenter = ({ 
  messages, 
  config, 
  onReply,
  onFilter,
  className = ""
}: MessageCenterProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState("");

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-orange-100 text-orange-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeLabel = (type: string) => {
    return config.messageTypes[type]?.label || type.replace("-", " ");
  };

  const getTypeIcon = (type: string) => {
    return config.messageTypes[type]?.icon || "💬";
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "all" || 
                         (selectedFilter === "unread" && message.unread) ||
                         (selectedFilter === "urgent" && (message.priority === "urgent" || message.priority === "high")) ||
                         message.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handleReply = () => {
    if (selectedMessage && replyText.trim() && onReply) {
      onReply(selectedMessage.id, replyText);
      setReplyText("");
      setSelectedMessage(null);
    }
  };

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    if (onFilter) {
      onFilter(filter);
    }
  };

  const unreadCount = messages.filter(m => m.unread).length;

  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            {config.title}
            {unreadCount > 0 && (
              <Badge className="bg-red-100 text-red-800">
                {unreadCount} unread
              </Badge>
            )}
          </CardTitle>
          <Button variant="outline" size="sm">
            View All Messages
          </Button>
        </div>
        
        {config.showSearch && (
          <div className="flex gap-2 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {config.showFilters && (
              <div className="flex gap-1">
                {config.filters.map((filter) => (
                  <Button
                    key={filter.key}
                    variant={selectedFilter === filter.key ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFilterChange(filter.key)}
                  >
                    {filter.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
        )}
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredMessages.map((message) => (
            <div
              key={message.id}
              className={`p-4 rounded-lg border transition-colors hover:bg-gray-50 cursor-pointer ${
                message.unread ? "bg-blue-50 border-blue-200" : "bg-white"
              } ${selectedMessage?.id === message.id ? "ring-2 ring-purple-400" : ""}`}
              onClick={() => setSelectedMessage(message)}
            >
              <div className="flex items-start gap-3">
                <Avatar className={`h-10 w-10 bg-${message.color}-100`}>
                  <AvatarFallback className={`text-${message.color}-600 text-sm font-medium`}>
                    {message.initials}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-gray-900">{message.sender}</h4>
                      <span className="text-lg">{getTypeIcon(message.type)}</span>
                      <Badge variant="outline" className="text-xs">
                        {getTypeLabel(message.type)}
                      </Badge>
                      <Badge className={getPriorityColor(message.priority)}>
                        {message.priority}
                      </Badge>
                      {message.unread && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      {message.timestamp}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-700 line-clamp-2 mb-2">
                    {message.message}
                  </p>
                  
                  {message.attachments && message.attachments.length > 0 && (
                    <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                      <Paperclip className="h-3 w-3" />
                      <span>{message.attachments.length} attachment(s)</span>
                    </div>
                  )}

                  {selectedMessage?.id === message.id && config.showReply && (
                    <div className="mt-3 pt-3 border-t space-y-3">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Reply className="h-4 w-4 mr-2" />
                          Reply
                        </Button>
                        {config.showCallActions && (
                          <>
                            <Button variant="outline" size="sm">
                              <Phone className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Video className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Textarea
                          placeholder="Type your reply..."
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          className="min-h-[80px]"
                        />
                        <div className="flex gap-2">
                          <Button 
                            onClick={handleReply}
                            className={`bg-${config.theme} hover:bg-${config.theme}/90`}
                            disabled={!replyText.trim()}
                          >
                            <Send className="h-4 w-4 mr-2" />
                            Send Reply
                          </Button>
                          <Button 
                            variant="outline" 
                            onClick={() => setSelectedMessage(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <Button className={`w-full mt-4 bg-${config.theme} hover:bg-${config.theme}/90`}>
          <MessageSquare className="h-4 w-4 mr-2" />
          View All Messages
        </Button>
      </CardContent>
    </Card>
  );
};
