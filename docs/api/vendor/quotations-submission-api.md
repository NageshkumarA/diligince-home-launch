# Vendor Quotations Submission API Documentation

## Overview
The Vendor Quotations Submission API allows vendors to submit, update, and manage their quotations in response to RFQs (Requests for Quotation).

## Base URL
```
/api/v1/vendor/quotations
```

## Authentication
All endpoints require vendor authentication via Bearer token:
```
Authorization: Bearer {vendor_access_token}
```

---

## Endpoints

### 1. Submit New Quotation

**Endpoint:** `POST /api/v1/vendor/quotations/submit`

**Description:** Submit a new quotation in response to an RFQ.

**Request Body:**

```typescript
{
  "rfqId": "rfq_xyz789",
  "quotedAmount": 115000,
  "currency": "USD",
  "deliveryTimeWeeks": 12,
  "validityDays": 30,
  "paymentTerms": "Net 30",
  "warrantyPeriod": "12 months",
  "proposalSummary": "Comprehensive mobile app development with React Native",
  "detailedDescription": "Full technical specification...",
  "termsAndConditions": "Standard terms apply...",
  "documents": [
    {
      "name": "Technical Proposal.pdf",
      "type": "proposal",
      "fileUrl": "https://storage.vendor.com/doc_123.pdf",
      "size": 2048576
    },
    {
      "name": "Pricing Breakdown.xlsx",
      "type": "pricing",
      "fileUrl": "https://storage.vendor.com/pricing_456.xlsx",
      "size": 524288
    }
  ],
  "milestones": [
    {
      "name": "Requirements Analysis",
      "duration": "2 weeks",
      "deliverables": "Requirements document, wireframes"
    },
    {
      "name": "Development Phase 1",
      "duration": "6 weeks",
      "deliverables": "Core features implementation"
    },
    {
      "name": "Testing and Deployment",
      "duration": "4 weeks",
      "deliverables": "Tested application, deployment"
    }
  ]
}
```

**Field Validations:**

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| rfqId | string | Yes | Must be valid and open RFQ |
| quotedAmount | number | Yes | Must be > 0 |
| currency | string | Yes | ISO 4217 currency code |
| deliveryTimeWeeks | number | Yes | Must be > 0 |
| validityDays | number | Yes | 15-90 days |
| paymentTerms | string | Yes | Max 200 characters |
| proposalSummary | string | Yes | 50-500 characters |
| detailedDescription | string | No | Max 5000 characters |
| documents | array | No | Max 10 documents, 10MB each |

**Response:** `201 Created`

```typescript
{
  "success": true,
  "data": {
    "id": "quo_abc123",
    "quotationNumber": "QUO-001",
    "rfqId": "rfq_xyz789",
    "rfqTitle": "Mobile App Development",
    "vendorId": "ven_def456",
    "quotedAmount": 115000,
    "currency": "USD",
    "deliveryTimeWeeks": 12,
    "submittedDate": "2024-01-29T10:30:00Z",
    "validUntil": "2024-02-28T23:59:59Z",
    "status": "pending_review",
    "documents": [
      {
        "id": "doc_123",
        "name": "Technical Proposal.pdf",
        "type": "proposal",
        "url": "https://storage.example.com/doc_123.pdf",
        "uploadedAt": "2024-01-29T10:30:00Z",
        "size": 2048576
      }
    ],
    "createdAt": "2024-01-29T10:30:00Z",
    "updatedAt": "2024-01-29T10:30:00Z"
  },
  "message": "Quotation submitted successfully"
}
```

**Error Responses:**

- `400 Bad Request` - Invalid request body or validation errors
- `404 Not Found` - RFQ not found or closed
- `409 Conflict` - Quotation already submitted for this RFQ
- `401 Unauthorized` - Missing or invalid authentication token
- `413 Payload Too Large` - Document size exceeds limit
- `500 Internal Server Error` - Server error

---

### 2. Get My Quotations

**Endpoint:** `GET /api/v1/vendor/quotations/my-quotes`

