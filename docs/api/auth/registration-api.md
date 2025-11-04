# User Registration API - Complete Documentation

## Table of Contents
1. [Quick Start](#quick-start)
2. [Common Registration Endpoint](#common-registration-endpoint)
3. [Professional Registration](#professional-registration)
4. [Industry Registration](#industry-registration)
5. [Vendor Registration](#vendor-registration)
6. [Response Formats](#response-formats)
7. [Error Handling](#error-handling)
8. [Validation Rules](#validation-rules)
9. [Business Logic](#business-logic)
10. [Testing Examples](#testing-examples)

---

## Quick Start

### Overview

The Registration API enables new users to create accounts across three user types:
- **Professional**: Individual experts with specialized skills
- **Industry**: Company representatives (IndustryAdmin role)
- **Vendor**: Service/Product/Logistics providers

All three registration types use the **same endpoint** with different payload structures based on the `role` field.

### Base URL

```
https://your-api-domain.com/api/v1
```

### Authentication

Registration endpoints do **NOT** require authentication (they create the initial user account).

**Headers Required:**
```http
Content-Type: application/json
```

### Registration Flow

```
User fills form → Frontend validates → POST /auth/register → 
Backend validates → Creates user → Returns JWT tokens → 
Redirect to /pending-approval
```

---

## Common Registration Endpoint

### Endpoint Details

**Endpoint:** `POST /api/v1/auth/register`

**Method:** POST

**Authentication:** None required

**Headers:**
```http
Content-Type: application/json
```

**Common Fields** (present in all registration types):

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | Yes | Valid email address (unique) |
| `password` | string | Yes | Min 8 characters |
| `phone` | string | Yes | Min 10 digits |
| `role` | string | Yes | One of: `Professional`, `IndustryAdmin`, `Vendor` |
| `termsAccepted` | boolean | Yes | Must be `true` |
| `privacyAccepted` | boolean | Yes | Must be `true` |

**Role-Specific Additional Fields:**

- **Professional**: `firstName`, `lastName`, `expertise`
- **IndustryAdmin**: `firstName`, `lastName`, `companyName`, `industryType`, `customIndustryType`
- **Vendor**: `businessName`, `vendorCategory`, `specialization`

---

## Professional Registration

### Request Payload

**Role Value:** `"Professional"`

**Additional Fields:**

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `firstName` | string | Yes | User's first name | "John" |
| `lastName` | string | Yes | User's last name | "Doe" |
| `expertise` | string | Yes | Area of expertise | "Mechanical Engineering" |

### Available Expertise Options

```typescript
[
  "Mechanical Engineering",
  "Electrical Engineering", 
  "Process Engineering",
  "Chemical Engineering",
  "Civil Engineering",
  "Industrial Safety",
  "Quality Control",
  "Maintenance",
  "Plant Operations",
  "Automation",
  "Robotics",
  "Welding",
  "Heavy Equipment Operation",
  "HVAC Systems",
  "Instrumentation",
  "Logistics Management",
  "Supply Chain Management",
  "Production Management",
  "Project Management",
  "Environmental Compliance"
]
```

### Mock Request Example

```json
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "SecurePass123!",
  "phone": "9876543210",
  "role": "Professional",
  "firstName": "John",
  "lastName": "Doe",
  "expertise": "Mechanical Engineering",
  "termsAccepted": true,
  "privacyAccepted": true
}
```

### Mock Response (Success - 201 Created)

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "usr_prof_1a2b3c4d5e",
      "email": "john.doe@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "Professional",
      "expertise": "Mechanical Engineering",
      "status": "pending_approval",
      "createdAt": "2024-01-16T10:30:00Z",
      "updatedAt": "2024-01-16T10:30:00Z"
    },
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IlJlZnJlc2gifQ..."
  },
  "message": "Registration successful. Please check your email to verify your account."
}
```

### cURL Example

```bash
curl -X POST "https://your-api-domain.com/api/v1/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "SecurePass123!",
    "phone": "9876543210",
    "role": "Professional",
    "firstName": "John",
    "lastName": "Doe",
    "expertise": "Mechanical Engineering",
    "termsAccepted": true,
    "privacyAccepted": true
  }'
```

---

## Industry Registration

### Request Payload

**Role Value:** `"IndustryAdmin"`

**Additional Fields:**

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `firstName` | string | Yes | Admin's first name | "Jane" |
| `lastName` | string | Yes | Admin's last name | "Smith" |
| `companyName` | string | Yes | Company/organization name | "Steel Industries Ltd." |
| `industryType` | string | Yes | Type from predefined list | "Steel Manufacturing" |
| `customIndustryType` | string | Conditional | Required if industryType is "Others" | "Custom Industry" |

### Available Industry Types

```typescript
[
  "Sugar Manufacturing",
  "Rice Mills",
  "Coal Mining",
  "Steel Manufacturing",
  "Cement Production",
  "Oil Refining",
  "Natural Gas Processing",
  "Textile Manufacturing",
  "Paper Mills",
  "Chemical Manufacturing",
  "Pharmaceutical Production",
  "Food Processing",
  "Automotive Manufacturing",
  "Electronics Manufacturing",
  "Plastics Manufacturing",
  "Glass Production",
  "Plumber and Wood Products",
  "Fertilizer Production",
  "Power Generation",
  "Water Treatment",
  "Manufacturing",
  "Others"
]
```

### Mock Request Example (Standard Industry)

```json
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "admin@steelindustries.com",
  "password": "SecurePass123!",
  "phone": "9876543210",
  "role": "IndustryAdmin",
  "firstName": "Jane",
  "lastName": "Smith",
  "companyName": "Steel Industries Ltd.",
  "industryType": "Steel Manufacturing",
  "termsAccepted": true,
  "privacyAccepted": true
}
```

### Mock Request Example (Custom Industry - "Others")

```json
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "admin@customcorp.com",
  "password": "SecurePass123!",
  "phone": "9876543210",
  "role": "IndustryAdmin",
  "firstName": "Robert",
  "lastName": "Johnson",
  "companyName": "Custom Corp Ltd.",
  "industryType": "Others",
  "customIndustryType": "Renewable Energy Storage",
  "termsAccepted": true,
  "privacyAccepted": true
}
```

### Mock Response (Success - 201 Created)

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "usr_ind_2b3c4d5e6f",
      "email": "admin@steelindustries.com",
      "firstName": "Jane",
      "lastName": "Smith",
      "role": "IndustryAdmin",
      "companyName": "Steel Industries Ltd.",
      "industryType": "Steel Manufacturing",
      "status": "pending_approval",
      "createdAt": "2024-01-16T11:00:00Z",
      "updatedAt": "2024-01-16T11:00:00Z"
    },
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IlJlZnJlc2gifQ..."
  },
  "message": "Registration successful. Please check your email to verify your account."
}
```

### cURL Example

```bash
curl -X POST "https://your-api-domain.com/api/v1/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@steelindustries.com",
    "password": "SecurePass123!",
    "phone": "9876543210",
    "role": "IndustryAdmin",
    "firstName": "Jane",
    "lastName": "Smith",
    "companyName": "Steel Industries Ltd.",
    "industryType": "Steel Manufacturing",
    "termsAccepted": true,
    "privacyAccepted": true
  }'
```

---

## Vendor Registration

### Request Payload

**Role Value:** `"Vendor"`

**Additional Fields:**

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `businessName` | string | Yes | Business/company name | "Coastal Services Ltd." |
| `vendorCategory` | string | Yes | Type from predefined list | "Service Vendor" |
| `specialization` | string | Yes | Depends on vendorCategory | "Equipment Maintenance" |

### Available Vendor Categories & Specializations

#### **Service Vendor**
```typescript
[
  "Equipment Maintenance",
  "Plant Installation",
  "Process Optimization",
  "Industrial Cleaning",
  "Quality Inspection",
  "Safety Compliance",
  "Environmental Services",
  "Automation Services",
  "Electrical Services",
  "Mechanical Services"
]
```

#### **Product Vendor**
```typescript
[
  "Industrial Equipment",
  "Spare Parts",
  "Raw Materials",
  "Safety Equipment",
  "Tools & Hardware",
  "Industrial Chemicals",
  "Industrial Electronics",
  "Process Control Equipment",
  "Packaging Materials",
  "Laboratory Equipment"
]
```

#### **Logistics Vendor**
```typescript
[
  "Transportation Services",
  "Warehouse Management",
  "Heavy Equipment Rental",
  "Crane Services",
  "Forklift Rental",
  "Inventory Management",
  "Supply Chain Solutions",
  "Cold Chain Logistics",
  "Bulk Material Transport",
  "Hazardous Material Transport"
]
```

### Mock Request Example (Service Vendor)

```json
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "contact@coastalservices.com",
  "password": "SecurePass123!",
  "phone": "9876543210",
  "role": "Vendor",
  "businessName": "Coastal Services Ltd.",
  "vendorCategory": "Service Vendor",
  "specialization": "Equipment Maintenance",
  "termsAccepted": true,
  "privacyAccepted": true
}
```

### Mock Request Example (Product Vendor)

```json
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "sales@industrialparts.com",
  "password": "SecurePass123!",
  "phone": "9876543210",
  "role": "Vendor",
  "businessName": "Industrial Parts Inc.",
  "vendorCategory": "Product Vendor",
  "specialization": "Spare Parts",
  "termsAccepted": true,
  "privacyAccepted": true
}
```

### Mock Request Example (Logistics Vendor)

```json
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "info@quicklogistics.com",
  "password": "SecurePass123!",
  "phone": "9876543210",
  "role": "Vendor",
  "businessName": "Quick Logistics Corp.",
  "vendorCategory": "Logistics Vendor",
  "specialization": "Transportation Services",
  "termsAccepted": true,
  "privacyAccepted": true
}
```

### Mock Response (Success - 201 Created)

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "usr_vnd_3c4d5e6f7g",
      "email": "contact@coastalservices.com",
      "role": "Vendor",
      "businessName": "Coastal Services Ltd.",
      "vendorCategory": "Service Vendor",
      "specialization": "Equipment Maintenance",
      "status": "pending_approval",
      "createdAt": "2024-01-16T12:00:00Z",
      "updatedAt": "2024-01-16T12:00:00Z"
    },
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IlJlZnJlc2gifQ..."
  },
  "message": "Registration successful. Please check your email to verify your account."
}
```

### cURL Example

```bash
curl -X POST "https://your-api-domain.com/api/v1/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "contact@coastalservices.com",
    "password": "SecurePass123!",
    "phone": "9876543210",
    "role": "Vendor",
    "businessName": "Coastal Services Ltd.",
    "vendorCategory": "Service Vendor",
    "specialization": "Equipment Maintenance",
    "termsAccepted": true,
    "privacyAccepted": true
  }'
