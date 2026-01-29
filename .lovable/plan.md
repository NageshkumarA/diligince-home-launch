
# Implementation Plan: Approved Quotations & PO Form Enhancements

---

## Overview

This plan addresses three user requests:
1. Fix requirement ID display in Approved Quotations (showing hash instead of human-readable ID)
2. Restrict "Create PO" menu item to be accessible only from Approved Quotations
3. Add file upload support to Acceptance Criteria form section

---

## Issue 1: Requirement ID Displaying Hash

### Current Behavior
The "Requirement" column in `QuotationsApproved.tsx` displays `q.requirementId` which is a MongoDB ObjectId (e.g., `#695c0638f0e6a8d036356fdb`).

### Root Cause
The API returns `requirementId` (database ID) but no human-readable requirement number.

### Solution Options

| Option | Approach | Frontend Work | Backend Work |
|--------|----------|---------------|--------------|
| A | Display `requirementTitle` instead of ID | Change column data mapping | None |
| B | Request `requirementNumber` from backend | Add new field to column | Add to API response |
| C | Truncate hash and show title on hover | UI enhancement | None |

### Recommended: Option B (with fallback to A)

**Frontend Changes:**
- Update `QuotationsApproved.tsx` column to display `requirementNumber` if available, fallback to `requirementTitle`
- Add tooltip showing full requirement title

**Files to Modify:**
- `src/pages/QuotationsApproved.tsx`

**Backend Requirement (see Backend Tasks section):**
- Add `requirementNumber` field to quotation response

---

## Issue 2: Restrict "Create PO" Menu Access

### Current Behavior
"Create PO" is accessible directly from sidebar, but it requires a `quotationId` parameter to function properly.

### Solution
Make the menu item visually distinct and non-clickable, with a tooltip explaining the access path.

### Implementation

**File: `src/config/menuConfig.ts`**
Add a `restricted` flag to the menu item:

```typescript
{
  icon: Plus,
  label: "Create PO",
  path: "/dashboard/create-purchase-order",
  restricted: true,
  restrictedReason: "Create PO from Approved Quotations",
}
```

**File: `src/components/Sidebar.tsx`**
Handle restricted menu items with:
- Grayed out appearance
- Tooltip with explanation
- Prevent navigation on click

**Visual Treatment:**
```text
┌──────────────────────────────┐
│ 📋 Purchase Orders      ▼   │
├──────────────────────────────┤
│   + Create PO    (grayed)   │  ← Shows tooltip: "Access from Approved Quotations"
│   ☰ All Orders              │
│   ⏱ Pending                 │
│   ⚡ In Progress            │
│   ✓ Completed               │
└──────────────────────────────┘
```

**Files to Modify:**
- `src/config/menuConfig.ts` - Add interface for restricted flag
- `src/components/Sidebar.tsx` - Handle restricted menu items

---

## Issue 3: File Upload for Acceptance Criteria

### Current Behavior
Each acceptance criteria entry only has a text input field.

### Solution
Add file upload capability to each criteria item, similar to SOW documents.

### Schema Update

**File: `src/schemas/purchase-order-form.schema.ts`**

```typescript
acceptanceCriteria: z.array(z.object({
  id: z.string().optional(),
  criteria: z.string().min(1, "Criteria is required"),
  documents: z.array(sowDocumentSchema).optional() // New field
})).min(1, "At least one acceptance criteria is required")
```

### Component Update

**File: `src/components/purchase-order/forms/POFormAcceptanceCriteria.tsx`**

Add collapsible file upload section per criteria:

```text
┌────────────────────────────────────────────────────────────┐
│  Acceptance Criteria                       + Add Criteria  │
│  Define criteria for work acceptance                       │
├────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────┐ │
│  │ 1 │ [Criteria text input...........................]  │🗑│
│  │   ├──────────────────────────────────────────────────┤ │
│  │   │ 📎 Attach Documents (Optional)          ▼       │ │
│  │   │ ┌─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐       │ │
│  │   │ │ Drag & drop or browse                 │       │ │
│  │   │ └─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘       │ │
│  └───┴──────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────┘
```

**Implementation Approach:**
1. Create `AcceptanceCriteriaDocUpload.tsx` - lightweight file upload for each criteria
2. Add collapsible section for document attachment
3. Manage files per criteria entry

