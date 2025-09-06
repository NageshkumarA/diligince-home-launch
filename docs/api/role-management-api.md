# Role Management API Documentation

## Overview

This API provides comprehensive role and permission management functionality for a multi-tenant system supporting different user types (Industry Admins, Service Vendors, Product Vendors, and Logistics Vendors).

## Base URL

```
https://api.yourapp.com/v1
```

## Authentication

All endpoints require authentication via Bearer token:

```
Authorization: Bearer <your_jwt_token>
```

## Data Schemas

### UserType Enum

```typescript
enum UserType {
  IndustryAdmin = "IndustryAdmin",
  ServiceVendor = "ServiceVendor", 
  ProductVendor = "ProductVendor",
  LogisticsVendor = "LogisticsVendor"
}
```

### PermissionAction Enum

```typescript
enum PermissionAction {
  read = "read",
  write = "write", 
  delete = "delete",
  edit = "edit",
  download = "download"
}
```

### Permission Schema

```typescript
interface Permission {
  moduleId: string;
  moduleName: string;
  actions: PermissionAction[];
  subModuleId?: string; // Optional for sub-module level permissions
}
```

### Role Schema

```typescript
interface Role {
  id: string;
  name: string;
  description: string;
  userType: UserType;
  permissions: Permission[];
  isSystemRole: boolean;
  createdBy?: string;
  createdAt: string; // ISO 8601 format
  updatedAt: string; // ISO 8601 format
}
```

### Module Schema

```typescript
interface Module {
  id: string;
  name: string;
  description: string;
  category: string;
  availableActions: PermissionAction[];
  userTypes: UserType[];
  subModules?: SubModule[];
}
```

### SubModule Schema

```typescript
interface SubModule {
  id: string;
  name: string;
  description: string;
  availableActions: PermissionAction[];
}
```

### UserRole Schema

```typescript
interface UserRole {
  userId: string;
  userName: string;
  userEmail: string;
  roleId: string;
  roleName: string;
  assignedBy: string;
  assignedAt: string; // ISO 8601 format
  status: "active" | "inactive" | "pending";
}
```

### RoleTemplate Schema

```typescript
interface RoleTemplate {
  id: string;
  name: string;
  description: string;
  userType: UserType;
  permissions: Permission[];
  isDefault: boolean;
}
```

## API Endpoints

### Roles Management

#### GET /roles

Get all roles with optional filtering

**Query Parameters:**
- `search` (string, optional): Search in role name/description
- `userType` (UserType | "all", optional): Filter by user type
- `status` ("active" | "inactive" | "all", optional): Filter by status
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Items per page (default: 20)

**Response:**
```json
{
  "success": true,
  "data": {
    "roles": [Role],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 45,
      "pages": 3
    }
  }
}
```

#### GET /roles/:id

Get role by ID

**Response:**
```json
{
  "success": true,
  "data": Role
}
```

#### POST /roles

Create a new role

**Request Body:**
```json
{
  "name": "string",
  "description": "string", 
  "userType": UserType,
  "permissions": [Permission],
  "templateId": "string" // optional
}
```

**Response:**
```json
{
  "success": true,
  "data": Role,
  "message": "Role created successfully"
}
```

#### PUT /roles/:id

Update an existing role

**Request Body:**
```json
{
  "name": "string",
  "description": "string",
  "permissions": [Permission]
}
```

**Response:**
```json
{
  "success": true,
  "data": Role,
  "message": "Role updated successfully"
}
```

#### DELETE /roles/:id

Delete a role

**Response:**
```json
{
  "success": true,
  "message": "Role deleted successfully"
}
```

#### POST /roles/:id/duplicate

Duplicate an existing role

**Request Body:**
```json
{
  "name": "string",
  "description": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": Role,
  "message": "Role duplicated successfully"
}
```

### Modules Management

#### GET /modules

Get available modules for user type

**Query Parameters:**
- `userType` (UserType, required): Filter modules by user type

**Response:**
```json
{
  "success": true,
  "data": [Module]
}
```

#### GET /modules/:id

Get module by ID with sub-modules

**Response:**
```json
{
  "success": true,
  "data": Module
}
```

### Role Templates

#### GET /role-templates

Get available role templates

**Query Parameters:**
- `userType` (UserType, optional): Filter by user type

**Response:**
```json
{
  "success": true,
  "data": [RoleTemplate]
}
```

#### GET /role-templates/:id

Get role template by ID

**Response:**
```json
{
  "success": true,
  "data": RoleTemplate
}
```

#### POST /role-templates

Create a new role template

**Request Body:**
```json
{
  "name": "string",
  "description": "string",
  "userType": UserType,
  "permissions": [Permission],
  "isDefault": boolean
}
```

**Response:**
```json
{
  "success": true,
  "data": RoleTemplate,
  "message": "Role template created successfully"
}
```