```

---

## Response Formats

### Success Response Structure

**Status Code:** `201 Created`

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "string",
      "email": "string",
      "role": "string",
      "status": "pending_approval",
      "createdAt": "ISO8601 timestamp",
      "updatedAt": "ISO8601 timestamp",
      // ... role-specific fields
    },
    "access_token": "JWT token string",
    "refresh_token": "JWT refresh token string"
  },
  "message": "Registration successful. Please check your email to verify your account."
}
```

### Token Metadata

All successful registrations include JWT tokens:

| Field | Type | Description |
|-------|------|-------------|
| `access_token` | string | JWT access token (expires in 1 hour) |
| `refresh_token` | string | JWT refresh token (expires in 7 days) |
| `token_type` | string | Always "Bearer" |
| `expires_in` | number | Token expiry time in seconds (3600) |

### User Status Values

| Status | Description |
|--------|-------------|
| `pending_approval` | User registered, awaiting admin approval |
| `pending_verification` | Email verification pending |
| `active` | User approved and verified |
| `suspended` | User account suspended |
| `rejected` | User registration rejected |

---

## Error Handling

### Common Error Scenarios

#### 1. Validation Error (400 Bad Request)

**Scenario:** Missing required fields or invalid data

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      },
      {
        "field": "password",
        "message": "Password must be at least 8 characters"
      }
    ]
  }
}
```

#### 2. Duplicate Email (409 Conflict)

**Scenario:** Email already registered

```json
{
  "success": false,
  "error": {
    "code": "EMAIL_EXISTS",
    "message": "An account with this email already exists",
    "details": {
      "field": "email",
      "value": "john.doe@example.com"
    }
  }
}
```

#### 3. Invalid Role (400 Bad Request)

**Scenario:** Invalid or unsupported role value

```json
{
  "success": false,
  "error": {
    "code": "INVALID_ROLE",
    "message": "Invalid role specified",
    "details": {
      "field": "role",
      "validValues": ["Professional", "IndustryAdmin", "Vendor"]
    }
  }
}
```

#### 4. Missing Custom Industry Type (400 Bad Request)

**Scenario:** Industry type is "Others" but customIndustryType not provided

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Custom industry type is required when 'Others' is selected",
    "details": {
      "field": "customIndustryType",
      "relatedField": "industryType"
    }
  }
}
```

