# Quotations Comparison API Documentation

## Overview
The Quotations Comparison API enables side-by-side comparison of multiple vendor quotations, including AI-powered analysis and recommendations.

## Base URL
```
/api/v1/industry/quotations
```

---

## Endpoints

### 1. Compare Quotations

**Endpoint:** `POST /api/v1/industry/quotations/compare`

**Description:** Compare multiple quotations side-by-side for a specific requirement.

**Request Body:**

```typescript
{
  "quotationIds": ["quo_abc123", "quo_def456", "quo_ghi789"],
  "requirementId": "req_xyz789" // Optional, for validation
}
```

**Validation:**
- Minimum 2 quotations
- Maximum 10 quotations
- All quotations must be for the same requirement

**Response:** `200 OK`

```typescript
{
  "success": true,
  "data": {
    "requirementId": "req_xyz789",
    "requirementTitle": "Mobile App Development",
    "quotations": [
      {
        "id": "quo_abc123",
        "quotationNumber": "QUO-001",
        "vendorId": "ven_def456",
        "vendorName": "TechSolutions Inc.",
        "vendorRating": 4.5,
        "quotedAmount": 115000,
        "currency": "USD",
        "deliveryTimeWeeks": 12,
        "proposalSummary": "Comprehensive mobile app development",
        "paymentTerms": "Net 30",
        "warrantyPeriod": "12 months",
        "status": "pending_review",
        "submittedDate": "2024-01-29T10:30:00Z",
        "validUntil": "2024-02-15T23:59:59Z"
      },
      {
        "id": "quo_def456",
        "quotationNumber": "QUO-002",
        "vendorId": "ven_ghi789",
        "vendorName": "MobileExperts Ltd.",
        "vendorRating": 4.8,
        "quotedAmount": 98000,
        "currency": "USD",
        "deliveryTimeWeeks": 16,
        "proposalSummary": "Native mobile app development",
        "paymentTerms": "50% upfront, 50% on completion",
        "warrantyPeriod": "6 months",
        "status": "pending_review",
        "submittedDate": "2024-01-28T14:20:00Z",
        "validUntil": "2024-02-20T23:59:59Z"
      }
    ],
    "lowestPrice": {
      "quotationId": "quo_def456",
      "amount": 98000,
      "savings": 17000,
      "savingsPercentage": 14.78
    },
    "fastestDelivery": {
      "quotationId": "quo_abc123",
      "weeks": 12,
      "difference": 4
    },
    "highestRated": {
      "quotationId": "quo_def456",
      "vendorName": "MobileExperts Ltd.",
      "rating": 4.8
    }
  }
}
```

**Error Responses:**

- `400 Bad Request` - Invalid quotation count or mismatched requirements
- `404 Not Found` - One or more quotations not found
- `401 Unauthorized` - Missing or invalid authentication token
- `500 Internal Server Error` - Server error

---

### 2. AI-Powered Quotation Analysis

**Endpoint:** `POST /api/v1/industry/quotations/analyze`

**Description:** Get AI-powered analysis and recommendations for multiple quotations.

**Request Body:**

```typescript
{
  "requirementId": "req_xyz789",
  "quotationIds": ["quo_abc123", "quo_def456", "quo_ghi789"],
  "priorities": {
    "price": 40,        // Weight percentage (0-100)
    "delivery": 30,
    "quality": 20,
    "vendor_rating": 10
  }
}
```

**Response:** `200 OK`

