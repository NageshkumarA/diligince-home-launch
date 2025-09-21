import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { 
  MoreHorizontal, 
  Plus, 
  Play, 
  Pause, 
  Edit, 
  Copy, 
  Trash2,
  Workflow,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";

interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'draft';
  type: 'approval' | 'procurement' | 'notification';
  steps: number;
  lastModified: string;
  usageCount: number;
}

const mockWorkflows: WorkflowTemplate[] = [
  {
    id: '1',
    name: 'Standard Purchase Approval',
    description: 'Default approval workflow for purchase orders above $1,000',
    status: 'active',
    type: 'approval',
    steps: 3,
    lastModified: '2 days ago',
    usageCount: 156
  },
  {
    id: '2',
    name: 'Vendor Onboarding Process',
    description: 'Multi-step process for new vendor registration and approval',
    status: 'active',
    type: 'approval',
    steps: 5,
    lastModified: '1 week ago',
    usageCount: 42
  },
  {
    id: '3',
    name: 'Project Milestone Notifications',
    description: 'Automated notifications for project milestone achievements',
    status: 'inactive',
    type: 'notification',
    steps: 2,
    lastModified: '3 weeks ago',
    usageCount: 89
  }
];

export default function SettingsWorkflows() {
  const { toast } = useToast();
  const [workflows, setWorkflows] = useState(mockWorkflows);
  const [globalSettings, setGlobalSettings] = useState({
    autoApprovalLimit: 500,
    requireManagerApproval: true,
    sendNotifications: true,
    escalationTimeout: 24
  });

  const handleStatusToggle = (id: string) => {
    setWorkflows(prev => 
      prev.map(workflow => 
        workflow.id === id 
          ? { 
              ...workflow, 
              status: workflow.status === 'active' ? 'inactive' : 'active' 
            }
          : workflow
      )
    );
    
    toast({
      title: "Workflow updated",
      description: "Workflow status has been changed successfully.",
    });
  };

  const handleDuplicate = (workflow: WorkflowTemplate) => {
    const duplicated = {
      ...workflow,
      id: Date.now().toString(),
      name: `${workflow.name} (Copy)`,
      status: 'draft' as const,
      usageCount: 0
    };
    
    setWorkflows(prev => [...prev, duplicated]);
    
    toast({
      title: "Workflow duplicated",
      description: `${workflow.name} has been duplicated successfully.`,
    });
  };

  const getStatusBadge = (status: WorkflowTemplate['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="badge-success">Active</Badge>;
      case 'inactive':
        return <Badge variant="secondary">Inactive</Badge>;
      case 'draft':
        return <Badge className="badge-warning">Draft</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getTypeIcon = (type: WorkflowTemplate['type']) => {
    switch (type) {
      case 'approval':
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
      case 'procurement':
        return <Workflow className="h-4 w-4 text-green-600" />;
      case 'notification':
        return <AlertCircle className="h-4 w-4 text-orange-600" />;
      default:
        return <Workflow className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Global Workflow Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Global Workflow Settings</CardTitle>
          <CardDescription>
            Configure default settings that apply to all workflows
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="autoApproval">Automatic Approvals</Label>
              <p className="text-sm text-muted-foreground">
                Auto-approve requests below $500
              </p>
            </div>
            <Switch
              id="autoApproval"
              checked={globalSettings.requireManagerApproval}
              onCheckedChange={(checked) => 
                setGlobalSettings(prev => ({ ...prev, requireManagerApproval: checked }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="notifications">Workflow Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Send email notifications for workflow events
              </p>
            </div>
            <Switch
              id="notifications"
              checked={globalSettings.sendNotifications}
              onCheckedChange={(checked) => 
                setGlobalSettings(prev => ({ ...prev, sendNotifications: checked }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="escalation">Auto Escalation</Label>
              <p className="text-sm text-muted-foreground">
                Escalate pending approvals after 24 hours
              </p>
            </div>
            <Switch id="escalation" defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Workflow Templates */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Workflow Templates</CardTitle>
              <CardDescription>
                Manage your workflow templates and automation rules
              </CardDescription>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Workflow
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {workflows.map((workflow) => (
              <div key={workflow.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getTypeIcon(workflow.type)}
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{workflow.name}</h4>
                      {getStatusBadge(workflow.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">{workflow.description}</p>
                    <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Workflow className="h-3 w-3" />
                        {workflow.steps} steps
                      </span>
                      <span className="flex items-center gap-1">
                        <Play className="h-3 w-3" />
                        {workflow.usageCount} runs
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Modified {workflow.lastModified}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStatusToggle(workflow.id)}
                  >
                    {workflow.status === 'active' ? (
                      <>
                        <Pause className="h-4 w-4 mr-2" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Activate
                      </>
                    )}
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Workflow
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDuplicate(workflow)}>
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Workflow Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Workflow Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary">287</div>
              <div className="text-sm text-muted-foreground">Total Executions</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">94%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-orange-600">2.3h</div>
              <div className="text-sm text-muted-foreground">Avg. Processing Time</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{workflows.filter(w => w.status === 'active').length}</div>
              <div className="text-sm text-muted-foreground">Active Workflows</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Save Settings</Button>
      </div>
    </div>
  );
}