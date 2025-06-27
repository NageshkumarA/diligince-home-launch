
import React, { createContext, useContext, useState, useCallback } from 'react';
import { ApprovalRequest, ApprovalWorkflow, ApprovalMatrix } from '@/types/approval';
import { RequirementFormData } from './RequirementContext';
import { toast } from 'sonner';

interface ApprovalContextType {
  approvalWorkflows: ApprovalWorkflow[];
  approvalMatrix: ApprovalMatrix;
  createApprovalWorkflow: (requirement: RequirementFormData) => string;
  getAllRequiredApprovalsCompleted: (requirementId: string) => boolean;
  canPublishRequirement: (requirement: RequirementFormData) => { canPublish: boolean; reason?: string };
  getApprovalWorkflow: (requirementId: string) => ApprovalWorkflow | null;
  submitApproval: (approvalId: string, status: 'approved' | 'rejected', comments?: string) => void;
  delegateApproval: (approvalId: string, delegateToId: string) => void;
  sendApprovalReminders: (requirementId: string) => void;
  emergencyPublish: (requirementId: string) => Promise<boolean>;
}

const ApprovalContext = createContext<ApprovalContextType | undefined>(undefined);

// ISO 9001 compliant approval matrix
const defaultApprovalMatrix: ApprovalMatrix = {
  low: {
    budgetThreshold: 5000,
    requiredApprovers: ['department_head'],
    urgentApprovalHours: 24,
    autoEscalationHours: 48,
    complianceRequired: false
  },
  medium: {
    budgetThreshold: 25000,
    requiredApprovers: ['department_head', 'procurement_manager'],
    urgentApprovalHours: 48,
    autoEscalationHours: 72,
    complianceRequired: true
  },
  high: {
    budgetThreshold: 100000,
    requiredApprovers: ['department_head', 'procurement_manager', 'finance_director'],
    urgentApprovalHours: 72,
    autoEscalationHours: 96,
    complianceRequired: true
  },
  critical: {
    budgetThreshold: Infinity,
    requiredApprovers: ['department_head', 'procurement_manager', 'finance_director', 'ceo'],
    urgentApprovalHours: 96,
    autoEscalationHours: 120,
    complianceRequired: true
  }
};

// Mock approver database
const mockApprovers = {
  department_head: { id: 'dh1', name: 'John Smith', email: 'john.smith@company.com', role: 'Department Head' },
  procurement_manager: { id: 'pm1', name: 'Sarah Johnson', email: 'sarah.johnson@company.com', role: 'Procurement Manager' },
  finance_director: { id: 'fd1', name: 'Michael Brown', email: 'michael.brown@company.com', role: 'Finance Director' },
  ceo: { id: 'ceo1', name: 'Lisa Davis', email: 'lisa.davis@company.com', role: 'CEO' }
};

