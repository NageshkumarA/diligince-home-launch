import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useRef } from 'react';
import { 
  ApprovalConfiguration, 
  ApprovalThreshold, 
  ApprovalStage, 
  EnhancedApprovalWorkflow,
  EnhancedApprovalRequest,
  ApprovalMatrixTemplate 
} from '@/types/enhancedApproval';
import { TeamMember } from '@/types/teamMember';
import { PendingUser } from '@/types/pendingUser';
import { toast } from 'sonner';

interface EnhancedApprovalContextType {
  // Configuration Management
  activeConfiguration: ApprovalConfiguration | null;
  allConfigurations: ApprovalConfiguration[];
  teamMembers: TeamMember[];
  
  // Workflow Management
  approvalWorkflows: EnhancedApprovalWorkflow[];
  pendingApprovals: EnhancedApprovalRequest[];
  
  // Pending User Management
  pendingUsers: PendingUser[];
  
  // Real-time Updates
  notifications: ApprovalNotification[];
  unreadNotifications: number;
  
  // Company Management
  companyId: string;
  userRole: 'admin' | 'approver' | 'reviewer' | 'initiator';
  isCompanyAdmin: boolean;
  
  // Actions
  updateTeamMembers: (members: TeamMember[]) => void;
  assignUsersToStage: (configId: string, thresholdId: string, stageId: string, userIds: string[]) => void;
  removeUserFromStage: (configId: string, thresholdId: string, stageId: string, userId: string) => void;
  updateApprovalConfiguration: (config: ApprovalConfiguration) => void;
  createApprovalWorkflow: (requirementId: string, budgetAmount: number) => EnhancedApprovalWorkflow;
  submitApprovalResponse: (requestId: string, response: 'approved' | 'rejected', comments?: string) => void;
  
  // Pending User Actions
  addPendingUser: (user: PendingUser) => void;
  approvePendingUser: (userId: string, assignedRole: 'admin' | 'approver' | 'reviewer' | 'initiator') => void;
  rejectPendingUser: (userId: string, reason?: string) => void;
  checkUserApprovalStatus: (email: string, companyId: string) => 'approved' | 'pending' | 'rejected' | 'not_found';
  
  // Real-time Actions
  markNotificationAsRead: (notificationId: string) => void;
  initializeCompanyData: (companyName: string, userEmail: string, userId: string) => void;
  assignUserRole: (userId: string, role: 'admin' | 'approver' | 'reviewer' | 'initiator') => void;
}

interface ApprovalNotification {
  id: string;
  type: 'approval_request' | 'approval_approved' | 'approval_rejected' | 'workflow_completed' | 'escalation' | 'user_approval_request';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  relatedWorkflowId?: string;
  relatedRequestId?: string;
  relatedUserId?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
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
  
  // Pending Users state
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([]);
  
  // Real-time state
  const [notifications, setNotifications] = useState<ApprovalNotification[]>([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  
  // Company management state
  const [companyId, setCompanyId] = useState<string>('');
  const [userRole, setUserRole] = useState<'admin' | 'approver' | 'reviewer' | 'initiator'>('initiator');
  const [isCompanyAdmin, setIsCompanyAdmin] = useState<boolean>(false);

  // Track previous team members to prevent duplicate notifications
  const previousTeamMembersRef = useRef<TeamMember[]>([]);

  // Initialize default configuration
  useEffect(() => {
    const defaultCompanyId = 'company-1'; // This would come from user context in real app
    const defaultConfig = createDefaultConfiguration(defaultCompanyId);
    setActiveConfiguration(defaultConfig);
    setAllConfigurations([defaultConfig]);
    setCompanyId(defaultCompanyId);
  }, []);

  // Load team members and pending users from localStorage
  useEffect(() => {
    const storedTeamMembers = localStorage.getItem('industryTeamMembers');
    if (storedTeamMembers) {
      try {
        const parsedMembers = JSON.parse(storedTeamMembers);
        console.log('Loading team members into approval context:', parsedMembers);
        setTeamMembers(parsedMembers);
        previousTeamMembersRef.current = parsedMembers;
      } catch (error) {
        console.error('Error loading team members:', error);
      }
    }

    // Load pending users
    const storedPendingUsers = localStorage.getItem('pendingUsers');
    if (storedPendingUsers) {
      try {
        const parsedPendingUsers = JSON.parse(storedPendingUsers);
        setPendingUsers(parsedPendingUsers);
      } catch (error) {
        console.error('Error loading pending users:', error);
      }
    }
  }, []);

  // Update unread notifications count
  useEffect(() => {
    const unreadCount = notifications.filter(n => !n.isRead).length;
    setUnreadNotifications(unreadCount);
  }, [notifications]);

  // Save pending users to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('pendingUsers', JSON.stringify(pendingUsers));
  }, [pendingUsers]);

