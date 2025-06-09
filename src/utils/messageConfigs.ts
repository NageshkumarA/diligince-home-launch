
import React from "react";
import { MessageSquare } from "lucide-react";

export interface MessageConfig {
  title: string;
  icon: React.ReactNode;
  emptyStateMessage: string;
  theme: {
    bgColor: string;
    headerTextColor: string;
    iconColor: string;
  };
}

export interface MessageCenterConfig {
  title: string;
  theme: string;
  showSearch: boolean;
  showFilters: boolean;
  showReply: boolean;
  showCallActions: boolean;
  messageTypes: Record<string, { label: string; icon: string; color: string }>;
  filters: Array<{ key: string; label: string }>;
}

export const professionalMessageConfig: MessageConfig = {
  title: "Message Center",
  icon: React.createElement(MessageSquare, { size: 20 }),
  emptyStateMessage: "No messages yet. Stay tuned for job opportunities and project updates!",
  theme: {
    bgColor: "bg-[#722ed1]",
    headerTextColor: "text-white",
    iconColor: "text-purple-600"
  }
};

export const serviceVendorMessageConfig: MessageCenterConfig = {
  title: "Messages Hub",
  theme: "yellow-600",
  showSearch: true,
  showFilters: true,
  showReply: true,
  showCallActions: true,
  messageTypes: {
    "rfq-notification": { label: "RFQ", icon: "📋", color: "blue" },
    "project-update": { label: "Project Update", icon: "🔧", color: "green" },
    "system-notification": { label: "System", icon: "🔔", color: "gray" }
  },
  filters: [
    { key: "all", label: "All" },
    { key: "unread", label: "Unread" },
    { key: "urgent", label: "Urgent" }
  ]
};

export const productVendorMessageConfig: MessageCenterConfig = {
  title: "Messages Hub",
  theme: "yellow-600",
  showSearch: true,
  showFilters: true,
  showReply: true,
  showCallActions: true,
  messageTypes: {
    "order-notification": { label: "Order", icon: "📦", color: "blue" },
    "rfq-notification": { label: "RFQ", icon: "📋", color: "green" },
    "system-notification": { label: "System", icon: "🔔", color: "gray" }
  },
  filters: [
    { key: "all", label: "All" },
    { key: "unread", label: "Unread" },
    { key: "urgent", label: "Urgent" }
  ]
};

export const logisticsVendorMessageConfig: MessageCenterConfig = {
  title: "Messages Hub",
  theme: "pink-600",
  showSearch: true,
  showFilters: true,
  showReply: true,
  showCallActions: true,
  messageTypes: {
    "transport-request": { label: "Transport", icon: "🚛", color: "blue" },
    "delivery-update": { label: "Delivery", icon: "📦", color: "green" },
    "system-notification": { label: "System", icon: "🔔", color: "gray" }
  },
  filters: [
    { key: "all", label: "All" },
    { key: "unread", label: "Unread" },
    { key: "urgent", label: "Urgent" }
  ]
};
