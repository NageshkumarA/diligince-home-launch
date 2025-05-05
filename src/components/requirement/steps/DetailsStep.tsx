
import React from "react";
import { useRequirement } from "@/contexts/RequirementContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

interface DetailsStepProps {
  onNext: () => void;
  onPrevious: () => void;
}

const DetailsStep: React.FC<DetailsStepProps> = ({ onNext, onPrevious }) => {
  const { formData, updateFormData, validateStep, stepErrors } = useRequirement();

  const handleNext = () => {
    if (validateStep(2)) {
      onNext();
    } else {
      toast.error("Please fill in all required fields");
    }
  };

  const expertSpecializations = [
    "Automation Engineer", 
    "Electrical Engineer", 
    "Mechanical Engineer",
    "Process Engineer",
    "Quality Control Engineer",
    "Safety Engineer",
    "Environmental Engineer"
  ];

  const equipmentTypes = [
    "Crane",
    "Forklift",
    "Loader",
    "Excavator",
    "Trailer",
    "Truck",
    "Container",
    "Specialized Equipment"
  ];

  const qualityRequirements = [
    "ISO 9001",
    "Industry Standard",
    "Premium Quality",
    "Standard Quality",
    "Economy"
  ];

  const certificationOptions = [
    "ISO 9001",
    "ISO 14001",
    "OHSAS 18001",
    "API",
    "ASME",
    "Six Sigma",
    "PMP",
    "Professional Engineer"
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Requirement Details</h2>
        <p className="text-gray-600">
          Complete the specific details for your {formData.category} requirement
        </p>
      </div>

      {/* Expert Fields */}
      {formData.category === "expert" && (
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="specialization" className="text-base">
              Specialization <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.specialization}
              onValueChange={(value) => updateFormData({ specialization: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select specialization" />
              </SelectTrigger>
              <SelectContent>
                {expertSpecializations.map((spec) => (
                  <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {stepErrors.specialization && (
              <p className="text-sm text-red-500">{stepErrors.specialization}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-base">
              Detailed Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              rows={4}
              placeholder="Describe the expertise required and tasks to be performed"
              value={formData.description || ""}
              onChange={(e) => updateFormData({ description: e.target.value })}
            />
            {stepErrors.description && (
              <p className="text-sm text-red-500">{stepErrors.description}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-base">Required Certifications</Label>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              {certificationOptions.map((cert) => (
                <div key={cert} className="flex items-center space-x-2">
                  <Checkbox
                    id={`cert-${cert}`}
                    checked={(formData.certifications || []).includes(cert)}
                    onCheckedChange={(checked) => {
                      const currentCerts = [...(formData.certifications || [])];
                      if (checked) {
                        currentCerts.push(cert);
                      } else {
                        const index = currentCerts.indexOf(cert);
                        if (index !== -1) currentCerts.splice(index, 1);
                      }
                      updateFormData({ certifications: currentCerts });
                    }}
                  />
                  <label
                    htmlFor={`cert-${cert}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {cert}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="budget" className="text-base">Budget</Label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                <Input
                  id="budget"
                  type="number"
                  placeholder="Enter budget amount"
                  className="pl-8"
                  value={formData.budget || ""}
                  onChange={(e) => updateFormData({ budget: parseFloat(e.target.value) || 0 })}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="duration" className="text-base">Duration (days)</Label>
              <Input
                id="duration"
                type="number"
                placeholder="Enter project duration"
                value={formData.duration || ""}
                onChange={(e) => updateFormData({ duration: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-base">Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.startDate ? (
                      format(formData.startDate, "PPP")
                    ) : (
                      <span>Select date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.startDate || undefined}
                    onSelect={(date) => updateFormData({ startDate: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label className="text-base">End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.endDate ? (
                      format(formData.endDate, "PPP")
                    ) : (
                      <span>Select date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.endDate || undefined}
                    onSelect={(date) => updateFormData({ endDate: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      )}

      {/* Product Fields */}
      {formData.category === "product" && (
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="productSpecifications" className="text-base">
              Product Specifications <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="productSpecifications"
              rows={4}
              placeholder="Detailed specifications of the required product"
              value={formData.productSpecifications || ""}
              onChange={(e) => updateFormData({ productSpecifications: e.target.value })}
            />
            {stepErrors.productSpecifications && (
              <p className="text-sm text-red-500">{stepErrors.productSpecifications}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="quantity" className="text-base">
                Quantity <span className="text-red-500">*</span>
              </Label>
              <Input
                id="quantity"
                type="number"
                placeholder="Enter quantity required"
                value={formData.quantity || ""}
                onChange={(e) => updateFormData({ quantity: parseInt(e.target.value) || 0 })}
              />
              {stepErrors.quantity && (
                <p className="text-sm text-red-500">{stepErrors.quantity}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="budget" className="text-base">Budget</Label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                <Input
                  id="budget"
                  type="number"
                  placeholder="Enter budget amount"
                  className="pl-8"
                  value={formData.budget || ""}
                  onChange={(e) => updateFormData({ budget: parseFloat(e.target.value) || 0 })}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-base">Delivery Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.deliveryDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.deliveryDate ? (
                      format(formData.deliveryDate, "PPP")
                    ) : (
                      <span>Select date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.deliveryDate || undefined}
                    onSelect={(date) => updateFormData({ deliveryDate: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="qualityRequirements" className="text-base">Quality Requirements</Label>
              <Select
                value={formData.qualityRequirements}
                onValueChange={(value) => updateFormData({ qualityRequirements: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select quality level" />
                </SelectTrigger>
                <SelectContent>
                  {qualityRequirements.map((quality) => (
                    <SelectItem key={quality} value={quality}>{quality}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}

      {/* Service Fields */}
      {formData.category === "service" && (
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="serviceDescription" className="text-base">
              Service Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="serviceDescription"
              rows={3}
              placeholder="Describe the service required"
              value={formData.serviceDescription || ""}
              onChange={(e) => updateFormData({ serviceDescription: e.target.value })}
            />
            {stepErrors.serviceDescription && (
              <p className="text-sm text-red-500">{stepErrors.serviceDescription}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="scopeOfWork" className="text-base">
              Scope of Work <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="scopeOfWork"
              rows={4}
              placeholder="Detailed scope of work, including deliverables and milestones"
              value={formData.scopeOfWork || ""}
              onChange={(e) => updateFormData({ scopeOfWork: e.target.value })}
            />
            {stepErrors.scopeOfWork && (
              <p className="text-sm text-red-500">{stepErrors.scopeOfWork}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-base">Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.serviceStartDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.serviceStartDate ? (
                      format(formData.serviceStartDate, "PPP")
                    ) : (
                      <span>Select date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.serviceStartDate || undefined}
                    onSelect={(date) => updateFormData({ serviceStartDate: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label className="text-base">End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.serviceEndDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.serviceEndDate ? (
                      format(formData.serviceEndDate, "PPP")
                    ) : (
                      <span>Select date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.serviceEndDate || undefined}
                    onSelect={(date) => updateFormData({ serviceEndDate: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="serviceBudget" className="text-base">Budget</Label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                <Input
                  id="serviceBudget"
                  type="number"
                  placeholder="Enter budget amount"
                  className="pl-8"
                  value={formData.serviceBudget || ""}
                  onChange={(e) => updateFormData({ serviceBudget: parseFloat(e.target.value) || 0 })}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location" className="text-base">
                Location <span className="text-red-500">*</span>
              </Label>
              <Input
                id="location"
                placeholder="Service location"
                value={formData.location || ""}
                onChange={(e) => updateFormData({ location: e.target.value })}
              />
              {stepErrors.location && (
                <p className="text-sm text-red-500">{stepErrors.location}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Logistics Fields */}
      {formData.category === "logistics" && (
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="equipmentType" className="text-base">
              Equipment Type <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.equipmentType}
              onValueChange={(value) => updateFormData({ equipmentType: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select equipment type" />
              </SelectTrigger>
              <SelectContent>
                {equipmentTypes.map((equip) => (
                  <SelectItem key={equip} value={equip}>{equip}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {stepErrors.equipmentType && (
              <p className="text-sm text-red-500">{stepErrors.equipmentType}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="weight" className="text-base">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="Enter weight"
                value={formData.weight || ""}
                onChange={(e) => updateFormData({ weight: parseFloat(e.target.value) || 0 })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dimensions" className="text-base">Dimensions</Label>
              <Input
                id="dimensions"
                placeholder="Length x Width x Height"
                value={formData.dimensions || ""}
                onChange={(e) => updateFormData({ dimensions: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="pickupLocation" className="text-base">
                Pickup Location <span className="text-red-500">*</span>
              </Label>
              <Input
                id="pickupLocation"
                placeholder="Enter pickup location"
                value={formData.pickupLocation || ""}
                onChange={(e) => updateFormData({ pickupLocation: e.target.value })}
              />
              {stepErrors.pickupLocation && (
                <p className="text-sm text-red-500">{stepErrors.pickupLocation}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="deliveryLocation" className="text-base">
                Delivery Location <span className="text-red-500">*</span>
              </Label>
              <Input
                id="deliveryLocation"
                placeholder="Enter delivery location"
                value={formData.deliveryLocation || ""}
                onChange={(e) => updateFormData({ deliveryLocation: e.target.value })}
              />
              {stepErrors.deliveryLocation && (
                <p className="text-sm text-red-500">{stepErrors.deliveryLocation}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-base">Pickup Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.pickupDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.pickupDate ? (
                      format(formData.pickupDate, "PPP")
                    ) : (
                      <span>Select date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.pickupDate || undefined}
                    onSelect={(date) => updateFormData({ pickupDate: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label className="text-base">Delivery Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.deliveryDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.deliveryDate ? (
                      format(formData.deliveryDate, "PPP")
                    ) : (
                      <span>Select date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.deliveryDate || undefined}
                    onSelect={(date) => updateFormData({ deliveryDate: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialHandling" className="text-base">Special Handling Requirements</Label>
            <Textarea
              id="specialHandling"
              rows={3}
              placeholder="Any special handling instructions"
              value={formData.specialHandling || ""}
              onChange={(e) => updateFormData({ specialHandling: e.target.value })}
            />
          </div>
        </div>
      )}

      <div className="flex justify-between pt-6">
        <Button 
          variant="outline" 
          onClick={onPrevious}
        >
          Previous
        </Button>
        <Button onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default DetailsStep;
