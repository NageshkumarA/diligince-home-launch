# Create Requirement - Step-by-Step API Guide

## Overview

This document provides a detailed breakdown of each step in the Create Requirement workflow, including the fields involved, validation rules, and request/response examples for each step.

---

## Step 1: Basic Information

### Purpose
Capture fundamental information about the requirement including title, category, priority, and business context.

### Fields Required

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| title | string | Yes | Min 5 chars, Max 200 chars |
| category | enum | Yes | "product", "service", "expert", "logistics" |
| priority | enum | Yes | "low", "medium", "high", "critical" |
| businessJustification | string | Yes | Min 20 chars, Max 1000 chars |
| department | string | Yes | Min 2 chars |
| costCenter | string | Yes | Format: XXX-NNN |
| requestedBy | string | Yes | Min 2 chars |
| estimatedBudget | number | Yes | > 0 |
| budgetApproved | boolean | Yes | - |
| urgency | boolean | No | - |
| isUrgent | boolean | No | - |

### API Call

**Endpoint:** `PATCH /api/v1/industry/requirements/draft/:draftId`

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
    "isValid": true,
    "validationErrors": []
  },
  "message": "Step 1 saved successfully"
}
```

**Validation Errors Example (400 Bad Request):**

```json
{
  "success": false,
  "data": {
    "isValid": false,
    "step": 1,
    "errors": [
      {
        "field": "title",
        "message": "Title must be at least 5 characters",
        "code": "MIN_LENGTH"
      },
      {
        "field": "businessJustification",
        "message": "Business justification is required",
        "code": "REQUIRED_FIELD"
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

## Step 2: Details (Category-Specific)

### Purpose
Capture category-specific requirements. Fields vary based on the category selected in Step 1.

---

### 2A. Expert Category

**Fields Required:**

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| specialization | string | Yes | Min 3 chars |
| description | string | Yes | Min 50 chars, Max 2000 chars |
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

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "draftId": "draft-REQ-20240116-001",
    "currentStep": 2,
    "lastSaved": "2024-01-16T10:35:20Z",
    "completedSteps": [1, 2],
    "isValid": true
  },
  "message": "Expert details saved successfully"
}
```

---

### 2B. Product Category

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
  "technicalStandards": [
    "ASME B16.34",
    "API 600",
    "ISO 9001:2015"
  ],
  "productDeliveryDate": "2024-03-15T00:00:00Z",
  "qualityRequirements": "All valves must undergo pressure testing and come with material traceability certificates. Factory acceptance testing required before shipment.",
  "currentStep": 2
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "draftId": "draft-REQ-20240116-001",
    "currentStep": 2,
    "lastSaved": "2024-01-16T10:35:20Z",
    "completedSteps": [1, 2],
    "isValid": true
  },
  "message": "Product details saved successfully"
}
```

---

### 2C. Service Category

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
  "serviceDescription": "Comprehensive preventive maintenance service for all industrial equipment in our manufacturing facility. Service should include regular inspections, lubrication, alignment checks, and minor repairs.",
  "scopeOfWork": "Monthly inspections of all critical equipment, quarterly preventive maintenance activities, emergency repair services within 4 hours, maintenance reporting and documentation, spare parts management, and training for on-site maintenance staff.",
  "performanceMetrics": "Equipment uptime >95%, Response time <4 hours for emergencies, Maintenance completion rate >98%, Customer satisfaction score >4.5/5.0",
  "location": "Manufacturing Plant, 123 Industrial Drive, Houston, TX 77001",
  "serviceStartDate": "2024-02-01T00:00:00Z",
  "serviceEndDate": "2025-01-31T23:59:59Z",
  "serviceBudget": 120000,
  "currentStep": 2
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "draftId": "draft-REQ-20240116-001",
    "currentStep": 2,
    "lastSaved": "2024-01-16T10:35:20Z",
    "completedSteps": [1, 2],
    "isValid": true
  },
  "message": "Service details saved successfully"
}
```

---

### 2D. Logistics Category

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

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "draftId": "draft-REQ-20240116-001",
    "currentStep": 2,
    "lastSaved": "2024-01-16T10:35:20Z",
    "completedSteps": [1, 2],
    "isValid": true
  },
  "message": "Logistics details saved successfully"
}
```

---

