# Default Admin Role - Module Access Matrix

## Overview
This document outlines all available modules and their sub-modules that can be assigned to the **Default Admin Role**. The admin role has comprehensive access across all user types and system functionalities to manage the entire platform.

---

## 🏭 Industry Management Modules

### 1. Industry Dashboard
- **Module ID**: `industry-dashboard`
- **Description**: Main industry dashboard with analytics and overview
- **Available Actions**: `read`, `write`, `edit`
- **Category**: Dashboard Management

### 2. Requirements Management
- **Module ID**: `industry-requirements`
- **Description**: Complete requirements lifecycle management
- **Available Actions**: `read`, `write`, `edit`, `delete`, `download`
- **Category**: Project Management
- **Sub-modules**:
  - **Create New Requirements** (`create-requirement`)
    - Actions: `read`, `write`, `edit`
  - **Draft Requirements** (`requirements-drafts`)
    - Actions: `read`, `write`, `edit`, `delete`
  - **Pending Approval** (`requirements-pending`)
    - Actions: `read`, `write`, `edit`
  - **Approved Requirements** (`requirements-approved`)
    - Actions: `read`, `write`, `edit`
  - **Published Requirements** (`requirements-published`)
    - Actions: `read`, `write`, `edit`
  - **Archived Requirements** (`requirements-archived`)
    - Actions: `read`, `edit`

### 3. Quotations Management
- **Module ID**: `quotations`
- **Description**: Vendor quotation management and comparison
- **Available Actions**: `read`, `write`, `edit`, `delete`
- **Category**: Procurement Management
- **Sub-modules**:
  - **All Quotations** (`quotations`)
    - Actions: `read`, `write`, `edit`
  - **Pending Review** (`quotations-pending`)
    - Actions: `read`, `write`, `edit`
  - **Approved Quotations** (`quotations-approved`)
    - Actions: `read`, `write`, `edit`
  - **Quotation Comparison** (`quotations-comparison`)
    - Actions: `read`, `write`, `edit`

### 4. Purchase Orders Management
- **Module ID**: `purchase-orders`
- **Description**: Complete purchase order lifecycle management
- **Available Actions**: `read`, `write`, `edit`, `delete`, `download`
- **Category**: Procurement Management
- **Sub-modules**:
  - **Create Purchase Order** (`create-purchase-order`)
    - Actions: `read`, `write`, `edit`
  - **All Orders** (`purchase-orders`)
    - Actions: `read`, `write`, `edit`
  - **Pending Orders** (`purchase-orders-pending`)
    - Actions: `read`, `write`, `edit`
  - **In Progress Orders** (`purchase-orders-in-progress`)
    - Actions: `read`, `write`, `edit`
  - **Completed Orders** (`purchase-orders-completed`)
    - Actions: `read`, `edit`, `download`

### 5. Project Workflows
- **Module ID**: `industry-project-workflow`
- **Description**: Project workflow management and automation
- **Available Actions**: `read`, `write`, `edit`, `delete`
- **Category**: Project Management
- **Sub-modules**:
  - **All Projects** (`workflows`)
    - Actions: `read`, `write`, `edit`
  - **Active Projects** (`workflows-active`)
    - Actions: `read`, `write`, `edit`
  - **Timeline View** (`workflows-timeline`)
    - Actions: `read`, `edit`
  - **Progress Reports** (`workflows-reports`)
    - Actions: `read`, `download`

### 6. Stakeholder Management
- **Module ID**: `industry-stakeholders`
- **Description**: Vendor and professional stakeholder management
- **Available Actions**: `read`, `write`, `edit`, `delete`
- **Category**: User Management
- **Sub-modules**:
  - **Vendors Management** (`stakeholders-vendors`)
    - Actions: `read`, `write`, `edit`, `delete`
  - **Professionals Management** (`stakeholders-professionals`)
    - Actions: `read`, `write`, `edit`, `delete`
  - **Invite New Stakeholders** (`stakeholders-invite`)
    - Actions: `read`, `write`, `edit`
  - **Access Control** (`stakeholders-access`)
    - Actions: `read`, `write`, `edit`

