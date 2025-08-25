# Diligince.ai Frontend Analysis Document
## Complete Technical Specification for Backend Development

---

## Table of Contents
1. [Project Overview & Architecture](#project-overview--architecture)
2. [User Type Analysis](#user-type-analysis)
3. [Cross-Cutting Concerns](#cross-cutting-concerns)
4. [Backend API Requirements](#backend-api-requirements)
5. [Data Models & Relationships](#data-models--relationships)
6. [Authentication & Authorization](#authentication--authorization)
7. [Integration Requirements](#integration-requirements)

---

## Project Overview & Architecture

### Technology Stack
- **Frontend**: React 18.3.1 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design tokens
- **UI Library**: Radix UI components with shadcn/ui
- **Form Management**: React Hook Form with Zod validation
- **Routing**: React Router DOM v6
- **State Management**: React Context API + Custom Hooks
- **Charts**: Recharts
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Date Handling**: date-fns

### Project Structure
```
src/
├── components/          # Reusable UI components
├── contexts/           # React Context providers
├── hooks/             # Custom React hooks
├── pages/             # Route components
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
└── lib/               # Library configurations
```

### Key Architecture Patterns
- **Component Composition**: Modular, reusable components
- **Custom Hooks**: Business logic separation
- **Context-based State**: Global state management
- **Type Safety**: Comprehensive TypeScript usage
- **Form Validation**: Zod schemas with React Hook Form
- **Error Boundaries**: Robust error handling

---

## User Type Analysis

## 1. Industry Users (Manufacturing Companies)

### Pages
- **IndustryDashboard** (`/industry-dashboard`)
  - Purpose: Main control center for manufacturing operations
  - Features: KPI metrics, workflow tracking, quick actions
  
- **CreateRequirement** (`/create-requirement`)
  - Purpose: Multi-step requirement creation process
  - Features: 6-step wizard, document upload, approval workflow
  
- **IndustryRequirements** (`/industry-requirements`)
  - Purpose: Manage all requirements and RFQs
  - Features: Filtering, status tracking, bulk operations
  
- **CreatePurchaseOrder** (`/create-purchase-order`)
  - Purpose: Purchase order creation and management
  - Features: ISO compliance, vendor selection, workflow integration
  
- **IndustryProjectWorkflow** (`/industry-project-workflow/:id`)
  - Purpose: Project tracking and milestone management
  - Features: Timeline view, payment tracking, vendor communication
  
- **IndustryStakeholders** (`/industry-stakeholders`)
  - Purpose: Vendor and expert management
  - Features: Stakeholder profiles, performance tracking, communication
  
- **IndustryApprovalMatrix** (`/industry-approval-matrix`)
  - Purpose: Configure approval workflows
  - Features: Matrix configuration, role-based approvals, workflow automation
  
- **IndustryProfile** (`/industry-profile`)
  - Purpose: Company profile and settings management
  - Features: Company information, team management, system configuration

### Key Components
- **IndustryHeader**: Navigation and user controls
- **RequirementStepIndicator**: Multi-step process visualization
- **POReviewStep**: Purchase order review and approval
- **WorkTimeline**: Project progress visualization
- **QuoteComparisonCard**: Vendor quote analysis
- **PaymentMilestoneTracker**: Financial milestone tracking
- **ISO9001TermsSection**: Compliance management
- **ApprovalMatrixConfiguration**: Workflow setup

### Modals
- **SendRFQModal**: RFQ distribution to stakeholders
- **AddVendorModal**: Vendor onboarding and selection
- **AddExpertModal**: Expert consultant addition
- **PODetailsModal**: Purchase order details view
- **QuickPOModal**: Rapid purchase order creation
- **POTypeSelectionModal**: Purchase order type selection
- **ManualPOUploadModal**: Manual PO document upload

### Contexts
- **RequirementContext**: Requirement state management
- **ApprovalContext**: Approval workflow management
- **EnhancedApprovalContext**: Advanced approval features
- **StakeholderContext**: Stakeholder data management

### Types
- **industry.ts**: Core industry data structures
- **approval.ts**: Approval workflow types
- **enhancedApproval.ts**: Advanced approval types
- **workflow.ts**: Project workflow types
- **rfq.ts**: RFQ and quote management types
- **purchaseOrder.ts**: Purchase order structures

### Hooks
- **useAsyncOperation**: Async operation management
- **useNotifications**: Toast notification system
- **usePagination**: Data pagination
- **useSearch**: Search functionality
- **useModal**: Modal state management

### Utils
- **statusUtils**: Status badge and color management
- **dateUtils**: Date formatting and calculations
- **profileCompleteness**: Profile completion tracking
- **colorUtils**: Theme and color utilities

### API Requirements
```typescript
// Requirements Management
POST /api/industry/requirements
GET /api/industry/requirements
PUT /api/industry/requirements/:id
DELETE /api/industry/requirements/:id
POST /api/industry/requirements/:id/approve

// RFQ Distribution
POST /api/industry/rfqs
GET /api/industry/rfqs
POST /api/industry/rfqs/:id/send
GET /api/industry/rfqs/:id/responses

// Purchase Orders
POST /api/industry/purchase-orders
GET /api/industry/purchase-orders
PUT /api/industry/purchase-orders/:id
POST /api/industry/purchase-orders/:id/approve

// Workflows
GET /api/industry/workflows
POST /api/industry/workflows/:id/update-status
GET /api/industry/workflows/:id/timeline

// Stakeholders
GET /api/industry/stakeholders
POST /api/industry/stakeholders/invite
PUT /api/industry/stakeholders/:id
DELETE /api/industry/stakeholders/:id

// Approval Matrix
GET /api/industry/approval-matrix
PUT /api/industry/approval-matrix
POST /api/industry/approval-matrix/workflows
```

---

## 2. Professional Experts (Consultants/Specialists)

### Pages
- **ProfessionalDashboard** (`/professional-dashboard`)
  - Purpose: Personal dashboard for consultants
  - Features: Job opportunities, project status, earnings tracking
  
- **ProfessionalOpportunities** (`/professional-opportunities`)
  - Purpose: Browse and apply for consulting opportunities
  - Features: Job search, application management, proposal creation
  
- **ProfessionalCalendar** (`/professional-calendar`)
  - Purpose: Availability and schedule management
  - Features: Calendar integration, availability slots, booking management
  
- **ProfessionalProfile** (`/professional-profile`)
  - Purpose: Professional profile management
  - Features: Skills, certifications, portfolio, rates

### Key Components
- **ProfessionalHeader**: Navigation specific to professionals
- **ProfessionalSidebar**: Professional-specific navigation
- **DashboardStats**: Performance metrics and KPIs
- **JobOpportunities**: Available job listings
- **OngoingProjects**: Current project tracking
- **AvailabilityCalendar**: Schedule management
- **EnhancedAvailabilityCalendar**: Advanced calendar features

### Forms
- **PersonalInfoForm**: Basic profile information
- **SkillsForm**: Skills and expertise management
- **ExperienceForm**: Work experience and portfolio
- **CertificationsForm**: Professional certifications
- **PaymentSettingsForm**: Payment and billing preferences
- **AccountSettingsForm**: Account configuration

### Modals
- **JobApplicationModal**: Job application submission
- **ProjectDetailsModal**: Detailed project information
- **BulkAvailabilityModal**: Bulk schedule updates
- **CalendarSyncModal**: External calendar integration
- **CalendarTemplatesModal**: Schedule templates
- **DayDetailsModal**: Daily schedule details
- **FilterModal**: Search and filter options

### Calendar Components
- **DayView**: Single day schedule view
- **WeekView**: Weekly schedule overview
- **CalendarSyncModal**: External calendar integration
- **FilterModal**: Calendar filtering options

### API Requirements
```typescript
// Professional Profile
GET /api/professionals/profile
PUT /api/professionals/profile
POST /api/professionals/skills
DELETE /api/professionals/skills/:id

// Job Opportunities
GET /api/professionals/opportunities
POST /api/professionals/opportunities/:id/apply
GET /api/professionals/applications

// Calendar & Availability
GET /api/professionals/calendar
POST /api/professionals/availability
PUT /api/professionals/availability/:id
DELETE /api/professionals/availability/:id

// Projects
GET /api/professionals/projects
GET /api/professionals/projects/:id
POST /api/professionals/projects/:id/update

// Certifications
GET /api/professionals/certifications
POST /api/professionals/certifications
PUT /api/professionals/certifications/:id
DELETE /api/professionals/certifications/:id
```

---

## 3. Service Vendors (Service Providers)

### Pages
- **ServiceVendorDashboard** (`/service-vendor-dashboard`)
  - Purpose: Service vendor main control center
  - Features: RFQ management, project tracking, team coordination
  
- **ServiceVendorRFQs** (`/service-vendor-rfqs`)
  - Purpose: RFQ response and proposal management
  - Features: RFQ browsing, proposal creation, submission tracking
  
- **ServiceVendorProjects** (`/service-vendor-projects`)
  - Purpose: Active project management
  - Features: Project status, milestone tracking, deliverable management
  
- **ServiceVendorServices** (`/service-vendor-services`)
  - Purpose: Service catalog management
  - Features: Service listings, pricing, capability showcase
  
- **ServiceVendorProfile** (`/service-vendor-profile`)
  - Purpose: Vendor profile and company information
  - Features: Company details, team management, certifications

### Key Components
- **ServiceVendorHeader**: Service vendor navigation
- **ServiceVendorSidebar**: Service-specific sidebar navigation
- **RFQManagement**: RFQ browsing and response system
- **ActiveProjects**: Current project dashboard
- **TeamAvailability**: Team member availability tracking
- **DashboardStats**: Service vendor KPIs

### Modals
- **RFQDetailsModal**: Detailed RFQ information
- **ProposalCreationModal**: Proposal writing interface
- **ProjectDetailsModal**: Project information and updates
- **ServiceModal**: Service creation and editing
- **TeamManagementModal**: Team member management

### Forms
- **CompanyInfoForm**: Basic company information
- **ServicesSkillsForm**: Service offerings and capabilities
- **TeamMembersSection**: Team member management
- **CertificationsSection**: Company certifications
- **ProjectsPortfolioSection**: Portfolio and past projects

### API Requirements
```typescript
// RFQ Management
GET /api/service-vendors/rfqs
GET /api/service-vendors/rfqs/:id
POST /api/service-vendors/rfqs/:id/respond
GET /api/service-vendors/proposals

// Project Management
GET /api/service-vendors/projects
POST /api/service-vendors/projects/:id/update
GET /api/service-vendors/projects/:id/milestones
POST /api/service-vendors/projects/:id/deliverables

// Service Catalog
GET /api/service-vendors/services
POST /api/service-vendors/services
PUT /api/service-vendors/services/:id
DELETE /api/service-vendors/services/:id

// Team Management
GET /api/service-vendors/team
POST /api/service-vendors/team
PUT /api/service-vendors/team/:id
DELETE /api/service-vendors/team/:id
GET /api/service-vendors/team/availability
```

---

## 4. Product Vendors (Product Suppliers)

### Pages
- **ProductVendorDashboard** (`/product-vendor-dashboard`)
  - Purpose: Product vendor operations center
  - Features: Order management, inventory tracking, RFQ responses
  
- **ProductVendorCatalog** (`/product-vendor-catalog`)
  - Purpose: Product catalog management
  - Features: Product listings, inventory, pricing, specifications
  
- **ProductVendorOrders** (`/product-vendor-orders`)
  - Purpose: Order processing and fulfillment
  - Features: Order tracking, shipping, invoicing, returns
  
- **ProductVendorRFQs** (`/product-vendor-rfqs`)
  - Purpose: Product RFQ management
  - Features: Quote generation, pricing, delivery terms
  
- **ProductVendorProfile** (`/product-vendor-profile`)
  - Purpose: Vendor profile and settings
  - Features: Company information, certifications, partnerships

### Key Components
- **ProductVendorHeader**: Product vendor navigation
- **ProductVendorSidebar**: Product-specific navigation
- **OrdersManagement**: Order processing interface
- **ProductCatalogView**: Product display and management
- **RFQManagement**: Product RFQ handling

### Modals
- **OrderDetailsModal**: Detailed order information
- **QuotationModal**: Quote creation interface

### Forms
- **CompanyInfoForm**: Company profile management
- **ProductCatalogSection**: Product catalog management
- **BrandsPartnersSection**: Brand and partnership information
- **ShippingReturnsSection**: Shipping and return policies
- **CertificationsSection**: Product and company certifications

### API Requirements
```typescript
// Product Catalog
GET /api/product-vendors/catalog
POST /api/product-vendors/products
PUT /api/product-vendors/products/:id
DELETE /api/product-vendors/products/:id
GET /api/product-vendors/products/:id/inventory

// Order Management
GET /api/product-vendors/orders
GET /api/product-vendors/orders/:id
POST /api/product-vendors/orders/:id/update-status
POST /api/product-vendors/orders/:id/ship
POST /api/product-vendors/orders/:id/invoice

// RFQ & Quotations
GET /api/product-vendors/rfqs
POST /api/product-vendors/rfqs/:id/quote
GET /api/product-vendors/quotes
PUT /api/product-vendors/quotes/:id

// Inventory Management
GET /api/product-vendors/inventory
POST /api/product-vendors/inventory/update
GET /api/product-vendors/inventory/reports
```

---

## 5. Logistics Vendors (Transportation/Logistics)

### Pages
- **LogisticsVendorDashboard** (`/logistics-vendor-dashboard`)
  - Purpose: Logistics operations command center
  - Features: Transport requests, fleet management, delivery tracking
  
- **LogisticsVendorRequests** (`/logistics-vendor-requests`)
  - Purpose: Transportation request management
  - Features: Request processing, route optimization, capacity planning
  
- **LogisticsVendorFleet** (`/logistics-vendor-fleet`)
  - Purpose: Fleet and equipment management
  - Features: Vehicle tracking, maintenance, driver assignment
  
- **LogisticsVendorDeliveries** (`/logistics-vendor-deliveries`)
  - Purpose: Active delivery tracking
  - Features: Real-time tracking, status updates, proof of delivery
  
- **LogisticsVendorProfile** (`/logistics-vendor-profile`)
  - Purpose: Logistics company profile
  - Features: Fleet information, service areas, certifications

### Key Components
- **LogisticsVendorHeader**: Logistics-specific navigation
- **LogisticsVendorSidebar**: Specialized sidebar with equipment focus
- **TransportRequests**: Request management interface
- **ActiveDeliveries**: Real-time delivery tracking
- **EquipmentFleet**: Fleet management dashboard
- **SpecializationFeatures**: Equipment-specific features

### Modals
- **RequestDetailsModal**: Transport request details
- **CustomQuoteModal**: Custom quotation creation
- **LiveTrackingModal**: Real-time delivery tracking
- **VehicleDetailsModal**: Vehicle information and status
- **VehicleTrackingModal**: Vehicle location tracking
- **AddVehicleModal**: New vehicle registration
- **AddDriverModal**: Driver onboarding
- **ContactDriverModal**: Driver communication
- **UpdateDeliveryStatusModal**: Delivery status updates
- **RouteOptimizerModal**: Route planning optimization
- **EquipmentDeploymentModal**: Equipment deployment planning

### Forms & Sections
- **CompanyInfoForm**: Logistics company information
- **FleetEquipmentSection**: Fleet and equipment management
- **ServiceAreasSection**: Geographic service coverage
- **LicensesPermitsSection**: Required certifications and permits
- **DriversPersonnelSection**: Staff and operator management

### Specialization Context
- Uses **VendorSpecializationContext** for equipment-specific features
- Supports specializations: heavy-equipment, crane-services, general-logistics
- Dynamic UI adaptation based on specialization type

### API Requirements
```typescript
// Transport Requests
GET /api/logistics-vendors/requests
GET /api/logistics-vendors/requests/:id
POST /api/logistics-vendors/requests/:id/accept
POST /api/logistics-vendors/requests/:id/quote

// Fleet Management
GET /api/logistics-vendors/fleet
POST /api/logistics-vendors/vehicles
PUT /api/logistics-vendors/vehicles/:id
DELETE /api/logistics-vendors/vehicles/:id
GET /api/logistics-vendors/vehicles/:id/tracking

// Delivery Management
GET /api/logistics-vendors/deliveries
POST /api/logistics-vendors/deliveries/:id/update-status
GET /api/logistics-vendors/deliveries/:id/tracking
POST /api/logistics-vendors/deliveries/:id/proof

// Driver Management
GET /api/logistics-vendors/drivers
POST /api/logistics-vendors/drivers
PUT /api/logistics-vendors/drivers/:id
DELETE /api/logistics-vendors/drivers/:id
GET /api/logistics-vendors/drivers/availability

// Route Optimization
POST /api/logistics-vendors/routes/optimize
GET /api/logistics-vendors/routes/:id
POST /api/logistics-vendors/routes/:id/update
```

---

## Cross-Cutting Concerns

### Shared Components
- **BaseModal**: Standard modal wrapper
- **ConfirmationModal**: User confirmation dialogs
- **DetailsModal**: Generic detail view modal
- **FormModal**: Form-based modal wrapper
- **LoadingSpinner**: Loading state indicators
- **SkeletonLoader**: Content loading skeletons
- **ErrorBoundary**: Error handling wrapper
- **NotificationBell**: System notifications
- **ProfileCompletionWidget**: Profile completion tracking

### Authentication Components
- **AuthLayout**: Authentication page wrapper
- **SignInForm**: User login interface
- **IndustrySignUpForm**: Industry user registration

### Shared Contexts
- **UserContext**: User authentication and profile
- **ThemeContext**: UI theme management
- **NotificationContext**: System notifications
- **NotificationStoreContext**: Notification persistence

### Shared Hooks
- **useAuth**: Authentication management
- **useAsyncOperation**: Async operation handling
- **useNotifications**: Toast notifications
- **usePagination**: Data pagination
- **useSearch**: Search functionality
- **useModal**: Modal state management
- **useFastData**: Optimized data fetching
- **usePerformanceMonitor**: Performance tracking

### Shared Utils
- **authUtils**: Authentication helpers
- **dateUtils**: Date formatting and manipulation
- **colorUtils**: Color and theme utilities
- **statusUtils**: Status badge management
- **shared**: Common utility functions
- **vendorSpecializationMapping**: Vendor type mappings

### Shared Types
- **shared.ts**: Common type definitions
- **dashboard.ts**: Dashboard-specific types
- **notifications.ts**: Notification system types

---

## Backend API Requirements

### Authentication & User Management
```typescript
// Authentication
POST /api/auth/login
POST /api/auth/register
POST /api/auth/refresh
POST /api/auth/logout
POST /api/auth/forgot-password
POST /api/auth/reset-password

// User Profile
GET /api/users/profile
PUT /api/users/profile
POST /api/users/avatar
DELETE /api/users/avatar
GET /api/users/notifications
PUT /api/users/notification-settings
```

### File Management
```typescript
// File Upload
POST /api/files/upload
GET /api/files/:id
DELETE /api/files/:id
POST /api/files/:id/version
GET /api/files/:id/versions
```

### Notification System
```typescript
// Notifications
GET /api/notifications
POST /api/notifications/mark-read
DELETE /api/notifications/:id
GET /api/notifications/settings
PUT /api/notifications/settings
```

### Messaging System
```typescript
// Messages
GET /api/messages
POST /api/messages
GET /api/messages/:id
PUT /api/messages/:id/read
DELETE /api/messages/:id
GET /api/messages/conversations
```

### Search & Filtering
```typescript
// Global Search
GET /api/search?q=:query&type=:type&filters=:filters
GET /api/search/suggestions?q=:query
```

### Analytics & Reporting
```typescript
// Analytics
GET /api/analytics/dashboard
GET /api/analytics/performance
GET /api/analytics/reports
POST /api/analytics/custom-report
```

---

## Data Models & Relationships

### Core Entities
- **User**: Base user entity with role-based access
- **Industry**: Manufacturing company profiles
- **Professional**: Consultant/expert profiles
- **Vendor**: Service/product/logistics vendor profiles
- **Requirement**: Industry requirements and specifications
- **RFQ**: Request for quotation documents
- **Quote**: Vendor responses to RFQs
- **PurchaseOrder**: Purchase order documents
- **Project**: Active project workflows
- **Milestone**: Project milestone tracking
- **Payment**: Payment processing and tracking
- **Notification**: System notification management

### Relationships
- User -> Industry/Professional/Vendor (1:1 profile relationship)
- Industry -> Requirements (1:Many)
- Requirement -> RFQs (1:Many)
- RFQ -> Quotes (1:Many)
- Quote -> PurchaseOrder (1:1 when accepted)
- PurchaseOrder -> Project (1:1)
- Project -> Milestones (1:Many)
- Project -> Payments (1:Many)

---

## Authentication & Authorization

### Role-Based Access Control
- **Industry**: Full access to requirements, RFQs, purchase orders, workflows
- **Professional**: Access to opportunities, calendar, profile, projects
- **ServiceVendor**: Access to RFQs, proposals, projects, services
- **ProductVendor**: Access to RFQs, catalog, orders, inventory
- **LogisticsVendor**: Access to requests, fleet, deliveries, tracking

### Permission Matrix
```typescript
interface Permission {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}

interface RolePermissions {
  requirements: Permission;
  rfqs: Permission;
  purchaseOrders: Permission;
  projects: Permission;
  // ... other resources
}
```

---

## Integration Requirements

### Real-time Features
- WebSocket connections for live updates
- Real-time notifications
- Live project tracking
- Fleet tracking for logistics vendors

### External Integrations
- Email service (SendGrid/AWS SES)
- SMS service (Twilio)
- File storage (AWS S3/MongoDB GridFS)
- Payment processing
- Calendar integration (Google Calendar, Outlook)

### API Response Format
```typescript
interface APIResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: ValidationError[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
```

This comprehensive analysis provides all the necessary information to build a robust Node.js backend that fully supports the Diligince.ai frontend functionality across all user types and use cases.
