import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertTriangle, Clock, Shield, DollarSign } from "lucide-react";

interface AdvancedOptionsProps {
  riskLevel: string;
  onRiskLevelChange: (value: string) => void;
  isUrgent: boolean;
  onUrgentChange: (value: boolean) => void;
  budgetPreApproved: boolean;
  onBudgetPreApprovedChange: (value: boolean) => void;
  complianceRequired: boolean;
  onComplianceRequiredChange: (value: boolean) => void;
}

const riskLevels = [
  { value: "low", label: "Low Risk" },
  { value: "medium", label: "Medium Risk" },
  { value: "high", label: "High Risk" },
  { value: "critical", label: "Critical Risk" },
];

export function AdvancedOptions({
  riskLevel,
  onRiskLevelChange,
  isUrgent,
  onUrgentChange,
  budgetPreApproved,
  onBudgetPreApprovedChange,
  complianceRequired,
  onComplianceRequiredChange,
}: AdvancedOptionsProps) {
  return (
    <Accordion type="single" collapsible className="border rounded-lg bg-muted/30">
      <AccordionItem value="advanced" className="border-0">
        <AccordionTrigger className="px-6 hover:no-underline hover:bg-accent/50">
          <span className="text-sm font-medium text-foreground">Advanced Options</span>
        </AccordionTrigger>
        <AccordionContent className="px-6 pb-6 space-y-6">
          {/* Risk Level */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-muted-foreground" />
              <Label htmlFor="risk-level" className="text-sm font-medium">
                Risk Assessment
              </Label>
            </div>
            <Select value={riskLevel} onValueChange={onRiskLevelChange}>
              <SelectTrigger id="risk-level" className="h-11">
                <SelectValue placeholder="Select risk level" />
              </SelectTrigger>
              <SelectContent>
                {riskLevels.map((risk) => (
                  <SelectItem key={risk.value} value={risk.value}>
                    {risk.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Toggles */}
          <div className="space-y-4 pt-2">
            {/* Urgent Requirement */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <Label htmlFor="urgent" className="text-sm font-medium cursor-pointer">
                  Urgent Requirement
                </Label>
              </div>
              <Switch id="urgent" checked={isUrgent} onCheckedChange={onUrgentChange} />
            </div>

            {/* Budget Pre-approved */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-muted-foreground" />
                <Label htmlFor="budget-approved" className="text-sm font-medium cursor-pointer">
                  Budget Pre-approved
                </Label>
              </div>
              <Switch
                id="budget-approved"
                checked={budgetPreApproved}
                onCheckedChange={onBudgetPreApprovedChange}
              />
            </div>

            {/* Compliance Required */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-muted-foreground" />
                <Label htmlFor="compliance" className="text-sm font-medium cursor-pointer">
                  Compliance Required
                </Label>
              </div>
              <Switch
                id="compliance"
                checked={complianceRequired}
                onCheckedChange={onComplianceRequiredChange}
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
