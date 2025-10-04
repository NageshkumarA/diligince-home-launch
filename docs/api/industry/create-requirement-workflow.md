# Create Requirement Workflow Documentation

## Overview

This document provides visual workflow diagrams and business logic documentation for the Create Requirement process.

---

## Complete 6-Step Workflow

```mermaid
graph TD
    Start([User Starts Create Requirement]) --> CheckDraft{Resume<br/>Existing Draft?}
    
    CheckDraft -->|Yes| LoadDraft[Load Draft Data]
    CheckDraft -->|No| CreateDraft[Create New Draft]
    
    LoadDraft --> Step1
    CreateDraft --> Step1
    
    Step1[Step 1: Basic Information<br/>- Title<br/>- Category<br/>- Priority<br/>- Business Justification<br/>- Budget] --> ValidateStep1{Validate<br/>Step 1}
    
    ValidateStep1 -->|Invalid| ShowErrors1[Show Validation Errors]
    ShowErrors1 --> Step1
    ValidateStep1 -->|Valid| SaveDraft1[Auto-Save Draft]
    
    SaveDraft1 --> Step2[Step 2: Details<br/>Category-Specific Fields]
    
    Step2 --> CheckCategory{Category<br/>Type?}
    
    CheckCategory -->|Expert| ExpertFields[Specialization<br/>Certifications<br/>Duration]
    CheckCategory -->|Product| ProductFields[Specifications<br/>Quantity<br/>Standards]
    CheckCategory -->|Service| ServiceFields[Scope of Work<br/>Performance Metrics<br/>Location]
    CheckCategory -->|Logistics| LogisticsFields[Equipment Type<br/>Pickup/Delivery<br/>Special Handling]
    
    ExpertFields --> ValidateStep2{Validate<br/>Step 2}
    ProductFields --> ValidateStep2
    ServiceFields --> ValidateStep2
    LogisticsFields --> ValidateStep2
    
    ValidateStep2 -->|Invalid| ShowErrors2[Show Validation Errors]
    ShowErrors2 --> Step2
    ValidateStep2 -->|Valid| SaveDraft2[Auto-Save Draft]
    
    SaveDraft2 --> Step3[Step 3: Documents<br/>Upload Files Optional]
    
    Step3 --> CheckUpload{Upload<br/>Documents?}
    CheckUpload -->|Yes| UploadDocs[Upload Documents<br/>Max 5 files, 10MB each]
    CheckUpload -->|No| Step4
    UploadDocs --> ValidateFiles{Files<br/>Valid?}
    ValidateFiles -->|Invalid| FileError[Show File Errors]
    FileError --> Step3
    ValidateFiles -->|Valid| SaveDraft3[Save Documents]
    SaveDraft3 --> Step4
    
    Step4[Step 4: Approval Workflow<br/>Configure Approvals] --> CheckBudget{Budget ><br/>Threshold?}
    
    CheckBudget -->|Yes| RequireApproval[Approval Required<br/>Select Workflow]
    CheckBudget -->|No| NoApproval[No Approval Required]
    
    RequireApproval --> CheckEmergency{Emergency<br/>Publish?}
    CheckEmergency -->|Yes| EmergencyBypass[Bypass Approval<br/>Post-Review Required]
    CheckEmergency -->|No| ConfigureApproval[Configure Approval<br/>Workflow]
    
    NoApproval --> SaveDraft4[Save Configuration]
    EmergencyBypass --> SaveDraft4
    ConfigureApproval --> SaveDraft4
    
    SaveDraft4 --> Step5[Step 5: Preview<br/>Review All Information]
    
    Step5 --> UserReview{Review<br/>Complete?}
    UserReview -->|Need Changes| GoBack[Navigate to Previous Step]
    GoBack --> Step1
    UserReview -->|Approved| Step6
    
    Step6[Step 6: Publish<br/>Set Deadline & Criteria] --> ValidateStep6{Validate<br/>Step 6}
    
    ValidateStep6 -->|Invalid| ShowErrors6[Show Validation Errors]
    ShowErrors6 --> Step6
    ValidateStep6 -->|Valid| CheckTerms{Terms<br/>Accepted?}
    
    CheckTerms -->|No| ShowTermsError[Must Accept Terms]
    ShowTermsError --> Step6
    CheckTerms -->|Yes| CheckApprovalStatus{Approval<br/>Required?}
    
    CheckApprovalStatus -->|No| PublishImmediate[Publish Immediately<br/>Notify Vendors]
    CheckApprovalStatus -->|Yes| SubmitApproval[Submit for Approval<br/>Notify Approvers]
    
    PublishImmediate --> Published([Requirement Published])
    SubmitApproval --> PendingApproval([Pending Approval])
    
    PendingApproval --> ApprovalProcess[Approval Process]
    ApprovalProcess --> CheckApprovalResult{Approval<br/>Result}
    CheckApprovalResult -->|Approved| PublishAfterApproval[Publish Requirement<br/>Notify Vendors]
    CheckApprovalResult -->|Rejected| Rejected([Requirement Rejected])
    
    PublishAfterApproval --> Published
    
    Published --> MonitorResponses[Monitor Vendor Responses]
    Rejected --> NotifyRequester[Notify Requester]
    
    style Start fill:#e1f5e1
    style Published fill:#e1f5e1
    style PendingApproval fill:#fff4e1
    style Rejected fill:#ffe1e1
```

