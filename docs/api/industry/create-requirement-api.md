# Create Requirement API - Complete Documentation

## Table of Contents
1. [Quick Start](#quick-start)
2. [Complete Data Models](#complete-data-models)
3. [API Endpoints](#api-endpoints)
4. [Step-by-Step Implementation Guide](#step-by-step-implementation-guide)
5. [Business Rules & Logic](#business-rules--logic)
6. [Workflow Diagrams](#workflow-diagrams)
7. [Error Handling](#error-handling)
8. [Notification System](#notification-system)
9. [Testing & Integration](#testing--integration)
10. [Appendix](#appendix)

---

## Quick Start

### Overview

The Create Requirement API enables industrial users to create and publish procurement requirements through a 6-step workflow. This process supports four categories: **Product**, **Service**, **Expert**, and **Logistics**.

### Base URL

```
https://your-api-domain.com/api/v1
```

### Authentication

All endpoints require JWT Bearer token authentication.

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

### Workflow Summary

| Step | Purpose | API Endpoint | Required |
|------|---------|--------------|----------|
| **1. Basic Information** | Title, category, priority, budget | `PATCH /draft/:id` | Yes |
| **2. Details** | Category-specific fields | `PATCH /draft/:id` | Yes |
| **3. Documents** | Upload supporting files | `POST /draft/:id/documents` | Optional |
| **4. Approval Workflow** | Configure approval process | `POST /draft/:id/approval-workflow` | Conditional |
| **5. Preview** | Review all information | UI Only | Yes |
| **6. Publish** | Set deadline & publish | `POST /requirements/publish` | Yes |

### Quick Reference: Step → Endpoint Mapping

```typescript
// Step 1 & 2: Basic Information and Details
PATCH /api/v1/industry/requirements/draft/:draftId

// Step 2: Validate any step
POST /api/v1/industry/requirements/draft/:draftId/validate

// Step 3: Upload Documents
POST /api/v1/industry/requirements/draft/:draftId/documents

// Step 4: Configure Approval
POST /api/v1/industry/requirements/draft/:draftId/approval-workflow

// Step 6: Publish Requirement
POST /api/v1/industry/requirements/publish
```

### Auto-Save Draft Feature

The form automatically saves as a draft with **debounced auto-save** (2-second delay). Key features:

- **Debounce Delay:** 2 seconds after user stops typing
- **Retry Logic:** 3 attempts with exponential backoff (1s, 2s, 4s)
- **Deduplication:** Uses `X-Debounce-Token` header to prevent duplicate saves
- **Offline Support:** Falls back to localStorage after 3 failed API attempts
- **Expiration:** Drafts expire after 7 days of inactivity
- **Resume:** Drafts can be resumed with conflict detection for concurrent edits

**Auto-Save Headers:**
```http
Authorization: Bearer <jwt_token>
Content-Type: application/json
X-Debounce-Token: <unique_token_per_save>
```

**Auto-Save Response:**
```json
{
  "success": true,
  "data": {
    "draftId": "draft-REQ-001",
    "lastSaved": "2024-01-16T10:32:15Z",
    "retryCount": 0,
    "savedToCloud": true
  }
}
```

---

## Complete Data Models

### RequirementFormData Interface

The complete schema for requirement data (all 82+ fields):

```typescript
interface RequirementFormData {
  // System Fields
  id?: string;
  createdDate?: string;
  
  // Basic Information (Step 1)
  title: string;                    // Min 5, Max 200 chars
  category: "product" | "service" | "expert" | "logistics";
  priority: "low" | "medium" | "high" | "critical";
  businessJustification: string;    // Min 20, Max 1000 chars
  department: string;
  costCenter: string;               // Format: XXX-NNN
  requestedBy: string;
  estimatedBudget: number;          // > 0
  budgetApproved: boolean;
  urgency: boolean;
  isUrgent: boolean;
  
  // General Details (Step 2)
  description?: string;
  complianceRequired?: boolean;
  riskLevel?: "low" | "medium" | "high" | "critical";
  
  // Expert-Specific Fields (Step 2 - Expert Category)
  specialization?: string;
  certifications?: string[];
  duration?: number;                // in months
  startDate?: Date;
  endDate?: Date;
  
  // Product-Specific Fields (Step 2 - Product Category)
  productSpecifications?: string;
  quantity?: number;
  technicalStandards?: string[];
  productDeliveryDate?: Date;
  qualityRequirements?: string;
  
  // Service-Specific Fields (Step 2 - Service Category)
  serviceDescription?: string;
  scopeOfWork?: string;
  performanceMetrics?: string;
  serviceStartDate?: Date;
  serviceEndDate?: Date;
  serviceBudget?: number;
  location?: string;
  
  // Logistics-Specific Fields (Step 2 - Logistics Category)
  equipmentType?: string;
  pickupLocation?: string;
  deliveryLocation?: string;
  weight?: number;                  // in kg
  dimensions?: string;              // Format: LxWxH
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
  
  // Legacy Fields (backward compatibility)
  budget?: number;
  deadline?: string;
  applicants?: number;
}
```

### Document Interface

```typescript
interface Document {
  id: string;
  name: string;
  url: string;
  type: string;                     // MIME type
  size: number;                     // bytes
  documentType: "specification" | "drawing" | "reference" | "compliance" | "other";
  version: number;
  uploadedAt: Date;
  uploadedBy: string;
}
```

### DraftMetadata Interface

```typescript
interface DraftMetadata {
  draftId: string;
  currentStep: number;              // 1-6
  lastSaved: string;                // ISO 8601 timestamp
  completedSteps: number[];         // Array of completed step numbers
  isValid: boolean;
  expiresAt: string;                // ISO 8601 timestamp
  retryCount?: number;              // Auto-save retry attempts
  savedToCloud: boolean;            // Whether saved to server or localStorage
  lastModifiedBy?: string;          // User ID for concurrent edit detection
}
```

### UploadSession Interface

```typescript
interface UploadSession {
  sessionId: string;
  draftId: string;
  fileName: string;
  fileSize: number;
  chunkSize: number;                // Default: 5MB
  totalChunks: number;
  uploadedChunks: number[];
  status: "initiated" | "uploading" | "completed" | "failed";
  createdAt: string;
  expiresAt: string;                // Session expires after 24 hours
}
```

### ApprovalDelegation Interface

```typescript
interface ApprovalDelegation {
  approvalId: string;
  delegatedFrom: string;            // User ID
  delegatedTo: string;              // User ID
  reason: string;
  delegatedAt: string;
  expiresAt?: string;
  status: "active" | "expired" | "completed";
}
```

### ValidationError Interface

```typescript
interface ValidationError {
  field: string;                    // Field name that failed validation
  message: string;                  // Human-readable error message
  code: string;                     // Error code (e.g., "REQUIRED_FIELD")
}
```

### JSON Schema Reference

For detailed JSON Schema validation rules, see: [`docs/api/schemas/requirement-schemas.json`](../schemas/requirement-schemas.json)

---

## API Endpoints

### 3.1 Draft Management

#### Create New Draft

Initialize a new requirement draft.

**Endpoint:** `POST /api/v1/industry/requirements/draft`

**Request Body:**
```typescript
{
  category?: "product" | "service" | "expert" | "logistics";
  title?: string;
}
```

**Example Request:**
```bash
curl -X POST "https://your-api-domain.com/api/v1/industry/requirements/draft" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "category": "product",
    "title": "Industrial Valves Procurement"
  }'
```

**Response (201 Created):**
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

#### Update Draft (Auto-Save)

Update requirement draft with partial data. Called after completing each step.

**Endpoint:** `PATCH /api/v1/industry/requirements/draft/:draftId`

**Path Parameters:**
- `draftId`: The draft ID

**Request Body:** Partial `RequirementFormData`

**Example Request (Step 1):**
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

**Response (200 OK):**
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

#### Get Draft by ID

Retrieve a specific draft.

**Endpoint:** `GET /api/v1/industry/requirements/draft/:draftId`

**Path Parameters:**
- `draftId`: The draft ID

**Example Request:**
```bash
curl -X GET "https://your-api-domain.com/api/v1/industry/requirements/draft/draft-REQ-20240116-001" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "draftId": "draft-REQ-20240116-001",
    "formData": {
      "title": "Industrial Valves Procurement",
      "category": "product",
      "priority": "high",
      // ... all saved fields
    },
    "metadata": {
      "currentStep": 2,
      "lastSaved": "2024-01-16T10:35:20Z",
      "completedSteps": [1, 2],
      "expiresAt": "2024-01-23T10:35:20Z"
    }
  }
}
```

---

#### Get All User Drafts

Retrieve all drafts for the current user.

**Endpoint:** `GET /api/v1/industry/requirements/drafts`

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `sortBy` (optional): Sort field (default: "lastSaved")
- `order` (optional): Sort order - "asc" or "desc" (default: "desc")

**Example Request:**
```bash
curl -X GET "https://your-api-domain.com/api/v1/industry/requirements/drafts?page=1&limit=10&sortBy=lastSaved&order=desc" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "drafts": [
      {
        "draftId": "draft-REQ-20240116-001",
        "title": "Industrial Valves Procurement",
        "category": "product",
        "currentStep": 2,
        "lastSaved": "2024-01-16T10:35:20Z",
        "completedSteps": [1, 2],
        "progress": 33
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 1,
      "totalPages": 1
    }
  }
}
```

---

#### Delete Draft

Delete a draft requirement.

**Endpoint:** `DELETE /api/v1/industry/requirements/draft/:draftId`

**Path Parameters:**
- `draftId`: The draft ID

**Example Request:**
```bash
curl -X DELETE "https://your-api-domain.com/api/v1/industry/requirements/draft/draft-REQ-20240116-001" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Draft deleted successfully"
}
```

---

#### Resume Draft

Resume an existing draft and detect concurrent edits.

**Endpoint:** `POST /api/v1/industry/requirements/draft/:draftId/resume`

**Path Parameters:**
- `draftId`: The draft ID

**Request Body:**
```typescript
{
  lastKnownStep: number;
  clientTimestamp: string;          // ISO 8601 timestamp for conflict detection
  localData?: Partial<RequirementFormData>; // Optional localStorage backup
}
```

**Example Request:**
```bash
curl -X POST "https://your-api-domain.com/api/v1/industry/requirements/draft/draft-REQ-20240116-001/resume" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "lastKnownStep": 2,
    "clientTimestamp": "2024-01-16T10:30:00Z"
  }'
```

**Response (200 OK - No Conflicts):**
```json
{
  "success": true,
  "data": {
    "draftId": "draft-REQ-20240116-001",
    "formData": {
      "title": "Industrial Valves Procurement",
      // ... all saved fields
    },
    "metadata": {
      "currentStep": 2,
      "lastSaved": "2024-01-16T10:35:20Z",
      "completedSteps": [1, 2],
      "expiresAt": "2024-01-23T10:35:20Z"
    },
    "conflicts": []
  },
  "message": "Draft resumed successfully"
}
```

**Response (409 Conflict - Concurrent Edit):**
```json
{
  "success": false,
  "error": {
    "code": "CONCURRENT_EDIT_CONFLICT",
    "message": "Draft was modified by another user or session",
    "details": {
      "draftId": "draft-REQ-20240116-001",
      "lastModifiedBy": "user-456",
      "lastModifiedAt": "2024-01-16T10:45:00Z",
      "conflicts": [
        {
          "field": "title",
          "serverValue": "Updated Valves Procurement",
          "clientValue": "Industrial Valves Procurement"
        },
        {
          "field": "estimatedBudget",
          "serverValue": 30000,
          "clientValue": 25000
        }
      ]
    }
  }
}
```

---

### 3.2 Step Operations

#### Validate Step

Validate a specific step before proceeding.

**Endpoint:** `POST /api/v1/industry/requirements/draft/:draftId/validate/step/:stepNumber`

**Path Parameters:**
- `draftId`: The draft ID
- `stepNumber`: The step number (1-6)

**Request Body:**
```typescript
{
  data: Partial<RequirementFormData>;
}
```

**Example Request:**
```bash
curl -X POST "https://your-api-domain.com/api/v1/industry/requirements/draft/draft-REQ-20240116-001/validate" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "step": 1,
    "data": {
      "title": "Industrial Valves Procurement",
      "category": "product",
      "priority": "high",
      "businessJustification": "Required for manufacturing line upgrade",
      "estimatedBudget": 25000
    }
  }'
```

**Response (200 OK - Valid):**
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

**Response (400 Bad Request - Invalid):**
```json
{
  "success": false,
  "data": {
    "isValid": false,
    "step": 1,
    "errors": [
      {
        "field": "businessJustification",
        "message": "Business justification must be at least 20 characters",
        "code": "MIN_LENGTH"
      },
      {
        "field": "estimatedBudget",
        "message": "Budget must be greater than 0",
        "code": "INVALID_VALUE"
      }
    ]
  },
  "message": "Validation failed"
}
```

---

#### Validate All Steps

Perform final validation of all steps before publishing.

**Endpoint:** `GET /api/v1/industry/requirements/draft/:draftId/validate/all`

**Path Parameters:**
- `draftId`: The draft ID

**Example Request:**
```bash
curl -X GET "https://your-api-domain.com/api/v1/industry/requirements/draft/draft-REQ-20240116-001/validate/all" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response (200 OK - All Valid):**
```json
{
  "success": true,
  "data": {
    "isValid": true,
    "completedSteps": [1, 2, 3, 4, 5, 6],
    "invalidSteps": [],
    "warnings": []
  },
  "message": "All steps validated successfully"
}
```

**Response (400 Bad Request - Has Invalid Steps):**
```json
{
  "success": false,
  "data": {
    "isValid": false,
    "completedSteps": [1, 2, 3],
    "invalidSteps": [
      {
        "step": 6,
        "errors": [
          {
            "field": "submissionDeadline",
            "message": "Submission deadline is required",
            "code": "REQUIRED_FIELD"
          },
          {
            "field": "evaluationCriteria",
            "message": "At least one evaluation criterion must be selected",
            "code": "REQUIRED_FIELD"
          }
        ]
      }
    ],
    "warnings": [
      {
        "step": 3,
        "message": "No documents uploaded. Consider adding supporting documents."
      }
    ]
  },
  "message": "Validation failed for some steps"
}
```

---

#### Upload Documents

Upload supporting documents for the requirement. Supports both standard upload (files < 5MB) and chunked upload (files > 5MB).

**Endpoint:** `POST /api/v1/industry/requirements/draft/:draftId/documents`

**Path Parameters:**
- `draftId`: The draft ID

**Headers (Standard Upload):**
```http
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Headers (Chunked Upload):**
```http
Authorization: Bearer <token>
Content-Type: multipart/form-data
Content-Range: bytes 0-5242879/15728640
X-Upload-Session-Id: session-abc123
```

**Form Data:**
- `files`: File array (max 5 files per request)
- `documentType`: Document type for each file

**File Size Limits:**
- Single file: Max 20MB
- Total batch: Max 50MB
- Files > 5MB automatically trigger chunked upload

**Chunked Upload Flow (for files > 5MB):**

1. **Initialize Upload Session:**
```bash
curl -X POST "https://your-api-domain.com/api/v1/industry/requirements/draft/draft-REQ-001/documents/init" \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "fileName": "large-drawing.dwg",
    "fileSize": 15728640,
    "mimeType": "application/acad",
    "documentType": "drawing"
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "sessionId": "session-abc123",
    "chunkSize": 5242880,
    "totalChunks": 3,
    "expiresAt": "2024-01-17T10:30:00Z"
  }
}
```

2. **Upload Chunks:**
```bash
# Upload chunk 1 of 3
curl -X POST "https://your-api-domain.com/api/v1/industry/requirements/draft/draft-REQ-001/documents/upload" \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Range: bytes 0-5242879/15728640" \
  -H "X-Upload-Session-Id: session-abc123" \
  -F "chunk=@chunk1.bin"

# Upload chunk 2 of 3
curl -X POST "https://your-api-domain.com/api/v1/industry/requirements/draft/draft-REQ-001/documents/upload" \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Range: bytes 5242880-10485759/15728640" \
  -H "X-Upload-Session-Id: session-abc123" \
  -F "chunk=@chunk2.bin"

# Upload chunk 3 of 3 (final chunk)
curl -X POST "https://your-api-domain.com/api/v1/industry/requirements/draft/draft-REQ-001/documents/upload" \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Range: bytes 10485760-15728639/15728640" \
  -H "X-Upload-Session-Id: session-abc123" \
  -F "chunk=@chunk3.bin"
```

**Chunk Response:**
```json
{
  "success": true,
  "data": {
    "sessionId": "session-abc123",
    "uploadedChunks": [0, 1, 2],
    "remainingChunks": [],
    "progress": 100
  }
}
```

3. **Finalize Upload:**
```bash
curl -X POST "https://your-api-domain.com/api/v1/industry/requirements/draft/draft-REQ-001/documents/finalize" \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "session-abc123"
  }'
```

**Finalize Response:**
```json
{
  "success": true,
  "data": {
    "document": {
      "id": "doc-003",
      "name": "large-drawing.dwg",
      "url": "https://storage.example.com/documents/doc-003.dwg",
      "type": "application/acad",
      "size": 15728640,
      "documentType": "drawing",
      "version": 1,
      "uploadedAt": "2024-01-16T10:40:00Z",
      "uploadedBy": "user-123"
    }
  },
  "message": "Document uploaded successfully"
}
```

**Resume Interrupted Upload:**
```bash
curl -X GET "https://your-api-domain.com/api/v1/industry/requirements/draft/draft-REQ-001/documents/upload-status/session-abc123" \
  -H "Authorization: Bearer TOKEN"
```

**Resume Response:**
```json
{
  "success": true,
  "data": {
    "sessionId": "session-abc123",
    "fileName": "large-drawing.dwg",
    "fileSize": 15728640,
    "uploadedChunks": [0, 1],
    "remainingChunks": [2],
    "status": "uploading",
    "expiresAt": "2024-01-17T10:30:00Z"
  }
}
```

**Example Request:**
```bash
curl -X POST "https://your-api-domain.com/api/v1/industry/requirements/draft/draft-REQ-20240116-001/documents" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -F "files=@valve-specifications.pdf" \
  -F "files=@technical-drawings.dwg" \
  -F "documentType=specification" \
  -F "documentType=drawing"
```

**Response (200 OK):**
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
    ],
    "totalSize": 7701504,
    "uploadedCount": 2
  },
  "message": "Documents uploaded successfully"
}
```

**Error Response (413 - File Too Large):**
```json
{
  "success": false,
  "error": {
    "code": "FILE_TOO_LARGE",
    "message": "File 'technical-manual.pdf' exceeds maximum size of 10MB",
    "fileSize": 12582912,
    "maxSize": 10485760
  }
}
```

---

#### Delete Document

Remove a document from a draft.

**Endpoint:** `DELETE /api/v1/industry/requirements/draft/:draftId/documents/:documentId`

**Path Parameters:**
- `draftId`: The draft ID
- `documentId`: The document ID

**Example Request:**
```bash
curl -X DELETE "https://your-api-domain.com/api/v1/industry/requirements/draft/draft-REQ-20240116-001/documents/doc-001" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Document deleted successfully"
}
```

---

#### Configure Approval Workflow

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
  emergencyJustification?: string;  // Required if emergencyPublish = true
}
```

**Example Request:**
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

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "approvalWorkflowId": "workflow-standard-high",
    "approvalStatus": "pending",
    "workflowName": "Standard High Priority Approval",
    "approvers": [
      {
        "level": 1,
        "role": "Department Head",
        "userId": "user-789",
        "name": "Michael Brown",
        "email": "mbrown@company.com",
        "deadline": "2024-01-18T23:59:59Z",
        "status": "pending"
      },
      {
        "level": 2,
        "role": "Finance Manager",
        "userId": "user-456",
        "name": "Sarah Johnson",
        "email": "sjohnson@company.com",
        "deadline": "2024-01-20T23:59:59Z",
        "status": "pending"
      }
    ],
    "currentLevel": 1,
    "estimatedApprovalDate": "2024-01-20T23:59:59Z",
    "notificationsSent": true
  },
  "message": "Approval workflow configured successfully"
}
```

**Emergency Publish Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "emergencyPublish": true,
    "approvalStatus": "bypassed",
    "bypassedBy": "user-123",
    "bypassReason": "Production critical - emergency approval",
    "publishedImmediately": true,
    "postApprovalRequired": true,
    "postReviewDeadline": "2024-01-17T10:35:00Z"
  },
  "message": "Emergency publish approved. Post-approval review required within 24 hours."
}
```

---

#### Delegate Approval

Delegate an approval task to another user.

**Endpoint:** `POST /api/v1/industry/approvals/:approvalId/delegate`

**Path Parameters:**
- `approvalId`: The approval workflow ID

**Request Body:**
```typescript
{
  delegateTo: string;               // User ID of the delegate
  reason: string;                   // Reason for delegation
  expiresAt?: string;               // Optional expiration (ISO 8601)
}
```

**Example Request:**
```bash
curl -X POST "https://your-api-domain.com/api/v1/industry/approvals/approval-001/delegate" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "delegateTo": "user-deputy-01",
    "reason": "Out of office - traveling for business",
    "expiresAt": "2024-01-25T23:59:59Z"
  }'
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "approvalId": "approval-001",
    "delegatedTo": {
      "userId": "user-deputy-01",
      "name": "Jane Doe",
      "email": "jdoe@company.com"
    },
    "originalApprover": {
      "userId": "user-789",
      "name": "Michael Brown"
    },
    "reason": "Out of office - traveling for business",
    "delegatedAt": "2024-01-16T10:50:00Z",
    "expiresAt": "2024-01-25T23:59:59Z",
    "notificationSent": true
  },
  "message": "Approval delegated successfully"
}
```

---

#### Escalate Approval

Manually escalate an approval to the next level or specific user.

**Endpoint:** `POST /api/v1/industry/approvals/:approvalId/escalate`

**Path Parameters:**
- `approvalId`: The approval workflow ID

**Request Body:**
```typescript
{
  reason: string;                   // Reason for escalation
  escalateTo?: string;              // Optional: specific user ID (defaults to next level)
}
```

**Example Request:**
```bash
curl -X POST "https://your-api-domain.com/api/v1/industry/approvals/approval-001/escalate" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "reason": "Deadline approaching - need urgent decision"
  }'
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "approvalId": "approval-001",
    "escalatedTo": {
      "level": 2,
      "userId": "user-456",
      "name": "Sarah Johnson",
      "role": "Finance Manager"
    },
    "escalatedFrom": {
      "level": 1,
      "userId": "user-789",
      "name": "Michael Brown",
      "role": "Department Head"
    },
    "reason": "Deadline approaching - need urgent decision",
    "escalatedAt": "2024-01-16T10:55:00Z",
    "newDeadline": "2024-01-19T23:59:59Z",
    "notificationSent": true
  },
  "message": "Approval escalated successfully"
}
```

---

### 3.3 Final Submission

#### Publish Requirement

Final step - publish the requirement to vendors/professionals.

**Endpoint:** `POST /api/v1/industry/requirements/publish`

**Request Body:**
```typescript
{
  draftId: string;
  submissionDeadline: Date;         // Minimum 3 days from now
  evaluationCriteria: string[];     // At least 1 required
  visibility: "all" | "selected";
  selectedVendors?: string[];       // Required if visibility = "selected"
  notifyByEmail: boolean;
  notifyByApp: boolean;
  termsAccepted: boolean;           // Must be true
}
```

**Example Request:**
```bash
curl -X POST "https://your-api-domain.com/api/v1/industry/requirements/publish" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "draftId": "draft-REQ-20240116-001",
    "submissionDeadline": "2024-02-15T23:59:59Z",
    "evaluationCriteria": ["Price", "Quality", "Delivery Time", "Warranty"],
    "visibility": "all",
    "notifyByEmail": true,
    "notifyByApp": true,
    "termsAccepted": true
  }'
```

**Response (200 OK - No Approval Required):**
```json
{
  "success": true,
  "data": {
    "requirementId": "REQ-20240116-001",
    "status": "published",
    "publishedAt": "2024-01-16T10:45:00Z",
    "submissionDeadline": "2024-02-15T23:59:59Z",
    "vendorsNotified": 45,
    "notifications": {
      "email": 45,
      "app": 45,
      "sms": 0
    },
    "viewUrl": "https://platform.example.com/requirements/REQ-20240116-001",
    "notificationsSent": true
  },
  "message": "Requirement published successfully"
}
```

**Response (200 OK - Approval Required):**
```json
{
  "success": true,
  "data": {
    "requirementId": "REQ-20240116-001",
    "status": "pending_approval",
    "submittedAt": "2024-01-16T10:45:00Z",
    "approvalWorkflow": {
      "workflowId": "workflow-standard-high",
      "approvers": [
        {
          "level": 1,
          "name": "Michael Brown",
          "role": "Department Head",
          "deadline": "2024-01-18T23:59:59Z"
        },
        {
          "level": 2,
          "name": "Sarah Johnson",
          "role": "Finance Manager",
          "deadline": "2024-01-20T23:59:59Z"
        }
      ],
      "estimatedPublishDate": "2024-01-20T23:59:59Z",
      "estimatedApprovalTime": "4 days"
    },
    "notificationsSent": true
  },
  "message": "Requirement submitted for approval"
}
```

---

## Step-by-Step Implementation Guide

### Step 1: Basic Information

**Purpose:** Capture fundamental information about the requirement.

**Fields Required:**

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| title | string | Yes | Min 5, Max 200 chars |
| category | enum | Yes | "product", "service", "expert", "logistics" |
| priority | enum | Yes | "low", "medium", "high", "critical" |
| businessJustification | string | Yes | Min 20, Max 1000 chars |
| department | string | Yes | Min 2 chars |
| costCenter | string | Yes | Format: XXX-NNN |
| requestedBy | string | Yes | Min 2 chars |
| estimatedBudget | number | Yes | > 0 |
| budgetApproved | boolean | Yes | - |
| urgency | boolean | No | - |
| isUrgent | boolean | No | - |

**API Call:** `PATCH /api/v1/industry/requirements/draft/:draftId`

**Request Payload:**
```json
{
  "title": "Industrial Valves Procurement",
  "category": "product",
  "priority": "high",
  "businessJustification": "Required for manufacturing line upgrade to meet Q1 production targets. Current valves are outdated and causing frequent maintenance issues.",
  "department": "Manufacturing",
  "costCenter": "MFG-001",
  "requestedBy": "John Smith",
  "estimatedBudget": 25000,
  "budgetApproved": true,
  "urgency": false,
  "isUrgent": false,
  "currentStep": 1
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "draftId": "draft-REQ-20240116-001",
    "currentStep": 1,
    "lastSaved": "2024-01-16T10:32:15Z",
    "completedSteps": [1],
    "isValid": true
  },
  "message": "Step 1 saved successfully"
}
```

---

### Step 2: Details (Category-Specific)

**Purpose:** Capture category-specific requirements.

#### 2A. Expert Category

**Fields Required:**

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| specialization | string | Yes | Min 3 chars |
| description | string | Yes | Min 50, Max 2000 chars |
| certifications | string[] | No | Array of strings |
| duration | number | No | > 0 (in months) |
| startDate | Date | No | >= today |
| endDate | Date | No | > startDate |

**Request Payload:**
```json
{
  "specialization": "Industrial Safety Engineering",
  "description": "We require an experienced industrial safety engineer to conduct comprehensive safety audits of our manufacturing facilities. The expert should have expertise in OSHA compliance, risk assessment, and implementing safety management systems.",
  "certifications": [
    "Certified Safety Professional (CSP)",
    "OSHA 30-Hour Certification",
    "Industrial Hygiene Certification"
  ],
  "duration": 6,
  "startDate": "2024-02-01T00:00:00Z",
  "endDate": "2024-07-31T23:59:59Z",
  "currentStep": 2
}
```

---

#### 2B. Product Category

**Fields Required:**

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| productSpecifications | string | Yes | Min 50 chars |
| quantity | number | Yes | > 0 |
| technicalStandards | string[] | No | Array of strings |
| productDeliveryDate | Date | No | >= today |
| qualityRequirements | string | No | Max 1000 chars |

**Request Payload:**
```json
{
  "productSpecifications": "High-pressure industrial valves, 316 stainless steel construction, suitable for corrosive environments. Size range: 1/2\" to 4\". Pressure rating: 1500 PSI. Temperature range: -20°C to 200°C.",
  "quantity": 50,
  "technicalStandards": ["ASME B16.34", "API 600", "ISO 9001:2015"],
  "productDeliveryDate": "2024-03-15T00:00:00Z",
  "qualityRequirements": "All valves must undergo pressure testing and come with material traceability certificates. Factory acceptance testing required before shipment.",
  "currentStep": 2
}
```

---

#### 2C. Service Category

**Fields Required:**

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| serviceDescription | string | Yes | Min 50 chars |
| scopeOfWork | string | Yes | Min 100 chars |
| performanceMetrics | string | Yes | Min 20 chars |
| location | string | Yes | Min 5 chars |
| serviceStartDate | Date | No | >= today |
| serviceEndDate | Date | No | > serviceStartDate |
| serviceBudget | number | No | > 0 |

**Request Payload:**
```json
{
  "serviceDescription": "Comprehensive preventive maintenance service for all industrial equipment in our manufacturing facility.",
  "scopeOfWork": "Monthly inspections of all critical equipment, quarterly preventive maintenance activities, emergency repair services within 4 hours, maintenance reporting and documentation, spare parts management, and training for on-site maintenance staff.",
  "performanceMetrics": "Equipment uptime >95%, Response time <4 hours for emergencies, Maintenance completion rate >98%, Customer satisfaction score >4.5/5.0",
  "location": "Manufacturing Plant, 123 Industrial Drive, Houston, TX 77001",
  "serviceStartDate": "2024-02-01T00:00:00Z",
  "serviceEndDate": "2025-01-31T23:59:59Z",
  "serviceBudget": 120000,
  "currentStep": 2
}
```

---

#### 2D. Logistics Category

**Fields Required:**

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| equipmentType | string | Yes | Min 3 chars |
| pickupLocation | string | Yes | Min 10 chars |
| deliveryLocation | string | Yes | Min 10 chars |
| weight | number | No | > 0 (kg) |
| dimensions | string | No | Format: LxWxH |
| pickupDate | Date | No | >= today |
| deliveryDate | Date | No | > pickupDate |
| specialHandling | string | No | Max 500 chars |

**Request Payload:**
```json
{
  "equipmentType": "Hazardous Chemical - Corrosive Materials",
  "pickupLocation": "Chemical Warehouse, 456 Port Road, Houston, TX 77002",
  "deliveryLocation": "Manufacturing Facility, 789 Industrial Blvd, Dallas, TX 75201",
  "weight": 15000,
  "dimensions": "12m x 2.4m x 2.4m",
  "pickupDate": "2024-01-25T08:00:00Z",
  "deliveryDate": "2024-01-26T17:00:00Z",
  "specialHandling": "Requires temperature-controlled transport, specialized hazmat handling, DOT compliance, proper labeling, and emergency response equipment. Driver must have hazmat certification.",
  "currentStep": 2
}
```

---

### Step 3: Documents (Optional)

**Purpose:** Upload supporting documents such as specifications, drawings, compliance documents.

**API Call:** `POST /api/v1/industry/requirements/draft/:draftId/documents`

**Content-Type:** `multipart/form-data`

**Allowed Document Types:**
- `specification` - Technical specifications
- `drawing` - Technical drawings (CAD, DWG, etc.)
- `reference` - Reference materials
- `compliance` - Compliance documents
- `other` - Other supporting files

**File Constraints:**
- Max file size: 10MB per file
- Max files: 5 per requirement
- Supported formats: PDF, DOC, DOCX, XLS, XLSX, DWG, PNG, JPG

**JavaScript Example:**
```javascript
const formData = new FormData();
formData.append('files', file1); // valve-specifications.pdf
formData.append('files', file2); // technical-drawings.dwg
formData.append('documentTypes', 'specification');
formData.append('documentTypes', 'drawing');

fetch('/api/v1/industry/requirements/draft/draft-REQ-20240116-001/documents', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer token...'
  },
  body: formData
});
```

---

### Step 4: Approval Workflow

**Purpose:** Configure the approval process based on budget thresholds.

**Conditional Logic:**
- Budget < $5,000: No approval required
- Budget $5,000 - $25,000: Department Head approval
- Budget $25,000 - $100,000: Department Head + Finance Manager
- Budget > $100,000: Department Head + Finance + CFO

**Emergency Publish:**
- Requires special permission
- Bypasses approval workflow
- Requires justification
- Post-approval review required within 24 hours

**API Call:** `POST /api/v1/industry/requirements/draft/:draftId/approval-workflow`

**Request Payload:**
```json
{
  "approvalWorkflowId": "workflow-standard-high",
  "isUrgent": false,
  "approvalDeadline": "2024-01-20T23:59:59Z",
  "emergencyPublish": false
}
```

**Emergency Publish Request:**
```json
{
  "approvalWorkflowId": "workflow-bypass",
  "isUrgent": true,
  "emergencyPublish": true,
  "emergencyJustification": "Production line stopped. Critical replacement part needed immediately to avoid $100K/day loss."
}
```

---

### Step 5: Preview

**Purpose:** Display all entered information for final review.

**UI Display:** Read-only preview of:
- Basic Information
- Category-Specific Details
- Uploaded Documents
- Approval Workflow Configuration

**No API Call:** This step is UI-only. Users can navigate back to any previous step to make changes.

---

### Step 6: Publish

**Purpose:** Set submission deadline, evaluation criteria, and finalize publication.

**Fields Required:**

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| submissionDeadline | Date | Yes | Minimum 3 days from now |
| evaluationCriteria | string[] | Yes | At least 1 required |
| visibility | enum | Yes | "all" or "selected" |
| selectedVendors | string[] | Conditional | Required if visibility = "selected" |
| notifyByEmail | boolean | No | Default: true |
| notifyByApp | boolean | No | Default: true |
| termsAccepted | boolean | Yes | Must be true |

**Common Evaluation Criteria:**
- Price
- Quality
- Delivery Time
- Warranty
- Technical Capabilities
- Past Performance
- Certifications
- References

**API Call:** `POST /api/v1/industry/requirements/publish`

**Request Payload:**
```json
{
  "draftId": "draft-REQ-20240116-001",
  "submissionDeadline": "2024-02-15T23:59:59Z",
  "evaluationCriteria": ["Price", "Quality", "Delivery Time", "Warranty"],
  "visibility": "all",
  "notifyByEmail": true,
  "notifyByApp": true,
  "termsAccepted": true
}
```

---

## Business Rules & Logic

### Budget Approval Thresholds

| Budget Range | Approval Levels | Approvers | Typical Timeline |
|--------------|-----------------|-----------|------------------|
| < $5,000 | None | - | Immediate |
| $5,000 - $25,000 | Level 1 | Department Head | 1-3 days |
| $25,000 - $100,000 | Level 1-2 | Dept Head + Finance Manager | 3-5 days |
| > $100,000 | Level 1-3 | Dept Head + Finance + CFO | 5-7 days |

### Priority-Based Deadlines

| Priority | Approval Deadline | Submission Deadline (Min) | Urgency Level |
|----------|-------------------|---------------------------|---------------|
| Critical | 1 day per level | 3 days | High |
| High | 2 days per level | 5 days | Medium |
| Medium | 3 days per level | 7 days | Normal |
| Low | 5 days per level | 14 days | Low |

### Document Requirements by Category

| Category | Required Documents | Optional Documents |
|----------|-------------------|-------------------|
| Expert | Scope of Work | Certifications, References |
| Product | Specifications | Drawings, Compliance Docs, Quality Standards |
| Service | Scope of Work, SLA | Performance History, References |
| Logistics | Route Details, Permits | Safety Certifications, Insurance |

### Validation Rules by Step

**Step 1 - Basic Information:**
- Title: 5-200 characters, alphanumeric + special chars
- Category: Must select one of the four options
- Priority: Must select one of the four levels
- Business Justification: 20-1000 characters
- Department: Required, min 2 chars
- Cost Center: Required, format XXX-NNN (3 letters, dash, 3 digits)
- Estimated Budget: Must be > 0, numeric
- Budget Approved: Boolean selection required

**Step 2 - Details:**
- **Expert:** Specialization (required) + Description (min 50 chars)
- **Product:** Specifications (min 50 chars) + Quantity (> 0)
- **Service:** Description (min 50 chars) + Scope (min 100 chars) + Metrics (min 20 chars) + Location (required)
- **Logistics:** Equipment Type + Pickup Location + Delivery Location (all required, min 10 chars)

**Step 3 - Documents:**
- Optional step
- Max 5 files total
- Each file max 10MB
- Allowed types: PDF, DOC, DOCX, XLS, XLSX, DWG, PNG, JPG
- Document type must be specified for each file

**Step 4 - Approval:**
- Workflow required if budget > $5,000
- Emergency publish requires justification (min 50 chars)
- Approval deadline must be >= today

**Step 6 - Publish:**
- Submission deadline: Minimum 3 days from today
- Evaluation criteria: At least 1 required
- Terms acceptance: Required (must be true)

### Draft Expiration Rules

- Drafts expire after **7 days** of inactivity
- Expired drafts are automatically deleted
- Users receive email notifications 1 day before expiration
- Expired drafts cannot be recovered

### Emergency Publish Conditions

**Who Can Use:**
- Users with "Emergency Publish" permission
- Typically: Senior managers, executives, procurement directors

**When Allowed:**
- Critical production issues
- Safety emergencies
- Regulatory deadlines
- Business-critical situations

**Required Information:**
- Detailed justification (min 50 characters)
- Expected impact assessment
- Risk analysis

**Post-Approval Review:**
- Required within 24 hours
- Reviewed by original approval chain
- Can result in requirement cancellation if not approved

---

## Workflow Diagrams

### Complete 6-Step Workflow

```mermaid
graph TD
    Start([User Starts Create Requirement]) --> CheckDraft{Resume<br/>Existing Draft?}
    
    CheckDraft -->|Yes| LoadDraft[Load Draft Data]
    CheckDraft -->|No| CreateDraft[Create New Draft]
    
    LoadDraft --> Step1
    CreateDraft --> Step1
    
    Step1[Step 1: Basic Information<br/>- Title<br/>- Category<br/>- Priority<br/>- Business Justification<br/>- Budget] --> ValidateStep1{Validate<br/>Step 1}
    
    ValidateStep1 -->|Invalid| ShowErrors1[Show Validation Errors]
    ShowErrors1 --> Step1
    ValidateStep1 -->|Valid| SaveDraft1[Auto-Save Draft]
    
    SaveDraft1 --> Step2[Step 2: Details<br/>Category-Specific Fields]
    
    Step2 --> CheckCategory{Category<br/>Type?}
    
    CheckCategory -->|Expert| ExpertFields[Specialization<br/>Certifications<br/>Duration]
    CheckCategory -->|Product| ProductFields[Specifications<br/>Quantity<br/>Standards]
    CheckCategory -->|Service| ServiceFields[Scope of Work<br/>Performance Metrics<br/>Location]
    CheckCategory -->|Logistics| LogisticsFields[Equipment Type<br/>Pickup/Delivery<br/>Special Handling]
    
    ExpertFields --> ValidateStep2{Validate<br/>Step 2}
    ProductFields --> ValidateStep2
    ServiceFields --> ValidateStep2
    LogisticsFields --> ValidateStep2
    
    ValidateStep2 -->|Invalid| ShowErrors2[Show Validation Errors]
    ShowErrors2 --> Step2
    ValidateStep2 -->|Valid| SaveDraft2[Auto-Save Draft]
    
    SaveDraft2 --> Step3[Step 3: Documents<br/>Upload Files Optional]
    
    Step3 --> CheckUpload{Upload<br/>Documents?}
    CheckUpload -->|Yes| UploadDocs[Upload Documents<br/>Max 5 files, 10MB each]
    CheckUpload -->|No| Step4
    UploadDocs --> ValidateFiles{Files<br/>Valid?}
    ValidateFiles -->|Invalid| FileError[Show File Errors]
    FileError --> Step3
    ValidateFiles -->|Valid| SaveDraft3[Save Documents]
    SaveDraft3 --> Step4
    
    Step4[Step 4: Approval Workflow<br/>Configure Approvals] --> CheckBudget{Budget ><br/>Threshold?}
    
    CheckBudget -->|Yes| RequireApproval[Approval Required<br/>Select Workflow]
    CheckBudget -->|No| NoApproval[No Approval Required]
    
    RequireApproval --> CheckEmergency{Emergency<br/>Publish?}
    CheckEmergency -->|Yes| EmergencyBypass[Bypass Approval<br/>Post-Review Required]
    CheckEmergency -->|No| ConfigureApproval[Configure Approval<br/>Workflow]
    
    NoApproval --> SaveDraft4[Save Configuration]
    EmergencyBypass --> SaveDraft4
    ConfigureApproval --> SaveDraft4
    
    SaveDraft4 --> Step5[Step 5: Preview<br/>Review All Information]
    
    Step5 --> UserReview{Review<br/>Complete?}
    UserReview -->|Need Changes| GoBack[Navigate to Previous Step]
    GoBack --> Step1
    UserReview -->|Approved| Step6
    
    Step6[Step 6: Publish<br/>Set Deadline & Criteria] --> ValidateStep6{Validate<br/>Step 6}
    
    ValidateStep6 -->|Invalid| ShowErrors6[Show Validation Errors]
    ShowErrors6 --> Step6
    ValidateStep6 -->|Valid| CheckTerms{Terms<br/>Accepted?}
    
    CheckTerms -->|No| ShowTermsError[Must Accept Terms]
    ShowTermsError --> Step6
    CheckTerms -->|Yes| CheckApprovalStatus{Approval<br/>Required?}
    
    CheckApprovalStatus -->|No| PublishImmediate[Publish Immediately<br/>Notify Vendors]
    CheckApprovalStatus -->|Yes| SubmitApproval[Submit for Approval<br/>Notify Approvers]
    
    PublishImmediate --> Published([Requirement Published])
    SubmitApproval --> PendingApproval([Pending Approval])
    
    PendingApproval --> ApprovalProcess[Approval Process]
    ApprovalProcess --> CheckApprovalResult{Approval<br/>Result}
    CheckApprovalResult -->|Approved| PublishAfterApproval[Publish Requirement<br/>Notify Vendors]
    CheckApprovalResult -->|Rejected| Rejected([Requirement Rejected])
    
    PublishAfterApproval --> Published
    
    Published --> MonitorResponses[Monitor Vendor Responses]
    Rejected --> NotifyRequester[Notify Requester]
    
    style Start fill:#e1f5e1
    style Published fill:#e1f5e1
    style PendingApproval fill:#fff4e1
    style Rejected fill:#ffe1e1
```

### Auto-Save Draft Mechanism

```mermaid
sequenceDiagram
    participant User
    participant UI as React Component
    participant Context as RequirementContext
    participant API as Backend API
    participant DB as Database
    
    User->>UI: Fill Form Fields
    UI->>Context: updateFormData(data)
    Context->>Context: Update Local State
    
    User->>UI: Click "Next" Button
    UI->>Context: validateStep(stepNumber)
    Context->>Context: Run Validation Logic
    
    alt Validation Passes
        Context->>UI: Return Valid
        UI->>Context: saveAsDraft()
        Context->>API: PATCH /draft/:id
        API->>DB: Update Draft Record
        DB-->>API: Success
        API-->>Context: Draft Saved
        Context->>Context: Update lastSaved timestamp
        UI->>UI: Navigate to Next Step
        UI->>User: Show Success Toast
    else Validation Fails
        Context->>UI: Return Errors
        UI->>User: Show Validation Errors
        User->>UI: Fix Errors
        UI->>Context: updateFormData(correctedData)
    end
```

### Approval Workflow Decision Tree

```mermaid
graph TD
    Start([Requirement Submitted]) --> CheckBudget{Budget Amount}
    
    CheckBudget -->|< $5,000| NoApproval[No Approval Required]
    CheckBudget -->|$5,000 - $25,000| Level1[Level 1 Approval<br/>Department Head]
    CheckBudget -->|$25,000 - $100,000| Level2[Level 1 & 2 Approval<br/>Dept Head + Finance Manager]
    CheckBudget -->|> $100,000| Level3[Level 1, 2 & 3 Approval<br/>Dept Head + Finance + CFO]
    
    NoApproval --> PublishDirect[Publish Immediately]
    
    Level1 --> CheckPriority1{Priority}
    CheckPriority1 -->|Critical| Urgent1[Deadline: 1 Day]
    CheckPriority1 -->|High| Normal1[Deadline: 2 Days]
    CheckPriority1 -->|Medium/Low| Standard1[Deadline: 3 Days]
    
    Urgent1 --> ApproverNotify1[Notify Department Head]
    Normal1 --> ApproverNotify1
    Standard1 --> ApproverNotify1
    
    Level2 --> CheckPriority2{Priority}
    CheckPriority2 -->|Critical| Urgent2[L1: 1 Day<br/>L2: 2 Days]
    CheckPriority2 -->|High| Normal2[L1: 2 Days<br/>L2: 4 Days]
    CheckPriority2 -->|Medium/Low| Standard2[L1: 3 Days<br/>L2: 5 Days]
    
    Urgent2 --> ApproverNotify2[Notify Both Approvers]
    Normal2 --> ApproverNotify2
    Standard2 --> ApproverNotify2
    
    Level3 --> CheckPriority3{Priority}
    CheckPriority3 -->|Critical| Urgent3[L1: 1 Day<br/>L2: 2 Days<br/>L3: 3 Days]
    CheckPriority3 -->|High| Normal3[L1: 2 Days<br/>L2: 4 Days<br/>L3: 6 Days]
    CheckPriority3 -->|Medium/Low| Standard3[L1: 3 Days<br/>L2: 5 Days<br/>L3: 7 Days]
    
    Urgent3 --> ApproverNotify3[Notify All Approvers]
    Normal3 --> ApproverNotify3
    Standard3 --> ApproverNotify3
    
    ApproverNotify1 --> WaitApproval1[Wait for Approval]
    ApproverNotify2 --> WaitApproval2[Wait for Sequential Approval]
    ApproverNotify3 --> WaitApproval3[Wait for Sequential Approval]
    
    WaitApproval1 --> CheckResult1{Decision}
    WaitApproval2 --> CheckResult2{All Approved?}
    WaitApproval3 --> CheckResult3{All Approved?}
    
    CheckResult1 -->|Approved| PublishApproved[Publish Requirement]
    CheckResult1 -->|Rejected| RejectReq[Reject Requirement]
    
    CheckResult2 -->|Yes| PublishApproved
    CheckResult2 -->|Any Rejected| RejectReq
    
    CheckResult3 -->|Yes| PublishApproved
    CheckResult3 -->|Any Rejected| RejectReq
    
    PublishDirect --> End([Requirement Published])
    PublishApproved --> End
    RejectReq --> Rejected([Requirement Rejected])
    
    style End fill:#e1f5e1
    style Rejected fill:#ffe1e1
```

### Document Upload Flow

```mermaid
sequenceDiagram
    participant User
    participant UI as Upload Component
    participant Validation as File Validator
    participant API as Backend API
    participant Storage as Cloud Storage
    participant DB as Database
    
    User->>UI: Select Files
    UI->>Validation: Validate Files
    
    alt File Size > 10MB
        Validation->>UI: File Too Large Error
        UI->>User: Show Error Message
    else Invalid File Type
        Validation->>UI: Invalid Type Error
        UI->>User: Show Error Message
    else Too Many Files
        Validation->>UI: Max 5 Files Error
        UI->>User: Show Error Message
    else All Valid
        Validation->>UI: Validation Passed
        UI->>User: Show Upload Progress
        
        loop For Each File
            UI->>API: Upload File (multipart/form-data)
            API->>Storage: Store File
            Storage-->>API: File URL
            API->>DB: Save File Metadata
            DB-->>API: Document Record
            API-->>UI: Document Info
            UI->>User: Update Progress
        end
        
        UI->>User: Upload Complete
    end
```

### State Transitions

```mermaid
stateDiagram-v2
    [*] --> Draft: Create New
    [*] --> Draft: Resume Existing
    
    Draft --> Draft: Auto-Save
    Draft --> Validating: Submit Step
    
    Validating --> Draft: Validation Failed
    Validating --> Draft: Step Completed
    
    Draft --> Submitting: Publish Clicked
    
    Submitting --> PendingApproval: Approval Required
    Submitting --> Published: No Approval Required
    Submitting --> Draft: Submission Failed
    
    PendingApproval --> UnderReview: Approver Reviewing
    
    UnderReview --> PendingApproval: Waiting Next Level
    UnderReview --> Approved: All Approved
    UnderReview --> Rejected: Any Rejection
    
    Approved --> Published: Auto-Publish
    
    Published --> Active: Receiving Responses
    Published --> Closed: Deadline Passed
    
    Active --> UnderEvaluation: Evaluation Started
    UnderEvaluation --> Awarded: Winner Selected
    UnderEvaluation --> Cancelled: Cancelled
    
    Rejected --> Draft: Revise & Resubmit
    Rejected --> Cancelled: Abandon
    
    Awarded --> [*]
    Closed --> [*]
    Cancelled --> [*]
```

### Notification Flow

```mermaid
sequenceDiagram
    participant Req as Requirement
    participant System as System
    participant Email as Email Service
    participant Push as Push Notification
    participant DB as Database
    participant Vendors as Vendors/Approvers
    
    Req->>System: Status Change Event
    System->>DB: Fetch Recipients
    
    alt Approval Required
        DB-->>System: Approvers List
        System->>Email: Send Approval Request
        System->>Push: Send App Notification
        Email->>Vendors: Email Notification
        Push->>Vendors: Push Notification
    else Published
        DB-->>System: Vendors List (by category)
        System->>System: Filter by Visibility
        System->>Email: Send New Requirement Alert
        System->>Push: Send App Notification
        Email->>Vendors: Email with Details
        Push->>Vendors: Push with Quick View
    else Approved
        DB-->>System: Requester Info
        System->>Email: Send Approval Confirmation
        System->>Push: Send App Notification
        Email->>Vendors: Approval Status
        Push->>Vendors: Requirement Approved
    else Rejected
        DB-->>System: Requester Info
        System->>Email: Send Rejection Notice
        System->>Push: Send App Notification
        Email->>Vendors: Rejection with Reason
        Push->>Vendors: Requirement Rejected
    end
    
    System->>DB: Log Notifications
```

---

## Error Handling

### Standard Error Response Format

All error responses follow this structure:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {},
    "timestamp": "2024-01-16T10:45:00Z"
  }
}
```

### HTTP Status Codes

| Status Code | Meaning | When Used |
|-------------|---------|-----------|
| 200 | OK | Successful operation |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Validation errors, invalid input |
| 401 | Unauthorized | Missing or invalid authentication token |
| 403 | Forbidden | User lacks permission for operation |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Concurrent edit conflict, resource state conflict |
| 410 | Gone | Resource permanently deleted or expired |
| 413 | Payload Too Large | File size exceeds limit |
| 422 | Unprocessable Entity | Business logic validation failed |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server-side error |
| 503 | Service Unavailable | Temporary service disruption |

### Error Codes Reference

| Error Code | HTTP Status | Description |
|------------|-------------|-------------|
| `VALIDATION_ERROR` | 400 | Input validation failed |
| `REQUIRED_FIELD` | 400 | Required field missing |
| `INVALID_VALUE` | 400 | Field value invalid |
| `MIN_LENGTH` | 400 | Value below minimum length |
| `MAX_LENGTH` | 400 | Value exceeds maximum length |
| `INVALID_FORMAT` | 400 | Value format incorrect |
| `CHUNK_MISSING` | 400 | Required upload chunk missing |
| `UNAUTHORIZED` | 401 | Authentication required |
| `TOKEN_EXPIRED` | 401 | JWT token expired |
| `WEBSOCKET_AUTH_FAILED` | 401 | WebSocket authentication failed |
| `FORBIDDEN` | 403 | Permission denied |
| `ESCALATION_NOT_ALLOWED` | 403 | Escalation permission denied |
| `DRAFT_NOT_FOUND` | 404 | Draft ID not found |
| `APPROVAL_ALREADY_DELEGATED` | 409 | Approval already delegated to another user |
| `CONCURRENT_EDIT_CONFLICT` | 409 | Draft modified by another user or session |
| `DRAFT_EXPIRED` | 410 | Draft expired after 7 days of inactivity |
| `UPLOAD_SESSION_EXPIRED` | 410 | Upload session expired (24 hour limit) |
| `FILE_TOO_LARGE` | 413 | File exceeds 20MB limit |
| `TOO_MANY_FILES` | 413 | More than 5 files uploaded |
| `UNSUPPORTED_FILE_TYPE` | 422 | File type not allowed |
| `BUDGET_THRESHOLD_EXCEEDED` | 422 | Approval required for budget |
| `INVALID_APPROVAL_WORKFLOW` | 422 | Workflow configuration invalid |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |

### Common Error Scenarios

#### Validation Error (400)
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed for one or more fields",
    "details": {
      "errors": [
        {
          "field": "title",
          "message": "Title must be at least 5 characters",
          "code": "MIN_LENGTH"
        },
        {
          "field": "estimatedBudget",
          "message": "Budget must be greater than 0",
          "code": "INVALID_VALUE"
        }
      ]
    },
    "timestamp": "2024-01-16T10:45:00Z"
  }
}
```

#### Unauthorized Error (401)
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authentication token is missing or invalid",
    "timestamp": "2024-01-16T10:45:00Z"
  }
}
```

#### File Too Large Error (413)
```json
{
  "success": false,
  "error": {
    "code": "FILE_TOO_LARGE",
    "message": "File 'technical-manual.pdf' exceeds maximum size of 10MB",
    "details": {
      "fileName": "technical-manual.pdf",
      "fileSize": 12582912,
      "maxSize": 10485760
    },
    "timestamp": "2024-01-16T10:45:00Z"
  }
}
```

#### Rate Limit Error (429)
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Please try again later.",
    "details": {
      "limit": 100,
      "window": "60 seconds",
      "retryAfter": 45
    },
    "timestamp": "2024-01-16T10:45:00Z"
  }
}
```

