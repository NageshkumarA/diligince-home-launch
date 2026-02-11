# Backend API Specifications - All Listing Endpoints
## AI Search & Filter Metadata Enhancement

**Note:** AI Search Endpoint (POST /api/v1/search/ai) is **excluded** from this scope. The BE team will integrate with an external AI engine separately.

---

## Common Response Pattern

All listing endpoints MUST follow this response structure:

```json
{
  "success": true,
  "data": {
    "<items_key>": [...],
    "pagination": {
      "page": 1,
      "limit": 10,
      "totalItems": 100,
      "totalPages": 10
    },
    "filters": {
      "statusCounts": { ... },
      "<entity>s": [{ "id": "...", "name": "...", "count": 0 }]
    },
    "statistics": { ... }
  }
}
```

### Common Request Parameters (All Endpoints)

| Parameter | Type | Description |
|-----------|------|-------------|
| `search` | string | AI-powered search query (keyword match until AI engine ready) |
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 10) |
| `sortBy` | string | Sort field |
| `order` | 'asc'/'desc' | Sort direction |

---

## Industry Endpoints

### 1. Purchase Orders List

**Endpoint:** `GET /api/v1/industry/purchase-orders`

#### Additional Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | string | Filter by status |
| `vendorId` | string | Filter by vendor |
| `projectId` | string | Filter by project |
| `minValue` | number | Minimum total value |
| `maxValue` | number | Maximum total value |
| `startDateFrom` | date | Start date range (from) |
| `startDateTo` | date | Start date range (to) |

#### Response

```json
{
  "success": true,
  "data": {
    "purchaseOrders": [
      {
        "id": "po-123",
        "orderNumber": "PO-2025-001",
        "projectTitle": "Industrial Equipment Supply",
        "projectId": "proj-456",
        "vendorId": "v-789",
        "vendorName": "TechCorp Solutions",
        "totalValue": 75000,
        "currency": "INR",
        "status": "in_progress",
        "startDate": "2025-02-01",
        "endDate": "2025-05-01",
        "createdAt": "2025-01-15T10:30:00Z",
        "completionPercentage": 45,
        "milestonesCompleted": 2,
        "totalMilestones": 5
      }
    ],
    "pagination": { "page": 1, "limit": 10, "totalItems": 45, "totalPages": 5 },
    "filters": {
      "vendors": [
        { "id": "v1", "name": "TechCorp Solutions", "count": 15 }
      ],
      "projects": [
        { "id": "p1", "name": "Project Alpha", "count": 10 }
      ],
      "statusCounts": {
        "draft": 5, "pending_approval": 12, "approved": 8,
        "in_progress": 15, "completed": 20, "cancelled": 3
      },
      "valueRange": { "min": 1000, "max": 500000 }
    },
    "statistics": {
      "totalPending": 12, "totalInProgress": 15,
      "totalCompleted": 20, "totalValue": 2500000
    }
  }
}
```

---

### 2. Quotations List (Industry)

**Endpoint:** `GET /api/v1/industry/quotations`

#### Additional Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | string | pending_review/under_evaluation/approved/rejected |
| `requirementId` | string | Filter by requirement |
| `vendorId` | string | Filter by vendor |
| `minAmount` | number | Minimum quoted amount |
| `maxAmount` | number | Maximum quoted amount |
| `submittedFrom` | date | Submission date range (from) |
| `submittedTo` | date | Submission date range (to) |

#### Response

```json
{
  "success": true,
  "data": {
    "quotations": [...],
    "pagination": { ... },
    "filters": {
      "vendors": [{ "id": "v1", "name": "Vendor A", "count": 5 }],
      "requirements": [{ "id": "req-1", "title": "Equipment Procurement", "count": 8 }],
      "statusCounts": { "pending_review": 10, "under_evaluation": 5, "approved": 15, "rejected": 3 },
      "amountRange": { "min": 5000, "max": 250000 }
    },
    "statistics": { "totalPending": 10, "totalApproved": 15, "averageQuotedAmount": 45000 }
  }
}
```

---

### 3. Requirements List (All Status Pages)

**Endpoints:**
- `GET /api/v1/industry/requirements?status=draft`
- `GET /api/v1/industry/requirements?status=pending`
- `GET /api/v1/industry/requirements?status=approved`
- `GET /api/v1/industry/requirements?status=published`

#### Additional Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | string | draft/pending/approved/published |
| `category` | string | Filter by category |
| `priority` | string | Filter by priority |
| `createdById` | string | Filter by creator (user ID or 'me') |

#### Response

