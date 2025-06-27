
export interface ApprovalRequest {
  id: string;
  requirementId: string;
  approverId: string;
  approverName: string;
  approverEmail: string;
  approverRole: string;
  status: 'pending' | 'approved' | 'rejected' | 'delegated';
  requestedDate: string;
  responseDate?: string;
  comments?: string;
  digitalSignature?: string;
  isUrgent: boolean;
  urgentDeadline?: string;
  delegatedTo?: string;
  approvalLevel: number;
  budgetThreshold?: number;
}

export interface ApprovalWorkflow {
  id: string;
  requirementId: string;
  workflowType: 'sequential' | 'parallel' | 'hybrid';
  isUrgent: boolean;
  status: 'pending' | 'in_progress' | 'completed' | 'rejected' | 'emergency_published';
  totalApprovals: number;
  completedApprovals: number;
  createdDate: string;
  completedDate?: string;
  emergencyPublishDeadline?: string;
  approvalRequests: ApprovalRequest[];
}

export interface ApprovalPolicy {
  budgetThreshold: number;
  requiredApprovers: string[];
  urgentApprovalHours: number;
  autoEscalationHours: number;
  complianceRequired: boolean;
}

export interface ApprovalMatrix {
  low: ApprovalPolicy;
  medium: ApprovalPolicy;
  high: ApprovalPolicy;
  critical: ApprovalPolicy;
}
