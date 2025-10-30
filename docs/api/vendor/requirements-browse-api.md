# Vendor Requirements Browse API

## Overview

The Requirements Browse API allows vendors and professionals to discover, filter, and search through available requirements (RFQs/RFPs) posted by industry companies. This API powers the vendor requirement feed with AI-powered recommendations and advanced filtering capabilities.

**Base Path:** `/api/v1/requirements`

**Authentication:** Required (JWT Bearer Token)

**User Roles:** `Vendor`, `Professional`

---

## Endpoints

### 1. Browse Requirements (Paginated List)

Retrieve a paginated list of requirements visible to the authenticated vendor/professional.

**Endpoint:** `GET /api/v1/requirements/browse`

**Authentication:** Required

**Query Parameters:**

| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------|
| `page` | integer | No | Page number (default: 1) | `1` |
| `limit` | integer | No | Items per page (default: 20, max: 100) | `20` |
| `category` | string | No | Filter by requirement category | `service`, `product`, `logistics`, `professional` |
| `status` | string | No | Filter by requirement status | `published`, `closing-soon`, `invited`, `new` |
| `minBudget` | number | No | Minimum budget filter (in USD) | `10000` |
| `maxBudget` | number | No | Maximum budget filter (in USD) | `100000` |
| `location` | string | No | Filter by location/region | `New York`, `Remote` |
| `deadline` | string | No | Filter by deadline date (ISO 8601) | `2025-12-31` |
| `search` | string | No | Search query (searches title, description, company) | `software development` |
| `sortBy` | string | No | Sort field | `deadline`, `budget`, `postedDate`, `responses` |
| `sortOrder` | string | No | Sort order | `asc`, `desc` |

**Request Example:**

