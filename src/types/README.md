
# Types Directory

## Overview
This directory contains TypeScript type definitions that provide type safety across the application. Types are organized by domain and functionality to ensure consistent data structures and interfaces.

## Type Organization

### Core Domain Types

#### User and Authentication Types (`shared.ts`)
- **BaseUser**: Common user properties across all user types
- **UserType**: Enum for different user categories
- **AuthState**: Authentication status and user session data
- **ProfileCompletionStatus**: User onboarding progress tracking

#### Industry Types (`industry.ts`)
- **Industry**: Industry user profile and company information
- **IndustryDashboardData**: Dashboard metrics and statistics
- **CompanyProfile**: Company-specific information and settings
- **IndustryPreferences**: User preferences and configuration

#### Professional Types (`professional.ts`)
- **Professional**: Expert/consultant profile information
- **ProfessionalSkills**: Skills, certifications, and expertise areas
- **Availability**: Calendar and scheduling information
- **ProjectExperience**: Work history and portfolio data

#### Vendor Types (`vendor.ts`)
- **BaseVendor**: Common vendor properties
- **ServiceVendor**: Service provider specific data
- **ProductVendor**: Product supplier specific data
- **LogisticsVendor**: Transportation and logistics provider data
- **VendorCapabilities**: Skills, services, and capacity information

### Business Logic Types

#### Workflow Types (`workflow.ts`)
- **ProjectWorkflow**: Complete project lifecycle management
- **VendorQuote**: Quote submission and evaluation data
- **PurchaseOrder**: Purchase order creation and tracking
- **PaymentMilestone**: Payment scheduling and release triggers
- **RetentionPayment**: Payment retention and release logic
- **WorkflowEvent**: Timeline and status tracking events

#### Dashboard Types (`dashboard.ts`)
- **DashboardMetric**: Generic metric display structure
- **StatCard**: Dashboard statistic card configuration
- **ChartData**: Chart and graph data structures
- **NotificationData**: Dashboard notification information

#### Logistics Types (`logistics.ts`)
- **Vehicle**: Fleet vehicle information and specifications
- **Driver**: Driver profiles and availability
- **DeliveryRequest**: Transportation request details
- **TrackingData**: Real-time location and status tracking
- **Route**: Route optimization and planning data

### UI and Component Types

#### Vendor Sidebar Types (`vendor-sidebar.ts`)
- **SidebarItem**: Navigation menu item structure
- **VendorSidebarConfig**: Sidebar configuration by vendor type
- **NavigationState**: Active states and permissions

#### Team Member Types (`teamMember.ts`)
- **TeamMember**: Employee and team member profiles
- **Role**: Role-based permissions and access levels
- **TeamCapacity**: Resource allocation and availability

#### Notification Types (`notifications.ts`)
- **Notification**: Individual notification structure
- **NotificationCategory**: Notification type categorization
- **NotificationPreferences**: User notification settings
- **NotificationStatus**: Read/unread and priority status

## Type Patterns and Conventions

### Interface Naming
```typescript
// Entity interfaces use PascalCase
interface User {
  id: string;
  name: string;
}

// Props interfaces include 'Props' suffix
interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
}

// Event handler types use descriptive names
type UserEventHandler = (user: User) => void;
```

### Generic Types
```typescript
// Generic API response wrapper
interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// Generic list response
interface ListResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
```

### Union Types and Enums
```typescript
// Union types for specific string values
type UserStatus = 'active' | 'inactive' | 'pending';

// Enums for complex categorization
enum VendorType {
  SERVICE = 'service',
  PRODUCT = 'product',
  LOGISTICS = 'logistics'
}
```

### Optional and Nullable Types
```typescript
// Optional properties with ?
interface OptionalUser {
  id: string;
  name?: string; // Optional
  email: string | null; // Nullable
}

// Partial types for updates
type UserUpdate = Partial<User>;
```

## Type Safety Guidelines

### Strict Type Checking
- Enable strict mode in TypeScript configuration
- Avoid 'any' type usage
- Use type assertions sparingly and safely
- Implement proper null/undefined checking

### Type Guards
```typescript
// User-defined type guards
function isServiceVendor(vendor: BaseVendor): vendor is ServiceVendor {
  return vendor.type === VendorType.SERVICE;
}

// Utility type guards
function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}
```

### Discriminated Unions
```typescript
// Discriminated union for different vendor types
type Vendor = 
  | { type: 'service'; services: ServiceInfo[] }
  | { type: 'product'; catalog: ProductInfo[] }
  | { type: 'logistics'; fleet: VehicleInfo[] };
```

## Integration with Components

### Component Props
```typescript
// Strongly typed component props
interface DashboardProps {
  user: User;
  metrics: DashboardMetric[];
  onMetricClick: (metric: DashboardMetric) => void;
}

const Dashboard = ({ user, metrics, onMetricClick }: DashboardProps) => {
  // Component implementation
};
```

### Hook Return Types
```typescript
// Custom hook with proper return types
interface UseUserData {
  user: User | null;
  loading: boolean;
  error: string | null;
  updateUser: (updates: Partial<User>) => Promise<void>;
}

const useUserData = (): UseUserData => {
  // Hook implementation
};
```

## API Integration Types

### Request/Response Types
```typescript
// API request types
interface CreateUserRequest {
  name: string;
  email: string;
  type: UserType;
}

// API response types
interface CreateUserResponse {
  user: User;
  token: string;
}
```

### Error Types
```typescript
// Standardized error structure
interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}
```

## Type Utilities

### Common Utility Types
```typescript
// Pick specific properties
type UserSummary = Pick<User, 'id' | 'name' | 'email'>;

// Omit properties
type CreateUser = Omit<User, 'id' | 'createdAt'>;

// Make all properties optional
type PartialUser = Partial<User>;

// Make all properties required
type RequiredUser = Required<User>;
```

### Custom Utility Types
```typescript
// Deep partial for nested objects
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Non-nullable utility
type NonNullable<T> = T extends null | undefined ? never : T;
```

## Contributing Guidelines

### Adding New Types
1. Place types in appropriate domain-specific files
2. Use clear, descriptive names
3. Add JSDoc comments for complex types
4. Consider backward compatibility
5. Update related component props when changing types

### Type Documentation
```typescript
/**
 * Represents a user in the system
 * @interface User
 * @property {string} id - Unique identifier
 * @property {string} name - User's full name
 * @property {UserType} type - User category (industry, professional, vendor)
 * @property {Date} createdAt - Account creation timestamp
 */
interface User {
  id: string;
  name: string;
  type: UserType;
  createdAt: Date;
}
```

### Best Practices
1. Prefer interfaces over types for object shapes
2. Use union types for controlled string values
3. Implement proper null safety
4. Create reusable generic types
5. Maintain consistency across related types
6. Regular type auditing and cleanup
