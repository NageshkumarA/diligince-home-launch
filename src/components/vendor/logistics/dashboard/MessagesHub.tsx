
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Clock } from "lucide-react";

export const MessagesHub = () => {
  const [expandedMessage, setExpandedMessage] = useState<number | null>(null);

  const messages = [
    {
      id: 1,
      sender: "Chem Industries",
      initials: "CI",
      message: "Please confirm the ETA for the chemical tanks delivery...",
      time: "10:42 AM",
      priority: "high",
      color: "green"
    },
    {
      id: 2,
      sender: "Power Gen Co.",
      initials: "PG",
      message: "There will be a security check at our facility entrance...",
      time: "Yesterday",
      priority: "medium",
      color: "blue"
    },
    {
      id: 3,
      sender: "Steel Plant Ltd.",
      initials: "SP",
      message: "We need to confirm if you have the capacity for our request...",
      time: "2d ago",
      priority: "medium",
      color: "orange"
    },
    {
      id: 4,
      sender: "AutoParts Ltd.",
      initials: "AP",
      message: "We're reviewing your quote for our factory relocation project...",
      time: "3d ago",
      priority: "low",
      color: "pink"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getAvatarColor = (color: string) => {
    switch (color) {
      case "green": return "bg-green-100 text-green-600";
      case "blue": return "bg-blue-100 text-blue-600";
      case "orange": return "bg-orange-100 text-orange-600";
      case "pink": return "bg-pink-100 text-pink-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Recent Messages</CardTitle>
        <Button variant="outline" size="sm">View All Messages</Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {messages.map((message) => (
          <div key={message.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start space-x-3">
              <Avatar className={`h-10 w-10 ${getAvatarColor(message.color)}`}>
                <AvatarFallback className="text-sm font-medium">
                  {message.initials}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-gray-900">{message.sender}</p>
                  <div className="flex items-center space-x-2">
                    <Badge className={getPriorityColor(message.priority)}>
                      {message.priority}
                    </Badge>
                    <span className="text-xs text-gray-500 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {message.time}
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-2">
                  {expandedMessage === message.id 
                    ? message.message + " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    : message.message
                  }
                </p>
                
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setExpandedMessage(
                      expandedMessage === message.id ? null : message.id
                    )}
                  >
                    <MessageSquare className="h-3 w-3 mr-1" />
                    {expandedMessage === message.id ? "Collapse" : "Reply"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
