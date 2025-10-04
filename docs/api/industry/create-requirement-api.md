# Create Requirement API Documentation

## Overview

This document provides comprehensive API documentation for the Create Requirement module. The Create Requirement workflow is a 6-step process that allows industrial users to create and publish procurement requirements for products, services, expert consultation, and logistics needs.

## Base URL

```
https://your-api-domain.com/api/v1
```

## Authentication

All API endpoints require JWT Bearer token authentication.

**Headers Required:**
```http
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
```

For file uploads:
```http
Authorization: Bearer <your_jwt_token>
Content-Type: multipart/form-data
```

---

## Workflow Overview

The Create Requirement process consists of 6 steps:

1. **Basic Information** - Title, category, priority, business justification
2. **Details** - Category-specific requirements (Expert/Product/Service/Logistics)
3. **Documents** - Upload supporting documents (optional)
4. **Approval Workflow** - Configure approval process
5. **Preview** - Review all information (read-only)
6. **Publish** - Set deadline, evaluation criteria, and publish

### Auto-Save Draft Feature

The form automatically saves as a draft after each step. Drafts can be resumed later.

---

## Data Models

### RequirementFormData (Complete Schema)

```typescript
interface RequirementFormData {
  // System Fields
  id?: string;
  createdDate?: string;
  
  // Basic Information (Step 1)
  title: string;
  category: "product" | "service" | "expert" | "logistics";
  priority: "low" | "medium" | "high" | "critical";
  businessJustification: string;
  department: string;
  costCenter: string;
  requestedBy: string;
  estimatedBudget: number;
  budgetApproved: boolean;
  urgency: boolean;
  isUrgent: boolean;
  
  // General Details (Step 2)
  description?: string;
  complianceRequired?: boolean;
  riskLevel?: "low" | "medium" | "high" | "critical";
  
  // Expert-Specific Fields (Step 2 - Expert)
  specialization?: string;
  certifications?: string[];
  duration?: number;
  startDate?: Date;
  endDate?: Date;
  
  // Product-Specific Fields (Step 2 - Product)
  productSpecifications?: string;
  quantity?: number;
  technicalStandards?: string[];
  productDeliveryDate?: Date;
  qualityRequirements?: string;
  
  // Service-Specific Fields (Step 2 - Service)
  serviceDescription?: string;
  scopeOfWork?: string;
  performanceMetrics?: string;
  serviceStartDate?: Date;
  serviceEndDate?: Date;
  serviceBudget?: number;
  location?: string;
  
  // Logistics-Specific Fields (Step 2 - Logistics)
  equipmentType?: string;
  pickupLocation?: string;
  deliveryLocation?: string;
  weight?: number;
  dimensions?: string;
  pickupDate?: Date;
  deliveryDate?: Date;
  specialHandling?: string;
  
  // Documents (Step 3)
  documents?: Document[];
  
  // Approval Workflow (Step 4)
  approvalWorkflowId?: string;
  approvalStatus?: 'not_required' | 'pending' | 'approved' | 'rejected';
  emergencyPublished?: boolean;
  approvalDeadline?: Date;
  
  // Publish Settings (Step 6)
  submissionDeadline: Date;
  evaluationCriteria: string[];
  visibility: "all" | "selected";
  notifyByEmail: boolean;
  notifyByApp: boolean;
  termsAccepted: boolean;
  
  // Legacy Fields
  budget?: number;
  deadline?: string;
  applicants?: number;
}

interface Document {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  documentType: "specification" | "drawing" | "reference" | "compliance" | "other";
  version: number;
  uploadedAt: Date;
  uploadedBy: string;
}
```

### DraftMetadata

```typescript
interface DraftMetadata {
  draftId: string;
  currentStep: number;
  lastSaved: string;
  completedSteps: number[];
  isValid: boolean;
}
```

### ValidationError

```typescript
interface ValidationError {
  field: string;
  message: string;
  code: string;
}
```

---

## API Endpoints

### 1. Create New Draft

Initialize a new requirement draft.

**Endpoint:** `POST /api/v1/industry/requirements/draft`

**Request Body:**
```typescript
{
  category?: "product" | "service" | "expert" | "logistics";
  title?: string;
}
```

**Request Example:**

```bash
curl -X POST "https://your-api-domain.com/api/v1/industry/requirements/draft" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "category": "product",
    "title": "Industrial Valves Procurement"
  }'
```

