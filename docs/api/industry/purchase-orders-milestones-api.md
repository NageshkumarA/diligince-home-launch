# Purchase Order Milestones API Documentation

## Overview
The Purchase Order Milestones API manages payment milestones and progress tracking for purchase orders. This includes viewing milestone schedules, updating milestone status, marking milestones as complete, and uploading payment proofs.

## Base URL
```
/api/v1/industry/purchase-orders/:orderId/milestones
```

## Authentication
All endpoints require authentication via Bearer token in the Authorization header:
```
Authorization: Bearer {access_token}
```

---

## Endpoints

### 1. List All Milestones for Purchase Order

**Endpoint:** `GET /api/v1/industry/purchase-orders/:orderId/milestones`

**Description:** Retrieve all payment milestones for a specific purchase order.

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| orderId | string | Yes | Unique purchase order identifier |

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| status | string | No | - | Filter by status (pending, in_progress, completed, overdue) |
| sortBy | string | No | dueDate | Field to sort by (dueDate, amount, percentage) |
| sortOrder | string | No | asc | Sort order (asc, desc) |

**Response:** `200 OK`

```typescript
{
  "success": true,
  "data": {
    "purchaseOrderId": "po_abc123",
    "orderNumber": "PO-2024-001",
    "totalValue": 135700,
    "milestones": [
      {
        "id": "mil_001",
        "description": "Advance Payment",
        "percentage": 40,
        "amount": 54280,
        "dueDate": "2024-02-05T00:00:00Z",
        "status": "completed",
        "completedDate": "2024-02-03T10:15:00Z",
        "completedBy": "user_xyz123",
        "completedByName": "John Smith",
        "invoiceId": "inv_001",
        "invoiceNumber": "INV-2024-001",
        "paymentProof": {
          "id": "doc_payment_001",
          "name": "Payment_Receipt_001.pdf",
          "url": "https://storage.example.com/doc_payment_001.pdf",
          "uploadedAt": "2024-02-03T10:20:00Z",
          "uploadedBy": "user_xyz123",
          "size": 512000
        },
        "createdAt": "2024-01-30T10:30:00Z",
        "updatedAt": "2024-02-03T10:15:00Z"
      },
      {
        "id": "mil_002",
        "description": "Milestone 1 - Design Completion",
        "percentage": 30,
        "amount": 40710,
        "dueDate": "2024-02-20T00:00:00Z",
        "status": "in_progress",
        "completedDate": null,
        "completedBy": null,
        "completedByName": null,
        "invoiceId": "inv_002",
        "invoiceNumber": "INV-2024-002",
        "paymentProof": null,
        "createdAt": "2024-01-30T10:30:00Z",
        "updatedAt": "2024-02-15T14:20:00Z"
      },
      {
        "id": "mil_003",
        "description": "Final Payment - Project Completion",
        "percentage": 30,
        "amount": 40710,
        "dueDate": "2024-05-10T00:00:00Z",
        "status": "pending",
        "completedDate": null,
        "completedBy": null,
        "completedByName": null,
        "invoiceId": null,
        "invoiceNumber": null,
        "paymentProof": null,
        "createdAt": "2024-01-30T10:30:00Z",
        "updatedAt": "2024-01-30T10:30:00Z"
      }
    ],
    "summary": {
      "totalMilestones": 3,
      "completedMilestones": 1,
      "inProgressMilestones": 1,
      "pendingMilestones": 1,
      "overdueMilestones": 0,
      "totalAmount": 135700,
      "paidAmount": 54280,
      "pendingAmount": 81420
    }
  }
}
```

**Error Responses:**

- `404 Not Found` - Purchase order not found
- `401 Unauthorized` - Missing or invalid authentication token
- `500 Internal Server Error` - Server error

---

### 2. Get Milestone Details

**Endpoint:** `GET /api/v1/industry/purchase-orders/:orderId/milestones/:milestoneId`

**Description:** Retrieve detailed information about a specific payment milestone.

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| orderId | string | Yes | Unique purchase order identifier |
| milestoneId | string | Yes | Unique milestone identifier |

