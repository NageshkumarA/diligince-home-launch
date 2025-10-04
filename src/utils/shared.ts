// utils/colorUtils.ts

/**
 * Priority color mappings
 */
export const getPriorityColor = (priority: string): string => {
  switch (priority.toLowerCase()) {
    case "urgent":
      return "bg-red-100 text-red-800";
    case "high":
      return "bg-orange-100 text-orange-800";
    case "medium":
      return "bg-primary/10 text-primary";
    case "low":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

/**
 * General status color mappings
 */
export const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case "shipped":
    case "delivered":
    case "completed":
      return "bg-green-100 text-green-800";

    case "processing":
    case "in-progress":
    case "ongoing":
      return "bg-orange-100 text-orange-800";

    case "cancelled":
    case "failed":
    case "rejected":
      return "bg-red-100 text-red-800";

    case "pending":
    case "waiting":
      return "bg-yellow-100 text-yellow-800";

    case "open":
    case "available":
    case "active":
      return "bg-primary/10 text-primary";

    case "closed":
    case "expired":
    case "paused":
      return "bg-gray-200 text-gray-700";

    default:
      return "bg-gray-100 text-gray-800";
  }
};

/**
 * Payment status color mappings
 */
export const getPaymentStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case "paid":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-orange-100 text-orange-800";
    case "overdue":
      return "bg-red-100 text-red-800";
    case "partial":
      return "bg-blue-100 text-blue-800";
    case "failed":
      return "bg-red-200 text-red-900";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

/**
 * Utility: Format dates consistently
 */
export const formatDate = (dateString: string): string => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

/**
 * Utility: Calculate days remaining until a deadline
 */
export const getDaysRemaining = (deadline: string): number => {
  if (!deadline) return 0;
  const deadlineDate = new Date(deadline);
  const today = new Date();
  const diffTime = deadlineDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};