**Response Example (201 Created):**

```json
{
  "success": true,
  "data": {
    "draftId": "draft-REQ-20240116-001",
    "currentStep": 1,
    "lastSaved": "2024-01-16T10:30:00Z",
    "completedSteps": [],
    "expiresAt": "2024-01-23T10:30:00Z"
  },
  "message": "Draft created successfully"
}
```

---

### 2. Update Draft (Auto-Save)

Update requirement draft with partial data (called after each step).

**Endpoint:** `PATCH /api/v1/industry/requirements/draft/:draftId`

**Path Parameters:**
- `draftId`: The draft ID

**Request Body:** Partial RequirementFormData

**Request Example (Step 1 - Basic Info):**

```bash
curl -X PATCH "https://your-api-domain.com/api/v1/industry/requirements/draft/draft-REQ-20240116-001" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Industrial Valves Procurement",
    "category": "product",
    "priority": "high",
    "businessJustification": "Required for manufacturing line upgrade to meet Q1 production targets",
    "department": "Manufacturing",
    "costCenter": "MFG-001",
    "requestedBy": "John Smith",
    "estimatedBudget": 25000,
    "budgetApproved": true,
    "urgency": false,
    "isUrgent": false,
    "currentStep": 1
  }'
```

**Response Example (200 OK):**

```json
{
  "success": true,
  "data": {
    "draftId": "draft-REQ-20240116-001",
    "currentStep": 1,
    "lastSaved": "2024-01-16T10:32:15Z",
    "completedSteps": [1],
    "isValid": true,
    "expiresAt": "2024-01-23T10:32:15Z"
  },
  "message": "Draft saved successfully"
}
```

---

### 3. Validate Step

Validate a specific step before proceeding.

**Endpoint:** `POST /api/v1/industry/requirements/draft/:draftId/validate`

**Path Parameters:**
- `draftId`: The draft ID

**Request Body:**
```typescript
{
  step: number;
  data: Partial<RequirementFormData>;
}
```

**Request Example:**

```bash
curl -X POST "https://your-api-domain.com/api/v1/industry/requirements/draft/draft-REQ-20240116-001/validate" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "step": 1,
    "data": {
      "title": "Industrial Valves Procurement",
      "category": "product",
      "priority": "high"
    }
  }'
```

**Response Example (200 OK - Valid):**

```json
{
  "success": true,
  "data": {
    "isValid": true,
    "step": 1,
    "errors": []
  },
  "message": "Validation successful"
}
```

**Response Example (400 Bad Request - Invalid):**

```json
{
  "success": false,
  "data": {
    "isValid": false,
    "step": 1,
    "errors": [
      {
        "field": "businessJustification",
        "message": "Business justification is required",
        "code": "REQUIRED_FIELD"
      },
      {
        "field": "estimatedBudget",
        "message": "Valid estimated budget is required",
        "code": "INVALID_VALUE"
      }
    ]
  },
  "message": "Validation failed"
}
```

---

### 4. Upload Documents

Upload supporting documents for the requirement.

**Endpoint:** `POST /api/v1/industry/requirements/draft/:draftId/documents`

**Path Parameters:**
- `draftId`: The draft ID

**Headers:**
```http
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body (multipart/form-data):**
- `files`: File array
- `documentType`: Document type for each file
- `version`: Version number (optional)

**Request Example:**

```bash
curl -X POST "https://your-api-domain.com/api/v1/industry/requirements/draft/draft-REQ-20240116-001/documents" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -F "files=@valve-specifications.pdf" \
  -F "files=@technical-drawings.dwg" \
  -F "documentType=specification" \
  -F "documentType=drawing"