**Description:** Retrieve all quotations submitted by the authenticated vendor.

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| page | integer | No | 1 | Page number |
| pageSize | integer | No | 20 | Items per page |
| status | string | No | all | Filter by status |
| sortBy | string | No | submittedDate | Sort field |
| sortOrder | string | No | desc | Sort order (asc, desc) |
| search | string | No | - | Search in RFQ title or quotation number |

**Response:** `200 OK`

```typescript
{
  "success": true,
  "data": {
    "quotations": [
      {
        "id": "quo_abc123",
        "quotationNumber": "QUO-001",
        "rfqId": "rfq_xyz789",
        "rfqTitle": "Mobile App Development",
        "companyName": "TechCorp Industries",
        "quotedAmount": 115000,
        "currency": "USD",
        "submittedDate": "2024-01-29T10:30:00Z",
        "validUntil": "2024-02-28T23:59:59Z",
        "status": "pending_review",
        "deliveryTimeWeeks": 12,
        "responseTime": "2 days"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "pageSize": 20,
      "totalItems": 15,
      "totalPages": 1,
      "hasNextPage": false,
      "hasPreviousPage": false
    }
  }
}
```

---

### 3. Get Quotation Details

**Endpoint:** `GET /api/v1/vendor/quotations/:quotationId`

**Description:** Retrieve detailed information about a specific quotation.

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| quotationId | string | Yes | Unique quotation identifier |

**Response:** `200 OK`

```typescript
{
  "success": true,
  "data": {
    "id": "quo_abc123",
    "quotationNumber": "QUO-001",
    "rfqId": "rfq_xyz789",
    "rfqTitle": "Mobile App Development",
    "companyName": "TechCorp Industries",
    "quotedAmount": 115000,
    "currency": "USD",
    "deliveryTimeWeeks": 12,
    "validUntil": "2024-02-28T23:59:59Z",
    "paymentTerms": "Net 30",
    "warrantyPeriod": "12 months",
    "proposalSummary": "Comprehensive mobile app development",
    "detailedDescription": "Full technical specification...",
    "termsAndConditions": "Standard terms apply...",
    "status": "pending_review",
    "submittedDate": "2024-01-29T10:30:00Z",
    "documents": [
      {
        "id": "doc_123",
        "name": "Technical Proposal.pdf",
        "type": "proposal",
        "url": "https://storage.example.com/doc_123.pdf",
        "uploadedAt": "2024-01-29T10:30:00Z",
        "size": 2048576
      }
    ],
    "milestones": [
      {
        "name": "Requirements Analysis",
        "duration": "2 weeks",
        "deliverables": "Requirements document, wireframes"
      }
    ],
    "statusHistory": [
      {
        "status": "pending_review",
        "timestamp": "2024-01-29T10:30:00Z",
        "note": "Quotation submitted"
      }
    ],
    "createdAt": "2024-01-29T10:30:00Z",
    "updatedAt": "2024-01-29T10:30:00Z"
  }
}
```

**Error Responses:**

- `404 Not Found` - Quotation not found or not owned by vendor
- `401 Unauthorized` - Missing or invalid authentication token
- `500 Internal Server Error` - Server error

---

### 4. Update Quotation

**Endpoint:** `PUT /api/v1/vendor/quotations/:quotationId`

**Description:** Update an existing quotation. Only allowed if status is "pending_review" or "awaiting_clarification".

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| quotationId | string | Yes | Unique quotation identifier |

**Request Body:**

```typescript
{
  "quotedAmount": 110000,
  "deliveryTimeWeeks": 10,
  "validityDays": 45,
  "paymentTerms": "Net 45",
  "proposalSummary": "Updated proposal with faster delivery",
  "detailedDescription": "Updated technical specification...",
  "documents": [
    {
      "name": "Revised Proposal.pdf",
      "type": "proposal",
      "fileUrl": "https://storage.vendor.com/revised_123.pdf",
      "size": 2048576
    }
  ]
}
```

**Response:** `200 OK`

```typescript
{
  "success": true,
  "data": {
    "id": "quo_abc123",
    "quotationNumber": "QUO-001",
    "quotedAmount": 110000,
    "deliveryTimeWeeks": 10,
    "status": "pending_review",
    "updatedAt": "2024-01-30T14:20:00Z"
    // ... other fields
  },
  "message": "Quotation updated successfully"
}
```

