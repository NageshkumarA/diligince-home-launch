export interface DateFormatOptions {
  includeTime?: boolean;
  format?: "short" | "long" | "medium";
}

/**
 * Formats a given date into a "time ago" string.
 * Example: "5 min ago", "Yesterday", "3 days ago"
 */
export const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffInMilliseconds = now.getTime() - date.getTime();

  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
  const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 1) return "Just now";
  if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
  if (diffInHours < 24) return `${diffInHours}h ago`;
  if (diffInDays === 1) return "Yesterday";

  return `${diffInDays} days ago`;
};

/**
 * Formats a date according to given options.
 * Defaults: medium date style, optional time.
 */
export const formatDate = (date: Date, options?: DateFormatOptions): string => {
  const opts: Intl.DateTimeFormatOptions = {};

  switch (options?.format) {
    case "short":
      opts.dateStyle = "short";
      break;
    case "long":
      opts.dateStyle = "full";
      break;
    default:
      opts.dateStyle = "medium";
  }

  if (options?.includeTime) {
    opts.timeStyle = "short";
  }

  return date.toLocaleDateString("en-US", opts);
};

/**
 * Formats a range between two dates.
 */
export const formatDateRange = (startDate: Date, endDate: Date): string => {
  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
};

/**
 * Gets remaining days between now and a deadline.
 */
export const getDaysRemaining = (deadline: Date): number => {
  const now = new Date();
  const diffTime = deadline.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Checks if a deadline is already overdue.
 */
export const isOverdue = (deadline: Date): boolean => {
  return new Date().getTime() > deadline.getTime();
};

/**
 * Returns the urgency of a deadline.
 */
export const getDeadlineStatus = (
  deadline: Date
): "overdue" | "urgent" | "normal" => {
  const daysRemaining = getDaysRemaining(deadline);

  if (daysRemaining < 0) return "overdue";
  if (daysRemaining <= 3) return "urgent";

  return "normal";
};

/**
 * Adds business days (Mon–Fri) to a date.
 */
export const addBusinessDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  let daysToAdd = days;

  while (daysToAdd > 0) {
    result.setDate(result.getDate() + 1);
    const dayOfWeek = result.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      daysToAdd--;
    }
  }

  return result;
};