## Step 3: Documents (Optional)

### Purpose
Upload supporting documents such as specifications, drawings, compliance documents, and references.

### API Call

**Endpoint:** `POST /api/v1/industry/requirements/draft/:draftId/documents`

**Content-Type:** `multipart/form-data`

**Form Fields:**

- `files`: Multiple file uploads
- `documentTypes`: Corresponding document types for each file

**Allowed Document Types:**
- `specification`
- `drawing`
- `reference`
- `compliance`
- `other`

**File Constraints:**
- Max file size: 10MB per file
- Max files: 5 per requirement
- Supported formats: PDF, DOC, DOCX, XLS, XLSX, DWG, PNG, JPG

**Request Example (using FormData):**

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
        "uploadedAt": "2024-01-16T10:40:00Z",
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
        "uploadedAt": "2024-01-16T10:40:02Z",
        "uploadedBy": "user-123"
      }
    ],
    "totalSize": 7701504,
    "uploadedCount": 2
  },
  "message": "Documents uploaded successfully"
}
```

**Error Response - File Too Large (413):**

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

## Step 4: Approval Workflow

### Purpose
Configure the approval process for the requirement.

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| approvalWorkflowId | string | Conditional | Required if budget > threshold |
| isUrgent | boolean | No | Urgent approval flag |
| approvalDeadline | Date | No | Approval deadline |
| emergencyPublish | boolean | No | Emergency bypass (requires permission) |

### API Call

**Endpoint:** `POST /api/v1/industry/requirements/draft/:draftId/approval-workflow`

**Request Payload:**

```json
{
  "approvalWorkflowId": "workflow-standard-high",
  "isUrgent": false,
  "approvalDeadline": "2024-01-20T23:59:59Z",
  "emergencyPublish": false
}
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
    "postApprovalRequired": true
  },
  "message": "Emergency publish approved. Post-approval review required."
}
```

---

## Step 5: Preview (Read-Only)

### Purpose
Display all entered information for final review. No API calls in this step.

### UI Display

The preview step displays a consolidated view of:
- Basic Information
- Category-Specific Details
- Uploaded Documents
- Approval Workflow Configuration

Users can navigate back to any previous step to make changes.

---

## Step 6: Publish

### Purpose
Finalize and publish the requirement to vendors/professionals.

### Fields Required

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| submissionDeadline | Date | Yes | >= today + 3 days |
| evaluationCriteria | string[] | Yes | Min 1 criterion |
| visibility | enum | Yes | "all" or "selected" |
| notifyByEmail | boolean | No | Default: true |
| notifyByApp | boolean | No | Default: true |
| termsAccepted | boolean | Yes | Must be true |

**Available Evaluation Criteria:**
- Price
- Quality
- Delivery Time
- Technical Capability
- Past Performance
- Warranty
- Compliance
- Innovation

### API Call

**Endpoint:** `POST /api/v1/industry/requirements/publish`

**Request Payload:**

```json
{
  "draftId": "draft-REQ-20240116-001",
  "submissionDeadline": "2024-02-15T23:59:59Z",
  "evaluationCriteria": [
    "Price",
    "Quality",
    "Delivery Time",
    "Warranty",
    "Compliance"
  ],
  "visibility": "all",
  "notifyByEmail": true,
  "notifyByApp": true,
  "termsAccepted": true
}
```

**Response - Published Immediately (201 Created):**

```json
{
  "success": true,
  "data": {
    "requirementId": "REQ-20240116-001",
    "status": "published",
    "publishedAt": "2024-01-16T11:00:00Z",
    "submissionDeadline": "2024-02-15T23:59:59Z",
    "visibility": "all",
    "evaluationCriteria": [
      "Price",
      "Quality",
      "Delivery Time",
      "Warranty",
      "Compliance"
    ],
    "notificationsInfo": {
      "emailsSent": 145,
      "appNotificationsSent": 189,
      "totalReach": 189,
      "targetAudience": "All qualified vendors in Product category"
    },
    "approvalStatus": "not_required",
    "nextActions": [
      "Monitor vendor responses",
      "Review incoming quotes",
      "Set up evaluation committee"
    ],
    "urls": {
      "requirementPage": "https://app.example.com/requirements/REQ-20240116-001",
      "responsesPage": "https://app.example.com/requirements/REQ-20240116-001/responses"
    }
  },
  "message": "Requirement published successfully"
}
```

**Response - Pending Approval (202 Accepted):**

```json
{
  "success": true,
  "data": {
    "requirementId": "REQ-20240116-001",
    "status": "pending_approval",
    "submittedAt": "2024-01-16T11:00:00Z",
    "approvalStatus": "pending",
    "currentApprovalLevel": 1,
    "totalApprovalLevels": 2,
    "pendingApprovers": [
      {
        "level": 1,
        "role": "Department Head",
        "name": "Michael Brown",
        "deadline": "2024-01-18T23:59:59Z"
      }
    ],
    "approvedBy": [],
    "estimatedPublishDate": "2024-01-20T23:59:59Z",
    "nextActions": [
      "Wait for Department Head approval",
      "Check approval status regularly",
      "Contact approver if urgent"
    ],
    "urls": {
      "approvalStatus": "https://app.example.com/requirements/REQ-20240116-001/approval-status"
    }
  },
  "message": "Requirement submitted for approval"
}
```

**Validation Error Response (400 Bad Request):**

```json
{
  "success": false,
  "data": {
    "isValid": false,
    "step": 6,
    "errors": [
      {
        "field": "submissionDeadline",
        "message": "Submission deadline must be at least 3 days from now",
        "code": "INVALID_DATE"
      },
      {
        "field": "termsAccepted",
        "message": "You must accept the terms and conditions to publish",
        "code": "TERMS_NOT_ACCEPTED"
      }
    ]
  },
  "message": "Validation failed"
}
```

---

## Complete Workflow Example

### Scenario: Create Product Requirement

```bash
# Step 1: Create Draft
curl -X POST "https://api.example.com/api/v1/industry/requirements/draft" \
  -H "Authorization: Bearer token..." \
  -H "Content-Type: application/json" \
  -d '{"category": "product"}'

