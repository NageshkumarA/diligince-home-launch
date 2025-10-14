# Quotations Export API Documentation

## Overview
The Quotations Export API provides endpoints for exporting quotation data to XLSX and CSV formats for offline analysis and reporting.

## Base URL
```
/api/v1/industry/quotations/export
```

---

## Endpoints

### 1. Export to Excel (XLSX)

**Endpoint:** `GET /api/v1/industry/quotations/export/xlsx`

**Description:** Export quotations to Microsoft Excel format (.xlsx) with formatting and multiple sheets.

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| status | string | No | all | Filter by status (pending_review, approved, rejected, all) |
| vendorId | string | No | - | Filter by vendor ID |
| requirementId | string | No | - | Filter by requirement ID |
| fromDate | string | No | - | Start date (ISO 8601 format) |
| toDate | string | No | - | End date (ISO 8601 format) |
| minAmount | number | No | - | Minimum quoted amount |
| maxAmount | number | No | - | Maximum quoted amount |
| includeDocuments | boolean | No | false | Include document links |
| includeAIAnalysis | boolean | No | false | Include AI evaluation data |
| columns | string[] | No | all | Specific columns to include |

**Available Columns:**
- `quotationNumber`
- `requirementTitle`
- `vendorName`
- `quotedAmount`
- `submittedDate`
- `validUntil`
- `deliveryTimeWeeks`
- `status`
- `responseTime`
- `paymentTerms`
- `warrantyPeriod`
- `approvedDate`
- `rejectedDate`

**Response:** `200 OK`

**Content-Type:** `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`

**Headers:**
```
Content-Disposition: attachment; filename="quotations-export-2024-01-30.xlsx"
```

**File Structure:**

**Sheet 1: Summary**
- Total quotations count
- Status breakdown (pending, approved, rejected)
- Total quoted amount
- Average quoted amount
- Date range of export

**Sheet 2: Quotations**
| Column | Description |
|--------|-------------|
| Quotation Number | Unique quotation identifier |
| Requirement | Requirement title |
| Vendor | Vendor name |
| Quoted Amount | Amount with currency |
| Submitted Date | Date quotation was submitted |
| Valid Until | Quotation validity expiration |
| Delivery (Weeks) | Estimated delivery timeline |
| Status | Current quotation status |
| Payment Terms | Payment conditions |
| Response Time | Time taken to respond |

**Sheet 3: AI Analysis** (if `includeAIAnalysis=true`)
| Column | Description |
|--------|-------------|
| Quotation Number | Reference to main quotation |
| Overall Score | AI overall evaluation score |
| Price Score | Price competitiveness score |
| Delivery Score | Delivery timeline score |
| Recommendation | AI recommendation type |
| Risk Level | Risk assessment |
| Reasoning | AI reasoning summary |

**Formatting:**
- Header row: Bold, background color, freeze panes
- Currency columns: Formatted as currency with appropriate symbols
- Date columns: Short date format (MM/DD/YYYY)
- Status column: Color-coded cells based on status
- Number columns: Right-aligned with thousand separators

**Error Responses:**

- `400 Bad Request` - Invalid query parameters
- `401 Unauthorized` - Missing or invalid authentication token
- `500 Internal Server Error` - Export generation failed

---

### 2. Export to CSV

**Endpoint:** `GET /api/v1/industry/quotations/export/csv`

**Description:** Export quotations to comma-separated values format (.csv) for simple data import.

**Query Parameters:** Same as XLSX export endpoint.

**Response:** `200 OK`

**Content-Type:** `text/csv; charset=utf-8`

**Headers:**
```
Content-Disposition: attachment; filename="quotations-export-2024-01-30.csv"
```

**Format:**
```csv
Quotation Number,Requirement,Vendor,Quoted Amount,Currency,Submitted Date,Valid Until,Delivery Weeks,Status,Payment Terms,Response Time
QUO-001,Mobile App Development,TechSolutions Inc.,115000,USD,2024-01-29,2024-02-15,12,pending_review,Net 30,2 days
QUO-002,Supply Chain Optimization,LogiFlow Systems,62000,USD,2024-01-28,2024-02-20,8,under_evaluation,50% upfront,1 day
```

