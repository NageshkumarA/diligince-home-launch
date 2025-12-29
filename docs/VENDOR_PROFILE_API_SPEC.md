# Vendor Profile API Specification

This document defines the API contract between the frontend and backend for vendor profile management.

---

## Base URL

```
/api/v1/vendors
```

---

## Endpoints

### 1. Get Vendor Profile

**GET** `/profile`

#### Response (Expected Structure)

```json
{
  "id": "uuid",
  "userId": "uuid",
  "vendorType": "service" | "product",
  "companyName": "Company Name",
  "description": "Company description",
  "email": "contact@company.com",
  "mobile": "+91 9876543210",
  "website": "https://company.com",
  "address": "123 Business Street",
  "city": "Mumbai",
  "state": "Maharashtra",
  "pincode": "400001",
  "panNumber": "ABCDE1234F",
  "gstNumber": "22ABCDE1234F1Z5",
  "industryFocus": ["technology", "healthcare"],
  "companySize": "51-200",
  "foundedYear": 2015,
  "documents": [
    {
      "id": "doc-uuid",
      "type": "pan_card",
      "name": "PAN Card",
      "url": "https://storage.example.com/documents/pan-card.pdf",
      "status": "verified" | "pending" | "rejected",
      "uploadedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "verificationStatus": "pending" | "verified" | "rejected",
  "profileCompleteness": 75,
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

#### Current Backend Issues (Frontend Normalizer Handles These)

| Issue | Current Backend | Expected |
|-------|-----------------|----------|
| Profile wrapper | `{ profile: { ... } }` | `{ ... }` (flat) |
| Contact info | `{ contactInfo: { email, mobile } }` | `{ email, mobile }` (flat) |
| Business registration | `{ businessRegistration: { panNumber, gstNumber } }` | `{ panNumber, gstNumber }` (flat) |
| Documents array | `verificationDocuments` | `documents` |
| Document type field | `fileType` | `type` |
| Document URLs | Relative paths | Full URLs |

---

### 2. Update Vendor Profile

**POST** `/profile`

#### Request Body

```json
{
  "companyName": "Updated Company Name",
  "description": "Updated description",
  "email": "new@company.com",
  "mobile": "+91 9876543210",
  "website": "https://company.com",
  "address": "456 New Street",
  "city": "Delhi",
  "state": "Delhi",
  "pincode": "110001",
  "panNumber": "ABCDE1234F",
  "gstNumber": "22ABCDE1234F1Z5",
  "industryFocus": ["technology", "fintech"],
  "companySize": "201-500"
}
```

#### Response

Returns the updated profile in the same format as GET `/profile`.

---

### 3. Upload Document

**POST** `/profile/documents/upload`

#### Request

- **Content-Type**: `multipart/form-data`
- **Fields**:
  - `file`: The document file (PDF, JPG, PNG)
  - `type`: Document type (`pan_card`, `gst_certificate`, `incorporation_certificate`, `bank_statement`, `cancelled_cheque`, `address_proof`)

#### Response

```json
{
  "id": "doc-uuid",
  "type": "pan_card",
  "name": "PAN Card",
  "url": "https://storage.example.com/documents/pan-card.pdf",
  "status": "pending",
  "uploadedAt": "2024-01-15T10:30:00Z"
}
```

#### Current Backend Issues

| Issue | Current Backend | Expected |
|-------|-----------------|----------|
| Document wrapper | `{ document: { ... } }` | `{ ... }` (flat) |
| Type field | `fileType` | `type` |
| URL format | Relative path | Full URL |

---

### 4. Delete Document

**DELETE** `/profile/documents/:documentId`

#### Response

```json
{
  "success": true,
  "message": "Document deleted successfully"
}
```

---

### 5. Submit for Verification

**POST** `/profile/submit-verification`

#### Response

```json
{
  "success": true,
  "message": "Profile submitted for verification",
  "verificationStatus": "pending"
}
```

---

### 6. Get Profile Completion Status

**GET** `/profile/completion-status`

#### Response

```json
{
  "completeness": 75,
  "missingFields": ["gstNumber", "bankDetails"],
  "requiredDocuments": {
    "uploaded": ["pan_card"],
    "missing": ["gst_certificate", "cancelled_cheque"]
  }
}
```

---

## Field Mapping Reference

| Frontend Field | Expected Backend Path | Notes |
|----------------|----------------------|-------|
| `email` | `email` | Flatten from `contactInfo.email` |
| `mobile` | `mobile` | Flatten from `contactInfo.mobile` |
| `panNumber` | `panNumber` | Flatten from `businessRegistration.panNumber` |
| `gstNumber` | `gstNumber` | Flatten from `businessRegistration.gstNumber` |
| `documents` | `documents` | Rename from `verificationDocuments` |
| `documents[].type` | `documents[].type` | Rename from `fileType` |
| `documents[].url` | `documents[].url` | Must be full URL |

---

## Document Types

| Type Key | Display Name |
|----------|--------------|
| `pan_card` | PAN Card |
| `gst_certificate` | GST Certificate |
| `incorporation_certificate` | Certificate of Incorporation |
| `bank_statement` | Bank Statement |
| `cancelled_cheque` | Cancelled Cheque |
| `address_proof` | Address Proof |

---

## Verification Status Values

| Status | Description |
|--------|-------------|
| `pending` | Awaiting verification |
| `verified` | Successfully verified |
| `rejected` | Verification failed |

---

## Backend Checklist

- [ ] Remove `profile` wrapper from GET response
- [ ] Flatten `contactInfo` → move `email`, `mobile` to root
- [ ] Flatten `businessRegistration` → move `panNumber`, `gstNumber` to root
- [ ] Rename `verificationDocuments` → `documents`
- [ ] In documents: rename `fileType` → `type`
- [ ] Return full URLs for document files
- [ ] Remove `document` wrapper from upload response

---

## Frontend Status

✅ **Normalizer layer implemented** in `src/services/modules/vendor-profile/vendor-profile.service.ts`

The frontend handles both current and new backend structures via:
- `normalizeProfile()` - Maps nested/flat structures to expected interface
- `normalizeDocuments()` - Standardizes document array format
- `normalizeDocumentUrl()` - Ensures full URLs for documents

**No frontend changes required** once backend is updated.

---

## Testing

After backend updates, verify:
1. Profile auto-populates on page load
2. Documents display with correct status indicators
3. "View" button opens documents in new tab
4. Document upload works and shows in list
5. Profile save persists all fields correctly
