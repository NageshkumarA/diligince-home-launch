# Purchase Orders API Documentation

## Overview
The Purchase Orders API provides comprehensive endpoints for managing purchase orders in the Industry Dashboard. This includes creating, viewing, updating, approving, canceling, and tracking purchase orders through their complete lifecycle from creation to completion.

## Base URL
```
/api/v1/industry/purchase-orders
```

## Authentication
All endpoints require authentication via Bearer token in the Authorization header:
```
Authorization: Bearer {access_token}
```

---

## Endpoints

### 1. List Active Purchase Orders

**Endpoint:** `GET /api/v1/industry/purchase-orders/active`

**Description:** Retrieve a paginated list of currently active purchase orders (not completed or cancelled).

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| page | integer | No | 1 | Page number for pagination |
| pageSize | integer | No | 10 | Number of items per page (max: 100) |
| sortBy | string | No | createdAt | Field to sort by (createdAt, orderNumber, orderValue, startDate, endDate) |
| sortOrder | string | No | desc | Sort order (asc, desc) |
| search | string | No | - | Search term for order number, vendor name, or project title |
| vendorId | string | No | - | Filter by vendor ID |
| status | string | No | - | Filter by specific status (pending_approval, approved, in_progress) |
| minAmount | number | No | - | Minimum order value |
| maxAmount | number | No | - | Maximum order value |
| startDate | string | No | - | Filter by start date (ISO 8601) |
| endDate | string | No | - | Filter by end date (ISO 8601) |

**Response:** `200 OK`

```typescript
{
  "success": true,
  "data": {
    "purchaseOrders": [
      {
        "id": "po_abc123",
        "orderNumber": "PO-2024-001",
        "status": "in_progress",
        "vendorId": "ven_def456",
        "vendorName": "TechSolutions Inc.",
        "vendorRating": 4.5,
        "requirementId": "req_xyz789",
        "quotationId": "quo_abc123",
        "projectTitle": "Mobile App Development",
        "orderValue": 115000,
        "taxPercentage": 18,
        "taxAmount": 20700,
        "totalValue": 135700,
        "currency": "USD",
        "paymentTerms": "Net 30, 40% advance, 30% on milestone, 30% on completion",
        "startDate": "2024-02-01T00:00:00Z",
        "endDate": "2024-05-01T23:59:59Z",
        "completionPercentage": 35,
        "milestonesCompleted": 1,
        "milestonesPending": 2,
        "createdAt": "2024-01-30T10:30:00Z",
        "updatedAt": "2024-02-15T14:20:00Z",
        "approvedAt": "2024-01-31T09:00:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "pageSize": 10,
      "totalItems": 28,
      "totalPages": 3,
      "hasNextPage": true,
      "hasPreviousPage": false
    },
    "summary": {
      "totalOrders": 28,
      "totalValue": 3450000,
      "activeOrders": 28,
      "completedOrders": 0
    }
  }
}
```

**Error Responses:**

- `400 Bad Request` - Invalid query parameters
- `401 Unauthorized` - Missing or invalid authentication token
- `500 Internal Server Error` - Server error

---

### 2. List Pending Approval Purchase Orders

**Endpoint:** `GET /api/v1/industry/purchase-orders/pending`

**Description:** Retrieve purchase orders awaiting approval.

**Query Parameters:** Same as active purchase orders endpoint.

**Response:** `200 OK` - Same structure as active purchase orders, with status filter set to "pending_approval".

---

### 3. List In-Progress Purchase Orders

**Endpoint:** `GET /api/v1/industry/purchase-orders/in-progress`

**Description:** Retrieve purchase orders currently in progress.

**Query Parameters:** Same as active purchase orders endpoint.

**Response:** `200 OK` - Same structure as active purchase orders, with status filter set to "in_progress".

---

### 4. List Completed Purchase Orders

**Endpoint:** `GET /api/v1/industry/purchase-orders/completed`

**Description:** Retrieve completed purchase orders with optional filtering.

**Query Parameters:** Same as active purchase orders endpoint, plus:

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| completedFrom | string | No | - | Filter by completion date from (ISO 8601) |
| completedTo | string | No | - | Filter by completion date to (ISO 8601) |

**Response:** `200 OK` - Same structure as active purchase orders.

---

### 5. List All Purchase Orders

