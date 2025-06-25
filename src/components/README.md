
# Components Directory

## Overview
This directory contains all reusable UI components organized by functionality and user type. The components follow a hierarchical structure with shared components at the base and specialized components in subdirectories.

## Structure

### Core UI Components (`/ui`)
- **Location**: `src/components/ui/`
- **Purpose**: Shadcn/ui based components with consistent styling
- **Usage**: Foundation components used throughout the application
- **Key Files**: `button.tsx`, `card.tsx`, `table.tsx`, `form.tsx`, etc.

### User Type-Specific Components

#### Industry Components (`/industry`)
- **Purpose**: Components specific to industry users (manufacturing companies)
- **Key Components**:
  - `IndustryHeader.tsx` - Navigation header for industry dashboard
  - `EnterpriseTeamMembers.tsx` - Team management interface
  - `workflow/` - Project workflow management components

#### Professional Components (`/professional`)
- **Purpose**: Components for expert consultants and professionals
- **Key Components**:
  - `ProfessionalHeader.tsx` - Professional dashboard navigation
  - `ProfessionalSidebar.tsx` - Professional-specific navigation
  - `calendar/` - Advanced availability calendar system
  - `dashboard/` - Professional dashboard widgets
  - `forms/` - Profile and settings forms

#### Vendor Components (`/vendor`)
- **Purpose**: Components for all vendor types (service, product, logistics)
- **Structure**:
  - `service/` - Service vendor specific components
  - `product/` - Product vendor specific components
  - `logistics/` - Logistics vendor specific components
  - `shared/` - Common vendor components
  - `forms/` - Vendor profile forms

### Functional Components

#### Authentication (`/signup`)
- **Purpose**: User registration and onboarding flows
- **Components**: Type-specific registration forms

#### Requirements (`/requirement`)
- **Purpose**: Multi-step requirement creation wizard
- **Key Files**: `RequirementStepIndicator.tsx`, step components

#### Purchase Orders (`/purchase-order`)
- **Purpose**: Purchase order creation and management
- **Integration**: Works with workflow components

#### Shared Components (`/shared`)
- **Purpose**: Cross-cutting components used by multiple user types
- **Categories**:
  - `dashboard/` - Generic dashboard components
  - `layout/` - Layout and navigation components
  - `loading/` - Loading states and spinners
  - `messages/` - Message center components
  - `modals/` - Reusable modal components
  - `notifications/` - Notification system

## Component Patterns

### Naming Conventions
- PascalCase for component files: `ComponentName.tsx`
- Descriptive names indicating purpose: `VendorDashboardStats.tsx`
- User-type prefixes when applicable: `IndustryHeader.tsx`

### Component Structure
```typescript
// Standard component structure
interface ComponentProps {
  // Props with JSDoc comments
}

const Component = ({ prop1, prop2 }: ComponentProps) => {
  // Component logic
  return (
    // JSX with Tailwind classes
  );
};

export default Component;
```

### Styling Approach
- **Primary**: Tailwind CSS utility classes
- **Theme**: User-type specific color schemes
- **Responsive**: Mobile-first design approach
- **Components**: Shadcn/ui component library

## Dependencies
- React 18+ with TypeScript
- Tailwind CSS for styling
- Shadcn/ui component library
- Lucide React for icons
- React Router DOM for navigation
- React Hook Form for form handling

## Usage Guidelines

### Component Reuse
1. Check `/shared` components first for existing functionality
2. Create user-type specific variants when needed
3. Extract common logic into shared utilities

### State Management
- Local component state with useState/useReducer
- Context providers for shared state
- React Query for server state

### Error Handling
- Use ErrorBoundary components for error containment
- Implement proper loading and error states
- Toast notifications for user feedback

## Contributing
1. Follow existing folder structure and naming conventions
2. Add proper TypeScript types and JSDoc comments
3. Ensure responsive design and accessibility
4. Test components in isolation before integration
