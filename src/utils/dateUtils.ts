
export interface DateFormatOptions {
  includeTime?: boolean;
  format?: 'short' | 'long' | 'medium';
}

export const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffInMilliseconds = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
  const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 1) {
    return 'Just now';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} min ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  } else if (diffInDays === 1) {
    return 'Yesterday';
  } else {
    return `${diffInDays} days ago`;
  }
};

export const formatDate = (date: Date, options?: DateFormatOptions): string => {
  const opts: Intl.DateTimeFormatOptions = {};
  
  if (options?.format === 'short') {
    opts.dateStyle = 'short';
  } else if (options?.format === 'long') {
    opts.dateStyle = 'full';
  } else {
    opts.dateStyle = 'medium';
  }
  
  if (options?.includeTime) {
    opts.timeStyle = 'short';
  }
  
  return date.toLocaleDateString('en-US', opts);
};

export const formatDateRange = (startDate: Date, endDate: Date): string => {
  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
};

export const getDaysRemaining = (deadline: Date): number => {
  const now = new Date();
  const diffTime = deadline.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const isOverdue = (deadline: Date): boolean => {
  return new Date() > deadline;
};

export const getDeadlineStatus = (deadline: Date): 'overdue' | 'urgent' | 'normal' => {
  const daysRemaining = getDaysRemaining(deadline);
  if (daysRemaining < 0) return 'overdue';
  if (daysRemaining <= 3) return 'urgent';
  return 'normal';
};

export const addBusinessDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  let daysToAdd = days;
  
  while (daysToAdd > 0) {
    result.setDate(result.getDate() + 1);
    const dayOfWeek = result.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Not Sunday (0) or Saturday (6)
      daysToAdd--;
    }
  }
  
  return result;
};