#### 5. Terms Not Accepted (400 Bad Request)

**Scenario:** User hasn't accepted terms or privacy policy

```json
{
  "success": false,
  "error": {
    "code": "TERMS_NOT_ACCEPTED",
    "message": "You must accept the terms and conditions and privacy policy",
    "details": {
      "fields": ["termsAccepted", "privacyAccepted"],
      "requiredValue": true
    }
  }
}
```

#### 6. Server Error (500 Internal Server Error)

**Scenario:** Unexpected server error

```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_SERVER_ERROR",
    "message": "An unexpected error occurred. Please try again later.",
    "requestId": "req_abc123xyz"
  }
}
```

### HTTP Status Codes

| Status Code | Description |
|-------------|-------------|
| `201` | User created successfully |
| `400` | Validation error or bad request |
| `409` | Conflict (duplicate email) |
| `422` | Unprocessable entity (invalid data) |
| `500` | Internal server error |
| `503` | Service unavailable |

---

## Validation Rules

### Common Field Validation

#### Email
- **Format:** Must be valid RFC 5322 format
- **Max Length:** 255 characters
- **Uniqueness:** Must be unique across all users
- **Case:** Converted to lowercase before storage
- **Example:** `user@example.com`

#### Password
- **Min Length:** 8 characters
- **Complexity:** 
  - At least 1 uppercase letter
  - At least 1 lowercase letter
  - At least 1 number
  - At least 1 special character recommended
