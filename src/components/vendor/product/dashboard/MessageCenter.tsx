
import React from "react";
import { useNavigate } from "react-router-dom";
import { MessageCenter as SharedMessageCenter } from "@/components/shared/messages/MessageCenter";
import { productVendorMessageConfig } from "@/utils/messageConfigs";

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
  const navigate = useNavigate();

  const handleViewAllMessages = () => {
    navigate('/product-vendor-messages');
  };

  const configWithNavigation = {
    ...productVendorMessageConfig,
    onViewAllMessages: handleViewAllMessages
  };

  return (
    <SharedMessageCenter 
      messages={messages}
      config={configWithNavigation}
    />
  );
};