### 7. Industry Communication
- **Module ID**: `industry-messages`
- **Description**: Communication and messaging system
- **Available Actions**: `read`, `write`, `edit`, `delete`
- **Category**: Communication Management
- **Sub-modules**:
  - **All Messages** (`messages`)
    - Actions: `read`, `write`, `edit`, `delete`
  - **Notifications** (`messages-notifications`)
    - Actions: `read`, `write`, `edit`
  - **Group Chats** (`messages-groups`)
    - Actions: `read`, `write`, `edit`, `delete`

### 8. Industry Analytics
- **Module ID**: `analytics`
- **Description**: Business intelligence and analytics
- **Available Actions**: `read`, `write`, `edit`, `download`
- **Category**: Analytics & Reporting
- **Sub-modules**:
  - **Performance Analytics** (`analytics-performance`)
    - Actions: `read`, `edit`, `download`
  - **Spending Analysis** (`analytics-spending`)
    - Actions: `read`, `edit`, `download`
  - **Vendor Reports** (`analytics-vendors`)
    - Actions: `read`, `edit`, `download`
  - **Project Metrics** (`analytics-projects`)
    - Actions: `read`, `edit`, `download`

### 9. Industry Settings
- **Module ID**: `settings`
- **Description**: System configuration and settings
- **Available Actions**: `read`, `write`, `edit`, `delete`
- **Category**: System Administration
- **Sub-modules**:
  - **Company Profile** (`industry-profile`)
    - Actions: `read`, `write`, `edit`
  - **Team Members** (`settings-members`)
    - Actions: `read`, `write`, `edit`, `delete`
  - **Role Management** (`dashboard-role-management`)
    - Actions: `read`, `write`, `edit`, `delete`
  - **Approval Matrix** (`industry-approval-matrix`)
    - Actions: `read`, `write`, `edit`
  - **Payment Settings** (`settings-payments`)
    - Actions: `read`, `write`, `edit`
  - **Workflow Templates** (`settings-workflows`)
    - Actions: `read`, `write`, `edit`, `delete`
  - **Data Management** (`settings-data`)
    - Actions: `read`, `write`, `edit`, `delete`, `download`
  - **Personal Info** (`settings-personal`)
    - Actions: `read`, `write`, `edit`
  - **Notifications** (`settings-notifications`)
    - Actions: `read`, `write`, `edit`
  - **Privacy & Security** (`settings-privacy`)
    - Actions: `read`, `write`, `edit`

---

## 👨‍💼 Professional Management Modules

### 1. Professional Dashboard
- **Module ID**: `professional-dashboard`
- **Description**: Professional user dashboard and overview
- **Available Actions**: `read`, `write`, `edit`
- **Category**: Dashboard Management

### 2. Professional Opportunities
- **Module ID**: `professional-opportunities`
- **Description**: Job opportunities and application management
- **Available Actions**: `read`, `write`, `edit`, `delete`
- **Category**: Opportunity Management
- **Sub-modules**:
  - **Browse Jobs** (`opportunities`)
    - Actions: `read`, `write`, `edit`
  - **Saved Jobs** (`opportunities-saved`)
    - Actions: `read`, `write`, `edit`, `delete`
  - **Applications** (`opportunities-applications`)
    - Actions: `read`, `write`, `edit`
  - **Accepted Opportunities** (`opportunities-accepted`)
    - Actions: `read`, `write`, `edit`

### 3. Professional Projects
- **Module ID**: `projects`
- **Description**: Professional project management
- **Available Actions**: `read`, `write`, `edit`
- **Category**: Project Management
- **Sub-modules**:
  - **Active Projects** (`projects-active`)
    - Actions: `read`, `write`, `edit`
  - **Pending Start** (`projects-pending`)
    - Actions: `read`, `write`, `edit`
  - **Completed Projects** (`projects-completed`)
    - Actions: `read`, `edit`, `download`
  - **Schedule Management** (`projects-schedule`)
    - Actions: `read`, `write`, `edit`