- **Not Allowed:** 
  - Common passwords (e.g., "password123")
  - User's email as password
- **Example:** `SecurePass123!`

#### Phone
- **Min Length:** 10 digits
- **Max Length:** 15 digits
- **Format:** Digits only (no spaces or special characters)
- **International:** Support for country codes
- **Example:** `9876543210` or `+919876543210`

#### Role
- **Type:** Enum
- **Valid Values:** `Professional`, `IndustryAdmin`, `Vendor`
- **Case Sensitive:** Yes
- **Required:** Yes

#### Terms & Privacy
- **Type:** Boolean
- **Required:** Both must be `true`
- **Validation:** Explicit consent required

### Role-Specific Validation

#### Professional Fields

| Field | Min Length | Max Length | Pattern | Required |
|-------|-----------|-----------|---------|----------|
| `firstName` | 2 | 50 | Letters, spaces, hyphens | Yes |
| `lastName` | 2 | 50 | Letters, spaces, hyphens | Yes |
| `expertise` | - | - | Must be from predefined list | Yes |

#### Industry Admin Fields

| Field | Min Length | Max Length | Pattern | Required |
|-------|-----------|-----------|---------|----------|
| `firstName` | 2 | 50 | Letters, spaces, hyphens | Yes |
| `lastName` | 2 | 50 | Letters, spaces, hyphens | Yes |
| `companyName` | 2 | 100 | Alphanumeric, spaces, special chars | Yes |
| `industryType` | - | - | Must be from predefined list | Yes |
| `customIndustryType` | 2 | 100 | Required if industryType is "Others" | Conditional |

#### Vendor Fields