### Error Handling Strategy

```mermaid
graph TD
    Error([Error Occurs]) --> CheckType{Error Type}
    
    CheckType -->|Validation| ValidationError[Validation Error]
    CheckType -->|Network| NetworkError[Network Error]
    CheckType -->|File Upload| FileError[File Upload Error]
    CheckType -->|Server| ServerError[Server Error]
    CheckType -->|Auth| AuthError[Auth Error]
    
    ValidationError --> ShowInline[Show Inline Error<br/>on Field]
    ShowInline --> UserFixes[User Corrects Input]
    UserFixes --> Retry[Retry Operation]
    
    NetworkError --> ShowToast[Show Toast Notification]
    ShowToast --> CheckAutoRetry{Auto Retry?}
    CheckAutoRetry -->|Yes| RetryAuto[Retry 3 Times]
    CheckAutoRetry -->|No| ManualRetry[Show Retry Button]
    RetryAuto --> CheckSuccess{Success?}
    CheckSuccess -->|Yes| Success([Operation Complete])
    CheckSuccess -->|No| ManualRetry
    ManualRetry --> Retry
    
    FileError --> ShowFileError[Show File-Specific Error]
    ShowFileError --> UserSelectsNew[User Selects New File]
    UserSelectsNew --> Retry
    
    ServerError --> LogError[Log to Error Service]
    LogError --> ShowGenericError[Show Generic Error]
    ShowGenericError --> OfferSupport[Offer Contact Support]
    
    AuthError --> RedirectLogin[Redirect to Login]
    
    Retry --> Success
    
    style Success fill:#e1f5e1
```

