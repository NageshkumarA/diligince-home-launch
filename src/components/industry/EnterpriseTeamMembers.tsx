import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { 
  Search, 
  Plus, 
  Edit, 
  Trash, 
  Mail, 
  Phone, 
  Download, 
  Upload,
  Users,
  Filter,
  MoreHorizontal,
  UserCheck,
  UserX,
  Eye,
  Network
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { 
  TeamMember, 
  IndustrialRole, 
  Department, 
  MemberStatus, 
  TeamMemberFilters,
  RoleTemplate 
} from "@/types/teamMember";

// Role templates with predefined permissions
const roleTemplates: RoleTemplate[] = [
  {
    role: 'CEO',
    level: 1,
    description: 'Chief Executive Officer - Full system access',
    permissions: [
      { module: 'Dashboard', actions: ['create', 'read', 'update', 'delete', 'approve'], dataScope: 'company' },
      { module: 'Requirements', actions: ['create', 'read', 'update', 'delete', 'approve'], dataScope: 'company' },
      { module: 'Documents', actions: ['create', 'read', 'update', 'delete', 'approve'], dataScope: 'company' },
      { module: 'Payment Settings', actions: ['create', 'read', 'update', 'delete', 'approve'], dataScope: 'company' },
      { module: 'Team Management', actions: ['create', 'read', 'update', 'delete', 'approve'], dataScope: 'company' },
    ]
  },
  {
    role: 'GM',
    level: 2,
    description: 'General Manager - Senior management access',
    permissions: [
      { module: 'Dashboard', actions: ['read', 'update', 'approve'], dataScope: 'company' },
      { module: 'Requirements', actions: ['create', 'read', 'update', 'approve'], dataScope: 'company' },
      { module: 'Documents', actions: ['read', 'update', 'approve'], dataScope: 'company' },
      { module: 'Payment Settings', actions: ['read', 'approve'], dataScope: 'company' },
    ]
  },
  {
    role: 'DGM',
    level: 3,
    description: 'Deputy General Manager - Department leadership',
    permissions: [
      { module: 'Dashboard', actions: ['read', 'update'], dataScope: 'department' },
      { module: 'Requirements', actions: ['create', 'read', 'update'], dataScope: 'department' },
      { module: 'Documents', actions: ['create', 'read', 'update'], dataScope: 'department' },
    ]
  },
  {
    role: 'AGM',
    level: 4,
    description: 'Assistant General Manager - Senior operational role',
    permissions: [
      { module: 'Dashboard', actions: ['read', 'update'], dataScope: 'department' },
      { module: 'Requirements', actions: ['create', 'read', 'update'], dataScope: 'department' },
      { module: 'Documents', actions: ['read', 'update'], dataScope: 'department' },
    ]
  },
  {
    role: 'Procurement Head',
    level: 5,
    description: 'Head of Procurement - Procurement oversight',
    permissions: [
      { module: 'Dashboard', actions: ['read'], dataScope: 'department' },
      { module: 'Requirements', actions: ['create', 'read', 'update', 'approve'], dataScope: 'department' },
      { module: 'Vendors', actions: ['create', 'read', 'update'], dataScope: 'department' },
    ]
  },
  {
    role: 'Finance Head',
    level: 5,
    description: 'Head of Finance - Financial oversight',
    permissions: [
      { module: 'Dashboard', actions: ['read'], dataScope: 'department' },
      { module: 'Payment Settings', actions: ['create', 'read', 'update', 'approve'], dataScope: 'company' },
      { module: 'Documents', actions: ['read', 'approve'], dataScope: 'company' },
    ]
  },
  {
    role: 'Manager',
    level: 6,
    description: 'Department Manager - Team leadership',
    permissions: [
      { module: 'Dashboard', actions: ['read'], dataScope: 'department' },
      { module: 'Requirements', actions: ['create', 'read', 'update'], dataScope: 'department' },
      { module: 'Documents', actions: ['create', 'read'], dataScope: 'department' },
    ]
  },
  {
    role: 'Engineer',
    level: 7,
    description: 'Engineer - Technical execution',
    permissions: [
      { module: 'Dashboard', actions: ['read'], dataScope: 'own' },
      { module: 'Requirements', actions: ['create', 'read'], dataScope: 'own' },
      { module: 'Documents', actions: ['create', 'read'], dataScope: 'own' },
    ]
  },
];

// Mock team members data
const initialTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@steelplant.com',
    phone: '+91 9876543210',
    role: 'CEO',
    department: 'Management',
    status: 'active',
    joinDate: '2020-01-15',
    permissions: roleTemplates.find(r => r.role === 'CEO')?.permissions || [],
    lastLogin: '2024-01-15 09:30',
    invitationStatus: 'accepted'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    email: 'priya.sharma@steelplant.com',
    phone: '+91 9876543211',
    role: 'GM',
    department: 'Operations',
    status: 'active',
    joinDate: '2020-03-01',
    managerId: '1',
    permissions: roleTemplates.find(r => r.role === 'GM')?.permissions || [],
    lastLogin: '2024-01-15 08:45',
    invitationStatus: 'accepted'
  },
  {
    id: '3',
    name: 'Amit Patel',
    email: 'amit.patel@steelplant.com',
    phone: '+91 9876543212',
    role: 'Procurement Head',
    department: 'Procurement',
    status: 'active',
    joinDate: '2021-06-15',
    managerId: '2',
    permissions: roleTemplates.find(r => r.role === 'Procurement Head')?.permissions || [],
    lastLogin: '2024-01-14 17:20',
    invitationStatus: 'accepted'
  },
  {
    id: '4',
    name: 'Neha Gupta',
    email: 'neha.gupta@steelplant.com',
    phone: '+91 9876543213',
    role: 'Finance Head',
    department: 'Finance',
    status: 'active',
    joinDate: '2021-08-01',
    managerId: '2',
    permissions: roleTemplates.find(r => r.role === 'Finance Head')?.permissions || [],
    lastLogin: '2024-01-15 10:15',
    invitationStatus: 'accepted'
  },
  {
    id: '5',
    name: 'Sanjay Singh',
    email: 'sanjay.singh@steelplant.com',
    phone: '+91 9876543214',
    role: 'Manager',
    department: 'Engineering',
    status: 'active',
    joinDate: '2022-01-10',
    managerId: '2',
    permissions: roleTemplates.find(r => r.role === 'Manager')?.permissions || [],
    lastLogin: '2024-01-14 16:30',
    invitationStatus: 'accepted'
  },
  {
    id: '6',
    name: 'Kavita Reddy',
    email: 'kavita.reddy@steelplant.com',
    phone: '+91 9876543215',
    role: 'Engineer',
    department: 'Engineering',
    status: 'pending',
    joinDate: '2024-01-10',
    managerId: '5',
    permissions: roleTemplates.find(r => r.role === 'Engineer')?.permissions || [],
    invitationStatus: 'sent'
  }
];

const teamMemberSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  role: z.string().min(1, "Role is required"),
  department: z.string().min(1, "Department is required"),
  managerId: z.string().optional(),
});

type TeamMemberFormData = z.infer<typeof teamMemberSchema>;

const EnterpriseTeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers);
  const [filters, setFilters] = useState<TeamMemberFilters>({
    search: '',
    role: 'all',
    department: 'all',
    status: 'all'
  });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [showOrgChart, setShowOrgChart] = useState(false);

  const form = useForm<TeamMemberFormData>({
    resolver: zodResolver(teamMemberSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role: "",
      department: "",
      managerId: "",
    },
  });

  // Filter and search logic
  const filteredTeamMembers = useMemo(() => {
    return teamMembers.filter(member => {
      const matchesSearch = 
        member.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        member.email.toLowerCase().includes(filters.search.toLowerCase()) ||
        member.role.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesRole = filters.role === 'all' || member.role === filters.role;
      const matchesDepartment = filters.department === 'all' || member.department === filters.department;
      const matchesStatus = filters.status === 'all' || member.status === filters.status;

      return matchesSearch && matchesRole && matchesDepartment && matchesStatus;
    });
  }, [teamMembers, filters]);

  const getStatusBadge = (status: MemberStatus) => {
    const variants = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-red-100 text-red-800",
      pending: "bg-yellow-100 text-yellow-800"
    };
    return <Badge className={variants[status]}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
  };

  const getRoleBadge = (role: IndustrialRole) => {
    const template = roleTemplates.find(t => t.role === role);
    const level = template?.level || 7;
    const colors = {
      1: "bg-purple-100 text-purple-800", // CEO
      2: "bg-blue-100 text-blue-800",     // GM
      3: "bg-indigo-100 text-indigo-800", // DGM
      4: "bg-cyan-100 text-cyan-800",     // AGM
      5: "bg-teal-100 text-teal-800",     // Heads
      6: "bg-green-100 text-green-800",   // Manager
      7: "bg-gray-100 text-gray-800"      // Engineer
    };
    return <Badge className={colors[level as keyof typeof colors]}>{role}</Badge>;
  };

  const handleAddMember = (data: TeamMemberFormData) => {
    const roleTemplate = roleTemplates.find(r => r.role === data.role as IndustrialRole);
    const newMember: TeamMember = {
      id: `${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role as IndustrialRole,
      department: data.department as Department,
      status: 'pending',
      joinDate: new Date().toISOString().split('T')[0],
      managerId: data.managerId === 'no-manager' ? undefined : data.managerId,
      permissions: roleTemplate?.permissions || [],
      invitationStatus: 'sent'
    };

    setTeamMembers([...teamMembers, newMember]);
    setIsAddDialogOpen(false);
    form.reset();
    toast.success("Team member added successfully! Invitation sent.");
  };

  const handleEditMember = (data: TeamMemberFormData) => {
    if (!selectedMember) return;

    const roleTemplate = roleTemplates.find(r => r.role === data.role as IndustrialRole);
    const updatedMember: TeamMember = {
      ...selectedMember,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role as IndustrialRole,
      department: data.department as Department,
      managerId: data.managerId === 'no-manager' ? undefined : data.managerId,
      permissions: roleTemplate?.permissions || selectedMember.permissions
    };

    setTeamMembers(teamMembers.map(m => m.id === selectedMember.id ? updatedMember : m));
    setIsEditDialogOpen(false);
    setSelectedMember(null);
    form.reset();
    toast.success("Team member updated successfully!");
  };

  const handleDeleteMember = (member: TeamMember) => {
    if (confirm(`Are you sure you want to remove ${member.name} from the team?`)) {
      setTeamMembers(teamMembers.filter(m => m.id !== member.id));
      toast.success("Team member removed successfully!");
    }
  };

  const handleStatusChange = (member: TeamMember, newStatus: MemberStatus) => {
    const updatedMember = { ...member, status: newStatus };
    setTeamMembers(teamMembers.map(m => m.id === member.id ? updatedMember : m));
    toast.success(`Member status updated to ${newStatus}`);
  };

  const exportTeamData = () => {
    const csvContent = [
      ['Name', 'Email', 'Phone', 'Role', 'Department', 'Status', 'Join Date'].join(','),
      ...filteredTeamMembers.map(member => 
        [member.name, member.email, member.phone, member.role, member.department, member.status, member.joinDate].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'team-members.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success("Team data exported successfully!");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-2xl font-bold text-gray-800">Team Members</CardTitle>
              <CardDescription>
                Manage your enterprise team with role-based access control and organizational hierarchy
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowOrgChart(!showOrgChart)}
                className="flex items-center gap-2"
              >
                <Network className="h-4 w-4" />
                {showOrgChart ? 'Table View' : 'Org Chart'}
              </Button>
              <Button 
                variant="outline" 
                onClick={exportTeamData}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button 
                onClick={() => setIsAddDialogOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Member
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search members..."
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
                className="pl-10"
              />
            </div>
            
            <Select value={filters.role} onValueChange={(value) => setFilters({...filters, role: value as any})}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {roleTemplates.map(template => (
                  <SelectItem key={template.role} value={template.role}>
                    {template.role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filters.department} onValueChange={(value) => setFilters({...filters, department: value as any})}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Management">Management</SelectItem>
                <SelectItem value="Operations">Operations</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Procurement">Procurement</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
                <SelectItem value="Quality">Quality</SelectItem>
                <SelectItem value="Safety">Safety</SelectItem>
                <SelectItem value="HR">HR</SelectItem>
                <SelectItem value="IT">IT</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.status} onValueChange={(value) => setFilters({...filters, status: value as any})}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Team Statistics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{teamMembers.length}</div>
              <div className="text-sm text-blue-600">Total Members</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {teamMembers.filter(m => m.status === 'active').length}
              </div>
              <div className="text-sm text-green-600">Active</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {teamMembers.filter(m => m.status === 'pending').length}
              </div>
              <div className="text-sm text-yellow-600">Pending</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {new Set(teamMembers.map(m => m.department)).size}
              </div>
              <div className="text-sm text-purple-600">Departments</div>
            </div>
          </div>

          {/* Team Members Table */}
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Role & Department</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeamMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-blue-100 text-blue-600">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-gray-500">{member.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {getRoleBadge(member.role)}
                        <div className="text-sm text-gray-600">{member.department}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Mail className="h-3 w-3" />
                          {member.email}
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Phone className="h-3 w-3" />
                          {member.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(member.status)}</TableCell>
                    <TableCell className="text-sm">{member.joinDate}</TableCell>
                    <TableCell className="text-sm">{member.lastLogin || 'Never'}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedMember(member);
                            setIsViewDialogOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedMember(member);
                            form.reset({
                              name: member.name,
                              email: member.email,
                              phone: member.phone,
                              role: member.role,
                              department: member.department,
                              managerId: member.managerId || 'no-manager'
                            });
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        {member.status === 'active' ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleStatusChange(member, 'inactive')}
                          >
                            <UserX className="h-4 w-4 text-red-500" />
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleStatusChange(member, 'active')}
                          >
                            <UserCheck className="h-4 w-4 text-green-500" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteMember(member)}
                        >
                          <Trash className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredTeamMembers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No team members found matching your filters.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Member Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Team Member</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddMember)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Management">Management</SelectItem>
                          <SelectItem value="Operations">Operations</SelectItem>
                          <SelectItem value="Engineering">Engineering</SelectItem>
                          <SelectItem value="Procurement">Procurement</SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                          <SelectItem value="Quality">Quality</SelectItem>
                          <SelectItem value="Safety">Safety</SelectItem>
                          <SelectItem value="HR">HR</SelectItem>
                          <SelectItem value="IT">IT</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {roleTemplates.map((template) => (
                            <SelectItem key={template.role} value={template.role}>
                              <div className="flex flex-col">
                                <span>{template.role}</span>
                                <span className="text-xs text-gray-500">{template.description}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="managerId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reports To (Optional)</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select manager" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="no-manager">No manager</SelectItem>
                          {teamMembers
                            .filter(m => m.status === 'active')
                            .map((manager) => (
                            <SelectItem key={manager.id} value={manager.id}>
                              {manager.name} ({manager.role})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Member & Send Invitation</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Edit Member Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Team Member</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleEditMember)} className="space-y-4">
              {/* Same form fields as Add Member Dialog */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Management">Management</SelectItem>
                          <SelectItem value="Operations">Operations</SelectItem>
                          <SelectItem value="Engineering">Engineering</SelectItem>
                          <SelectItem value="Procurement">Procurement</SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                          <SelectItem value="Quality">Quality</SelectItem>
                          <SelectItem value="Safety">Safety</SelectItem>
                          <SelectItem value="HR">HR</SelectItem>
                          <SelectItem value="IT">IT</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {roleTemplates.map((template) => (
                            <SelectItem key={template.role} value={template.role}>
                              <div className="flex flex-col">
                                <span>{template.role}</span>
                                <span className="text-xs text-gray-500">{template.description}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="managerId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reports To (Optional)</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select manager" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="no-manager">No manager</SelectItem>
                          {teamMembers
                            .filter(m => m.status === 'active' && m.id !== selectedMember?.id)
                            .map((manager) => (
                            <SelectItem key={manager.id} value={manager.id}>
                              {manager.name} ({manager.role})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Update Member</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* View Member Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Team Member Details</DialogTitle>
          </DialogHeader>
          {selectedMember && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-xl">
                    {selectedMember.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{selectedMember.name}</h3>
                  <p className="text-gray-600">{selectedMember.email}</p>
                  {getStatusBadge(selectedMember.status)}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Role</label>
                  <div className="mt-1">{getRoleBadge(selectedMember.role)}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Department</label>
                  <p className="mt-1">{selectedMember.department}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Phone</label>
                  <p className="mt-1">{selectedMember.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Join Date</label>
                  <p className="mt-1">{selectedMember.joinDate}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Permissions</label>
                <div className="mt-2 space-y-2">
                  {selectedMember.permissions.map((permission, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-md">
                      <div className="font-medium">{permission.module}</div>
                      <div className="text-sm text-gray-600">
                        Actions: {permission.actions.join(', ')} | 
                        Scope: {permission.dataScope}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EnterpriseTeamMembers;