### 4. Professional Calendar
- **Module ID**: `professional-calendar`
- **Description**: Availability and calendar management
- **Available Actions**: `read`, `write`, `edit`
- **Category**: Calendar Management
- **Sub-modules**:
  - **Calendar View** (`calendar`)
    - Actions: `read`, `write`, `edit`
  - **Time Slots** (`calendar-slots`)
    - Actions: `read`, `write`, `edit`
  - **Preferences** (`calendar-preferences`)
    - Actions: `read`, `write`, `edit`

### 5. Professional Communication
- **Module ID**: `professional-messages`
- **Description**: Professional communication system
- **Available Actions**: `read`, `write`, `edit`, `delete`
- **Category**: Communication Management
- **Sub-modules**:
  - **All Messages** (`messages`)
    - Actions: `read`, `write`, `edit`, `delete`
  - **Client Messages** (`messages-clients`)
    - Actions: `read`, `write`, `edit`
  - **Notifications** (`messages-notifications`)
    - Actions: `read`, `write`, `edit`

### 6. Professional Portfolio
- **Module ID**: `portfolio`
- **Description**: Professional portfolio and profile management
- **Available Actions**: `read`, `write`, `edit`
- **Category**: Profile Management
- **Sub-modules**:
  - **View Portfolio** (`portfolio`)
    - Actions: `read`, `write`, `edit`
  - **Edit Profile** (`professional-profile`)
    - Actions: `read`, `write`, `edit`
  - **Certifications** (`portfolio-certifications`)
    - Actions: `read`, `write`, `edit`, `delete`
  - **Performance** (`portfolio-performance`)
    - Actions: `read`, `edit`

### 7. Professional Reports
- **Module ID**: `reports`
- **Description**: Professional performance and earnings reports
- **Available Actions**: `read`, `edit`, `download`
- **Category**: Analytics & Reporting
- **Sub-modules**:
  - **Earnings Reports** (`reports-earnings`)
    - Actions: `read`, `edit`, `download`
  - **Project History** (`reports-projects`)
    - Actions: `read`, `edit`, `download`
  - **Performance Reports** (`reports-performance`)
    - Actions: `read`, `edit`, `download`

---

## 🏢 Service Vendor Management Modules

### 1. Service Vendor Dashboard
- **Module ID**: `service-vendor-dashboard`
- **Description**: Service vendor main dashboard
- **Available Actions**: `read`, `write`, `edit`
- **Category**: Dashboard Management

### 2. Service Vendor RFQs
- **Module ID**: `service-vendor-rfqs`
- **Description**: RFQ management and quote submission
- **Available Actions**: `read`, `write`, `edit`, `delete`
- **Category**: RFQ Management
- **Sub-modules**:
  - **Browse RFQs** (`rfqs-browse`)
    - Actions: `read`, `write`, `edit`
  - **Create Quote** (`rfqs-create-quote`)
    - Actions: `read`, `write`, `edit`
  - **Pending Quotes** (`rfqs-pending`)
    - Actions: `read`, `write`, `edit`
  - **Accepted Quotes** (`rfqs-accepted`)
    - Actions: `read`, `write`, `edit`
  - **Archived RFQs** (`rfqs-archived`)
    - Actions: `read`, `edit`

### 3. Service Vendor Projects
- **Module ID**: `service-vendor-projects`
- **Description**: Service project management
- **Available Actions**: `read`, `write`, `edit`
- **Category**: Project Management
- **Sub-modules**:
  - **Active Projects** (`projects-active`)
    - Actions: `read`, `write`, `edit`
  - **Starting Soon** (`projects-upcoming`)
    - Actions: `read`, `write`, `edit`
  - **Completed Projects** (`projects-completed`)
    - Actions: `read`, `edit`, `download`
  - **Project Calendar** (`projects-calendar`)
    - Actions: `read`, `write`, `edit`
  - **Progress Reports** (`projects-reports`)
    - Actions: `read`, `edit`, `download`