**Files to Modify:**
- `src/schemas/purchase-order-form.schema.ts`
- `src/components/purchase-order/forms/POFormAcceptanceCriteria.tsx`
- `src/services/modules/purchase-orders/purchase-orders.types.ts`

---

## Files to Modify Summary

| File | Changes |
|------|---------|
| `src/pages/QuotationsApproved.tsx` | Update requirement column to show title/number instead of hash |
| `src/config/menuConfig.ts` | Add `restricted` flag and interface updates |
| `src/components/Sidebar.tsx` | Handle restricted menu items (styling + tooltip + click prevention) |
| `src/schemas/purchase-order-form.schema.ts` | Add `documents` array to acceptance criteria schema |
| `src/components/purchase-order/forms/POFormAcceptanceCriteria.tsx` | Add file upload per criteria item |
| `src/services/modules/purchase-orders/purchase-orders.types.ts` | Add documents to AcceptanceCriteria type |

---

## Backend Tasks Document

### Required Backend Changes

#### 1. Add Requirement Number to Quotation Response

**Endpoint:** `GET /api/v1/industry/quotations/approved`

**Current Response:**
```json
{
  "quotations": [{
    "id": "...",
    "requirementId": "695c0638f0e6a8d036356fdb",
    "requirementTitle": "Testing",
    ...
  }]
}
```

**Required Response:**
```json
{
  "quotations": [{
    "id": "...",
    "requirementId": "695c0638f0e6a8d036356fdb",
    "requirementNumber": "REQ-2026-01-0042",  // New field
    "requirementTitle": "Testing",
    ...
  }]
}
```

**Backend Implementation:**
- Join/populate requirement data to include the human-readable `requirementNumber` field
- Apply to all quotation list endpoints: `/pending`, `/approved`, `/all`

**Estimated Effort:** 1-2 hours

---

#### 2. Support Documents in Acceptance Criteria

**Endpoint:** `POST /api/v1/industry/purchase-orders`

**Current Request Body (acceptanceCriteria):**
```json
{
  "acceptanceCriteria": [
    { "criteria": "Criteria text" }
  ]
}
```

**Updated Request Body:**
```json
{
  "acceptanceCriteria": [
    {
      "criteria": "Criteria text",
      "documents": [
        {
          "name": "specification.pdf",
          "size": 102400,
          "type": "application/pdf",
          "url": "https://storage.example.com/..." 
        }
      ]
    }
  ]
}
```

**Backend Implementation:**
1. Update Joi/Zod validation schema to accept optional `documents` array
2. Store document references in acceptance_criteria collection/table
3. Return documents in GET response

**Database Schema Update:**
```javascript
// MongoDB example
{
  criteria: String,
  documents: [{
    name: String,
    size: Number,
    type: String,
    url: String,
    uploadedAt: Date
  }],
  status: { type: String, enum: ['pending', 'met', 'failed'] }
}
```

**Estimated Effort:** 2-3 hours

---

#### 3. File Upload Endpoint for Acceptance Criteria Documents

**New Endpoint:** `POST /api/v1/industry/purchase-orders/:orderId/acceptance-criteria/:criteriaId/documents`

**Request:** Multipart form-data with file

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "doc_123",
    "name": "requirement_spec.pdf",
    "size": 102400,
    "type": "application/pdf",
    "url": "https://storage.example.com/...",
    "uploadedAt": "2026-01-29T10:00:00Z"
  }
}
```

**Alternative:** Use existing upload endpoint if available, store URL reference in criteria

**Estimated Effort:** 2-3 hours

---

### Backend Summary

| Task | Priority | Estimated Time |
|------|----------|----------------|
| Add `requirementNumber` to quotation responses | High | 1-2 hours |
| Update acceptance criteria schema for documents | Medium | 2-3 hours |
| Create/reuse file upload for criteria documents | Medium | 2-3 hours |
| **Total** | | **5-8 hours** |

---

## Implementation Sequence

1. **Phase 1 - Quick Wins (Frontend only)**
   - Update requirement column to show `requirementTitle` as fallback
   - Add restricted styling to "Create PO" menu item

2. **Phase 2 - Acceptance Criteria Enhancement**
   - Update schema with documents field
   - Enhance POFormAcceptanceCriteria component with file upload

3. **Phase 3 - Backend Integration**
   - Integrate `requirementNumber` when backend provides it
   - Wire up document upload for acceptance criteria