**Endpoint:** `GET /api/v1/industry/purchase-orders`

**Description:** Retrieve all purchase orders regardless of status with comprehensive filtering.

**Query Parameters:** Same as active purchase orders endpoint, but status filter accepts all values:
- `draft`
- `pending_approval`
- `approved`
- `in_progress`
- `completed`
- `cancelled`

**Response:** `200 OK` - Same structure as active purchase orders.

---

### 6. Get Purchase Order Details

**Endpoint:** `GET /api/v1/industry/purchase-orders/:orderId`

**Description:** Retrieve comprehensive details about a specific purchase order including all related data.

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| orderId | string | Yes | Unique purchase order identifier |

**Response:** `200 OK`

```typescript
{
  "success": true,
  "data": {
    "id": "po_abc123",
    "orderNumber": "PO-2024-001",
    "status": "in_progress",
    
    // Vendor Information
    "vendorId": "ven_def456",
    "vendorName": "TechSolutions Inc.",
    "vendorRating": 4.5,
    "vendorEmail": "contact@techsolutions.com",
    "vendorPhone": "+1-555-0123",
    "vendorAddress": "123 Tech Street, Silicon Valley, CA 94000",
    
    // Reference Data
    "requirementId": "req_xyz789",
    "quotationId": "quo_abc123",
    "projectTitle": "Mobile App Development",
    "scopeOfWork": "Develop a cross-platform mobile application using React Native...",
    "specialInstructions": "Please ensure all deliverables include comprehensive documentation.",
    
    // Financial Details
    "orderValue": 115000,
    "taxPercentage": 18,
    "taxAmount": 20700,
    "totalValue": 135700,
    "currency": "USD",
    "paymentTerms": "Net 30, 40% advance, 30% on milestone, 30% on completion",
    
    // Timeline
    "startDate": "2024-02-01T00:00:00Z",
    "endDate": "2024-05-01T23:59:59Z",
    "createdAt": "2024-01-30T10:30:00Z",
    "updatedAt": "2024-02-15T14:20:00Z",
    "approvedAt": "2024-01-31T09:00:00Z",
    "approvedBy": "user_xyz123",
    "approverName": "John Smith",
    
    // Progress Tracking
    "completionPercentage": 35,
    "milestonesCompleted": 1,
    "milestonesPending": 2,
    
    // Deliverables
    "deliverables": [
      {
        "id": "del_001",
        "title": "UI/UX Design",
        "description": "Complete UI/UX design for iOS and Android",
        "quantity": 1,
        "unit": "project",
        "unitPrice": 25000,
        "totalPrice": 25000,
        "status": "completed",
        "deliveryDate": "2024-02-15T00:00:00Z",
        "actualDeliveryDate": "2024-02-14T16:30:00Z"
      },
      {
        "id": "del_002",
        "title": "Frontend Development",
        "description": "React Native mobile app development",
        "quantity": 1,
        "unit": "project",
        "unitPrice": 60000,
        "totalPrice": 60000,
        "status": "in_progress",
        "deliveryDate": "2024-04-01T00:00:00Z",
        "actualDeliveryDate": null
      },
      {
        "id": "del_003",
        "title": "Backend API Integration",
        "description": "REST API development and integration",
        "quantity": 1,
        "unit": "project",
        "unitPrice": 30000,
        "totalPrice": 30000,
        "status": "pending",
        "deliveryDate": "2024-04-15T00:00:00Z",
        "actualDeliveryDate": null
      }
    ],
    
    // Payment Milestones
    "paymentMilestones": [
      {
        "id": "mil_001",
        "description": "Advance Payment",
        "percentage": 40,
        "amount": 54280,
        "dueDate": "2024-02-05T00:00:00Z",
        "status": "completed",
        "completedDate": "2024-02-03T10:15:00Z",
        "invoiceId": "inv_001",
        "paymentProof": {
          "id": "doc_payment_001",
          "name": "Payment_Receipt_001.pdf",
          "url": "https://storage.example.com/doc_payment_001.pdf",
          "uploadedAt": "2024-02-03T10:20:00Z",
          "size": 512000
        }
      },
      {
        "id": "mil_002",
        "description": "Milestone 1 - Design Completion",
        "percentage": 30,
        "amount": 40710,
        "dueDate": "2024-02-20T00:00:00Z",
        "status": "in_progress",
        "completedDate": null,
        "invoiceId": null,
        "paymentProof": null
      },
      {
        "id": "mil_003",
        "description": "Final Payment - Project Completion",
        "percentage": 30,
        "amount": 40710,
        "dueDate": "2024-05-10T00:00:00Z",
        "status": "pending",
        "completedDate": null,
        "invoiceId": null,
        "paymentProof": null
      }
    ],
    
    // Acceptance Criteria
    "acceptanceCriteria": [
      {
        "id": "cri_001",
        "criterion": "All screens must match approved design mockups",
        "status": "met",
        "verifiedDate": "2024-02-14T16:30:00Z",
        "verifiedBy": "user_xyz123"
      },
      {
        "id": "cri_002",
        "criterion": "App must load within 3 seconds on average devices",
        "status": "pending",
        "verifiedDate": null,
        "verifiedBy": null
      },
      {
        "id": "cri_003",
        "criterion": "All features must pass UAT with 95% success rate",
        "status": "pending",
        "verifiedDate": null,
        "verifiedBy": null
      }
    ],
    
    // Documents
    "documents": [
      {
        "id": "doc_123",
        "name": "Signed_PO_Agreement.pdf",
        "type": "contract",
        "category": "legal",
        "url": "https://storage.example.com/doc_123.pdf",
        "uploadedAt": "2024-01-30T11:00:00Z",
        "uploadedBy": "user_xyz123",
        "size": 2048576
      },
      {
        "id": "doc_124",
        "name": "Technical_Specifications.pdf",
        "type": "specification",
        "category": "technical",
        "url": "https://storage.example.com/doc_124.pdf",
        "uploadedAt": "2024-01-30T11:05:00Z",
        "uploadedBy": "user_xyz123",
        "size": 1536000
      }
    ],
    
    // Approval Workflow
    "approvalWorkflow": {
      "id": "wf_001",
      "requireAllApprovals": false,
      "approvers": [
        {
          "userId": "user_xyz123",
          "name": "John Smith",
          "role": "Procurement Manager",
          "status": "approved",
          "approvedAt": "2024-01-31T09:00:00Z",
          "comments": "Approved - vendor meets all requirements"
        },
        {
          "userId": "user_abc456",
          "name": "Sarah Johnson",
          "role": "Finance Director",
          "status": "approved",
          "approvedAt": "2024-01-31T10:30:00Z",
          "comments": "Budget approved"
        }
      ],
      "currentStep": 2,
      "totalSteps": 2,
      "completed": true
    },
    
    // Activity Log (Recent 10 activities)
    "recentActivity": [
      {
        "id": "act_001",
        "action": "milestone_completed",
        "description": "Advance Payment milestone marked as completed",
        "performedBy": "user_xyz123",
        "performedByName": "John Smith",
        "timestamp": "2024-02-03T10:15:00Z",
        "metadata": {
          "milestoneId": "mil_001",
          "amount": 54280
        }
      },
      {
        "id": "act_002",
        "action": "deliverable_completed",
        "description": "UI/UX Design deliverable marked as completed",
        "performedBy": "ven_def456",
        "performedByName": "TechSolutions Inc.",
        "timestamp": "2024-02-14T16:30:00Z",
        "metadata": {
          "deliverableId": "del_001"
        }
      }
    ]
  }
}
```

