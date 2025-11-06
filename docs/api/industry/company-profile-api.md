# Company Profile Management API

## Overview

The Company Profile Management API allows Industry users to create, update, and submit their company profiles for verification. Once a profile is submitted or approved, it becomes **permanently locked** and cannot be modified.

**Base URL:** `https://api.yourdomain.com/api/v1`

**Authentication:** Bearer token required in `Authorization` header

**Profile Lifecycle:**
```
INCOMPLETE → (save drafts) → COMPLETE → (submit) → PENDING → (admin review) → APPROVED/REJECTED
   ↓                                                                                  ↓
Editable                                                                          Editable
                                        ↓
                                    LOCKED (No edits allowed)
```

---

## Table of Contents

1. [API Endpoints](#api-endpoints)
2. [Data Models](#data-models)
3. [Required Documents](#required-documents)
4. [Profile Locking Mechanism](#profile-locking-mechanism)
5. [Validation Rules](#validation-rules)
6. [Mock Examples](#mock-examples)
7. [Error Handling](#error-handling)
8. [Business Logic](#business-logic)
9. [cURL Examples](#curl-examples)
10. [Frontend Integration](#frontend-integration)
11. [Testing Scenarios](#testing-scenarios)

---

## API Endpoints

### 1. Save/Update Company Profile

**Endpoint:** `POST /api/v1/company-profile`

**Description:** Save or update company profile as draft. Supports partial updates. Auto-calculates completion percentage.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "companyName": "Tech Innovations Pvt Ltd",
  "industryFocus": "Technology",
  "companyDescription": "We are a leading technology company specializing in innovative software solutions for businesses across industries.",
  "yearEstablished": "2015",
  "panNumber": "AABCU9603R",
  "gstNumber": "27AABCU9603R1Z5",
  "registrationNumber": "U72900MH2015PTC123456",
  "email": "contact@techinnovations.com",
  "mobile": "+919876543210",
  "telephone": "02212345678",
  "website": "https://www.techinnovations.com",
  "addresses": [
    {
      "line1": "123, Tech Park, Andheri East",
      "city": "Mumbai",
      "state": "Maharashtra",
      "pincode": "400069",
      "isPrimary": true
    },
    {
      "line1": "456, Business Center, MG Road",
      "city": "Bangalore",
      "state": "Karnataka",
      "pincode": "560001",
      "isPrimary": false
    }
  ]
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Profile saved successfully",
  "data": {
    "profile": {
      "id": "prof_1234567890",
      "companyName": "Tech Innovations Pvt Ltd",
      "industryFocus": "Technology",
      "companyDescription": "We are a leading technology company specializing in innovative software solutions for businesses across industries.",
      "yearEstablished": "2015",
      "panNumber": "AABCU9603R",
      "gstNumber": "27AABCU9603R1Z5",
      "registrationNumber": "U72900MH2015PTC123456",
      "email": "contact@techinnovations.com",
      "mobile": "+919876543210",
      "telephone": "02212345678",
      "website": "https://www.techinnovations.com",
      "addresses": [
        {
          "line1": "123, Tech Park, Andheri East",
          "city": "Mumbai",
          "state": "Maharashtra",
          "pincode": "400069",
          "isPrimary": true
        },
        {
          "line1": "456, Business Center, MG Road",
          "city": "Bangalore",
          "state": "Karnataka",
          "pincode": "560001",
          "isPrimary": false
        }
      ],
      "documents": [],
      "verificationStatus": "incomplete",
      "isProfileComplete": false,
      "profileCompletionPercentage": 85,
      "isLocked": false,
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-15T14:45:00.000Z"
    },
    "missingFields": [],
    "missingDocuments": ["pan_card", "gst_certificate", "registration_certificate", "address_proof"]
  }
}
```

**Partial Update Example:**
```json
{
  "telephone": "02298765432",
  "website": "https://www.techinnovations.in"
}
```

**Error Response (403 FORBIDDEN - Profile Locked):**
```json
{
  "success": false,
  "error": {
    "code": "PROFILE_LOCKED",
    "message": "Profile cannot be modified. Status: pending",
    "details": "Profile is locked for verification. Please contact support if changes are needed.",
    "statusCode": 403
  }
}
```

---

### 2. Get Company Profile

**Endpoint:** `GET /api/v1/company-profile`

**Description:** Retrieve complete company profile including all fields, documents, and verification status.

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200 OK - Incomplete Profile):**
```json
{
  "success": true,
  "data": {
    "profile": {
      "id": "prof_1234567890",
      "companyName": "Tech Innovations Pvt Ltd",
      "industryFocus": "Technology",
      "companyDescription": "We are a leading technology company specializing in innovative software solutions.",
      "yearEstablished": "2015",
      "panNumber": "AABCU9603R",
      "gstNumber": "27AABCU9603R1Z5",
      "registrationNumber": "U72900MH2015PTC123456",
      "email": "contact@techinnovations.com",
      "mobile": "+919876543210",
      "telephone": null,
      "website": null,
      "addresses": [
        {
          "line1": "123, Tech Park, Andheri East",
          "city": "Mumbai",
          "state": "Maharashtra",
          "pincode": "400069",
          "isPrimary": true
        }
      ],
      "documents": [
        {
          "id": "doc_pan_001",
          "name": "pan-card.pdf",
          "type": "application/pdf",
          "size": 245680,
          "url": "https://storage.yourdomain.com/documents/prof_1234567890/pan-card.pdf",
          "documentType": "pan_card",
          "uploadedAt": "2025-01-15T11:00:00.000Z",
          "status": "pending"
        }
      ],
      "verificationStatus": "incomplete",
      "verificationSubmittedAt": null,
      "verificationCompletedAt": null,
      "verificationRemarks": null,
      "isProfileComplete": false,
      "profileCompletionPercentage": 75,
      "isLocked": false,
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-15T14:45:00.000Z"
    },
    "missingFields": [],
    "missingDocuments": ["gst_certificate", "registration_certificate", "address_proof"]
  }
}
```

**Success Response (200 OK - Pending Verification):**
```json
{
  "success": true,
  "data": {
    "profile": {
      "id": "prof_1234567890",
      "companyName": "Tech Innovations Pvt Ltd",
      "industryFocus": "Technology",
      "companyDescription": "We are a leading technology company specializing in innovative software solutions for businesses across industries.",
      "yearEstablished": "2015",
      "panNumber": "AABCU9603R",
      "gstNumber": "27AABCU9603R1Z5",
      "registrationNumber": "U72900MH2015PTC123456",
      "email": "contact@techinnovations.com",
      "mobile": "+919876543210",
      "telephone": "02212345678",
      "website": "https://www.techinnovations.com",
      "addresses": [
        {
          "line1": "123, Tech Park, Andheri East",
          "city": "Mumbai",
          "state": "Maharashtra",
          "pincode": "400069",
          "isPrimary": true
        }
      ],
      "documents": [
        {
          "id": "doc_pan_001",
          "name": "pan-card.pdf",
          "type": "application/pdf",
          "size": 245680,
          "url": "https://storage.yourdomain.com/documents/prof_1234567890/pan-card.pdf",
          "documentType": "pan_card",
          "uploadedAt": "2025-01-15T11:00:00.000Z",
          "status": "pending"
        },
        {
          "id": "doc_gst_001",
          "name": "gst-certificate.pdf",
          "type": "application/pdf",
          "size": 512340,
          "url": "https://storage.yourdomain.com/documents/prof_1234567890/gst-certificate.pdf",
          "documentType": "gst_certificate",
          "uploadedAt": "2025-01-15T11:15:00.000Z",
          "status": "pending"
        },
        {
          "id": "doc_reg_001",
          "name": "registration-certificate.pdf",
          "type": "application/pdf",
          "size": 389120,
          "url": "https://storage.yourdomain.com/documents/prof_1234567890/registration-certificate.pdf",
          "documentType": "registration_certificate",
          "uploadedAt": "2025-01-15T11:30:00.000Z",
          "status": "pending"
        },
        {
          "id": "doc_addr_001",
          "name": "address-proof.pdf",
          "type": "application/pdf",
          "size": 198450,
          "url": "https://storage.yourdomain.com/documents/prof_1234567890/address-proof.pdf",
          "documentType": "address_proof",
          "uploadedAt": "2025-01-15T11:45:00.000Z",
          "status": "pending"
        }
      ],
      "verificationStatus": "pending",
      "verificationSubmittedAt": "2025-01-15T12:00:00.000Z",
      "verificationCompletedAt": null,
      "verificationRemarks": null,
      "isProfileComplete": true,
      "profileCompletionPercentage": 100,
      "isLocked": true,
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-15T12:00:00.000Z"
    },
    "missingFields": [],
    "missingDocuments": []
  }
}
```

**Success Response (200 OK - Approved):**
```json
{
  "success": true,
  "data": {
    "profile": {
      "id": "prof_1234567890",
      "companyName": "Tech Innovations Pvt Ltd",
      "industryFocus": "Technology",
      "companyDescription": "We are a leading technology company specializing in innovative software solutions for businesses across industries.",
      "yearEstablished": "2015",
      "panNumber": "AABCU9603R",
      "gstNumber": "27AABCU9603R1Z5",
      "registrationNumber": "U72900MH2015PTC123456",
      "email": "contact@techinnovations.com",
      "mobile": "+919876543210",
      "telephone": "02212345678",
      "website": "https://www.techinnovations.com",
      "addresses": [
        {
          "line1": "123, Tech Park, Andheri East",
          "city": "Mumbai",
          "state": "Maharashtra",
          "pincode": "400069",
          "isPrimary": true
        }
      ],
      "documents": [
        {
          "id": "doc_pan_001",
          "name": "pan-card.pdf",
          "type": "application/pdf",
          "size": 245680,
          "url": "https://storage.yourdomain.com/documents/prof_1234567890/pan-card.pdf",
          "documentType": "pan_card",
          "uploadedAt": "2025-01-15T11:00:00.000Z",
          "status": "verified",
          "remarks": "Document verified successfully"
        },
        {
          "id": "doc_gst_001",
          "name": "gst-certificate.pdf",
          "type": "application/pdf",
          "size": 512340,
          "url": "https://storage.yourdomain.com/documents/prof_1234567890/gst-certificate.pdf",
          "documentType": "gst_certificate",
          "uploadedAt": "2025-01-15T11:15:00.000Z",
          "status": "verified",
          "remarks": "Document verified successfully"
        },
        {
          "id": "doc_reg_001",
          "name": "registration-certificate.pdf",
          "type": "application/pdf",
          "size": 389120,
          "url": "https://storage.yourdomain.com/documents/prof_1234567890/registration-certificate.pdf",
          "documentType": "registration_certificate",
          "uploadedAt": "2025-01-15T11:30:00.000Z",
          "status": "verified",
          "remarks": "Document verified successfully"
        },
        {
          "id": "doc_addr_001",
          "name": "address-proof.pdf",
          "type": "application/pdf",
          "size": 198450,
          "url": "https://storage.yourdomain.com/documents/prof_1234567890/address-proof.pdf",
          "documentType": "address_proof",
          "uploadedAt": "2025-01-15T11:45:00.000Z",
          "status": "verified",
          "remarks": "Document verified successfully"
        }
      ],
      "verificationStatus": "approved",
      "verificationSubmittedAt": "2025-01-15T12:00:00.000Z",
      "verificationCompletedAt": "2025-01-16T10:30:00.000Z",
      "verificationRemarks": "All documents verified. Profile approved.",
      "isProfileComplete": true,
      "profileCompletionPercentage": 100,
      "isLocked": true,
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-16T10:30:00.000Z"
    },
    "missingFields": [],
    "missingDocuments": []
  }
}
```

**Error Response (404 NOT FOUND):**
```json
{
  "success": false,
  "error": {
    "code": "PROFILE_NOT_FOUND",
    "message": "Company profile not found",
    "statusCode": 404
  }
}
```

---

### 3. Upload Document

**Endpoint:** `POST /api/v1/company-profile/documents/upload`

**Description:** Upload verification documents. Supports multiple file types. Replaces existing document of the same type.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body (Form Data):**
```
file: [binary file data]
documentType: "pan_card" | "gst_certificate" | "registration_certificate" | "address_proof" | "company_logo" | "authorization_letter"
```

**File Constraints:**
- **Max Size:** 10MB (5MB for company_logo)
- **Accepted Formats:** 
  - Documents: `.pdf`, `.jpg`, `.jpeg`, `.png`
  - Logo: `.svg`, `.png`, `.jpg`, `.jpeg`

**Success Response (201 CREATED):**
```json
{
  "success": true,
  "message": "Document uploaded successfully",
  "data": {
    "document": {
      "id": "doc_pan_001",
      "name": "pan-card.pdf",
      "type": "application/pdf",
      "size": 245680,
      "url": "https://storage.yourdomain.com/documents/prof_1234567890/pan-card.pdf",
      "documentType": "pan_card",
      "uploadedAt": "2025-01-15T11:00:00.000Z",
      "status": "pending"
    },
    "replacedDocument": null
  }
}
```

**Success Response (201 CREATED - Document Replaced):**
```json
{
  "success": true,
  "message": "Document uploaded successfully. Previous document replaced.",
  "data": {
    "document": {
      "id": "doc_pan_002",
      "name": "pan-card-updated.pdf",
      "type": "application/pdf",
      "size": 267890,
      "url": "https://storage.yourdomain.com/documents/prof_1234567890/pan-card-updated.pdf",
      "documentType": "pan_card",
      "uploadedAt": "2025-01-15T13:30:00.000Z",
      "status": "pending"
    },
    "replacedDocument": {
      "id": "doc_pan_001",
      "name": "pan-card.pdf"
    }
  }
}
```

**Error Response (400 BAD REQUEST - Invalid File Type):**
```json
{
  "success": false,
  "error": {
    "code": "INVALID_FILE_TYPE",
    "message": "Invalid file type. Accepted formats: .pdf, .jpg, .jpeg, .png",
    "statusCode": 400
  }
}
```

**Error Response (413 PAYLOAD TOO LARGE):**
```json
{
  "success": false,
  "error": {
    "code": "FILE_TOO_LARGE",
    "message": "File size exceeds maximum limit of 10MB",
    "statusCode": 413
  }
}
```

**Error Response (403 FORBIDDEN - Profile Locked):**
```json
{
  "success": false,
  "error": {
    "code": "PROFILE_LOCKED",
    "message": "Cannot upload documents. Profile is locked for verification.",
    "details": "Profile status: pending",
    "statusCode": 403
  }
}
```

---

### 4. Delete Document

**Endpoint:** `DELETE /api/v1/company-profile/documents/:documentId`

**Description:** Delete an uploaded document. Only allowed when profile is not locked.

**Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `documentId` (required): The ID of the document to delete

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Document deleted successfully",
  "data": {
    "deletedDocumentId": "doc_pan_001",
    "documentType": "pan_card"
  }
}
```

**Error Response (404 NOT FOUND):**
```json
{
  "success": false,
  "error": {
    "code": "DOCUMENT_NOT_FOUND",
    "message": "Document not found",
    "statusCode": 404
  }
}
```

**Error Response (403 FORBIDDEN - Profile Locked):**
```json
{
  "success": false,
  "error": {
    "code": "PROFILE_LOCKED",
    "message": "Cannot delete documents. Profile is locked for verification.",
    "details": "Profile status: pending",
    "statusCode": 403
  }
}
```

---

### 5. Submit for Verification

**Endpoint:** `POST /api/v1/company-profile/submit-verification`

**Description:** Submit complete profile for admin verification. **This action permanently locks the profile.** Profile must be 100% complete with all required documents uploaded.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "confirmSubmission": true
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Profile submitted for verification successfully",
  "data": {
    "verificationId": "ver_1234567890",
    "status": "pending",
    "submittedAt": "2025-01-15T12:00:00.000Z",
    "estimatedCompletionAt": "2025-01-17T12:00:00.000Z",
    "estimatedCompletionHours": 48,
    "isLocked": true,
    "nextSteps": [
      "Our team will review your documents within 24-48 hours",
      "You will receive an email notification once review is complete",
      "Check your profile status at any time from the dashboard"
    ]
  }
}
```

**Error Response (422 UNPROCESSABLE ENTITY - Incomplete Profile):**
```json
{
  "success": false,
  "error": {
    "code": "INCOMPLETE_PROFILE",
    "message": "Profile is not complete. Cannot submit for verification.",
    "details": {
      "completionPercentage": 75,
      "missingFields": [],
      "missingDocuments": [
        "gst_certificate",
        "registration_certificate",
        "address_proof"
      ],
      "requiredActions": [
        "Upload GST Certificate",
        "Upload Registration Certificate",
        "Upload Address Proof"
      ]
    },
    "statusCode": 422
  }
}
```

**Error Response (409 CONFLICT - Already Submitted):**
```json
{
  "success": false,
  "error": {
    "code": "ALREADY_SUBMITTED",
    "message": "Profile has already been submitted for verification",
    "details": {
      "currentStatus": "pending",
      "submittedAt": "2025-01-15T12:00:00.000Z",
      "verificationId": "ver_1234567890"
    },
    "statusCode": 409
  }
}
```

**Error Response (400 BAD REQUEST - Description Too Short):**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Company description must be at least 50 characters",
    "details": {
      "field": "companyDescription",
      "currentLength": 35,
      "minimumLength": 50
    },
    "statusCode": 400
  }
}
```

---

## Data Models

### CompanyProfile

```typescript
interface CompanyProfile {
  // Identity
  id: string;
  
  // Basic Information
  companyName: string;
  industryFocus: string;
  companyDescription: string;
  yearEstablished: string;
  
  // Legal Information
  panNumber: string;
  gstNumber: string;
  registrationNumber: string;
  
  // Contact Information
  email: string;
  mobile: string;
  telephone?: string | null;
  website?: string | null;
  
  // Address Information
  addresses: Address[];
  
  // Documents
  documents?: VerificationDocument[];
  
  // Verification Status
  verificationStatus: 'incomplete' | 'pending' | 'approved' | 'rejected';
  verificationSubmittedAt?: string | null;
  verificationCompletedAt?: string | null;
  verificationRemarks?: string | null;
  
  // Metadata
  isProfileComplete: boolean;
  profileCompletionPercentage: number;
  isLocked: boolean;
  createdAt: string;
  updatedAt: string;
}
```

### Address

```typescript
interface Address {
  line1: string;
  city: string;
  state: string;
  pincode: string;
  isPrimary: boolean;
}
```

### VerificationDocument

```typescript
interface VerificationDocument {
  id: string;
  name: string;
  type: string; // MIME type
  size: number; // bytes
  url: string; // download/preview URL
  documentType: 
    | 'pan_card' 
    | 'gst_certificate' 
    | 'registration_certificate' 
    | 'address_proof' 
    | 'company_logo' 
    | 'authorization_letter';
  uploadedAt: string; // ISO 8601
  status?: 'pending' | 'verified' | 'rejected';
  remarks?: string;
}
```

---

## Required Documents

### Mandatory Documents (Required for Verification)

| Document Type | documentType Key | Description | Max Size | Accepted Formats |
|---------------|------------------|-------------|----------|------------------|
| **PAN Card** | `pan_card` | Company PAN Card | 10MB | .pdf, .jpg, .jpeg, .png |
| **GST Certificate** | `gst_certificate` | GST Registration Certificate | 10MB | .pdf, .jpg, .jpeg, .png |
| **Registration Certificate** | `registration_certificate` | Company Registration/Incorporation Certificate | 10MB | .pdf, .jpg, .jpeg, .png |
| **Address Proof** | `address_proof` | Utility bill, Lease agreement, or Property document | 10MB | .pdf, .jpg, .jpeg, .png |

### Optional Documents

| Document Type | documentType Key | Description | Max Size | Accepted Formats |
|---------------|------------------|-------------|----------|------------------|
| **Company Logo** | `company_logo` | Company logo for branding | 5MB | .svg, .png, .jpg, .jpeg |
| **Authorization Letter** | `authorization_letter` | Authorization for signatory (if applicable) | 10MB | .pdf |

### Document Upload Rules

1. **One document per type** - Uploading a new document of the same type replaces the previous one
2. **Document ID changes** - Each upload generates a new document ID
3. **Previous URLs invalidated** - Old document URLs become inaccessible after replacement
4. **No deletion when locked** - Documents cannot be deleted or replaced once profile is locked

---

## Profile Locking Mechanism

### 🔒 Critical Business Rule

**Profile becomes permanently locked when:**
- Verification status changes to `pending` (after submission)
- Verification status is `approved` (after admin approval)

**Profile remains editable when:**
- Verification status is `incomplete`
- Verification status is `rejected` (with admin remarks)

### Status Flow Diagram

```
┌─────────────┐
│ INCOMPLETE  │  ← Editable (can save drafts)
└──────┬──────┘
       │ submit
       ↓
┌─────────────┐
│  PENDING    │  ← LOCKED (admin reviewing)
└──────┬──────┘
       │
       ├─────→ approve ───→ ┌──────────┐
       │                    │ APPROVED │  ← LOCKED FOREVER
       │                    └──────────┘
       │
       └─────→ reject ────→ ┌──────────┐
                            │ REJECTED │  ← Editable (with remarks)
                            └──────────┘
```

### API Behavior When Locked

**Locked Profile Restrictions:**

| Endpoint | Action | Locked Behavior |
|----------|--------|-----------------|
| `GET /company-profile` | Read | ✅ **Allowed** - Can view profile anytime |
| `POST /company-profile` | Update | ❌ **Forbidden** - Returns 403 with `PROFILE_LOCKED` |
| `POST /documents/upload` | Upload | ❌ **Forbidden** - Returns 403 with `PROFILE_LOCKED` |
| `DELETE /documents/:id` | Delete | ❌ **Forbidden** - Returns 403 with `PROFILE_LOCKED` |
| `POST /submit-verification` | Submit | ❌ **Conflict** - Returns 409 with `ALREADY_SUBMITTED` |

**Locked Profile Error Response:**
```json
{
  "success": false,
  "error": {
    "code": "PROFILE_LOCKED",
    "message": "Profile cannot be modified. Status: pending",
    "details": "Profile is locked for verification. Please contact support if changes are needed.",
    "statusCode": 403
  }
}
```

### Unlocking Rejected Profiles

When an admin **rejects** a profile:
1. Status changes to `rejected`
2. `isLocked` becomes `false`
3. Admin adds `verificationRemarks` explaining rejection reasons
4. User can edit profile and resubmit

**Rejected Profile Response:**
```json
{
  "verificationStatus": "rejected",
  "verificationRemarks": "PAN card image is unclear. Please upload a clearer copy. GST number does not match company name.",
  "isLocked": false
}
```

---

## Validation Rules

### Field-Level Validations

| Field | Type | Required | Validation Rules |
|-------|------|----------|------------------|
| `companyName` | string | ✅ Yes | Non-empty, max 200 chars |
| `industryFocus` | string | ✅ Yes | Must be from predefined list |
| `companyDescription` | string | ✅ Yes | Min 50 chars, max 1000 chars |
| `yearEstablished` | string | ✅ Yes | 4-digit year, 1800 ≤ year ≤ current year |
| `panNumber` | string | ✅ Yes | Exactly 10 uppercase alphanumeric (e.g., AABCU9603R) |
| `gstNumber` | string | ✅ Yes | Exactly 15 uppercase alphanumeric (e.g., 27AABCU9603R1Z5) |
| `registrationNumber` | string | ✅ Yes | Non-empty string |
| `email` | string | ✅ Yes | Valid RFC 5322 email format |
| `mobile` | string | ✅ Yes | Min 10 digits, max 15 digits |
| `telephone` | string | ❌ No | Min 10 digits (if provided) |
| `website` | string | ❌ No | Valid URL format (if provided) |
| `addresses` | array | ✅ Yes | Min 1 complete address |
| `addresses[].line1` | string | ✅ Yes | Non-empty, max 200 chars |
| `addresses[].city` | string | ✅ Yes | Non-empty, max 100 chars |
| `addresses[].state` | string | ✅ Yes | Valid Indian state name |
| `addresses[].pincode` | string | ✅ Yes | Exactly 6 digits |
| `addresses[].isPrimary` | boolean | ✅ Yes | At least one address must be primary |

### Format Validations

**PAN Number Format:**
```
Pattern: AAAAA9999A
Example: AABCU9603R

Rules:
- First 5 characters: Uppercase letters (A-Z)
- Next 4 characters: Digits (0-9)
- Last character: Uppercase letter (A-Z)
- Total: 10 characters
```

**GST Number Format:**
```
Pattern: 99AAAAA9999A9A9
Example: 27AABCU9603R1Z5

Rules:
- First 2 digits: State code (01-37)
- Next 10 characters: PAN number
- Next 1 character: Registration number (1-9, A-Z)
- Next 1 character: 'Z' (default)
- Last 1 character: Checksum digit/letter
- Total: 15 characters
```

**Mobile Number Format:**
```
Rules:
- Min: 10 digits
- Max: 15 digits
- May include country code prefix (+91)
- Examples: 9876543210, +919876543210
```

**Pincode Format:**
```
Rules:
- Exactly 6 digits
- Examples: 400069, 560001, 110001
```

### Submission Validations

**Requirements for successful submission:**

1. ✅ **100% Profile Completion**
   - All required fields filled
   - At least one complete address
   - Description ≥ 50 characters

2. ✅ **All Required Documents Uploaded**
   - PAN Card
   - GST Certificate
   - Registration Certificate
   - Address Proof

3. ✅ **Profile Not Already Locked**
   - Status must be `incomplete` or `rejected`

4. ✅ **Confirmation Flag**
   - `confirmSubmission: true` must be sent

**Validation Error Response:**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Profile validation failed",
    "errors": [
      {
        "field": "companyDescription",
        "message": "Company description must be at least 50 characters",
        "currentValue": 35,
        "expectedValue": 50
      },
      {
        "field": "documents",
        "message": "Missing required document: GST Certificate",
        "documentType": "gst_certificate"
      }
    ],
    "statusCode": 400
  }
}
```

---

## Mock Examples

### Example 1: First-Time Profile Save

**Request:**
```bash
POST /api/v1/company-profile
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "companyName": "Innovative Solutions Ltd",
  "industryFocus": "Manufacturing",
  "email": "info@innovativesolutions.com",
  "mobile": "+919988776655"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Profile saved successfully",
  "data": {
    "profile": {
      "id": "prof_9876543210",
      "companyName": "Innovative Solutions Ltd",
      "industryFocus": "Manufacturing",
      "companyDescription": null,
      "yearEstablished": null,
      "panNumber": null,
      "gstNumber": null,
      "registrationNumber": null,
      "email": "info@innovativesolutions.com",
      "mobile": "+919988776655",
      "telephone": null,
      "website": null,
      "addresses": [],
      "documents": [],
      "verificationStatus": "incomplete",
      "verificationSubmittedAt": null,
      "verificationCompletedAt": null,
      "verificationRemarks": null,
      "isProfileComplete": false,
      "profileCompletionPercentage": 30,
      "isLocked": false,
      "createdAt": "2025-01-15T09:00:00.000Z",
      "updatedAt": "2025-01-15T09:00:00.000Z"
    },
    "missingFields": [
      "companyDescription",
      "yearEstablished",
      "panNumber",
      "gstNumber",
      "registrationNumber",
      "addresses"
    ],
    "missingDocuments": [
      "pan_card",
      "gst_certificate",
      "registration_certificate",
      "address_proof"
    ]
  }
}
```

### Example 2: Update Profile with Address

**Request:**
```bash
POST /api/v1/company-profile
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "companyDescription": "We are a leading manufacturing company specializing in automotive parts and components with state-of-the-art facilities.",
  "yearEstablished": "2010",
  "panNumber": "ABCDE1234F",
  "gstNumber": "27ABCDE1234F1Z5",
  "registrationNumber": "U29100MH2010PTC123456",
  "addresses": [
    {
      "line1": "Plot 45, Industrial Area, Phase 2",
      "city": "Pune",
      "state": "Maharashtra",
      "pincode": "411019",
      "isPrimary": true
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "profile": {
      "id": "prof_9876543210",
      "companyName": "Innovative Solutions Ltd",
      "industryFocus": "Manufacturing",
      "companyDescription": "We are a leading manufacturing company specializing in automotive parts and components with state-of-the-art facilities.",
      "yearEstablished": "2010",
      "panNumber": "ABCDE1234F",
      "gstNumber": "27ABCDE1234F1Z5",
      "registrationNumber": "U29100MH2010PTC123456",
      "email": "info@innovativesolutions.com",
      "mobile": "+919988776655",
      "telephone": null,
      "website": null,
      "addresses": [
        {
          "line1": "Plot 45, Industrial Area, Phase 2",
          "city": "Pune",
          "state": "Maharashtra",
          "pincode": "411019",
          "isPrimary": true
        }
      ],
      "documents": [],
      "verificationStatus": "incomplete",
      "verificationSubmittedAt": null,
      "verificationCompletedAt": null,
      "verificationRemarks": null,
      "isProfileComplete": false,
      "profileCompletionPercentage": 85,
      "isLocked": false,
      "createdAt": "2025-01-15T09:00:00.000Z",
      "updatedAt": "2025-01-15T10:30:00.000Z"
    },
    "missingFields": [],
    "missingDocuments": [
      "pan_card",
      "gst_certificate",
      "registration_certificate",
      "address_proof"
    ]
  }
}
```

### Example 3: Upload PAN Card

**Request:**
```bash
POST /api/v1/company-profile/documents/upload
Content-Type: multipart/form-data
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

file: [pan-card.pdf binary data]
documentType: pan_card
```

**Response:**
```json
{
  "success": true,
  "message": "Document uploaded successfully",
  "data": {
    "document": {
      "id": "doc_pan_12345",
      "name": "pan-card.pdf",
      "type": "application/pdf",
      "size": 245680,
      "url": "https://storage.yourdomain.com/documents/prof_9876543210/pan-card.pdf",
      "documentType": "pan_card",
      "uploadedAt": "2025-01-15T11:00:00.000Z",
      "status": "pending"
    },
    "replacedDocument": null
  }
}
```

### Example 4: Submit for Verification (Success)

**Request:**
```bash
POST /api/v1/company-profile/submit-verification
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "confirmSubmission": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Profile submitted for verification successfully",
  "data": {
    "verificationId": "ver_abc123xyz",
    "status": "pending",
    "submittedAt": "2025-01-15T12:00:00.000Z",
    "estimatedCompletionAt": "2025-01-17T12:00:00.000Z",
    "estimatedCompletionHours": 48,
    "isLocked": true,
    "nextSteps": [
      "Our team will review your documents within 24-48 hours",
      "You will receive an email notification once review is complete",
      "Check your profile status at any time from the dashboard"
    ]
  }
}
```

### Example 5: Submit for Verification (Missing Documents)

**Request:**
```bash
POST /api/v1/company-profile/submit-verification
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "confirmSubmission": true
}
```

**Response:**
```json
{
  "success": false,
  "error": {
    "code": "INCOMPLETE_PROFILE",
    "message": "Profile is not complete. Cannot submit for verification.",
    "details": {
      "completionPercentage": 85,
      "missingFields": [],
      "missingDocuments": [
        "gst_certificate",
        "registration_certificate"
      ],
      "requiredActions": [
        "Upload GST Certificate",
        "Upload Registration Certificate"
      ]
    },
    "statusCode": 422
  }
}
```

### Example 6: Attempt to Edit Locked Profile

**Request:**
```bash
POST /api/v1/company-profile
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "website": "https://www.innovativesolutions.com"
}
```

**Response:**
```json
{
  "success": false,
  "error": {
    "code": "PROFILE_LOCKED",
    "message": "Profile cannot be modified. Status: pending",
    "details": "Profile is locked for verification. Please contact support if changes are needed.",
    "statusCode": 403
  }
}
```

---

## Error Handling

### Error Response Format

All error responses follow this structure:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": "Additional context or nested error information",
    "statusCode": 400
  }
}
```

### HTTP Status Codes

| Status Code | Meaning | When Used |
|-------------|---------|-----------|
| **200 OK** | Success | GET requests, successful DELETE |
| **201 CREATED** | Resource created | Successful document upload |
| **400 BAD REQUEST** | Invalid input | Validation errors, invalid format |
| **401 UNAUTHORIZED** | Authentication required | Missing or invalid token |
| **403 FORBIDDEN** | Access denied | Profile locked, insufficient permissions |
| **404 NOT FOUND** | Resource not found | Profile or document doesn't exist |
| **409 CONFLICT** | Resource conflict | Already submitted, duplicate entry |
| **413 PAYLOAD TOO LARGE** | File too large | File exceeds size limit |
| **422 UNPROCESSABLE ENTITY** | Semantic error | Incomplete profile, cannot submit |
| **500 INTERNAL SERVER ERROR** | Server error | Unexpected server issue |

### Common Error Codes

#### Authentication Errors

**UNAUTHORIZED**
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authentication required",
    "details": "Please provide a valid Bearer token",
    "statusCode": 401
  }
}
```

**TOKEN_EXPIRED**
```json
{
  "success": false,
  "error": {
    "code": "TOKEN_EXPIRED",
    "message": "Authentication token has expired",
    "details": "Please login again to get a new token",
    "statusCode": 401
  }
}
```

#### Validation Errors

**VALIDATION_ERROR**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Profile validation failed",
    "errors": [
      {
        "field": "panNumber",
        "message": "PAN number must be exactly 10 characters",
        "value": "ABC123"
      },
      {
        "field": "gstNumber",
        "message": "GST number must be exactly 15 characters",
        "value": "27ABC"
      }
    ],
    "statusCode": 400
  }
}
```

**INVALID_FORMAT**
```json
{
  "success": false,
  "error": {
    "code": "INVALID_FORMAT",
    "message": "Invalid PAN number format",
    "details": "PAN must follow pattern: AAAAA9999A (e.g., AABCU9603R)",
    "providedValue": "abc123xyz",
    "statusCode": 400
  }
}
```

#### Profile Lock Errors

**PROFILE_LOCKED**
```json
{
  "success": false,
  "error": {
    "code": "PROFILE_LOCKED",
    "message": "Profile cannot be modified. Status: pending",
    "details": "Profile is locked for verification. Please contact support if changes are needed.",
    "statusCode": 403
  }
}
```

**ALREADY_SUBMITTED**
```json
{
  "success": false,
  "error": {
    "code": "ALREADY_SUBMITTED",
    "message": "Profile has already been submitted for verification",
    "details": {
      "currentStatus": "pending",
      "submittedAt": "2025-01-15T12:00:00.000Z",
      "verificationId": "ver_abc123"
    },
    "statusCode": 409
  }
}
```

#### Document Errors

**FILE_TOO_LARGE**
```json
{
  "success": false,
  "error": {
    "code": "FILE_TOO_LARGE",
    "message": "File size exceeds maximum limit of 10MB",
    "details": {
      "uploadedSize": 15728640,
      "maxSize": 10485760
    },
    "statusCode": 413
  }
}
```

**INVALID_FILE_TYPE**
```json
{
  "success": false,
  "error": {
    "code": "INVALID_FILE_TYPE",
    "message": "Invalid file type for document upload",
    "details": "Accepted formats: .pdf, .jpg, .jpeg, .png",
    "providedType": "application/msword",
    "statusCode": 400
  }
}
```

**DOCUMENT_NOT_FOUND**
```json
{
  "success": false,
  "error": {
    "code": "DOCUMENT_NOT_FOUND",
    "message": "Document not found",
    "details": "No document found with ID: doc_invalid_123",
    "statusCode": 404
  }
}
```

#### Submission Errors

**INCOMPLETE_PROFILE**
```json
{
  "success": false,
  "error": {
    "code": "INCOMPLETE_PROFILE",
    "message": "Profile is not complete. Cannot submit for verification.",
    "details": {
      "completionPercentage": 75,
      "missingFields": ["telephone"],
      "missingDocuments": ["gst_certificate", "address_proof"],
      "requiredActions": [
        "Upload GST Certificate",
        "Upload Address Proof"
      ]
    },
    "statusCode": 422
  }
}
```

**DESCRIPTION_TOO_SHORT**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Company description must be at least 50 characters",
    "details": {
      "field": "companyDescription",
      "currentLength": 35,
      "minimumLength": 50
    },
    "statusCode": 400
  }
}
```

#### Not Found Errors

**PROFILE_NOT_FOUND**
```json
{
  "success": false,
  "error": {
    "code": "PROFILE_NOT_FOUND",
    "message": "Company profile not found",
    "details": "No profile exists for this user. Please create one first.",
    "statusCode": 404
  }
}
```

---

## Business Logic

### Profile Completion Calculation

**Formula:**
```
completionPercentage = (filledRequiredFields / totalRequiredFields) × 100
```

**Required Fields (Total: 10):**
1. companyName
2. industryFocus
3. companyDescription (≥ 50 characters)
4. yearEstablished
5. panNumber
6. gstNumber
7. registrationNumber
8. email
9. mobile
10. addresses (at least 1 complete address)

**Calculation Examples:**

```javascript
// Example 1: Only 3 fields filled
{
  companyName: "Tech Ltd",
  email: "tech@example.com",
  mobile: "9876543210"
}
// Completion: 3/10 = 30%

