
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, Search, Filter, Clock, Paperclip } from "lucide-react";
import { Input } from "@/components/ui/input";

const messages = [
  {
    id: 1,
    sender: "Chem Industries",
    initials: "CI",
    message: "Please confirm the shipping tracking number for PO #12456...",
    timestamp: "10:42 AM",
    priority: "high",
    color: "green",
    unread: true,
    type: "order-inquiry",
    orderId: "PO-12456",
    attachments: []
  },
  {
    id: 2,
    sender: "Power Gen Co.",
    initials: "PG",
    message: "When can we expect the VFD-75 drives to be in stock again?...",
    timestamp: "Yesterday",
    priority: "medium",
    color: "blue",
    unread: true,
    type: "stock-inquiry",
    attachments: []
  },
  {
    id: 3,
    sender: "Steel Plant Ltd.",
    initials: "SP",
    message: "We need to expedite delivery of the boiler spare parts package...",
    timestamp: "2d ago",
    priority: "urgent",
    color: "orange",
    unread: false,
    type: "urgent-request",
    attachments: []
  },
  {
    id: 4,
    sender: "AutoParts Ltd.",
    initials: "AP",
    message: "Do you have calibration certificates for the pressure sensors?...",
    timestamp: "3d ago",
    priority: "medium",
    color: "pink",
    unread: false,
    type: "technical-inquiry",
    attachments: ["calibration_cert.pdf"]
  }
];

export const MessageCenter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "medium":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "order-inquiry":
        return "Order";
      case "stock-inquiry":
        return "Stock";
      case "urgent-request":
        return "Urgent";
      case "technical-inquiry":
        return "Technical";
      default:
        return "General";
    }
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "all" || 
                         (selectedFilter === "unread" && message.unread) ||
                         (selectedFilter === "urgent" && (message.priority === "urgent" || message.priority === "high"));
    return matchesSearch && matchesFilter;
  });

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Messages Center
            {messages.filter(m => m.unread).length > 0 && (
              <Badge variant="destructive" className="ml-2">
                {messages.filter(m => m.unread).length}
              </Badge>
            )}
          </CardTitle>
          <Button variant="outline" size="sm">
            View All Messages
          </Button>
        </div>
        
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-1">
            <Button
              variant={selectedFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter("all")}
            >
              All
            </Button>
            <Button
              variant={selectedFilter === "unread" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter("unread")}
            >
              Unread
            </Button>
            <Button
              variant={selectedFilter === "urgent" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter("urgent")}
            >
              Urgent
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredMessages.map((message) => (
            <div
              key={message.id}
              className={`p-4 rounded-lg border transition-colors hover:bg-gray-50 cursor-pointer ${
                message.unread ? "bg-blue-50 border-blue-200" : "bg-white"
              }`}
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
                      <Badge variant="outline" className="text-xs">
                        {getTypeLabel(message.type)}
                      </Badge>
                      <Badge className={getPriorityColor(message.priority)}>
                        {message.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      {message.timestamp}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-700 line-clamp-2 mb-2">
                    {message.message}
                  </p>
                  
                  {message.attachments.length > 0 && (
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Paperclip className="h-3 w-3" />
                      <span>{message.attachments.length} attachment(s)</span>
                    </div>
                  )}
                </div>
                
                {message.unread && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <Button className="w-full mt-4 bg-[#faad14] hover:bg-[#faad14]/90">
          View All Messages
        </Button>
      </CardContent>
    </Card>
  );
};
