# Quotations API Documentation

## Overview
The Quotations API provides endpoints for managing vendor quotations in the Industry Dashboard. This includes listing, viewing, approving, rejecting, and managing quotations through their lifecycle.

## Base URL
```
/api/v1/industry/quotations
```

## Authentication
All endpoints require authentication via Bearer token in the Authorization header:
```
Authorization: Bearer {access_token}
```

---

## Endpoints

### 1. List Pending Quotations

**Endpoint:** `GET /api/v1/industry/quotations/pending`

**Description:** Retrieve a paginated list of pending quotations awaiting review.

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| page | integer | No | 1 | Page number for pagination |
| pageSize | integer | No | 10 | Number of items per page (max: 100) |
| sortBy | string | No | submittedDate | Field to sort by (submittedDate, quotedAmount, validUntil, responseTime) |
| sortOrder | string | No | desc | Sort order (asc, desc) |
| search | string | No | - | Search term for quotation number, requirement title, or vendor name |
| vendorId | string | No | - | Filter by vendor ID |
| requirementId | string | No | - | Filter by requirement ID |
| minAmount | number | No | - | Minimum quoted amount |
| maxAmount | number | No | - | Maximum quoted amount |
| status | string | No | - | Filter by specific status (pending_review, under_evaluation, awaiting_clarification) |

**Response:** `200 OK`

```typescript
{
  "success": true,
  "data": {
    "quotations": [
      {
        "id": "quo_abc123",
        "quotationNumber": "QUO-001",
        "requirementId": "req_xyz789",
        "requirementTitle": "Mobile App Development",
        "vendorId": "ven_def456",
        "vendorName": "TechSolutions Inc.",
        "vendorRating": 4.5,
        "quotedAmount": 115000,
        "currency": "USD",
        "paymentTerms": "Net 30",
        "submittedDate": "2024-01-29T10:30:00Z",
        "validUntil": "2024-02-15T23:59:59Z",
        "responseTime": "2 days",
        "deliveryTimeWeeks": 12,
        "proposalSummary": "Comprehensive mobile app development with React Native",
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
      }
    ],
    "pagination": {
      "currentPage": 1,
      "pageSize": 10,
      "totalItems": 45,
      "totalPages": 5,
      "hasNextPage": true,
      "hasPreviousPage": false
    },
    "filters": {
      "applied": {
        "status": "pending_review"
      },
      "available": {
        "status": [
          { "key": "pending_review", "value": "Pending Review", "color": "#fef3c7" },
          { "key": "under_evaluation", "value": "Under Evaluation", "color": "#ddd6fe" },
          { "key": "awaiting_clarification", "value": "Awaiting Clarification", "color": "#fed7aa" }
        ],
        "vendors": [
          { "key": "ven_def456", "value": "TechSolutions Inc." }
        ]
      }
    }
  }
}
```

**Error Responses:**

- `400 Bad Request` - Invalid query parameters
- `401 Unauthorized` - Missing or invalid authentication token
- `500 Internal Server Error` - Server error

---

### 2. List Approved Quotations

**Endpoint:** `GET /api/v1/industry/quotations/approved`

**Description:** Retrieve a paginated list of approved quotations.

**Query Parameters:** Same as pending quotations endpoint.

**Response:** `200 OK` - Same structure as pending quotations, with status filter set to "approved".

---

### 3. List All Quotations

**Endpoint:** `GET /api/v1/industry/quotations/all`

**Description:** Retrieve a paginated list of all quotations regardless of status.

**Query Parameters:** Same as pending quotations endpoint, but status filter accepts all values.

**Response:** `200 OK` - Same structure as pending quotations.

---

### 4. Get Quotation Details

