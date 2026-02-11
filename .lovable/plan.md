

# Unified AI Search Bar & Table Search Cleanup Plan
## All Listing Pages Across All User Types

---

## Overview

This plan standardizes search across every listing page in the application by:
1. Updating the shared `AISearchBar` component to only trigger search on clicking the search icon (removing auto-debounce)
2. Adding the `AISearchBar` to every listing page that is missing it
3. Hiding the built-in search in `CustomTable` on all pages (`hideSearch={true}`)
4. Consolidating the two duplicate `AISearchBar` components into one shared component
5. Preparing a backend API specification document for all listing endpoints

---

## Part 1: AISearchBar Component Update

### Problem
Currently the `AISearchBar` has a debounced auto-search that fires after 500ms of typing. The user wants search to only trigger when clicking the search icon or pressing Enter.

### Changes to `src/components/shared/AISearchBar.tsx`
- Remove the debounced `useEffect` that auto-triggers `onChange`
- Keep the `handleSubmit` (Enter key / button click) as the only trigger
- Add a subtle "AI-powered" label text next to the Sparkles icon for clearer AI indication
- Maintain corporate minimal styling

### Consolidation
There are two identical `AISearchBar` components:
- `src/components/shared/AISearchBar.tsx` (used by Industry pages)
- `src/components/vendor/shared/AISearchBar.tsx` (used by Vendor pages)

Both are functionally identical. Update the shared one and redirect vendor imports to use `@/components/shared/AISearchBar`.

---

## Part 2: Full Audit of All Listing Pages

### Pages Already Using AISearchBar (need `hideSearch={true}` on CustomTable)

| Page | User Type | AISearchBar | CustomTable hideSearch | Action Needed |
|------|-----------|-------------|----------------------|---------------|
| `IndustryPurchaseOrders.tsx` | Industry | Yes | No | Add `hideSearch` |
| `PurchaseOrdersPending.tsx` | Industry | Yes | No | Add `hideSearch` |
| `PurchaseOrdersInProgress.tsx` | Industry | Yes | No | Add `hideSearch` |
| `PurchaseOrdersCompleted.tsx` | Industry | Yes | No | Add `hideSearch` |
| `IndustryQuotes.tsx` | Industry | Yes | Yes | Done |
| `QuotationsForRequirement.tsx` | Industry | Yes | Check | Add `hideSearch` |
| `QuotationsPending.tsx` | Industry | Yes | No | Add `hideSearch` |
| `QuotationsApproved.tsx` | Industry | Yes | No | Add `hideSearch` |
| `VendorQuotations.tsx` | Vendor | Yes | Yes | Done |
| `VendorRFQsBrowse.tsx` | Vendor | Yes | N/A (card view) | OK |
| `VendorRFQsApplied.tsx` | Vendor | Yes | N/A (card view) | OK |

### Pages MISSING AISearchBar (need AISearchBar + hideSearch)

| Page | User Type | Current Search | Action |
|------|-----------|----------------|--------|
| `RequirementsDrafts.tsx` | Industry | Manual Input + CustomTable | Add AISearchBar, remove inline Input, add `hideSearch` |
| `RequirementsApproved.tsx` | Industry | CustomTable built-in | Add AISearchBar, add `hideSearch` |
| `RequirementsPending.tsx` | Industry | CustomTable built-in | Add AISearchBar, add `hideSearch` |
| `RequirementsPublished.tsx` | Industry | CustomTable built-in | Add AISearchBar, add `hideSearch` |
| `IndustryTeam.tsx` | Industry | CustomTable built-in | Add AISearchBar, add `hideSearch` |
| `IndustryApprovals.tsx` | Industry | CustomTable built-in | Add AISearchBar, add `hideSearch` |
| `IndustryDocuments.tsx` | Industry | CustomTable built-in | Add AISearchBar, add `hideSearch` |
| `WorkflowsActive.tsx` | Industry | CustomTable built-in | Add AISearchBar, add `hideSearch` |
| `StakeholdersProfessionals.tsx` | Industry | CustomTable built-in | Add AISearchBar, add `hideSearch` |
| `StakeholdersVendors.tsx` | Industry | CustomTable built-in | Add AISearchBar, add `hideSearch` |
| `VendorTeamMembers.tsx` | Vendor | Manual Input | Replace with AISearchBar |
| `VendorRFQsSaved.tsx` | Vendor | None | Add AISearchBar |
| `ProfessionalCertifications.tsx` | Professional | CustomTable built-in | Add AISearchBar, add `hideSearch` |