---

## Notification System

### Notification Types

| Event | Recipient | Channels | Priority |
|-------|-----------|----------|----------|
| Draft Created | Requester | App | Low |
| Draft Auto-Saved | None | Silent | N/A |
| Approval Required | Approvers | Email + App | High |
| Approval Approved | Requester | Email + App | Medium |
| Approval Rejected | Requester | Email + App | High |
| Requirement Published | Vendors (by category) | Email + App | High |
| Proposal Submitted | Requester | Email + App | Medium |
| Deadline Approaching | Requester + Vendors | Email + App | High |
| Draft Expiring Soon | Requester | Email | Low |

### Notification Triggers

**Approval Required:**
- Triggered when requirement is submitted with approval workflow
- Sent to all approvers at current level
- Contains requirement summary, budget, and approval deadline
- Includes direct link to approval page

**Published:**
- Triggered when requirement is published (immediately or after approval)
- Sent to all vendors in the selected category
- Filtered by visibility setting ("all" or "selected")
- Contains requirement summary and submission deadline
- Includes direct link to requirement details

**Approved:**
- Triggered when all approvals are complete
- Sent to original requester
- Contains approval details and publish date
- Includes link to published requirement

**Rejected:**
- Triggered when any approver rejects
- Sent to original requester
- Contains rejection reason and feedback
- Includes link to edit draft

