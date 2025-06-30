
import React, { createContext, useContext, useState, useCallback } from 'react';
import { EnhancedApprovalWorkflow, ApprovalConfiguration, ApprovalThreshold, EnhancedApprovalRequest, ApprovalStage } from '@/types/enhancedApproval';
import { TeamMember } from '@/types/teamMember';
import { RequirementFormData } from './RequirementContext';
import { toast } from 'sonner';

interface EnhancedApprovalContextType {
  approvalConfigurations: ApprovalConfiguration[];
  activeConfiguration: ApprovalConfiguration | null;
  approvalWorkflows: EnhancedApprovalWorkflow[];
  teamMembers: TeamMember[];
  createApprovalConfiguration: (config: Omit<ApprovalConfiguration, 'id' | 'createdDate' | 'lastModified'>) => string;
  updateApprovalConfiguration: (id: string, updates: Partial<ApprovalConfiguration>) => void;
  setActiveConfiguration: (configId: string) => void;
  createApprovalWorkflow: (requirement: RequirementFormData, teamMembers: TeamMember[]) => string;
  submitApproval: (approvalId: string, status: 'approved' | 'rejected', comments?: string) => void;
  delegateApproval: (approvalId: string, delegateToId: string) => void;
  escalateApproval: (approvalId: string, escalateToId: string) => void;
  getWorkflowStatus: (requirementId: string) => EnhancedApprovalWorkflow | null;
  canPublishRequirement: (requirement: RequirementFormData) => { canPublish: boolean; reason?: string };
  getApprovalThreshold: (amount: number) => ApprovalThreshold | null;
  assignUsersToStage: (configId: string, thresholdId: string, stageId: string, userIds: string[]) => void;
  removeUserFromStage: (configId: string, thresholdId: string, stageId: string, userId: string) => void;
  updateTeamMembers: (members: TeamMember[]) => void;
}

const EnhancedApprovalContext = createContext<EnhancedApprovalContextType | undefined>(undefined);

