
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Clock, User, Reply } from "lucide-react";

const messagesData = [
  {
    id: 1,
    sender: "Steel Plant Ltd.",
    subject: "SCADA Project - Technical Clarification",
    preview: "We need some clarification on the technical specifications for the SCADA implementation...",
    timestamp: "2 hours ago",
    status: "unread",
    priority: "high",
    type: "project"
  },
  {
    id: 2,
    sender: "ChemCorp Industries",
    subject: "Safety Audit - Schedule Update",
    preview: "We would like to reschedule the safety audit meeting to next week...",
    timestamp: "4 hours ago",
    status: "read",
    priority: "medium",
    type: "meeting"
  },
  {
    id: 3,
    sender: "Power Gen Co.",
    subject: "Payment Confirmation",
    preview: "Payment for the maintenance contract has been processed successfully...",
    timestamp: "1 day ago",
    status: "read",
    priority: "low",
    type: "payment"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'unread':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'read':
      return 'bg-gray-50 text-gray-700 border-gray-200';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'bg-red-50 text-red-700 border-red-200';
    case 'medium':
      return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    case 'low':
      return 'bg-green-50 text-green-700 border-green-200';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};

export const MessageCenter = () => {
  const navigate = useNavigate();

  const handleViewAllMessages = () => {
    navigate('/service-vendor-messages');
  };

  const handleReplyMessage = (messageId: number) => {
    console.log(`Reply to message ${messageId}`);
    // This would typically open a reply modal or navigate to message details
    navigate('/service-vendor-messages');
  };

  return (
    <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="border-b border-gray-50 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
              <MessageSquare className="h-5 w-5 text-indigo-600" />
            </div>
            Message Center
          </CardTitle>
          <Button 
            className="text-white font-medium bg-yellow-600 hover:bg-yellow-500"
            onClick={handleViewAllMessages}
          >
            View All Messages
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {messagesData.map(message => (
            <div key={message.id} className="bg-gray-50 border border-gray-100 rounded-xl p-5 hover:bg-gray-100 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-bold text-gray-900 text-base">{message.subject}</h4>
                    <Badge className={`${getStatusColor(message.status)} text-xs px-2 py-1`}>
                      {message.status}
                    </Badge>
                    <Badge className={`${getPriorityColor(message.priority)} text-xs px-2 py-1`}>
                      {message.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-semibold text-gray-700">{message.sender}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{message.preview}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>{message.timestamp}</span>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="border-gray-200 text-gray-700 hover:bg-gray-50"
                  onClick={() => handleReplyMessage(message.id)}
                >
                  <Reply className="mr-2 h-4 w-4" />
                  Reply
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <Button 
          className="w-full mt-6 text-white font-semibold py-3 bg-yellow-600 hover:bg-yellow-500"
          onClick={handleViewAllMessages}
        >
          View All Messages
        </Button>
      </CardContent>
    </Card>
  );
};