```http
GET /api/v1/requirements/browse?category=service&status=published&limit=20&page=1&sortBy=deadline&sortOrder=asc HTTP/1.1
Host: api.yourplatform.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response Format:**

```typescript
{
  "success": true,
  "data": {
    "requirements": RequirementWithAI[],
    "pagination": {
      "page": number,
      "limit": number,
      "total": number,
      "hasMore": boolean,
      "totalPages": number
    }
  }
}
```

**Response Example:**

```json
{
  "success": true,
  "data": {
    "requirements": [
      {
        "id": "req_abc123",
        "title": "Full-Stack Developer for E-commerce Platform",
        "description": "We are seeking an experienced full-stack developer to build a modern e-commerce platform with React and Node.js...",
        "category": "professional",
        "priority": "high",
        "deadline": "2025-12-15T23:59:59Z",
        "budget": "$50,000 - $80,000",
        "status": "published",
        "company": "TechCorp Solutions",
        "location": "Remote",
        "postedDate": "2025-10-20T10:30:00Z",
        "responses": 12,
        "requirements": [
          "5+ years of React experience",
          "Node.js and Express.js expertise",
          "Experience with PostgreSQL",
          "Strong understanding of AWS services"
        ],
        "aiRecommendation": {
          "relevanceScore": 92,
          "reasoning": "Perfect match for your React and Node.js expertise. Client has high rating and budget aligns with your typical projects.",
          "matchFactors": [
            "Technology stack match: React, Node.js",
            "Experience level match: 5+ years",
            "Remote work preference match"
          ],
          "suggestedBid": "$65,000",
          "estimatedWinProbability": 78,
          "competitorCount": 12,
          "clientRating": 4.8
        }
      },
      {
        "id": "req_xyz789",
        "title": "Industrial Equipment Maintenance Services",
        "description": "Seeking a vendor to provide quarterly maintenance services for manufacturing equipment...",
        "category": "service",
        "priority": "critical",
        "deadline": "2025-11-01T23:59:59Z",
        "budget": "$200,000 - $300,000",
        "status": "closing-soon",
        "company": "Manufacturing Industries Inc.",
        "location": "Chicago, IL",
        "postedDate": "2025-10-15T08:00:00Z",
        "responses": 8,
        "requirements": [
          "ISO 9001 certification required",
          "10+ years of industrial equipment experience",
          "24/7 emergency response capability",
          "Insurance coverage minimum $5M"
        ],
        "aiRecommendation": {
          "relevanceScore": 85,
          "reasoning": "Good fit based on your service category and certifications. Closing soon - act quickly!",
          "matchFactors": [
            "Service category match",
            "ISO 9001 certified",
            "Geographic proximity"
          ],
          "suggestedBid": "$245,000",
          "estimatedWinProbability": 65,
          "competitorCount": 8,
          "clientRating": 4.5
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 47,
      "hasMore": true,
      "totalPages": 3
    }
  }
}
```

---

### 2. Get AI-Recommended Requirements

Retrieve personalized AI-recommended requirements based on vendor/professional profile, expertise, and historical data.

**Endpoint:** `GET /api/v1/requirements/recommended/{userType}`

**Authentication:** Required

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `userType` | string | Yes | User type: `vendor` or `professional` |

**Response Format:**

```typescript
{
  "success": true,
  "data": RequirementWithAI[]
}
```

**Response Example:**

```json
{
  "success": true,
  "data": [
    {
      "id": "req_rec001",
      "title": "Cloud Infrastructure Migration Project",
      "description": "Migrate legacy systems to AWS cloud infrastructure...",
      "category": "service",
      "priority": "high",
      "deadline": "2026-01-15T23:59:59Z",
      "budget": "$150,000 - $200,000",
      "status": "new",
      "company": "Global Enterprises Ltd",
      "location": "New York, NY",
      "postedDate": "2025-10-28T14:20:00Z",
      "responses": 3,
      "requirements": [
        "AWS Solutions Architect certification",
        "5+ years cloud migration experience",
        "Experience with containerization (Docker/Kubernetes)"
      ],
      "aiRecommendation": {
        "relevanceScore": 95,
        "reasoning": "Excellent match! Your AWS expertise and migration experience align perfectly. Client has a strong history of paying on time and providing positive feedback.",
        "matchFactors": [
          "AWS Solutions Architect certified",
          "7 years cloud migration experience",
          "Previous projects in similar industry",
          "Budget aligns with your rate card"
        ],
        "suggestedBid": "$175,000",
        "estimatedWinProbability": 82,
        "competitorCount": 3,
        "clientRating": 4.9
      }
    }
  ]
}
```

---

### 3. Get Requirement Details

Retrieve detailed information about a specific requirement.

**Endpoint:** `GET /api/v1/requirements/{requirementId}`

**Authentication:** Required

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `requirementId` | string | Yes | Unique requirement identifier |

**Response Format:**

```typescript
{
  "success": true,
  "data": RequirementWithAI
}
```

**Response Example:**

```json
{
  "success": true,
  "data": {
    "id": "req_abc123",
    "title": "Enterprise Software Development",
    "description": "We need a development team to build a custom enterprise resource planning (ERP) system...",
    "category": "professional",
    "priority": "critical",
    "deadline": "2026-03-31T23:59:59Z",
    "budget": "$500,000 - $750,000",
    "status": "published",
    "company": "Fortune 500 Manufacturing",
    "location": "San Francisco, CA",
    "postedDate": "2025-10-25T09:00:00Z",
    "responses": 18,
    "requirements": [
      "10+ years enterprise software development",
      "Experience with ERP systems",
      "Team of at least 5 developers",
      "Agile/Scrum methodology",
      "On-site availability 2 days/week"
    ],
    "aiRecommendation": {
      "relevanceScore": 88,
      "reasoning": "Strong fit based on your team size and ERP experience. High-value project with reputable client.",
      "matchFactors": [
        "Team size: 8 developers",
        "3 previous ERP implementations",
        "San Francisco Bay Area presence",
        "Agile certified team"
      ],
      "suggestedBid": "$625,000",
      "estimatedWinProbability": 71,
      "competitorCount": 18,
      "clientRating": 4.7
    }
  }
}
```

---

### 4. Get Requirements Statistics

Get dashboard statistics for the authenticated vendor/professional.

**Endpoint:** `GET /api/v1/requirements/stats/{userType}`

**Authentication:** Required

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `userType` | string | Yes | User type: `vendor` or `professional` |

**Response Format:**

```typescript
{
  "success": true,
  "data": {
    "totalAvailable": number,
    "aiRecommended": number,
    "yourApplications": number,
    "closingSoon": number
  }
}
```

**Response Example:**

```json
{
  "success": true,
  "data": {
    "totalAvailable": 127,
    "aiRecommended": 8,
    "yourApplications": 15,
    "closingSoon": 6
  }
}
```

---

### 5. Apply to Requirement

Submit an application/expression of interest for a requirement.

**Endpoint:** `POST /api/v1/requirements/{requirementId}/apply`

**Authentication:** Required

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `requirementId` | string | Yes | Unique requirement identifier |

**Request Body:**

```typescript
{
  "message": string,           // Cover message/introduction
  "attachments"?: string[]     // Array of document URLs
}
```

**Request Example:**

```json
{
  "message": "We are excited to apply for this project. Our team has extensive experience with similar ERP implementations...",
  "attachments": [
    "https://storage.platform.com/docs/company-profile.pdf",
    "https://storage.platform.com/docs/case-studies.pdf"
  ]
}
```

**Response Format:**

```typescript
{
  "success": true,
  "data": {
    "applicationId": string,
    "status": "submitted",
    "submittedAt": string
  }
}
```

---

### 6. Submit Quote for Requirement

Submit a detailed quotation for a requirement.

**Endpoint:** `POST /api/v1/requirements/{requirementId}/submit-quote`

**Authentication:** Required

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `requirementId` | string | Yes | Unique requirement identifier |

**Request Body:**

```typescript
{
  "totalAmount": number,
  "currency": string,
  "validUntil": string,          // ISO 8601 date
  "deliveryTimeline": string,
  "terms": string,
  "lineItems": {
    "description": string,
    "quantity": number,
    "unitPrice": number,
    "totalPrice": number
  }[],
  "notes"?: string,
  "attachments"?: string[]
}
```

**Request Example:**

```json
{
  "totalAmount": 625000,
  "currency": "USD",
  "validUntil": "2025-12-31T23:59:59Z",
  "deliveryTimeline": "6 months from contract signing",
  "terms": "Payment terms: 30% upfront, 40% mid-project, 30% on completion",
  "lineItems": [
    {
      "description": "Requirements Analysis & Design",
      "quantity": 1,
      "unitPrice": 125000,
      "totalPrice": 125000
    },
    {
      "description": "Development (Phase 1-3)",
      "quantity": 1,
      "unitPrice": 400000,
      "totalPrice": 400000
    },
    {
      "description": "Testing & Quality Assurance",
      "quantity": 1,
      "unitPrice": 75000,
      "totalPrice": 75000
    },
    {
      "description": "Deployment & Training",
      "quantity": 1,
      "unitPrice": 25000,
      "totalPrice": 25000
    }
  ],
  "notes": "Price includes 3 months post-launch support",
  "attachments": [
    "https://storage.platform.com/quotes/detailed-proposal.pdf"
  ]
}
```

**Response Format:**

```typescript
{
  "success": true,
  "data": {
    "quoteId": string,
    "status": "submitted",
    "submittedAt": string
  }
}
```

---

## Data Models

### RequirementWithAI

```typescript
interface RequirementWithAI {
  // Basic Requirement Data
  id: string;
  title: string;
  description: string;
  category: 'service' | 'product' | 'logistics' | 'professional';
  priority: 'critical' | 'high' | 'medium' | 'low';
  deadline: string;              // ISO 8601 date
  budget: string;                // Human-readable budget range
  status: 'published' | 'closing-soon' | 'invited' | 'new';
  company: string;
  location: string;
  postedDate: string;            // ISO 8601 date
  responses: number;
  requirements: string[];        // List of requirement items
  
  // AI Recommendation Data (optional)
  aiRecommendation?: AIRecommendation;
}
```

### AIRecommendation

```typescript
interface AIRecommendation {
  relevanceScore: number;          // 0-100
  reasoning: string;               // Human-readable explanation
  matchFactors: string[];          // List of matching factors
  suggestedBid?: string;           // AI-suggested bid amount
  estimatedWinProbability?: number; // 0-100 percentage
  competitorCount?: number;        // Number of competing vendors
  clientRating?: number;           // 0-5 star rating
}
```

---

## Error Responses

### Standard Error Format

```typescript
{
  "success": false,
  "error": {
    "code": string,
    "message": string,
    "details"?: any
  }
}
```

### Common Error Codes

| HTTP Status | Error Code | Description |
|-------------|------------|-------------|
| 401 | `UNAUTHORIZED` | Missing or invalid authentication token |
| 403 | `FORBIDDEN` | User doesn't have permission to access this requirement |
| 404 | `NOT_FOUND` | Requirement not found |
| 400 | `INVALID_FILTERS` | Invalid filter parameters provided |
| 400 | `INVALID_QUOTE` | Invalid quote submission data |
| 429 | `RATE_LIMIT_EXCEEDED` | Too many requests |
| 500 | `INTERNAL_ERROR` | Internal server error |

**Error Example:**

```json
{
  "success": false,
  "error": {
    "code": "FORBIDDEN",
    "message": "You do not have permission to view this requirement",
    "details": {
      "requirementId": "req_abc123",
      "reason": "Requirement is marked as private and you are not on the invited vendor list"
    }
  }
}
```

---

## Frontend Integration

### Service Implementation

**File:** `src/services/modules/requirements/requirements-feed.service.ts`

```typescript
class RequirementsFeedService {
  async getBrowseRequirements(filters?: BrowseFilters): Promise<RequirementListResponse> {
    return apiService.get<RequirementListResponse>(
      requirementsFeedRoutes.browse(filters)
    );
  }

  async getRecommendedRequirements(userType: string): Promise<RequirementWithAI[]> {
    return apiService.get<RequirementWithAI[]>(
      requirementsFeedRoutes.recommended(userType)
    );
  }

  async getRequirementDetails(requirementId: string): Promise<RequirementWithAI> {
    return apiService.get<RequirementWithAI>(
      requirementsFeedRoutes.getById(requirementId)
    );
  }

  async getStats(userType: string): Promise<RequirementsFeedStats> {
    return apiService.get<RequirementsFeedStats>(
      requirementsFeedRoutes.stats(userType)
    );
  }
}
```

---

## Backend Implementation Notes

### Database Schema

**Table:** `requirements`

```sql
CREATE TABLE requirements (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  priority VARCHAR(20) NOT NULL,
  deadline TIMESTAMP NOT NULL,
  budget_min DECIMAL(15, 2),
  budget_max DECIMAL(15, 2),
  budget_display VARCHAR(100),
  status VARCHAR(50) NOT NULL,
  company_id VARCHAR(50) NOT NULL,
  location VARCHAR(255),
  posted_date TIMESTAMP DEFAULT NOW(),
  responses_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  INDEX idx_category (category),
  INDEX idx_status (status),
  INDEX idx_deadline (deadline),
  INDEX idx_posted_date (posted_date)
);
```

**Table:** `requirement_items`

```sql
CREATE TABLE requirement_items (
  id VARCHAR(50) PRIMARY KEY,
  requirement_id VARCHAR(50) NOT NULL,
  item_text TEXT NOT NULL,
  sort_order INT,
  FOREIGN KEY (requirement_id) REFERENCES requirements(id) ON DELETE CASCADE
);
```

### AI Recommendation Logic

The AI recommendation system should consider:

1. **Profile Matching:**
   - Vendor/professional skills vs requirement needs
   - Experience level match
   - Geographic proximity
   - Category specialization

2. **Historical Performance:**
   - Past win rate on similar requirements
   - Average project value
   - Client satisfaction ratings
   - On-time delivery record

3. **Market Intelligence:**
   - Number of competitors
   - Typical bid ranges for similar projects
   - Client payment history and ratings
   - Industry-specific trends

4. **Urgency Factors:**
   - Closing soon requirements (boost score)
   - Invited-only opportunities (higher probability)
   - New postings (less competition)

**Relevance Score Calculation:**

```typescript
relevanceScore = (
  profileMatch * 0.40 +
  historicalPerformance * 0.30 +
  marketIntelligence * 0.20 +
  urgencyFactors * 0.10
) * 100
```

### Performance Considerations

1. **Caching:**
   - Cache requirement listings for 5 minutes
   - Cache AI recommendations for 15 minutes
   - Invalidate cache on new requirement posting

2. **Pagination:**
   - Default page size: 20 items
   - Maximum page size: 100 items
   - Use cursor-based pagination for large datasets

3. **Indexing:**
   - Index on `category`, `status`, `deadline`
   - Full-text search index on `title`, `description`
   - Composite index on `(category, status, deadline)`

4. **Rate Limiting:**
   - 100 requests per minute per user
   - 1000 requests per hour per user

---

## Testing

### Test Scenarios

1. **Browse with Filters:**
   ```bash
   curl -X GET "https://api.platform.com/api/v1/requirements/browse?category=service&status=published&limit=10" \
     -H "Authorization: Bearer YOUR_TOKEN"
   ```

2. **Get AI Recommendations:**
   ```bash
   curl -X GET "https://api.platform.com/api/v1/requirements/recommended/vendor" \
     -H "Authorization: Bearer YOUR_TOKEN"
   ```

3. **Search Requirements:**
   ```bash
   curl -X GET "https://api.platform.com/api/v1/requirements/browse?search=software+development&limit=20" \
     -H "Authorization: Bearer YOUR_TOKEN"
   ```

4. **Submit Quote:**
   ```bash
   curl -X POST "https://api.platform.com/api/v1/requirements/req_abc123/submit-quote" \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "totalAmount": 50000,
       "currency": "USD",
       "validUntil": "2025-12-31T23:59:59Z",
       "deliveryTimeline": "3 months",
       "terms": "Net 30",
       "lineItems": [...]
     }'
   ```

---

## Migration Guide

### From Mock to Real API

**Current Mock Implementation:**
```typescript
// Mock filtering logic
let filteredRequirements = [...mockRequirements];
if (filters?.category) {
  filteredRequirements = filteredRequirements.filter(r => r.category === filters.category);
}
```

**Real API Implementation:**
```typescript
// Replace with API call
return apiService.get<RequirementListResponse>(
  requirementsFeedRoutes.browse(filters)
);
```

**Steps:**
1. Remove mock data imports
2. Uncomment API service calls in `requirements-feed.service.ts`
3. Update error handling for network failures
4. Add loading states and retry logic
5. Test with various filter combinations

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-10-30 | Initial API specification |

---

## Support

For backend implementation questions, contact the platform engineering team.

For frontend integration support, refer to `src/services/modules/requirements/` directory.