// Example 2: 8 fields filled, but description < 50 chars
{
  companyName: "Tech Ltd",
  industryFocus: "Technology",
  companyDescription: "Software company", // Only 16 chars
  yearEstablished: "2015",
  panNumber: "AABCU9603R",
  gstNumber: "27AABCU9603R1Z5",
  registrationNumber: "U72900MH2015PTC123456",
  email: "tech@example.com",
  mobile: "9876543210"
}
// Completion: 7/10 = 70% (description doesn't count)

// Example 3: All fields filled correctly
{
  companyName: "Tech Ltd",
  industryFocus: "Technology",
  companyDescription: "We are a leading technology company with 10+ years experience", // 60 chars
  yearEstablished: "2015",
  panNumber: "AABCU9603R",
  gstNumber: "27AABCU9603R1Z5",
  registrationNumber: "U72900MH2015PTC123456",
  email: "tech@example.com",
  mobile: "9876543210",
  addresses: [{ line1: "123 Street", city: "Mumbai", state: "Maharashtra", pincode: "400001", isPrimary: true }]
}
// Completion: 10/10 = 100%
```

### Document Upload Logic

**Replacement Behavior:**

When uploading a document:
1. System checks if document of same `documentType` already exists
2. If exists:
   - Previous document is marked as replaced/deleted
   - Previous document URL becomes invalid
   - New document gets new ID
   - Response includes `replacedDocument` info
3. If doesn't exist:
   - Document is added normally
   - `replacedDocument` is `null`

**Example Flow:**

```javascript
// First upload
POST /documents/upload
file: pan-card.pdf
documentType: pan_card