**Endpoint:** `GET /api/v1/industry/quotations/:quotationId`

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
    "requirementId": "req_xyz789",
    "requirementTitle": "Mobile App Development",
    "vendorId": "ven_def456",
    "vendorName": "TechSolutions Inc.",
    "vendorRating": 4.5,
    "quotedAmount": 115000,
    "currency": "USD",
    "paymentTerms": "Net 30",
    "submittedDate": "2024-01-29T10:30:00Z",
    "validUntil": "2024-02-15T23:59:59Z",
    "responseTime": "2 days",
    "deliveryTimeWeeks": 12,
    "proposalSummary": "Comprehensive mobile app development with React Native",
    "detailedDescription": "Full technical specification and implementation plan...",
    "termsAndConditions": "Standard terms and conditions apply...",
    "warrantyPeriod": "12 months",
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
    "aiEvaluation": {
      "overallScore": 85,
      "priceScore": 80,
      "deliveryScore": 90,
      "ratingScore": 90,
      "specializationScore": 85,
      "performanceScore": 82,
      "recommendation": "top_pick",
      "reasoning": "Strong technical capabilities with competitive pricing and excellent delivery timeline.",
      "riskLevel": "low"
    },
    "createdAt": "2024-01-29T10:30:00Z",
    "updatedAt": "2024-01-29T10:30:00Z"
  }
}
```

**Error Responses:**

- `404 Not Found` - Quotation not found
- `401 Unauthorized` - Missing or invalid authentication token
- `500 Internal Server Error` - Server error

---

### 5. Approve Quotation

**Endpoint:** `POST /api/v1/industry/quotations/:quotationId/approve`

**Description:** Approve a pending quotation.

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| quotationId | string | Yes | Unique quotation identifier |

**Request Body:**

```typescript
{
  "comments": "Approved based on competitive pricing and strong technical proposal"
}
```

**Response:** `200 OK`

```typescript
{
  "success": true,
  "data": {
    "id": "quo_abc123",
    "quotationNumber": "QUO-001",
    "status": "approved",
    "approvedBy": "user_xyz123",
    "approvedDate": "2024-01-30T14:20:00Z",
    // ... other quotation fields
  },
  "message": "Quotation approved successfully"
}
```

**Error Responses:**

- `400 Bad Request` - Quotation cannot be approved (already approved/rejected, expired)
- `404 Not Found` - Quotation not found
- `401 Unauthorized` - Missing or invalid authentication token
- `403 Forbidden` - User lacks permission to approve quotations
- `500 Internal Server Error` - Server error

---

### 6. Reject Quotation

**Endpoint:** `POST /api/v1/industry/quotations/:quotationId/reject`

**Description:** Reject a pending quotation.

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| quotationId | string | Yes | Unique quotation identifier |

**Request Body:**

```typescript
{
  "reason": "pricing_too_high", // Enum: pricing_too_high, timeline_unacceptable, requirements_not_met, other
  "comments": "Quoted amount exceeds budget constraints"
}
```

**Response:** `200 OK`

```typescript
{
  "success": true,
  "data": {
    "id": "quo_abc123",
    "quotationNumber": "QUO-001",
    "status": "rejected",
    "rejectedBy": "user_xyz123",
    "rejectedDate": "2024-01-30T14:20:00Z",
    "rejectionReason": "pricing_too_high",
    // ... other quotation fields
  },
  "message": "Quotation rejected successfully"
}
```

**Error Responses:**

- `400 Bad Request` - Missing required reason field or invalid status
- `404 Not Found` - Quotation not found
- `401 Unauthorized` - Missing or invalid authentication token
- `403 Forbidden` - User lacks permission to reject quotations
- `500 Internal Server Error` - Server error

---

### 7. Request Clarification

**Endpoint:** `POST /api/v1/industry/quotations/:quotationId/request-clarification`

**Description:** Request additional information or clarification from the vendor.

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| quotationId | string | Yes | Unique quotation identifier |

**Request Body:**

```typescript
{
  "message": "Please provide more details about the implementation timeline and resource allocation"
}
```

**Response:** `200 OK`

```typescript
{
  "success": true,
  "data": {
    "id": "quo_abc123",
    "quotationNumber": "QUO-001",
    "status": "awaiting_clarification",
    // ... other quotation fields
  },
  "message": "Clarification request sent to vendor"
}
```

**Error Responses:**

- `400 Bad Request` - Missing message field
- `404 Not Found` - Quotation not found
- `401 Unauthorized` - Missing or invalid authentication token
- `500 Internal Server Error` - Server error

---

### 8. Bulk Approve Quotations

**Endpoint:** `POST /api/v1/industry/quotations/bulk-approve`

**Description:** Approve multiple quotations in a single request.

**Request Body:**

```typescript
{
  "quotationIds": ["quo_abc123", "quo_def456", "quo_ghi789"],
  "comments": "Bulk approval for Q1 procurement"
}
```

**Validation:**
- Maximum 50 quotations per request
- All quotations must be in pending status

**Response:** `200 OK`

```typescript
{
  "success": true,
  "data": {
    "successCount": 2,
    "failedCount": 1,
    "results": [
      {
        "quotationId": "quo_abc123",
        "success": true,
        "quotationNumber": "QUO-001"
      },
      {
        "quotationId": "quo_def456",
        "success": true,
        "quotationNumber": "QUO-002"
      },
      {
        "quotationId": "quo_ghi789",
        "success": false,
        "quotationNumber": "QUO-003",
        "error": "Quotation has expired"
      }
    ]
  },
  "message": "Bulk approval completed: 2 succeeded, 1 failed"
}
```

**Error Responses:**

- `400 Bad Request` - Invalid request (empty array, too many quotations)
- `401 Unauthorized` - Missing or invalid authentication token
- `403 Forbidden` - User lacks permission to approve quotations
- `500 Internal Server Error` - Server error

---

### 9. Bulk Reject Quotations

**Endpoint:** `POST /api/v1/industry/quotations/bulk-reject`

**Description:** Reject multiple quotations in a single request.

**Request Body:**

```typescript
{
  "quotationIds": ["quo_abc123", "quo_def456"],
  "reason": "pricing_too_high",
  "comments": "Budget constraints for current quarter"
}
```

**Response:** `200 OK` - Same structure as bulk approve.

**Error Responses:** Same as bulk approve endpoint.

---

## Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Bad Request - Invalid parameters or request body |
| 401 | Unauthorized - Missing or invalid authentication |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource does not exist |
| 500 | Internal Server Error |

---

## Rate Limiting

- **Standard endpoints:** 100 requests per minute
- **Bulk operations:** 10 requests per minute
- **Export operations:** 5 requests per minute

---

## Best Practices

1. **Pagination:** Always use pagination for list endpoints to avoid performance issues
2. **Filtering:** Use specific filters to reduce data transfer and improve performance
3. **Bulk Operations:** Process up to 50 quotations at a time for bulk approvals/rejections
4. **Error Handling:** Implement retry logic for 5xx errors with exponential backoff
5. **Caching:** Cache quotation lists for 30 seconds to reduce server load
6. **Validation:** Validate quotation status before attempting approve/reject operations