// Default approval configuration template
const createDefaultConfiguration = (): ApprovalConfiguration => ({
  id: 'default-config-1',
  companyId: 'company-1',
  name: 'Standard Industrial Approval Matrix',
  description: 'ISO 9001 compliant approval workflow for industrial procurement',
  defaultThresholdId: 'threshold-medium',
  isActive: true,
  createdDate: new Date().toISOString(),
  lastModified: new Date().toISOString(),
  modifiedBy: 'system',
  thresholds: [
    {
      id: 'threshold-low',
      name: 'Low Value (₹0 - ₹25,000)',
      minAmount: 0,
      maxAmount: 25000,
      currency: 'INR',
      isActive: true,
      complianceRequired: false,
      urgentBypass: true,
      stages: [
        {
          id: 'stage-initiator-low',
          name: 'initiator',
          displayName: 'Initiator',
          order: 1,
          isRequired: true,
          assignedUsers: [],
          approvalType: 'single',
          maxApprovalTime: 2,
        },
        {
          id: 'stage-approver-low',
          name: 'approver',
          displayName: 'Department Approver',
          order: 2,
          isRequired: true,
          assignedUsers: [],
          approvalType: 'single',
          maxApprovalTime: 24,
          escalationUsers: [],
        }
      ]
    },
    {
      id: 'threshold-medium',
      name: 'Medium Value (₹25,001 - ₹1,00,000)',
      minAmount: 25001,
      maxAmount: 100000,
      currency: 'INR',
      isActive: true,
      complianceRequired: true,
      urgentBypass: false,
      stages: [
        {
          id: 'stage-initiator-medium',
          name: 'initiator',
          displayName: 'Initiator',
          order: 1,
          isRequired: true,
          assignedUsers: [],
          approvalType: 'single',
          maxApprovalTime: 2,
        },
        {
          id: 'stage-reviewer-medium',
          name: 'reviewer',
          displayName: 'Technical Reviewer',
          order: 2,
          isRequired: true,
          assignedUsers: [],
          approvalType: 'single',
          maxApprovalTime: 48,
          escalationUsers: [],
        },
        {
          id: 'stage-approver-medium',
          name: 'approver',
          displayName: 'Senior Approver',
          order: 3,
          isRequired: true,
          assignedUsers: [],
          approvalType: 'single',
          maxApprovalTime: 72,
          escalationUsers: [],
        }
      ]
    },
    {
      id: 'threshold-high',
      name: 'High Value (₹1,00,001 - ₹5,00,000)',
      minAmount: 100001,
      maxAmount: 500000,
      currency: 'INR',
      isActive: true,
      complianceRequired: true,
      urgentBypass: false,
      stages: [
        {
          id: 'stage-initiator-high',
          name: 'initiator',
          displayName: 'Initiator',
          order: 1,
          isRequired: true,
          assignedUsers: [],
          approvalType: 'single',
          maxApprovalTime: 2,
        },
        {
          id: 'stage-reviewer-high',
          name: 'reviewer',
          displayName: 'Technical Reviewer',
          order: 2,
          isRequired: true,
          assignedUsers: [],
          approvalType: 'single',
          maxApprovalTime: 48,
          escalationUsers: [],
        },
        {
          id: 'stage-approver-high',
          name: 'approver',
          displayName: 'Joint Approval (2 Required)',
          order: 3,
          isRequired: true,
          assignedUsers: [],
          approvalType: 'joint',
          minimumApprovals: 2,
          maxApprovalTime: 96,
          escalationUsers: [],
        }
      ]
    },
    {
      id: 'threshold-critical',
      name: 'Critical Value (Above ₹5,00,000)',
      minAmount: 500001,
      maxAmount: Infinity,
      currency: 'INR',
      isActive: true,
      complianceRequired: true,
      urgentBypass: false,
      stages: [
        {
          id: 'stage-initiator-critical',
          name: 'initiator',
          displayName: 'Initiator',
          order: 1,
          isRequired: true,
          assignedUsers: [],
          approvalType: 'single',
          maxApprovalTime: 2,
        },
        {
          id: 'stage-reviewer-critical',
          name: 'reviewer',
          displayName: 'Technical Reviewer',
          order: 2,
          isRequired: true,
          assignedUsers: [],
          approvalType: 'single',
          maxApprovalTime: 48,
          escalationUsers: [],
        },
        {
          id: 'stage-approver-critical',
          name: 'approver',
          displayName: 'Executive Approval (3 Required)',
          order: 3,
          isRequired: true,
          assignedUsers: [],
          approvalType: 'joint',
          minimumApprovals: 3,
          maxApprovalTime: 120,
          escalationUsers: [],
        }
      ]
    }
  ]
});

