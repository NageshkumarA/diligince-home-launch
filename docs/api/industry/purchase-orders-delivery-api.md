# Purchase Order Delivery Tracking API Documentation

## Overview
The Purchase Order Delivery Tracking API manages delivery status and logistics tracking for purchase orders. This includes viewing delivery timelines, updating delivery status, tracking shipment progress, and managing proof of delivery documentation.

## Base URL
```
/api/v1/industry/purchase-orders/:orderId/delivery
```

## Authentication
All endpoints require authentication via Bearer token in the Authorization header:
```
Authorization: Bearer {access_token}
```

---

## Endpoints

### 1. Get Delivery Tracking Information

**Endpoint:** `GET /api/v1/industry/purchase-orders/:orderId/delivery`

**Description:** Retrieve comprehensive delivery tracking information for a purchase order.

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| orderId | string | Yes | Unique purchase order identifier |

**Response:** `200 OK`

```typescript
{
  "success": true,
  "data": {
    "id": "del_abc123",
    "purchaseOrderId": "po_abc123",
    "orderNumber": "PO-2024-001",
    
    // Current Status
    "status": "in_transit",
    "currentLocation": "Distribution Center - Los Angeles, CA",
    "lastUpdated": "2024-04-15T10:30:00Z",
    
    // Tracking Information
    "trackingNumber": "TRACK-2024-XYZ789",
    "carrier": "FedEx Express",
    "shippingMethod": "express",
    "trackingUrl": "https://www.fedex.com/tracking?tracknumber=TRACK-2024-XYZ789",
    
    // Timeline
    "estimatedShipDate": "2024-04-10T00:00:00Z",
    "actualShipDate": "2024-04-10T09:00:00Z",
    "estimatedDeliveryDate": "2024-04-18T00:00:00Z",
    "actualDeliveryDate": null,
    
    // Shipment Details
    "origin": {
      "address": "TechSolutions Inc., 123 Tech Street",
      "city": "Silicon Valley",
      "state": "CA",
      "zipCode": "94000",
      "country": "USA"
    },
    "destination": {
      "address": "Acme Corp, 456 Business Ave",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001",
      "country": "USA"
    },
    
    // Package Information
    "packages": [
      {
        "id": "pkg_001",
        "packageNumber": "PKG-001",
        "description": "Software Documentation & Media",
        "weight": 5.2,
        "weightUnit": "kg",
        "dimensions": {
          "length": 40,
          "width": 30,
          "height": 20,
          "unit": "cm"
        }
      }
    ],
    
    // Delivery Timeline Events
    "timeline": [
      {
        "id": "evt_001",
        "timestamp": "2024-04-10T09:00:00Z",
        "status": "picked_up",
        "location": "Silicon Valley, CA",
        "description": "Package picked up by carrier",
        "performedBy": "FedEx Driver - John D."
      },
      {
        "id": "evt_002",
        "timestamp": "2024-04-11T14:30:00Z",
        "status": "in_transit",
        "location": "FedEx Hub - Memphis, TN",
        "description": "Arrived at sorting facility",
        "performedBy": "System"
      },
      {
        "id": "evt_003",
        "timestamp": "2024-04-13T08:15:00Z",
        "status": "in_transit",
        "location": "FedEx Hub - Newark, NJ",
        "description": "Package in transit",
        "performedBy": "System"
      },
      {
        "id": "evt_004",
        "timestamp": "2024-04-15T10:30:00Z",
        "status": "in_transit",
        "location": "Distribution Center - Los Angeles, CA",
        "description": "Out for delivery",
        "performedBy": "FedEx Driver - Sarah M."
      }
    ],
    
    // Proof of Delivery
    "proofOfDelivery": null,
    "deliveredTo": null,
    "signatureRequired": true,
    
    // Special Instructions
    "deliveryInstructions": "Deliver to receiving dock, Building B. Contact warehouse manager upon arrival.",
    "contactPerson": "Jane Smith",
    "contactPhone": "+1-555-9876",
    "contactEmail": "jsmith@acmecorp.com",
    
    // Related Deliverables
    "associatedDeliverables": [
      {
        "id": "del_003",
        "title": "Backend API Integration",
        "status": "completed",
        "deliveryDate": "2024-04-15T00:00:00Z"
      }
    ],
    
    "createdAt": "2024-04-10T08:00:00Z",
    "updatedAt": "2024-04-15T10:30:00Z"
  }
}
```

**Error Responses:**

- `404 Not Found` - Purchase order not found or no delivery tracking available
- `401 Unauthorized` - Missing or invalid authentication token
- `500 Internal Server Error` - Server error

---

### 2. Update Delivery Status

**Endpoint:** `POST /api/v1/industry/purchase-orders/:orderId/delivery/update`