export const ApprovalProvider = ({ children }: { children: React.ReactNode }) => {
  const [approvalWorkflows, setApprovalWorkflows] = useState<ApprovalWorkflow[]>([]);
  const [approvalMatrix] = useState<ApprovalMatrix>(defaultApprovalMatrix);

  const determineApprovalLevel = useCallback((requirement: RequirementFormData) => {
    const budget = requirement.budget || 0;
    const priority = requirement.priority || 'low';
    
    if (budget >= 100000 || priority === 'critical') return 'critical';
    if (budget >= 25000 || priority === 'high') return 'high';
    if (budget >= 5000 || priority === 'medium') return 'medium';
    return 'low';
  }, []);

  const createApprovalWorkflow = useCallback((requirement: RequirementFormData) => {
    const approvalLevel = determineApprovalLevel(requirement);
    const policy = approvalMatrix[approvalLevel as keyof ApprovalMatrix];
    const isUrgent = requirement.isUrgent || false;
    
    const approvalRequests: ApprovalRequest[] = policy.requiredApprovers.map((approverKey, index) => {
      const approver = mockApprovers[approverKey as keyof typeof mockApprovers];
      return {
        id: `approval-${Date.now()}-${index}`,
        requirementId: requirement.title || 'unknown',
        approverId: approver.id,
        approverName: approver.name,
        approverEmail: approver.email,
        approverRole: approver.role,
        status: 'pending',
        requestedDate: new Date().toISOString(),
        isUrgent,
        urgentDeadline: isUrgent ? new Date(Date.now() + policy.urgentApprovalHours * 60 * 60 * 1000).toISOString() : undefined,
        approvalLevel: index + 1,
        budgetThreshold: policy.budgetThreshold
      };
    });

    const workflowId = `workflow-${Date.now()}`;
    const workflow: ApprovalWorkflow = {
      id: workflowId,
      requirementId: requirement.title || 'unknown',
      workflowType: isUrgent ? 'parallel' : 'sequential',
      isUrgent,
      status: 'pending',
      totalApprovals: approvalRequests.length,
      completedApprovals: 0,
      createdDate: new Date().toISOString(),
      emergencyPublishDeadline: isUrgent ? new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString() : undefined,
      approvalRequests
    };

    setApprovalWorkflows(prev => [...prev, workflow]);
    
    // Send approval notifications
    approvalRequests.forEach(request => {
      console.log(`Sending approval request to ${request.approverName} (${request.approverEmail})`);
      if (isUrgent) {
        toast.info(`Urgent approval request sent to ${request.approverName}`);
      }
    });
    
    return workflowId;
  }, [approvalMatrix, determineApprovalLevel]);

  const getAllRequiredApprovalsCompleted = useCallback((requirementId: string) => {
    const workflow = approvalWorkflows.find(w => w.requirementId === requirementId);
    if (!workflow) return true; // No approval required
    
    return workflow.status === 'completed';
  }, [approvalWorkflows]);

  const canPublishRequirement = useCallback((requirement: RequirementFormData) => {
    const budget = requirement.budget || 0;
    const priority = requirement.priority || 'low';
    const hasComplianceRequirements = requirement.complianceRequired || false;
    
    // Determine if approval is required
    const requiresApproval = budget > 10000 || priority === 'critical' || priority === 'high' || hasComplianceRequirements;
    
    if (!requiresApproval) {
      return { canPublish: true };
    }
    
    // Check if approval workflow exists and is completed
    const workflow = approvalWorkflows.find(w => w.requirementId === (requirement.title || 'unknown'));
    
    if (!workflow) {
      return { 
        canPublish: false, 
        reason: 'Approval workflow required but not initiated. Please complete the approval workflow step.' 
      };
    }
    
    if (workflow.status === 'emergency_published') {
      return { canPublish: true };
    }
    
    if (workflow.status !== 'completed') {
      const pendingApprovers = workflow.approvalRequests
        .filter(req => req.status === 'pending')
        .map(req => req.approverName)
        .join(', ');
      
      return { 
        canPublish: false, 
        reason: `Pending approvals required from: ${pendingApprovers}` 
      };
    }
    
    return { canPublish: true };
  }, [approvalWorkflows]);

  const getApprovalWorkflow = useCallback((requirementId: string) => {
    return approvalWorkflows.find(w => w.requirementId === requirementId) || null;
  }, [approvalWorkflows]);

  const submitApproval = useCallback((approvalId: string, status: 'approved' | 'rejected', comments?: string) => {
    setApprovalWorkflows(prev => prev.map(workflow => ({
      ...workflow,
      approvalRequests: workflow.approvalRequests.map(request => 
        request.id === approvalId 
          ? { 
              ...request, 
              status, 
              responseDate: new Date().toISOString(),
              comments,
              digitalSignature: `${request.approverName}-${Date.now()}`
            }
          : request
      )
    })));
    
    // Update workflow status
    setApprovalWorkflows(prev => prev.map(workflow => {
      const updatedRequests = workflow.approvalRequests.map(request => 
        request.id === approvalId 
          ? { 
              ...request, 
              status, 
              responseDate: new Date().toISOString(),
              comments
            }
          : request
      );
      
      const completedApprovals = updatedRequests.filter(req => req.status === 'approved').length;
      const rejectedApprovals = updatedRequests.filter(req => req.status === 'rejected').length;
      
      let workflowStatus = workflow.status;
      if (rejectedApprovals > 0) {
        workflowStatus = 'rejected';
      } else if (completedApprovals === workflow.totalApprovals) {
        workflowStatus = 'completed';
      } else {
        workflowStatus = 'in_progress';
      }
      
      return {
        ...workflow,
        approvalRequests: updatedRequests,
        completedApprovals,
        status: workflowStatus,
        completedDate: workflowStatus === 'completed' ? new Date().toISOString() : workflow.completedDate
      };
    }));
    
    toast.success(`Approval ${status} successfully`);
  }, []);

  const delegateApproval = useCallback((approvalId: string, delegateToId: string) => {
    setApprovalWorkflows(prev => prev.map(workflow => ({
      ...workflow,
      approvalRequests: workflow.approvalRequests.map(request => 
        request.id === approvalId 
          ? { ...request, status: 'delegated', delegatedTo: delegateToId }
          : request
      )
    })));
    
    toast.info('Approval delegated successfully');
  }, []);

  const sendApprovalReminders = useCallback((requirementId: string) => {
    const workflow = approvalWorkflows.find(w => w.requirementId === requirementId);
    if (!workflow) return;
    
    const pendingApprovals = workflow.approvalRequests.filter(req => req.status === 'pending');
    pendingApprovals.forEach(approval => {
      console.log(`Sending reminder to ${approval.approverName} (${approval.approverEmail})`);
    });
    
    toast.info(`Reminders sent to ${pendingApprovals.length} approvers`);
  }, [approvalWorkflows]);

  const emergencyPublish = useCallback(async (requirementId: string) => {
    const workflow = approvalWorkflows.find(w => w.requirementId === requirementId);
    if (!workflow || !workflow.isUrgent) {
      toast.error('Emergency publish is only available for urgent requirements');
      return false;
    }
    
    // Set 48-hour post-approval deadline
    const emergencyDeadline = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString();
    
    setApprovalWorkflows(prev => prev.map(w => 
      w.id === workflow.id 
        ? { 
            ...w, 
            status: 'emergency_published',
            emergencyPublishDeadline: emergencyDeadline
          }
        : w
    ));
    
    toast.warning('Requirement published under emergency protocol. Approvals must be obtained within 48 hours.');
    return true;
  }, [approvalWorkflows]);

  return (
    <ApprovalContext.Provider value={{
      approvalWorkflows,
      approvalMatrix,
      createApprovalWorkflow,
      getAllRequiredApprovalsCompleted,
      canPublishRequirement,
      getApprovalWorkflow,
      submitApproval,
      delegateApproval,
      sendApprovalReminders,
      emergencyPublish
    }}>
      {children}
    </ApprovalContext.Provider>
  );
};

export const useApproval = () => {
  const context = useContext(ApprovalContext);
  if (context === undefined) {
    throw new Error('useApproval must be used within an ApprovalProvider');
  }
  return context;
};
