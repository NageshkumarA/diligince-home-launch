
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEnhancedApproval } from '@/contexts/EnhancedApprovalContext';
import { TeamMember } from '@/types/teamMember';
import { ApprovalThreshold, ApprovalStage } from '@/types/enhancedApproval';
import { Users, Plus, Trash2, Settings, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

interface ApprovalMatrixConfigurationProps {
  teamMembers: TeamMember[];
  onTeamMembersUpdate: (members: TeamMember[]) => void;
}

const ApprovalMatrixConfiguration: React.FC<ApprovalMatrixConfigurationProps> = ({
  teamMembers,
  onTeamMembersUpdate
}) => {
  const { 
    activeConfiguration, 
    assignUsersToStage, 
    removeUserFromStage,
    updateApprovalConfiguration 
  } = useEnhancedApproval();
  
  const [selectedThreshold, setSelectedThreshold] = useState<string>('');
  const [selectedStage, setSelectedStage] = useState<string>('');

  useEffect(() => {
    if (activeConfiguration && activeConfiguration.thresholds.length > 0) {
      setSelectedThreshold(activeConfiguration.thresholds[0].id);
    }
  }, [activeConfiguration]);

  if (!activeConfiguration) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-gray-500 text-center">No active approval configuration found.</p>
        </CardContent>
      </Card>
    );
  }

  const handleAssignUser = (thresholdId: string, stageId: string, userId: string) => {
    assignUsersToStage(activeConfiguration.id, thresholdId, stageId, [userId]);
  };

  const handleRemoveUser = (thresholdId: string, stageId: string, userId: string) => {
    removeUserFromStage(activeConfiguration.id, thresholdId, stageId, userId);
  };

  const getStageIcon = (stageName: string) => {
    switch (stageName) {
      case 'initiator': return <Users className="h-4 w-4 text-blue-600" />;
      case 'reviewer': return <CheckCircle className="h-4 w-4 text-orange-600" />;
      case 'approver': return <Settings className="h-4 w-4 text-green-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getApprovalTypeLabel = (stage: ApprovalStage) => {
    switch (stage.approvalType) {
      case 'single': return 'Single Approval';
      case 'joint': return `Joint Approval (${stage.minimumApprovals || stage.assignedUsers.length} required)`;
      case 'majority': return `Majority Approval (${Math.ceil((stage.minimumApprovals || stage.assignedUsers.length) / 2)} required)`;
      default: return 'Unknown';
    }
  };

  const renderStageConfiguration = (threshold: ApprovalThreshold) => {
    return (
      <div className="space-y-6">
        {threshold.stages
          .sort((a, b) => a.order - b.order)
          .map((stage) => (
            <Card key={stage.id} className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getStageIcon(stage.name)}
                    <div>
                      <CardTitle className="text-lg">{stage.displayName}</CardTitle>
                      <p className="text-sm text-gray-600">
                        {getApprovalTypeLabel(stage)} • Max {stage.maxApprovalTime}h
                      </p>
                    </div>
                  </div>
                  <Badge variant={stage.isRequired ? "default" : "secondary"}>
                    {stage.isRequired ? 'Required' : 'Optional'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Assigned Users</Label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {stage.assignedUsers.map((userId) => {
                        const user = teamMembers.find(tm => tm.id === userId);
                        return user ? (
                          <Badge key={userId} variant="outline" className="flex items-center gap-1">
                            {user.name} ({user.role})
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-4 w-4 p-0 hover:bg-red-100"
                              onClick={() => handleRemoveUser(threshold.id, stage.id, userId)}
                            >
                              <Trash2 className="h-3 w-3 text-red-500" />
                            </Button>
                          </Badge>
                        ) : null;
                      })}
                    </div>
                    
                    <div className="flex gap-2">
                      <Select onValueChange={(userId) => handleAssignUser(threshold.id, stage.id, userId)}>
                        <SelectTrigger className="w-64">
                          <SelectValue placeholder="Assign team member" />
                        </SelectTrigger>
                        <SelectContent>
                          {teamMembers
                            .filter(tm => !stage.assignedUsers.includes(tm.id))
                            .map((member) => (
                              <SelectItem key={member.id} value={member.id}>
                                {member.name} ({member.role}) - {member.department}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {stage.assignedUsers.length === 0 && (
                    <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <p className="text-sm text-yellow-800">No users assigned to this stage</p>
                    </div>
                  )}

                  {stage.escalationUsers && stage.escalationUsers.length > 0 && (
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Escalation Users</Label>
                      <div className="flex flex-wrap gap-2">
                        {stage.escalationUsers.map((userId) => {
                          const user = teamMembers.find(tm => tm.id === userId);
                          return user ? (
                            <Badge key={userId} variant="secondary">
                              {user.name} ({user.role})
                            </Badge>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Approval Matrix Configuration
          </CardTitle>
          <p className="text-sm text-gray-600">
            Configure approval workflows and assign team members to different approval stages
          </p>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Label className="text-sm font-medium mb-2 block">Active Configuration</Label>
            <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <CheckCircle className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium text-blue-900">{activeConfiguration.name}</p>
                <p className="text-sm text-blue-700">{activeConfiguration.description}</p>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <Tabs value={selectedThreshold} onValueChange={setSelectedThreshold} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              {activeConfiguration.thresholds.map((threshold) => (
                <TabsTrigger key={threshold.id} value={threshold.id} className="text-xs">
                  {threshold.name.split('(')[0].trim()}
                </TabsTrigger>
              ))}
            </TabsList>

            {activeConfiguration.thresholds.map((threshold) => (
              <TabsContent key={threshold.id} value={threshold.id} className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">{threshold.name}</CardTitle>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span>Range: ₹{threshold.minAmount.toLocaleString()} - ₹{threshold.maxAmount === Infinity ? '∞' : threshold.maxAmount.toLocaleString()}</span>
                      <span>Stages: {threshold.stages.length}</span>
                      <span>Compliance: {threshold.complianceRequired ? 'Required' : 'Not Required'}</span>
                      <span>Urgent Bypass: {threshold.urgentBypass ? 'Allowed' : 'Not Allowed'}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {renderStageConfiguration(threshold)}
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Team Members Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teamMembers.map((member) => {
              const assignmentCount = activeConfiguration.thresholds.reduce((count, threshold) => {
                return count + threshold.stages.reduce((stageCount, stage) => {
                  return stageCount + (stage.assignedUsers.includes(member.id) ? 1 : 0);
                }, 0);
              }, 0);

              return (
                <Card key={member.id} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{member.name}</h4>
                    <Badge variant={member.status === 'active' ? 'default' : 'secondary'}>
                      {member.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{member.role}</p>
                  <p className="text-sm text-gray-600 mb-2">{member.department}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {assignmentCount} assignments
                    </Badge>
                  </div>
                </Card>
              );
            })}
          </div>

          {teamMembers.length === 0 && (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No team members available</p>
              <p className="text-sm text-gray-400">Add team members to configure approval workflows</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ApprovalMatrixConfiguration;