**Description:** Update delivery status with tracking information (typically done by vendor or logistics team).

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| orderId | string | Yes | Unique purchase order identifier |

**Request Body:**

```typescript
{
  "status": "in_transit", // Enum: pending, picked_up, in_transit, out_for_delivery, delivered, returned, cancelled
  "currentLocation": "FedEx Hub - Newark, NJ",
  "timestamp": "2024-04-13T08:15:00Z",
  "description": "Package in transit to destination",
  "performedBy": "System",
  "trackingNumber": "TRACK-2024-XYZ789",
  "estimatedDeliveryDate": "2024-04-18T00:00:00Z",
  "notes": "Package is on schedule for delivery"
}
```

**Validation:**
- `status` must be a valid enum value
- `timestamp` cannot be in the future
- Status transitions must be logical (e.g., cannot go from delivered back to pending)

**Response:** `200 OK`

```typescript
{
  "success": true,
  "data": {
    "id": "del_abc123",
    "status": "in_transit",
    "currentLocation": "FedEx Hub - Newark, NJ",
    "lastUpdated": "2024-04-13T08:15:00Z",
    // ... other delivery tracking fields
  },
  "message": "Delivery status updated successfully"
}
```

**Error Responses:**

- `400 Bad Request` - Invalid status transition or missing required fields
- `404 Not Found` - Purchase order not found
- `401 Unauthorized` - Missing or invalid authentication token
- `403 Forbidden` - User lacks permission to update delivery status
- `500 Internal Server Error` - Server error

---

### 3. Initialize Delivery Tracking

**Endpoint:** `POST /api/v1/industry/purchase-orders/:orderId/delivery`

**Description:** Initialize delivery tracking for a purchase order (creates initial delivery record).

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| orderId | string | Yes | Unique purchase order identifier |

**Request Body:**

```typescript
{
  "trackingNumber": "TRACK-2024-XYZ789",
  "carrier": "FedEx Express",
  "shippingMethod": "express", // Enum: standard, express, overnight, freight, other
  "estimatedShipDate": "2024-04-10T00:00:00Z",
  "estimatedDeliveryDate": "2024-04-18T00:00:00Z",
  "origin": {
    "address": "TechSolutions Inc., 123 Tech Street",
    "city": "Silicon Valley",
    "state": "CA",
    "zipCode": "94000",
    "country": "USA"
  },
  "destination": {
    "address": "Acme Corp, 456 Business Ave",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "packages": [
    {
      "packageNumber": "PKG-001",
      "description": "Software Documentation & Media",
      "weight": 5.2,
      "weightUnit": "kg",
      "dimensions": {
        "length": 40,
        "width": 30,
        "height": 20,
        "unit": "cm"
      }
    }
  ],
  "deliveryInstructions": "Deliver to receiving dock, Building B",
  "contactPerson": "Jane Smith",
  "contactPhone": "+1-555-9876",
  "contactEmail": "jsmith@acmecorp.com",
  "signatureRequired": true
}
```

**Response:** `201 Created`

```typescript
{
  "success": true,
  "data": {
    "id": "del_abc123",
    "purchaseOrderId": "po_abc123",
    "status": "pending",
    "trackingNumber": "TRACK-2024-XYZ789",
    // ... other delivery tracking fields
  },
  "message": "Delivery tracking initialized successfully"
}
```

**Error Responses:**

- `400 Bad Request` - Invalid request body or validation failed
- `404 Not Found` - Purchase order not found
- `401 Unauthorized` - Missing or invalid authentication token
- `403 Forbidden` - User lacks permission to initialize delivery
- `409 Conflict` - Delivery tracking already exists for this PO
- `500 Internal Server Error` - Server error

---

### 4. Upload Proof of Delivery

**Endpoint:** `POST /api/v1/industry/purchase-orders/:orderId/delivery/proof`

**Description:** Upload proof of delivery document (e.g., signed delivery receipt, photos).

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| orderId | string | Yes | Unique purchase order identifier |

**Request Body:**

```typescript
{
  "actualDeliveryDate": "2024-04-18T14:30:00Z",
  "deliveredTo": "Jane Smith - Receiving Manager",
  "signature": {
    "id": "doc_signature_001",
    "name": "Delivery_Signature.pdf",
    "url": "https://storage.example.com/doc_signature_001.pdf",
    "size": 125000
  },
  "photos": [
    {
      "id": "photo_001",
      "name": "Package_Photo_1.jpg",
      "url": "https://storage.example.com/photo_001.jpg",
      "size": 512000
    },
    {
      "id": "photo_002",
      "name": "Package_Photo_2.jpg",
      "url": "https://storage.example.com/photo_002.jpg",
      "size": 487000
    }
  ],
  "notes": "Package delivered in excellent condition. Signed by receiving manager.",
  "condition": "excellent" // Enum: excellent, good, fair, damaged
}
```

