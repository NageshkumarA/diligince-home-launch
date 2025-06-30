
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import IndustryHeader from '@/components/industry/IndustryHeader';
import ApprovalMatrixConfiguration from '@/components/industry/approval/ApprovalMatrixConfiguration';
import { useEnhancedApproval } from '@/contexts/EnhancedApprovalContext';
import { TeamMember } from '@/types/teamMember';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Users, BarChart3, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

// Mock team members data - in real app this would come from team management
const mockTeamMembers: TeamMember[] = [
  {
    id: 'tm-1',
    name: 'John Smith',
    email: 'john.smith@company.com',
    phone: '+91-9876543210',
    role: 'Manager',
    department: 'Engineering',
    status: 'active',
    joinDate: '2024-01-15',
    invitationStatus: 'accepted',
    permissions: [
      { module: 'Requirements', actions: ['create', 'read', 'update', 'approve'], dataScope: 'department' },
      { module: 'Team Management', actions: ['read'], dataScope: 'department' }
    ]
  },
  {
    id: 'tm-2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    phone: '+91-9876543211',
    role: 'Procurement Head',
    department: 'Procurement',
    status: 'active',
    joinDate: '2024-02-01',
    invitationStatus: 'accepted',
    permissions: [
      { module: 'Requirements', actions: ['create', 'read', 'update', 'approve'], dataScope: 'company' },
      { module: 'Vendors', actions: ['create', 'read', 'update'], dataScope: 'company' }
    ]
  },
  {
    id: 'tm-3',
    name: 'Michael Brown',
    email: 'michael.brown@company.com',
    phone: '+91-9876543212',
    role: 'Finance Head',
    department: 'Finance',
    status: 'active',
    joinDate: '2024-01-20',
    invitationStatus: 'accepted',
    permissions: [
      { module: 'Requirements', actions: ['read', 'approve'], dataScope: 'company' },
      { module: 'Payment Settings', actions: ['create', 'read', 'update'], dataScope: 'company' }
    ]
  },
  {
    id: 'tm-4',
    name: 'Lisa Davis',
    email: 'lisa.davis@company.com',
    phone: '+91-9876543213',
    role: 'CEO',
    department: 'Management',
    status: 'active',
    joinDate: '2024-01-01',
    invitationStatus: 'accepted',
    permissions: [
      { module: 'Requirements', actions: ['create', 'read', 'update', 'approve'], dataScope: 'company' },
      { module: 'Team Management', actions: ['create', 'read', 'update', 'delete'], dataScope: 'company' }
    ]
  },
  {
    id: 'tm-5',
    name: 'David Wilson',
    email: 'david.wilson@company.com',
    phone: '+91-9876543214',
    role: 'Engineer',
    department: 'Engineering',
    status: 'active',
    joinDate: '2024-02-15',
    invitationStatus: 'accepted',
    permissions: [
      { module: 'Requirements', actions: ['create', 'read'], dataScope: 'department' }
    ]
  },
  {
    id: 'tm-6',
    name: 'Anna Martinez',
    email: 'anna.martinez@company.com',
    phone: '+91-9876543215',
    role: 'AGM',
    department: 'Operations',
    status: 'active',
    joinDate: '2024-01-10',
    invitationStatus: 'accepted',
    permissions: [
      { module: 'Requirements', actions: ['create', 'read', 'update', 'approve'], dataScope: 'company' }
    ]
  }
];

const IndustryApprovalMatrix = () => {
  const { 
    activeConfiguration, 
    approvalWorkflows, 
    updateTeamMembers 
  } = useEnhancedApproval();
  
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(mockTeamMembers);
  const [selectedTab, setSelectedTab] = useState('configuration');

  useEffect(() => {
    updateTeamMembers(teamMembers);
  }, [teamMembers, updateTeamMembers]);

  const handleTeamMembersUpdate = (updatedMembers: TeamMember[]) => {
    setTeamMembers(updatedMembers);
    updateTeamMembers(updatedMembers);
  };

  // Calculate approval statistics
  const approvalStats = {
    totalWorkflows: approvalWorkflows.length,
    completedWorkflows: approvalWorkflows.filter(w => w.status === 'completed').length,
    pendingWorkflows: approvalWorkflows.filter(w => w.status === 'pending' || w.status === 'in_progress').length,
    rejectedWorkflows: approvalWorkflows.filter(w => w.status === 'rejected').length,
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Workflows</p>
                <p className="text-2xl font-bold text-gray-900">{approvalStats.totalWorkflows}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-900">{approvalStats.completedWorkflows}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-orange-900">{approvalStats.pendingWorkflows}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-red-900">{approvalStats.rejectedWorkflows}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {activeConfiguration && (
        <Card>
          <CardHeader>
            <CardTitle>Active Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{activeConfiguration.name}</h3>
                  <p className="text-gray-600">{activeConfiguration.description}</p>
                </div>
                <Badge variant="default">Active</Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="font-medium text-blue-900">Approval Thresholds</p>
                  <p className="text-2xl font-bold text-blue-600">{activeConfiguration.thresholds.length}</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="font-medium text-green-900">Total Approval Stages</p>
                  <p className="text-2xl font-bold text-green-600">
                    {activeConfiguration.thresholds.reduce((total, threshold) => total + threshold.stages.length, 0)}
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="font-medium text-purple-900">Assigned Users</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {new Set(
                      activeConfiguration.thresholds.flatMap(threshold => 
                        threshold.stages.flatMap(stage => stage.assignedUsers)
                      )
                    ).size}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Recent Approval Workflows</CardTitle>
        </CardHeader>
        <CardContent>
          {approvalWorkflows.length > 0 ? (
            <div className="space-y-4">
              {approvalWorkflows.slice(0, 5).map((workflow) => (
                <div key={workflow.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{workflow.requirementId}</p>
                    <p className="text-sm text-gray-600">
                      Amount: ₹{workflow.budgetAmount.toLocaleString()} • 
                      Stages: {workflow.completedStages}/{workflow.totalStages}
                    </p>
                  </div>
                  <Badge 
                    variant={
                      workflow.status === 'completed' ? 'default' : 
                      workflow.status === 'rejected' ? 'destructive' : 
                      'secondary'
                    }
                  >
                    {workflow.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No approval workflows yet</p>
              <p className="text-sm text-gray-400">Workflows will appear here when requirements are created</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Helmet>
        <title>Approval Matrix Configuration | Diligince.ai</title>
      </Helmet>
      
      <IndustryHeader />
      
      <main className="flex-1 container mx-auto px-4 py-8 pt-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Approval Matrix Management</h1>
          <p className="text-gray-600">Configure and manage approval workflows for procurement requirements</p>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="configuration">Configuration</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            {renderOverviewTab()}
          </TabsContent>

          <TabsContent value="configuration" className="mt-6">
            <ApprovalMatrixConfiguration 
              teamMembers={teamMembers}
              onTeamMembersUpdate={handleTeamMembersUpdate}
            />
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Approval Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-2">Advanced Analytics Coming Soon</p>
                  <p className="text-sm text-gray-400">
                    Detailed approval performance metrics, bottleneck analysis, and compliance reporting
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default IndustryApprovalMatrix;
