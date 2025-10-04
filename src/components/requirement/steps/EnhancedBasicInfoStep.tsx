import React from "react";
import { useRequirement } from "@/contexts/RequirementContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Briefcase, DollarSign } from "lucide-react";
import { CategorySelector } from "@/components/requirement/CategorySelector";
import { PriorityBadge } from "@/components/requirement/PriorityBadge";
import { AdvancedOptions } from "@/components/requirement/AdvancedOptions";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "sonner";

interface EnhancedBasicInfoStepProps {
  onNext: () => void;
}

const EnhancedBasicInfoStep: React.FC<EnhancedBasicInfoStepProps> = ({
  onNext
}) => {
  const {
    formData,
    updateFormData,
    validateStep,
    stepErrors,
    saveAsDraft
  } = useRequirement();

  const handleNext = () => {
    if (validateStep(1)) {
      onNext();
    } else {
      toast.error("Please fill in all required fields");
    }
  };

  const handleSaveDraft = () => {
    saveAsDraft();
    toast.success("Draft saved successfully");
  };

  const departments = ["Engineering", "Procurement", "Operations", "Maintenance", "Quality", "Safety", "IT", "Finance", "HR", "Management"];

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in pb-6">
      {/* Section 1: Essential Information */}
      <section className="space-y-6 bg-background rounded-lg border p-6">
        <div className="flex items-center gap-2 pb-2 border-b">
          <Briefcase className="w-5 h-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold text-foreground">Essential Information</h2>
        </div>

        {/* Requirement Title */}
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-medium text-foreground">
            Requirement Title <span className="text-destructive">*</span>
          </Label>
          <Input
            id="title"
            placeholder="e.g., Procurement of Heavy Equipment for Construction Phase 2"
            value={formData.title || ""}
            onChange={(e) => updateFormData({ title: e.target.value })}
            className="text-base h-12"
            autoFocus
          />
          {formData.title && (
            <p className="text-xs text-muted-foreground">{formData.title.length} characters</p>
          )}
          {stepErrors.title && <p className="text-xs text-destructive">{stepErrors.title}</p>}
        </div>

        {/* Category Selection */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">
            Category <span className="text-destructive">*</span>
          </Label>
          <CategorySelector
            value={formData.category || ""}
            onChange={(value) => updateFormData({ category: value as any })}
            error={stepErrors.category}
          />
        </div>

        {/* Priority Level */}
        <PriorityBadge
          value={formData.priority || ""}
          onChange={(value) => updateFormData({ priority: value as any })}
          error={stepErrors.priority}
        />
      </section>

      {/* Section 2: Business Context */}
      <section className="space-y-6 bg-background rounded-lg border p-6">
        <div className="flex items-center gap-2 pb-2 border-b">
          <Briefcase className="w-5 h-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold text-foreground">Business Context</h2>
        </div>

        {/* Business Justification */}
        <div className="space-y-2">
          <Label htmlFor="justification" className="text-sm font-medium text-foreground">
            Business Justification <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="justification"
            placeholder="Describe the business need, expected outcomes, and strategic alignment..."
            value={formData.businessJustification || ""}
            onChange={(e) => updateFormData({ businessJustification: e.target.value })}
            className="min-h-[120px] text-base resize-none"
          />
          {formData.businessJustification && (
            <p className="text-xs text-muted-foreground">
              {formData.businessJustification.length} characters (min. 50 recommended)
            </p>
          )}
          {stepErrors.businessJustification && (
            <p className="text-xs text-destructive">{stepErrors.businessJustification}</p>
          )}
        </div>

        {/* Department & Cost Center */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="department" className="text-sm font-medium text-foreground">
              Department <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.department || ""}
              onValueChange={(value) => updateFormData({ department: value })}
            >
              <SelectTrigger id="department" className="h-11">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {stepErrors.department && <p className="text-xs text-destructive">{stepErrors.department}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="costCenter" className="text-sm font-medium text-foreground">
              Cost Center
            </Label>
            <Input
              id="costCenter"
              placeholder="e.g., CC-123-456"
              value={formData.costCenter || ""}
              onChange={(e) => updateFormData({ costCenter: e.target.value })}
              className="h-11"
            />
          </div>
        </div>

        {/* Requested By */}
        <div className="space-y-2">
          <Label htmlFor="requestedBy" className="text-sm font-medium text-foreground">
            Requested By
          </Label>
          <Input
            id="requestedBy"
            placeholder="Enter name or employee ID"
            value={formData.requestedBy || ""}
            onChange={(e) => updateFormData({ requestedBy: e.target.value })}
            className="h-11"
          />
        </div>
      </section>

      {/* Section 3: Budget (Collapsible) */}
      <Accordion type="single" collapsible className="border rounded-lg bg-background">
        <AccordionItem value="budget" className="border-0">
          <AccordionTrigger className="px-6 hover:no-underline hover:bg-accent/50">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">
                Budget Information
                {formData.estimatedBudget && (
                  <span className="ml-2 text-muted-foreground">
                    (${Number(formData.estimatedBudget).toLocaleString()})
                  </span>
                )}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="estimatedBudget" className="text-sm font-medium text-foreground">
                  Estimated Budget
                </Label>
                <Input
                  id="estimatedBudget"
                  type="number"
                  placeholder="0.00"
                  value={formData.estimatedBudget || ""}
                  onChange={(e) => updateFormData({ estimatedBudget: parseFloat(e.target.value) || 0 })}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="budgetCostCenter" className="text-sm font-medium text-foreground">
                  Budget Cost Center
                </Label>
                <Input
                  id="budgetCostCenter"
                  placeholder="e.g., BUDGET-2024-Q1"
                  value={formData.costCenter || ""}
                  onChange={(e) => updateFormData({ costCenter: e.target.value })}
                  className="h-11"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Section 4: Advanced Options */}
      <AdvancedOptions
        riskLevel={formData.riskLevel || "low"}
        onRiskLevelChange={(value) => updateFormData({ riskLevel: value as any })}
        isUrgent={formData.isUrgent || false}
        onUrgentChange={(value) => updateFormData({ isUrgent: value })}
        budgetPreApproved={formData.budgetApproved || false}
        onBudgetPreApprovedChange={(value) => updateFormData({ budgetApproved: value })}
        complianceRequired={formData.complianceRequired || false}
        onComplianceRequiredChange={(value) => updateFormData({ complianceRequired: value })}
      />

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-6 border-t">
        <Button type="button" variant="outline" onClick={handleSaveDraft} className="h-11">
          Save as Draft
        </Button>
        <Button type="button" onClick={handleNext} className="h-11">
          Continue to Details
        </Button>
      </div>
    </div>
  );
};

export default EnhancedBasicInfoStep;
