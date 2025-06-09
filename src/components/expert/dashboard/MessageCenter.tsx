
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Search, Filter, Reply, Phone, Video } from "lucide-react";

interface Message {
  id: number;
  sender: string;
  initials: string;
  message: string;
  timestamp: string;
  priority: string;
  color: string;
  unread: boolean;
  type: string;
}

interface MessageCenterProps {
  messages: Message[];
  onReply: (messageId: number, reply: string) => void;
}

export const MessageCenter = ({ messages, onReply }: MessageCenterProps) => {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMessages = messages.filter(message =>
    message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "project-update":
        return "🔧";
      case "job-response":
        return "💼";
      case "job-inquiry":
        return "❓";
      case "system-notification":
        return "🔔";
      default:
        return "💬";
    }
  };

  const handleReply = () => {
    if (selectedMessage && replyText.trim()) {
      onReply(selectedMessage.id, replyText);
      setReplyText("");
      setSelectedMessage(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg">Messages</CardTitle>
            <Badge variant="secondary" className="bg-red-100 text-red-800">
              {messages.filter(m => m.unread).length} unread
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              View All Messages
            </Button>
          </div>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredMessages.map((message) => (
            <div
              key={message.id}
              className={`border rounded-lg p-4 hover:shadow-md transition-all duration-200 cursor-pointer ${
                message.unread ? "bg-blue-50 border-blue-200" : "bg-white"
              } ${selectedMessage?.id === message.id ? "ring-2 ring-purple-400" : ""}`}
              onClick={() => setSelectedMessage(message)}
            >
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10 bg-gray-200">
                  <AvatarFallback className={`text-white text-sm bg-${message.color}-500`}>
                    {message.initials}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900 truncate">{message.sender}</h3>
                      <span className="text-lg">{getTypeIcon(message.type)}</span>
                      {message.unread && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getPriorityColor(message.priority)}>
                        {message.priority}
                      </Badge>
                      <span className="text-xs text-gray-500">{message.timestamp}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 line-clamp-2">{message.message}</p>
                  
                  {selectedMessage?.id === message.id && (
                    <div className="mt-3 pt-3 border-t space-y-3">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Reply className="h-4 w-4 mr-2" />
                          Reply
                        </Button>
                        <Button variant="outline" size="sm">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Video className="h-4 w-4" />
                        </Button>
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
                            className="bg-[#722ed1] hover:bg-[#722ed1]/90"
                            disabled={!replyText.trim()}
                          >
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
      </CardContent>
    </Card>
  );
};