export const EnhancedApprovalProvider = ({ children }: { children: React.ReactNode }) => {
  const [approvalConfigurations, setApprovalConfigurations] = useState<ApprovalConfiguration[]>([
    createDefaultConfiguration()
  ]);
  const [activeConfiguration, setActiveConfigurationState] = useState<ApprovalConfiguration | null>(
    approvalConfigurations[0]
  );
  const [approvalWorkflows, setApprovalWorkflows] = useState<EnhancedApprovalWorkflow[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  const createApprovalConfiguration = useCallback((config: Omit<ApprovalConfiguration, 'id' | 'createdDate' | 'lastModified'>) => {
    const newConfig: ApprovalConfiguration = {
      ...config,
      id: `config-${Date.now()}`,
      createdDate: new Date().toISOString(),
      lastModified: new Date().toISOString(),
    };
    
    setApprovalConfigurations(prev => [...prev, newConfig]);
    toast.success('Approval configuration created successfully');
    return newConfig.id;
  }, []);

  const updateApprovalConfiguration = useCallback((id: string, updates: Partial<ApprovalConfiguration>) => {
    setApprovalConfigurations(prev => 
      prev.map(config => 
        config.id === id 
          ? { ...config, ...updates, lastModified: new Date().toISOString() }
          : config
      )
    );
    
    if (activeConfiguration?.id === id) {
      setActiveConfigurationState(prev => prev ? { ...prev, ...updates } : null);
    }
    
    toast.success('Approval configuration updated');
  }, [activeConfiguration]);

  const setActiveConfiguration = useCallback((configId: string) => {
    const config = approvalConfigurations.find(c => c.id === configId);
    if (config) {
      setActiveConfigurationState(config);
      toast.success(`Activated approval configuration: ${config.name}`);
    }
  }, [approvalConfigurations]);

  const getApprovalThreshold = useCallback((amount: number): ApprovalThreshold | null => {
    if (!activeConfiguration) return null;
    
    return activeConfiguration.thresholds.find(threshold => 
      threshold.isActive && 
      amount >= threshold.minAmount && 
      amount <= threshold.maxAmount
    ) || null;
  }, [activeConfiguration]);

  const createApprovalWorkflow = useCallback((requirement: RequirementFormData, teamMembers: TeamMember[]) => {
    if (!activeConfiguration) {
      toast.error('No active approval configuration found');
      return '';
    }

    const amount = requirement.budget || 0;
    const threshold = getApprovalThreshold(amount);
    
    if (!threshold) {
      toast.error('No matching approval threshold found for this amount');
      return '';
    }

    const isUrgent = requirement.isUrgent || false;
    const workflowId = `workflow-enhanced-${Date.now()}`;
    
    // Create approval requests for each stage
    const approvalRequests: EnhancedApprovalRequest[] = [];
    
    threshold.stages.forEach((stage, stageIndex) => {
      if (stage.assignedUsers.length === 0) {
        console.warn(`No users assigned to stage: ${stage.displayName}`);
        return;
      }

      stage.assignedUsers.forEach((userId, userIndex) => {
        const teamMember = teamMembers.find(tm => tm.id === userId);
        if (!teamMember) return;

        const request: EnhancedApprovalRequest = {
          id: `approval-${workflowId}-${stageIndex}-${userIndex}`,
          requirementId: requirement.title || 'unknown',
          stageId: stage.id,
          stageName: stage.displayName,
          approverId: teamMember.id,
          approverName: teamMember.name,
          approverEmail: teamMember.email,
          approverRole: teamMember.role,
          status: 'pending',
          requestedDate: new Date().toISOString(),
          isUrgent,
          urgentDeadline: isUrgent ? new Date(Date.now() + stage.maxApprovalTime * 60 * 60 * 1000).toISOString() : undefined,
          approvalLevel: stage.order,
          budgetAmount: amount,
          requiresJointApproval: stage.approvalType === 'joint' || stage.approvalType === 'majority',
          jointApprovalGroup: stage.approvalType !== 'single' ? stage.id : undefined,
        };

        approvalRequests.push(request);
      });
    });

    const workflow: EnhancedApprovalWorkflow = {
      id: workflowId,
      requirementId: requirement.title || 'unknown',
      configurationId: activeConfiguration.id,
      thresholdId: threshold.id,
      workflowType: isUrgent ? 'parallel' : 'sequential',
      isUrgent,
      status: 'pending',
      currentStageId: threshold.stages[0]?.id || '',
      totalStages: threshold.stages.length,
      completedStages: 0,
      createdDate: new Date().toISOString(),
      budgetAmount: amount,
      approvalRequests,
      stageHistory: threshold.stages.map(stage => ({
        stageId: stage.id,
        stageName: stage.displayName,
        status: 'pending',
        startDate: new Date().toISOString(),
        approvers: stage.assignedUsers,
        approvalCount: 0,
        requiredApprovals: stage.approvalType === 'single' ? 1 : (stage.minimumApprovals || stage.assignedUsers.length),
        comments: []
      })),
      complianceChecks: []
    };

    setApprovalWorkflows(prev => [...prev, workflow]);
    
    // Send notifications
    approvalRequests.forEach(request => {
      console.log(`Sending approval request to ${request.approverName} (${request.approverEmail})`);
      if (isUrgent) {
        toast.info(`Urgent approval request sent to ${request.approverName}`);
      }
    });
    
    toast.success(`Approval workflow created with ${approvalRequests.length} approval requests`);
    return workflowId;
  }, [activeConfiguration, getApprovalThreshold]);

  const submitApproval = useCallback((approvalId: string, status: 'approved' | 'rejected', comments?: string) => {
    setApprovalWorkflows(prev => prev.map(workflow => {
      const updatedRequests = workflow.approvalRequests.map(request => 
        request.id === approvalId 
          ? { 
              ...request, 
              status, 
              responseDate: new Date().toISOString(),
              comments,
              digitalSignature: `${request.approverName}-${Date.now()}`
            }
          : request
      );

      // Update workflow status and stage progress
      const currentStageRequests = updatedRequests.filter(req => req.stageId === workflow.currentStageId);
      const currentStageApproved = currentStageRequests.filter(req => req.status === 'approved');
      const currentStageRejected = currentStageRequests.filter(req => req.status === 'rejected');
      
      let workflowStatus = workflow.status;
      let currentStageId = workflow.currentStageId;
      let completedStages = workflow.completedStages;

      // Check if current stage is complete
      if (currentStageRejected.length > 0) {
        workflowStatus = 'rejected';
      } else {
        const currentStage = activeConfiguration?.thresholds
          .find(t => t.id === workflow.thresholdId)?.stages
          .find(s => s.id === workflow.currentStageId);
        
        if (currentStage) {
          const requiredApprovals = currentStage.approvalType === 'single' ? 1 : 
            (currentStage.minimumApprovals || currentStage.assignedUsers.length);
          
          if (currentStageApproved.length >= requiredApprovals) {
            completedStages += 1;
            
            if (completedStages >= workflow.totalStages) {
              workflowStatus = 'completed';
            } else {
              workflowStatus = 'in_progress';
              // Move to next stage
              const nextStage = activeConfiguration?.thresholds
                .find(t => t.id === workflow.thresholdId)?.stages
                .find(s => s.order === currentStage.order + 1);
              if (nextStage) {
                currentStageId = nextStage.id;
              }
            }
          }
        }
      }

      return {
        ...workflow,
        approvalRequests: updatedRequests,
        status: workflowStatus,
        currentStageId,
        completedStages,
        completedDate: workflowStatus === 'completed' ? new Date().toISOString() : workflow.completedDate
      };
    }));
    
    toast.success(`Approval ${status} successfully`);
  }, [activeConfiguration]);

  const delegateApproval = useCallback((approvalId: string, delegateToId: string) => {
    const delegateToMember = teamMembers.find(tm => tm.id === delegateToId);
    if (!delegateToMember) {
      toast.error('Delegate user not found');
      return;
    }

    setApprovalWorkflows(prev => prev.map(workflow => ({
      ...workflow,
      approvalRequests: workflow.approvalRequests.map(request => 
        request.id === approvalId 
          ? { 
              ...request, 
              status: 'delegated', 
              delegatedTo: delegateToId,
              approverId: delegateToMember.id,
              approverName: delegateToMember.name,
              approverEmail: delegateToMember.email,
              approverRole: delegateToMember.role
            }
          : request
      )
    })));
    
    toast.success(`Approval delegated to ${delegateToMember.name}`);
  }, [teamMembers]);

  const escalateApproval = useCallback((approvalId: string, escalateToId: string) => {
    const escalateToMember = teamMembers.find(tm => tm.id === escalateToId);
    if (!escalateToMember) {
      toast.error('Escalation user not found');
      return;
    }

    setApprovalWorkflows(prev => prev.map(workflow => ({
      ...workflow,
      approvalRequests: workflow.approvalRequests.map(request => 
        request.id === approvalId 
          ? { 
              ...request, 
              status: 'escalated',
              escalatedTo: escalateToId,
              comments: (request.comments || '') + `\n[ESCALATED to ${escalateToMember.name}]`
            }
          : request
      )
    })));
    
    toast.warning(`Approval escalated to ${escalateToMember.name}`);
  }, [teamMembers]);

  const getWorkflowStatus = useCallback((requirementId: string) => {
    return approvalWorkflows.find(w => w.requirementId === requirementId) || null;
  }, [approvalWorkflows]);

  const canPublishRequirement = useCallback((requirement: RequirementFormData) => {
    const budget = requirement.budget || 0;
    const priority = requirement.priority || 'low';
    
    // Check if approval is required based on amount
    const threshold = getApprovalThreshold(budget);
    if (!threshold) {
      return { canPublish: true }; // No threshold found, allow publishing
    }
    
    // Check if approval workflow exists and is completed
    const workflow = getWorkflowStatus(requirement.title || 'unknown');
    
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
  }, [getApprovalThreshold, getWorkflowStatus]);

  const assignUsersToStage = useCallback((configId: string, thresholdId: string, stageId: string, userIds: string[]) => {
    setApprovalConfigurations(prev => 
      prev.map(config => 
        config.id === configId
          ? {
              ...config,
              thresholds: config.thresholds.map(threshold =>
                threshold.id === thresholdId
                  ? {
                      ...threshold,
                      stages: threshold.stages.map(stage =>
                        stage.id === stageId
                          ? { ...stage, assignedUsers: [...new Set([...stage.assignedUsers, ...userIds])] }
                          : stage
                      )
                    }
                  : threshold
              ),
              lastModified: new Date().toISOString()
            }
          : config
      )
    );
    
    if (activeConfiguration?.id === configId) {
      const updatedConfig = approvalConfigurations.find(c => c.id === configId);
      if (updatedConfig) {
        setActiveConfigurationState(updatedConfig);
      }
    }
    
    toast.success('Users assigned to approval stage');
  }, [approvalConfigurations, activeConfiguration]);

  const removeUserFromStage = useCallback((configId: string, thresholdId: string, stageId: string, userId: string) => {
    setApprovalConfigurations(prev => 
      prev.map(config => 
        config.id === configId
          ? {
              ...config,
              thresholds: config.thresholds.map(threshold =>
                threshold.id === thresholdId
                  ? {
                      ...threshold,
                      stages: threshold.stages.map(stage =>
                        stage.id === stageId
                          ? { ...stage, assignedUsers: stage.assignedUsers.filter(id => id !== userId) }
                          : stage
                      )
                    }
                  : threshold
              ),
              lastModified: new Date().toISOString()
            }
          : config
      )
    );
    
    toast.success('User removed from approval stage');
  }, []);

  const updateTeamMembers = useCallback((members: TeamMember[]) => {
    setTeamMembers(members);
  }, []);

  return (
    <EnhancedApprovalContext.Provider value={{
      approvalConfigurations,
      activeConfiguration,
      approvalWorkflows,
      teamMembers,
      createApprovalConfiguration,
      updateApprovalConfiguration,
      setActiveConfiguration,
      createApprovalWorkflow,
      submitApproval,
      delegateApproval,
      escalateApproval,
      getWorkflowStatus,
      canPublishRequirement,
      getApprovalThreshold,
      assignUsersToStage,
      removeUserFromStage,
      updateTeamMembers
    }}>
      {children}
    </EnhancedApprovalContext.Provider>
  );
};

export const useEnhancedApproval = () => {
  const context = useContext(EnhancedApprovalContext);
  if (context === undefined) {
    throw new Error('useEnhancedApproval must be used within an EnhancedApprovalProvider');
  }
  return context;
};
