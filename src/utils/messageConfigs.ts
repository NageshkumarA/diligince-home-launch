
import { MessageCenterConfig, MessageTypeConfig } from "@/components/shared/messages/MessageCenter";

// Message type configurations
const messageTypes = {
  // Expert message types
  "project-update": { label: "Project Update", icon: "🔧", color: "blue" },
  "project-preparation": { label: "Project Prep", icon: "📋", color: "green" },
  "job-response": { label: "Job Response", icon: "💼", color: "purple" },
  "job-inquiry": { label: "Job Inquiry", icon: "❓", color: "orange" },
  "system-notification": { label: "System", icon: "🔔", color: "gray" },

  // Product vendor message types
  "order-inquiry": { label: "Order", icon: "📦", color: "blue" },
  "stock-inquiry": { label: "Stock", icon: "📊", color: "green" },
  "urgent-request": { label: "Urgent", icon: "🚨", color: "red" },
  "technical-inquiry": { label: "Technical", icon: "🔧", color: "purple" },

  // Service vendor message types
  "project-inquiry": { label: "Project", icon: "🏗️", color: "blue" },
  "proposal-response": { label: "Proposal", icon: "📋", color: "green" },
  "consultation-request": { label: "Consultation", icon: "💼", color: "purple" },

  // Logistics message types
  "delivery-update": { label: "Delivery", icon: "🚚", color: "blue" },
  "route-planning": { label: "Route", icon: "🗺️", color: "green" },
  "urgent-transport": { label: "Urgent", icon: "🚨", color: "red" },

  // General message types
  "general": { label: "General", icon: "💬", color: "gray" }
} as Record<string, MessageTypeConfig>;

// Expert message center configuration
export const expertMessageConfig: MessageCenterConfig = {
  title: "Messages",
  theme: "[#722ed1]",
  showSearch: true,
  showFilters: true,
  showReply: true,
  showCallActions: true,
  messageTypes,
  filters: [
    { key: "all", label: "All" },
    { key: "unread", label: "Unread" },
    { key: "urgent", label: "Urgent" },
    { key: "project-update", label: "Projects" },
    { key: "job-response", label: "Jobs" }
  ]
};

// Product vendor message center configuration
export const productVendorMessageConfig: MessageCenterConfig = {
  title: "Messages Center",
  theme: "[#faad14]",
  showSearch: true,
  showFilters: true,
  showReply: false,
  showCallActions: false,
  messageTypes,
  filters: [
    { key: "all", label: "All" },
    { key: "unread", label: "Unread" },
    { key: "urgent", label: "Urgent" },
    { key: "order-inquiry", label: "Orders" },
    { key: "stock-inquiry", label: "Stock" },
    { key: "technical-inquiry", label: "Technical" }
  ]
};

// Service vendor message center configuration
export const serviceVendorMessageConfig: MessageCenterConfig = {
  title: "Messages",
  theme: "[#fa8c16]",
  showSearch: true,
  showFilters: true,
  showReply: true,
  showCallActions: false,
  messageTypes,
  filters: [
    { key: "all", label: "All Types" },
    { key: "project-update", label: "Project Updates" },
    { key: "proposal-response", label: "Proposal Responses" },
    { key: "consultation-request", label: "Consultations" }
  ]
};

// Logistics vendor message center configuration
export const logisticsVendorMessageConfig: MessageCenterConfig = {
  title: "Recent Messages",
  theme: "[#52c41a]",
  showSearch: false,
  showFilters: false,
  showReply: false,
  showCallActions: false,
  messageTypes,
  filters: []
};
