# Purchase Order Invoices API Documentation

## Overview
The Purchase Order Invoices API manages invoice tracking and payment processing for purchase orders. This includes viewing invoices, creating invoice records, updating invoice status, marking invoices as paid, and downloading invoice documents.

## Base URL
```
/api/v1/industry/purchase-orders/:orderId/invoices
```

## Authentication
All endpoints require authentication via Bearer token in the Authorization header:
```
Authorization: Bearer {access_token}
```

---

## Endpoints

### 1. List All Invoices for Purchase Order

**Endpoint:** `GET /api/v1/industry/purchase-orders/:orderId/invoices`

**Description:** Retrieve all invoices associated with a specific purchase order.

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| orderId | string | Yes | Unique purchase order identifier |

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| status | string | No | - | Filter by status (pending, partially_paid, paid, overdue) |
| sortBy | string | No | issueDate | Field to sort by (issueDate, dueDate, amount) |
| sortOrder | string | No | desc | Sort order (asc, desc) |

**Response:** `200 OK`

```typescript
{
  "success": true,
  "data": {
    "purchaseOrderId": "po_abc123",
    "orderNumber": "PO-2024-001",
    "invoices": [
      {
        "id": "inv_001",
        "invoiceNumber": "INV-2024-001",
        "vendorInvoiceNumber": "VEN-INV-001",
        "milestoneId": "mil_001",
        "milestoneName": "Advance Payment",
        "amount": 46000,
        "taxPercentage": 18,
        "taxAmount": 8280,
        "totalAmount": 54280,
        "currency": "USD",
        "issueDate": "2024-01-31T00:00:00Z",
        "dueDate": "2024-02-05T00:00:00Z",
        "paidDate": "2024-02-03T10:15:00Z",
        "status": "paid",
        "paymentMethod": "wire_transfer",
        "transactionReference": "TXN-2024-12345",
        "documents": [
          {
            "id": "doc_inv_001",
            "name": "Invoice_001.pdf",
            "type": "invoice",
            "url": "https://storage.example.com/doc_inv_001.pdf",
            "uploadedAt": "2024-01-31T08:00:00Z",
            "size": 512000
          }
        ],
        "createdAt": "2024-01-31T08:00:00Z",
        "updatedAt": "2024-02-03T10:15:00Z"
      },
      {
        "id": "inv_002",
        "invoiceNumber": "INV-2024-002",
        "vendorInvoiceNumber": "VEN-INV-002",
        "milestoneId": "mil_002",
        "milestoneName": "Milestone 1 - Design Completion",
        "amount": 34500,
        "taxPercentage": 18,
        "taxAmount": 6210,
        "totalAmount": 40710,
        "currency": "USD",
        "issueDate": "2024-02-15T00:00:00Z",
        "dueDate": "2024-02-20T00:00:00Z",
        "paidDate": null,
        "status": "pending",
        "paymentMethod": null,
        "transactionReference": null,
        "documents": [
          {
            "id": "doc_inv_002",
            "name": "Invoice_002.pdf",
            "type": "invoice",
            "url": "https://storage.example.com/doc_inv_002.pdf",
            "uploadedAt": "2024-02-15T09:00:00Z",
            "size": 487000
          }
        ],
        "createdAt": "2024-02-15T09:00:00Z",
        "updatedAt": "2024-02-15T09:00:00Z"
      }
    ],
    "summary": {
      "totalInvoices": 2,
      "pendingInvoices": 1,
      "paidInvoices": 1,
      "overdueInvoices": 0,
      "totalInvoiced": 94990,
      "totalPaid": 54280,
      "totalPending": 40710
    }
  }
}
```

**Error Responses:**

- `404 Not Found` - Purchase order not found
- `401 Unauthorized` - Missing or invalid authentication token
- `500 Internal Server Error` - Server error

---

### 2. Get Invoice Details

**Endpoint:** `GET /api/v1/industry/purchase-orders/:orderId/invoices/:invoiceId`

**Description:** Retrieve detailed information about a specific invoice.

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| orderId | string | Yes | Unique purchase order identifier |
| invoiceId | string | Yes | Unique invoice identifier |

**Response:** `200 OK`

