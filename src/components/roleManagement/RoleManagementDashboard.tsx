import React, { useState } from "react";
import { Plus, Search, Filter, Users, Shield, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { mockRoles, mockUserRoles, getMockModules } from "@/data/mockRoles";
import { Role, UserRole, RoleFilters } from "@/types/roleManagement";
import { canManageUserType } from "@/utils/moduleMapper";
import { RoleCreationModal } from "./RoleCreationModal";
import { UserRoleAssignment } from "./UserRoleAssignment";
import { RoleTemplates } from "./RoleTemplates";

interface RoleManagementDashboardProps {
  userType: 'IndustryAdmin' | 'ServiceVendor' | 'ProductVendor' | 'LogisticsVendor';
}

export const RoleManagementDashboard = ({ userType }: RoleManagementDashboardProps) => {
  const [roles] = useState<Role[]>(mockRoles);
  const [userRoles] = useState<UserRole[]>(mockUserRoles);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [showTemplatesModal, setShowTemplatesModal] = useState(false);
  const [filters, setFilters] = useState<RoleFilters>({
    search: '',
    userType: 'all',
    status: 'all'
  });

  const filteredRoles = roles.filter(role => {
    const matchesSearch = role.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                         role.description.toLowerCase().includes(filters.search.toLowerCase());
    const matchesUserType = filters.userType === 'all' || role.userType === filters.userType;
    const canViewRole = canManageUserType(userType, role.userType);
    
    return matchesSearch && matchesUserType && canViewRole;
  });

  const roleStats = {
    totalRoles: filteredRoles.length,
    systemRoles: filteredRoles.filter(r => r.isSystemRole).length,
    customRoles: filteredRoles.filter(r => !r.isSystemRole).length,
    assignedUsers: userRoles.filter(ur => ur.status === 'active').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Role Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage user roles and permissions across your organization
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowTemplatesModal(true)}>
            <Settings className="w-4 h-4 mr-2" />
            Templates
          </Button>
          <Button variant="outline" onClick={() => setShowAssignmentModal(true)}>
            <Users className="w-4 h-4 mr-2" />
            Assign Roles
          </Button>
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Role
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Roles</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{roleStats.totalRoles}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Roles</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{roleStats.systemRoles}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Custom Roles</CardTitle>
            <Plus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{roleStats.customRoles}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assigned Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{roleStats.assignedUsers}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search roles..."
                  className="pl-8"
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                />
              </div>
            </div>
            {userType === 'IndustryAdmin' && (
              <select
                className="px-3 py-2 border rounded-md bg-background"
                value={filters.userType}
                onChange={(e) => setFilters(prev => ({ 
                  ...prev, 
                  userType: e.target.value as any 
                }))}
              >
                <option value="all">All User Types</option>
                <option value="IndustryAdmin">Industry Admin</option>
                <option value="ServiceVendor">Service Vendor</option>
                <option value="ProductVendor">Product Vendor</option>
                <option value="LogisticsVendor">Logistics Vendor</option>
              </select>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Roles Table */}
      <Card>
        <CardHeader>
          <CardTitle>Roles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredRoles.map((role) => (
              <div key={role.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{role.name}</h3>
                    <Badge variant={role.isSystemRole ? "secondary" : "default"}>
                      {role.isSystemRole ? "System" : "Custom"}
                    </Badge>
                    <Badge variant="outline">{role.userType}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{role.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {role.permissions.length} permissions • Created {new Date(role.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    View Permissions ({role.permissions.length})
                  </Button>
                  {!role.isSystemRole && (
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      {showCreateModal && (
        <RoleCreationModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          userType={userType}
        />
      )}
      
      {showAssignmentModal && (
        <UserRoleAssignment
          isOpen={showAssignmentModal}
          onClose={() => setShowAssignmentModal(false)}
          userType={userType}
        />
      )}
      
      {showTemplatesModal && (
        <RoleTemplates
          isOpen={showTemplatesModal}
          onClose={() => setShowTemplatesModal(false)}
          userType={userType}
        />
      )}
    </div>
  );
};