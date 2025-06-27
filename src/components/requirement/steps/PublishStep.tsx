
import React, { useState } from "react";
import { useRequirement } from "@/contexts/RequirementContext";
import { useStakeholder } from "@/contexts/StakeholderContext";
import { useApproval } from "@/contexts/ApprovalContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, AlertTriangle, Clock, Shield } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface PublishStepProps {
  onNext: () => void;
  onPrevious: () => void;
}

const PublishStep: React.FC<PublishStepProps> = ({ onNext, onPrevious }) => {
  const { formData, updateFormData, validateStep, stepErrors } = useRequirement();
  const { notifyStakeholders } = useStakeholder();
  const { canPublishRequirement, getApprovalWorkflow, emergencyPublish } = useApproval();
  const [isPublishing, setIsPublishing] = useState(false);

  console.log("PublishStep rendered, formData:", formData);

  // Check approval status
  const approvalCheck = canPublishRequirement(formData);
  const approvalWorkflow = getApprovalWorkflow(formData.title || 'unknown');
  
  // Available evaluation criteria based on ISO 9001 procurement standards
  const availableEvaluationCriteria = [
    "Price/Cost Competitiveness",
    "Technical Compliance",
    "Quality Standards",
    "Delivery Timeline",
    "Past Performance/Experience",
    "Technical Capability",
    "Financial Stability",
    "Compliance & Certifications",
    "Risk Assessment",
    "Sustainability Practices"
  ];

  const handleEvaluationCriteriaChange = (criterion: string, checked: boolean) => {
    let updatedCriteria = [...(formData.evaluationCriteria || [])];
    if (checked) {
      updatedCriteria.push(criterion);
    } else {
      updatedCriteria = updatedCriteria.filter(c => c !== criterion);
    }
    updateFormData({ evaluationCriteria: updatedCriteria });
  };

  const handleEmergencyPublish = async () => {
    if (!formData.isUrgent) {
      toast.error("Emergency publish is only available for urgent requirements");
      return;
    }
    
    try {
      setIsPublishing(true);
      const success = await emergencyPublish(formData.title || 'unknown');
      if (success) {
        // Notify stakeholders
        if (notifyStakeholders) {
          notifyStakeholders(formData);
        }
        toast.success("Requirement published under emergency protocol!");
        onNext();
      }
    } catch (error) {
      console.error("Emergency publish failed:", error);
      toast.error("Emergency publish failed. Please try again.");
    } finally {
      setIsPublishing(false);
    }
  };

  const handlePublish = async () => {
    try {
      console.log("Starting publish process...");
      setIsPublishing(true);
      
      if (validateStep(6)) {
        // Check approval status
        if (!approvalCheck.canPublish) {
          toast.error(approvalCheck.reason || "Approval required before publishing");
          return;
        }
        
        console.log("Validation and approval checks passed, proceeding with publish...");
        
        // Simulate API call with timeout
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Notify relevant stakeholders about the new requirement
        try {
          if (notifyStakeholders) {
            notifyStakeholders(formData);
          }
        } catch (error) {
          console.warn("Failed to notify stakeholders:", error);
          // Don't block the publish process for notification failures
        }
        
        toast.success("Requirement published successfully! Relevant stakeholders have been notified.");
        console.log("Publish successful, calling onNext...");
        onNext();
      } else {
        console.log("Validation failed:", stepErrors);
        toast.error("Please fill in all required fields");
      }
    } catch (error) {
      console.error("Error during publish:", error);
      toast.error("Failed to publish requirement. Please try again.");
    } finally {
      setIsPublishing(false);
    }
  };

  const handleSaveDraft = () => {
    toast.success("Requirement saved as draft");
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Publish Requirement</h2>
        <p className="text-gray-600">
          Configure final settings and publish your requirement. Relevant stakeholders will be automatically notified.
        </p>
        
        {/* Approval Status Display */}
        {approvalWorkflow && (
          <div className={cn(
            "p-4 rounded-lg border",
            approvalCheck.canPublish 
              ? "bg-green-50 border-green-200" 
              : "bg-yellow-50 border-yellow-200"
          )}>
            <div className="flex items-center gap-2 mb-2">
              {approvalCheck.canPublish ? (
                <Shield className="h-5 w-5 text-green-600" />
              ) : (
                <Clock className="h-5 w-5 text-yellow-600" />
              )}
              <h3 className="font-medium">
                {approvalCheck.canPublish ? "Approval Completed" : "Approval Required"}
              </h3>
            </div>
            {!approvalCheck.canPublish && (
              <p className="text-sm text-gray-600 mb-3">{approvalCheck.reason}</p>
            )}
            <div className="text-sm">
              <p>Workflow Status: <span className="font-medium">{approvalWorkflow.status}</span></p>
              <p>Completed Approvals: {approvalWorkflow.completedApprovals}/{approvalWorkflow.totalApprovals}</p>
              {approvalWorkflow.isUrgent && approvalWorkflow.emergencyPublishDeadline && (
                <p className="text-orange-600 font-medium">
                  Emergency Deadline: {format(new Date(approvalWorkflow.emergencyPublishDeadline), "PPp")}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <Label className="text-base">Requirement Visibility</Label>
          <RadioGroup
            value={formData.visibility || "all"}
            onValueChange={(value: "all" | "selected") => updateFormData({ visibility: value })}
            className="space-y-3"
          >
            <div className="flex items-start space-x-3 rounded-md border p-3">
              <RadioGroupItem value="all" id="all-vendors" />
              <div className="space-y-1">
                <Label htmlFor="all-vendors" className="font-medium">
                  All Relevant Vendors
                </Label>
                <p className="text-sm text-gray-500">
                  Your requirement will be visible to all approved vendors that match the category.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 rounded-md border p-3">
              <RadioGroupItem value="selected" id="selected-vendors" />
              <div className="space-y-1">
                <Label htmlFor="selected-vendors" className="font-medium">
                  Selected Vendors Only
                </Label>
                <p className="text-sm text-gray-500">
                  Only vendors you specifically invite will see your requirement.
                </p>
              </div>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label className="text-base">
            Submission Deadline <span className="text-red-500">*</span>
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formData.submissionDeadline && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.submissionDeadline ? (
                  format(formData.submissionDeadline, "PPP")
                ) : (
                  <span>Select deadline date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.submissionDeadline || undefined}
                onSelect={(date) => updateFormData({ submissionDeadline: date })}
                initialFocus
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
          {stepErrors?.submissionDeadline && (
            <p className="text-sm text-red-500">{stepErrors.submissionDeadline}</p>
          )}
        </div>

        <div className="space-y-4">
          <Label className="text-base">
            Evaluation Criteria <span className="text-red-500">*</span>
          </Label>
          <p className="text-sm text-gray-600">
            Select the criteria that will be used to evaluate vendor proposals (ISO 9001 compliant)
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {availableEvaluationCriteria.map((criterion) => (
              <div key={criterion} className="flex items-center space-x-2">
                <Checkbox
                  id={criterion}
                  checked={(formData.evaluationCriteria || []).includes(criterion)}
                  onCheckedChange={(checked) => handleEvaluationCriteriaChange(criterion, !!checked)}
                />
                <Label htmlFor={criterion} className="text-sm font-normal cursor-pointer">
                  {criterion}
                </Label>
              </div>
            ))}
          </div>
          {stepErrors?.evaluationCriteria && (
            <p className="text-sm text-red-500">{stepErrors.evaluationCriteria}</p>
          )}
        </div>

        <div className="space-y-4">
          <Label className="text-base">Notification Preferences</Label>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notify-email" className="cursor-pointer">Email Notifications</Label>
                <p className="text-sm text-gray-500">
                  Receive updates about proposals via email
                </p>
              </div>
              <Switch
                id="notify-email"
                checked={formData.notifyByEmail || false}
                onCheckedChange={(checked) => updateFormData({ notifyByEmail: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notify-app" className="cursor-pointer">In-App Notifications</Label>
                <p className="text-sm text-gray-500">
                  Receive updates within the platform
                </p>
              </div>
              <Switch
                id="notify-app"
                checked={formData.notifyByApp || true}
                onCheckedChange={(checked) => updateFormData({ notifyByApp: checked })}
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="terms"
              checked={formData.termsAccepted || false}
              onCheckedChange={(checked) => updateFormData({ termsAccepted: !!checked })}
            />
            <div className="space-y-1">
              <Label
                htmlFor="terms"
                className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Terms and Conditions <span className="text-red-500">*</span>
              </Label>
              <p className="text-sm text-gray-500">
                I acknowledge that I have read and agree to the{" "}
                <a href="/terms" className="text-blue-600 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>
          {stepErrors?.termsAccepted && (
            <p className="text-sm text-red-500">{stepErrors.termsAccepted}</p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 pt-6">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={isPublishing}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={handleSaveDraft}
            disabled={isPublishing}
          >
            Save as Draft
          </Button>
        </div>
        <div className="flex items-center gap-3">
          {formData.isUrgent && !approvalCheck.canPublish && (
            <Button 
              onClick={handleEmergencyPublish}
              disabled={isPublishing}
              variant="outline"
              className="bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100"
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Emergency Publish
            </Button>
          )}
          <Button 
            onClick={handlePublish}
            disabled={isPublishing || !approvalCheck.canPublish}
            className="bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isPublishing ? "Publishing..." : "Publish & Notify Stakeholders"}
          </Button>
        </div>
      </div>
      
      {!approvalCheck.canPublish && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <p className="text-sm text-yellow-800">
              {approvalCheck.reason}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PublishStep;
