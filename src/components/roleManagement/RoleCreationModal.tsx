import React, { useState } from "react";
import { FormModal } from "@/components/shared/modals/FormModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PermissionMatrix } from "./PermissionMatrix";
import { getMockModules, mockRoleTemplates } from "@/data/mockRoles";
import { CreateRoleFormData, UserType, Permission } from "@/types/roleManagement";
import { useToast } from "@/hooks/use-toast";

interface RoleCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  userType: UserType;
}

export const RoleCreationModal = ({ isOpen, onClose, userType }: RoleCreationModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<CreateRoleFormData>({
    name: '',
    description: '',
    userType: userType,
    permissions: [],
    templateId: undefined
  });
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableTemplates = mockRoleTemplates.filter(template => 
    userType === 'IndustryAdmin' || template.userType === userType
  );

  const availableModules = getMockModules(formData.userType);
  console.log("RoleCreationModal - Available modules:", availableModules);

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    if (templateId) {
      const template = availableTemplates.find(t => t.id === templateId);
      if (template) {
        setFormData(prev => ({
          ...prev,
          name: template.name,
          description: template.description,
          userType: template.userType,
          permissions: [...template.permissions],
          templateId: templateId
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        name: '',
        description: '',
        permissions: [],
        templateId: undefined
      }));
    }
  };

  const handlePermissionChange = (permissions: Permission[]) => {
    setFormData(prev => ({
      ...prev,
      permissions
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Role Created",
        description: `Role "${formData.name}" has been created successfully.`,
      });
      
      // Reset form data
      setFormData({
        name: '',
        description: '',
        userType: userType,
        permissions: [],
        templateId: undefined
      });
      setSelectedTemplate('');
      
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create role. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    console.log("RoleCreationModal not rendering - isOpen is false");
    return null;
  }

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Role"
      onSubmit={handleSubmit}
      submitText="Create Role"
      isSubmitting={isSubmitting}
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6">
        {/* Template Selection */}
        <div className="space-y-2">
          <Label htmlFor="template">Start from Template (Optional)</Label>
          <Select value={selectedTemplate} onValueChange={handleTemplateSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Select a template or start from scratch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Start from scratch</SelectItem>
              {availableTemplates.map(template => (
                <SelectItem key={template.id} value={template.id}>
                  {template.name} - {template.description}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Role Name *</Label>
            <Input
              id="name"
              placeholder="Enter role name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="userType">User Type *</Label>
            <Select
              value={formData.userType}
              onValueChange={(value: UserType) => setFormData(prev => ({ ...prev, userType: value }))}
              disabled={userType !== 'IndustryAdmin'}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {userType === 'IndustryAdmin' ? (
                  <>
                    <SelectItem value="IndustryAdmin">Industry Admin</SelectItem>
                    <SelectItem value="ServiceVendor">Service Vendor</SelectItem>
                    <SelectItem value="ProductVendor">Product Vendor</SelectItem>
                    <SelectItem value="LogisticsVendor">Logistics Vendor</SelectItem>
                  </>
                ) : (
                  <SelectItem value={userType}>{userType}</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            placeholder="Describe the role and its responsibilities"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            required
            rows={3}
          />
        </div>

        {/* Permission Matrix */}
        <div className="space-y-2">
          <Label>Permissions</Label>
          <div className="border rounded-lg p-4 bg-muted/50">
            <PermissionMatrix
              modules={availableModules}
              selectedPermissions={formData.permissions}
              onPermissionChange={handlePermissionChange}
            />
          </div>
        </div>

        {/* Summary */}
        <div className="bg-muted/30 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Role Summary</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Name:</span> {formData.name || 'Not set'}
            </div>
            <div>
              <span className="text-muted-foreground">User Type:</span> {formData.userType}
            </div>
            <div>
              <span className="text-muted-foreground">Modules:</span> {formData.permissions.length}
            </div>
            <div>
              <span className="text-muted-foreground">Total Permissions:</span>{' '}
              {formData.permissions.reduce((sum, p) => sum + p.actions.length, 0)}
            </div>
          </div>
        </div>
      </div>
    </FormModal>
  );
};