---

## Part 3: Implementation Details Per Page

### 3.1 AISearchBar Component Changes

**File:** `src/components/shared/AISearchBar.tsx`

```tsx
// Remove debounced auto-search effect
// Keep only form submit (Enter key + search button click)
// Add "AI-powered" indicator text
```

### 3.2 Industry Pages - Requirements Module

**Files:** `RequirementsDrafts.tsx`, `RequirementsApproved.tsx`, `RequirementsPending.tsx`, `RequirementsPublished.tsx`

For each:
1. Import `AISearchBar` from `@/components/shared/AISearchBar`
2. Add `AISearchBar` above the CustomTable
3. Remove inline search Input (in RequirementsDrafts)
4. Add `hideSearch={true}` to CustomTable
5. Wire `onChange` to set searchTerm and reset pagination
6. Keep existing filter dropdowns (CreatorFilterDropdown) as-is

### 3.3 Industry Pages - Team, Approvals, Documents, Workflows, Stakeholders

**Files:** `IndustryTeam.tsx`, `IndustryApprovals.tsx`, `IndustryDocuments.tsx`, `WorkflowsActive.tsx`, `StakeholdersProfessionals.tsx`, `StakeholdersVendors.tsx`

For each:
1. Import `AISearchBar`
2. Add `AISearchBar` above CustomTable
3. Add `hideSearch={true}` to CustomTable
4. Wire search state

### 3.4 Industry Pages - PO and Quotations (already have AISearchBar)

**Files:** `IndustryPurchaseOrders.tsx`, `PurchaseOrdersPending.tsx`, `PurchaseOrdersInProgress.tsx`, `PurchaseOrdersCompleted.tsx`, `QuotationsPending.tsx`, `QuotationsApproved.tsx`, `QuotationsForRequirement.tsx`

For each:
1. Add `hideSearch={true}` to CustomTable (if not already set)

### 3.5 Vendor Pages

**`VendorTeamMembers.tsx`:**
- Replace the manual `<Input>` search with `AISearchBar`
- Keep existing Role and Status filter dropdowns

**`VendorRFQsSaved.tsx`:**
- Add `AISearchBar` above the card grid

**`VendorQuotations.tsx`, `VendorRFQsBrowse.tsx`, `VendorRFQsApplied.tsx`:**
- Update imports from `@/components/vendor/shared/AISearchBar` to `@/components/shared/AISearchBar`

### 3.6 Professional Pages

**`ProfessionalCertifications.tsx`:**
- Add `AISearchBar` above CustomTable
- Add `hideSearch={true}` to CustomTable

---

## Part 4: Backend API Specification Document

Create/update `docs/backend-api-specifications.md` with comprehensive listing endpoint specifications for all modules. This document will cover:

### Industry Endpoints

**1. Requirements List Endpoints**
- `GET /api/v1/industry/requirements/drafts`
- `GET /api/v1/industry/requirements/pending`
- `GET /api/v1/industry/requirements/approved`
- `GET /api/v1/industry/requirements/published`

Add `search` parameter to all. Response should include `filters` metadata.

**2. Purchase Orders Endpoints** (already documented)
- `GET /api/v1/industry/purchase-orders`

**3. Quotations Endpoints** (already documented)
- `GET /api/v1/industry/quotations`

**4. Team Endpoint**
- `GET /api/v1/industry/team/members`
  - Parameters: `search`, `role`, `department`, `status`, `page`, `limit`

**5. Documents Endpoint**
- `GET /api/v1/industry/documents`
  - Parameters: `search`, `category`, `status`, `fileType`, `page`, `limit`

**6. Approvals Endpoint**
- `GET /api/v1/industry/approvals`
  - Parameters: `search`, `type`, `status`, `priority`, `department`, `page`, `limit`

**7. Workflows Endpoint**
- `GET /api/v1/industry/workflows/active`
  - Parameters: `search`, `status`, `vendor`, `page`, `limit`