### Notification Payload Examples

**Approval Request Email:**
```
Subject: [Action Required] Approval Request for "Industrial Valves Procurement"

Hi Michael,

A new procurement requirement requires your approval:

Title: Industrial Valves Procurement
Category: Product
Priority: High
Estimated Budget: $25,000
Requested By: John Smith
Department: Manufacturing

Business Justification:
Required for manufacturing line upgrade to meet Q1 production targets.

Approval Deadline: January 18, 2024, 11:59 PM

[Approve] [Reject] [View Details]

This is Level 1 of 2 approvals. After your approval, it will proceed to Sarah Johnson (Finance Manager).

---
Procurement Platform
```

**Requirement Published Email:**
```
Subject: New Requirement: Industrial Valves Procurement

Hi [Vendor Name],

A new requirement matching your category has been published:

Title: Industrial Valves Procurement
Category: Product
Budget: $25,000
Submission Deadline: February 15, 2024, 11:59 PM

Requirements Summary:
High-pressure industrial valves, 316 stainless steel construction...

Evaluation Criteria:
✓ Price
✓ Quality
✓ Delivery Time
✓ Warranty

[View Full Details] [Submit Proposal]

Don't miss this opportunity!

---
Procurement Platform
```

---

## Testing & Integration

### cURL Examples