Response: {
  document: { id: "doc_pan_001", name: "pan-card.pdf" },
  replacedDocument: null
}

// Second upload (same type)
POST /documents/upload
file: pan-card-updated.pdf
documentType: pan_card

Response: {
  document: { id: "doc_pan_002", name: "pan-card-updated.pdf" },
  replacedDocument: { id: "doc_pan_001", name: "pan-card.pdf" }
}

// GET profile now shows only doc_pan_002
```

### Verification Submission Flow

**Pre-Submission Checks:**

```javascript
function canSubmitForVerification(profile) {
  // Check 1: Profile completion
  if (profile.profileCompletionPercentage !== 100) {
    return { 
      canSubmit: false, 
      reason: "Profile incomplete" 
    };
  }
  
  // Check 2: Description length
  if (profile.companyDescription.length < 50) {
    return { 
      canSubmit: false, 
      reason: "Description too short" 
    };
  }
  
  // Check 3: Required documents
  const requiredDocs = ['pan_card', 'gst_certificate', 'registration_certificate', 'address_proof'];
  const uploadedTypes = profile.documents.map(d => d.documentType);
  const missingDocs = requiredDocs.filter(type => !uploadedTypes.includes(type));
  
  if (missingDocs.length > 0) {
    return { 
      canSubmit: false, 
      reason: "Missing required documents",
      missing: missingDocs 
    };
  }
  
  // Check 4: Already submitted/approved
  if (profile.isLocked) {
    return { 
      canSubmit: false, 
      reason: "Profile already locked" 
    };
  }
  
  return { canSubmit: true };
}
```

**Post-Submission Actions:**

1. Update profile status to `pending`
2. Set `verificationSubmittedAt` timestamp
3. Set `isLocked` to `true`
4. Generate unique `verificationId`
5. Calculate estimated completion time (48 hours default)
6. Send email notification to user
7. Notify admin team for review
8. Return submission confirmation

### Admin Verification Flow

**Approval:**
```javascript
// Admin approves profile
{
  verificationStatus: "approved",
  verificationCompletedAt: "2025-01-16T10:30:00.000Z",
  verificationRemarks: "All documents verified. Profile approved.",
  isLocked: true // Remains locked forever
}