**8. Stakeholders Endpoints**
- `GET /api/v1/industry/stakeholders/professionals`
  - Parameters: `search`, `expertise`, `status`, `page`, `limit`
- `GET /api/v1/industry/stakeholders/vendors`
  - Parameters: `search`, `specialization`, `status`, `page`, `limit`

### Vendor Endpoints

**1. Quotations** (already documented)
- `GET /api/v1/vendors/quotations`

**2. RFQs**
- `GET /api/v1/vendors/rfqs/browse` - Parameters: `search`, `category`, `status`, `page`, `limit`
- `GET /api/v1/vendors/rfqs/applied` - Parameters: `search`, `status`, `page`, `limit`
- `GET /api/v1/vendors/rfqs/saved` - Parameters: `search`, `page`, `limit`

**3. Team**
- `GET /api/v1/vendors/team/members` - Parameters: `search`, `role`, `status`, `page`, `limit`

### Professional Endpoints

**1. Certifications**
- `GET /api/v1/professionals/certifications`
  - Parameters: `search`, `category`, `level`, `status`, `page`, `limit`

### Common Response Pattern for All Endpoints

All listing endpoints should follow this response structure:

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

---

## Part 5: Files to Modify (Summary)

| # | File | Change Type |
|---|------|-------------|
| 1 | `src/components/shared/AISearchBar.tsx` | Update: remove debounce, add AI label |
| 2 | `src/pages/RequirementsDrafts.tsx` | Add AISearchBar, remove inline Input, add hideSearch |
| 3 | `src/pages/RequirementsApproved.tsx` | Add AISearchBar, add hideSearch |
| 4 | `src/pages/RequirementsPending.tsx` | Add AISearchBar, add hideSearch |
| 5 | `src/pages/RequirementsPublished.tsx` | Add AISearchBar, add hideSearch |
| 6 | `src/pages/IndustryTeam.tsx` | Add AISearchBar, add hideSearch |
| 7 | `src/pages/IndustryApprovals.tsx` | Add AISearchBar, add hideSearch |
| 8 | `src/pages/IndustryDocuments.tsx` | Add AISearchBar, add hideSearch |
| 9 | `src/pages/WorkflowsActive.tsx` | Add AISearchBar, add hideSearch |
| 10 | `src/pages/StakeholdersProfessionals.tsx` | Add AISearchBar, add hideSearch |
| 11 | `src/pages/StakeholdersVendors.tsx` | Add AISearchBar, add hideSearch |
| 12 | `src/pages/IndustryPurchaseOrders.tsx` | Add hideSearch to CustomTable |
| 13 | `src/pages/PurchaseOrdersPending.tsx` | Add hideSearch to CustomTable |
| 14 | `src/pages/PurchaseOrdersInProgress.tsx` | Add hideSearch to CustomTable |
| 15 | `src/pages/PurchaseOrdersCompleted.tsx` | Add hideSearch to CustomTable |
| 16 | `src/pages/QuotationsPending.tsx` | Add hideSearch to CustomTable |
| 17 | `src/pages/QuotationsApproved.tsx` | Add hideSearch to CustomTable |
| 18 | `src/pages/QuotationsForRequirement.tsx` | Add hideSearch to CustomTable |
| 19 | `src/pages/VendorTeamMembers.tsx` | Replace inline Input with AISearchBar |
| 20 | `src/pages/VendorRFQsSaved.tsx` | Add AISearchBar |
| 21 | `src/pages/VendorQuotations.tsx` | Update import to shared AISearchBar |
| 22 | `src/pages/VendorRFQsBrowse.tsx` | Update import to shared AISearchBar |
| 23 | `src/pages/VendorRFQsApplied.tsx` | Update import to shared AISearchBar |
| 24 | `src/pages/ProfessionalCertifications.tsx` | Add AISearchBar, add hideSearch |
| 25 | `docs/backend-api-specifications.md` | Update with all listing endpoint specs |

**Total: 25 files**

---

## Implementation Sequence

1. Update `AISearchBar` component (remove debounce, search on click only, add AI indicator)
2. Update all Industry pages (PO, Quotations, Requirements, Team, etc.)
3. Update all Vendor pages
4. Update Professional pages
5. Consolidate vendor AISearchBar imports to shared component
6. Update backend API specification document

