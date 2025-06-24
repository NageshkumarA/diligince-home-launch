
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Clock, Paperclip } from "lucide-react";

const mockMessages = [
  {
    id: 1,
    sender: "Chem Industries",
    initials: "CI",
    message: "We need the weekly progress report for the SCADA project. Please send updated milestones and timeline.",
    timestamp: "10:42 AM",
    priority: "high",
    unread: true,
    type: "project-update",
    hasAttachment: false
  },
  {
    id: 2,
    sender: "Power Gen Co.",
    initials: "PG",
    message: "When can your team be on-site for the panel installation testing? We need to coordinate with our maintenance team.",
    timestamp: "Yesterday",
    priority: "medium",
    unread: true,
    type: "project-inquiry",
    hasAttachment: false
  },
  {
    id: 3,
    sender: "Steel Plant Ltd.",
    initials: "SP",
    message: "We're reviewing your proposal for the control system upgrade. A few questions about the timeline and technical specifications.",
    timestamp: "2d ago",
    priority: "high",
    unread: false,
    type: "proposal-response",
    hasAttachment: true
  },
  {
    id: 4,
    sender: "AutoParts Ltd.",
    initials: "AP",
    message: "Would your team be available for an on-site consultation next week? We have some technical challenges to discuss.",
    timestamp: "3d ago",
    priority: "medium",
    unread: false,
    type: "consultation-request",
    hasAttachment: false
  }
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'bg-red-50 text-red-700 border-red-200';
    case 'medium':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'low':
      return 'bg-gray-50 text-gray-700 border-gray-200';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};

const getInitialsBackground = (index: number) => {
  const colors = [
    'bg-blue-100 text-blue-700',
    'bg-green-100 text-green-700',
    'bg-purple-100 text-purple-700',
    'bg-orange-100 text-orange-700'
  ];
  return colors[index % colors.length];
};

export const MessageCenter = () => {
  return (
    <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="border-b border-gray-50 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <MessageSquare className="h-5 w-5 text-blue-600" />
            </div>
            Message Center
            <Badge className="bg-red-50 text-red-700 border-red-200 font-semibold text-sm px-3 py-1">
              2 Unread
            </Badge>
          </CardTitle>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium">
            View All Messages
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {mockMessages.map((message, index) => (
            <div 
              key={message.id} 
              className={`p-5 rounded-xl border transition-colors hover:bg-gray-50 ${
                message.unread 
                  ? 'bg-blue-50 border-blue-200' 
                  : 'bg-gray-50 border-gray-100'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-base font-bold ${getInitialsBackground(index)}`}>
                  {message.initials}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <h4 className="font-bold text-gray-900 text-base">{message.sender}</h4>
                      {message.unread && (
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={`${getPriorityColor(message.priority)} text-sm font-semibold px-3 py-1`}>
                        {message.priority.toUpperCase()}
                      </Badge>
                      <span className="text-sm text-gray-600 flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {message.timestamp}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-base text-gray-800 leading-relaxed mb-3 line-clamp-2">
                    {message.message}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {message.hasAttachment && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Paperclip className="h-4 w-4" />
                          <span>Attachment</span>
                        </div>
                      )}
                    </div>
                    <Button size="sm" variant="ghost" className="text-blue-600 hover:bg-blue-50 font-semibold">
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3">
          View All Messages
        </Button>
      </CardContent>
    </Card>
  );
};