| Field | Min Length | Max Length | Pattern | Required |
|-------|-----------|-----------|---------|----------|
| `businessName` | 2 | 100 | Alphanumeric, spaces, special chars | Yes |
| `vendorCategory` | - | - | Must be from predefined list | Yes |
| `specialization` | - | - | Must match selected category | Yes |

### Conditional Validation

#### Custom Industry Type
```
IF industryType === "Others" THEN
  customIndustryType IS REQUIRED
  customIndustryType.length >= 2 AND <= 100
ELSE
  customIndustryType IS IGNORED
END IF
```

#### Vendor Specialization
```
IF vendorCategory === "Service Vendor" THEN
  specialization MUST BE FROM service_vendor_specializations
ELSE IF vendorCategory === "Product Vendor" THEN
  specialization MUST BE FROM product_vendor_specializations
ELSE IF vendorCategory === "Logistics Vendor" THEN
  specialization MUST BE FROM logistics_vendor_specializations
END IF
```

---

## Business Logic

### Registration Flow

```
1. User submits registration form
   ↓
2. Frontend validates all fields (client-side)
   ↓
3. POST request to /api/v1/auth/register
   ↓
4. Backend validates all fields (server-side)
   ↓
5. Check if email already exists
   ↓
6. Hash password using bcrypt (cost factor: 10)
   ↓
7. Create user record with status: "pending_approval"
   ↓
8. Generate JWT access token (expires: 1 hour)
   ↓
9. Generate JWT refresh token (expires: 7 days)
   ↓
10. Send verification email to user
   ↓
11. Return user data + tokens
   ↓
12. Frontend stores tokens in localStorage/cookies
   ↓
13. Redirect to /pending-approval page
```

### User Status Lifecycle

```
pending_approval → pending_verification → active
     ↓                                      ↓
  rejected                              suspended
```

**Status Transitions:**

1. **pending_approval** (Initial state)
   - User registered but not yet approved by admin
   - User receives email notification
   - Admin receives notification in dashboard
   
2. **pending_verification** (After admin approval)
   - Admin approves the user
   - Verification email sent to user
   - User must click verification link
   
3. **active** (Email verified)
   - User can fully access the platform
   - All features unlocked
   
4. **rejected** (Admin rejected)
   - User cannot access platform
   - Rejection reason sent via email
   
5. **suspended** (Temporarily disabled)
   - Admin suspends user account
   - User cannot login
   - Can be reactivated later

### Email Notifications

**Emails Sent During Registration:**

1. **Welcome Email** (Immediate)
   - Sent to: User's registered email
   - Content: Welcome message, next steps
   - Action: None required initially

2. **Admin Notification** (Immediate)
   - Sent to: System administrators
   - Content: New user registration details
   - Action: Review and approve/reject

3. **Approval Email** (After admin approval)
   - Sent to: User's registered email
   - Content: Account approved, verification link
   - Action: Click verification link
   - Link expires: 24 hours

4. **Verification Confirmation** (After email verified)
   - Sent to: User's registered email
   - Content: Account fully activated
   - Action: Login to platform

### Token Management

#### Access Token
- **Type:** JWT (JSON Web Token)
- **Expiry:** 1 hour (3600 seconds)
- **Purpose:** API authentication
- **Storage:** localStorage or httpOnly cookie
- **Claims:**
  ```json
  {
    "sub": "user_id",
    "email": "user@example.com",
    "role": "Professional",
    "status": "pending_approval",
    "iat": 1234567890,
    "exp": 1234571490
  }
  ```

#### Refresh Token
- **Type:** JWT
- **Expiry:** 7 days (604800 seconds)
- **Purpose:** Obtain new access token
- **Storage:** httpOnly cookie (recommended)
- **Rotation:** New refresh token issued on refresh

### Password Security

**Hashing Algorithm:** bcrypt

**Configuration:**
```javascript
{
  saltRounds: 10,
  algorithm: "bcrypt"
}
```

**Password Requirements:**
- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number
- Special characters recommended
- Not in common password list

### Duplicate Prevention

**Email Uniqueness:**
- Database unique constraint on email field
- Email normalized to lowercase before check
- Race condition handling with DB-level locks