#### Create Draft
```bash
curl -X POST "https://api.example.com/api/v1/industry/requirements/draft" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "category": "product",
    "title": "Test Requirement"
  }'
```

#### Update Draft (Step 1)
```bash
curl -X PATCH "https://api.example.com/api/v1/industry/requirements/draft/DRAFT_ID" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Industrial Valves Procurement",
    "category": "product",
    "priority": "high",
    "businessJustification": "Required for manufacturing upgrade",
    "department": "Manufacturing",
    "costCenter": "MFG-001",
    "requestedBy": "John Smith",
    "estimatedBudget": 25000,
    "budgetApproved": true,
    "currentStep": 1
  }'
```

#### Validate Step
```bash
curl -X POST "https://api.example.com/api/v1/industry/requirements/draft/DRAFT_ID/validate" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "step": 1,
    "data": {
      "title": "Industrial Valves",
      "category": "product"
    }
  }'
```

#### Upload Documents
```bash
curl -X POST "https://api.example.com/api/v1/industry/requirements/draft/DRAFT_ID/documents" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "files=@specifications.pdf" \
  -F "files=@drawings.dwg" \
  -F "documentType=specification" \
  -F "documentType=drawing"
```

#### Configure Approval
```bash
curl -X POST "https://api.example.com/api/v1/industry/requirements/draft/DRAFT_ID/approval-workflow" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "approvalWorkflowId": "workflow-standard-high",
    "isUrgent": false,
    "approvalDeadline": "2024-01-20T23:59:59Z"
  }'
```

