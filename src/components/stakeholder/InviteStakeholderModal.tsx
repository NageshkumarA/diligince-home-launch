
import React, { useState } from 'react';
import { BaseModal } from '@/components/shared/modals/BaseModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Mail, Building, User, Shield } from 'lucide-react';
import { useStakeholder } from '@/contexts/StakeholderContext';
import { toast } from 'sonner';

interface InviteStakeholderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InviteStakeholderModal = ({ isOpen, onClose }: InviteStakeholderModalProps) => {
  const { sendInvitation } = useStakeholder();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: '' as 'vendor' | 'expert' | '',
    subType: '',
    message: ''
  });

  const stakeholderTypes = [
    { value: 'vendor', label: 'Vendor', icon: <Building className="h-4 w-4" /> },
    { value: 'expert', label: 'Expert Professional', icon: <User className="h-4 w-4" /> }
  ];

  const vendorSubTypes = [
    { value: 'product_vendor', label: 'Product Vendor' },
    { value: 'service_vendor', label: 'Service Vendor' },
    { value: 'logistics_vendor', label: 'Logistics Vendor' }
  ];

  const expertSubTypes = [
    { value: 'engineering', label: 'Engineering Consultant' },
    { value: 'quality', label: 'Quality Assurance Expert' },
    { value: 'compliance', label: 'Compliance Specialist' },
    { value: 'project_management', label: 'Project Management Expert' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      ...(field === 'type' ? { subType: '' } : {}) // Reset subType when type changes
    }));
  };

  const generateInvitationToken = () => {
    return `inv_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.type) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const invitationToken = generateInvitationToken();
      const finalType = formData.subType || formData.type;
      
      // Create invitation record
      await sendInvitation({
        stakeholderId: `temp_${Date.now()}`,
        email: formData.email,
        name: formData.name,
        type: formData.type,
        invitedBy: 'current_user', // In real app, this would be from auth context
        invitationToken
      });

      // Generate secure invitation URL
      const invitationUrl = `${window.location.origin}/stakeholder-onboarding?token=${invitationToken}&email=${encodeURIComponent(formData.email)}&name=${encodeURIComponent(formData.name)}&type=${finalType}`;
      
      // In a real application, this would send an actual email
      console.log('Invitation URL:', invitationUrl);
      console.log('Invitation details:', {
        to: formData.email,
        name: formData.name,
        type: finalType,
        message: formData.message,
        url: invitationUrl
      });

      toast.success(`Invitation sent successfully to ${formData.name}!`, {
        description: `An email invitation has been sent to ${formData.email} with secure onboarding instructions.`
      });

      // Reset form and close modal
      setFormData({
        name: '',
        email: '',
        type: '' as 'vendor' | 'expert' | '',
        subType: '',
        message: ''
      });
      onClose();

    } catch (error) {
      console.error('Error sending invitation:', error);
      toast.error('Failed to send invitation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSubTypeOptions = () => {
    if (formData.type === 'vendor') return vendorSubTypes;
    if (formData.type === 'expert') return expertSubTypes;
    return [];
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Invite New Stakeholder"
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6">
        {/* ISO Compliance Notice */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-900 mb-1">ISO 9001 Compliant Process</h4>
              <p className="text-sm text-blue-800">
                This invitation follows ISO 9001 standards for supplier qualification and onboarding. 
                The stakeholder will go through pre-qualification assessment before being approved for project assignments.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Stakeholder Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter company or individual name"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="contact@company.com"
                required
              />
            </div>
          </div>

          {/* Stakeholder Type */}
          <div>
            <Label htmlFor="type">Stakeholder Type *</Label>
            <Select onValueChange={(value) => handleInputChange('type', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select stakeholder type" />
              </SelectTrigger>
              <SelectContent>
                {stakeholderTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex items-center gap-2">
                      {type.icon}
                      {type.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sub-type Selection */}
          {formData.type && (
            <div>
              <Label htmlFor="subType">Specialization</Label>
              <Select onValueChange={(value) => handleInputChange('subType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder={`Select ${formData.type} specialization`} />
                </SelectTrigger>
                <SelectContent>
                  {getSubTypeOptions().map((subType) => (
                    <SelectItem key={subType.value} value={subType.value}>
                      {subType.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Personal Message */}
          <div>
            <Label htmlFor="message">Personal Message (Optional)</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              placeholder="Add a personal message to include in the invitation..."
              className="min-h-[100px]"
            />
          </div>

          {/* Preview */}
          {formData.name && formData.email && formData.type && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Invitation Preview</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">To: {formData.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Inviting: {formData.name}</span>
                  <Badge variant="outline" className="ml-2">
                    {formData.subType ? 
                      getSubTypeOptions().find(st => st.value === formData.subType)?.label :
                      stakeholderTypes.find(st => st.value === formData.type)?.label
                    }
                  </Badge>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !formData.name || !formData.email || !formData.type}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? 'Sending Invitation...' : 'Send Invitation'}
            </Button>
          </div>
        </form>
      </div>
    </BaseModal>
  );
};
