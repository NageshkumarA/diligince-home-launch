
import React from "react";
import { MessageCenter as SharedMessageCenter, Message } from "@/components/shared/messages/MessageCenter";
import { professionalMessageConfig } from "@/utils/messageConfigs";

interface MessageCenterProps {
  messages: Message[];
  onReply: (messageId: number, reply: string) => void;
}

const messageConfig = {
  title: professionalMessageConfig.title,
  theme: "purple-600",
  showSearch: true,
  showFilters: true,
  showReply: true,
  showCallActions: true,
  messageTypes: {
    "project-update": { label: "Project Update", icon: "🔧", color: "blue" },
    "project-preparation": { label: "Project Prep", icon: "📋", color: "green" },
    "job-response": { label: "Job Response", icon: "💼", color: "orange" },
    "job-inquiry": { label: "Job Inquiry", icon: "🔍", color: "purple" },
    "system-notification": { label: "System", icon: "🔔", color: "gray" }
  },
  filters: [
    { key: "all", label: "All" },
    { key: "unread", label: "Unread" },
    { key: "urgent", label: "Urgent" },
    { key: "project-update", label: "Projects" },
    { key: "job-response", label: "Jobs" }
  ]
};

export const MessageCenter = ({ messages, onReply }: MessageCenterProps) => {
  return (
    <SharedMessageCenter 
      messages={messages}
      config={messageConfig}
      onReply={onReply}
    />
  );
};