#### Publish Requirement
```bash
curl -X POST "https://api.example.com/api/v1/industry/requirements/publish" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "draftId": "DRAFT_ID",
    "submissionDeadline": "2024-02-15T23:59:59Z",
    "evaluationCriteria": ["Price", "Quality", "Delivery Time"],
    "visibility": "all",
    "notifyByEmail": true,
    "notifyByApp": true,
    "termsAccepted": true
  }'
```

### Test Scenarios

#### Happy Path - Complete Workflow
1. Create new draft → Verify draft ID returned
2. Update with Step 1 data → Verify validation passes
3. Update with Step 2 data → Verify category-specific fields saved
4. Upload 2 documents → Verify files stored
5. Configure approval (budget > $25K) → Verify 2-level approval assigned
6. Publish requirement → Verify status = "pending_approval"

#### Error Scenarios
1. **Missing required fields** → Expect 400 with validation errors
2. **Invalid budget (negative)** → Expect 400 with INVALID_VALUE
3. **File too large (15MB)** → Expect 413 with FILE_TOO_LARGE
4. **Too many files (6 files)** → Expect 413 with TOO_MANY_FILES
5. **Invalid file type (.exe)** → Expect 422 with UNSUPPORTED_FILE_TYPE
6. **Emergency publish without permission** → Expect 403 with FORBIDDEN