**Validation:**
- Delivery status must be `delivered`
- `actualDeliveryDate` cannot be in the future
- At least one proof document (signature or photo) is required

**Response:** `200 OK`

```typescript
{
  "success": true,
  "data": {
    "id": "del_abc123",
    "status": "delivered",
    "actualDeliveryDate": "2024-04-18T14:30:00Z",
    "deliveredTo": "Jane Smith - Receiving Manager",
    "proofOfDelivery": {
      "signature": {
        "id": "doc_signature_001",
        "name": "Delivery_Signature.pdf",
        "url": "https://storage.example.com/doc_signature_001.pdf",
        "uploadedAt": "2024-04-18T15:00:00Z",
        "size": 125000
      },
      "photos": [
        {
          "id": "photo_001",
          "name": "Package_Photo_1.jpg",
          "url": "https://storage.example.com/photo_001.jpg",
          "uploadedAt": "2024-04-18T15:00:00Z",
          "size": 512000
        },
        {
          "id": "photo_002",
          "name": "Package_Photo_2.jpg",
          "url": "https://storage.example.com/photo_002.jpg",
          "uploadedAt": "2024-04-18T15:00:00Z",
          "size": 487000
        }
      ],
      "condition": "excellent"
    }
  },
  "message": "Proof of delivery uploaded successfully"
}
```

**Error Responses:**

- `400 Bad Request` - Invalid delivery status or missing required documents
- `404 Not Found` - Purchase order or delivery tracking not found
- `401 Unauthorized` - Missing or invalid authentication token
- `403 Forbidden` - User lacks permission to upload proof of delivery
- `413 Payload Too Large` - Document exceeds size limit (10MB per file)
- `500 Internal Server Error` - Server error

---

### 5. Get Delivery Timeline

**Endpoint:** `GET /api/v1/industry/purchase-orders/:orderId/delivery/timeline`

**Description:** Retrieve detailed delivery timeline with all tracking events.

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
    "currentStatus": "in_transit",
    "events": [
      {
        "id": "evt_001",
        "timestamp": "2024-04-10T09:00:00Z",
        "status": "picked_up",
        "location": "Silicon Valley, CA",
        "description": "Package picked up by carrier",
        "performedBy": "FedEx Driver - John D.",
        "coordinates": {
          "latitude": 37.3875,
          "longitude": -122.0575
        }
      },
      {
        "id": "evt_002",
        "timestamp": "2024-04-11T14:30:00Z",
        "status": "in_transit",
        "location": "FedEx Hub - Memphis, TN",
        "description": "Arrived at sorting facility",
        "performedBy": "System",
        "coordinates": {
          "latitude": 35.1495,
          "longitude": -90.0490
        }
      },
      {
        "id": "evt_003",
        "timestamp": "2024-04-13T08:15:00Z",
        "status": "in_transit",
        "location": "FedEx Hub - Newark, NJ",
        "description": "Package in transit",
        "performedBy": "System",
        "coordinates": {
          "latitude": 40.7357,
          "longitude": -74.1724
        }
      },
      {
        "id": "evt_004",
        "timestamp": "2024-04-15T10:30:00Z",
        "status": "out_for_delivery",
        "location": "New York, NY",
        "description": "Out for delivery",
        "performedBy": "FedEx Driver - Sarah M.",
        "coordinates": {
          "latitude": 40.7128,
          "longitude": -74.0060
        }
      }
    ],
    "summary": {
      "totalEvents": 4,
      "daysSinceShipped": 5,
      "estimatedDaysRemaining": 3,
      "onSchedule": true
    }
  }
}
```

**Error Responses:**

- `404 Not Found` - Purchase order or delivery tracking not found
- `401 Unauthorized` - Missing or invalid authentication token
- `500 Internal Server Error` - Server error

---

### 6. Report Delivery Issue

**Endpoint:** `POST /api/v1/industry/purchase-orders/:orderId/delivery/issue`

**Description:** Report a delivery issue or discrepancy (e.g., damaged package, missing items, delivery delay).

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| orderId | string | Yes | Unique purchase order identifier |

**Request Body:**

```typescript
{
  "issueType": "damaged", // Enum: damaged, missing_items, wrong_address, delayed, other
  "severity": "medium", // Enum: low, medium, high, critical
  "description": "Package arrived with visible damage to exterior. Contents appear intact but require inspection.",
  "reportedBy": "user_xyz123",
  "reportedDate": "2024-04-18T15:30:00Z",
  "photos": [
    {
      "id": "photo_damage_001",
      "name": "Damage_Photo_1.jpg",
      "url": "https://storage.example.com/photo_damage_001.jpg",
      "size": 625000
    }
  ],
  "requestedAction": "inspection", // Enum: inspection, replacement, refund, none
  "contactForResolution": true
}
```

**Response:** `200 OK`

```typescript
{
  "success": true,
  "data": {
    "issueId": "issue_001",
    "purchaseOrderId": "po_abc123",
    "issueType": "damaged",
    "severity": "medium",
    "status": "reported",
    "reportedBy": "user_xyz123",
    "reportedDate": "2024-04-18T15:30:00Z",
    "ticketNumber": "ISSUE-2024-001",
    "expectedResolutionDate": "2024-04-20T00:00:00Z"
  },
  "message": "Delivery issue reported successfully. Issue ticket created."
}
```

**Error Responses:**

- `400 Bad Request` - Invalid issue type or missing required fields
- `404 Not Found` - Purchase order not found
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
| 409 | Conflict - Delivery tracking already exists |
| 413 | Payload Too Large - Document exceeds size limit |
| 500 | Internal Server Error |

---

## Delivery Status Flow

```
pending → picked_up → in_transit → out_for_delivery → delivered
                              ↓
                          returned / cancelled
