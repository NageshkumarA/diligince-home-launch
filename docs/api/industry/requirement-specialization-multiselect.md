# Requirement Specialization Multi-Select API Documentation

## Overview

This document outlines the backend changes required to support multi-select specialization field in the Create Requirement form. The specialization dropdown now fetches options from the existing `/public/dropdown-options` API based on the selected requirement category.

## Frontend Changes (Already Implemented)

1. **Type Update**: `specialization` field changed from `string` to `string[]`
2. **UI Update**: Single-select dropdown replaced with multi-select searchable dropdown
3. **API Integration**: Uses existing `useDropdownOptions` hook with category-to-module mapping
4. **"Urgent Requirement" Toggle**: Hidden from Advanced Options

### Category to Module Mapping

| Requirement Category | Dropdown Module | API Call |
|---------------------|-----------------|----------|
| Expert Services | `expert` | `GET /api/v1/public/dropdown-options?module=expert&category=specialization` |
| Products & Materials | `productVendor` | `GET /api/v1/public/dropdown-options?module=productVendor&category=specialization` |
| Contract Services | `serviceVendor` | `GET /api/v1/public/dropdown-options?module=serviceVendor&category=specialization` |
| Logistics & Transport | `logisticsVendor` | `GET /api/v1/public/dropdown-options?module=logisticsVendor&category=specialization` |

---

## Backend Changes Required

### 1. Update Requirements Schema

**Collection:** `requirements`

```javascript
// Change from:
specialization: { type: String }

// To:
specialization: { 
  type: [String], 
  default: [] 
}
```

### 2. Migration Script

Run this migration to convert existing string values to arrays:

```javascript
// MongoDB Migration Script

// Step 1: Convert existing string specialization values to arrays
db.requirements.updateMany(
  { 
    specialization: { $exists: true, $type: "string" } 
  },
  [
    {
      $set: {
        specialization: {
          $cond: {
            if: { $or: [{ $eq: ["$specialization", ""] }, { $eq: ["$specialization", null] }] },
            then: [],
            else: ["$specialization"]
          }
        }
      }
    }
  ]
);

// Step 2: Set empty array for documents without specialization field
db.requirements.updateMany(
  { specialization: { $exists: false } },
  { $set: { specialization: [] } }
);

// Step 3: Verify migration
print("Total requirements: " + db.requirements.countDocuments());
print("Requirements with array specialization: " + db.requirements.countDocuments({ specialization: { $type: "array" } }));
print("Requirements with non-empty specialization: " + db.requirements.countDocuments({ specialization: { $ne: [] } }));
```

### 3. API Endpoint Updates

#### Create/Update Requirement Endpoints

**POST** `/api/v1/industry/requirements` (Create)
**PATCH** `/api/v1/industry/requirements/:id` (Update)

The `specialization` field in request body should now accept an array of strings:

```json
{
  "title": "Requirement Title",
  "category": "expert",
  "specialization": ["mechanical-engineering", "automation-controls"],
  ...
}
```

#### Joi Validation Update

```javascript
// Update validation schema
specialization: Joi.array().items(Joi.string()).default([])
```

### 4. Seed Data for `master_dropdowns` Collection

Ensure specialization options exist for all modules:

```javascript
// Sample seed data structure
const specializationSeeds = [
  // Expert specializations
  { module: "expert", category: "specialization", label: "Mechanical Engineering", value: "mechanical-engineering", isActive: true },
  { module: "expert", category: "specialization", label: "Electrical Engineering", value: "electrical-engineering", isActive: true },
  { module: "expert", category: "specialization", label: "Process Engineering", value: "process-engineering", isActive: true },
  { module: "expert", category: "specialization", label: "Automation & Controls", value: "automation-controls", isActive: true },
  { module: "expert", category: "specialization", label: "Safety Engineering", value: "safety-engineering", isActive: true },
  
  // Service Vendor specializations
  { module: "serviceVendor", category: "specialization", label: "Maintenance Services", value: "maintenance-services", isActive: true },
  { module: "serviceVendor", category: "specialization", label: "Construction Services", value: "construction-services", isActive: true },
  { module: "serviceVendor", category: "specialization", label: "Installation Services", value: "installation-services", isActive: true },
  { module: "serviceVendor", category: "specialization", label: "Calibration Services", value: "calibration-services", isActive: true },
  
  // Product Vendor specializations
  { module: "productVendor", category: "specialization", label: "Industrial Equipment", value: "industrial-equipment", isActive: true },
  { module: "productVendor", category: "specialization", label: "Spare Parts", value: "spare-parts", isActive: true },
  { module: "productVendor", category: "specialization", label: "Raw Materials", value: "raw-materials", isActive: true },
  { module: "productVendor", category: "specialization", label: "Chemicals", value: "chemicals", isActive: true },
  
  // Logistics Vendor specializations
  { module: "logisticsVendor", category: "specialization", label: "Heavy Equipment Transport", value: "heavy-equipment-transport", isActive: true },
  { module: "logisticsVendor", category: "specialization", label: "Hazardous Materials", value: "hazardous-materials", isActive: true },
  { module: "logisticsVendor", category: "specialization", label: "Temperature Controlled", value: "temperature-controlled", isActive: true },
  { module: "logisticsVendor", category: "specialization", label: "Express Delivery", value: "express-delivery", isActive: true },
];
```

---

## Testing Checklist

### Backend Testing
- [ ] Migration script runs without errors
- [ ] Existing requirements preserve their specialization data (as single-element arrays)
- [ ] New requirements accept `specialization` as array
- [ ] GET endpoints return `specialization` as array
- [ ] `/public/dropdown-options` returns data for all 4 modules with `specialization` category

### API Response Format

**GET** `/api/v1/public/dropdown-options?module=expert&category=specialization`

```json
{
  "success": true,
  "data": {
    "options": [
      { "id": "1", "label": "Mechanical Engineering", "value": "mechanical-engineering" },
      { "id": "2", "label": "Electrical Engineering", "value": "electrical-engineering" },
      { "id": "3", "label": "Process Engineering", "value": "process-engineering" }
    ],
    "total": 3
  }
}
```

---

## Estimated Backend Effort

| Task | Hours |
|------|-------|
| Schema update | 0.5h |
| Migration script | 1h |
| Validation updates | 0.5h |
| Seed data (if missing) | 1h |
| Testing | 1h |
| **Total** | **4h** |

---

## Notes

- The `/public/dropdown-options` API endpoint already exists and is used by vendor/professional signup forms
- Frontend uses `useDropdownOptions` hook which handles caching (5 min stale time)
- No breaking changes to existing API structure - only field type change from string to array
- "Urgent Requirement" toggle has been hidden from the UI (no backend changes needed)
