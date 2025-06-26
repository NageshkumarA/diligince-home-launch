
import React from "react";
import { useNavigate } from "react-router-dom";
import { MessageCenter as SharedMessageCenter } from "@/components/shared/messages/MessageCenter";
import { logisticsVendorMessageConfig } from "@/utils/messageConfigs";

const messages = [
  {
    id: 1,
    sender: "Chem Industries",
    initials: "CI",
    message: "Please confirm the ETA for the chemical tanks delivery...",
    timestamp: "10:42 AM",
    priority: "high",
    color: "green",
    unread: true,
    type: "delivery-update",
    attachments: []
  },
  {
    id: 2,
    sender: "Power Gen Co.",
    initials: "PG",
    message: "There will be a security check at our facility entrance...",
    timestamp: "Yesterday",
    priority: "medium",
    color: "blue",
    unread: false,
    type: "delivery-update",
    attachments: []
  },
  {
    id: 3,
    sender: "Steel Plant Ltd.",
    initials: "SP",
    message: "We need to confirm if you have the capacity for our request...",
    timestamp: "2d ago",
    priority: "medium",
    color: "orange",
    unread: false,
    type: "urgent-transport",
    attachments: []
  },
  {
    id: 4,
    sender: "AutoParts Ltd.",
    initials: "AP",
    message: "We're reviewing your quote for our factory relocation project...",
    timestamp: "3d ago",
    priority: "low",
    color: "pink",
    unread: false,
    type: "route-planning",
    attachments: []
  }
];

export const MessagesHub = () => {
  const navigate = useNavigate();

  const handleViewAllMessages = () => {
    navigate('/logistics-vendor-messages');
  };

  const configWithNavigation = {
    ...logisticsVendorMessageConfig,
    onViewAllMessages: handleViewAllMessages
  };

  return (
    <SharedMessageCenter 
      messages={messages}
      config={configWithNavigation}
    />
  );
};