### 4. Service Team Management
- **Module ID**: `team`
- **Description**: Team and resource management
- **Available Actions**: `read`, `write`, `edit`, `delete`
- **Category**: Team Management
- **Sub-modules**:
  - **Team Members** (`team-members`)
    - Actions: `read`, `write`, `edit`, `delete`
  - **Team Availability** (`team-availability`)
    - Actions: `read`, `write`, `edit`
  - **Skills & Expertise** (`team-skills`)
    - Actions: `read`, `write`, `edit`
  - **Performance** (`team-performance`)
    - Actions: `read`, `edit`

### 5. Service Portfolio
- **Module ID**: `services`
- **Description**: Service portfolio management
- **Available Actions**: `read`, `write`, `edit`, `delete`
- **Category**: Service Management
- **Sub-modules**:
  - **All Services** (`services-all`)
    - Actions: `read`, `write`, `edit`, `delete`
  - **Add Service** (`services-add`)
    - Actions: `read`, `write`, `edit`
  - **Specializations** (`services-specializations`)
    - Actions: `read`, `write`, `edit`
  - **Portfolio View** (`services-portfolio`)
    - Actions: `read`, `write`, `edit`

---

## 📦 Product Vendor Management Modules

### 1. Product Vendor Dashboard
- **Module ID**: `product-vendor-dashboard`
- **Description**: Product vendor main dashboard
- **Available Actions**: `read`, `write`, `edit`
- **Category**: Dashboard Management

### 2. Product Catalog Management
- **Module ID**: `product-vendor-catalog`
- **Description**: Product catalog and inventory management
- **Available Actions**: `read`, `write`, `edit`, `delete`
- **Category**: Product Management
- **Sub-modules**:
  - **All Products** (`catalog-products`)
    - Actions: `read`, `write`, `edit`, `delete`
  - **Add Product** (`catalog-add-product`)
    - Actions: `read`, `write`, `edit`
  - **Bulk Edit** (`catalog-bulk-edit`)
    - Actions: `read`, `write`, `edit`
  - **Catalog Preview** (`catalog-preview`)
    - Actions: `read`, `edit`
  - **Archived Products** (`catalog-archived`)
    - Actions: `read`, `edit`

### 3. Product Vendor RFQs
- **Module ID**: `product-vendor-rfqs`
- **Description**: Product RFQ and quotation management
- **Available Actions**: `read`, `write`, `edit`, `delete`
- **Category**: RFQ Management
- **Sub-modules**:
  - **Browse RFQs** (`rfqs-browse`)
    - Actions: `read`, `write`, `edit`
  - **Create Quotation** (`rfqs-create-quote`)
    - Actions: `read`, `write`, `edit`
  - **Pending Quotes** (`rfqs-pending`)
    - Actions: `read`, `write`, `edit`
  - **Approved Quotes** (`rfqs-approved`)
    - Actions: `read`, `write`, `edit`

### 4. Order Management
- **Module ID**: `product-vendor-orders`
- **Description**: Product order processing and fulfillment
- **Available Actions**: `read`, `write`, `edit`, `delete`
- **Category**: Order Management
- **Sub-modules**:
  - **All Orders** (`orders-all`)
    - Actions: `read`, `write`, `edit`
  - **Processing Orders** (`orders-processing`)
    - Actions: `read`, `write`, `edit`
  - **Shipping Orders** (`orders-shipping`)
    - Actions: `read`, `write`, `edit`
  - **Delivered Orders** (`orders-delivered`)
    - Actions: `read`, `edit`
  - **Completed Orders** (`orders-completed`)
    - Actions: `read`, `edit`, `download`

### 5. Inventory & Logistics
- **Module ID**: `inventory`
- **Description**: Inventory and logistics management
- **Available Actions**: `read`, `write`, `edit`
- **Category**: Logistics Management
- **Sub-modules**:
  - **Stock Levels** (`inventory-stock`)
    - Actions: `read`, `write`, `edit`
  - **Demand Forecast** (`inventory-forecast`)
    - Actions: `read`, `edit`
  - **Shipping Management** (`inventory-shipping`)
    - Actions: `read`, `write`, `edit`
  - **Warehouses** (`inventory-warehouses`)
    - Actions: `read`, `write`, `edit`, `delete`

