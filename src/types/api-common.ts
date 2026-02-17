/**
 * Common API Response Types and Utilities
 * 
 * Provides reusable types and helper functions for handling
 * standardized API responses across the application.
 */

/**
 * Standard API envelope structure
 */
export interface ApiEnvelope<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  metadata?: Record<string, unknown>;
}

/**
 * Enhanced value with metadata (for stats/metrics)
 * Used when API returns rich data with trends, changes, and formatting
 */
export interface EnhancedValue<T = number> {
  value: T;
  formatted?: string;
  change?: number;
  trend?: 'up' | 'down' | 'stable';
  status?: 'healthy' | 'warning' | 'critical';
  metadata?: Record<string, unknown>;
}

/**
 * Helper to extract value from EnhancedValue or return primitive
 * 
 * @param input - Either a primitive value or an EnhancedValue object
 * @returns The extracted value
 * 
 * @example
 * extractValue(42) // returns 42
 * extractValue({ value: 42, change: 5.2, trend: 'up' }) // returns 42
 */
export function extractValue<T>(input: T | EnhancedValue<T> | undefined | null): T | number {
  // Handle null/undefined
  if (input === null || input === undefined) {
    return 0 as T;
  }

  // If it's already a primitive number
  if (typeof input === 'number') {
    return input;
  }

  // If it's an object with a value property
  if (input && typeof input === 'object' && 'value' in input) {
    return (input as EnhancedValue<T>).value;
  }

  // Return as-is for other types
  return input as T;
}

/**
 * Type guard to check if value is an EnhancedValue
 * 
 * @param input - Value to check
 * @returns True if input is an EnhancedValue object
 * 
 * @example
 * if (isEnhancedValue(data.totalSpend)) {
 *   console.log('Trend:', data.totalSpend.trend);
 * }
 */
export function isEnhancedValue<T>(input: unknown): input is EnhancedValue<T> {
  return (
    input !== null &&
    input !== undefined &&
    typeof input === 'object' &&
    'value' in input &&
    typeof input.value !== 'undefined'
  );
}

/**
 * Extract all enhanced values from an object
 * Useful for normalizing entire API responses
 * 
 * @param obj - Object containing potentially enhanced values
 * @returns New object with extracted primitive values
 * 
 * @example
 * const enhanced = {
 *   total: { value: 100, trend: 'up' },
 *   count: { value: 5, trend: 'down' }
 * };
 * extractAllValues(enhanced) // returns { total: 100, count: 5 }
 */
export function extractAllValues<T extends Record<string, unknown>>(
  obj: T
): { [K in keyof T]: T[K] extends EnhancedValue<infer U> ? U : T[K] } {
  const result = {} as { [K in keyof T]: T[K] extends EnhancedValue<infer U> ? U : T[K] };

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = extractValue(obj[key]) as T[Extract<keyof T, string>] extends EnhancedValue<infer U> ? U : T[Extract<keyof T, string>];
    }
  }

  return result;
}