  const initializeCompanyData = (companyName: string, userEmail: string, userId: string) => {
    const domain = userEmail.split('@')[1] || '';
    const generatedCompanyId = `company-${companyName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${domain.replace(/[^a-z0-9]/g, '-')}`;
    
    // Check if company exists
    const existingCompanies = JSON.parse(localStorage.getItem('industryCompanies') || '[]');
    const companyExists = existingCompanies.find((comp: any) => comp.id === generatedCompanyId);
    
    if (!companyExists) {
      // First user becomes admin
      setIsCompanyAdmin(true);
      setUserRole('admin');
      
      // Create company record
      const newCompany = {
        id: generatedCompanyId,
        name: companyName,
        domain: domain,
        adminUserId: userId,
        createdDate: new Date().toISOString(),
        users: [userId]
      };
      
      existingCompanies.push(newCompany);
      localStorage.setItem('industryCompanies', JSON.stringify(existingCompanies));
      
      // Create notification
      const notification: ApprovalNotification = {
        id: `notif-${Date.now()}`,
        type: 'workflow_completed',
        title: 'Company Setup Complete',
        message: 'You have been assigned as Company Administrator. You can now configure approval workflows.',
        timestamp: new Date().toISOString(),
        isRead: false,
        priority: 'high'
      };
      
      setNotifications(prev => [notification, ...prev]);
      toast.success("Company setup complete! You're now the administrator.");
    } else {
      // Subsequent user
      setIsCompanyAdmin(false);
      setUserRole('initiator');
      
      // Add notification for admin
      const notification: ApprovalNotification = {
        id: `notif-${Date.now()}`,
        type: 'user_approval_request',
        title: 'New User Pending Approval',
        message: `A new user has joined your company and needs role assignment.`,
        timestamp: new Date().toISOString(),
        isRead: false,
        priority: 'medium'
      };
      
      setNotifications(prev => [notification, ...prev]);
    }
    
    setCompanyId(generatedCompanyId);
  };

  const createNotification = (type: ApprovalNotification['type'], title: string, message: string, priority: ApprovalNotification['priority'] = 'medium', workflowId?: string, requestId?: string, userId?: string) => {
    const notification: ApprovalNotification = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      title,
      message,
      timestamp: new Date().toISOString(),
      isRead: false,
      relatedWorkflowId: workflowId,
      relatedRequestId: requestId,
      relatedUserId: userId,
      priority
    };
    
    setNotifications(prev => [notification, ...prev]);
    