---

## 🚛 Logistics Vendor Management Modules

### 1. Logistics Vendor Dashboard
- **Module ID**: `logistics-vendor-dashboard`
- **Description**: Logistics vendor main dashboard
- **Available Actions**: `read`, `write`, `edit`
- **Category**: Dashboard Management

### 2. Transport Requests
- **Module ID**: `logistics-vendor-requests`
- **Description**: Transport request and quote management
- **Available Actions**: `read`, `write`, `edit`, `delete`
- **Category**: Transport Management
- **Sub-modules**:
  - **Browse Requests** (`requests-browse`)
    - Actions: `read`, `write`, `edit`
  - **Submit Quote** (`requests-quote`)
    - Actions: `read`, `write`, `edit`
  - **Pending Quotes** (`requests-pending`)
    - Actions: `read`, `write`, `edit`
  - **Accepted Jobs** (`requests-accepted`)
    - Actions: `read`, `write`, `edit`

### 3. Active Deliveries
- **Module ID**: `logistics-vendor-deliveries`
- **Description**: Delivery tracking and management
- **Available Actions**: `read`, `write`, `edit`
- **Category**: Delivery Management
- **Sub-modules**:
  - **In Transit** (`deliveries-in-transit`)
    - Actions: `read`, `write`, `edit`
  - **Scheduled Deliveries** (`deliveries-scheduled`)
    - Actions: `read`, `write`, `edit`
  - **Completed Deliveries** (`deliveries-completed`)
    - Actions: `read`, `edit`, `download`
  - **Live Tracking** (`deliveries-tracking`)
    - Actions: `read`, `edit`

### 4. Fleet Management
- **Module ID**: `logistics-vendor-fleet`
- **Description**: Vehicle and driver fleet management
- **Available Actions**: `read`, `write`, `edit`, `delete`
- **Category**: Fleet Management
- **Sub-modules**:
  - **All Vehicles** (`fleet-vehicles`)
    - Actions: `read`, `write`, `edit`, `delete`
  - **Drivers** (`fleet-drivers`)
    - Actions: `read`, `write`, `edit`, `delete`
  - **Maintenance** (`fleet-maintenance`)
    - Actions: `read`, `write`, `edit`
  - **Utilization** (`fleet-utilization`)
    - Actions: `read`, `edit`
  - **Add Vehicle** (`fleet-add-vehicle`)
    - Actions: `read`, `write`, `edit`

### 5. Route Optimization
- **Module ID**: `routes`
- **Description**: Route planning and optimization
- **Available Actions**: `read`, `write`, `edit`
- **Category**: Route Management
- **Sub-modules**:
  - **Route Planner** (`routes-planner`)
    - Actions: `read`, `write`, `edit`
  - **Optimization Reports** (`routes-optimization`)
    - Actions: `read`, `edit`, `download`
  - **Real-time Updates** (`routes-real-time`)
    - Actions: `read`, `edit`
  - **Performance Metrics** (`routes-metrics`)
    - Actions: `read`, `edit`, `download`

---

## 🛡️ System Administration Modules

### 1. Role Management System
- **Module ID**: `dashboard-role-management`
- **Description**: Complete role and permission management
- **Available Actions**: `read`, `write`, `edit`, `delete`
- **Category**: Security & Access Control
- **Sub-modules**:
  - **Role Creation** (`roles-create`)
    - Actions: `read`, `write`, `edit`
  - **Permission Matrix** (`roles-permissions`)
    - Actions: `read`, `write`, `edit`
  - **User Assignment** (`roles-assignment`)
    - Actions: `read`, `write`, `edit`, `delete`
  - **Role Templates** (`roles-templates`)
    - Actions: `read`, `write`, `edit`, `delete`