```typescript
{
  "success": true,
  "data": {
    "id": "inv_002",
    "invoiceNumber": "INV-2024-002",
    "vendorInvoiceNumber": "VEN-INV-002",
    "purchaseOrderId": "po_abc123",
    "orderNumber": "PO-2024-001",
    
    // Milestone Association
    "milestone": {
      "id": "mil_002",
      "description": "Milestone 1 - Design Completion",
      "percentage": 30,
      "dueDate": "2024-02-20T00:00:00Z"
    },
    
    // Vendor Information
    "vendor": {
      "id": "ven_def456",
      "name": "TechSolutions Inc.",
      "email": "billing@techsolutions.com",
      "phone": "+1-555-0123",
      "address": "123 Tech Street, Silicon Valley, CA 94000",
      "taxId": "12-3456789"
    },
    
    // Financial Details
    "amount": 34500,
    "taxPercentage": 18,
    "taxAmount": 6210,
    "totalAmount": 40710,
    "currency": "USD",
    
    // Line Items
    "lineItems": [
      {
        "id": "line_001",
        "description": "UI/UX Design Services",
        "quantity": 1,
        "unitPrice": 25000,
        "amount": 25000
      },
      {
        "id": "line_002",
        "description": "Design Iterations & Revisions",
        "quantity": 1,
        "unitPrice": 9500,
        "amount": 9500
      }
    ],
    
    // Dates
    "issueDate": "2024-02-15T00:00:00Z",
    "dueDate": "2024-02-20T00:00:00Z",
    "paidDate": null,
    
    // Status
    "status": "pending",
    "daysUntilDue": 3,
    "isOverdue": false,
    
    // Payment Details
    "paymentMethod": null,
    "transactionReference": null,
    "paymentNotes": null,
    
    // Documents
    "documents": [
      {
        "id": "doc_inv_002",
        "name": "Invoice_002.pdf",
        "type": "invoice",
        "url": "https://storage.example.com/doc_inv_002.pdf",
        "uploadedAt": "2024-02-15T09:00:00Z",
        "uploadedBy": "ven_def456",
        "size": 487000
      }
    ],
    
    // Activity Log
    "activityLog": [
      {
        "id": "act_001",
        "action": "invoice_created",
        "description": "Invoice created and submitted by vendor",
        "performedBy": "ven_def456",
        "performedByName": "TechSolutions Inc.",
        "timestamp": "2024-02-15T09:00:00Z"
      },
      {
        "id": "act_002",
        "action": "invoice_received",
        "description": "Invoice received and under review",
        "performedBy": "user_xyz123",
        "performedByName": "John Smith",
        "timestamp": "2024-02-15T10:30:00Z"
      }
    ],
    
    "createdAt": "2024-02-15T09:00:00Z",
    "updatedAt": "2024-02-15T10:30:00Z"
  }
}
```

**Error Responses:**

- `404 Not Found` - Purchase order or invoice not found
- `401 Unauthorized` - Missing or invalid authentication token
- `500 Internal Server Error` - Server error

---

### 3. Create Invoice

**Endpoint:** `POST /api/v1/industry/purchase-orders/:orderId/invoices`

**Description:** Create a new invoice record for a purchase order (typically done by vendor, but can be done by buyer for record-keeping).

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| orderId | string | Yes | Unique purchase order identifier |

**Request Body:**

```typescript
{
  "vendorInvoiceNumber": "VEN-INV-003",
  "milestoneId": "mil_003",
  "amount": 34500,
  "taxPercentage": 18,
  "issueDate": "2024-05-01T00:00:00Z",
  "dueDate": "2024-05-10T00:00:00Z",
  "lineItems": [
    {
      "description": "Backend Development",
      "quantity": 1,
      "unitPrice": 30000,
      "amount": 30000
    },
    {
      "description": "Testing & QA",
      "quantity": 1,
      "unitPrice": 4500,
      "amount": 4500
    }
  ],
  "documents": [
    {
      "id": "doc_inv_003",
      "name": "Invoice_003.pdf",
      "url": "https://storage.example.com/doc_inv_003.pdf",
      "size": 523000
    }
  ],
  "notes": "Final invoice for project completion"
}
```

**Validation:**
- `vendorInvoiceNumber` must be unique per vendor
- `milestoneId` must belong to the same purchase order
- `amount` + `taxAmount` must equal milestone amount
- `issueDate` cannot be in the future
- `dueDate` must be after `issueDate`
- At least one document is required

**Response:** `201 Created`

```typescript
{
  "success": true,
  "data": {
    "id": "inv_003",
    "invoiceNumber": "INV-2024-003",
    "vendorInvoiceNumber": "VEN-INV-003",
    "status": "pending",
    // ... other invoice fields
  },
  "message": "Invoice created successfully"
}
```

**Error Responses:**

- `400 Bad Request` - Invalid request body or validation failed
- `404 Not Found` - Purchase order or milestone not found
- `401 Unauthorized` - Missing or invalid authentication token
- `403 Forbidden` - User lacks permission to create invoices
- `409 Conflict` - Invoice number already exists
- `500 Internal Server Error` - Server error

---

### 4. Update Invoice

**Endpoint:** `PATCH /api/v1/industry/purchase-orders/:orderId/invoices/:invoiceId`

**Description:** Update invoice details. Only allowed for invoices in pending status.

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| orderId | string | Yes | Unique purchase order identifier |
| invoiceId | string | Yes | Unique invoice identifier |