```

**Status Descriptions:**

- `pending` - Awaiting shipment
- `picked_up` - Package collected by carrier
- `in_transit` - Package in transit to destination
- `out_for_delivery` - Package out for final delivery
- `delivered` - Successfully delivered to recipient
- `returned` - Package returned to sender
- `cancelled` - Delivery cancelled

---

## Rate Limiting

- **Standard endpoints:** 100 requests per minute
- **Upload operations:** 20 requests per minute
- **Timeline tracking:** 200 requests per minute

---

## Best Practices

1. **Real-time Updates:** Update delivery status in real-time to provide accurate tracking information

2. **Proof of Delivery:** Always capture and upload proof of delivery documents for completed deliveries

3. **Tracking Integration:** Integrate with carrier tracking APIs for automated status updates

4. **Notification System:** Set up automated notifications for key delivery milestones

5. **Issue Reporting:** Report delivery issues immediately with photographic evidence

6. **Contact Information:** Keep delivery contact information current and accurate

7. **Timeline Documentation:** Document all delivery events for audit trail and dispute resolution

8. **Delivery Instructions:** Provide clear, detailed delivery instructions to avoid confusion

9. **Package Protection:** Specify signature requirements for high-value shipments

10. **Coordinate Tracking:** Use location coordinates for precise tracking when available

---

## Common Use Cases

### Tracking Shipment Progress

```typescript
// Get current delivery status
const delivery = await fetch(
  `/api/v1/industry/purchase-orders/${poId}/delivery`
);

// Check if on schedule
if (delivery.data.status === 'in_transit') {
  const daysRemaining = calculateDaysRemaining(
    delivery.data.estimatedDeliveryDate
  );
  
  if (daysRemaining < 0) {
    sendDelayAlert(delivery.data);
  }
}
```

### Processing Delivery Completion

```typescript
// 1. Update status to delivered
await fetch(
  `/api/v1/industry/purchase-orders/${poId}/delivery/update`,
  {
    method: 'POST',
    body: JSON.stringify({
      status: 'delivered',
      currentLocation: 'Customer Site',
      timestamp: new Date().toISOString()
    })
  }
);

// 2. Upload proof of delivery
await fetch(
  `/api/v1/industry/purchase-orders/${poId}/delivery/proof`,
  {
    method: 'POST',
    body: JSON.stringify({
      actualDeliveryDate: new Date().toISOString(),
      deliveredTo: 'Jane Smith',
      signature: signatureDocument,
      photos: deliveryPhotos,
      condition: 'excellent'
    })
  }
);

// 3. Mark related deliverables as delivered
await updateDeliverableStatus(poId, 'delivered');
```

### Reporting Delivery Issues

```typescript
// Report issue with evidence
const issue = await fetch(
  `/api/v1/industry/purchase-orders/${poId}/delivery/issue`,
  {
    method: 'POST',
    body: JSON.stringify({
      issueType: 'damaged',
      severity: 'high',
      description: 'Package arrived with significant damage',
      photos: damagePhotos,
      requestedAction: 'replacement',
      contactForResolution: true
    })
  }
);

// Track issue resolution
trackIssueResolution(issue.data.ticketNumber);
```

---

## Related APIs

- [Purchase Orders API](./purchase-orders-api.md)
- [Purchase Order Milestones API](./purchase-orders-milestones-api.md)
- [Purchase Order Invoices API](./purchase-orders-invoices-api.md)