### 2. User Management
- **Module ID**: `user-management`
- **Description**: Platform-wide user management
- **Available Actions**: `read`, `write`, `edit`, `delete`
- **Category**: User Administration
- **Sub-modules**:
  - **All Users** (`users-all`)
    - Actions: `read`, `write`, `edit`, `delete`
  - **Pending Approvals** (`users-pending`)
    - Actions: `read`, `write`, `edit`
  - **Blocked Users** (`users-blocked`)
    - Actions: `read`, `write`, `edit`
  - **User Activity** (`users-activity`)
    - Actions: `read`, `edit`

### 3. System Configuration
- **Module ID**: `system-config`
- **Description**: Platform configuration and settings
- **Available Actions**: `read`, `write`, `edit`
- **Category**: System Administration
- **Sub-modules**:
  - **General Settings** (`config-general`)
    - Actions: `read`, `write`, `edit`
  - **Email Templates** (`config-email`)
    - Actions: `read`, `write`, `edit`
  - **API Settings** (`config-api`)
    - Actions: `read`, `write`, `edit`
  - **Security Settings** (`config-security`)
    - Actions: `read`, `write`, `edit`

---

## 📊 Cross-Platform Analytics Modules

### 1. Platform Analytics
- **Module ID**: `platform-analytics`
- **Description**: Platform-wide analytics and insights
- **Available Actions**: `read`, `edit`, `download`
- **Category**: System Analytics
- **Sub-modules**:
  - **User Engagement** (`analytics-engagement`)
    - Actions: `read`, `edit`, `download`
  - **Transaction Analytics** (`analytics-transactions`)
    - Actions: `read`, `edit`, `download`
  - **Performance Metrics** (`analytics-performance`)
    - Actions: `read`, `edit`, `download`
  - **Revenue Analytics** (`analytics-revenue`)
    - Actions: `read`, `edit`, `download`

### 2. Audit & Compliance
- **Module ID**: `audit-compliance`
- **Description**: Audit trails and compliance monitoring
- **Available Actions**: `read`, `edit`, `download`
- **Category**: Compliance Management
- **Sub-modules**:
  - **Audit Logs** (`audit-logs`)
    - Actions: `read`, `download`
  - **Compliance Reports** (`audit-compliance`)
    - Actions: `read`, `edit`, `download`
  - **Data Export** (`audit-export`)
    - Actions: `read`, `download`

---

## Permission Actions Legend

- **`read`**: View and access module data
- **`write`**: Create new records and data
- **`edit`**: Modify existing records and data
- **`delete`**: Remove records and data
- **`download`**: Export data and generate reports

## Module Categories

1. **Dashboard Management**: Main overview and control panels
2. **Project Management**: Project lifecycle and workflow management
3. **Procurement Management**: RFQs, quotations, and purchase orders
4. **User Management**: User administration and stakeholder management
5. **Communication Management**: Messaging and notification systems
6. **Analytics & Reporting**: Business intelligence and reports
7. **System Administration**: Platform configuration and settings
8. **Security & Access Control**: Role and permission management
9. **Fleet Management**: Vehicle and logistics management
10. **Product Management**: Catalog and inventory management
11. **Service Management**: Service portfolio management
12. **Team Management**: Human resource management
13. **Order Management**: Order processing and fulfillment
14. **Transport Management**: Logistics and delivery management
15. **Route Management**: Route planning and optimization
16. **Calendar Management**: Scheduling and availability
17. **Profile Management**: User profile and portfolio management
18. **Opportunity Management**: Job and business opportunities
19. **RFQ Management**: Request for quotation processes
20. **Delivery Management**: Delivery tracking and management
21. **Logistics Management**: Supply chain and logistics
22. **Compliance Management**: Audit and regulatory compliance
23. **System Analytics**: Platform performance and insights

---

## Implementation Notes

1. **Hierarchical Structure**: Modules can have sub-modules for granular permission control
2. **Cross-User Type Access**: Admin roles can access modules across all user types
3. **Action-Based Permissions**: Each module supports specific actions based on functionality
4. **Category Grouping**: Modules are organized by functional categories for easier management
5. **Extensibility**: New modules and permissions can be easily added to the system

This comprehensive module matrix ensures that admin users have complete oversight and control over all platform functionalities while maintaining granular permission control at the sub-module level.