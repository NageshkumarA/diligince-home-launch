
# Lib Directory

## Overview
This directory contains utility libraries and shared functions that provide common functionality across the application. These utilities are pure functions and reusable modules that don't depend on React or component-specific logic.

## Current Structure

### Core Utilities

#### utils.ts
- **Purpose**: Core utility functions and helpers
- **Key Functions**:
  - `cn()` - Tailwind class name merging utility using clsx and tailwind-merge
  - String manipulation utilities
  - Object and array helpers
  - Type checking utilities
  - Data transformation functions

## Utility Categories

### Styling Utilities
```typescript
// Class name merging for Tailwind CSS
import { cn } from "@/lib/utils";

// Usage example
const className = cn(
  "base-classes",
  condition && "conditional-classes",
  variant === "primary" && "primary-classes"
);
```

### Data Transformation
```typescript
// Common data transformation utilities
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};
```

### Validation Utilities
```typescript
// Input validation helpers
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhoneNumber = (phone: string): boolean => {
  // Phone validation logic
  return /^\+?[\d\s-()]+$/.test(phone);
};
```

### String Utilities
```typescript
// String manipulation helpers
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const truncate = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};
```

### Array Utilities
```typescript
// Array manipulation helpers
export const unique = <T>(array: T[]): T[] => {
  return [...new Set(array)];
};

export const groupBy = <T>(array: T[], key: keyof T): Record<string, T[]> => {
  return array.reduce((groups, item) => {
    const groupKey = String(item[key]);
    groups[groupKey] = groups[groupKey] || [];
    groups[groupKey].push(item);
    return groups;
  }, {} as Record<string, T[]>);
};

export const sortBy = <T>(array: T[], key: keyof T): T[] => {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    if (aVal < bVal) return -1;
    if (aVal > bVal) return 1;
    return 0;
  });
};
```

### Object Utilities
```typescript
// Object manipulation helpers
export const omit = <T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> => {
  const result = { ...obj };
  keys.forEach(key => delete result[key]);
  return result;
};

export const pick = <T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> => {
  const result = {} as Pick<T, K>;
  keys.forEach(key => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
};

export const deepMerge = (target: any, source: any): any => {
  // Deep object merging logic
  if (typeof target !== 'object' || typeof source !== 'object') {
    return source;
  }
  
  const result = { ...target };
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object') {
      result[key] = deepMerge(target[key], source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
};
```

### Type Utilities
```typescript
// Type checking utilities
export const isString = (value: unknown): value is string => {
  return typeof value === 'string';
};

export const isNumber = (value: unknown): value is number => {
  return typeof value === 'number' && !isNaN(value);
};

export const isObject = (value: unknown): value is Record<string, any> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};

export const isArray = (value: unknown): value is unknown[] => {
  return Array.isArray(value);
};
```

## Planned Utility Categories

### API Client Utilities
```typescript
// HTTP client configuration and interceptors
export class ApiClient {
  private baseUrl: string;
  
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  
  async get<T>(endpoint: string): Promise<T> {
    // GET request implementation
  }
  
  async post<T>(endpoint: string, data: any): Promise<T> {
    // POST request implementation
  }
}
```

### Local Storage Utilities
```typescript
// Safe localStorage operations
export const storage = {
  get: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  
  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  },
  
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Failed to remove from localStorage:', error);
    }
  }
};
```

### Encryption and Security Utilities
```typescript
// Client-side encryption utilities (if needed)
export const security = {
  hashString: async (str: string): Promise<string> => {
    // String hashing implementation
  },
  
  generateId: (): string => {
    // Unique ID generation
    return crypto.randomUUID();
  },
  
  sanitizeHtml: (html: string): string => {
    // HTML sanitization
  }
};
```

### Performance Utilities
```typescript
// Performance monitoring and optimization
export const performance = {
  debounce: <T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): (...args: Parameters<T>) => void => {
    let timeoutId: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  },
  
  throttle: <T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): (...args: Parameters<T>) => void => {
    let lastExecution = 0;
    return (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastExecution >= delay) {
        func(...args);
        lastExecution = now;
      }
    };
  }
};
```

## Testing Utilities
```typescript
// Test helpers and mocks
export const testUtils = {
  createMockUser: (overrides = {}): User => ({
    id: 'test-id',
    name: 'Test User',
    email: 'test@example.com',
    type: 'industry',
    ...overrides,
  }),
  
  delay: (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
  },
  
  mockApiResponse: <T>(data: T, delay = 100): Promise<T> => {
    return new Promise(resolve => {
      setTimeout(() => resolve(data), delay);
    });
  }
};
```

## Integration Guidelines

### Importing Utilities
```typescript
// Import specific utilities
import { cn, formatCurrency, isValidEmail } from "@/lib/utils";

// Use in components
const Component = () => {
  const className = cn("base-class", isActive && "active-class");
  const price = formatCurrency(100);
  
  return <div className={className}>{price}</div>;
};
```

### Tree Shaking Optimization
- Export utilities as named exports for better tree shaking
- Avoid default exports for utility collections
- Keep utility functions pure and side-effect free

## Best Practices

### Function Design
1. **Pure Functions**: Utilities should be pure functions without side effects
2. **Single Responsibility**: Each utility should have one clear purpose
3. **Type Safety**: Use proper TypeScript types and generic constraints
4. **Error Handling**: Handle edge cases gracefully
5. **Performance**: Consider performance implications for frequently used utilities

### Documentation
```typescript
/**
 * Merges multiple class names using clsx and tailwind-merge
 * @param inputs - Class names to merge
 * @returns Merged class name string
 * @example
 * cn('base-class', condition && 'conditional-class', 'another-class')
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### Testing
```typescript
// Unit tests for utilities
describe('formatCurrency', () => {
  it('should format number as USD currency', () => {
    expect(formatCurrency(100)).toBe('$100.00');
    expect(formatCurrency(1234.56)).toBe('$1,234.56');
  });
  
  it('should handle zero and negative values', () => {
    expect(formatCurrency(0)).toBe('$0.00');
    expect(formatCurrency(-100)).toBe('-$100.00');
  });
});
```

## Contributing

### Adding New Utilities
1. Place utilities in appropriate category files
2. Use descriptive function names
3. Add comprehensive JSDoc comments
4. Include unit tests
5. Consider performance implications
6. Ensure type safety

### File Organization
- Group related utilities in the same file
- Create new files for distinct utility categories
- Maintain consistent export patterns
- Update this README when adding new categories

### Code Quality
- Follow existing code style and patterns
- Add TypeScript types for all parameters and return values
- Handle edge cases and error conditions
- Optimize for performance when appropriate
- Write comprehensive tests for complex utilities