**Response:** `200 OK`

```typescript
{
  "success": true,
  "data": {
    "id": "mil_002",
    "purchaseOrderId": "po_abc123",
    "orderNumber": "PO-2024-001",
    "description": "Milestone 1 - Design Completion",
    "percentage": 30,
    "amount": 40710,
    "dueDate": "2024-02-20T00:00:00Z",
    "status": "in_progress",
    "completedDate": null,
    "completedBy": null,
    "completedByName": null,
    
    // Related Invoice
    "invoice": {
      "id": "inv_002",
      "invoiceNumber": "INV-2024-002",
      "amount": 40710,
      "issueDate": "2024-02-15T00:00:00Z",
      "dueDate": "2024-02-20T00:00:00Z",
      "status": "pending",
      "paidDate": null
    },
    
    // Payment Proof
    "paymentProof": null,
    
    // Associated Deliverables
    "relatedDeliverables": [
      {
        "id": "del_001",
        "title": "UI/UX Design",
        "status": "completed",
        "deliveryDate": "2024-02-15T00:00:00Z"
      }
    ],
    
    // Activity Log
    "activityLog": [
      {
        "id": "act_001",
        "action": "milestone_created",
        "description": "Milestone created",
        "performedBy": "user_xyz123",
        "performedByName": "John Smith",
        "timestamp": "2024-01-30T10:30:00Z"
      },
      {
        "id": "act_002",
        "action": "status_changed",
        "description": "Status changed from pending to in_progress",
        "performedBy": "user_xyz123",
        "performedByName": "John Smith",
        "timestamp": "2024-02-15T14:20:00Z"
      }
    ],
    
    "createdAt": "2024-01-30T10:30:00Z",
    "updatedAt": "2024-02-15T14:20:00Z"
  }
}
```

**Error Responses:**

- `404 Not Found` - Purchase order or milestone not found
- `401 Unauthorized` - Missing or invalid authentication token
- `500 Internal Server Error` - Server error

---

### 3. Update Milestone

**Endpoint:** `PATCH /api/v1/industry/purchase-orders/:orderId/milestones/:milestoneId`

**Description:** Update milestone details. Only allowed for milestones in pending or in_progress status.

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| orderId | string | Yes | Unique purchase order identifier |
| milestoneId | string | Yes | Unique milestone identifier |

**Request Body:**

```typescript
{
  "description": "Milestone 1 - Design and Prototyping Completion",
  "dueDate": "2024-02-25T00:00:00Z",
  "status": "in_progress"
}
```

**Validation:**
- Cannot change percentage or amount (would affect PO financial structure)
- Cannot update completed milestones
- Status can only transition: pending → in_progress → completed

**Response:** `200 OK`

```typescript
{
  "success": true,
  "data": {
    "id": "mil_002",
    "description": "Milestone 1 - Design and Prototyping Completion",
    "percentage": 30,
    "amount": 40710,
    "dueDate": "2024-02-25T00:00:00Z",
    "status": "in_progress",
    // ... other milestone fields
  },
  "message": "Milestone updated successfully"
}
```

**Error Responses:**

- `400 Bad Request` - Invalid update or milestone status doesn't allow updates
- `404 Not Found` - Purchase order or milestone not found
- `401 Unauthorized` - Missing or invalid authentication token
- `403 Forbidden` - User lacks permission to update milestones
- `500 Internal Server Error` - Server error

---

### 4. Mark Milestone as Complete

**Endpoint:** `POST /api/v1/industry/purchase-orders/:orderId/milestones/:milestoneId/mark-complete`

**Description:** Mark a milestone as completed with optional payment proof.

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| orderId | string | Yes | Unique purchase order identifier |
| milestoneId | string | Yes | Unique milestone identifier |

**Request Body:**