**Request Body:**

```typescript
{
  "vendorInvoiceNumber": "VEN-INV-003-REVISED",
  "dueDate": "2024-05-15T00:00:00Z",
  "notes": "Updated due date per vendor request"
}
```

**Response:** `200 OK`

```typescript
{
  "success": true,
  "data": {
    "id": "inv_003",
    "invoiceNumber": "INV-2024-003",
    "vendorInvoiceNumber": "VEN-INV-003-REVISED",
    "dueDate": "2024-05-15T00:00:00Z",
    // ... other invoice fields
  },
  "message": "Invoice updated successfully"
}
```

**Error Responses:**

- `400 Bad Request` - Invalid update or invoice status doesn't allow updates
- `404 Not Found` - Purchase order or invoice not found
- `401 Unauthorized` - Missing or invalid authentication token
- `403 Forbidden` - User lacks permission to update invoices
- `500 Internal Server Error` - Server error

---

### 5. Mark Invoice as Paid

**Endpoint:** `POST /api/v1/industry/purchase-orders/:orderId/invoices/:invoiceId/mark-paid`

**Description:** Mark an invoice as paid with payment details.

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| orderId | string | Yes | Unique purchase order identifier |
| invoiceId | string | Yes | Unique invoice identifier |

**Request Body:**

```typescript
{
  "paidDate": "2024-02-18T14:30:00Z",
  "paymentMethod": "wire_transfer", // Enum: wire_transfer, check, credit_card, ach, other
  "transactionReference": "TXN-2024-67890",
  "paymentNotes": "Payment processed via international wire transfer",
  "paymentProof": {
    "id": "doc_payment_004",
    "name": "Payment_Confirmation.pdf",
    "url": "https://storage.example.com/doc_payment_004.pdf",
    "size": 425000
  }
}
```

**Validation:**
- Invoice must be in `pending` status
- `paidDate` cannot be in the future
- `paymentMethod` must be a valid enum value
- Payment proof document is recommended

**Response:** `200 OK`

```typescript
{
  "success": true,
  "data": {
    "id": "inv_002",
    "invoiceNumber": "INV-2024-002",
    "status": "paid",
    "paidDate": "2024-02-18T14:30:00Z",
    "paymentMethod": "wire_transfer",
    "transactionReference": "TXN-2024-67890",
    // ... other invoice fields
  },
  "message": "Invoice marked as paid successfully"
}
```

**Error Responses:**

- `400 Bad Request` - Invoice cannot be marked as paid (invalid status)
- `404 Not Found` - Purchase order or invoice not found
- `401 Unauthorized` - Missing or invalid authentication token
- `403 Forbidden` - User lacks permission to mark invoices as paid
- `500 Internal Server Error` - Server error

---

### 6. Download Invoice PDF

**Endpoint:** `GET /api/v1/industry/purchase-orders/:orderId/invoices/:invoiceId/export/pdf`

**Description:** Download the invoice document as a PDF file.

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| orderId | string | Yes | Unique purchase order identifier |
| invoiceId | string | Yes | Unique invoice identifier |

**Response:** `200 OK` (application/pdf)

Returns a binary PDF file with:
- Invoice header with invoice number and dates
- Vendor and buyer information
- Line items table
- Tax calculation
- Total amount
- Payment instructions
- Terms and conditions

**Error Responses:**

- `404 Not Found` - Purchase order, invoice, or PDF not found
- `401 Unauthorized` - Missing or invalid authentication token
- `500 Internal Server Error` - Server error

---

### 7. Get Overdue Invoices

**Endpoint:** `GET /api/v1/industry/purchase-orders/:orderId/invoices/overdue`