---

## Auto-Save Draft Mechanism

```mermaid
sequenceDiagram
    participant User
    participant UI as React Component
    participant Context as RequirementContext
    participant API as Backend API
    participant DB as Database
    
    User->>UI: Fill Form Fields
    UI->>Context: updateFormData(data)
    Context->>Context: Update Local State
    
    User->>UI: Click "Next" Button
    UI->>Context: validateStep(stepNumber)
    Context->>Context: Run Validation Logic
    
    alt Validation Passes
        Context->>UI: Return Valid
        UI->>Context: saveAsDraft()
        Context->>API: PATCH /draft/:id
        API->>DB: Update Draft Record
        DB-->>API: Success
        API-->>Context: Draft Saved
        Context->>Context: Update lastSaved timestamp
        UI->>UI: Navigate to Next Step
        UI->>User: Show Success Toast
    else Validation Fails
        Context->>UI: Return Errors
        UI->>User: Show Validation Errors
        User->>UI: Fix Errors
        UI->>Context: updateFormData(correctedData)
    end
```

---

## Approval Workflow Decision Tree

```mermaid
graph TD
    Start([Requirement Submitted]) --> CheckBudget{Budget Amount}
    
    CheckBudget -->|< $5,000| NoApproval[No Approval Required]
    CheckBudget -->|$5,000 - $25,000| Level1[Level 1 Approval<br/>Department Head]
    CheckBudget -->|$25,000 - $100,000| Level2[Level 1 & 2 Approval<br/>Dept Head + Finance Manager]
    CheckBudget -->|> $100,000| Level3[Level 1, 2 & 3 Approval<br/>Dept Head + Finance + CFO]
    
    NoApproval --> PublishDirect[Publish Immediately]
    
    Level1 --> CheckPriority1{Priority}
    CheckPriority1 -->|Critical| Urgent1[Deadline: 1 Day]
    CheckPriority1 -->|High| Normal1[Deadline: 2 Days]
    CheckPriority1 -->|Medium/Low| Standard1[Deadline: 3 Days]
    
    Urgent1 --> ApproverNotify1[Notify Department Head]
    Normal1 --> ApproverNotify1
    Standard1 --> ApproverNotify1
    
    Level2 --> CheckPriority2{Priority}
    CheckPriority2 -->|Critical| Urgent2[L1: 1 Day<br/>L2: 2 Days]
    CheckPriority2 -->|High| Normal2[L1: 2 Days<br/>L2: 4 Days]
    CheckPriority2 -->|Medium/Low| Standard2[L1: 3 Days<br/>L2: 5 Days]
    
    Urgent2 --> ApproverNotify2[Notify Both Approvers]
    Normal2 --> ApproverNotify2
    Standard2 --> ApproverNotify2
    
    Level3 --> CheckPriority3{Priority}
    CheckPriority3 -->|Critical| Urgent3[L1: 1 Day<br/>L2: 2 Days<br/>L3: 3 Days]
    CheckPriority3 -->|High| Normal3[L1: 2 Days<br/>L2: 4 Days<br/>L3: 6 Days]
    CheckPriority3 -->|Medium/Low| Standard3[L1: 3 Days<br/>L2: 5 Days<br/>L3: 7 Days]
    
    Urgent3 --> ApproverNotify3[Notify All Approvers]
    Normal3 --> ApproverNotify3
    Standard3 --> ApproverNotify3
    
    ApproverNotify1 --> WaitApproval1[Wait for Approval]
    ApproverNotify2 --> WaitApproval2[Wait for Sequential Approval]
    ApproverNotify3 --> WaitApproval3[Wait for Sequential Approval]
    
    WaitApproval1 --> CheckResult1{Decision}
    WaitApproval2 --> CheckResult2{All Approved?}
    WaitApproval3 --> CheckResult3{All Approved?}
    
    CheckResult1 -->|Approved| PublishApproved[Publish Requirement]
    CheckResult1 -->|Rejected| RejectReq[Reject Requirement]
    
    CheckResult2 -->|Yes| PublishApproved
    CheckResult2 -->|Any Rejected| RejectReq
    
    CheckResult3 -->|Yes| PublishApproved
    CheckResult3 -->|Any Rejected| RejectReq
    
    PublishDirect --> End([Requirement Published])
    PublishApproved --> End
    RejectReq --> Rejected([Requirement Rejected])
    
    style End fill:#e1f5e1
    style Rejected fill:#ffe1e1
```

