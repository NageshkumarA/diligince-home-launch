
# Types Directory - Business Domain Type Definitions

## Overview
This directory contains TypeScript type definitions that model the complete business domain for the Diligince.ai platform. These types represent the core business entities, workflows, and data structures that support ISO 9001-compliant B2B procurement processes.

## Business Domain Model

### Platform Business Context
**Diligince.ai** operates as an enterprise B2B procurement platform that facilitates:
- **ISO 9001-Compliant Procurement**: Standardized procurement processes with complete audit trails
- **Multi-Stakeholder Collaboration**: Seamless interaction between buyers, suppliers, and consultants
- **Risk-Managed Vendor Relationships**: Systematic vendor qualification and performance management
- **Automated Workflow Management**: End-to-end project lifecycle management with milestone tracking

### Core Business Entities

#### User Management Types (`user.ts`)
**Business Purpose**: Defines user types and roles within the B2B procurement ecosystem

```typescript
// Primary User Types in the Business Ecosystem
export type UserType = 'industry' | 'professional' | 'service_vendor' | 'product_vendor' | 'logistics_vendor';

export interface BaseUser {
  id: string;
  email: string;
  type: UserType;
  createdAt: string;
  lastLoginAt?: string;
  isActive: boolean;
  complianceStatus: ComplianceStatus;
  subscriptionPlan: SubscriptionPlan;
}

export interface IndustryUser extends BaseUser {
  type: 'industry';
  companyProfile: CompanyProfile;
  procurementAuthority: ProcurementAuthority;
  approvalLimits: ApprovalLimits;
  teamMembers: TeamMember[];
  complianceCertifications: ComplianceCertification[];
}

export interface VendorUser extends BaseUser {
  type: 'service_vendor' | 'product_vendor' | 'logistics_vendor';
  businessProfile: BusinessProfile;
  capabilities: Capability[];
  certifications: Certification[];
  performanceMetrics: PerformanceMetrics;
  qualificationStatus: QualificationStatus;
}

export interface ProfessionalUser extends BaseUser {
  type: 'professional';
  professionalProfile: ProfessionalProfile;
  expertise: ExpertiseArea[];
  certifications: ProfessionalCertification[];
  availability: AvailabilityCalendar;
  consultingRates: ConsultingRates;
}

// Business-Specific User Attributes
export interface CompanyProfile {
  companyName: string;
  industry: IndustryType;
  employeeCount: EmployeeRange;
  annualRevenue: RevenueRange;
  headquarters: Address;
  businessLicense: string;
  taxId: string;
  duns: string;
  iso9001Certified: boolean;
  iso9001CertificateNumber?: string;
  iso9001ExpiryDate?: string;
}

export interface ProcurementAuthority {
  maxOrderValue: number;
  approvalRequired: boolean;
  approvalThreshold: number;
  delegatedAuthority: DelegatedAuthority[];
  procurementPolicies: ProcurementPolicy[];
}
```

#### Stakeholder Management Types (`stakeholder.ts`)
**Business Purpose**: Defines stakeholder lifecycle management with ISO 9001 supplier qualification

