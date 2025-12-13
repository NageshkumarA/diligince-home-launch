import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { approvalsService } from '@/services/modules/approvals/approvals.service';
import { RequirementApprovalActions } from '@/components/requirement/RequirementApprovalActions';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  FileText, 
  Calendar, 
  DollarSign, 
  Building2, 
  Tag, 
  AlertTriangle,
  User,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  Download,
  Eye
} from 'lucide-react';
import { toast } from 'sonner';
import type { PendingApproval, ApprovalProgressLevel, ApprovalApprover } from '@/services/modules/approvals/approvals.types';

const PendingRequirementView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useUser();
  
  const [requirement, setRequirement] = useState<PendingApproval | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch requirement details
  useEffect(() => {
    const fetchRequirement = async () => {
      if (!id) {
        setError('Invalid requirement ID');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Fetch from pending approvals and find the specific one
        const response = await approvalsService.getPending({ limit: 100 });
        const found = response.items?.find(
          item => item.requirementId === id || item.draftId === id
        );
        
        if (found) {
          setRequirement(found);
        } else {
          setError('Requirement not found');
        }
      } catch (err: any) {
        console.error('Failed to fetch requirement:', err);
        setError(err.message || 'Failed to load requirement');
        toast.error('Failed to load requirement details');
      } finally {
        setLoading(false);
      }
    };

    fetchRequirement();
  }, [id]);

  // Check if current user can approve/reject
  const canShowApprovalActions = (): boolean => {
    if (!requirement || !user?.id) return false;
    
    const isPendingStatus = requirement.status === 'pending';
    const currentLevel = requirement.approvalProgress?.currentLevel;
    const currentLevelData = requirement.approvalProgress?.levels?.find(
      l => l.levelNumber === currentLevel && l.status === 'in_progress'
    );
    
    // Check if user is an approver in the current level with pending status
    const isUserApprover = currentLevelData?.approvers?.some(
      approver => approver.memberId === user.id && approver.status === 'pending'
    );

    return isPendingStatus && !!isUserApprover;
  };

  const handleActionComplete = () => {
    navigate('/dashboard/requirements/pending');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getLevelStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'in_progress': return <Clock className="h-5 w-5 text-amber-500" />;
      case 'waiting': return <Clock className="h-5 w-5 text-muted-foreground" />;
      default: return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getApproverStatusBadge = (status: string) => {
    switch (status) {
      case 'approved': 
        return <Badge className="bg-green-100 text-green-700 border-green-200">Approved</Badge>;
      case 'rejected': 
        return <Badge className="bg-red-100 text-red-700 border-red-200">Rejected</Badge>;
      case 'pending': 
        return <Badge className="bg-amber-100 text-amber-700 border-amber-200">Pending</Badge>;
      default: 
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading requirement details...</p>
        </div>
      </div>
    );
  }

  if (error || !requirement) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4 text-center">
          <AlertTriangle className="h-12 w-12 text-destructive" />
          <h2 className="text-xl font-semibold text-foreground">Error Loading Requirement</h2>
          <p className="text-muted-foreground">{error || 'Requirement not found'}</p>
          <Button onClick={() => navigate('/dashboard/requirements/pending')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Pending Approvals
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/dashboard/requirements/pending')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <div>
              <h1 className="text-xl font-semibold text-foreground">{requirement.title}</h1>
              <p className="text-sm text-muted-foreground">
                {requirement.requirementId || requirement.draftId}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
              Pending Approval
            </Badge>
            <Badge className={getPriorityColor(requirement.priority)}>
              {requirement.priority}
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-5xl mx-auto space-y-6">
          
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="h-5 w-5 text-primary" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Title</p>
                  <p className="font-medium">{requirement.title}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Tag className="h-3.5 w-3.5" /> Category
                  </p>
                  <p className="font-medium">{requirement.category}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <AlertTriangle className="h-3.5 w-3.5" /> Priority
                  </p>
                  <Badge className={getPriorityColor(requirement.priority)}>
                    {requirement.priority}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Building2 className="h-3.5 w-3.5" /> Department
                  </p>
                  <p className="font-medium">{requirement.department || 'N/A'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <DollarSign className="h-3.5 w-3.5" /> Estimated Budget
                  </p>
                  <p className="font-medium text-lg">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      maximumFractionDigits: 0
                    }).format(requirement.estimatedBudget || 0)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" /> Submitted Date
                  </p>
                  <p className="font-medium">
                    {requirement.sentForApprovalAt 
                      ? new Date(requirement.sentForApprovalAt).toLocaleDateString()
                      : 'N/A'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Created By */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="h-5 w-5 text-primary" />
                Submitted By
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-lg font-semibold text-primary">
                    {requirement.createdBy?.name?.charAt(0) || '?'}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{requirement.createdBy?.name || 'Unknown'}</p>
                  <p className="text-sm text-muted-foreground">{requirement.createdBy?.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Approval Matrix Info */}
          {requirement.selectedApprovalMatrix && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Approval Matrix
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{requirement.selectedApprovalMatrix.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {requirement.selectedApprovalMatrix.totalLevels} approval levels
                    </p>
                  </div>
                  <Badge variant="outline">
                    Level {requirement.approvalProgress?.currentLevel} of {requirement.approvalProgress?.totalLevels}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Approval Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Clock className="h-5 w-5 text-primary" />
                Approval Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {requirement.approvalProgress?.levels?.map((level: ApprovalProgressLevel, index: number) => (
                  <div 
                    key={level.levelNumber} 
                    className={`relative pl-8 pb-6 ${
                      index < (requirement.approvalProgress?.levels?.length || 0) - 1 
                        ? 'border-l-2 border-border ml-2.5' 
                        : ''
                    }`}
                  >
                    {/* Level indicator */}
                    <div className="absolute -left-2.5 top-0 bg-background p-1">
                      {getLevelStatusIcon(level.status)}
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">
                            Level {level.levelNumber}: {level.name}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Max approval time: {level.maxApprovalTimeHours} hours
                          </p>
                        </div>
                        <Badge 
                          variant={level.status === 'completed' ? 'default' : 'outline'}
                          className={
                            level.status === 'completed' 
                              ? 'bg-green-100 text-green-700 border-green-200'
                              : level.status === 'in_progress'
                              ? 'bg-amber-100 text-amber-700 border-amber-200'
                              : ''
                          }
                        >
                          {level.status === 'in_progress' ? 'In Progress' : 
                           level.status === 'completed' ? 'Completed' :
                           level.status === 'waiting' ? 'Waiting' : level.status}
                        </Badge>
                      </div>

                      {/* Approvers */}
                      <div className="space-y-2">
                        {level.approvers?.map((approver: ApprovalApprover) => (
                          <div 
                            key={approver.memberId}
                            className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="text-xs font-semibold text-primary">
                                  {approver.memberName?.split(' ').map(n => n[0]).join('').substring(0, 2) || '??'}
                                </span>
                              </div>
                              <div>
                                <p className="text-sm font-medium">{approver.memberName}</p>
                                <p className="text-xs text-muted-foreground">
                                  {approver.memberRole}
                                  {approver.isMandatory && (
                                    <span className="ml-2 text-amber-600">(Mandatory)</span>
                                  )}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {getApproverStatusBadge(approver.status)}
                              {approver.approvedAt && (
                                <span className="text-xs text-muted-foreground">
                                  {new Date(approver.approvedAt).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Level completion info */}
                      {level.completedAt && (
                        <p className="text-xs text-muted-foreground">
                          Completed on {new Date(level.completedAt).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Fixed Footer - Conditional Approve/Reject Buttons */}
      <div className="sticky bottom-0 z-10 bg-background border-t border-border px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Button 
            variant="outline"
            onClick={() => navigate('/dashboard/requirements/pending')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to List
          </Button>

          {canShowApprovalActions() ? (
            <RequirementApprovalActions 
              requirementId={requirement.requirementId || requirement.draftId || id!}
              onActionComplete={handleActionComplete}
            />
          ) : (
            <p className="text-sm text-muted-foreground">
              {requirement.approvalProgress?.currentLevel && user?.id ? (
                "You are not an approver for the current level"
              ) : (
                "Waiting for approval from designated approvers"
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PendingRequirementView;
