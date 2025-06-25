
# Hooks Directory

## Overview
This directory contains custom React hooks that encapsulate reusable logic and stateful behavior. Hooks provide abstraction layers over complex operations and promote code reuse across components.

## Available Custom Hooks

### UI and Interaction Hooks

#### useModal (`useModal.ts`)
- **Purpose**: Manages modal open/close state and related logic
- **Returns**: Modal state, open/close functions, and modal props
- **Usage**: Dialog management, confirmation modals, form modals
- **Features**:
  - State management for modal visibility
  - Keyboard event handling (ESC key)
  - Focus management and accessibility
  - Multiple modal instance support

#### usePagination (`usePagination.ts`)
- **Purpose**: Handles pagination logic for lists and tables
- **Returns**: Current page, page navigation functions, pagination metadata
- **Features**:
  - Page state management
  - Total pages calculation
  - Navigation functions (next, previous, goto)
  - Boundary handling

#### useSearch (`useSearch.ts`)
- **Purpose**: Manages search functionality with debouncing and filtering
- **Returns**: Search term, search functions, filtered results
- **Features**:
  - Debounced search input
  - Real-time filtering
  - Search history management
  - Clear search functionality

### Business Logic Hooks

#### useNotifications (`useNotifications.ts`)
- **Purpose**: Manages notification state and operations
- **Returns**: Notifications, notification actions, unread count
- **Integration**: Works with NotificationContext
- **Features**:
  - Notification fetching and caching
  - Mark as read/unread functionality
  - Notification categorization
  - Real-time updates

#### useAsyncOperation (`useAsyncOperation.ts`)
- **Purpose**: Handles async operations with loading and error states
- **Returns**: Execute function, loading state, error state, result
- **Features**:
  - Automatic loading state management
  - Error handling and reporting
  - Result caching
  - Cleanup on unmount

### Mobile and Responsive Hooks

#### use-mobile (`use-mobile.tsx`)
- **Purpose**: Detects mobile viewport and responsive breakpoints
- **Returns**: Boolean indicating mobile state
- **Usage**: Conditional rendering for mobile/desktop layouts
- **Features**:
  - Responsive breakpoint detection
  - Window resize event handling
  - SSR safe implementation
  - Customizable breakpoint thresholds

### Toast Notification Hook

#### use-toast (`use-toast.ts`)
- **Purpose**: Provides toast notification functionality
- **Returns**: Toast function and toast management utilities
- **Integration**: Works with toast UI components
- **Features**:
  - Multiple toast types (success, error, warning, info)
  - Auto-dismiss functionality
  - Toast queuing and stacking
  - Custom positioning and styling

## Hook Patterns and Best Practices

### Standard Hook Structure
```typescript
import { useState, useEffect, useCallback } from 'react';

interface UseCustomHookOptions {
  // Hook configuration options
}

interface UseCustomHookReturn {
  // Hook return value interface
}

export const useCustomHook = (options: UseCustomHookOptions): UseCustomHookReturn => {
  // Hook implementation
  const [state, setState] = useState(initialState);
  
  // Memoized callbacks
  const memoizedCallback = useCallback(() => {
    // Callback logic
  }, [dependencies]);
  
  // Effects
  useEffect(() => {
    // Effect logic
    return () => {
      // Cleanup
    };
  }, [dependencies]);
  
  return {
    // Return values
  };
};
```

### Error Handling Pattern
```typescript
export const useAsyncHook = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const execute = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await someAsyncOperation();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);
  
  return { data, loading, error, execute };
};
```

### Cleanup Pattern
```typescript
export const useSubscription = () => {
  useEffect(() => {
    const subscription = subscribeToUpdates();
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);
};
```

## Hook Categories

### State Management Hooks
- **Local State**: Managing component-specific state
- **Global State**: Interfacing with context providers
- **Derived State**: Computing values from other state
- **Persistent State**: LocalStorage and SessionStorage integration

### Side Effect Hooks
- **API Calls**: Data fetching and mutation
- **Event Listeners**: DOM event handling
- **Timers**: setTimeout and setInterval management
- **Subscriptions**: WebSocket and real-time data

### Performance Hooks
- **Memoization**: Expensive calculation caching
- **Debouncing**: Input and event debouncing
- **Throttling**: Rate limiting for frequent operations
- **Virtual Scrolling**: Large list optimization

### Integration Hooks
- **Context Consumption**: Simplified context usage
- **Router Integration**: Navigation and route state
- **Form Handling**: Form state and validation
- **Media Queries**: Responsive design helpers

## Testing Custom Hooks

### Testing Strategy
```typescript
import { renderHook, act } from '@testing-library/react';
import { useCustomHook } from './useCustomHook';

describe('useCustomHook', () => {
  it('should initialize with correct default state', () => {
    const { result } = renderHook(() => useCustomHook());
    
    expect(result.current.someState).toBe(expectedValue);
  });
  
  it('should update state when action is called', () => {
    const { result } = renderHook(() => useCustomHook());
    
    act(() => {
      result.current.someAction();
    });
    
    expect(result.current.someState).toBe(newExpectedValue);
  });
});
```

### Mock Dependencies
```typescript
// Mock external dependencies in tests
jest.mock('@/contexts/SomeContext', () => ({
  useSomeContext: () => ({
    someValue: 'mocked value',
    someFunction: jest.fn(),
  }),
}));
```

## Performance Considerations

### Optimization Techniques
1. **Memoization**: Use useMemo and useCallback appropriately
2. **Dependency Arrays**: Minimize dependencies to prevent unnecessary re-runs
3. **Cleanup**: Always clean up subscriptions and timers
4. **Debouncing**: Implement debouncing for expensive operations
5. **Lazy Initialization**: Use lazy initial state when expensive

### Common Pitfalls
- Missing dependencies in useEffect
- Creating new objects/functions in render
- Not cleaning up side effects
- Overusing useCallback and useMemo
- Infinite re-render loops

## Integration Guidelines

### With Components
```typescript
const Component = () => {
  const { data, loading, error, refetch } = useAsyncData();
  
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  
  return <DataDisplay data={data} onRefresh={refetch} />;
};
```

### With Context
```typescript
export const useUserActions = () => {
  const { user, setUser } = useUserContext();
  
  const updateProfile = useCallback(async (updates) => {
    const updatedUser = await api.updateUser(user.id, updates);
    setUser(updatedUser);
  }, [user.id, setUser]);
  
  return { updateProfile };
};
```

## Contributing

### Adding New Hooks
1. Follow naming convention: `use[HookName]`
2. Add proper TypeScript types
3. Include JSDoc documentation
4. Add unit tests
5. Consider performance implications
6. Document usage examples

### Hook Documentation
```typescript
/**
 * Custom hook for managing user profile operations
 * @param userId - The ID of the user
 * @returns Object containing user data and actions
 * @example
 * const { user, loading, updateProfile } = useUserProfile(userId);
 */
export const useUserProfile = (userId: string) => {
  // Hook implementation
};
```

### Best Practices
1. Single responsibility principle
2. Consistent return value structure
3. Proper error handling
4. Cleanup side effects
5. TypeScript integration
6. Performance optimization
7. Test coverage