```typescript
// Stakeholder Lifecycle Management
export type StakeholderStatus = 'invited' | 'pre-qualified' | 'approved' | 'active' | 'suspended' | 'rejected';

export interface StakeholderProfile {
  id: string;
  name: string;
  type: 'product_vendor' | 'service_vendor' | 'logistics_vendor' | 'expert';
  status: StakeholderStatus;
  
  // Business Information
  businessDetails: BusinessDetails;
  contactInformation: ContactInformation;
  capabilities: BusinessCapability[];
  certifications: BusinessCertification[];
  
  // Performance & Compliance
  performanceHistory: PerformanceHistory;
  complianceStatus: ComplianceStatus;
  riskAssessment: RiskAssessment;
  
  // Relationship Management
  relationshipManager: string;
  onboardingDate: string;
  lastReviewDate: string;
  nextReviewDate: string;
}

export interface StakeholderInvitation {
  id: string;
  stakeholderId: string;
  invitedBy: string;
  invitationType: 'direct' | 'project_specific' | 'capability_based';
  
  // Invitation Details
  email: string;
  name: string;
  expectedCapabilities: string[];
  projectContext?: ProjectContext;
  
  // Invitation Status
  status: 'sent' | 'opened' | 'responded' | 'accepted' | 'declined';
  sentDate: string;
  responseDate?: string;
  
  // Pre-qualification Requirements
  preQualificationRequirements: PreQualificationRequirement[];
  documentationRequired: DocumentationRequirement[];
  
  // Audit Trail
  auditTrail: InvitationAuditEntry[];
}

export interface PreQualificationAssessment {
  id: string;
  stakeholderId: string;
  assessmentDate: string;
  assessedBy: string;
  
  // Assessment Categories
  technicalCapability: TechnicalCapabilityAssessment;
  qualityManagement: QualityManagementAssessment;
  financialStability: FinancialStabilityAssessment;
  complianceStatus: ComplianceAssessment;
  riskEvaluation: RiskEvaluationAssessment;
  
  // Assessment Results
  overallScore: number;
  recommendation: 'approve' | 'conditional_approve' | 'reject';
  conditions?: QualificationCondition[];
  validityPeriod: string;
  
  // ISO 9001 Compliance
  iso9001Requirements: ISO9001RequirementCheck[];
  auditTrail: AssessmentAuditEntry[];
}
```

#### Requirement Management Types (`requirement.ts`)
**Business Purpose**: Defines procurement requirements with approval workflows and stakeholder matching

```typescript
// Procurement Requirement Types
export type RequirementCategory = 'product' | 'service' | 'logistics' | 'expert' | 'hybrid';
export type RequirementStatus = 'draft' | 'pending_approval' | 'approved' | 'published' | 'closed' | 'cancelled';
export type RequirementPriority = 'low' | 'medium' | 'high' | 'critical';

export interface Requirement {
  id: string;
  title: string;
  description: string;
  category: RequirementCategory;
  priority: RequirementPriority;
  status: RequirementStatus;
  
  // Business Context
  businessJustification: string;
  expectedBenefits: BusinessBenefit[];
  riskConsiderations: RiskConsideration[];
  
  // Technical Specifications
  technicalSpecifications: TechnicalSpecification;
  qualityRequirements: QualityRequirement[];
  complianceRequirements: ComplianceRequirement[];
  
  // Commercial Terms
  budgetRange: BudgetRange;
  expectedDelivery: DeliveryRequirement;
  paymentTerms: PaymentTerms;
  contractTerms: ContractTerms;
  
  // Stakeholder Management
  stakeholderCriteria: StakeholderCriteria;
  invitedStakeholders: string[];
  proposalDeadline: string;
  
  // Approval Workflow
  approvalWorkflow: ApprovalWorkflow;
  approvalHistory: ApprovalHistory[];
  
  // Audit & Compliance
  createdBy: string;
  createdDate: string;
  lastModifiedBy: string;
  lastModifiedDate: string;
  auditTrail: RequirementAuditEntry[];
}

export interface TechnicalSpecification {
  specifications: SpecificationItem[];
  drawings: TechnicalDrawing[];
  standards: ApplicableStandard[];
  testingRequirements: TestingRequirement[];
  acceptanceCriteria: AcceptanceCriteria[];
}

export interface StakeholderCriteria {
  requiredCapabilities: string[];
  preferredCapabilities: string[];
  geographicPreferences: GeographicPreference[];
  certificationRequirements: CertificationRequirement[];
  performanceRequirements: PerformanceRequirement[];
  excludedStakeholders: string[];
}
```

#### Project Workflow Types (`workflow.ts`)
**Business Purpose**: Defines project execution workflows with milestone management and payment automation

