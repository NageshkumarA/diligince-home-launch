
import { format, formatDistanceToNow, isValid, parseISO, addDays, differenceInDays, startOfDay, endOfDay } from 'date-fns';

export interface DateFormatOptions {
  includeTime?: boolean;
  short?: boolean;
  relative?: boolean;
}

export const formatDate = (
  dateInput: string | Date,
  options: DateFormatOptions = {}
): string => {
  const { includeTime = false, short = false, relative = false } = options;
  
  let date: Date;
  
  if (typeof dateInput === 'string') {
    date = parseISO(dateInput);
  } else {
    date = dateInput;
  }
  
  if (!isValid(date)) {
    return 'Invalid date';
  }
  
  if (relative) {
    return formatDistanceToNow(date, { addSuffix: true });
  }
  
  if (short) {
    return includeTime ? format(date, 'MM/dd/yy HH:mm') : format(date, 'MM/dd/yy');
  }
  
  return includeTime 
    ? format(date, 'MMM dd, yyyy HH:mm')
    : format(date, 'MMM dd, yyyy');
};

export const formatDateRange = (startDate: string | Date, endDate: string | Date): string => {
  const start = typeof startDate === 'string' ? parseISO(startDate) : startDate;
  const end = typeof endDate === 'string' ? parseISO(endDate) : endDate;
  
  if (!isValid(start) || !isValid(end)) {
    return 'Invalid date range';
  }
  
  return `${format(start, 'MMM dd')} - ${format(end, 'MMM dd, yyyy')}`;
};

export const getDaysRemaining = (deadline: string | Date): number => {
  const deadlineDate = typeof deadline === 'string' ? parseISO(deadline) : deadline;
  
  if (!isValid(deadlineDate)) {
    return 0;
  }
  
  const today = startOfDay(new Date());
  const targetDate = startOfDay(deadlineDate);
  
  return differenceInDays(targetDate, today);
};

export const isOverdue = (deadline: string | Date): boolean => {
  return getDaysRemaining(deadline) < 0;
};

export const getDeadlineStatus = (deadline: string | Date): 'overdue' | 'urgent' | 'soon' | 'normal' => {
  const daysRemaining = getDaysRemaining(deadline);
  
  if (daysRemaining < 0) return 'overdue';
  if (daysRemaining <= 1) return 'urgent';
  if (daysRemaining <= 3) return 'soon';
  return 'normal';
};

export const formatTimeAgo = (date: string | Date): string => {
  const targetDate = typeof date === 'string' ? parseISO(date) : date;
  
  if (!isValid(targetDate)) {
    return 'Unknown';
  }
  
  return formatDistanceToNow(targetDate, { addSuffix: true });
};

export const addBusinessDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  let addedDays = 0;
  
  while (addedDays < days) {
    result.setDate(result.getDate() + 1);
    
    // Skip weekends (Saturday = 6, Sunday = 0)
    if (result.getDay() !== 0 && result.getDay() !== 6) {
      addedDays++;
    }
  }
  
  return result;
};