```typescript
{
  "completedDate": "2024-02-18T10:30:00Z",
  "comments": "Payment processed successfully via wire transfer",
  "paymentProof": {
    "id": "doc_payment_002",
    "name": "Payment_Receipt_002.pdf",
    "url": "https://storage.example.com/doc_payment_002.pdf",
    "size": 625000
  },
  "paymentMethod": "wire_transfer", // Enum: wire_transfer, check, credit_card, ach, other
  "transactionReference": "TXN-2024-12345"
}
```

**Validation:**
- Milestone must be in `in_progress` status
- `completedDate` cannot be in the future
- Payment proof is optional but recommended for audit trail

**Response:** `200 OK`

```typescript
{
  "success": true,
  "data": {
    "id": "mil_002",
    "description": "Milestone 1 - Design Completion",
    "percentage": 30,
    "amount": 40710,
    "dueDate": "2024-02-20T00:00:00Z",
    "status": "completed",
    "completedDate": "2024-02-18T10:30:00Z",
    "completedBy": "user_xyz123",
    "completedByName": "John Smith",
    "paymentMethod": "wire_transfer",
    "transactionReference": "TXN-2024-12345",
    "paymentProof": {
      "id": "doc_payment_002",
      "name": "Payment_Receipt_002.pdf",
      "url": "https://storage.example.com/doc_payment_002.pdf",
      "uploadedAt": "2024-02-18T10:30:00Z",
      "uploadedBy": "user_xyz123",
      "size": 625000
    },
    // ... other milestone fields
  },
  "message": "Milestone marked as complete"
}
```

**Error Responses:**

- `400 Bad Request` - Milestone cannot be marked complete (not in correct status)
- `404 Not Found` - Purchase order or milestone not found
- `401 Unauthorized` - Missing or invalid authentication token
- `403 Forbidden` - User lacks permission to complete milestones
- `500 Internal Server Error` - Server error

---

### 5. Upload Payment Proof

**Endpoint:** `POST /api/v1/industry/purchase-orders/:orderId/milestones/:milestoneId/upload-proof`

**Description:** Upload or update payment proof document for a milestone.

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| orderId | string | Yes | Unique purchase order identifier |
| milestoneId | string | Yes | Unique milestone identifier |

**Request Body:**

```typescript
{
  "document": {
    "id": "doc_payment_003",
    "name": "Bank_Statement_Feb2024.pdf",
    "url": "https://storage.example.com/doc_payment_003.pdf",
    "size": 1048576
  },
  "comments": "Bank statement showing wire transfer confirmation"
}
```

**Response:** `200 OK`

```typescript
{
  "success": true,
  "data": {
    "id": "mil_002",
    "paymentProof": {
      "id": "doc_payment_003",
      "name": "Bank_Statement_Feb2024.pdf",
      "url": "https://storage.example.com/doc_payment_003.pdf",
      "uploadedAt": "2024-02-18T11:00:00Z",
      "uploadedBy": "user_xyz123",
      "size": 1048576
    },
    // ... other milestone fields
  },
  "message": "Payment proof uploaded successfully"
}
```

**Error Responses:**

- `400 Bad Request` - Invalid document data
- `404 Not Found` - Purchase order or milestone not found
- `401 Unauthorized` - Missing or invalid authentication token
- `403 Forbidden` - User lacks permission to upload documents
- `413 Payload Too Large` - Document exceeds size limit (10MB)
- `500 Internal Server Error` - Server error

---

### 6. Get Overdue Milestones

**Endpoint:** `GET /api/v1/industry/purchase-orders/:orderId/milestones/overdue`

**Description:** Retrieve all overdue milestones for a purchase order.

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| orderId | string | Yes | Unique purchase order identifier |

**Response:** `200 OK`

```typescript
{
  "success": true,
  "data": {
    "purchaseOrderId": "po_abc123",
    "orderNumber": "PO-2024-001",
    "overdueMilestones": [
      {
        "id": "mil_002",
        "description": "Milestone 1 - Design Completion",
        "percentage": 30,
        "amount": 40710,
        "dueDate": "2024-02-20T00:00:00Z",
        "status": "in_progress",
        "daysOverdue": 5,
        "invoiceId": "inv_002",
        "invoiceStatus": "overdue"
      }
    ],
    "summary": {
      "totalOverdue": 1,
      "totalOverdueAmount": 40710,
      "averageDaysOverdue": 5
    }
  }
}
```