```typescript
// Project Lifecycle Management
export type ProjectStatus = 'initiated' | 'planning' | 'execution' | 'monitoring' | 'closing' | 'completed' | 'suspended';
export type MilestoneStatus = 'pending' | 'in_progress' | 'completed' | 'overdue' | 'cancelled';
export type PaymentStatus = 'pending' | 'approved' | 'processed' | 'completed' | 'disputed';

export interface ProjectWorkflow {
  id: string;
  requirementId: string;
  projectTitle: string;
  projectDescription: string;
  status: ProjectStatus;
  
  // Project Participants
  projectManager: string;
  stakeholders: ProjectStakeholder[];
  teamMembers: ProjectTeamMember[];
  
  // Project Planning
  projectPlan: ProjectPlan;
  riskManagementPlan: RiskManagementPlan;
  qualityManagementPlan: QualityManagementPlan;
  communicationPlan: CommunicationPlan;
  
  // Project Execution
  workBreakdownStructure: WorkPackage[];
  milestones: ProjectMilestone[];
  deliverables: ProjectDeliverable[];
  
  // Monitoring & Control
  performanceMetrics: ProjectPerformanceMetrics;
  issueLog: ProjectIssue[];
  changeRequests: ChangeRequest[];
  
  // Financial Management
  budgetAllocation: BudgetAllocation;
  costTracking: CostTracking;
  paymentSchedule: PaymentMilestone[];
  
  // Quality Assurance
  qualityChecks: QualityCheck[];
  testResults: TestResult[];
  acceptanceTests: AcceptanceTest[];
  
  // Project Closure
  lessonsLearned: LessonLearned[];
  projectEvaluation: ProjectEvaluation;
  stakeholderFeedback: StakeholderFeedback[];
  
  // Audit Trail
  auditTrail: ProjectAuditEntry[];
}

export interface ProjectMilestone {
  id: string;
  name: string;
  description: string;
  dueDate: string;
  status: MilestoneStatus;
  
  // Milestone Details
  deliverables: MilestoneDeliverable[];
  acceptanceCriteria: MilestoneAcceptanceCriteria[];
  dependencies: MilestoneDependency[];
  
  // Financial Integration
  paymentAmount: number;
  paymentStatus: PaymentStatus;
  invoiceRequired: boolean;
  
  // Quality Assurance
  qualityChecks: QualityCheck[];
  approvalRequired: boolean;
  approvers: string[];
  
  // Progress Tracking
  progressPercentage: number;
  actualStartDate?: string;
  actualCompletionDate?: string;
  
  // Audit Trail
  auditTrail: MilestoneAuditEntry[];
}
```

#### Purchase Order Types (`purchaseOrder.ts`)
**Business Purpose**: Defines purchase order generation and management with legal compliance

```typescript
// Purchase Order Management
export type PurchaseOrderStatus = 'draft' | 'pending_approval' | 'approved' | 'sent' | 'acknowledged' | 'in_progress' | 'completed' | 'cancelled';
export type PurchaseOrderType = 'standard' | 'blanket' | 'contract' | 'services' | 'emergency';

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  type: PurchaseOrderType;
  status: PurchaseOrderStatus;
  
  // Order Details
  orderDate: string;
  deliveryDate: string;
  vendorId: string;
  orderTotal: number;
  
  // Line Items
  lineItems: PurchaseOrderLineItem[];
  
  // Terms & Conditions
  paymentTerms: PaymentTerms;
  deliveryTerms: DeliveryTerms;
  contractTerms: ContractTerms;
  specialConditions: SpecialCondition[];
  
  // Legal & Compliance
  legalReview: LegalReview;
  complianceChecks: ComplianceCheck[];
  approvalChain: ApprovalChain;
  
  // Integration
  requirementId?: string;
  projectId?: string;
  budgetCode: string;
  costCenter: string;
  
  // Audit Trail
  createdBy: string;
  createdDate: string;
  approvedBy?: string;
  approvedDate?: string;
  auditTrail: PurchaseOrderAuditEntry[];
}

export interface PurchaseOrderLineItem {
  id: string;
  itemNumber: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  
  // Item Details
  specifications: ItemSpecification[];
  deliveryDate: string;
  deliveryLocation: string;
  
  // Quality Requirements
  qualityStandards: QualityStandard[];
  inspectionRequirements: InspectionRequirement[];
  testingRequirements: TestingRequirement[];
  
  // Tracking
  deliveryStatus: DeliveryStatus;
  receivedQuantity: number;
  acceptedQuantity: number;
  rejectedQuantity: number;
}
```