```json
{
  "success": true,
  "data": {
    "requirements": [...],
    "pagination": { ... },
    "filters": {
      "creators": [
        { "id": "user-1", "name": "John Doe", "email": "john@company.com" }
      ],
      "categories": [
        { "key": "IT Services", "count": 5 },
        { "key": "Construction", "count": 3 }
      ],
      "statusCounts": { "draft": 5, "pending": 12, "approved": 8, "published": 20 }
    },
    "statistics": {
      "totalDrafts": 5, "totalPending": 12,
      "totalApproved": 8, "totalPublished": 20
    }
  }
}
```

---

### 4. Team Members

**Endpoint:** `GET /api/v1/industry/team/members`

#### Additional Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `role` | string | Filter by role |
| `department` | string | Filter by department |
| `status` | string | Active/Inactive/Pending |

#### Response

```json
{
  "success": true,
  "data": {
    "members": [...],
    "pagination": { ... },
    "filters": {
      "roles": [{ "key": "Procurement Manager", "count": 3 }],
      "departments": [{ "key": "Operations", "count": 5 }],
      "statusCounts": { "Active": 15, "Inactive": 2, "Pending": 1 }
    }
  }
}
```

---

### 5. Documents

**Endpoint:** `GET /api/v1/industry/documents`

#### Additional Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | string | Requirements/Legal/Compliance/Vendor Management |
| `status` | string | Active/Archived/Draft |
| `fileType` | string | pdf/excel/word/image |

#### Response

```json
{
  "success": true,
  "data": {
    "documents": [...],
    "pagination": { ... },
    "filters": {
      "categories": [{ "key": "Requirements", "count": 10 }],
      "statusCounts": { "Active": 20, "Archived": 5, "Draft": 3 }
    }
  }
}
```

---

### 6. Approvals

**Endpoint:** `GET /api/v1/industry/approvals`

#### Additional Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `type` | string | Purchase Order/Vendor Approval/Contract Renewal/Budget Approval |
| `status` | string | Pending Review/Approved/Rejected/In Progress |
| `priority` | string | High/Medium/Low |
| `department` | string | Filter by department |

#### Response

```json
{
  "success": true,
  "data": {
    "approvals": [...],
    "pagination": { ... },
    "filters": {
      "types": [{ "key": "Purchase Order", "count": 10 }],
      "departments": [{ "key": "Procurement", "count": 5 }],
      "statusCounts": { "Pending Review": 12, "Approved": 20, "Rejected": 3 }
    }
  }
}
```

---

### 7. Active Workflows

**Endpoint:** `GET /api/v1/industry/workflows/active`

#### Additional Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | string | On Track/Pending Approval/Delayed/At Risk |
| `vendorId` | string | Filter by vendor |

#### Response

```json
{
  "success": true,
  "data": {
    "workflows": [...],
    "pagination": { ... },
    "filters": {
      "vendors": [{ "id": "v1", "name": "CloudTech Solutions", "count": 3 }],
      "statusCounts": { "On Track": 10, "Pending Approval": 5, "Delayed": 2, "At Risk": 1 }
    }
  }
}
```

---

### 8. Stakeholders - Professionals

**Endpoint:** `GET /api/v1/industry/stakeholders/professionals`

#### Additional Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `expertise` | string | Filter by expertise area |
| `status` | string | Available/Busy/On Leave |

#### Response

```json
{
  "success": true,
  "data": {
    "professionals": [...],
    "pagination": { ... },
    "filters": {
      "expertiseAreas": [{ "key": "Full Stack Development", "count": 5 }],
      "statusCounts": { "Available": 10, "Busy": 5, "On Leave": 2 }
    }
  }
}
```

---

### 9. Stakeholders - Vendors

**Endpoint:** `GET /api/v1/industry/stakeholders/vendors`

#### Additional Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `specialization` | string | Filter by specialization |
| `status` | string | Active/Inactive/Suspended |

#### Response

```json
{
  "success": true,
  "data": {
    "vendors": [...],
    "pagination": { ... },
    "filters": {
      "specializations": [{ "key": "Software Development", "count": 8 }],
      "statusCounts": { "Active": 15, "Inactive": 3, "Suspended": 1 }
    }
  }
}
```

---

## Vendor Endpoints

### 10. Vendor Purchase Orders

**Endpoint:** `GET /api/v1/vendors/purchase-orders`

#### Additional Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | string | sent/accepted/rejected/in_progress/completed |
| `industryId` | string | Filter by industry (sender) |
| `minValue` | number | Minimum value |
| `maxValue` | number | Maximum value |

#### Response

