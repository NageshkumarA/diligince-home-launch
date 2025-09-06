import React, { useState } from "react";
import { FormModal } from "@/components/shared/modals/FormModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Search, User, Mail } from "lucide-react";
import { mockRoles, mockUserRoles } from "@/data/mockRoles";
import { UserType } from "@/types/roleManagement";
import { useToast } from "@/hooks/use-toast";

interface UserRoleAssignmentProps {
  isOpen: boolean;
  onClose: () => void;
  userType: UserType;
}

interface MockUser {
  id: string;
  name: string;
  email: string;
  department: string;
  currentRole?: string;
  status: 'active' | 'inactive' | 'pending';
}

const mockUsers: MockUser[] = [
  {
    id: 'user-6',
    name: 'Alice Cooper',
    email: 'alice.cooper@company.com',
    department: 'Engineering',
    status: 'active'
  },
  {
    id: 'user-7',
    name: 'Bob Martinez',
    email: 'bob.martinez@company.com',
    department: 'Procurement',
    currentRole: 'Procurement Manager',
    status: 'active'
  },
  {
    id: 'user-8',
    name: 'Carol Davis',
    email: 'carol.davis@company.com',
    department: 'Finance',
    status: 'pending'
  },
  {
    id: 'user-9',
    name: 'Daniel Lee',
    email: 'daniel.lee@servicevendor.com',
    department: 'Operations',
    status: 'active'
  },
  {
    id: 'user-10',
    name: 'Emma Wilson',
    email: 'emma.wilson@productvendor.com',
    department: 'Sales',
    currentRole: 'Product Supplier',
    status: 'active'
  }
];

export const UserRoleAssignment = ({ isOpen, onClose, userType }: UserRoleAssignmentProps) => {
  const { toast } = useToast();
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableRoles = mockRoles.filter(role => 
    userType === 'IndustryAdmin' || role.userType === userType
  );

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleUser = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const selectAllUsers = () => {
    setSelectedUsers(filteredUsers.map(user => user.id));
  };

  const clearSelection = () => {
    setSelectedUsers([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUsers.length === 0 || !selectedRole) {
      toast({
        title: "Validation Error",
        description: "Please select at least one user and a role.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const selectedRoleName = availableRoles.find(r => r.id === selectedRole)?.name;
      
      toast({
        title: "Roles Assigned",
        description: `Successfully assigned "${selectedRoleName}" role to ${selectedUsers.length} user(s).`,
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to assign roles. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title="Assign Roles to Users"
      onSubmit={handleSubmit}
      submitText={`Assign Role to ${selectedUsers.length} User(s)`}
      isSubmitting={isSubmitting}
      maxWidth="max-w-3xl"
    >
      <div className="space-y-6">
        {/* Role Selection */}
        <div className="space-y-2">
          <Label htmlFor="role">Select Role *</Label>
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a role to assign" />
            </SelectTrigger>
            <SelectContent>
              {availableRoles.map(role => (
                <SelectItem key={role.id} value={role.id}>
                  <div className="flex items-center gap-2">
                    <span>{role.name}</span>
                    <Badge variant={role.isSystemRole ? "secondary" : "default"}>
                      {role.isSystemRole ? "System" : "Custom"}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* User Search */}
        <div className="space-y-2">
          <Label>Select Users</Label>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users by name, email, or department..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Bulk Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={selectAllUsers}
            className="text-sm text-primary hover:underline"
          >
            Select All ({filteredUsers.length})
          </button>
          <span className="text-muted-foreground">•</span>
          <button
            type="button"
            onClick={clearSelection}
            className="text-sm text-muted-foreground hover:underline"
          >
            Clear Selection
          </button>
          {selectedUsers.length > 0 && (
            <>
              <span className="text-muted-foreground">•</span>
              <span className="text-sm font-medium">
                {selectedUsers.length} selected
              </span>
            </>
          )}
        </div>

        {/* User List */}
        <div className="border rounded-lg max-h-80 overflow-y-auto">
          {filteredUsers.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <User className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No users found matching your search.</p>
            </div>
          ) : (
            <div className="space-y-0">
              {filteredUsers.map(user => (
                <label
                  key={user.id}
                  className="flex items-center p-4 hover:bg-muted/50 cursor-pointer border-b last:border-b-0"
                >
                  <Checkbox
                    checked={selectedUsers.includes(user.id)}
                    onCheckedChange={() => toggleUser(user.id)}
                    className="mr-3"
                  />
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{user.name}</span>
                        <Badge 
                          variant={user.status === 'active' ? 'default' : 'secondary'}
                        >
                          {user.status}
                        </Badge>
                        {user.currentRole && (
                          <Badge variant="outline">{user.currentRole}</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {user.email}
                        </div>
                        <span>•</span>
                        <span>{user.department}</span>
                      </div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Assignment Summary */}
        {selectedUsers.length > 0 && selectedRole && (
          <div className="bg-muted/30 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Assignment Summary</h4>
            <div className="text-sm space-y-1">
              <div>
                <span className="text-muted-foreground">Role:</span>{' '}
                <span className="font-medium">
                  {availableRoles.find(r => r.id === selectedRole)?.name}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Users to assign:</span>{' '}
                <span className="font-medium">{selectedUsers.length}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                Selected users will receive the specified role and its associated permissions.
                Any existing roles will be replaced.
              </div>
            </div>
          </div>
        )}
      </div>
    </FormModal>
  );
};