#### Edge Cases
1. **Draft expiration** → Create draft, wait 7 days, verify deletion
2. **Concurrent updates** → Two users update same draft simultaneously
3. **Network interruption during upload** → Resume upload mechanism
4. **Approval deadline passed** → Auto-escalate to next level

### Postman Collection

A complete Postman collection with all endpoints and test scenarios is available at:
`docs/postman/create-requirement-api-collection.json`

### Integration Checklist

- [ ] Authentication system integrated
- [ ] Draft management endpoints implemented
- [ ] Validation logic for all 6 steps
- [ ] File upload to cloud storage configured
- [ ] Approval workflow engine integrated
- [ ] Email notification service connected
- [ ] Push notification service connected
- [ ] Rate limiting configured (100 req/min)
- [ ] Error logging and monitoring
- [ ] Database migrations complete
- [ ] RLS policies configured (if using Supabase)
- [ ] API documentation published
- [ ] Frontend integration complete
- [ ] End-to-end testing passed
- [ ] Performance testing passed
- [ ] Security audit completed

---

## Appendix

### A. WebSocket Real-time Updates

The API supports real-time updates for draft synchronization and approval status changes via WebSocket connections.

**Connection Endpoint:**
```
wss://your-api-domain.com/ws/drafts/:draftId?token=<JWT_TOKEN>
```

