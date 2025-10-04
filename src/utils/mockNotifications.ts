import { Notification } from "@/types/notifications";

export const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New Requirement Submitted",
    message:
      "Industrial Valve Procurement requirement has been submitted for review.",
    type: "info",
    priority: "medium",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: false,
    userType: "industry",
    category: "Requirements",
    actionUrl: "/dashboard/industry-requirements", // ✅ fixed path
  },
  {
    id: "2",
    title: "Purchase Order Approved",
    message:
      "Your purchase order PO-2023-042 has been approved and is ready for processing.",
    type: "success",
    priority: "high",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    read: false,
    userType: "industry",
    category: "Purchase Orders",
    actionUrl: "/dashboard/industry-workflows", // ✅ fixed path
  },
  {
    id: "3",
    title: "New Message Received",
    message: "You have received a new message from TechValve Solutions.",
    type: "info",
    priority: "low",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    read: true,
    userType: "industry",
    category: "Messages",
    actionUrl: "/dashboard/industry-messages", // ✅ fixed path
  },
];