#### Compliance & Audit Types (`compliance.ts`)
**Business Purpose**: Defines ISO 9001 compliance management and audit trail structures

```typescript
// ISO 9001 Compliance Management
export type ComplianceStatus = 'compliant' | 'non_compliant' | 'pending_review' | 'corrective_action_required';
export type AuditType = 'internal' | 'external' | 'management_review' | 'process_audit' | 'supplier_audit';

export interface ComplianceFramework {
  id: string;
  name: string;
  version: string;
  applicableStandards: ApplicableStandard[];
  
  // Compliance Requirements
  requirements: ComplianceRequirement[];
  processes: ComplianceProcess[];
  documentation: ComplianceDocumentation[];
  
  // Monitoring & Measurement
  performanceIndicators: PerformanceIndicator[];
  monitoringActivities: MonitoringActivity[];
  measurementMethods: MeasurementMethod[];
  
  // Audit & Review
  auditSchedule: AuditSchedule;
  managementReview: ManagementReview;
  
  // Continuous Improvement
  improvementOpportunities: ImprovementOpportunity[];
  correctiveActions: CorrectiveAction[];
  preventiveActions: PreventiveAction[];
}

export interface AuditTrail {
  id: string;
  entityType: string;
  entityId: string;
  action: string;
  timestamp: string;
  
  // User Context
  userId: string;
  userRole: string;
  sessionId: string;
  
  // Change Details
  beforeState?: any;
  afterState?: any;
  changeReason?: string;
  
  // Business Context
  businessProcess: string;
  businessImpact: BusinessImpact;
  complianceRelevance: ComplianceRelevance;
  
  // Metadata
  ipAddress: string;
  userAgent: string;
  apiVersion: string;
  
  // Integrity
  checksum: string;
  digitalSignature?: string;
}

export interface ISO9001Requirement {
  id: string;
  clauseNumber: string;
  title: string;
  description: string;
  
  // Implementation
  implementationStatus: ImplementationStatus;
  implementationDate: string;
  responsiblePerson: string;
  
  // Evidence
  evidenceDocuments: EvidenceDocument[];
  processDocuments: ProcessDocument[];
  records: ComplianceRecord[];
  
  // Monitoring
  monitoringMethod: MonitoringMethod;
  measurementCriteria: MeasurementCriteria[];
  performanceTargets: PerformanceTarget[];
  
  // Audit Results
  auditFindings: AuditFinding[];
  nonConformances: NonConformance[];
  improvementOpportunities: ImprovementOpportunity[];
}
```

#### Analytics & Reporting Types (`analytics.ts`)
**Business Purpose**: Defines business intelligence and reporting structures for data-driven decision making