```typescript
{
  "success": true,
  "data": {
    "requirementId": "req_xyz789",
    "requirementTitle": "Mobile App Development",
    "analysisDate": "2024-01-30T15:00:00Z",
    "evaluations": {
      "quo_abc123": {
        "overallScore": 85,
        "priceScore": 80,
        "deliveryScore": 90,
        "ratingScore": 90,
        "specializationScore": 85,
        "performanceScore": 82,
        "recommendation": "top_pick",
        "reasoning": "TechSolutions Inc. offers the best balance of competitive pricing, fast delivery, and proven track record. Their 12-week timeline is 25% faster than average, and their technical proposal demonstrates deep expertise in React Native development.",
        "riskLevel": "low",
        "strengths": [
          "Fastest delivery timeline (12 weeks)",
          "Strong technical expertise in React Native",
          "Excellent vendor rating (4.5/5)",
          "Comprehensive warranty (12 months)"
        ],
        "concerns": [
          "Price is 17% higher than lowest bid",
          "Net 30 payment terms may impact cash flow"
        ]
      },
      "quo_def456": {
        "overallScore": 82,
        "priceScore": 95,
        "deliveryScore": 70,
        "ratingScore": 96,
        "specializationScore": 88,
        "performanceScore": 78,
        "recommendation": "best_value",
        "reasoning": "MobileExperts Ltd. provides the most cost-effective solution with the highest vendor rating. While delivery is slower, the 15% cost savings and exceptional track record make this a strong alternative.",
        "riskLevel": "low",
        "strengths": [
          "Lowest price ($98,000 - 15% savings)",
          "Highest vendor rating (4.8/5)",
          "Native development approach ensures better performance",
          "Flexible payment terms"
        ],
        "concerns": [
          "Slower delivery timeline (16 weeks)",
          "Shorter warranty period (6 months)",
          "50% upfront payment requirement"
        ]
      }
    },
    "recommendation": {
      "topPick": {
        "quotationId": "quo_abc123",
        "vendorName": "TechSolutions Inc.",
        "reason": "Optimal balance of speed, quality, and risk mitigation"
      },
      "bestValue": {
        "quotationId": "quo_def456",
        "vendorName": "MobileExperts Ltd.",
        "reason": "Significant cost savings with minimal trade-offs"
      }
    },
    "summary": {
      "totalQuotationsAnalyzed": 2,
      "averagePrice": 106500,
      "priceRange": {
        "min": 98000,
        "max": 115000,
        "spread": 17000
      },
      "averageDelivery": 14,
      "deliveryRange": {
        "min": 12,
        "max": 16
      }
    }
  }
}
```

**Error Responses:**

- `400 Bad Request` - Invalid priorities (must sum to 100) or quotation count
- `404 Not Found` - Requirement or quotations not found
- `401 Unauthorized` - Missing or invalid authentication token
- `503 Service Unavailable` - AI service temporarily unavailable
- `500 Internal Server Error` - Server error

---

## AI Analysis Scoring Methodology

### Overall Score (0-100)
Weighted combination of individual scores based on user-defined priorities:

```
Overall Score = (Price Score × Price Weight) + 
                (Delivery Score × Delivery Weight) + 
                (Rating Score × Quality Weight) + 
                (Performance Score × Vendor Rating Weight)
```

### Individual Scores

**Price Score (0-100)**
- Calculated relative to all quotations in comparison
- Lowest price = 100 points
- Score decreases proportionally for higher prices
- Formula: `100 - ((Current Price - Lowest Price) / Lowest Price × 100)`

**Delivery Score (0-100)**
- Based on delivery timeline relative to requirement deadline
- Fastest delivery = 100 points
- Score decreases for longer timelines
- Considers criticality of timeline in requirement

**Rating Score (0-100)**
- Direct conversion of vendor rating (0-5 scale)
- Formula: `(Vendor Rating / 5) × 100`

**Specialization Score (0-100)**
- AI-assessed match between vendor expertise and requirement type
- Considers past performance in similar projects
- Reviews technical proposal quality and relevance

**Performance Score (0-100)**
- Historical vendor performance metrics:
  - On-time delivery rate (40%)
  - Budget adherence (30%)
  - Quality of deliverables (30%)

### Recommendation Types

| Type | Criteria |
|------|----------|
| `top_pick` | Highest overall score (>80) with low risk |
| `best_value` | Optimal price-to-quality ratio |
| `fastest_delivery` | Shortest timeline with acceptable quality |
| `highest_rated` | Best vendor rating with competitive pricing |
| `best_match` | Best specialization score for requirement type |

### Risk Levels

| Level | Criteria |
|-------|----------|
| `low` | Vendor rating >4.0, proven track record, clear proposal |
| `medium` | Vendor rating 3.0-4.0, some concerns in proposal or timeline |
| `high` | Vendor rating <3.0, significant concerns, or missing information |

---

## Best Practices

1. **Comparison Limit:** Compare 2-5 quotations for optimal analysis quality
2. **Priority Weights:** Ensure priorities sum to 100% for accurate scoring
3. **Fresh Analysis:** Request new analysis if quotations change significantly
4. **Context Matters:** AI recommendations should be considered alongside business context
5. **Risk Assessment:** Always review risk levels and concerns before final decision
6. **Vendor History:** Check vendor performance history for validation