**Encoding:** UTF-8 with BOM for Excel compatibility

**Delimiter:** Comma (,)

**Quote Character:** Double quote (") for fields containing commas or newlines

**Line Ending:** CRLF (\r\n) for Windows compatibility

**Error Responses:** Same as XLSX export endpoint.

---

## Export Limits

| Limit Type | Value | Description |
|------------|-------|-------------|
| Max Records | 10,000 | Maximum quotations per export |
| File Size | 50 MB | Maximum file size |
| Rate Limit | 5/minute | Maximum export requests per minute |
| Timeout | 60 seconds | Export generation timeout |

---

## Best Practices

### 1. Filtering for Performance
Always apply filters to reduce export size:
```
/export/xlsx?status=approved&fromDate=2024-01-01&toDate=2024-01-31
```

### 2. Column Selection
Request only needed columns for faster exports:
```
/export/csv?columns=quotationNumber,vendorName,quotedAmount,status
```

### 3. Pagination for Large Datasets
For >10,000 quotations, export in batches:
```javascript
// Export Q1 data
/export/xlsx?fromDate=2024-01-01&toDate=2024-03-31

// Export Q2 data
/export/xlsx?fromDate=2024-04-01&toDate=2024-06-30
```

### 4. Error Handling
```javascript
try {
  const response = await fetch('/api/v1/industry/quotations/export/xlsx?status=approved');
  
  if (response.ok) {
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotations-export.xlsx';
    a.click();
  } else {
    console.error('Export failed:', response.statusText);
  }
} catch (error) {
  console.error('Export error:', error);
}
```

### 5. Progress Indication
For large exports, poll status endpoint:
```javascript
// Initiate export
const exportId = await initiateExport();

// Poll status
const checkStatus = async () => {
  const status = await fetch(`/api/v1/industry/quotations/export/${exportId}/status`);
  const data = await status.json();
  
  if (data.status === 'completed') {
    downloadFile(data.downloadUrl);
  } else if (data.status === 'failed') {
    handleError(data.error);
  } else {
    setTimeout(checkStatus, 2000); // Check again in 2 seconds
  }
};
```

---

## File Format Details

### XLSX Advantages
- ✅ Multiple sheets (summary + data + analysis)
- ✅ Cell formatting (colors, fonts, alignment)
- ✅ Formulas and calculations
- ✅ Better for human readability
- ✅ Preserves data types
- ❌ Larger file size
- ❌ Slower generation

### CSV Advantages
- ✅ Smaller file size
- ✅ Faster generation
- ✅ Universal compatibility
- ✅ Easy to parse programmatically
- ✅ Version control friendly
- ❌ No formatting
- ❌ Single flat structure
- ❌ Data type ambiguity

---

## Example Use Cases

### 1. Monthly Reporting
Export all approved quotations for the previous month:
```
GET /export/xlsx?status=approved&fromDate=2024-01-01&toDate=2024-01-31&includeAIAnalysis=true
```

### 2. Vendor Analysis
Export all quotations from a specific vendor:
```
GET /export/csv?vendorId=ven_def456&columns=quotationNumber,requirementTitle,quotedAmount,status,submittedDate
```

### 3. Budget Planning
Export quotations within budget range:
```
GET /export/xlsx?status=pending_review&minAmount=50000&maxAmount=150000
```

### 4. Audit Trail
Export complete quotation history with documents:
```
GET /export/xlsx?includeDocuments=true&fromDate=2024-01-01&toDate=2024-12-31
```

---

## Security Considerations

1. **Authentication Required:** All export endpoints require valid authentication
2. **Data Filtering:** Users can only export quotations they have permission to view
3. **Audit Logging:** All export operations are logged for compliance
4. **Rate Limiting:** Prevents abuse and ensures system stability
5. **Temporary URLs:** Download URLs expire after 15 minutes
6. **No Sensitive Data:** Excludes internal notes and sensitive vendor information
