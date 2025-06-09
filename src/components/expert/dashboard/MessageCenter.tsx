
import React from "react";
import { MessageCenter as SharedMessageCenter, Message } from "@/components/shared/messages/MessageCenter";
import { expertMessageConfig } from "@/utils/messageConfigs";

interface MessageCenterProps {
  messages: Message[];
  onReply: (messageId: number, reply: string) => void;
}

export const MessageCenter = ({ messages, onReply }: MessageCenterProps) => {
  return (
    <SharedMessageCenter 
      messages={messages}
      config={expertMessageConfig}
      onReply={onReply}
    />
  );
};
