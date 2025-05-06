
# Diligince.ai Codebase Documentation

## Project Overview
Diligince.ai is a comprehensive B2B platform connecting industries, professionals, and vendors for industrial services, procurement, and logistics. The platform facilitates requirement creation, vendor discovery, professional expertise, purchase orders, and payment processing.

## Tech Stack
- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Component Library**: shadcn/ui
- **Routing**: React Router DOM
- **Data Management**: TanStack Query (React Query)
- **Icons**: Lucide React
- **Toast Notifications**: Sonner and shadcn/ui Toaster
- **Forms**: React Hook Form with Zod validation

## Core Architecture

The application follows a component-based architecture with several key sections:

### 1. User Types
The platform caters to three primary user types, each with dedicated profiles and functionality:

- **Industries**: Manufacturing companies and businesses seeking services and products
- **Professionals**: Individual experts offering consulting and specialized services
- **Vendors**: Service providers, product suppliers, and logistics companies

### 2. Main Application Flow
1. User registration/login based on user type
2. Profile creation and management
3. Requirement or purchase order creation (for industries)
4. Vendor discovery and selection
5. Work assignment and tracking
6. Work completion and payment

### 3. Key Pages

#### Authentication
- **SignIn.tsx**: User login functionality
- **SignUp.tsx**: Registration with separate forms for each user type
  - IndustryForm.tsx
  - ProfessionalForm.tsx
  - VendorForm.tsx

#### Profile Management
- **IndustryProfile.tsx**: Industry user profile management
- **ProfessionalProfile.tsx**: Expert/consultant profile management
- **VendorProfile.tsx**: General vendor profile page
  - **ServiceVendorProfile.tsx**: Service provider specific profile
  - **ProductVendorProfile.tsx**: Product supplier specific profile
  - **LogisticsVendorProfile.tsx**: Logistics provider specific profile

#### Core Functionality
- **CreateRequirement.tsx**: Multi-step wizard for creating service requirements
- **CreatePurchaseOrder.tsx**: Flow for creating purchase orders
- **WorkCompletionPayment.tsx**: Verification and payment for completed work
- **Vendors.tsx**: Directory and discovery page for vendors
- **Experts.tsx**: Directory of professional consultants

#### Public/Marketing Pages
- **Index.tsx**: Homepage with key sections:
  - HeroSection.tsx
  - ValueProposition.tsx
  - AboutSection.tsx
  - FeaturesSection.tsx
  - TestimonialsSection.tsx
- **About.tsx**: Company information page
- **Pricing.tsx**: Service pricing details
- **Contact.tsx**: Contact information and form
- **Blog.tsx**: Blog posts and content
- **Careers.tsx**: Career opportunities
- **Privacy.tsx**: Privacy policy
- **Terms.tsx**: Terms of service

#### Dashboard
- **IndustryDashboard.tsx**: Dashboard for industry users

### 4. Component Structure

#### Layout Components
- **Navbar.tsx**: Main navigation for public pages
- **Footer.tsx**: Site footer with links and information

#### User Type-Specific Headers
- **VendorHeader.tsx**: Header for service vendor dashboard
- **LogisticsVendorHeader.tsx**: Header for logistics providers
- **ExpertHeader.tsx**: Header for professional consultants
- **PurchaseOrderHeader.tsx**: Header for purchase order related pages
- **RequirementHeader.tsx**: Header for requirement creation pages

#### User Type-Specific Sidebars
- **VendorSidebar.tsx**: Navigation sidebar for service vendors
- **ProductVendorSidebar.tsx**: Navigation for product suppliers
- **LogisticsVendorSidebar.tsx**: Navigation for logistics providers
- **ExpertSidebar.tsx**: Navigation for professional experts

#### Form Components
Each user type has specific form sections for profile completion:

**Industry Forms**
- Company information
- Industry sector details
- Payment settings
- Account settings

**Professional/Expert Forms**
- **PersonalInfoForm.tsx**: Basic information
- **SkillsForm.tsx**: Skills and expertise
- **ExperienceForm.tsx**: Work experience
- **CertificationsForm.tsx**: Professional certifications
- **AvailabilityCalendar.tsx**: Availability management
- **PaymentSettingsForm.tsx**: Payment preferences
- **AccountSettingsForm.tsx**: Account management

**Service Vendor Forms**
- **CompanyInfoForm.tsx**: Company details
- **TeamMembersSection.tsx**: Team management
- **ServicesSkillsForm.tsx**: Services offered
- **CertificationsSection.tsx**: Company certifications
- **ProjectsPortfolioSection.tsx**: Previous work
- **PaymentSettingsForm.tsx**: Payment preferences
- **AccountSettingsForm.tsx**: Account settings

