
import React from "react";
import { MessageCenter as SharedMessageCenter } from "@/components/shared/messages/MessageCenter";
import { serviceVendorMessageConfig } from "@/utils/messageConfigs";
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

  const handleReply = (messageId: number, reply: string) => {
    const message = mockMessages.find(m => m.id === messageId);
    toast({
      title: "Message Sent",
      description: `Your reply to ${message?.sender} has been sent.`,
    });
  };

  return (
    <SharedMessageCenter 
      messages={mockMessages}
      config={serviceVendorMessageConfig}
      onReply={handleReply}
    />
  );
};