// All documents marked as verified
documents.forEach(doc => {
  doc.status = "verified";
  doc.remarks = "Document verified successfully";
});
```

**Rejection:**
```javascript
// Admin rejects profile
{
  verificationStatus: "rejected",
  verificationCompletedAt: "2025-01-16T10:30:00.000Z",
  verificationRemarks: "GST certificate is unclear. PAN number doesn't match company name. Please resubmit.",
  isLocked: false // Unlocked for editing
}

// Specific documents can be marked
documents.find(d => d.documentType === 'gst_certificate').status = "rejected";
documents.find(d => d.documentType === 'gst_certificate').remarks = "Image is unclear";
```

---

## cURL Examples

### Save Profile

```bash
curl -X POST https://api.yourdomain.com/api/v1/company-profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "companyName": "Tech Innovations Pvt Ltd",
    "industryFocus": "Technology",
    "companyDescription": "We are a leading technology company specializing in innovative software solutions for businesses across industries.",
    "yearEstablished": "2015",
    "panNumber": "AABCU9603R",
    "gstNumber": "27AABCU9603R1Z5",
    "registrationNumber": "U72900MH2015PTC123456",
    "email": "contact@techinnovations.com",
    "mobile": "+919876543210",
    "addresses": [
      {
        "line1": "123, Tech Park, Andheri East",
        "city": "Mumbai",
        "state": "Maharashtra",
        "pincode": "400069",
        "isPrimary": true
      }
    ]
  }'