**Error Responses:**

- `404 Not Found` - Purchase order not found
- `401 Unauthorized` - Missing or invalid authentication token
- `500 Internal Server Error` - Server error

---

### 7. Create Purchase Order

**Endpoint:** `POST /api/v1/industry/purchase-orders`

**Description:** Create a new purchase order from an approved quotation.

**Request Body:**

```typescript
{
  "quotationId": "quo_abc123",
  "orderValue": 115000,
  "taxPercentage": 18,
  "startDate": "2024-02-01T00:00:00Z",
  "endDate": "2024-05-01T23:59:59Z",
  "paymentTerms": "Net 30, 40% advance, 30% on milestone, 30% on completion",
  "specialInstructions": "Please ensure all deliverables include comprehensive documentation.",
  "scopeOfWork": "Develop a cross-platform mobile application using React Native...",
  
  "deliverables": [
    {
      "title": "UI/UX Design",
      "description": "Complete UI/UX design for iOS and Android",
      "quantity": 1,
      "unit": "project",
      "unitPrice": 25000,
      "deliveryDate": "2024-02-15T00:00:00Z"
    },
    {
      "title": "Frontend Development",
      "description": "React Native mobile app development",
      "quantity": 1,
      "unit": "project",
      "unitPrice": 60000,
      "deliveryDate": "2024-04-01T00:00:00Z"
    },
    {
      "title": "Backend API Integration",
      "description": "REST API development and integration",
      "quantity": 1,
      "unit": "project",
      "unitPrice": 30000,
      "deliveryDate": "2024-04-15T00:00:00Z"
    }
  ],
  
  "paymentMilestones": [
    {
      "description": "Advance Payment",
      "percentage": 40,
      "dueDate": "2024-02-05T00:00:00Z"
    },
    {
      "description": "Milestone 1 - Design Completion",
      "percentage": 30,
      "dueDate": "2024-02-20T00:00:00Z"
    },
    {
      "description": "Final Payment - Project Completion",
      "percentage": 30,
      "dueDate": "2024-05-10T00:00:00Z"
    }
  ],
  
  "acceptanceCriteria": [
    {
      "criterion": "All screens must match approved design mockups"
    },
    {
      "criterion": "App must load within 3 seconds on average devices"
    },
    {
      "criterion": "All features must pass UAT with 95% success rate"
    }
  ],
  
  "approvalWorkflow": {
    "approvers": ["user_xyz123", "user_abc456"],
    "requireAllApprovals": false
  }
}
```