**Example Check:**
```sql
SELECT COUNT(*) FROM users 
WHERE LOWER(email) = LOWER('user@example.com');
```

### Rate Limiting

**Registration Endpoint Limits:**
- **Per IP:** 5 requests per 15 minutes
- **Per Email:** 3 requests per hour
- **Global:** 1000 requests per minute

**Response When Limited:**
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many registration attempts. Please try again later.",
    "retryAfter": 900
  }
}
```

---

## Testing Examples

### JavaScript/TypeScript Examples

#### Using Axios - Professional Registration

```typescript
import axios from 'axios';

const registerProfessional = async () => {
  try {
    const response = await axios.post(
      'https://your-api-domain.com/api/v1/auth/register',
      {
        email: 'john.doe@example.com',
        password: 'SecurePass123!',
        phone: '9876543210',
        role: 'Professional',
        firstName: 'John',
        lastName: 'Doe',
        expertise: 'Mechanical Engineering',
        termsAccepted: true,
        privacyAccepted: true
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    // Store tokens
    localStorage.setItem('access_token', response.data.data.access_token);
    localStorage.setItem('refresh_token', response.data.data.refresh_token);
    
    // Redirect to pending approval page
    window.location.href = '/pending-approval';
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Registration error:', error.response?.data);
      throw error.response?.data;
    }
    throw error;
  }
};
```

#### Using Axios - Industry Registration

```typescript
import axios from 'axios';

const registerIndustry = async () => {
  try {
    const response = await axios.post(
      'https://your-api-domain.com/api/v1/auth/register',
      {
        email: 'admin@steelindustries.com',
        password: 'SecurePass123!',
        phone: '9876543210',
        role: 'IndustryAdmin',
        firstName: 'Jane',
        lastName: 'Smith',
        companyName: 'Steel Industries Ltd.',
        industryType: 'Steel Manufacturing',
        termsAccepted: true,
        privacyAccepted: true
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    localStorage.setItem('access_token', response.data.data.access_token);
    localStorage.setItem('refresh_token', response.data.data.refresh_token);
    
    window.location.href = '/pending-approval';
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Registration error:', error.response?.data);
      throw error.response?.data;
    }
    throw error;
  }
};
```

#### Using Axios - Vendor Registration

```typescript
import axios from 'axios';

const registerVendor = async () => {
  try {
    const response = await axios.post(
      'https://your-api-domain.com/api/v1/auth/register',
      {
        email: 'contact@coastalservices.com',
        password: 'SecurePass123!',
        phone: '9876543210',
        role: 'Vendor',
        businessName: 'Coastal Services Ltd.',
        vendorCategory: 'Service Vendor',
        specialization: 'Equipment Maintenance',
        termsAccepted: true,
        privacyAccepted: true
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    localStorage.setItem('access_token', response.data.data.access_token);
    localStorage.setItem('refresh_token', response.data.data.refresh_token);
    
    window.location.href = '/pending-approval';
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Registration error:', error.response?.data);
      throw error.response?.data;
    }
    throw error;
  }
};
```

#### Using Fetch API

```typescript
const registerUser = async (userData: any) => {
  try {
    const response = await fetch(
      'https://your-api-domain.com/api/v1/auth/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error.message);
    }

    const data = await response.json();
    
    // Store tokens
    localStorage.setItem('access_token', data.data.access_token);
    localStorage.setItem('refresh_token', data.data.refresh_token);
    
    return data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};
```

#### React Hook Example

```typescript
import { useState } from 'react';
import axios from 'axios';

export const useRegistration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (userData: any) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        'https://your-api-domain.com/api/v1/auth/register',
        userData,
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );

      // Store tokens
      localStorage.setItem('access_token', response.data.data.access_token);
      localStorage.setItem('refresh_token', response.data.data.refresh_token);

      return { success: true, data: response.data };
    } catch (err: any) {
      const errorMessage = err.response?.data?.error?.message || 
                          'Registration failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading, error };
};

// Usage in component
const RegistrationForm = () => {
  const { register, isLoading, error } = useRegistration();

  const handleSubmit = async (formData: any) => {
    const result = await register(formData);
    
    if (result.success) {
      // Redirect to pending approval
      window.location.href = '/pending-approval';
    } else {
      // Show error to user
      alert(result.error);
    }
  };

  return (
    // Form JSX
  );
};
```

### Test Data Sets

#### Valid Professional Data
```json
{
  "email": "test.professional@example.com",
  "password": "TestPass123!",
  "phone": "9876543210",
  "role": "Professional",
  "firstName": "Test",
  "lastName": "Professional",
  "expertise": "Mechanical Engineering",
  "termsAccepted": true,
  "privacyAccepted": true
}
```

#### Valid Industry Data
```json
{
  "email": "test.industry@example.com",
  "password": "TestPass123!",
  "phone": "9876543210",
  "role": "IndustryAdmin",
  "firstName": "Test",
  "lastName": "Industry",
  "companyName": "Test Industries Ltd.",
  "industryType": "Steel Manufacturing",
  "termsAccepted": true,
  "privacyAccepted": true
}
```

#### Valid Vendor Data
```json
{
  "email": "test.vendor@example.com",
  "password": "TestPass123!",
  "phone": "9876543210",
  "role": "Vendor",
  "businessName": "Test Services Ltd.",
  "vendorCategory": "Service Vendor",
  "specialization": "Equipment Maintenance",
  "termsAccepted": true,
  "privacyAccepted": true
}
```

### Error Test Cases

#### Missing Required Field
```json
{
  "email": "test@example.com",
  "password": "TestPass123!",
  "role": "Professional"
  // Missing: phone, firstName, lastName, expertise, terms, privacy
}
```

**Expected Response:** `400 Bad Request` with validation errors

#### Invalid Email Format
```json
{
  "email": "invalid-email",
  "password": "TestPass123!",
  "phone": "9876543210",
  "role": "Professional",
  "firstName": "Test",
  "lastName": "User",
  "expertise": "Mechanical Engineering",
  "termsAccepted": true,
  "privacyAccepted": true
}
```

**Expected Response:** `400 Bad Request` - Invalid email format

#### Weak Password
```json
{
  "email": "test@example.com",
  "password": "weak",
  "phone": "9876543210",
  "role": "Professional",
  "firstName": "Test",
  "lastName": "User",
  "expertise": "Mechanical Engineering",
  "termsAccepted": true,
  "privacyAccepted": true
}
```

**Expected Response:** `400 Bad Request` - Password too weak

#### Terms Not Accepted
```json
{
  "email": "test@example.com",
  "password": "TestPass123!",
  "phone": "9876543210",
  "role": "Professional",
  "firstName": "Test",
  "lastName": "User",
  "expertise": "Mechanical Engineering",
  "termsAccepted": false,
  "privacyAccepted": true
}
```

**Expected Response:** `400 Bad Request` - Terms must be accepted

---

## Additional Resources

### Related API Endpoints

After successful registration, users may need these endpoints:

- **Email Verification:** `POST /api/v1/auth/verify-email`
- **Resend Verification:** `POST /api/v1/auth/resend-verification`
- **Login:** `POST /api/v1/auth/login`
- **Check Approval Status:** `GET /api/v1/auth/approval-status`
- **Refresh Token:** `POST /api/v1/auth/refresh-token`

### Frontend Integration Files

**Current Implementation:**
- Professional: `src/components/signup/ProfessionalForm.tsx` ✅ Integrated
- Industry: `src/components/signup/IndustryForm.tsx` ⚠️ Needs integration
- Vendor: `src/components/signup/VendorForm.tsx` ⚠️ Needs integration

**Shared Hook:**
- `src/components/auth/hooks/useAuth.ts` - Registration logic

**API Configuration:**
- `src/services/modules/auth/auth.routes.ts` - Route definitions
- `src/services/modules/auth/auth.types.ts` - TypeScript types
- `src/services/api.service.ts` - Axios instance

### Support

For API issues or questions:
- **Documentation:** `docs/api/auth/`
- **Issue Tracker:** [Your issue tracker URL]
- **Support Email:** support@your-domain.com

---

**Document Version:** 1.0.0  
**Last Updated:** 2024-01-16  
**Maintained By:** Backend Development Team