# Step 2: Save Basic Info
curl -X PATCH "https://api.example.com/api/v1/industry/requirements/draft/draft-001" \
  -H "Authorization: Bearer token..." \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Industrial Valves",
    "category": "product",
    "priority": "high",
    "businessJustification": "Required for upgrade",
    "department": "Manufacturing",
    "costCenter": "MFG-001",
    "requestedBy": "John Smith",
    "estimatedBudget": 25000,
    "budgetApproved": true
  }'

# Step 3: Save Product Details
curl -X PATCH "https://api.example.com/api/v1/industry/requirements/draft/draft-001" \
  -H "Authorization: Bearer token..." \
  -H "Content-Type: application/json" \
  -d '{
    "productSpecifications": "High-pressure valves...",
    "quantity": 50,
    "technicalStandards": ["ASME B16.34"]
  }'

# Step 4: Upload Documents
curl -X POST "https://api.example.com/api/v1/industry/requirements/draft/draft-001/documents" \
  -H "Authorization: Bearer token..." \
  -F "files=@specs.pdf" \
  -F "documentTypes=specification"

# Step 5: Configure Approval
curl -X POST "https://api.example.com/api/v1/industry/requirements/draft/draft-001/approval-workflow" \
  -H "Authorization: Bearer token..." \
  -H "Content-Type: application/json" \
  -d '{
    "approvalWorkflowId": "workflow-standard-high",
    "isUrgent": false
  }'

# Step 6: Publish
curl -X POST "https://api.example.com/api/v1/industry/requirements/publish" \
  -H "Authorization: Bearer token..." \
  -H "Content-Type: application/json" \
  -d '{
    "draftId": "draft-001",
    "submissionDeadline": "2024-02-15T23:59:59Z",
    "evaluationCriteria": ["Price", "Quality"],
    "visibility": "all",
    "termsAccepted": true
  }'
```

---

## Summary

| Step | Endpoint | Method | Required |
|------|----------|--------|----------|
| 1. Basic Info | `/draft/:id` | PATCH | Yes |
| 2. Details | `/draft/:id` | PATCH | Yes |
| 3. Documents | `/draft/:id/documents` | POST | No |
| 4. Approval | `/draft/:id/approval-workflow` | POST | Conditional |
| 5. Preview | N/A | N/A | No |
| 6. Publish | `/requirements/publish` | POST | Yes |