**Validation:**
- `quotationId` must reference an approved quotation
- `orderValue` must be positive
- `taxPercentage` must be between 0 and 100
- `startDate` must be before `endDate`
- `deliverables` array must not be empty
- `paymentMilestones` percentages must sum to 100
- At least one acceptance criterion is recommended

**Response:** `201 Created`

```typescript
{
  "success": true,
  "data": {
    "id": "po_abc123",
    "orderNumber": "PO-2024-001",
    "status": "pending_approval",
    // ... full purchase order details
  },
  "message": "Purchase order created successfully and sent for approval"
}
```

**Error Responses:**

- `400 Bad Request` - Invalid request body or validation failed
- `404 Not Found` - Referenced quotation not found
- `401 Unauthorized` - Missing or invalid authentication token
- `403 Forbidden` - User lacks permission to create purchase orders
- `409 Conflict` - Purchase order already exists for this quotation
- `500 Internal Server Error` - Server error

---

### 8. Update Purchase Order

**Endpoint:** `PATCH /api/v1/industry/purchase-orders/:orderId`

**Description:** Update an existing purchase order. Only allowed for draft or pending_approval status.

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| orderId | string | Yes | Unique purchase order identifier |

**Request Body:**

```typescript
{
  "orderValue": 120000,
  "taxPercentage": 18,
  "startDate": "2024-02-05T00:00:00Z",
  "endDate": "2024-05-15T23:59:59Z",
  "paymentTerms": "Net 30, 50% advance, 50% on completion",
  "specialInstructions": "Updated instructions for the project",
  "scopeOfWork": "Updated scope of work description..."
}
```

**Response:** `200 OK`

```typescript
{
  "success": true,
  "data": {
    "id": "po_abc123",
    "orderNumber": "PO-2024-001",
    // ... full updated purchase order details
  },
  "message": "Purchase order updated successfully"
}
```

**Error Responses:**

- `400 Bad Request` - Invalid update or PO status doesn't allow updates
- `404 Not Found` - Purchase order not found
- `401 Unauthorized` - Missing or invalid authentication token
- `403 Forbidden` - User lacks permission to update purchase orders
- `409 Conflict` - Cannot update PO in current status
- `500 Internal Server Error` - Server error

---

### 9. Approve Purchase Order

**Endpoint:** `POST /api/v1/industry/purchase-orders/:orderId/approve`

**Description:** Approve a pending purchase order (for approvers in the approval workflow).

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| orderId | string | Yes | Unique purchase order identifier |

**Request Body:**

```typescript
{
  "comments": "Approved - all terms are acceptable"
}
```

**Response:** `200 OK`