**Error Responses:**

- `404 Not Found` - Purchase order not found
- `401 Unauthorized` - Missing or invalid authentication token
- `500 Internal Server Error` - Server error

---

## Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Bad Request - Invalid parameters or request body |
| 401 | Unauthorized - Missing or invalid authentication |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource does not exist |
| 413 | Payload Too Large - Document exceeds size limit |
| 500 | Internal Server Error |

---

## Milestone Status Flow

```
pending → in_progress → completed
```

**Status Descriptions:**

- `pending` - Milestone has not been initiated, waiting for prerequisites
- `in_progress` - Work associated with milestone is ongoing
- `completed` - Milestone criteria met and payment processed
- `overdue` - Computed status when dueDate has passed and status is not completed

---

## Rate Limiting

- **Standard endpoints:** 100 requests per minute
- **Upload operations:** 20 requests per minute

---

## Best Practices

1. **Sequential Completion:** Complete milestones in order when possible for clear progress tracking

2. **Payment Proof:** Always upload payment proof documents for audit compliance and dispute resolution

3. **Status Updates:** Update milestone status to `in_progress` when work begins, not just when completed

4. **Due Date Monitoring:** Implement alerts for upcoming milestone due dates (e.g., 3 days before)

5. **Invoice Linking:** Ensure milestones are properly linked to invoices for financial reconciliation

6. **Comments:** Add meaningful comments when marking milestones complete for audit trail

7. **Overdue Tracking:** Regularly monitor overdue milestones and take corrective actions

8. **Financial Validation:** Verify milestone percentages sum to 100% at PO creation

9. **Document Size:** Keep payment proof documents under 5MB for optimal performance

10. **Batch Updates:** Avoid rapid sequential updates; batch multiple changes when possible

---

## Common Use Cases

### Tracking Payment Progress

```typescript
// Get all milestones with summary
const milestones = await fetch(
  `/api/v1/industry/purchase-orders/${poId}/milestones`
);

// Calculate completion
const completionRate = 
  (milestones.data.summary.completedMilestones / 
   milestones.data.summary.totalMilestones) * 100;

// Check for overdue
const hasOverdue = milestones.data.summary.overdueMilestones > 0;
```

### Processing Milestone Payment

```typescript
// 1. Verify deliverables are completed
const milestone = await fetch(
  `/api/v1/industry/purchase-orders/${poId}/milestones/${milestoneId}`
);

// 2. Upload payment proof
await fetch(
  `/api/v1/industry/purchase-orders/${poId}/milestones/${milestoneId}/upload-proof`,
  {
    method: 'POST',
    body: JSON.stringify({
      document: paymentProofDoc,
      comments: 'Payment processed'
    })
  }
);

// 3. Mark as complete
await fetch(
  `/api/v1/industry/purchase-orders/${poId}/milestones/${milestoneId}/mark-complete`,
  {
    method: 'POST',
    body: JSON.stringify({
      completedDate: new Date().toISOString(),
      paymentMethod: 'wire_transfer',
      transactionReference: 'TXN-12345'
    })
  }
);
```

### Monitoring Overdue Payments

```typescript
// Get overdue milestones
const overdue = await fetch(
  `/api/v1/industry/purchase-orders/${poId}/milestones/overdue`
);

// Send alerts if any overdue
if (overdue.data.summary.totalOverdue > 0) {
  overdue.data.overdueMilestones.forEach(milestone => {
    sendAlert({
      type: 'milestone_overdue',
      milestone: milestone.id,
      daysOverdue: milestone.daysOverdue
    });
  });
}
```

---

## Related APIs

- [Purchase Orders API](./purchase-orders-api.md)
- [Purchase Order Invoices API](./purchase-orders-invoices-api.md)
- [Purchase Order Delivery Tracking API](./purchase-orders-delivery-api.md)
