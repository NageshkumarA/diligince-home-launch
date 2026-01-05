# Vendor RFQ Browse API Specification

## Overview

API endpoints for vendors to browse, view, and interact with published RFQs (Requirements for Quotation).

**Backend Collection:** `requirementdrafts`  
**Filter Condition:** `status: 'published'`

---

## Endpoints

### 1. GET `/api/v1/vendors/rfqs/browse`

**Description:** Get paginated list of published requirements for vendors to browse

#### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `search` | string | No | - | Search in title, description, company name |
| `category` | string | No | - | Filter by category: `service`, `product`, `logistics`, `professional` |
| `priority` | string | No | - | Filter by priority: `critical`, `high`, `medium`, `low` |
| `minBudget` | number | No | - | Minimum budget amount (INR) |
| `maxBudget` | number | No | - | Maximum budget amount (INR) |
| `state` | string | No | - | Filter by state |
| `city` | string | No | - | Filter by city |
| `status` | string | No | `open` | Filter by status: `open`, `closing_soon` |
| `sortBy` | string | No | `postedDate` | Sort field: `deadline`, `budget`, `postedDate`, `relevance` |
| `sortOrder` | string | No | `desc` | Sort direction: `asc`, `desc` |
| `page` | number | No | 1 | Page number |
| `limit` | number | No | 12 | Items per page (max: 50) |

#### Request Example

```http
GET /api/v1/vendors/rfqs/browse?search=automation&category=service&priority=high&minBudget=100000&maxBudget=1000000&state=Maharashtra&sortBy=deadline&sortOrder=asc&page=1&limit=12
Authorization: Bearer <token>
```

#### Response (200 OK)

```json
{
  "success": true,
  "data": {
    "rfqs": [
      {
        "id": "req-2025-001",
        "title": "Industrial Automation Services",
        "description": "Looking for experienced automation service provider for our manufacturing unit. The project involves PLC programming, SCADA implementation, and integration with existing systems.",
        "category": "service",
        "priority": "high",
        "status": "open",
        "company": {
          "id": "company-123",
          "name": "TechCorp Industries",
          "logo": "https://storage.example.com/logos/techcorp.png",
          "location": "Mumbai, Maharashtra",
          "rating": 4.5,
          "verified": true
        },
        "budget": {
          "min": 500000,
          "max": 750000,
          "currency": "INR",
          "display": "₹5,00,000 - ₹7,50,000"
        },
        "deadline": "2025-01-20T23:59:59Z",
        "postedDate": "2025-01-05T10:30:00Z",
        "location": {
          "state": "Maharashtra",
          "city": "Mumbai",
          "address": "Industrial Area, Andheri East"
        },
        "requirements": [
          "ISO 9001:2015 Certification required",
          "Minimum 5 years experience in automation",
          "24/7 on-site support capability"
        ],
        "skills": ["PLC Programming", "SCADA", "Industrial IoT"],
        "responses": 12,
        "daysLeft": 15,
        "isClosingSoon": false,
        "isSaved": false,
        "hasApplied": false,
        "aiRecommendation": {
          "score": 92,
          "reasoning": "Strong match with your service portfolio",
          "matchFactors": ["Location match", "Category expertise", "Budget range"]
        }
      },
      {
        "id": "req-2025-002",
        "title": "Electrical Panel Manufacturing",
        "description": "Require vendor for manufacturing 50 industrial electrical panels with custom specifications for our new plant expansion.",
        "category": "product",
        "priority": "medium",
        "status": "open",
        "company": {
          "id": "company-456",
          "name": "PowerGrid Solutions",
          "logo": null,
          "location": "Pune, Maharashtra",
          "rating": 4.2,
          "verified": true
        },
        "budget": {
          "min": 200000,
          "max": 350000,
          "currency": "INR",
          "display": "₹2,00,000 - ₹3,50,000"
        },
        "deadline": "2025-01-25T23:59:59Z",
        "postedDate": "2025-01-03T14:00:00Z",
        "location": {
          "state": "Maharashtra",
          "city": "Pune",
          "address": "Pimpri Industrial Zone"
        },
        "requirements": [
          "BIS Certification",
          "Minimum 3 years in panel manufacturing"
        ],
        "skills": ["Electrical Panels", "Industrial Manufacturing"],
        "responses": 8,
        "daysLeft": 20,
        "isClosingSoon": false,
        "isSaved": true,
        "hasApplied": false,
        "aiRecommendation": null
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 12,
      "total": 156,
      "totalPages": 13,
      "hasNextPage": true,
      "hasPreviousPage": false
    },
    "filters": {
      "categories": [
        { "key": "service", "label": "Service", "count": 45 },
        { "key": "product", "label": "Product", "count": 67 },
        { "key": "logistics", "label": "Logistics", "count": 28 },
        { "key": "professional", "label": "Professional", "count": 16 }
      ],
      "priorities": [
        { "key": "critical", "label": "Critical", "count": 12 },
        { "key": "high", "label": "High", "count": 45 },
        { "key": "medium", "label": "Medium", "count": 78 },
        { "key": "low", "label": "Low", "count": 21 }
      ],
      "locations": [
        { "key": "Maharashtra", "count": 35 },
        { "key": "Karnataka", "count": 28 },
        { "key": "Gujarat", "count": 22 },
        { "key": "Tamil Nadu", "count": 18 }
      ],
      "budgetRange": {
        "min": 10000,
        "max": 10000000
      }
    }
  }
}
```

