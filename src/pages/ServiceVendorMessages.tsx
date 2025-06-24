
import React from "react";
import { Helmet } from "react-helmet";
import VendorHeader from "@/components/vendor/VendorHeader";
import { MessageCenter } from "@/components/vendor/service/dashboard/MessageCenter";
import { useToast } from "@/hooks/use-toast";

const mockMessages = [
  {
    id: 1,
    sender: "Steel Manufacturing Ltd.",
    initials: "SM",
    message: "We need the weekly progress report for the control system upgrade. Please send updated milestones and timeline.",
    timestamp: "2 min ago",
    priority: "high",
    color: "blue",
    unread: true,
    type: "project-update",
    projectId: 1,
    attachments: []
  },
  {
    id: 2,
    sender: "Chemical Processing Corp.",
    initials: "CP",
    message: "The safety audit report looks comprehensive. When can we schedule the follow-up inspection?",
    timestamp: "1 hour ago",
    priority: "high",
    color: "green",
    unread: true,
    type: "project-inquiry",
    projectId: 2,
    attachments: []
  },
  {
    id: 3,
    sender: "Automotive Manufacturing",
    initials: "AM",
    message: "The equipment calibration is complete. All machinery is now within acceptable tolerance levels.",
    timestamp: "3 hours ago",
    priority: "medium",
    color: "purple",
    unread: false,
    type: "project-update",
    projectId: 3,
    attachments: []
  },
  {
    id: 4,
    sender: "Food Processing Industries",
    initials: "FP",
    message: "We're reviewing your proposal for the HACCP implementation. The approach looks solid.",
    timestamp: "1 day ago",
    priority: "medium",
    color: "orange",
    unread: false,
    type: "proposal-response",
    rfqId: 1,
    attachments: []
  },
  {
    id: 5,
    sender: "Pharmaceutical Company",
    initials: "PC",
    message: "The GMP validation documentation has been approved. Ready for the next phase.",
    timestamp: "2 days ago",
    priority: "low",
    color: "indigo",
    unread: false,
    type: "consultation-request",
    attachments: []
  }
];

const ServiceVendorMessages = () => {
  const { toast } = useToast();

  const handleReply = (messageId: number, reply: string) => {
    const message = mockMessages.find(m => m.id === messageId);
    toast({
      title: "Message Sent",
      description: `Your reply to ${message?.sender} has been sent.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Helmet>
        <title>Messages | Service Vendor Dashboard</title>
      </Helmet>
      
      <VendorHeader />
      
      <div className="pt-16 flex-1 p-6">
        <MessageCenter 
          messages={mockMessages}
          onReply={handleReply}
        />
      </div>
    </div>
  );
};

export default ServiceVendorMessages;