**Product Vendor Forms**
- **CompanyInfoForm.tsx**: Company details
- **ProductCatalogSection.tsx**: Product listings
- **BrandsPartnersSection.tsx**: Brand relationships
- **CertificationsSection.tsx**: Certifications
- **ShippingReturnsSection.tsx**: Logistics policies
- **PaymentSettingsForm.tsx**: Payment options
- **AccountSettingsForm.tsx**: Account management

**Logistics Vendor Forms**
- **CompanyInfoForm.tsx**: Company information
- **FleetEquipmentSection.tsx**: Vehicle/equipment inventory
- **ServiceAreasSection.tsx**: Coverage areas
- **LicensesPermitsSection.tsx**: Legal documentation
- **DriversPersonnelSection.tsx**: Staff management
- **PaymentSettingsForm.tsx**: Payment settings
- **AccountSettingsForm.tsx**: Account management

#### Requirement Creation Components
A multi-step wizard with specialized components:
- **RequirementStepIndicator.tsx**: Progress visualization
- **BasicInfoStep.tsx**: Initial requirement information
- **DetailsStep.tsx**: Detailed specifications
- **DocumentsStep.tsx**: Supporting documentation
- **PreviewStep.tsx**: Review before submission
- **PublishStep.tsx**: Final publication
- **SuccessScreen.tsx**: Confirmation page

#### Purchase Order Components
- **PurchaseOrderStepIndicator.tsx**: Progress visualization
- Additional step components for PO creation process

### 5. Routing Structure

The application uses React Router DOM for navigation with routes defined in `App.tsx`:

#### Main Routes
- `/`: Homepage
- `/signup`: Registration page
- `/signin`: Login page
- `/about`, `/pricing`, `/contact`: Marketing pages
- `/blog`, `/careers`, `/privacy`, `/terms`: Informational pages

#### User Profile Routes
- `/industry-profile`: Industry user profiles
- `/professional-profile`: Expert profiles
- `/vendor-profile`: General vendor page
- `/service-vendor-profile`: Service provider profiles
- `/product-vendor-profile`: Product supplier profiles
- `/logistics-vendor-profile`: Logistics provider profiles

#### Functional Routes
- `/industry-dashboard`: Dashboard for industry users
- `/create-requirement`: Requirement creation
- `/create-purchase-order`: Purchase order creation
- `/vendors`: Vendor discovery
- `/experts`: Expert discovery
- `/work-completion-payment/:id`: Payment for specific work
- `/work-completion-payment`: General payment page

### 6. Visual Design System

The application uses a consistent color scheme across different user types:

- **Industries**: Blue primary color theme
- **Service Vendors**: Orange primary color theme
- **Product Vendors**: Yellow primary color theme
- **Logistics Vendors**: Pink primary color theme
- **Professionals/Experts**: Green primary color theme

### 7. Component Libraries
The application leverages shadcn/ui components extensively:

- Buttons, Cards, Avatars for general UI elements
- Forms, Inputs, Select elements for data collection
- Tabs, Collapsible sections for content organization
- Badges, Progress indicators for status visualization
- Dialog, Toast components for notifications
- Tables for data display

### 8. Responsive Design
- Mobile-first approach with responsive layouts
- Tailwind classes for adaptive designs
- Mobile navigation with collapsible menus
- Device-specific layouts for optimal user experience

### 9. Future Development Areas
- Authentication and user session management
- Backend API integration
- Database functionality
- Payment processing implementation
- Search and filtering capabilities
- Notifications system
- Chat/messaging between users
- Dashboard analytics and reporting

## File Structure

The project uses a standard Vite/React structure with the following organization:

```
/src
  /components
    /ui                  # Shadcn UI components
    /signup              # Registration forms
    /vendor
      /forms             # Vendor profile forms
      /logistics         # Logistics vendor components
    /expert
      /forms             # Expert profile forms
    /requirement         # Requirement creation components
      /steps             # Step-specific components
    /purchase-order      # Purchase order components
  /contexts              # React context providers
  /hooks                 # Custom React hooks
  /lib                   # Utility functions
  /pages                 # Main application pages
  App.tsx                # Main application component with routes
  main.tsx               # Application entry point
```

## Styling Approach

The application uses Tailwind CSS with:
- Consistent color schemes per user type
- Common spacing and sizing variables
- Custom animations and transitions
- Responsive design breakpoints
- Extended theme configurations

## Development Guidelines

1. **Component Creation**: Create small, focused components in separate files
2. **Responsive Design**: All components must be fully responsive
3. **Type Safety**: Use TypeScript strictly with proper type definitions
4. **Form Handling**: Use React Hook Form with Zod validation
5. **Navigation**: Use React Router Link components for internal navigation
6. **State Management**: Use React Query for server state and React hooks for local state
7. **Error Handling**: Implement proper error boundaries and feedback mechanisms
8. **Accessibility**: Follow WCAG guidelines for inclusive design
9. **Code Splitting**: Implement lazy loading for route-based code splitting
