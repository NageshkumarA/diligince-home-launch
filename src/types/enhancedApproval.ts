
import { TeamMember } from './teamMember';

export interface ApprovalStage {
  id: string;
  name: 'initiator' | 'reviewer' | 'approver';
  displayName: string;
  order: number;
  isRequired: boolean;
  assignedUsers: string[]; // Team member IDs
  approvalType: 'single' | 'joint' | 'majority';
  minimumApprovals?: number; // For joint/majority approvals
  maxApprovalTime: number; // Hours
  escalationUsers?: string[]; // Backup approvers
}

export interface ApprovalThreshold {
  id: string;
  name: string;
  minAmount: number;
  maxAmount: number;
  currency: string;
  stages: ApprovalStage[];
  isActive: boolean;
  complianceRequired: boolean;
  urgentBypass: boolean;
}

export interface ApprovalConfiguration {
  id: string;
  companyId: string;
  name: string;
  description: string;
  thresholds: ApprovalThreshold[];
  defaultThresholdId: string;
  isActive: boolean;
  createdDate: string;
  lastModified: string;
  modifiedBy: string;
}

export interface EnhancedApprovalRequest {
  id: string;
  requirementId: string;
  stageId: string;
  stageName: string;
  approverId: string;
  approverName: string;
  approverEmail: string;
  approverRole: string;
  status: 'pending' | 'approved' | 'rejected' | 'delegated' | 'escalated';
  requestedDate: string;
  responseDate?: string;
  comments?: string;
  digitalSignature?: string;
  isUrgent: boolean;
  urgentDeadline?: string;
  delegatedTo?: string;
  escalatedTo?: string;
  approvalLevel: number;
  budgetAmount: number;
  requiresJointApproval: boolean;
  jointApprovalGroup?: string;
}

export interface EnhancedApprovalWorkflow {
  id: string;
  requirementId: string;
  configurationId: string;
  thresholdId: string;
  workflowType: 'sequential' | 'parallel' | 'hybrid';
  isUrgent: boolean;
  status: 'pending' | 'in_progress' | 'completed' | 'rejected' | 'emergency_published';
  currentStageId: string;
  totalStages: number;
  completedStages: number;
  createdDate: string;
  completedDate?: string;
  emergencyPublishDeadline?: string;
  budgetAmount: number;
  approvalRequests: EnhancedApprovalRequest[];
  stageHistory: ApprovalStageHistory[];
  complianceChecks: ComplianceCheck[];
}

export interface ApprovalStageHistory {
  stageId: string;
  stageName: string;
  status: 'completed' | 'current' | 'pending' | 'skipped';
  startDate: string;
  completedDate?: string;
  approvers: string[];
  approvalCount: number;
  requiredApprovals: number;
  comments: string[];
}

export interface ComplianceCheck {
  id: string;
  type: 'iso9001' | 'budget_policy' | 'delegation_authority' | 'audit_trail';
  status: 'passed' | 'failed' | 'pending';
  description: string;
  checkedDate: string;
  checkedBy: string;
  evidence?: string[];
}

export interface ApprovalAnalytics {
  totalRequests: number;
  approvedRequests: number;
  rejectedRequests: number;
  pendingRequests: number;
  averageApprovalTime: number;
  escalationRate: number;
  complianceScore: number;
  bottleneckStages: string[];
  performanceByApprover: ApprovalPerformance[];
}

export interface ApprovalPerformance {
  approverId: string;
  approverName: string;
  totalRequests: number;
  approvedCount: number;
  rejectedCount: number;
  averageResponseTime: number;
  escalationCount: number;
  complianceScore: number;
}

export interface ApprovalMatrixTemplate {
  id: string;
  name: string;
  description: string;
  industry: string;
  configuration: ApprovalConfiguration;
  isBuiltIn: boolean;
  popularity: number;
}
