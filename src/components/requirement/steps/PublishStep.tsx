
import React from "react";
import { useRequirement } from "@/contexts/RequirementContext";
import { useStakeholder } from "@/contexts/StakeholderContext";
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
import { CalendarIcon } from "lucide-react";
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

  const handlePublish = () => {
    if (validateStep(5)) {
      // Notify relevant stakeholders about the new requirement
      notifyStakeholders(formData);
      
      toast.success("Requirement published successfully! Relevant stakeholders have been notified.");
      onNext();
    } else {
      toast.error("Please fill in all required fields");
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
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <Label className="text-base">Requirement Visibility</Label>
          <RadioGroup
            value={formData.visibility}
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
          {stepErrors.submissionDeadline && (
            <p className="text-sm text-red-500">{stepErrors.submissionDeadline}</p>
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
                checked={formData.notifyByEmail}
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
                checked={formData.notifyByApp}
                onCheckedChange={(checked) => updateFormData({ notifyByApp: checked })}
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="terms"
              checked={formData.termsAccepted}
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
          {stepErrors.termsAccepted && (
            <p className="text-sm text-red-500">{stepErrors.termsAccepted}</p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 pt-6">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={onPrevious}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={handleSaveDraft}
          >
            Save as Draft
          </Button>
        </div>
        <Button 
          onClick={handlePublish}
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          Publish & Notify Stakeholders
        </Button>
      </div>
    </div>
  );
};

export default PublishStep;
