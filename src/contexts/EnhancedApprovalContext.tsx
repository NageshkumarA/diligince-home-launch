
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  ApprovalConfiguration, 
  ApprovalThreshold, 
  ApprovalStage, 
  EnhancedApprovalWorkflow,
  EnhancedApprovalRequest,
  ApprovalMatrixTemplate 
} from '@/types/enhancedApproval';
import { TeamMember } from '@/types/teamMember';
import { toast } from 'sonner';

interface EnhancedApprovalContextType {
  // Configuration Management
  activeConfiguration: ApprovalConfiguration | null;
  allConfigurations: ApprovalConfiguration[];
  teamMembers: TeamMember[];
  
  // Workflow Management
  approvalWorkflows: EnhancedApprovalWorkflow[];
  pendingApprovals: EnhancedApprovalRequest[];
  
  // Actions
  updateTeamMembers: (members: TeamMember[]) => void;
  assignUsersToStage: (configId: string, thresholdId: string, stageId: string, userIds: string[]) => void;
  removeUserFromStage: (configId: string, thresholdId: string, stageId: string, userId: string) => void;
  updateApprovalConfiguration: (config: ApprovalConfiguration) => void;
  createApprovalWorkflow: (requirementId: string, budgetAmount: number) => EnhancedApprovalWorkflow;
  submitApprovalResponse: (requestId: string, response: 'approved' | 'rejected', comments?: string) => void;
}

const EnhancedApprovalContext = createContext<EnhancedApprovalContextType | undefined>(undefined);

// Default approval configuration for new companies
const createDefaultConfiguration = (companyId: string): ApprovalConfiguration => {
  const lowBudgetStages: ApprovalStage[] = [
    {
      id: 'stage-1',
      name: 'initiator',
      displayName: 'Initiator',
      order: 1,
      isRequired: true,
      assignedUsers: [],
      approvalType: 'single',
      maxApprovalTime: 24
    },
    {
      id: 'stage-2',
      name: 'approver',
      displayName: 'Department Approver',
      order: 2,
      isRequired: true,
      assignedUsers: [],
      approvalType: 'single',
      maxApprovalTime: 48
    }
  ];

  const mediumBudgetStages: ApprovalStage[] = [
    ...lowBudgetStages,
    {
      id: 'stage-3',
      name: 'reviewer',
      displayName: 'Finance Review',
      order: 3,
      isRequired: true,
      assignedUsers: [],
      approvalType: 'single',
      maxApprovalTime: 72
    }
  ];

  const highBudgetStages: ApprovalStage[] = [
    ...mediumBudgetStages,
    {
      id: 'stage-4',
      name: 'approver',
      displayName: 'Senior Management',
      order: 4,
      isRequired: true,
      assignedUsers: [],
      approvalType: 'joint',
      minimumApprovals: 2,
      maxApprovalTime: 96
    }
  ];

  const thresholds: ApprovalThreshold[] = [
    {
      id: 'threshold-1',
      name: 'Low Budget (₹0 - ₹1L)',
      minAmount: 0,
      maxAmount: 100000,
      currency: 'INR',
      stages: lowBudgetStages,
      isActive: true,
      complianceRequired: false,
      urgentBypass: true
    },
    {
      id: 'threshold-2',
      name: 'Medium Budget (₹1L - ₹10L)',
      minAmount: 100001,
      maxAmount: 1000000,
      currency: 'INR',
      stages: mediumBudgetStages,
      isActive: true,
      complianceRequired: true,
      urgentBypass: false
    },
    {
      id: 'threshold-3',
      name: 'High Budget (₹10L - ₹1Cr)',
      minAmount: 1000001,
      maxAmount: 10000000,
      currency: 'INR',
      stages: highBudgetStages,
      isActive: true,
      complianceRequired: true,
      urgentBypass: false
    },
    {
      id: 'threshold-4',
      name: 'Critical Budget (₹1Cr+)',
      minAmount: 10000001,
      maxAmount: Infinity,
      currency: 'INR',
      stages: [
        ...highBudgetStages,
        {
          id: 'stage-5',
          name: 'approver',
          displayName: 'Board Approval',
          order: 5,
          isRequired: true,
          assignedUsers: [],
          approvalType: 'majority',
          minimumApprovals: 3,
          maxApprovalTime: 168
        }
      ],
      isActive: true,
      complianceRequired: true,
      urgentBypass: false
    }
  ];

  return {
    id: `config-${companyId}`,
    companyId,
    name: 'Default Approval Matrix',
    description: 'Standard approval workflow for procurement requirements',
    thresholds,
    defaultThresholdId: 'threshold-1',
    isActive: true,
    createdDate: new Date().toISOString(),
    lastModified: new Date().toISOString(),
    modifiedBy: 'system'
  };
};

