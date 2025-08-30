
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

export const industryMessageConfig: MessageCenterConfig = {
  title: "Message Center",
  theme: "primary",
  showSearch: true,
  showFilters: true,
  showReply: true,
  showCallActions: true,
  messageTypes: {
    "vendor-inquiry": { label: "Vendor Inquiry", icon: "🏭", color: "blue" },
    "project-update": { label: "Project Update", icon: "🔧", color: "green" },
    "proposal-response": { label: "Proposal Response", icon: "📋", color: "orange" },
    "purchase-order": { label: "Purchase Order", icon: "📦", color: "purple" },
    "system-notification": { label: "System", icon: "🔔", color: "gray" }
  },
  filters: [
    { key: "all", label: "All" },
    { key: "unread", label: "Unread" },
    { key: "urgent", label: "Urgent" },
    { key: "vendor-inquiry", label: "Vendors" },
    { key: "project-update", label: "Projects" }
  ]
};

export const professionalMessageConfig: MessageCenterConfig = {
  title: "Message Center",
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

export const serviceVendorMessageConfig: MessageCenterConfig = {
  title: "Messages Hub",
  theme: "yellow-600",
  showSearch: true,
  showFilters: true,
  showReply: true,
  showCallActions: true,
  messageTypes: {
    "project-update": { label: "Project Update", icon: "🔧", color: "green" },
    "project-inquiry": { label: "Project Inquiry", icon: "🔍", color: "blue" },
    "proposal-response": { label: "Proposal Response", icon: "📋", color: "orange" },
    "consultation-request": { label: "Consultation", icon: "💬", color: "purple" },
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
  theme: "green-600",
  showSearch: true,
  showFilters: true,
  showReply: true,
  showCallActions: true,
  messageTypes: {
    "order-notification": { label: "Order", icon: "📦", color: "blue" },
    "rfq-notification": { label: "RFQ", icon: "📋", color: "green" },
    "stock-inquiry": { label: "Stock Inquiry", icon: "📊", color: "orange" },
    "technical-inquiry": { label: "Technical", icon: "🔧", color: "purple" },
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