```typescript
{
  "success": true,
  "data": {
    "id": "po_abc123",
    "orderNumber": "PO-2024-001",
    "status": "approved", // or still "pending_approval" if more approvals needed
    "approvedBy": "user_xyz123",
    "approvedDate": "2024-01-31T09:00:00Z",
    // ... other purchase order fields
  },
  "message": "Purchase order approved successfully"
}
```

**Error Responses:**

- `400 Bad Request` - PO cannot be approved (not in pending status)
- `404 Not Found` - Purchase order not found
- `401 Unauthorized` - Missing or invalid authentication token
- `403 Forbidden` - User is not an approver for this PO
- `500 Internal Server Error` - Server error

---

### 10. Reject Purchase Order

**Endpoint:** `POST /api/v1/industry/purchase-orders/:orderId/reject`

**Description:** Reject a pending purchase order.

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| orderId | string | Yes | Unique purchase order identifier |

**Request Body:**

```typescript
{
  "reason": "budget_constraints", // Enum: budget_constraints, terms_unacceptable, vendor_issues, requirements_changed, other
  "comments": "Budget has been reallocated to higher priority projects"
}
```

**Response:** `200 OK`

```typescript
{
  "success": true,
  "data": {
    "id": "po_abc123",
    "orderNumber": "PO-2024-001",
    "status": "rejected",
    "rejectedBy": "user_xyz123",
    "rejectedDate": "2024-01-31T09:00:00Z",
    "rejectionReason": "budget_constraints",
    // ... other purchase order fields
  },
  "message": "Purchase order rejected"
}
```

**Error Responses:**

- `400 Bad Request` - Missing required reason field or invalid status
- `404 Not Found` - Purchase order not found
- `401 Unauthorized` - Missing or invalid authentication token
- `403 Forbidden` - User lacks permission to reject purchase orders
- `500 Internal Server Error` - Server error

---

### 11. Cancel Purchase Order

**Endpoint:** `POST /api/v1/industry/purchase-orders/:orderId/cancel`

**Description:** Cancel an active purchase order. This action may have financial implications.

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| orderId | string | Yes | Unique purchase order identifier |

**Request Body:**

```typescript
{
  "reason": "Cancelling due to project scope changes",
  "effectiveDate": "2024-03-01T00:00:00Z",
  "settlementAmount": 25000, // Amount to be paid for work completed
  "comments": "Vendor will be compensated for completed design work"
}
```

**Response:** `200 OK`

```typescript
{
  "success": true,
  "data": {
    "id": "po_abc123",
    "orderNumber": "PO-2024-001",
    "status": "cancelled",
    "cancelledBy": "user_xyz123",
    "cancelledDate": "2024-02-20T10:00:00Z",
    "cancellationReason": "Cancelling due to project scope changes",
    "settlementAmount": 25000,
    // ... other purchase order fields
  },
  "message": "Purchase order cancelled successfully"
}
```

**Error Responses:**

- `400 Bad Request` - PO cannot be cancelled (already completed or cancelled)
- `404 Not Found` - Purchase order not found
- `401 Unauthorized` - Missing or invalid authentication token
- `403 Forbidden` - User lacks permission to cancel purchase orders
- `500 Internal Server Error` - Server error

---

### 12. Export Purchase Order to PDF

**Endpoint:** `GET /api/v1/industry/purchase-orders/:orderId/export/pdf`

**Description:** Export a specific purchase order as a formatted PDF document.

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| orderId | string | Yes | Unique purchase order identifier |

**Response:** `200 OK` (application/pdf)

Returns a binary PDF file with:
- PO header with order number and status
- Vendor information
- Project details
- Deliverables table
- Payment milestones
- Acceptance criteria
- Terms and conditions
- Signatures section

**Error Responses:**

- `404 Not Found` - Purchase order not found
- `401 Unauthorized` - Missing or invalid authentication token
- `500 Internal Server Error` - Server error

---

### 13. Bulk Export Purchase Orders to Excel

**Endpoint:** `POST /api/v1/industry/purchase-orders/export/xlsx`

**Description:** Export multiple purchase orders to an Excel file with multiple sheets.

**Request Body:**

```typescript
{
  "status": ["in_progress", "completed"],
  "vendorId": "ven_def456",
  "startDate": "2024-01-01T00:00:00Z",
  "endDate": "2024-12-31T23:59:59Z",
  "includeDetails": true,
  "includeMilestones": true
}
```

