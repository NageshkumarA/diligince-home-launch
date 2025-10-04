// status-utils.ts

import { getBadgeColors, getTextColors } from "./colorUtils";

/**
 * Possible system status values
 */
export type StatusType =
  | "pending"
  | "processing"
  | "in-progress"
  | "ongoing"
  | "completed"
  | "delivered"
  | "shipped"
  | "cancelled"
  | "failed"
  | "rejected"
  | "open"
  | "available"
  | "active"
  | "closed"
  | "expired"
  | "paused";

/**
 * Priority levels
 */
export type PriorityType = "low" | "medium" | "high" | "urgent" | "critical";

/**
 * Payment states
 */
export type PaymentStatusType =
  | "paid"
  | "pending"
  | "overdue"
  | "partial"
  | "failed";

/**
 * Common interface for all configs
 */
export interface StatusConfig {
  label: string;
  className: string;
  textClassName: string;
  description: string;
}

/**
 * General status mappings
 */
export const statusConfigs: Record<StatusType, StatusConfig> = {
  // Pending states
  pending: {
    label: "Pending",
    className: getBadgeColors("warning"),
    textClassName: getTextColors("warning"),
    description: "Awaiting action or approval",
  },
  processing: {
    label: "Processing",
    className: getBadgeColors("info"),
    textClassName: getTextColors("info"),
    description: "Currently being processed",
  },
  "in-progress": {
    label: "In Progress",
    className: getBadgeColors("info"),
    textClassName: getTextColors("info"),
    description: "Work is currently underway",
  },
  ongoing: {
    label: "Ongoing",
    className: getBadgeColors("info"),
    textClassName: getTextColors("info"),
    description: "Continuously active",
  },

  // Success states
  completed: {
    label: "Completed",
    className: getBadgeColors("success"),
    textClassName: getTextColors("success"),
    description: "Successfully finished",
  },
  delivered: {
    label: "Delivered",
    className: getBadgeColors("success"),
    textClassName: getTextColors("success"),
    description: "Successfully delivered",
  },
  shipped: {
    label: "Shipped",
    className: getBadgeColors("success"),
    textClassName: getTextColors("success"),
    description: "Package has been shipped",
  },

  // Failure states
  cancelled: {
    label: "Cancelled",
    className: getBadgeColors("error"),
    textClassName: getTextColors("error"),
    description: "Process was cancelled",
  },
  failed: {
    label: "Failed",
    className: getBadgeColors("error"),
    textClassName: getTextColors("error"),
    description: "Process failed to complete",
  },
  rejected: {
    label: "Rejected",
    className: getBadgeColors("error"),
    textClassName: getTextColors("error"),
    description: "Request was rejected",
  },

  // Available states
  open: {
    label: "Open",
    className: getBadgeColors("primary"),
    textClassName: getTextColors("primary"),
    description: "Available for action",
  },
  available: {
    label: "Available",
    className: getBadgeColors("primary"),
    textClassName: getTextColors("primary"),
    description: "Ready and available",
  },
  active: {
    label: "Active",
    className: getBadgeColors("success"),
    textClassName: getTextColors("success"),
    description: "Currently active",
  },

  // Inactive states
  closed: {
    label: "Closed",
    className: getBadgeColors("neutral"),
    textClassName: getTextColors("neutral"),
    description: "No longer available",
  },
  expired: {
    label: "Expired",
    className: getBadgeColors("neutral"),
    textClassName: getTextColors("neutral"),
    description: "Time period has expired",
  },
  paused: {
    label: "Paused",
    className: getBadgeColors("warning"),
    textClassName: getTextColors("warning"),
    description: "Temporarily paused",
  },
};

/**
 * Priority configs
 */
export const priorityConfigs: Record<PriorityType, StatusConfig> = {
  low: {
    label: "Low",
    className: getBadgeColors("neutral"),
    textClassName: getTextColors("neutral"),
    description: "Low priority item",
  },
  medium: {
    label: "Medium",
    className: getBadgeColors("info"),
    textClassName: getTextColors("info"),
    description: "Medium priority item",
  },
  high: {
    label: "High",
    className: getBadgeColors("warning"),
    textClassName: getTextColors("warning"),
    description: "High priority item",
  },
  urgent: {
    label: "Urgent",
    className: getBadgeColors("error"),
    textClassName: getTextColors("error"),
    description: "Urgent priority item",
  },
  critical: {
    label: "Critical",
    className: "bg-red-100 text-red-900 border-red-300 font-bold",
    textClassName: "text-red-900 font-bold",
    description: "Critical priority item",
  },
};

/**
 * Payment status configs
 */
export const paymentStatusConfigs: Record<PaymentStatusType, StatusConfig> = {
  paid: {
    label: "Paid",
    className: getBadgeColors("success"),
    textClassName: getTextColors("success"),
    description: "Payment completed successfully",
  },
  pending: {
    label: "Pending",
    className: getBadgeColors("warning"),
    textClassName: getTextColors("warning"),
    description: "Payment is pending",
  },
  overdue: {
    label: "Overdue",
    className: getBadgeColors("error"),
    textClassName: getTextColors("error"),
    description: "Payment is overdue",
  },
  partial: {
    label: "Partial",
    className: getBadgeColors("info"),
    textClassName: getTextColors("info"),
    description: "Partial payment received",
  },
  failed: {
    label: "Failed",
    className: getBadgeColors("error"),
    textClassName: getTextColors("error"),
    description: "Payment failed",
  },
};

/**
 * Helpers
 */
export const getStatusConfig = (status: StatusType): StatusConfig =>
  statusConfigs[status] || statusConfigs.pending;

export const getPriorityConfig = (priority: PriorityType): StatusConfig =>
  priorityConfigs[priority] || priorityConfigs.medium;

export const getPaymentStatusConfig = (
  status: PaymentStatusType
): StatusConfig => paymentStatusConfigs[status] || paymentStatusConfigs.pending;

/**
 * Legacy support functions (string-based input → safe normalized types)
 */
export const getStatusColor = (status: string): string => {
  const normalizedStatus = status
    .toLowerCase()
    .replace(/[\s-_]/g, "-") as StatusType;
  return getStatusConfig(normalizedStatus).className;
};

export const getPriorityColor = (priority: string): string => {
  const normalizedPriority = priority.toLowerCase() as PriorityType;
  return getPriorityConfig(normalizedPriority).className;
};

export const getPaymentStatusColor = (status: string): string => {
  const normalizedStatus = status.toLowerCase() as PaymentStatusType;
  return getPaymentStatusConfig(normalizedStatus).className;
};
