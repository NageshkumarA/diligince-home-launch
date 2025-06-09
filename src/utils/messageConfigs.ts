
import React from "react";
import { MessageSquare, Briefcase, FileText, Package } from "lucide-react";

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

export const serviceVendorMessageConfig: MessageConfig = {
  title: "Messages Hub",
  icon: React.createElement(MessageSquare, { size: 20 }),
  emptyStateMessage: "No messages yet. Stay tuned for RFQ notifications and project communications!",
  theme: {
    bgColor: "bg-[#faad14]",
    headerTextColor: "text-white",
    iconColor: "text-yellow-600"
  }
};

export const productVendorMessageConfig: MessageConfig = {
  title: "Messages Hub",
  icon: React.createElement(MessageSquare, { size: 20 }),
  emptyStateMessage: "No messages yet. Stay tuned for RFQ notifications and order communications!",
  theme: {
    bgColor: "bg-[#faad14]",
    headerTextColor: "text-white",
    iconColor: "text-yellow-600"
  }
};

export const logisticsVendorMessageConfig: MessageConfig = {
  title: "Messages Hub",
  icon: React.createElement(MessageSquare, { size: 20 }),
  emptyStateMessage: "No messages yet. Stay tuned for transport requests and delivery updates!",
  theme: {
    bgColor: "bg-[#eb2f96]",
    headerTextColor: "text-white",
    iconColor: "text-pink-600"
  }
};
