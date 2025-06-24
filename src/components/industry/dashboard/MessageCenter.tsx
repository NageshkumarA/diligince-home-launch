
import React from "react";
import { MessageCenter as SharedMessageCenter } from "@/components/shared/messages/MessageCenter";
import { industryMessageConfig } from "@/utils/messageConfigs";
import { useToast } from "@/hooks/use-toast";

const mockMessages = [
  {
    id: 1,
    sender: "Steel Industries Ltd.",
    initials: "SI",
    message: "We've reviewed your control system upgrade requirement. Our team can provide a comprehensive solution including SCADA implementation.",
    timestamp: "2 hours ago",
    priority: "high",
    color: "blue",
    unread: true,
    type: "vendor-inquiry",
    projectId: 1,
    attachments: []
  },
  {
    id: 2,
    sender: "AutoParts Manufacturing",
    initials: "AM",
    message: "Thank you for the purchase order. We'll begin production immediately and deliver within the specified timeline.",
    timestamp: "5 hours ago",
    priority: "medium",
    color: "green",
    unread: true,
    type: "purchase-order",
    attachments: []
  },
  {
    id: 3,
    sender: "Power Grid Solutions",
    initials: "PG",
    message: "The SCADA project is progressing as planned. We've completed phase 1 testing and are ready to move to phase 2.",
    timestamp: "1 day ago",
    priority: "medium",
    color: "orange",
    unread: false,
    type: "project-update",
    projectId: 2,
    attachments: []
  },
  {
    id: 4,
    sender: "Industrial Automation Co.",
    initials: "IA",
    message: "We'd like to submit a proposal for your factory automation project. Our team has extensive experience in similar implementations.",
    timestamp: "2 days ago",
    priority: "low",
    color: "purple",
    unread: false,
    type: "proposal-response",
    attachments: ["proposal_draft.pdf"]
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
      config={industryMessageConfig}
      onReply={handleReply}
    />
  );
};