```typescript
// Business Analytics & Intelligence
export type MetricType = 'financial' | 'operational' | 'quality' | 'compliance' | 'performance';
export type ReportType = 'executive' | 'operational' | 'compliance' | 'financial' | 'performance';

export interface BusinessMetrics {
  id: string;
  name: string;
  type: MetricType;
  description: string;
  
  // Metric Definition
  calculationMethod: CalculationMethod;
  dataSource: DataSource;
  updateFrequency: UpdateFrequency;
  
  // Current Values
  currentValue: number;
  previousValue: number;
  targetValue: number;
  
  // Trend Analysis
  trend: TrendDirection;
  trendPercentage: number;
  trendPeriod: TrendPeriod;
  
  // Thresholds
  warningThreshold: number;
  criticalThreshold: number;
  
  // Context
  businessContext: BusinessContext;
  ownerRole: string;
  stakeholders: string[];
}

export interface ExecutiveDashboard {
  id: string;
  name: string;
  ownerRole: string;
  lastUpdated: string;
  
  // Key Performance Indicators
  kpis: KPIWidget[];
  
  // Business Metrics
  procurementMetrics: ProcurementMetricsWidget;
  vendorPerformance: VendorPerformanceWidget;
  complianceStatus: ComplianceStatusWidget;
  financialSummary: FinancialSummaryWidget;
  
  // Operational Insights
  activeProjects: ActiveProjectsWidget;
  riskAssessment: RiskAssessmentWidget;
  improvementOpportunities: ImprovementOpportunitiesWidget;
  
  // Alerts & Notifications
  alerts: BusinessAlert[];
  notifications: BusinessNotification[];
}

export interface BusinessReport {
  id: string;
  title: string;
  type: ReportType;
  generatedDate: string;
  generatedBy: string;
  
  // Report Content
  executiveSummary: ExecutiveSummary;
  keyFindings: KeyFinding[];
  recommendations: Recommendation[];
  
  // Data Analysis
  dataAnalysis: DataAnalysis;
  trendAnalysis: TrendAnalysis;
  benchmarkAnalysis: BenchmarkAnalysis;
  
  // Compliance
  complianceStatus: ComplianceStatus;
  auditFindings: AuditFinding[];
  
  // Appendices
  dataSourcesAndMethodology: DataSourcesAndMethodology;
  assumptions: Assumption[];
  limitations: Limitation[];
}
```

## Type Integration Patterns

### Cross-Domain Type Relationships
```typescript
// Example: Complete business workflow type integration
export interface CompleteBusinessWorkflow {
  // Core Entities
  requirement: Requirement;
  stakeholders: StakeholderProfile[];
  proposals: VendorProposal[];
  
  // Workflow Management
  project: ProjectWorkflow;
  purchaseOrder: PurchaseOrder;
  
  // Compliance & Audit
  complianceStatus: ComplianceFramework;
  auditTrail: AuditTrail[];
  
  // Analytics & Reporting
  businessMetrics: BusinessMetrics[];
  performanceReports: BusinessReport[];
}
```

### Business Domain Validation Types
```typescript
// Business Rule Validation Types
export interface BusinessRuleValidation {
  rule: BusinessRule;
  entity: BusinessEntity;
  validationResult: ValidationResult;
  complianceImpact: ComplianceImpact;
  auditTrail: AuditTrail;
}

export interface BusinessRule {
  id: string;
  name: string;
  description: string;
  businessJustification: string;
  applicableEntities: EntityType[];
  validationLogic: ValidationLogic;
  complianceMapping: ComplianceMapping[];
}
```

## Contributing to Type Definitions

### Adding New Business Types
1. **Business Domain Alignment**: Ensure types accurately represent business concepts
2. **ISO 9001 Compliance**: Include necessary fields for compliance requirements
3. **Audit Trail Integration**: Include audit trail fields for all business entities
4. **Relationship Modeling**: Define clear relationships between business entities
5. **Validation Support**: Include validation metadata and business rules

### Type Enhancement Guidelines
1. **Backward Compatibility**: Maintain existing type interfaces and structures
2. **Business Context**: Ensure types capture complete business context
3. **Performance Considerations**: Design types for efficient serialization and querying
4. **Documentation**: Provide comprehensive JSDoc comments with business context
5. **Integration Support**: Ensure types support cross-system integration requirements

### Quality Standards
1. **Strict TypeScript**: Use strict type checking with complete type coverage
2. **Business Validation**: Include business rule validation in type definitions
3. **Compliance Mapping**: Map types to relevant ISO 9001 requirements
4. **Audit Support**: Include comprehensive audit trail support
5. **Performance Optimization**: Design types for optimal runtime performance

---

This type system provides the complete business domain model for the Diligince.ai platform while maintaining strict ISO 9001 compliance and enterprise-grade type safety.