export const EnhancedApprovalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeConfiguration, setActiveConfiguration] = useState<ApprovalConfiguration | null>(null);
  const [allConfigurations, setAllConfigurations] = useState<ApprovalConfiguration[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [approvalWorkflows, setApprovalWorkflows] = useState<EnhancedApprovalWorkflow[]>([]);
  const [pendingApprovals, setPendingApprovals] = useState<EnhancedApprovalRequest[]>([]);

  // Initialize default configuration
  useEffect(() => {
    const companyId = 'company-1'; // This would come from user context in real app
    const defaultConfig = createDefaultConfiguration(companyId);
    setActiveConfiguration(defaultConfig);
    setAllConfigurations([defaultConfig]);
  }, []);

  const updateTeamMembers = (members: TeamMember[]) => {
    setTeamMembers(members);
    console.log('Updated team members for approval matrix:', members);
  };

  const assignUsersToStage = (configId: string, thresholdId: string, stageId: string, userIds: string[]) => {
    setActiveConfiguration(prev => {
      if (!prev || prev.id !== configId) return prev;
      
      const updatedConfig = { ...prev };
      const threshold = updatedConfig.thresholds.find(t => t.id === thresholdId);
      if (!threshold) return prev;
      
      const stage = threshold.stages.find(s => s.id === stageId);
      if (!stage) return prev;
      
      // Add new users while avoiding duplicates
      const newUsers = userIds.filter(id => !stage.assignedUsers.includes(id));
      stage.assignedUsers = [...stage.assignedUsers, ...newUsers];
      
      return updatedConfig;
    });
    
    const assignedUser = teamMembers.find(tm => userIds.includes(tm.id));
    if (assignedUser) {
      toast.success(`${assignedUser.name} assigned to approval stage`);
    }
  };

  const removeUserFromStage = (configId: string, thresholdId: string, stageId: string, userId: string) => {
    setActiveConfiguration(prev => {
      if (!prev || prev.id !== configId) return prev;
      
      const updatedConfig = { ...prev };
      const threshold = updatedConfig.thresholds.find(t => t.id === thresholdId);
      if (!threshold) return prev;
      
      const stage = threshold.stages.find(s => s.id === stageId);
      if (!stage) return prev;
      
      stage.assignedUsers = stage.assignedUsers.filter(id => id !== userId);
      
      return updatedConfig;
    });
    
    const removedUser = teamMembers.find(tm => tm.id === userId);
    if (removedUser) {
      toast.success(`${removedUser.name} removed from approval stage`);
    }
  };

  const updateApprovalConfiguration = (config: ApprovalConfiguration) => {
    setActiveConfiguration(config);
    setAllConfigurations(prev => 
      prev.map(c => c.id === config.id ? config : c)
    );
    toast.success('Approval configuration updated');
  };

  const createApprovalWorkflow = (requirementId: string, budgetAmount: number): EnhancedApprovalWorkflow => {
    if (!activeConfiguration) {
      throw new Error('No active approval configuration');
    }

    // Find appropriate threshold based on budget
    const threshold = activeConfiguration.thresholds.find(t => 
      budgetAmount >= t.minAmount && budgetAmount <= t.maxAmount
    ) || activeConfiguration.thresholds[0];

    const workflow: EnhancedApprovalWorkflow = {
      id: `workflow-${Date.now()}`,
      requirementId,
      configurationId: activeConfiguration.id,
      thresholdId: threshold.id,
      workflowType: 'sequential',
      isUrgent: false,
      status: 'pending',
      currentStageId: threshold.stages[0].id,
      totalStages: threshold.stages.length,
      completedStages: 0,
      createdDate: new Date().toISOString(),
      budgetAmount,
      approvalRequests: [],
      stageHistory: threshold.stages.map(stage => ({
        stageId: stage.id,
        stageName: stage.displayName,
        status: stage.order === 1 ? 'current' : 'pending',
        startDate: stage.order === 1 ? new Date().toISOString() : '',
        approvers: stage.assignedUsers,
        approvalCount: 0,
        requiredApprovals: stage.approvalType === 'single' ? 1 : (stage.minimumApprovals || stage.assignedUsers.length),
        comments: []
      })),
      complianceChecks: []
    };

    setApprovalWorkflows(prev => [...prev, workflow]);
    console.log('Created approval workflow:', workflow);
    
    return workflow;
  };

  const submitApprovalResponse = (requestId: string, response: 'approved' | 'rejected', comments?: string) => {
    setPendingApprovals(prev => 
      prev.map(request => 
        request.id === requestId 
          ? { ...request, status: response, responseDate: new Date().toISOString(), comments }
          : request
      )
    );
    
    toast.success(`Approval ${response} successfully`);
  };

  const value: EnhancedApprovalContextType = {
    activeConfiguration,
    allConfigurations,
    teamMembers,
    approvalWorkflows,
    pendingApprovals,
    updateTeamMembers,
    assignUsersToStage,
    removeUserFromStage,
    updateApprovalConfiguration,
    createApprovalWorkflow,
    submitApprovalResponse
  };

  return (
    <EnhancedApprovalContext.Provider value={value}>
      {children}
    </EnhancedApprovalContext.Provider>
  );
};

export const useEnhancedApproval = (): EnhancedApprovalContextType => {
  const context = useContext(EnhancedApprovalContext);
  if (!context) {
    throw new Error('useEnhancedApproval must be used within an EnhancedApprovalProvider');
  }
  return context;
};