```

### Get Profile

```bash
curl -X GET https://api.yourdomain.com/api/v1/company-profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Upload Document

```bash
curl -X POST https://api.yourdomain.com/api/v1/company-profile/documents/upload \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -F "file=@/path/to/pan-card.pdf" \
  -F "documentType=pan_card"
```

### Delete Document

```bash
curl -X DELETE https://api.yourdomain.com/api/v1/company-profile/documents/doc_pan_001 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Submit for Verification

```bash
curl -X POST https://api.yourdomain.com/api/v1/company-profile/submit-verification \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "confirmSubmission": true
  }'
```

---

## Frontend Integration

### React Hook Example

```typescript
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import apiService from '@/services/core/api.service';
import type { CompanyProfile, VerificationDocument } from '@/types/verification';

export const useCompanyProfile = () => {
  const queryClient = useQueryClient();

  // Get profile
  const { 
    data: profile, 
    isLoading, 
    error, 
    refetch 
  } = useQuery<CompanyProfile>({
    queryKey: ['company-profile'],
    queryFn: async () => {
      const response = await apiService.get('/company-profile');
      return response.data.profile;
    },
  });

  // Save/update profile
  const saveProfileMutation = useMutation({
    mutationFn: async (data: Partial<CompanyProfile>) => {
      return await apiService.post('/company-profile', data);
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['company-profile'] });
      toast.success('Profile saved successfully');
      return response.data;
    },
    onError: (error: any) => {
      const message = error.response?.data?.error?.message || 'Failed to save profile';
      toast.error(message);
    },
  });

  // Upload document
  const uploadDocumentMutation = useMutation({
    mutationFn: async ({ 
      file, 
      documentType 
    }: { 
      file: File; 
      documentType: string;
    }) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('documentType', documentType);
      
      return await apiService.post('/company-profile/documents/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['company-profile'] });
      toast.success('Document uploaded successfully');
      return response.data;
    },
    onError: (error: any) => {
      const message = error.response?.data?.error?.message || 'Failed to upload document';
      toast.error(message);
    },
  });

  // Delete document
  const deleteDocumentMutation = useMutation({
    mutationFn: async (documentId: string) => {
      return await apiService.remove(`/company-profile/documents/${documentId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['company-profile'] });
      toast.success('Document deleted successfully');
    },
    onError: (error: any) => {
      const message = error.response?.data?.error?.message || 'Failed to delete document';
      toast.error(message);
    },
  });

  // Submit for verification
  const submitForVerificationMutation = useMutation({
    mutationFn: async () => {
      return await apiService.post('/company-profile/submit-verification', {
        confirmSubmission: true
      });
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['company-profile'] });
      toast.success('Profile submitted for verification');
      return response.data;
    },
    onError: (error: any) => {
      const errorData = error.response?.data?.error;
      
      if (errorData?.code === 'INCOMPLETE_PROFILE') {
        const missing = errorData.details?.missingDocuments || [];
        toast.error(`Missing documents: ${missing.join(', ')}`);
      } else {
        const message = errorData?.message || 'Failed to submit profile';
        toast.error(message);
      }
    },
  });

  return {
    // Data
    profile,
    isLoading,
    error,
    isLocked: profile?.isLocked || false,
    completionPercentage: profile?.profileCompletionPercentage || 0,
    
    // Actions
    saveProfile: saveProfileMutation.mutate,
    uploadDocument: uploadDocumentMutation.mutate,
    deleteDocument: deleteDocumentMutation.mutate,
    submitForVerification: submitForVerificationMutation.mutate,
    refreshProfile: refetch,
    
    // Loading states
    isSaving: saveProfileMutation.isPending,
    isUploading: uploadDocumentMutation.isPending,
    isDeleting: deleteDocumentMutation.isPending,
    isSubmitting: submitForVerificationMutation.isPending,
  };
};
```

### Usage in Component

```typescript
import { useCompanyProfile } from '@/hooks/useCompanyProfile';

export const CompanyProfilePage = () => {
  const { 
    profile, 
    isLoading,
    isLocked,
    completionPercentage,
    saveProfile,
    uploadDocument,
    submitForVerification,
    isSaving,
    isSubmitting
  } = useCompanyProfile();

  const handleSave = async (formData: any) => {
    await saveProfile(formData);
  };

  const handleUpload = async (file: File, type: string) => {
    await uploadDocument({ file, documentType: type });
  };

  const handleSubmit = async () => {
    if (completionPercentage === 100) {
      await submitForVerification();
    } else {
      toast.error('Please complete profile before submitting');
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Company Profile</h1>
      <p>Completion: {completionPercentage}%</p>
      
      {isLocked && (
        <Alert>Profile is locked for verification</Alert>
      )}

      {/* Form fields */}
      <Button onClick={handleSave} disabled={isLocked || isSaving}>
        {isSaving ? 'Saving...' : 'Save Profile'}
      </Button>

      <Button 
        onClick={handleSubmit} 
        disabled={isLocked || completionPercentage < 100 || isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit for Verification'}
      </Button>
    </div>
  );
};
```

---

## Testing Scenarios

### Test Case 1: Create New Profile

**Given:** User has no existing profile  
**When:** User submits basic company info  
**Then:**
- Profile created with status `incomplete`
- Completion percentage calculated correctly
- `isLocked` is `false`
- Returns list of missing fields and documents

### Test Case 2: Partial Update

**Given:** Profile exists with 50% completion  
**When:** User updates only website field  
**Then:**
- Only website field is updated
- Other fields remain unchanged
- Completion percentage stays same
- Last updated timestamp changes

### Test Case 3: Upload All Required Documents

**Given:** Profile is 100% complete but no documents  
**When:** User uploads all 4 required documents  
**Then:**
- All documents stored successfully
- Each document has unique ID and URL
- Document status is `pending`
- Profile shows 0 missing documents

### Test Case 4: Replace Existing Document

**Given:** PAN card already uploaded as doc_pan_001  
**When:** User uploads new PAN card  
**Then:**
- New document gets ID doc_pan_002
- Old document marked as replaced
- Old URL becomes invalid
- Response includes `replacedDocument` info

### Test Case 5: Submit Incomplete Profile

**Given:** Profile at 85% completion, missing 1 document  
**When:** User clicks "Submit for Verification"  
**Then:**
- Returns 422 error with `INCOMPLETE_PROFILE`
- Lists missing documents
- Profile remains unlocked
- Status stays `incomplete`

### Test Case 6: Submit Complete Profile

**Given:** Profile at 100%, all documents uploaded  
**When:** User submits for verification  
**Then:**
- Status changes to `pending`
- `isLocked` becomes `true`
- `verificationSubmittedAt` timestamp set
- Returns verification ID
- Email sent to user and admin

### Test Case 7: Edit Pending Profile

**Given:** Profile submitted, status is `pending`  
**When:** User attempts to update company name  
**Then:**
- Returns 403 error with `PROFILE_LOCKED`
- No changes made
- Frontend should disable edit form

### Test Case 8: Upload Document to Locked Profile

**Given:** Profile is locked (pending/approved)  
**When:** User attempts document upload  
**Then:**
- Returns 403 error
- File not processed
- Storage not consumed

### Test Case 9: Admin Approves Profile

**Given:** Profile in `pending` status  
**When:** Admin approves profile  
**Then:**
- Status changes to `approved`
- `verificationCompletedAt` timestamp set
- All documents marked as `verified`
- Profile remains locked forever
- User notified via email

### Test Case 10: Admin Rejects Profile

**Given:** Profile in `pending` status  
**When:** Admin rejects with remarks  
**Then:**
- Status changes to `rejected`
- `isLocked` becomes `false`
- Remarks saved to profile
- Specific documents marked as `rejected`
- User can edit and resubmit

### Test Case 11: Resubmit After Rejection

**Given:** Previously rejected profile, now fixed  
**When:** User resubmits after corrections  
**Then:**
- Status changes back to `pending`
- New verification ID generated
- Profile locked again
- Previous remarks cleared

### Test Case 12: Delete Document from Editable Profile

**Given:** Profile is `incomplete`, has uploaded docs  
**When:** User deletes a document  
**Then:**
- Document removed from profile
- URL becomes invalid
- File deleted from storage
- Completion check updated

### Test Case 13: Invalid File Format

**Given:** User attempts document upload  
**When:** User uploads .docx file for PAN card  
**Then:**
- Returns 400 error with `INVALID_FILE_TYPE`
- File not stored
- Lists accepted formats

### Test Case 14: File Size Exceeds Limit

**Given:** User uploads 15MB PDF  
**When:** Upload API is called  
**Then:**
- Returns 413 error with `FILE_TOO_LARGE`
- File not stored
- Shows max size in error

### Test Case 15: Get Approved Profile

**Given:** Profile approved by admin  
**When:** User fetches profile  
**Then:**
- Returns complete profile data
- All documents show `verified` status
- `isLocked` is `true`
- Shows approval remarks

---

## Notes for Backend Implementation

### Database Schema Considerations

```sql
-- companies table
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name VARCHAR(200) NOT NULL,
  industry_focus VARCHAR(100) NOT NULL,
  company_description TEXT CHECK (char_length(company_description) >= 50),
  year_established VARCHAR(4) CHECK (year_established ~ '^\d{4}$'),
  pan_number VARCHAR(10) CHECK (pan_number ~ '^[A-Z]{5}[0-9]{4}[A-Z]$'),
  gst_number VARCHAR(15) CHECK (gst_number ~ '^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][0-9A-Z]{3}$'),
  registration_number VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  mobile VARCHAR(15) NOT NULL,
  telephone VARCHAR(15),
  website VARCHAR(255),
  verification_status VARCHAR(20) DEFAULT 'incomplete' CHECK (verification_status IN ('incomplete', 'pending', 'approved', 'rejected')),
  verification_submitted_at TIMESTAMP,
  verification_completed_at TIMESTAMP,
  verification_remarks TEXT,
  is_locked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- company_addresses table
CREATE TABLE company_addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  line1 VARCHAR(200) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  pincode VARCHAR(6) CHECK (pincode ~ '^\d{6}$'),
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- company_documents table
CREATE TABLE company_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(100) NOT NULL,
  size INTEGER NOT NULL,
  url TEXT NOT NULL,
  document_type VARCHAR(50) CHECK (document_type IN ('pan_card', 'gst_certificate', 'registration_certificate', 'address_proof', 'company_logo', 'authorization_letter')),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected')),
  remarks TEXT,
  uploaded_at TIMESTAMP DEFAULT NOW()
);
```

### Security Considerations

1. **Row Level Security (RLS):** Ensure users can only access their own company profiles
2. **File Storage:** Use signed URLs with expiration for document access
3. **Input Sanitization:** Validate and sanitize all inputs server-side
4. **Rate Limiting:** Implement rate limits on document uploads
5. **Audit Logging:** Log all profile changes and admin actions

### Performance Optimizations

1. **Caching:** Cache profile data with Redis (invalidate on updates)
2. **CDN:** Serve documents through CDN for faster access
3. **Lazy Loading:** Load documents separately from profile data
4. **Indexes:** Add indexes on `user_id`, `verification_status`, `created_at`

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-01-15 | Initial API documentation created |

---

## Support

For API issues or questions:
- Email: api-support@yourdomain.com
- Slack: #api-support
- Documentation: https://docs.yourdomain.com/api/company-profile

---

**End of Documentation**