    // Show toast for high priority notifications
    if (priority === 'high' || priority === 'urgent') {
      toast.info(title, { description: message });
    }
  };

  // Pending User Management Functions
  const addPendingUser = (user: PendingUser) => {
    setPendingUsers(prev => [...prev, user]);
    
    // Notify admin about new pending user
    createNotification(
      'user_approval_request',
      'New User Awaiting Approval',
      `${user.name} (${user.email}) has requested to join your company`,
      'high',
      undefined,
      undefined,
      user.id
    );
  };

  const approvePendingUser = (userId: string, assignedRole: 'admin' | 'approver' | 'reviewer' | 'initiator') => {
    setPendingUsers(prev => 
      prev.map(user => 
        user.id === userId 
          ? { ...user, status: 'approved' as const, requestedRole: assignedRole }
          : user
      )
    );

    const approvedUser = pendingUsers.find(u => u.id === userId);
    if (approvedUser) {
      // Save approved user to registry
      const userRegistry = JSON.parse(localStorage.getItem('userRegistry') || '[]');
      const updatedUser = {
        id: approvedUser.id,
        email: approvedUser.email,
        name: approvedUser.name,
        role: 'industry' as const,
        avatar: '',
        initials: approvedUser.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase(),
        status: 'active' as const,
        createdAt: approvedUser.signupDate,
        updatedAt: new Date().toISOString(),
        preferences: {
          theme: 'system' as const,
          notifications: {
            email: true,
            push: true,
            sms: false,
            marketing: false,
          },
          language: 'en',
          timezone: 'UTC',
        },
        profile: approvedUser.profile,
        assignedRole: assignedRole
      };
      
      userRegistry.push(updatedUser);
      localStorage.setItem('userRegistry', JSON.stringify(userRegistry));

      createNotification(
        'workflow_completed',
        'User Approved',
        `${approvedUser.name} has been approved and assigned the role: ${assignedRole}`,
        'medium',
        undefined,
        undefined,
        userId
      );
      
      toast.success(`${approvedUser.name} has been approved successfully`);
    }
  };

  const rejectPendingUser = (userId: string, reason?: string) => {
    setPendingUsers(prev => 
      prev.map(user => 
        user.id === userId 
          ? { ...user, status: 'rejected' as const }
          : user
      )
    );

    const rejectedUser = pendingUsers.find(u => u.id === userId);
    if (rejectedUser) {
      createNotification(
        'workflow_completed',
        'User Rejected',
        `${rejectedUser.name}'s request to join has been rejected${reason ? `: ${reason}` : ''}`,
        'low',
        undefined,
        undefined,
        userId
      );
      
      toast.success(`${rejectedUser.name}'s request has been rejected`);
    }
  };

  const checkUserApprovalStatus = (email: string, companyId: string): 'approved' | 'pending' | 'rejected' | 'not_found' => {
    const user = pendingUsers.find(u => u.email === email && u.companyId === companyId);
    if (!user) return 'not_found';
    return user.status;
  };

  const assignUserRole = (userId: string, role: 'admin' | 'approver' | 'reviewer' | 'initiator') => {
    // This would typically update the user's profile
    console.log(`Assigning role ${role} to user ${userId}`);
    
    const notification: ApprovalNotification = {
      id: `notif-${Date.now()}`,
      type: 'workflow_completed',
      title: 'Role Assignment',
      message: `User has been assigned the role: ${role}`,
      timestamp: new Date().toISOString(),
      isRead: false,
      priority: 'low'
    };
    
    setNotifications(prev => [notification, ...prev]);
    toast.success(`Role assigned successfully: ${role}`);
  };

  const updateTeamMembers = useCallback((members: TeamMember[]) => {
    // Only create notification if there's an actual change in team members
    const previousCount = previousTeamMembersRef.current.length;
    const newCount = members.length;
    
    // Check if there's a meaningful change (different count or different members)
    const hasChanged = previousCount !== newCount || 
      JSON.stringify(previousTeamMembersRef.current.map(m => m.id).sort()) !== 
      JSON.stringify(members.map(m => m.id).sort());
    
    if (hasChanged && members.length > 0) {
      setTeamMembers(members);
      previousTeamMembersRef.current = members;
      console.log('Updated team members for approval matrix:', members);
      
      // Create notification only for meaningful updates
      createNotification(
        'workflow_completed',
        'Team Updated',
        `Team members have been updated. ${members.length} members are now available for approval assignments.`,
        'low'
      );
    } else if (members.length === 0) {
      // Just update state without notification for empty arrays (initial state)
      setTeamMembers(members);
      previousTeamMembersRef.current = members;
    }
  }, []);

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
      createNotification(
        'workflow_completed',
        'Approver Assigned',
        `${assignedUser.name} has been assigned to approval stage`,
        'low'
      );
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
      createNotification(
        'workflow_completed',
        'Approver Removed',
        `${removedUser.name} has been removed from approval stage`,
        'low'
      );
      toast.success(`${removedUser.name} removed from approval stage`);
    }
  };

  const updateApprovalConfiguration = (config: ApprovalConfiguration) => {
    setActiveConfiguration(config);
    setAllConfigurations(prev => 
      prev.map(c => c.id === config.id ? config : c)
    );
    
    createNotification(
      'workflow_completed',
      'Approval Matrix Updated',
      'Approval configuration has been successfully updated',
      'medium'
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
    
    // Create notification for new workflow
    createNotification(
      'approval_request',
      'New Approval Workflow',
      `Approval workflow created for requirement ${requirementId} (₹${budgetAmount.toLocaleString()})`,
      'medium',
      workflow.id
    );
    
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
    
    // Create notification for approval response
    createNotification(
      response === 'approved' ? 'approval_approved' : 'approval_rejected',
      `Approval ${response === 'approved' ? 'Approved' : 'Rejected'}`,
      `Request has been ${response}${comments ? ` with comments: ${comments}` : ''}`,
      response === 'rejected' ? 'high' : 'medium',
      undefined,
      requestId
    );
    
    toast.success(`Approval ${response} successfully`);
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const value: EnhancedApprovalContextType = {
    activeConfiguration,
    allConfigurations,
    teamMembers,
    approvalWorkflows,
    pendingApprovals,
    pendingUsers,
    notifications,
    unreadNotifications,
    companyId,
    userRole,
    isCompanyAdmin,
    updateTeamMembers,
    assignUsersToStage,
    removeUserFromStage,
    updateApprovalConfiguration,
    createApprovalWorkflow,
    submitApprovalResponse,
    addPendingUser,
    approvePendingUser,
    rejectPendingUser,
    checkUserApprovalStatus,
    markNotificationAsRead,
    initializeCompanyData,
    assignUserRole
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