```

**Response Example (200 OK):**

```json
{
  "success": true,
  "data": {
    "documents": [
      {
        "id": "doc-001",
        "name": "valve-specifications.pdf",
        "url": "https://storage.example.com/documents/doc-001.pdf",
        "type": "application/pdf",
        "size": 2458624,
        "documentType": "specification",
        "version": 1,
        "uploadedAt": "2024-01-16T10:35:00Z",
        "uploadedBy": "user-123"
      },
      {
        "id": "doc-002",
        "name": "technical-drawings.dwg",
        "url": "https://storage.example.com/documents/doc-002.dwg",
        "type": "application/acad",
        "size": 5242880,
        "documentType": "drawing",
        "version": 1,
        "uploadedAt": "2024-01-16T10:35:02Z",
        "uploadedBy": "user-123"
      }
    ]
  },
  "message": "Documents uploaded successfully"
}
```

---

### 5. Configure Approval Workflow

Set up the approval workflow for the requirement.

**Endpoint:** `POST /api/v1/industry/requirements/draft/:draftId/approval-workflow`

**Path Parameters:**
- `draftId`: The draft ID

**Request Body:**
```typescript
{
  approvalWorkflowId: string;
  isUrgent: boolean;
  approvalDeadline?: Date;
  emergencyPublish?: boolean;
}
```

**Request Example:**

```bash
curl -X POST "https://your-api-domain.com/api/v1/industry/requirements/draft/draft-REQ-20240116-001/approval-workflow" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "approvalWorkflowId": "workflow-standard-high",
    "isUrgent": false,
    "approvalDeadline": "2024-01-20T23:59:59Z",
    "emergencyPublish": false
  }'
```

**Response Example (200 OK):**

```json
{
  "success": true,
  "data": {
    "approvalWorkflowId": "workflow-standard-high",
    "approvalStatus": "pending",
    "approvers": [
      {
        "level": 1,
        "role": "Department Head",
        "userId": "user-789",
        "name": "Michael Brown",
        "deadline": "2024-01-18T23:59:59Z"
      },
      {
        "level": 2,
        "role": "Finance Manager",
        "userId": "user-456",
        "name": "Sarah Johnson",
        "deadline": "2024-01-20T23:59:59Z"
      }
    ],
    "estimatedApprovalDate": "2024-01-20T23:59:59Z"
  },
  "message": "Approval workflow configured successfully"
}
```

---

### 6. Publish Requirement

Final step - publish the requirement to vendors/professionals.

**Endpoint:** `POST /api/v1/industry/requirements/publish`

**Request Body:** Complete RequirementFormData

**Request Example:**

```bash
curl -X POST "https://your-api-domain.com/api/v1/industry/requirements/publish" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "draftId": "draft-REQ-20240116-001",
    "submissionDeadline": "2024-02-15T23:59:59Z",
    "evaluationCriteria": [
      "Price",
      "Quality",
      "Delivery Time",
      "Warranty"
    ],
    "visibility": "all",
    "notifyByEmail": true,
    "notifyByApp": true,
    "termsAccepted": true
  }'