---

## Document Upload Flow

```mermaid
sequenceDiagram
    participant User
    participant UI as Upload Component
    participant Validation as File Validator
    participant API as Backend API
    participant Storage as Cloud Storage
    participant DB as Database
    
    User->>UI: Select Files
    UI->>Validation: Validate Files
    
    alt File Size > 10MB
        Validation->>UI: File Too Large Error
        UI->>User: Show Error Message
    else Invalid File Type
        Validation->>UI: Invalid Type Error
        UI->>User: Show Error Message
    else Too Many Files
        Validation->>UI: Max 5 Files Error
        UI->>User: Show Error Message
    else All Valid
        Validation->>UI: Validation Passed
        UI->>User: Show Upload Progress
        
        loop For Each File
            UI->>API: Upload File (multipart/form-data)
            API->>Storage: Store File
            Storage-->>API: File URL
            API->>DB: Save File Metadata
            DB-->>API: Document Record
            API-->>UI: Document Info
            UI->>User: Update Progress
        end
        
        UI->>User: Upload Complete
    end
```

---

## Emergency Publish Workflow

```mermaid
graph TD
    Start([Emergency Situation]) --> CheckPermission{User Has<br/>Emergency<br/>Permission?}
    
    CheckPermission -->|No| Denied[Access Denied<br/>Contact Admin]
    CheckPermission -->|Yes| EmergencyForm[Fill Emergency<br/>Justification]
    
    EmergencyForm --> ValidateReason{Valid<br/>Emergency<br/>Reason?}
    
    ValidateReason -->|No| RejectEmergency[Reject Emergency<br/>Use Standard Process]
    ValidateReason -->|Yes| BypassApproval[Bypass Approval<br/>Workflow]
    
    BypassApproval --> PublishImmediate[Publish Immediately]
    
    PublishImmediate --> LogEmergency[Log Emergency Action<br/>- User<br/>- Timestamp<br/>- Reason]
    
    LogEmergency --> NotifyStakeholders[Notify Stakeholders<br/>- Original Approvers<br/>- Compliance Team<br/>- Management]
    
    NotifyStakeholders --> CreatePostReview[Create Post-Approval<br/>Review Task]
    
    CreatePostReview --> Published([Requirement Published])
    
    Published --> MonitorResponses[Monitor Vendor Responses]
    
    MonitorResponses --> PostReview{Post-Review<br/>Within 24h}
    
    PostReview -->|Approved| Confirmed[Emergency Confirmed<br/>Close Review]
    PostReview -->|Rejected| Escalate[Escalate to Management<br/>Potential Requirement<br/>Cancellation]
    
    Denied --> End([Process Terminated])
    RejectEmergency --> End
    
    style Published fill:#fff4e1
    style Confirmed fill:#e1f5e1
    style Escalate fill:#ffe1e1
    style Denied fill:#ffe1e1
```