**Error Responses:**

- `400 Bad Request` - Invalid request body or quotation cannot be updated (wrong status)
- `404 Not Found` - Quotation not found
- `401 Unauthorized` - Missing or invalid authentication token
- `403 Forbidden` - Quotation status does not allow updates
- `500 Internal Server Error` - Server error

---

### 5. Withdraw Quotation

**Endpoint:** `DELETE /api/v1/vendor/quotations/:quotationId`

**Description:** Withdraw a submitted quotation. Only allowed if status is "pending_review" or "under_evaluation".

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| quotationId | string | Yes | Unique quotation identifier |

**Request Body:**

```typescript
{
  "reason": "Unable to meet delivery timeline",
  "comments": "Project resource constraints"
}
```

**Response:** `200 OK`

```typescript
{
  "success": true,
  "data": {
    "id": "quo_abc123",
    "quotationNumber": "QUO-001",
    "status": "withdrawn",
    "withdrawnDate": "2024-01-30T16:00:00Z",
    "withdrawalReason": "Unable to meet delivery timeline"
  },
  "message": "Quotation withdrawn successfully"
}
```

**Error Responses:**

- `400 Bad Request` - Missing withdrawal reason
- `404 Not Found` - Quotation not found
- `401 Unauthorized` - Missing or invalid authentication token
- `403 Forbidden` - Quotation status does not allow withdrawal
- `500 Internal Server Error` - Server error

---

### 6. Respond to Clarification Request

**Endpoint:** `POST /api/v1/vendor/quotations/:quotationId/respond`

**Description:** Respond to a clarification request from the buyer.

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| quotationId | string | Yes | Unique quotation identifier |

**Request Body:**

```typescript
{
  "response": "Detailed response to clarification questions...",
  "updatedFields": {
    "deliveryTimeWeeks": 10,
    "quotedAmount": 112000
  },
  "additionalDocuments": [
    {
      "name": "Clarification Response.pdf",
      "type": "other",
      "fileUrl": "https://storage.vendor.com/clarification_789.pdf",
      "size": 1048576
    }
  ]
}
```

**Response:** `200 OK`

```typescript
{
  "success": true,
  "data": {
    "id": "quo_abc123",
    "quotationNumber": "QUO-001",
    "status": "under_evaluation",
    "lastResponseDate": "2024-01-31T10:00:00Z"
    // ... other fields
  },
  "message": "Clarification response submitted successfully"
}
```

---

## Document Upload Flow

### 1. Request Upload URL

**Endpoint:** `POST /api/v1/vendor/quotations/documents/upload-url`

**Request:**
```typescript
{
  "fileName": "Technical Proposal.pdf",
  "fileSize": 2048576,
  "contentType": "application/pdf"
}
```

**Response:**
```typescript
{
  "uploadUrl": "https://storage.example.com/upload/abc123?signature=...",
  "documentId": "doc_xyz789",
  "expiresAt": "2024-01-29T11:30:00Z"
}
```

### 2. Upload File
```javascript
await fetch(uploadUrl, {
  method: 'PUT',
  body: fileBlob,
  headers: {
    'Content-Type': contentType
  }
});
```

### 3. Include Document ID in Quotation
Use `documentId` in quotation submission.

---

## Status Flow

```
pending_review → under_evaluation → approved
                                  ↘ rejected
                ↘ awaiting_clarification → under_evaluation
                ↘ expired
                ↘ withdrawn
```

---

## Best Practices

1. **Validity Period:** Set reasonable validity (30-45 days recommended)
2. **Document Quality:** Provide detailed proposals with clear pricing breakdowns
3. **Response Time:** Respond to clarification requests within 2 business days
4. **Pricing Strategy:** Ensure competitive pricing while maintaining profitability
5. **Milestones:** Break down delivery into clear, measurable milestones
6. **Updates:** Only update quotations when necessary to avoid confusion
7. **Withdrawal:** Withdraw promptly if unable to fulfill to maintain good vendor rating