```json
{
  "success": true,
  "data": {
    "purchaseOrders": [
      {
        "id": "po-123",
        "orderNumber": "PO-2025-001",
        "projectTitle": "Industrial Equipment Supply",
        "industryName": "Acme Industries",
        "industryId": "ind-456",
        "totalValue": 75000,
        "currency": "INR",
        "status": "sent",
        "receivedAt": "2025-02-01T10:30:00Z",
        "responseDeadline": "2025-02-10T23:59:59Z",
        "startDate": "2025-02-15",
        "endDate": "2025-05-15",
        "milestonesCount": 4
      }
    ],
    "pagination": { ... },
    "filters": {
      "industries": [{ "id": "ind-456", "name": "Acme Industries", "count": 5 }],
      "statusCounts": { "sent": 3, "accepted": 10, "in_progress": 7, "completed": 15 }
    },
    "statistics": {
      "totalReceived": 35, "pendingResponse": 3,
      "activeOrders": 7, "completedValue": 1200000
    }
  }
}
```

---

### 11. Vendor Quotations

**Endpoint:** `GET /api/v1/vendors/quotations`

#### Additional Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | string | draft/submitted/under_review/accepted/rejected |
| `rfqId` | string | Filter by RFQ |
| `industryId` | string | Filter by industry |

#### Response

```json
{
  "success": true,
  "data": {
    "quotations": [...],
    "pagination": { ... },
    "filters": {
      "industries": [{ "id": "ind-1", "name": "Acme Industries", "count": 5 }],
      "rfqs": [{ "id": "rfq-1", "title": "Equipment Supply", "count": 3 }],
      "statusCounts": { "draft": 2, "submitted": 10, "under_review": 5, "accepted": 15, "rejected": 3 }
    },
    "statistics": { "totalSubmitted": 25, "totalAccepted": 15, "totalValue": 2500000, "successRate": 60 }
  }
}
```

---

### 12. Vendor RFQs - Browse

**Endpoint:** `GET /api/v1/vendors/rfqs/browse`

#### Additional Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | string | Filter by category |
| `status` | string | open/closing_soon |
| `aiRecommended` | boolean | Filter AI-recommended RFQs |

---

### 13. Vendor RFQs - Applied

**Endpoint:** `GET /api/v1/vendors/rfqs/applied`

#### Additional Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | string | Filter by application status |

---

### 14. Vendor RFQs - Saved

**Endpoint:** `GET /api/v1/vendors/rfqs/saved`

No additional filters beyond common parameters.

---

### 15. Vendor Team Members

**Endpoint:** `GET /api/v1/vendors/team/members`

#### Additional Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `role` | string | Filter by role ID |
| `status` | string | active/suspended/pending_verification |

#### Response

```json
{
  "success": true,
  "data": {
    "members": [...],
    "pagination": { ... },
    "filters": {
      "roles": [{ "id": "role-1", "name": "Admin", "count": 2 }],
      "statusCounts": { "active": 10, "suspended": 1, "pending_verification": 2 }
    },
    "statistics": {
      "totalMembers": 13, "activeMembers": 10,
      "pendingVerification": 2, "suspended": 1
    }
  }
}
```

---

## Professional Endpoints

### 16. Certifications

**Endpoint:** `GET /api/v1/professionals/certifications`

#### Additional Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | string | Cloud Computing/Project Management/DevOps |
| `level` | string | Foundation/Intermediate/Advanced/Professional |
| `status` | string | Active/Expiring Soon/Expired |

#### Response

```json
{
  "success": true,
  "data": {
    "certifications": [...],
    "pagination": { ... },
    "filters": {
      "categories": [{ "key": "Cloud Computing", "count": 5 }],
      "levels": [{ "key": "Professional", "count": 3 }],
      "statusCounts": { "Active": 10, "Expiring Soon": 2, "Expired": 1 }
    }
  }
}
```

---

## Implementation Notes for Backend Team

1. **`search` parameter**: Should support keyword matching across all relevant text fields (names, titles, IDs, descriptions). This will later be replaced by the AI Search engine results.
2. **Filter metadata** should be computed from the full dataset, not just the current page.
3. **StatusCounts** should reflect counts for ALL statuses, regardless of current filter.
4. **Entity lists** (vendors, industries, etc.) should only include entities with at least 1 record.
5. **ValueRange/AmountRange** should reflect min/max across the entire dataset.

## Implementation Priority

| # | Endpoint | Priority |
|---|----------|----------|
| 1 | Industry PO List | High |
| 2 | Vendor PO List | High |
| 3 | Industry Quotations | High |
| 4 | Vendor Quotations | High |
| 5 | Requirements (all statuses) | Medium |
| 6 | Vendor Team Members | Medium |
| 7 | Team Members | Medium |
| 8 | Approvals | Medium |
| 9 | Documents | Low |
| 10 | Workflows | Low |
| 11 | Stakeholders | Low |
| 12 | Professional Certifications | Low |
| 13-14 | Vendor RFQs (Browse/Applied/Saved) | Low |