---

## State Transitions

```mermaid
stateDiagram-v2
    [*] --> Draft: Create New
    [*] --> Draft: Resume Existing
    
    Draft --> Draft: Auto-Save
    Draft --> Validating: Submit Step
    
    Validating --> Draft: Validation Failed
    Validating --> Draft: Step Completed
    
    Draft --> Submitting: Publish Clicked
    
    Submitting --> PendingApproval: Approval Required
    Submitting --> Published: No Approval Required
    Submitting --> Draft: Submission Failed
    
    PendingApproval --> UnderReview: Approver Reviewing
    
    UnderReview --> PendingApproval: Waiting Next Level
    UnderReview --> Approved: All Approved
    UnderReview --> Rejected: Any Rejection
    
    Approved --> Published: Auto-Publish
    
    Published --> Active: Receiving Responses
    Published --> Closed: Deadline Passed
    
    Active --> UnderEvaluation: Evaluation Started
    UnderEvaluation --> Awarded: Winner Selected
    UnderEvaluation --> Cancelled: Cancelled
    
    Rejected --> Draft: Revise & Resubmit
    Rejected --> Cancelled: Abandon
    
    Awarded --> [*]
    Closed --> [*]
    Cancelled --> [*]
```

---

## Notification Flow

```mermaid
sequenceDiagram
    participant Req as Requirement
    participant System as System
    participant Email as Email Service
    participant Push as Push Notification
    participant DB as Database
    participant Vendors as Vendors/Approvers
    
    Req->>System: Status Change Event
    System->>DB: Fetch Recipients
    
    alt Approval Required
        DB-->>System: Approvers List
        System->>Email: Send Approval Request
        System->>Push: Send App Notification
        Email->>Vendors: Email Notification
        Push->>Vendors: Push Notification
    else Published
        DB-->>System: Vendors List (by category)
        System->>System: Filter by Visibility
        System->>Email: Send New Requirement Alert
        System->>Push: Send App Notification
        Email->>Vendors: Email with Details
        Push->>Vendors: Push with Quick View
    else Approved
        DB-->>System: Requester Info
        System->>Email: Send Approval Confirmation
        System->>Push: Send App Notification
        Email->>Vendors: Approval Status
        Push->>Vendors: Requirement Approved
    else Rejected
        DB-->>System: Requester Info
        System->>Email: Send Rejection Notice
        System->>Push: Send App Notification
        Email->>Vendors: Rejection with Reason
        Push->>Vendors: Requirement Rejected
    end
    
    System->>DB: Log Notifications
```

---

## Business Rules

### Budget Thresholds

| Budget Range | Approval Levels | Typical Timeline |
|--------------|-----------------|------------------|
| < $5,000 | None | Immediate |
| $5,000 - $25,000 | Department Head | 1-3 days |
| $25,000 - $100,000 | Dept Head + Finance | 3-5 days |
| > $100,000 | Dept Head + Finance + CFO | 5-7 days |

### Priority-Based Deadlines

| Priority | Approval Deadline | Submission Deadline (Min) |
|----------|-------------------|---------------------------|
| Critical | 1 day per level | 3 days |
| High | 2 days per level | 5 days |
| Medium | 3 days per level | 7 days |
| Low | 5 days per level | 14 days |