**Description:** Retrieve all overdue invoices for a purchase order.

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
    "overdueInvoices": [
      {
        "id": "inv_002",
        "invoiceNumber": "INV-2024-002",
        "vendorInvoiceNumber": "VEN-INV-002",
        "totalAmount": 40710,
        "issueDate": "2024-02-15T00:00:00Z",
        "dueDate": "2024-02-20T00:00:00Z",
        "status": "overdue",
        "daysOverdue": 5,
        "milestoneId": "mil_002"
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

### 8. Add Document to Invoice

**Endpoint:** `POST /api/v1/industry/purchase-orders/:orderId/invoices/:invoiceId/documents`

**Description:** Add additional documents to an existing invoice (e.g., supporting documentation, payment receipts).

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| orderId | string | Yes | Unique purchase order identifier |
| invoiceId | string | Yes | Unique invoice identifier |

**Request Body:**

```typescript
{
  "document": {
    "id": "doc_support_001",
    "name": "Supporting_Documentation.pdf",
    "type": "supporting_document", // Enum: supporting_document, payment_receipt, tax_document, other
    "url": "https://storage.example.com/doc_support_001.pdf",
    "size": 750000
  },
  "description": "Purchase order backup documentation"
}
```

**Response:** `200 OK`

```typescript
{
  "success": true,
  "data": {
    "id": "inv_002",
    "documents": [
      {
        "id": "doc_inv_002",
        "name": "Invoice_002.pdf",
        "type": "invoice",
        // ... existing document
      },
      {
        "id": "doc_support_001",
        "name": "Supporting_Documentation.pdf",
        "type": "supporting_document",
        "url": "https://storage.example.com/doc_support_001.pdf",
        "uploadedAt": "2024-02-18T15:00:00Z",
        "uploadedBy": "user_xyz123",
        "size": 750000
      }
    ]
  },
  "message": "Document added to invoice successfully"
}
```

**Error Responses:**

- `400 Bad Request` - Invalid document data
- `404 Not Found` - Purchase order or invoice not found
- `401 Unauthorized` - Missing or invalid authentication token
- `403 Forbidden` - User lacks permission to add documents
- `413 Payload Too Large` - Document exceeds size limit (10MB)
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
| 409 | Conflict - Invoice number already exists |
| 413 | Payload Too Large - Document exceeds size limit |
| 500 | Internal Server Error |

---

## Invoice Status Flow

```
pending → paid
    ↓
 overdue (computed when dueDate passed)
```

**Status Descriptions:**

- `pending` - Invoice received but payment not yet processed
- `partially_paid` - Partial payment received (for installment invoices)
- `paid` - Full payment completed
- `overdue` - Computed status when dueDate has passed and status is pending

---

## Rate Limiting

- **Standard endpoints:** 100 requests per minute
- **Upload operations:** 20 requests per minute
- **Download operations:** 50 requests per minute

---

## Best Practices

1. **Invoice Validation:** Verify invoice amounts match milestone values before creating invoice records

2. **Document Retention:** Always upload and retain invoice documents for audit and compliance purposes

3. **Timely Processing:** Process invoices promptly to avoid late payment penalties

4. **Payment Tracking:** Always record payment method and transaction reference for reconciliation

5. **Overdue Monitoring:** Set up automated alerts for invoices approaching due dates

6. **Document Quality:** Ensure uploaded invoices are clear and complete (all pages included)

7. **Status Updates:** Keep invoice status current; mark as paid immediately after payment processing

8. **Line Items:** Include detailed line items for transparency and audit trail

9. **Vendor Communication:** Use payment notes field to document any special arrangements or communications

10. **Reconciliation:** Regularly reconcile invoice totals with milestone payments and PO value

---

## Common Use Cases

### Processing Invoice Payment

```typescript
// 1. Get invoice details
const invoice = await fetch(
  `/api/v1/industry/purchase-orders/${poId}/invoices/${invoiceId}`
);

// 2. Verify amount and details
if (invoice.data.totalAmount === expectedAmount) {
  // 3. Mark as paid with payment details
  await fetch(
    `/api/v1/industry/purchase-orders/${poId}/invoices/${invoiceId}/mark-paid`,
    {
      method: 'POST',
      body: JSON.stringify({
        paidDate: new Date().toISOString(),
        paymentMethod: 'wire_transfer',
        transactionReference: 'TXN-12345',
        paymentProof: proofDocument
      })
    }
  );
  
  // 4. Update related milestone
  await fetch(
    `/api/v1/industry/purchase-orders/${poId}/milestones/${invoice.data.milestone.id}/mark-complete`,
    { method: 'POST' }
  );
}
```

### Monitoring Overdue Invoices

```typescript
// Get all overdue invoices
const overdueInvoices = await fetch(
  `/api/v1/industry/purchase-orders/${poId}/invoices/overdue`
);

// Send reminders
overdueInvoices.data.overdueInvoices.forEach(invoice => {
  sendPaymentReminder({
    invoiceId: invoice.id,
    daysOverdue: invoice.daysOverdue,
    amount: invoice.totalAmount
  });
});
```

### Invoice Reconciliation

```typescript
// Get all invoices for a PO
const invoices = await fetch(
  `/api/v1/industry/purchase-orders/${poId}/invoices`
);

// Verify totals match
const totalInvoiced = invoices.data.summary.totalInvoiced;
const totalPaid = invoices.data.summary.totalPaid;
const poTotal = purchaseOrder.totalValue;

if (totalInvoiced !== poTotal) {
  console.warn('Invoice total mismatch with PO value');
}
```

---

## Related APIs

- [Purchase Orders API](./purchase-orders-api.md)
- [Purchase Order Milestones API](./purchase-orders-milestones-api.md)
- [Purchase Order Delivery Tracking API](./purchase-orders-delivery-api.md)