```

**Response Example (201 Created):**

```json
{
  "success": true,
  "data": {
    "requirementId": "REQ-20240116-001",
    "status": "published",
    "publishedAt": "2024-01-16T11:00:00Z",
    "submissionDeadline": "2024-02-15T23:59:59Z",
    "visibility": "all",
    "notificationsInfo": {
      "emailsSent": 145,
      "appNotificationsSent": 189,
      "totalReach": 189
    },
    "approvalStatus": "pending",
    "nextActions": [
      "Wait for approvals",
      "Monitor vendor responses",
      "Review quotes"
    ]
  },
  "message": "Requirement published successfully"
}
```

**Response Example (202 Accepted - Requires Approval):**

```json
{
  "success": true,
  "data": {
    "requirementId": "REQ-20240116-001",
    "status": "pending_approval",
    "submittedAt": "2024-01-16T11:00:00Z",
    "approvalStatus": "pending",
    "currentApprovalLevel": 1,
    "pendingApprovers": [
      {
        "level": 1,
        "role": "Department Head",
        "name": "Michael Brown",
        "deadline": "2024-01-18T23:59:59Z"
      }
    ],
    "estimatedPublishDate": "2024-01-20T23:59:59Z",
    "nextActions": [
      "Wait for Department Head approval",
      "Check approval status regularly"
    ]
  },
  "message": "Requirement submitted for approval"
}
```

---

### 7. Get Draft by ID

Retrieve a saved draft.

**Endpoint:** `GET /api/v1/industry/requirements/draft/:draftId`

**Path Parameters:**
- `draftId`: The draft ID

**Request Example:**

```bash
curl -X GET "https://your-api-domain.com/api/v1/industry/requirements/draft/draft-REQ-20240116-001" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json"
```

**Response Example (200 OK):**

```json
{
  "success": true,
  "data": {
    "draftId": "draft-REQ-20240116-001",
    "currentStep": 3,
    "lastSaved": "2024-01-16T10:45:00Z",
    "completedSteps": [1, 2, 3],
    "expiresAt": "2024-01-23T10:45:00Z",
    "formData": {
      "title": "Industrial Valves Procurement",
      "category": "product",
      "priority": "high",
      "businessJustification": "Required for manufacturing line upgrade",
      "department": "Manufacturing",
      "costCenter": "MFG-001",
      "requestedBy": "John Smith",
      "estimatedBudget": 25000,
      "budgetApproved": true,
      "productSpecifications": "High-pressure industrial valves, 316 stainless steel",
      "quantity": 50,
      "technicalStandards": ["ASME B16.34", "API 600"],
      "documents": [
        {
          "id": "doc-001",
          "name": "valve-specifications.pdf",
          "url": "https://storage.example.com/documents/doc-001.pdf",
          "type": "application/pdf",
          "size": 2458624,
          "documentType": "specification",
          "version": 1,
          "uploadedAt": "2024-01-16T10:35:00Z",
          "uploadedBy": "user-123"
        }
      ]
    }
  }
}
```

---

### 8. Get User's Drafts

Get all drafts created by the current user.

**Endpoint:** `GET /api/v1/industry/requirements/drafts`

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `sortBy` (optional): Sort field - `lastSaved`, `createdDate`
- `order` (optional): Sort order - `asc`, `desc`

**Request Example:**

```bash
curl -X GET "https://your-api-domain.com/api/v1/industry/requirements/drafts?page=1&limit=10" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json"
```

**Response Example (200 OK):**

```json
{
  "success": true,
  "data": [
    {
      "draftId": "draft-REQ-20240116-001",
      "title": "Industrial Valves Procurement",
      "category": "product",
      "currentStep": 3,
      "lastSaved": "2024-01-16T10:45:00Z",
      "completedSteps": [1, 2, 3],
      "progress": 50,
      "expiresAt": "2024-01-23T10:45:00Z"
    },
    {
      "draftId": "draft-REQ-20240115-002",
      "title": "Chemical Transport Services",
      "category": "logistics",
      "currentStep": 2,
      "lastSaved": "2024-01-15T14:30:00Z",
      "completedSteps": [1, 2],
      "progress": 33,
      "expiresAt": "2024-01-22T14:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 2,
    "totalPages": 1,
    "hasNext": false,
    "hasPrev": false
  }
}
```

---

### 9. Delete Draft

Delete a draft requirement.

**Endpoint:** `DELETE /api/v1/industry/requirements/draft/:draftId`

**Path Parameters:**
- `draftId`: The draft ID

**Request Example:**

```bash
curl -X DELETE "https://your-api-domain.com/api/v1/industry/requirements/draft/draft-REQ-20240116-001" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json"
```

**Response Example (200 OK):**

```json
{
  "success": true,
  "message": "Draft deleted successfully"
}
```

---

## Error Responses

### 400 Bad Request

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "title",
        "message": "Title is required",
        "code": "REQUIRED_FIELD"
      }
    ]
  }
}
```

### 401 Unauthorized

```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or expired token"
  }
}
```

### 403 Forbidden

```json
{
  "success": false,
  "error": {
    "code": "FORBIDDEN",
    "message": "You don't have permission to access this resource"
  }
}
```

### 404 Not Found

```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Draft not found"
  }
}
```

### 413 Payload Too Large

```json
{
  "success": false,
  "error": {
    "code": "FILE_TOO_LARGE",
    "message": "File size exceeds maximum allowed (10MB)",
    "maxSize": 10485760
  }
}
```

### 500 Internal Server Error

```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "An unexpected error occurred"
  }
}
```

---

## Rate Limiting

- **Rate Limit:** 100 requests per minute per user
- **Headers Returned:**
  - `X-RateLimit-Limit`: 100
  - `X-RateLimit-Remaining`: 95
  - `X-RateLimit-Reset`: 1705401600

**Rate Limit Exceeded Response (429):**

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests. Please try again later.",
    "retryAfter": 60
  }
}
```

---

## Notes

1. **Draft Expiration:** Drafts expire after 7 days of inactivity
2. **File Upload Limits:** Maximum 10MB per file, 5 files per requirement
3. **Supported File Types:** PDF, DOC, DOCX, XLS, XLSX, DWG, PNG, JPG
4. **Auto-Save:** Triggered after each step completion
5. **Emergency Publish:** Bypasses approval workflow (requires special permission)
6. **Validation:** All steps are validated before proceeding to next step
7. **Notification:** Vendors/professionals are notified based on visibility settings