**Response:** `200 OK` (application/vnd.openxmlformats-officedocument.spreadsheetml.sheet)

Returns an Excel file with sheets:
- Summary (overview statistics)
- Purchase Orders (list of all POs)
- Payment Milestones (if includeMilestones = true)
- Deliverables (if includeDetails = true)

**Error Responses:**

- `400 Bad Request` - Invalid request parameters
- `401 Unauthorized` - Missing or invalid authentication token
- `500 Internal Server Error` - Server error

---

## Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request - Invalid parameters or request body |
| 401 | Unauthorized - Missing or invalid authentication |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource does not exist |
| 409 | Conflict - Resource already exists or state conflict |
| 500 | Internal Server Error |

---

## Purchase Order Status Flow

```
draft → pending_approval → approved → in_progress → completed
                          ↓
                      rejected
                      
approved/in_progress → cancelled
```

**Status Descriptions:**

- `draft` - PO is being created but not yet submitted
- `pending_approval` - Awaiting approval from designated approvers
- `approved` - All approvals received, work can begin
- `in_progress` - Work is actively being performed
- `completed` - All deliverables delivered and accepted
- `rejected` - PO was rejected during approval process
- `cancelled` - PO was cancelled after approval

---

## Rate Limiting

- **Standard endpoints:** 100 requests per minute
- **List endpoints:** 60 requests per minute
- **Export operations:** 10 requests per minute
- **Bulk operations:** 5 requests per minute

---

## Best Practices

1. **Use Specific Filters:** Apply filters like status, vendor, and date ranges to reduce response sizes and improve performance

2. **Pagination:** Always use pagination for list endpoints; default to 10-20 items per page

3. **Status Validation:** Check PO status before attempting state-changing operations (approve, reject, cancel)

4. **Approval Workflow:** Verify user is an authorized approver before attempting approval actions

5. **Error Handling:** Implement retry logic for 5xx errors with exponential backoff

6. **Caching:** Cache PO lists for 30 seconds to reduce server load; invalidate cache on updates

7. **Document Management:** Large documents should be lazy-loaded rather than included in list responses

8. **Export Operations:** Use export endpoints during off-peak hours for large datasets

9. **Audit Trail:** Monitor the activity log for compliance and troubleshooting purposes

10. **Financial Data:** Always use the totalValue field (including tax) for financial reporting

---

## Common Use Cases

### Creating a PO from Approved Quotation

```typescript
// 1. Get quotation details
const quotation = await fetch(`/api/v1/industry/quotations/${quotationId}`);

// 2. Create PO with quotation data
const poData = {
  quotationId: quotation.id,
  orderValue: quotation.quotedAmount,
  taxPercentage: 18,
  startDate: "2024-02-01T00:00:00Z",
  endDate: "2024-05-01T23:59:59Z",
  // ... other fields
};

const po = await fetch('/api/v1/industry/purchase-orders', {
  method: 'POST',
  body: JSON.stringify(poData)
});
```

### Tracking PO Progress

```typescript
// Get PO with all details
const po = await fetch(`/api/v1/industry/purchase-orders/${poId}`);

// Check completion percentage
const progress = po.data.completionPercentage;

// Check milestone status
const completedMilestones = po.data.paymentMilestones.filter(
  m => m.status === 'completed'
).length;

// Check deliverable status
const pendingDeliverables = po.data.deliverables.filter(
  d => d.status === 'pending' || d.status === 'in_progress'
);
```

### Generating Reports

```typescript
// Export all completed POs for the quarter
const report = await fetch('/api/v1/industry/purchase-orders/export/xlsx', {
  method: 'POST',
  body: JSON.stringify({
    status: ['completed'],
    startDate: '2024-01-01T00:00:00Z',
    endDate: '2024-03-31T23:59:59Z',
    includeDetails: true,
    includeMilestones: true
  })
});
```

---

## Related APIs

- [Purchase Order Milestones API](./purchase-orders-milestones-api.md)
- [Purchase Order Invoices API](./purchase-orders-invoices-api.md)
- [Purchase Order Delivery Tracking API](./purchase-orders-delivery-api.md)
- [Quotations API](./quotations-api.md)
- [Requirements API](./requirements-overview-api.md)
