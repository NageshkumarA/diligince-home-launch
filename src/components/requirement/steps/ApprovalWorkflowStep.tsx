import React, { useState } from "react";
import { useRequirement } from "@/contexts/RequirementContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Clock, XCircle, Plus, Trash2, Users, AlertCircle } from "lucide-react";
import { toast } from "sonner";
interface ApprovalWorkflowStepProps {
  onNext: () => void;
  onPrevious: () => void;
}
const ApprovalWorkflowStep: React.FC<ApprovalWorkflowStepProps> = ({
  onNext,
  onPrevious
}) => {
  const {
    formData,
    updateFormData,
    validateStep,
    stepErrors
  } = useRequirement();
  const [newApproverRole, setNewApproverRole] = useState("");
  const approverRoles = ["Department Manager", "Procurement Manager", "Finance Manager", "General Manager", "CEO", "Compliance Officer", "Technical Lead"];
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    }
  };
  const addApprovalStep = () => {
    if (!newApproverRole) {
      toast.error("Please select an approver role");
      return;
    }
    const newStep = {
      id: `step-${Date.now()}`,
      stepName: `${newApproverRole} Approval`,
      approverRole: newApproverRole,
      status: "pending" as const,
      required: true
    };
    updateFormData({
      approvalSteps: [...formData.approvalSteps, newStep]
    });
    setNewApproverRole("");
    toast.success("Approval step added");
  };
  const removeApprovalStep = (stepId: string) => {
    updateFormData({
      approvalSteps: formData.approvalSteps.filter(step => step.id !== stepId)
    });
    toast.success("Approval step removed");
  };
  const handleNext = () => {
    if (validateStep(4)) {
      onNext();
    } else {
      toast.error("Please configure the approval workflow");
    }
  };
  const requiresApproval = formData.estimatedBudget > 10000 || formData.priority === "critical" || formData.complianceRequired;
  return <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Approval Workflow</h2>
            <p className="text-gray-600 mt-1">
              Configure the approval process for your requirement
            </p>
          </div>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Step 4 of 6
          </Badge>
        </div>
      </div>

      {requiresApproval && <Card className="border-orange-200 bg-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
              <div>
                <h3 className="font-medium text-orange-800 text-3xl">Approval Required</h3>
                <p className="text-sm text-orange-700 mt-1">
                  This requirement needs approval due to: {" "}
                  {formData.estimatedBudget > 10000 && "High budget value, "}
                  {formData.priority === "critical" && "Critical priority, "}
                  {formData.complianceRequired && "Compliance requirements"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Current Approval Steps */}
          <Card className="bg-white border border-gray-100 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Users className="h-5 w-5" />
                Approval Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              {formData.approvalSteps.length === 0 ? <div className="text-center py-8 text-gray-500">
                  <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium">No approval steps configured</p>
                  <p className="text-sm">Add approvers to create your workflow</p>
                </div> : <div className="space-y-4">
                  {formData.approvalSteps.map((step, index) => <div key={step.id} className="flex items-center gap-4 p-4 border rounded-lg bg-white">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-medium text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium text-gray-900">{step.stepName}</h3>
                          {getStatusBadge(step.status)}
                        </div>
                        <p className="text-sm text-gray-600">Approver: {step.approverRole}</p>
                        {step.approvedBy && <p className="text-xs text-gray-500 mt-1">
                            Approved by: {step.approvedBy} on {step.approvedAt?.toLocaleDateString()}
                          </p>}
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(step.status)}
                        <Button variant="ghost" size="sm" onClick={() => removeApprovalStep(step.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>)}
                </div>}
            </CardContent>
          </Card>

          {/* Add New Approval Step */}
          <Card className="bg-white border border-gray-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900 text-xl">Add Approval Step</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label className="text-gray-700">Approver Role</Label>
                  <Select value={newApproverRole} onValueChange={setNewApproverRole}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select approver role" />
                    </SelectTrigger>
                    <SelectContent>
                      {approverRoles.map(role => <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button onClick={addApprovalStep} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium">
                    <Plus className="h-4 w-4" />
                    Add Step
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Workflow Summary */}
        <div className="space-y-6">
          <Card className="bg-white border border-gray-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900 text-2xl">Workflow Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Steps:</span>
                  <Badge variant="outline">{formData.approvalSteps.length}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Current Status:</span>
                  <Badge className="bg-blue-100 text-blue-800">
                    {formData.approvalStatus.replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Est. Timeline:</span>
                  <span className="text-sm font-medium">
                    {formData.approvalSteps.length * 2} days
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-3 text-xl">Automatic Triggers</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  {formData.estimatedBudget > 50000 && <div className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span>Senior management approval (Budget &gt; $50K)</span>
                    </div>}
                  {formData.priority === "critical" && <div className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span>Expedited approval (Critical priority)</span>
                    </div>}
                  {formData.complianceRequired && <div className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span>Compliance review required</span>
                    </div>}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900 text-xl">Best Practices</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600 space-y-2">
              <p>• Include department manager for all requests</p>
              <p>• Add finance approval for budgets &gt; $10K</p>
              <p>• Include compliance officer for regulated items</p>
              <p>• Set up parallel approvals to reduce delays</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {stepErrors.approvalSteps && <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{stepErrors.approvalSteps}</p>
        </div>}

      <div className="flex justify-between pt-6 border-t">
        <Button variant="outline" onClick={onPrevious}>
          Previous
        </Button>
        <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 text-white font-medium">
          Continue to Publishing
        </Button>
      </div>
    </div>;
};
export default ApprovalWorkflowStep;