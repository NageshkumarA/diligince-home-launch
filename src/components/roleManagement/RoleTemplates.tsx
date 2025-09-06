import React, { useState } from "react";
import { BaseModal } from "@/components/shared/modals/BaseModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Settings, Shield, User, CheckCircle } from "lucide-react";
import { mockRoleTemplates } from "@/data/mockRoles";
import { UserType, RoleTemplate } from "@/types/roleManagement";
import { useToast } from "@/hooks/use-toast";

interface RoleTemplatesProps {
  isOpen: boolean;
  onClose: () => void;
  userType: UserType;
  onSelectTemplate?: (template: RoleTemplate) => void;
}

export const RoleTemplates = ({ 
  isOpen, 
  onClose, 
  userType,
  onSelectTemplate 
}: RoleTemplatesProps) => {
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const availableTemplates = mockRoleTemplates.filter(template => 
    userType === 'IndustryAdmin' || template.userType === userType
  );

  const templatesByType = {
    IndustryAdmin: availableTemplates.filter(t => t.userType === 'IndustryAdmin'),
    ServiceVendor: availableTemplates.filter(t => t.userType === 'ServiceVendor'),
    ProductVendor: availableTemplates.filter(t => t.userType === 'ProductVendor'),
    LogisticsVendor: availableTemplates.filter(t => t.userType === 'LogisticsVendor')
  };

  const handleUseTemplate = (template: RoleTemplate) => {
    if (onSelectTemplate) {
      onSelectTemplate(template);
      onClose();
    } else {
      toast({
        title: "Template Selected",
        description: `"${template.name}" template is ready to use for creating a new role.`,
      });
    }
  };

  const handleCloneTemplate = (template: RoleTemplate) => {
    toast({
      title: "Template Cloned",
      description: `Created a copy of "${template.name}" template for customization.`,
    });
  };

  const getUserTypeIcon = (type: UserType) => {
    const icons = {
      IndustryAdmin: Settings,
      ServiceVendor: User,
      ProductVendor: Shield,
      LogisticsVendor: User
    };
    const Icon = icons[type];
    return <Icon className="w-4 h-4" />;
  };

  const getUserTypeColor = (type: UserType) => {
    const colors = {
      IndustryAdmin: 'bg-blue-100 text-blue-800 border-blue-200',
      ServiceVendor: 'bg-green-100 text-green-800 border-green-200',
      ProductVendor: 'bg-purple-100 text-purple-800 border-purple-200',
      LogisticsVendor: 'bg-orange-100 text-orange-800 border-orange-200'
    };
    return colors[type];
  };

  const renderTemplateCard = (template: RoleTemplate) => (
    <Card key={template.id} className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2 mb-2">
            {getUserTypeIcon(template.userType)}
            <CardTitle className="text-lg">{template.name}</CardTitle>
          </div>
          <div className="flex gap-1">
            <Badge 
              variant="outline" 
              className={getUserTypeColor(template.userType)}
            >
              {template.userType}
            </Badge>
            {template.isDefault && (
              <Badge variant="secondary">
                <CheckCircle className="w-3 h-3 mr-1" />
                Default
              </Badge>
            )}
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{template.description}</p>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Permissions Summary */}
          <div>
            <h4 className="text-sm font-medium mb-2">Permissions ({template.permissions.length} modules)</h4>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {template.permissions.map(permission => (
                <div key={permission.moduleId} className="flex items-center justify-between text-xs">
                  <span className="font-medium">{permission.moduleName}</span>
                  <div className="flex gap-1">
                    {permission.actions.slice(0, 3).map(action => (
                      <Badge key={action} variant="outline" className="text-xs px-1 py-0">
                        {action}
                      </Badge>
                    ))}
                    {permission.actions.length > 3 && (
                      <Badge variant="outline" className="text-xs px-1 py-0">
                        +{permission.actions.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2 border-t">
            <Button
              size="sm"
              onClick={() => handleUseTemplate(template)}
              className="flex-1"
            >
              Use Template
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleCloneTemplate(template)}
            >
              <Copy className="w-3 h-3 mr-1" />
              Clone
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Role Templates"
      maxWidth="max-w-6xl"
    >
      <div className="space-y-6">
        <div className="text-sm text-muted-foreground">
          Choose from pre-defined role templates or use them as a starting point for custom roles.
        </div>

        {userType === 'IndustryAdmin' ? (
          <Tabs defaultValue="IndustryAdmin" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="IndustryAdmin">Industry Admin</TabsTrigger>
              <TabsTrigger value="ServiceVendor">Service Vendor</TabsTrigger>
              <TabsTrigger value="ProductVendor">Product Vendor</TabsTrigger>
              <TabsTrigger value="LogisticsVendor">Logistics Vendor</TabsTrigger>
            </TabsList>

            {(Object.keys(templatesByType) as UserType[]).map(type => (
              <TabsContent key={type} value={type} className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {templatesByType[type].map(renderTemplateCard)}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableTemplates.map(renderTemplateCard)}
          </div>
        )}

        {availableTemplates.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Shield className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">No Templates Available</h3>
            <p>No role templates are available for your user type.</p>
          </div>
        )}

        <div className="flex justify-end pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};