**Connection Example:**
```javascript
const ws = new WebSocket('wss://api.example.com/ws/drafts/draft-REQ-001?token=YOUR_JWT');

ws.onopen = () => {
  // Subscribe to events
  ws.send(JSON.stringify({
    action: 'subscribe',
    events: ['draft.updated', 'approval.statusChanged', 'document.uploaded']
  }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Received event:', data);
};
```

**Event Types:**

1. **draft.updated** - Draft data changed by another user/session
```json
{
  "event": "draft.updated",
  "draftId": "draft-REQ-123",
  "updatedBy": "user-456",
  "updatedFields": ["title", "estimatedBudget"],
  "timestamp": "2024-01-16T10:45:00Z",
  "data": {
    "title": "Updated Valves Procurement",
    "estimatedBudget": 30000
  }
}
```

2. **approval.statusChanged** - Approval status updated
```json
{
  "event": "approval.statusChanged",
  "approvalId": "approval-001",
  "status": "approved",
  "approvedBy": "user-789",
  "level": 1,
  "timestamp": "2024-01-16T11:00:00Z"
}
```

3. **draft.conflict** - Concurrent edit detected
```json
{
  "event": "draft.conflict",
  "draftId": "draft-REQ-123",
  "conflicts": [
    {
      "field": "title",
      "serverValue": "Updated Title",
      "yourValue": "My Title"
    }
  ],
  "lastModifiedBy": "user-456",
  "timestamp": "2024-01-16T10:46:00Z"
}
```

**Heartbeat & Reconnection:**
- Server sends heartbeat every 30 seconds
- Client should respond with pong
- Auto-reconnect on connection loss with exponential backoff
- Max reconnection attempts: 5

---

### B. Chunked Upload Implementation Guide

For files larger than 5MB, use chunked upload to improve reliability and enable resume capability.

**Complete Flow:**

```typescript
// 1. Initialize upload session
const initResponse = await fetch('/draft/:id/documents/init', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    fileName: 'large-file.dwg',
    fileSize: 15728640,
    mimeType: 'application/acad',
    documentType: 'drawing'
  })
});

const { sessionId, chunkSize, totalChunks } = await initResponse.json();

// 2. Split file into chunks (5MB each)
const chunks = splitFileIntoChunks(file, chunkSize);

// 3. Upload each chunk
for (let i = 0; i < chunks.length; i++) {
  const start = i * chunkSize;
  const end = Math.min(start + chunkSize, file.size);
  
  await fetch('/draft/:id/documents/upload', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer TOKEN',
      'Content-Range': `bytes ${start}-${end-1}/${file.size}`,
      'X-Upload-Session-Id': sessionId
    },
    body: chunks[i]
  });
  
  // Update progress
  onProgress((i + 1) / chunks.length * 100);
}

// 4. Finalize upload
await fetch('/draft/:id/documents/finalize', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ sessionId })
});
```

**Resume Interrupted Upload:**
```typescript
// Check upload status
const statusResponse = await fetch(`/draft/:id/documents/upload-status/${sessionId}`, {
  headers: { 'Authorization': 'Bearer TOKEN' }
});

const { uploadedChunks, remainingChunks } = await statusResponse.json();

// Resume from remaining chunks
for (const chunkIndex of remainingChunks) {
  // Upload only missing chunks
  await uploadChunk(chunkIndex);
}
```

**Best Practices:**
- Chunk size: 5MB (optimal for most networks)
- Timeout per chunk: 30 seconds
- Retry failed chunks: 3 attempts with exponential backoff
- Session expiration: 24 hours
- Progress tracking: Update UI every 100ms

---

### C. Offline Support & Recovery Strategy

The system supports offline drafting with automatic sync when connection is restored.

**Offline Capabilities:**
1. **localStorage Backup** - All form data automatically saved to localStorage
2. **Offline Indicator** - UI shows offline status
3. **Queue Operations** - API calls queued for retry when online
4. **Conflict Resolution** - Merge changes when back online

**Implementation:**

```typescript
// Auto-save to localStorage
const saveToLocalStorage = (draftId: string, data: RequirementFormData) => {
  localStorage.setItem(`draft-${draftId}`, JSON.stringify(data));
  localStorage.setItem(`draft-${draftId}-timestamp`, new Date().toISOString());
};

// Detect online/offline
window.addEventListener('online', async () => {
  console.log('Connection restored');
  await syncLocalDrafts();
});

window.addEventListener('offline', () => {
  console.log('Connection lost - working offline');
  showOfflineIndicator();
});

// Sync when back online
const syncLocalDrafts = async () => {
  const draftKeys = Object.keys(localStorage).filter(k => k.startsWith('draft-'));
  
  for (const key of draftKeys) {
    const draftId = key.replace('draft-', '');
    const data = JSON.parse(localStorage.getItem(key)!);
    
    try {
      // Attempt to sync with server
      await api.patch(`/draft/${draftId}`, data);
      
      // Remove from localStorage on success
      localStorage.removeItem(key);
      
      toast.success('Draft synced successfully');
    } catch (error) {
      if (error.code === 'CONCURRENT_EDIT_CONFLICT') {
        // Show conflict resolution UI
        showConflictResolution(draftId, data, error.serverData);
      } else {
        // Keep in localStorage for retry
        console.error('Sync failed, will retry', error);
      }
    }
  }
};
```

**Conflict Resolution UI:**
- Show side-by-side diff of local vs server data
- Allow user to choose: "Keep Mine", "Use Server", or "Merge"
- Highlight conflicting fields
- Save resolution choice

**Data Retention:**
- localStorage drafts expire after 7 days
- Clear localStorage on successful publish
- Warn user before clearing old drafts

---

### D. Rate Limiting

**Policy:** 100 requests per minute per user

**Headers Returned:**
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1705401600
```

**429 Response:**
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Please try again later.",
    "details": {
      "limit": 100,
      "window": "60 seconds",
      "retryAfter": 45
    }
  }
}
```

### E. File Upload Constraints

| Constraint | Value |
|------------|-------|
| Max file size (standard upload) | 5MB per file |
| Max file size (chunked upload) | 20MB per file |
| Max files per requirement | 5 files |
| Max total batch size | 50MB |
| Allowed formats | PDF, DOC, DOCX, XLS, XLSX, DWG, PNG, JPG, JPEG |
| Total storage per user | 100MB |
| Upload timeout (standard) | 60 seconds |
| Upload timeout (per chunk) | 30 seconds |
| Chunk size | 5MB (5,242,880 bytes) |
| Upload session expiration | 24 hours |

### F. Auto-Save Strategy

**Debounce:** 2 seconds after user stops typing

**Retry Logic:**
- Max retry attempts: 3
- Retry backoff: 1s, 2s, 4s (exponential)
- Fallback: localStorage after 3 failures

**Deduplication:**
- Use `X-Debounce-Token` header (unique per save attempt)
- Server ignores duplicate tokens within 5-second window

**Behavior:**
- Non-blocking background operation
- Automatic retry on failure (max 3 attempts)
- Toast notification: "Saving...", "Saved", "Failed to save"
- Error notification on persistent failures
- localStorage backup on network failure
- Sync to server when connection restored

### G. Performance Considerations

**File Upload Optimization:**
- Chunked uploads for files > 5MB
- Parallel upload for multiple files
- Progress tracking per file
- Resume capability on network interruption

**Validation Strategy:**
- **Client-side:** Immediate feedback (format, length, required fields)
- **Server-side:** Complete validation before saving
- **Step-based:** Validate only current step
- **Final:** Full validation before publish

**Caching:**
- Draft data cached locally for 1 hour
- Vendor lists cached for 15 minutes
- Workflow configurations cached for 1 day

**Rate Limiting per Endpoint:**
- `POST /draft`: 10 requests/minute
- `PATCH /draft/:id`: 60 requests/minute (for auto-save)
- `POST /documents`: 20 requests/minute
- `POST /publish`: 5 requests/minute
- All other endpoints: 100 requests/minute

### H. Security Considerations

**Authentication:**
- JWT token with 24-hour expiration
- Refresh token mechanism
- Token revocation on logout

**Authorization:**
- Role-based access control (RBAC)
- Resource-level permissions
- Approval hierarchy enforcement

**Input Validation:**
- Sanitize all user inputs
- SQL injection prevention
- XSS attack prevention
- File type validation (magic number check)
- File content scanning for malware

**Data Protection:**
- HTTPS required for all endpoints (TLS 1.2+)
- Sensitive data encrypted at rest (AES-256)
- PII data handling compliance
- GDPR/CCPA compliance for user data
- WebSocket connections use WSS (secure WebSocket)
- File uploads scanned for malware before storage

### I. Support & Resources

**API Documentation:** `https://api.example.com/docs`

**Developer Portal:** `https://developers.example.com`

**Support Email:** api-support@example.com

**Slack Community:** `#procurement-api`

**Status Page:** `https://status.example.com`

---

**Document Version:** 1.0.0  
**Last Updated:** January 16, 2024  
**Maintained By:** Backend API Team
