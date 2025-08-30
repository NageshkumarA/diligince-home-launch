import React from "react";
import { useRequirement } from "@/contexts/RequirementContext";
import { steps } from "@/components/requirement/RequirementStepIndicator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, User, Package, Wrench, Truck, DollarSign, Building, FileText } from "lucide-react";
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

  const categoryOptions = [{
    id: "expert",
    title: "Expert Services",
    description: "Professional consulting & technical expertise",
    icon: User,
    color: "bg-blue-50 border-blue-200 text-blue-700"
  }, {
    id: "product",
    title: "Products & Materials",
    description: "Equipment, spare parts & raw materials",
    icon: Package,
    color: "bg-green-50 border-green-200 text-green-700"
  }, {
    id: "service",
    title: "Contract Services",
    description: "Maintenance, construction & support services",
    icon: Wrench,
    color: "bg-purple-50 border-purple-200 text-purple-700"
  }, {
    id: "logistics",
    title: "Logistics & Transport",
    description: "Transportation, warehousing & distribution",
    icon: Truck,
    color: "bg-orange-50 border-orange-200 text-orange-700"
  }];
  const priorityOptions = [{
    value: "critical",
    label: "Critical",
    color: "bg-red-100 text-red-800",
    description: "Immediate action required"
  }, {
    value: "high",
    label: "High",
    color: "bg-orange-100 text-orange-800",
    description: "High priority, urgent"
  }, {
    value: "medium",
    label: "Medium",
    color: "bg-yellow-100 text-yellow-800",
    description: "Standard priority"
  }, {
    value: "low",
    label: "Low",
    color: "bg-gray-100 text-gray-800",
    description: "Low priority, flexible timing"
  }];
  const riskLevels = [{
    value: "low",
    label: "Low Risk",
    color: "text-green-600"
  }, {
    value: "medium",
    label: "Medium Risk",
    color: "text-yellow-600"
  }, {
    value: "high",
    label: "High Risk",
    color: "text-orange-600"
  }, {
    value: "critical",
    label: "Critical Risk",
    color: "text-red-600"
  }];
  const departments = ["Engineering", "Procurement", "Operations", "Maintenance", "Quality", "Safety", "IT", "Finance", "HR", "Management"];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{steps[0].name}</h2>
            <p className="text-gray-600 mt-1">
              {steps[0].description}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              Step 1 of 6
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Requirement Title */}
          <Card className="bg-white border border-gray-100 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2 text-gray-900">
                <FileText className="h-5 w-5" />
                Requirement Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-base font-medium text-gray-700">
                  Requirement Title <span className="text-red-500">*</span>
                </Label>
                <Input 
                  id="title" 
                  placeholder="Enter a clear and descriptive title" 
                  value={formData.title || ''} 
                  onChange={e => updateFormData({ title: e.target.value })} 
                  className="text-base bg-gray-50" 
                />
                {stepErrors?.title && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4" />
                    {stepErrors.title}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <Label className="text-base font-medium text-gray-700">
                  Category <span className="text-red-500">*</span>
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {categoryOptions.map(category => (
                    <div 
                      key={category.id} 
                      className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all hover:shadow-md bg-white ${
                        formData.category === category.id 
                          ? "border-primary bg-primary/5 shadow-sm" 
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => updateFormData({ category: category.id as any })}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`rounded-lg p-2 ${category.color}`}>
                          <category.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 text-xl">{category.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {stepErrors?.category && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4" />
                    {stepErrors.category}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessJustification" className="text-base font-medium text-gray-700">
                  Business Justification <span className="text-red-500">*</span>
                </Label>
                <Textarea 
                  id="businessJustification" 
                  placeholder="Explain the business need and expected benefits" 
                  value={formData.businessJustification || ''} 
                  onChange={e => updateFormData({ businessJustification: e.target.value })} 
                  rows={4} 
                  className="resize-none bg-gray-50" 
                />
                {stepErrors?.businessJustification && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4" />
                    {stepErrors.businessJustification}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Organization Details */}
          <Card className="bg-white border border-gray-100 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2 text-gray-900">
                <Building className="h-5 w-5" />
                Organization Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department" className="text-base font-medium text-gray-700">
                    Department <span className="text-red-500">*</span>
                  </Label>
                  <Select value={formData.department || ''} onValueChange={value => updateFormData({ department: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map(dept => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {stepErrors?.department && (
                    <p className="text-sm text-red-500">{stepErrors.department}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="costCenter" className="text-base font-medium text-gray-700">
                    Cost Center <span className="text-red-500">*</span>
                  </Label>
                  <Input 
                    id="costCenter" 
                    placeholder="e.g., CC-001-ENG" 
                    value={formData.costCenter || ''} 
                    onChange={e => updateFormData({ costCenter: e.target.value })} 
                    className="bg-gray-50" 
                  />
                  {stepErrors?.costCenter && (
                    <p className="text-sm text-red-500">{stepErrors.costCenter}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="requestedBy" className="text-base font-medium text-gray-700">
                  Requested By
                </Label>
                <Input 
                  id="requestedBy" 
                  placeholder="Enter requester name" 
                  value={formData.requestedBy || ''} 
                  onChange={e => updateFormData({ requestedBy: e.target.value })} 
                  className="bg-gray-50" 
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Priority & Budget */}
        <div className="space-y-6">
          <Card className="bg-white border border-gray-100 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2 text-gray-900">
                <AlertTriangle className="h-5 w-5" />
                Priority & Risk
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label className="text-base font-medium text-gray-700">Priority Level</Label>
                <div className="space-y-2">
                  {priorityOptions.map(priority => (
                    <div 
                      key={priority.value} 
                      className={`cursor-pointer rounded-lg border p-3 transition-all hover:shadow-sm bg-white ${
                        formData.priority === priority.value 
                          ? "border-primary bg-primary/5" 
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => updateFormData({ priority: priority.value as any })}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <Badge className={priority.color}>{priority.label}</Badge>
                          <p className="text-xs text-gray-600 mt-1">{priority.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {stepErrors?.priority && (
                  <p className="text-sm text-red-500">{stepErrors.priority}</p>
                )}
              </div>

              <div className="space-y-3">
                <Label className="text-base font-medium text-gray-700">Risk Assessment</Label>
                <Select value={formData.riskLevel} onValueChange={value => updateFormData({ riskLevel: value as any })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select risk level" />
                  </SelectTrigger>
                  <SelectContent>
                    {riskLevels.map(risk => (
                      <SelectItem key={risk.value} value={risk.value}>
                        <span className={risk.color}>{risk.label}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                <div>
                  <Label htmlFor="urgency" className="font-medium text-orange-800">
                    Urgent Requirement
                  </Label>
                  <p className="text-xs text-orange-600">Requires expedited processing</p>
                </div>
                <Switch id="urgency" checked={formData.urgency} onCheckedChange={checked => updateFormData({ urgency: checked })} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-100 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2 text-gray-900">
                <DollarSign className="h-5 w-5" />
                Budget Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="estimatedBudget" className="text-base font-medium text-gray-700">
                  Estimated Budget <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input 
                    id="estimatedBudget" 
                    type="number" 
                    placeholder="0.00" 
                    value={formData.estimatedBudget || ""} 
                    onChange={e => updateFormData({ estimatedBudget: parseFloat(e.target.value) || 0 })} 
                    className="pl-10 bg-gray-50" 
                  />
                </div>
                {stepErrors?.estimatedBudget && (
                  <p className="text-sm text-red-500">{stepErrors.estimatedBudget}</p>
                )}
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <div>
                  <Label htmlFor="budgetApproved" className="font-medium text-green-800">
                    Budget Pre-approved
                  </Label>
                  <p className="text-xs text-green-600">Budget already approved by finance</p>
                </div>
                <Switch id="budgetApproved" checked={formData.budgetApproved} onCheckedChange={checked => updateFormData({ budgetApproved: checked })} />
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div>
                  <Label htmlFor="complianceRequired" className="font-medium text-blue-800">
                    Compliance Required
                  </Label>
                  <p className="text-xs text-blue-600">Subject to regulatory compliance</p>
                </div>
                <Switch id="complianceRequired" checked={formData.complianceRequired} onCheckedChange={checked => updateFormData({ complianceRequired: checked })} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-6 border-t">
        <Button variant="outline" onClick={handleSaveDraft} className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Save as Draft
        </Button>
        <Button onClick={handleNext} size="lg" className="px-8 font-medium">
          Continue to Details
        </Button>
      </div>
    </div>
  );
};

export default EnhancedBasicInfoStep;
