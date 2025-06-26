
import React, { useState } from "react";
import { BaseModal } from "@/components/shared/modals/BaseModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useStakeholder } from "@/contexts/StakeholderContext";
import { toast } from "sonner";

interface AddExpertModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddExpertModal = ({ isOpen, onClose }: AddExpertModalProps) => {
  const { addStakeholderProfile } = useStakeholder();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    description: "",
    specializations: [] as string[],
    certifications: [] as string[]
  });
  const [specializationInput, setSpecializationInput] = useState("");
  const [certificationInput, setCertificationInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addSpecialization = () => {
    if (specializationInput.trim() && !formData.specializations.includes(specializationInput.trim())) {
      setFormData(prev => ({
        ...prev,
        specializations: [...prev.specializations, specializationInput.trim()]
      }));
      setSpecializationInput("");
    }
  };

  const removeSpecialization = (spec: string) => {
    setFormData(prev => ({
      ...prev,
      specializations: prev.specializations.filter(s => s !== spec)
    }));
  };

  const addCertification = () => {
    if (certificationInput.trim() && !formData.certifications.includes(certificationInput.trim())) {
      setFormData(prev => ({
        ...prev,
        certifications: [...prev.certifications, certificationInput.trim()]
      }));
      setCertificationInput("");
    }
  };

  const removeCertification = (cert: string) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(c => c !== cert)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.location) {
        toast.error("Please fill in all required fields");
        return;
      }

      // Add the expert to stakeholder profiles
      addStakeholderProfile({
        name: formData.name,
        type: 'expert',
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        rating: 0, // New expert starts with 0 rating
        completedProjects: 0,
        specializations: formData.specializations,
        certifications: formData.certifications,
        description: formData.description,
        established: new Date().getFullYear().toString(),
        teamSize: '1'
      });

      toast.success("Expert added successfully!");
      
      // Reset form and close modal
      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "",
        description: "",
        specializations: [],
        certifications: []
      });
      onClose();
    } catch (error) {
      toast.error("Failed to add expert. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      action();
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Expert Professional"
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter expert's full name"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="expert@example.com"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="+1-555-0123"
            />
          </div>
          
          <div>
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              placeholder="City, State"
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="description">Professional Summary</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Brief description of the expert's background and expertise"
            rows={3}
          />
        </div>

        <div>
          <Label>Specializations</Label>
          <div className="flex gap-2 mb-2">
            <Input
              value={specializationInput}
              onChange={(e) => setSpecializationInput(e.target.value)}
              placeholder="Add specialization"
              onKeyPress={(e) => handleKeyPress(e, addSpecialization)}
            />
            <Button type="button" onClick={addSpecialization} variant="outline">
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.specializations.map((spec, index) => (
              <Badge key={index} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                {spec}
                <X 
                  className="h-3 w-3 ml-1 cursor-pointer" 
                  onClick={() => removeSpecialization(spec)}
                />
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <Label>Certifications</Label>
          <div className="flex gap-2 mb-2">
            <Input
              value={certificationInput}
              onChange={(e) => setCertificationInput(e.target.value)}
              placeholder="Add certification"
              onKeyPress={(e) => handleKeyPress(e, addCertification)}
            />
            <Button type="button" onClick={addCertification} variant="outline">
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.certifications.map((cert, index) => (
              <Badge key={index} variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                {cert}
                <X 
                  className="h-3 w-3 ml-1 cursor-pointer" 
                  onClick={() => removeCertification(cert)}
                />
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isSubmitting ? "Adding Expert..." : "Add Expert"}
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </div>
      </form>
    </BaseModal>
  );
};
