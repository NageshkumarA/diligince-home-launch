
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Search, Send, Filter } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

const mockMessages = [
  {
    id: 1,
    sender: "Chem Industries",
    initials: "CI",
    message: "We need the weekly progress report for the SCADA project. Please send updated milestones and timeline.",
    timestamp: "10:42 AM",
    priority: "high",
    color: "green",
    unread: true,
    type: "project-update",
    projectId: 1,
    attachments: []
  },
  {
    id: 2,
    sender: "Power Gen Co.",
    initials: "PG",
    message: "When can your team be on-site for the panel installation testing? We need to coordinate with our maintenance team.",
    timestamp: "Yesterday",
    priority: "medium",
    color: "blue",
    unread: true,
    type: "project-inquiry",
    projectId: 2,
    attachments: []
  },
  {
    id: 3,
    sender: "Steel Plant Ltd.",
    initials: "SP",
    message: "We're reviewing your proposal for the control system upgrade. A few questions about the timeline and technical specifications.",
    timestamp: "2d ago",
    priority: "high",
    color: "orange",
    unread: false,
    type: "proposal-response",
    rfqId: 1,
    attachments: []
  },
  {
    id: 4,
    sender: "AutoParts Ltd.",
    initials: "AP",
    message: "Would your team be available for an on-site consultation next week? We have some technical challenges to discuss.",
    timestamp: "3d ago",
    priority: "medium",
    color: "pink",
    unread: false,
    type: "consultation-request",
    attachments: []
  }
];

export const MessageCenter = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [replyText, setReplyText] = useState("");

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-orange-100 text-orange-800";
      case "low":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "project-update":
        return "bg-blue-100 text-blue-800";
      case "proposal-response":
        return "bg-green-100 text-green-800";
      case "consultation-request":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredMessages = mockMessages.filter(message => {
    const matchesSearch = message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || message.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleReply = () => {
    toast({
      title: "Message Sent",
      description: `Your reply to ${selectedMessage?.sender} has been sent.`,
    });
    setReplyText("");
    setSelectedMessage(null);
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Messages
            {mockMessages.filter(m => m.unread).length > 0 && (
              <Badge className="bg-red-100 text-red-800">
                {mockMessages.filter(m => m.unread).length} unread
              </Badge>
            )}
          </CardTitle>
          <Button variant="outline" size="sm">
            View All Messages
          </Button>
        </div>
        
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
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border rounded-md text-sm"
          >
            <option value="all">All Types</option>
            <option value="project-update">Project Updates</option>
            <option value="proposal-response">Proposal Responses</option>
            <option value="consultation-request">Consultations</option>
          </select>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredMessages.map((message) => (
            <div 
              key={message.id} 
              className={`p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer ${
                message.unread ? "border-l-4 border-l-blue-500 bg-blue-50/30" : ""
              }`}
              onClick={() => setSelectedMessage(message)}
            >
              <div className="flex items-start gap-3">
                <Avatar className={`h-10 w-10 bg-${message.color}-100`}>
                  <AvatarFallback className={`text-${message.color}-600 text-sm`}>
                    {message.initials}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-gray-900">{message.sender}</h4>
                    <div className="flex items-center gap-2">
                      <Badge className={getPriorityColor(message.priority)}>
                        {message.priority}
                      </Badge>
                      <span className="text-xs text-gray-500">{message.timestamp}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-2 line-clamp-2">{message.message}</p>
                  
                  <div className="flex items-center justify-between">
                    <Badge className={getTypeColor(message.type)} variant="outline">
                      {message.type.replace("-", " ")}
                    </Badge>
                    {message.unread && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {selectedMessage && (
          <div className="mt-4 p-4 border rounded-lg bg-gray-50">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium">Reply to {selectedMessage.sender}</h4>
              <Button variant="ghost" size="sm" onClick={() => setSelectedMessage(null)}>
                ×
              </Button>
            </div>
            <Textarea
              placeholder="Type your reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              rows={3}
              className="mb-3"
            />
            <div className="flex gap-2">
              <Button 
                className="bg-[#fa8c16] hover:bg-[#fa8c16]/90" 
                onClick={handleReply}
                disabled={!replyText.trim()}
              >
                <Send className="h-4 w-4 mr-2" />
                Send Reply
              </Button>
              <Button variant="outline" onClick={() => setSelectedMessage(null)}>
                Cancel
              </Button>
            </div>
          </div>
        )}
        
        <Button className="w-full mt-4 bg-[#fa8c16] hover:bg-[#fa8c16]/90">
          <MessageSquare className="h-4 w-4 mr-2" />
          Open Full Inbox
        </Button>
      </CardContent>
    </Card>
  );
};
