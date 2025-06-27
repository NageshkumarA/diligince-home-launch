
# Contexts Directory

## Overview
This directory contains React Context providers that manage global application state. Contexts provide cross-cutting concerns and shared state across different parts of the application.

## Available Contexts

### Core Contexts

#### UserContext (`UserContext.tsx`)
- **Purpose**: Manages user authentication state and profile information
- **Provides**: User data, authentication status, user type identification
- **Usage**: Wrapped around entire app in App.tsx
- **Key Features**:
  - User type detection (Industry, Professional, Vendor)
  - Profile completion status tracking
  - Authentication state management

#### ThemeContext (`ThemeContext.tsx`)
- **Purpose**: Manages application theme and appearance settings
- **Provides**: Theme state, theme switching functionality
- **Integration**: Works with next-themes for system theme detection
- **Features**:
  - Light/dark/system theme options
  - User-type specific color schemes
  - Persistent theme preferences

#### NotificationContext (`NotificationContext.tsx`)
- **Purpose**: Manages application-wide notifications and messages
- **Provides**: Notification state, notification actions
- **Features**:
  - Toast notifications
  - In-app notification bell
  - Notification history and management
  - Real-time notification updates

#### NotificationStoreContext (`NotificationStoreContext.tsx`)
- **Purpose**: Advanced notification state management with persistence
- **Provides**: Persistent notification storage and retrieval
- **Features**:
  - Notification categorization
  - Read/unread status tracking
  - Notification filtering and search

### Business Logic Contexts

#### RequirementContext (`RequirementContext.tsx`)
- **Purpose**: Manages requirement creation and editing state
- **Provides**: Multi-step form state, requirement data
- **Usage**: Wraps requirement creation flows
- **Features**:
  - Form step navigation
  - Draft requirement storage
  - Validation state management
  - Document attachment handling

#### VendorSpecializationContext (`VendorSpecializationContext.tsx`)
- **Purpose**: Manages vendor specialization data and matching logic
- **Provides**: Vendor categorization, specialization mapping
- **Features**:
  - Service/Product/Logistics vendor categorization
  - Skill and capability matching
  - Vendor recommendation logic
  - Industry-specific vendor filtering

## Context Architecture

### Provider Hierarchy
```typescript
// App.tsx provider nesting
<UserProvider>
  <ThemeProvider>
    <RequirementProvider>
      <VendorSpecializationProvider>
        <NotificationProvider>
          {/* App components */}
        </NotificationProvider>
      </VendorSpecializationProvider>
    </RequirementProvider>
  </ThemeProvider>
</UserProvider>
```

### Standard Context Pattern
```typescript
// Context creation pattern
interface ContextType {
  // State interface
}

const Context = createContext<ContextType | undefined>(undefined);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  // Context logic and state
  const value = {
    // Context value
  };

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
};

// Custom hook for context usage
export const useContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useContext must be used within ContextProvider');
  }
  return context;
};
```

## Context Usage Guidelines

### Best Practices
1. **Single Responsibility**: Each context manages one specific domain
2. **Type Safety**: Proper TypeScript interfaces for all context values
3. **Error Handling**: Throw errors when hooks used outside providers
4. **Performance**: Optimize re-renders with useMemo and useCallback
5. **Testing**: Provide test utilities for context mocking

### Performance Considerations
- Split contexts by update frequency
- Use multiple contexts instead of one large context
- Implement context selectors for specific data access
- Avoid passing complex objects that change frequently

### State Management Strategy
- **Local State**: Component-specific state with useState
- **Context State**: Cross-component shared state
- **Server State**: API data with React Query
- **URL State**: Navigation and filter state with React Router

## Integration Points

### With Components
- Header components use UserContext for navigation
- Dashboard components use NotificationContext for alerts
- Form components use RequirementContext for state management

### With Hooks
- Custom hooks often consume multiple contexts
- Hooks provide abstraction layer over context complexity
- Business logic hooks combine context data with API calls

### With Pages
- Page components typically consume contexts at top level
- Context data drives conditional rendering and navigation
- Pages coordinate between multiple contexts for complex workflows

## Data Flow Patterns

### User Authentication Flow
1. UserContext manages authentication state
2. Components consume user data for conditional rendering
3. Protected routes check authentication status
4. User type determines available features and navigation

### Notification Flow
1. Business actions trigger notifications
2. NotificationContext manages notification state
3. UI components display notifications via context
4. User interactions update notification status

### Requirement Creation Flow
1. RequirementContext manages multi-step form state
2. Step components read/write to context
3. Context validates and persists draft data
4. Final submission triggers API calls and navigation

## Testing Strategies
- Provide mock context providers for testing
- Test context logic in isolation
- Integration tests for context interactions
- Mock API calls in context-dependent tests

## Contributing
1. Follow established context patterns
2. Add proper TypeScript interfaces
3. Implement error boundaries for context failures
4. Add JSDoc comments for complex context logic
5. Consider performance implications of context changes
6. Update provider hierarchy documentation when adding new contexts