#### Error Responses

**401 Unauthorized**
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authentication required"
  }
}
```

**403 Forbidden**
```json
{
  "success": false,
  "error": {
    "code": "FORBIDDEN",
    "message": "Vendor profile not verified"
  }
}
```

---

### 2. GET `/api/v1/vendors/rfqs/:rfqId`

**Description:** Get full details of a single RFQ

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `rfqId` | string | Unique RFQ identifier |

#### Request Example

```http
GET /api/v1/vendors/rfqs/req-2025-001
Authorization: Bearer <token>
```

#### Response (200 OK)

```json
{
  "success": true,
  "data": {
    "id": "req-2025-001",
    "title": "Industrial Automation Services",
    "description": "Looking for experienced automation service provider for our manufacturing unit. The project involves PLC programming, SCADA implementation, and integration with existing systems. The scope includes design, development, testing, installation, and commissioning of the automation system.\n\nKey objectives:\n- Improve production efficiency by 30%\n- Reduce manual intervention\n- Real-time monitoring and reporting",
    "category": "service",
    "priority": "high",
    "status": "open",
    "company": {
      "id": "company-123",
      "name": "TechCorp Industries",
      "logo": "https://storage.example.com/logos/techcorp.png",
      "location": "Mumbai, Maharashtra",
      "industry": "Manufacturing",
      "rating": 4.5,
      "totalProjects": 25,
      "verified": true,
      "memberSince": "2020-05-15"
    },
    "budget": {
      "min": 500000,
      "max": 750000,
      "currency": "INR",
      "display": "₹5,00,000 - ₹7,50,000",
      "isNegotiable": true
    },
    "timeline": {
      "postedDate": "2025-01-05T10:30:00Z",
      "deadline": "2025-01-20T23:59:59Z",
      "expectedStartDate": "2025-02-01",
      "expectedDuration": "3 months",
      "daysLeft": 15
    },
    "location": {
      "state": "Maharashtra",
      "city": "Mumbai",
      "address": "Industrial Area, Andheri East, Mumbai 400093",
      "isRemoteAllowed": false
    },
    "specifications": {
      "requirements": [
        "ISO 9001:2015 Certification required",
        "Minimum 5 years experience in industrial automation",
        "24/7 on-site support capability during implementation",
        "Experience with Siemens or Allen Bradley PLCs"
      ],
      "skills": ["PLC Programming", "SCADA", "Industrial IoT", "HMI Design"],
      "deliverables": [
        "Complete automation solution design document",
        "PLC programming and testing",
        "SCADA system implementation",
        "Training for 10 staff members",
        "1-year warranty support"
      ],
      "technicalDetails": "The plant has 5 production lines with various machinery including CNC machines, conveyor systems, and packaging units. Current control system uses legacy relay-based controls that need to be upgraded to PLC-based automation."
    },
    "attachments": [
      {
        "id": "att-001",
        "name": "Technical_Requirements_v2.pdf",
        "type": "application/pdf",
        "size": 2456789,
        "url": "https://storage.example.com/attachments/att-001.pdf"
      },
      {
        "id": "att-002",
        "name": "Plant_Layout.dwg",
        "type": "application/dwg",
        "size": 1234567,
        "url": "https://storage.example.com/attachments/att-002.dwg"
      }
    ],
    "evaluation": {
      "criteria": ["Price", "Quality", "Timeline", "Experience"],
      "weightage": {
        "Price": 30,
        "Quality": 35,
        "Timeline": 20,
        "Experience": 15
      }
    },
    "responses": 12,
    "hasApplied": false,
    "isSaved": false,
    "aiRecommendation": {
      "score": 92,
      "reasoning": "Strong match with your service portfolio and expertise in industrial automation",
      "matchFactors": [
        "Location match - Same city as your office",
        "Category expertise - Automation is your primary specialization",
        "Budget range - Within your typical project range",
        "Skills match - 4/4 required skills match your profile"
      ],
      "suggestedBid": "₹6,50,000",
      "winProbability": 75
    }
  }
}
```

#### Error Responses

**404 Not Found**
```json
{
  "success": false,
  "error": {
    "code": "RFQ_NOT_FOUND",
    "message": "RFQ not found or no longer available"
  }
}
```

---

### 3. GET `/api/v1/vendors/rfqs/stats`

**Description:** Get RFQ statistics for vendor dashboard

#### Request Example

```http
GET /api/v1/vendors/rfqs/stats
Authorization: Bearer <token>
```

#### Response (200 OK)

```json
{
  "success": true,
  "data": {
    "totalAvailable": 156,
    "aiRecommended": 24,
    "closingSoon": 8,
    "newThisWeek": 32,
    "appliedCount": 5,
    "savedCount": 12,
    "categoryBreakdown": {
      "service": 45,
      "product": 67,
      "logistics": 28,
      "professional": 16
    }
  }
}
```

---

### 4. POST `/api/v1/vendors/rfqs/:rfqId/save`

**Description:** Save/bookmark an RFQ for later

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `rfqId` | string | Unique RFQ identifier |

#### Request Example

```http
POST /api/v1/vendors/rfqs/req-2025-001/save
Authorization: Bearer <token>
```

#### Response (201 Created)

```json
{
  "success": true,
  "message": "RFQ saved successfully",
  "data": {
    "rfqId": "req-2025-001",
    "savedAt": "2025-01-05T12:00:00Z"
  }
}
```

#### Error Responses

**409 Conflict**
```json
{
  "success": false,
  "error": {
    "code": "ALREADY_SAVED",
    "message": "RFQ is already saved"
  }
}
```

---

### 5. DELETE `/api/v1/vendors/rfqs/:rfqId/save`

**Description:** Remove RFQ from saved list

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `rfqId` | string | Unique RFQ identifier |

#### Request Example

```http
DELETE /api/v1/vendors/rfqs/req-2025-001/save
Authorization: Bearer <token>
```

#### Response (200 OK)

```json
{
  "success": true,
  "message": "RFQ removed from saved list"
}
```

---

## Data Models

### RFQ Browse Item

```typescript
interface RFQBrowseItem {
  id: string;
  title: string;
  description: string;
  category: 'service' | 'product' | 'logistics' | 'professional';
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'open' | 'closing_soon';
  company: {
    id: string;
    name: string;
    logo: string | null;
    location: string;
    rating: number;
    verified: boolean;
  };
  budget: {
    min: number;
    max: number;
    currency: string;
    display: string;
  };
  deadline: string; // ISO 8601
  postedDate: string; // ISO 8601
  location: {
    state: string;
    city: string;
    address?: string;
  };
  requirements: string[];
  skills: string[];
  responses: number;
  daysLeft: number;
  isClosingSoon: boolean;
  isSaved: boolean;
  hasApplied: boolean;
  aiRecommendation?: {
    score: number;
    reasoning: string;
    matchFactors: string[];
  } | null;
}
```

### RFQ Detail

```typescript
interface RFQDetail extends RFQBrowseItem {
  company: {
    id: string;
    name: string;
    logo: string | null;
    location: string;
    industry: string;
    rating: number;
    totalProjects: number;
    verified: boolean;
    memberSince: string;
  };
  budget: {
    min: number;
    max: number;
    currency: string;
    display: string;
    isNegotiable: boolean;
  };
  timeline: {
    postedDate: string;
    deadline: string;
    expectedStartDate: string;
    expectedDuration: string;
    daysLeft: number;
  };
  location: {
    state: string;
    city: string;
    address: string;
    isRemoteAllowed: boolean;
  };
  specifications: {
    requirements: string[];
    skills: string[];
    deliverables: string[];
    technicalDetails: string;
  };
  attachments: Array<{
    id: string;
    name: string;
    type: string;
    size: number;
    url: string;
  }>;
  evaluation: {
    criteria: string[];
    weightage: Record<string, number>;
  };
  aiRecommendation?: {
    score: number;
    reasoning: string;
    matchFactors: string[];
    suggestedBid: string;
    winProbability: number;
  } | null;
}
```

---

## Backend Implementation Notes

### Database Query (requirementdrafts collection)

```javascript
// Filter for browse endpoint
{
  status: 'published',
  deadline: { $gte: new Date() }, // Only active RFQs
  category: { $in: vendorCategories }, // Match vendor's categories
}
```

### AI Recommendation Logic (Optional - Phase 2)

1. Match vendor specializations with RFQ skills
2. Calculate location proximity
3. Analyze budget range fit
4. Consider vendor's past win rate in similar categories
5. Generate match score (0-100)

### Closing Soon Logic

RFQ is marked as `isClosingSoon: true` when:
- `daysLeft <= 3`
- OR `deadline` is within 72 hours

### Vendor Category Filtering

- Service vendors see: `category: 'service'`
- Product vendors see: `category: 'product'`
- Logistics vendors see: `category: 'logistics'`
- Optionally show `professional` category to all vendors

---

## Frontend-Backend Field Mapping

| Frontend Display | Backend Field |
|------------------|---------------|
| Company Name | `company.name` |
| Budget Range | `budget.display` |
| Deadline | `deadline` (ISO 8601) |
| Days Left | `daysLeft` (calculated) |
| Location | `location.city, location.state` |
| Requirements | `specifications.requirements[]` |
| Skills | `specifications.skills[]` |
| Responses | `responses` (count) |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-01-05 | Initial specification |