### Document Requirements

| Category | Required Documents | Optional Documents |
|----------|-------------------|-------------------|
| Expert | Scope of Work | Certifications, References |
| Product | Specifications | Drawings, Compliance Docs |
| Service | Scope of Work, SLA | Performance History |
| Logistics | Route Details, Permits | Safety Certifications |

### Validation Rules by Step

**Step 1 - Basic Information:**
- Title: 5-200 characters
- Category: Must select one
- Priority: Must select one
- Business Justification: 20-1000 characters
- Department: Required
- Cost Center: Required, format XXX-NNN
- Estimated Budget: > 0

**Step 2 - Details (Category-Specific):**
- Expert: Specialization + Description required
- Product: Specifications + Quantity required
- Service: Description + Scope + Metrics + Location required
- Logistics: Equipment + Pickup + Delivery required

**Step 3 - Documents:**
- Optional step
- Max 5 files, 10MB each
- Allowed types: PDF, DOC, DOCX, XLS, XLSX, DWG, PNG, JPG

**Step 4 - Approval:**
- Conditional based on budget
- Emergency publish requires special permission

**Step 6 - Publish:**
- Submission deadline: Minimum 3 days from now
- Evaluation criteria: At least 1 required
- Terms acceptance: Required

---

## Error Handling Strategy

```mermaid
graph TD
    Error([Error Occurs]) --> CheckType{Error Type}
    
    CheckType -->|Validation| ValidationError[Validation Error]
    CheckType -->|Network| NetworkError[Network Error]
    CheckType -->|File Upload| FileError[File Upload Error]
    CheckType -->|Server| ServerError[Server Error]
    CheckType -->|Auth| AuthError[Auth Error]
    
    ValidationError --> ShowInline[Show Inline Error<br/>on Field]
    ShowInline --> UserFixes[User Corrects Input]
    UserFixes --> Retry[Retry Operation]
    
    NetworkError --> ShowToast[Show Toast Notification]
    ShowToast --> CheckAutoRetry{Auto Retry?}
    CheckAutoRetry -->|Yes| RetryAuto[Retry 3 Times]
    CheckAutoRetry -->|No| ManualRetry[Show Retry Button]
    RetryAuto --> CheckSuccess{Success?}
    CheckSuccess -->|Yes| Success([Operation Complete])
    CheckSuccess -->|No| ManualRetry
    ManualRetry --> Retry
    
    FileError --> ShowFileError[Show File-Specific Error]
    ShowFileError --> UserSelectsNew[User Selects New File]
    UserSelectsNew --> Retry
    
    ServerError --> LogError[Log to Error Service]
    LogError --> ShowGenericError[Show Generic Error]
    ShowGenericError --> OfferSupport[Offer Contact Support]
    
    AuthError --> RedirectLogin[Redirect to Login]
    
    Retry --> Success
    
    style Success fill:#e1f5e1
```

---

## Performance Considerations

### Auto-Save Strategy
- Debounce: 2 seconds after user stops typing
- Throttle: Maximum 1 save per 3 seconds
- Background: Non-blocking operation
- Retry: Automatic retry on failure (max 3 attempts)

### File Upload Optimization
- Chunked upload for files > 5MB
- Parallel uploads (max 3 simultaneous)
- Resume capability for failed uploads
- Client-side compression for images

### Validation Strategy
- Client-side validation: Immediate feedback
- Server-side validation: Before save
- Step validation: Before proceeding
- Final validation: Before publish

---

## Integration Points

### External Systems

1. **Approval System**
   - Workflow engine integration
   - Approver notification system
   - Audit trail logging

2. **Document Management**
   - Cloud storage integration
   - Version control
   - Access control

3. **Notification System**
   - Email service (SendGrid/SES)
   - Push notification service
   - In-app notification system

4. **Analytics**
   - Event tracking
   - User behavior analytics
   - Performance monitoring

5. **Compliance System**
   - Audit logging
   - Regulatory compliance checks
   - Document retention policies