### User Role Assignment

#### GET /user-roles

Get user role assignments

**Query Parameters:**
- `userId` (string, optional): Filter by user ID
- `roleId` (string, optional): Filter by role ID
- `status` ("active" | "inactive" | "pending" | "all", optional): Filter by status
- `page` (number, optional): Page number
- `limit` (number, optional): Items per page

**Response:**
```json
{
  "success": true,
  "data": {
    "userRoles": [UserRole],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "pages": 8
    }
  }
}
```

#### POST /user-roles

Assign role to user

**Request Body:**
```json
{
  "userId": "string",
  "roleId": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": UserRole,
  "message": "Role assigned successfully"
}
```

#### PUT /user-roles/:userId/:roleId

Update user role assignment

**Request Body:**
```json
{
  "status": "active" | "inactive" | "pending"
}
```

**Response:**
```json
{
  "success": true,
  "data": UserRole,
  "message": "User role updated successfully"
}
```

#### DELETE /user-roles/:userId/:roleId

Remove role from user

**Response:**
```json
{
  "success": true,
  "message": "Role removed from user successfully"
}
```

### Permission Matrix

#### GET /permissions/matrix

Get permission matrix for current user's accessible user types

**Response:**
```json
{
  "success": true,
  "data": {
    "userType": UserType,
    "modules": [Module],
    "availableUserTypes": [UserType]
  }
}
```

#### POST /permissions/validate

Validate user permissions for specific action

**Request Body:**
```json
{
  "userId": "string",
  "moduleId": "string",
  "action": PermissionAction,
  "subModuleId": "string" // optional
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "hasPermission": boolean,
    "role": string,
    "reason": "string" // explanation if permission denied
  }
}
```

## Error Responses

### Standard Error Format

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": "Additional error details" // optional
  }
}
```

### Common Error Codes

- `UNAUTHORIZED` (401): Invalid or missing authentication token
- `FORBIDDEN` (403): User lacks required permissions
- `NOT_FOUND` (404): Resource not found
- `VALIDATION_ERROR` (400): Invalid request data
- `CONFLICT` (409): Resource already exists or conflict
- `INTERNAL_SERVER_ERROR` (500): Server error

### Validation Errors

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": {
      "name": ["Name is required"],
      "permissions": ["At least one permission is required"]
    }
  }
}
```

## Rate Limiting

- 1000 requests per hour per user
- 100 requests per minute per user
- Rate limit headers included in response:
  - `X-RateLimit-Limit`
  - `X-RateLimit-Remaining` 
  - `X-RateLimit-Reset`

## Database Schema (SQL)

### roles table

```sql
CREATE TABLE roles (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  user_type ENUM('IndustryAdmin', 'ServiceVendor', 'ProductVendor', 'LogisticsVendor') NOT NULL,
  permissions JSON NOT NULL,
  is_system_role BOOLEAN DEFAULT false,
  created_by VARCHAR(36),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_user_type (user_type),
  INDEX idx_created_by (created_by)
);
```

### modules table

```sql
CREATE TABLE modules (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100) NOT NULL,
  available_actions JSON NOT NULL,
  user_types JSON NOT NULL,
  sub_modules JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### user_roles table

```sql
CREATE TABLE user_roles (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  role_id VARCHAR(36) NOT NULL,
  assigned_by VARCHAR(36) NOT NULL,
  assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('active', 'inactive', 'pending') DEFAULT 'active',
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_role (user_id, role_id),
  INDEX idx_user_id (user_id),
  INDEX idx_role_id (role_id),
  INDEX idx_status (status)
);
```

### role_templates table

```sql
CREATE TABLE role_templates (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  user_type ENUM('IndustryAdmin', 'ServiceVendor', 'ProductVendor', 'LogisticsVendor') NOT NULL,
  permissions JSON NOT NULL,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_user_type (user_type),
  INDEX idx_is_default (is_default)
);
```

## Implementation Notes

### Security Considerations

1. **Role Hierarchy**: Ensure users can only manage roles for their user type or below
2. **Permission Validation**: Always validate permissions server-side
3. **Audit Logging**: Log all role and permission changes
4. **System Roles**: Protect system roles from modification/deletion

### Performance Optimizations

1. **Caching**: Cache frequently accessed roles and permissions
2. **Indexing**: Proper database indexing on foreign keys and search fields
3. **Pagination**: Always paginate large result sets
4. **Permission Caching**: Cache user permissions to avoid repeated lookups

### Business Rules

1. **System Roles**: Cannot be deleted or have core permissions modified
2. **Role Dependencies**: Check for user assignments before role deletion
3. **Permission Inheritance**: Sub-module permissions inherit from parent modules
4. **User Type Restrictions**: Users can only manage roles within their hierarchy