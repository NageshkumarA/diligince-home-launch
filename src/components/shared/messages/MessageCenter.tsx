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
  filters: Array<{
    key: string;
    label: string;
  }>;
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
        return "bg-red-100 text-red-800 border-red-200";
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  const getTypeLabel = (type: string) => {
    return config.messageTypes[type]?.label || type.replace("-", " ");
  };
  const getTypeIcon = (type: string) => {
    return config.messageTypes[type]?.icon || "💬";
  };
  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.sender.toLowerCase().includes(searchTerm.toLowerCase()) || message.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "all" || selectedFilter === "unread" && message.unread || selectedFilter === "urgent" && (message.priority === "urgent" || message.priority === "high") || message.type === selectedFilter;
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
  return <Card className={`bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-purple-600" />
            {config.title}
            {unreadCount > 0 && <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                {unreadCount} unread
              </Badge>}
          </CardTitle>
          <Button variant="outline" size="sm" className="border-purple-200 text-blue-50 bg-pink-700 hover:bg-pink-600">
            View All Messages
          </Button>
        </div>
        
        {config.showSearch && <div className="flex gap-2 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Search messages..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 border-gray-200 focus:border-purple-300 focus:ring-purple-200 bg-gray-50" />
            </div>
            
            {config.showFilters && <div className="flex gap-1">
                {config.filters.map(filter => <Button key={filter.key} variant={selectedFilter === filter.key ? "default" : "outline"} size="sm" onClick={() => handleFilterChange(filter.key)} className={selectedFilter === filter.key ? "bg-purple-600 hover:bg-purple-700 text-white" : "border-gray-200 text-gray-600 hover:bg-gray-50"}>
                    {filter.label}
                  </Button>)}
              </div>}
          </div>}
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredMessages.map(message => <div key={message.id} className={`p-4 rounded-lg border transition-colors hover:bg-gray-50 cursor-pointer bg-white ${message.unread ? "border-purple-200 bg-purple-50" : "border-gray-200"} ${selectedMessage?.id === message.id ? "ring-2 ring-purple-400" : ""}`} onClick={() => setSelectedMessage(message)}>
              <div className="flex items-start gap-3">
                <Avatar className={`h-10 w-10 bg-${message.color}-100`}>
                  <AvatarFallback className={`text-${message.color}-600 text-sm font-medium`}>
                    {message.initials}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-gray-900 font-normal text-xl">{message.sender}</h4>
                      <span className="text-lg">{getTypeIcon(message.type)}</span>
                      <Badge variant="outline" className="text-xs border-gray-200 text-gray-600">
                        {getTypeLabel(message.type)}
                      </Badge>
                      <Badge className={getPriorityColor(message.priority)}>
                        {message.priority}
                      </Badge>
                      {message.unread && <div className="w-2 h-2 bg-purple-500 rounded-full"></div>}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      {message.timestamp}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-700 line-clamp-2 mb-2">
                    {message.message}
                  </p>
                  
                  {message.attachments && message.attachments.length > 0 && <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                      <Paperclip className="h-3 w-3" />
                      <span>{message.attachments.length} attachment(s)</span>
                    </div>}

                  {selectedMessage?.id === message.id && config.showReply && <div className="mt-3 pt-3 border-t border-gray-200 space-y-3">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 border-purple-200 text-purple-600 hover:bg-purple-50">
                          <Reply className="h-4 w-4 mr-2" />
                          Reply
                        </Button>
                        {config.showCallActions && <>
                            <Button variant="outline" size="sm" className="border-gray-200 text-gray-600 hover:bg-gray-50">
                              <Phone className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="border-gray-200 text-gray-600 hover:bg-gray-50">
                              <Video className="h-4 w-4" />
                            </Button>
                          </>}
                      </div>
                      
                      <div className="space-y-2">
                        <Textarea placeholder="Type your reply..." value={replyText} onChange={e => setReplyText(e.target.value)} className="min-h-[80px] border-gray-200 focus:border-purple-300 focus:ring-purple-200" />
                        <div className="flex gap-2">
                          <Button onClick={handleReply} className="bg-purple-600 hover:bg-purple-700 text-white" disabled={!replyText.trim()}>
                            <Send className="h-4 w-4 mr-2" />
                            Send Reply
                          </Button>
                          <Button variant="outline" onClick={() => setSelectedMessage(null)} className="border-gray-200 text-gray-600 hover:bg-gray-50">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>}
                </div>
              </div>
            </div>)}
        </div>
        
        <Button className="w-full mt-4 text-white bg-pink-700 hover:bg-pink-600">
          <MessageSquare className="h-4 w-4 mr-2" />
          View All Messages
        </Button>
      </CardContent>
    </Card>;
};