
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PlusCircle, Search, Filter, Download, Upload, MoreHorizontal, Eye, Edit, Trash, Users, UserCheck, UserX, Mail, Phone, MapPin, Calendar, Award, Briefcase } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";

// Enhanced team member schema
const teamMemberSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  role: z.string().min(1, { message: "Role is required" }),
  department: z.string().min(1, { message: "Department is required" }),
  specialization: z.string().min(1, { message: "Specialization is required" }),
  experience: z.string().min(1, { message: "Experience is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: "Phone must be at least 10 digits" }),
  location: z.string().min(1, { message: "Location is required" }),
  skills: z.string().min(1, { message: "Skills are required" }),
  certifications: z.string().optional(),
  hourlyRate: z.string().min(1, { message: "Hourly rate is required" }),
  availability: z.string().min(1, { message: "Availability is required" }),
  notes: z.string().optional(),
});

type TeamMember = z.infer<typeof teamMemberSchema> & {
  status: 'active' | 'inactive' | 'on-project' | 'on-leave';
  joinDate: string;
  lastLogin?: string;
  projectsCompleted: number;
  currentProject?: string;
  performance: number;
};

// Enhanced mock data
const initialTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Raj Mehta",
    role: "Senior Service Engineer",
    department: "Field Services",
    specialization: "Robotics & Automation",
    experience: "8+ years",
    email: "raj.mehta@techserve.com",
    phone: "+91 9876543210",
    location: "Mumbai, India",
    skills: "PLC Programming, SCADA, HMI Design, Robotics",
    certifications: "Siemens Certified, Rockwell Certified",
    hourlyRate: "₹2,500",
    availability: "Available",
    status: "active",
    joinDate: "2020-01-15",
    lastLogin: "2024-01-15 09:30",
    projectsCompleted: 45,
    performance: 95,
    notes: "Top performer with excellent client feedback"
  },
  {
    id: "2",
    name: "Priya Shah",
    role: "Project Manager",
    department: "Project Management",
    specialization: "Process Optimization",
    experience: "12+ years",
    email: "priya.shah@techserve.com",
    phone: "+91 9876543211",
    location: "Pune, India",
    skills: "Project Management, Team Leadership, Client Relations",
    certifications: "PMP Certified, Agile Certified",
    hourlyRate: "₹3,500",
    availability: "Busy",
    status: "on-project",
    joinDate: "2018-03-01",
    lastLogin: "2024-01-15 08:45",
    projectsCompleted: 78,
    currentProject: "Industrial Automation Project - ABC Corp",
    performance: 92,
    notes: "Excellent leadership skills and client management"
  },
  {
    id: "3",
    name: "Ankit Patel",
    role: "Technical Consultant",
    department: "Engineering",
    specialization: "PLC Programming",
    experience: "6+ years",
    email: "ankit.patel@techserve.com",
    phone: "+91 9876543212",
    location: "Ahmedabad, India",
    skills: "PLC, SCADA, Electrical Design, Troubleshooting",
    certifications: "Allen Bradley Certified",
    hourlyRate: "₹2,200",
    availability: "Available",
    status: "active",
    joinDate: "2021-06-15",
    lastLogin: "2024-01-14 17:20",
    projectsCompleted: 32,
    performance: 88,
  },
  {
    id: "4",
    name: "Sneha Kumar",
    role: "Field Technician",
    department: "Field Services",
    specialization: "Instrumentation",
    experience: "4+ years",
    email: "sneha.kumar@techserve.com",
    phone: "+91 9876543213",
    location: "Bangalore, India",
    skills: "Instrumentation, Calibration, Maintenance",
    certifications: "Instrumentation Specialist",
    hourlyRate: "₹1,800",
    availability: "On Leave",
    status: "on-leave",
    joinDate: "2022-02-10",
    lastLogin: "2024-01-10 14:30",
    projectsCompleted: 28,
    performance: 85,
  },
  {
    id: "5",
    name: "Vikram Singh",
    role: "Business Development Manager",
    department: "Sales",
    specialization: "Client Relations",
    experience: "10+ years",
    email: "vikram.singh@techserve.com",
    phone: "+91 9876543214",
    location: "Delhi, India",
    skills: "Sales, Business Development, Client Management",
    certifications: "Sales Professional Certified",
    hourlyRate: "₹3,000",
    availability: "Available",
    status: "active",
    joinDate: "2019-08-20",
    lastLogin: "2024-01-15 11:15",
    projectsCompleted: 65,
    performance: 90,
  }
];

// Enhanced role and department options
const roleOptions = [
  "Senior Service Engineer",
  "Service Engineer",
  "Project Manager",
  "Technical Consultant",
  "Field Technician",
  "Business Development Manager",
  "Operations Manager",
  "Quality Assurance Specialist",
  "Safety Engineer",
  "Design Engineer",
  "Software Engineer"
];

const departmentOptions = [
  "Field Services",
  "Project Management", 
  "Engineering",
  "Sales",
  "Operations",
  "Quality Assurance",
  "Safety",
  "Administration"
];

const specializationOptions = [
  "Robotics & Automation",
  "Process Optimization",
  "PLC Programming",
  "SCADA Systems",
  "Instrumentation",
  "Client Relations",
  "Industrial IoT",
  "Mechanical Engineering",
  "Electrical Engineering",
  "Safety Systems",
  "Energy Management"
];

const experienceOptions = [
  "0-2 years",
  "2-5 years", 
  "5-8 years",
  "8-10 years",
  "10-15 years",
  "15+ years"
];

const availabilityOptions = [
  "Available",
  "Busy",
  "On Leave",
  "Part-time"
];

const TeamMembersSection = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('cards');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");

  const form = useForm<TeamMember>({
    resolver: zodResolver(teamMemberSchema),
    defaultValues: {
      name: "",
      role: "",
      department: "",
      specialization: "",
      experience: "",
      email: "",
      phone: "",
      location: "",
      skills: "",
      certifications: "",
      hourlyRate: "",
      availability: "",
      notes: "",
    },
  });

  // Filter and search logic
  const filteredTeamMembers = useMemo(() => {
    return teamMembers.filter(member => {
      const matchesSearch = 
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.skills.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRole = roleFilter === "all" || member.role === roleFilter;
      const matchesDepartment = departmentFilter === "all" || member.department === departmentFilter;
      const matchesStatus = statusFilter === "all" || member.status === statusFilter;
      const matchesAvailability = availabilityFilter === "all" || member.availability === availabilityFilter;

      return matchesSearch && matchesRole && matchesDepartment && matchesStatus && matchesAvailability;
    });
  }, [teamMembers, searchTerm, roleFilter, departmentFilter, statusFilter, availabilityFilter]);

  // Team statistics
  const teamStats = useMemo(() => {
    const total = teamMembers.length;
    const active = teamMembers.filter(m => m.status === 'active').length;
    const onProject = teamMembers.filter(m => m.status === 'on-project').length;
    const available = teamMembers.filter(m => m.availability === 'Available').length;
    const avgPerformance = Math.round(teamMembers.reduce((sum, m) => sum + m.performance, 0) / total);
    
    return { total, active, onProject, available, avgPerformance };
  }, [teamMembers]);

  const getStatusBadge = (status: string) => {
    const variants = {
      'active': 'bg-green-100 text-green-800',
      'inactive': 'bg-red-100 text-red-800', 
      'on-project': 'bg-blue-100 text-blue-800',
      'on-leave': 'bg-yellow-100 text-yellow-800'
    };
    return <Badge className={variants[status as keyof typeof variants]}>{status.replace('-', ' ')}</Badge>;
  };

  const getAvailabilityBadge = (availability: string) => {
    const variants = {
      'Available': 'bg-green-100 text-green-800',
      'Busy': 'bg-orange-100 text-orange-800',
      'On Leave': 'bg-red-100 text-red-800',
      'Part-time': 'bg-purple-100 text-purple-800'
    };
    return <Badge variant="outline" className={variants[availability as keyof typeof variants]}>{availability}</Badge>;
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return 'text-green-600';
    if (performance >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const openAddMemberDialog = () => {
    form.reset();
    setEditingMember(null);
    setIsDialogOpen(true);
  };

  const openEditMemberDialog = (member: TeamMember) => {
    form.reset(member);
    setEditingMember(member);
    setIsDialogOpen(true);
  };

  const openViewMemberDialog = (member: TeamMember) => {
    setSelectedMember(member);
    setIsViewDialogOpen(true);
  };

  const onSubmit = (values: TeamMember) => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      if (editingMember) {
        setTeamMembers(
          teamMembers.map((member) => 
            member.id === editingMember.id 
              ? { 
                  ...values, 
                  id: member.id,
                  status: member.status,
                  joinDate: member.joinDate,
                  lastLogin: member.lastLogin,
                  projectsCompleted: member.projectsCompleted,
                  currentProject: member.currentProject,
                  performance: member.performance
                }
              : member
          )
        );
        toast.success("Team member updated successfully!");
      } else {
        const newMember: TeamMember = {
          ...values,
          id: `${Date.now()}`,
          status: 'active',
          joinDate: new Date().toISOString().split('T')[0],
          projectsCompleted: 0,
          performance: 85
        };
        setTeamMembers([...teamMembers, newMember]);
        toast.success("Team member added successfully!");
      }
      
      setIsDialogOpen(false);
      setIsSubmitting(false);
    }, 1000);
  };

  const handleDeleteMember = (id: string) => {
    if (confirm("Are you sure you want to delete this team member?")) {
      setTeamMembers(teamMembers.filter((member) => member.id !== id));
      toast.success("Team member deleted successfully!");
    }
  };

  const handleStatusChange = (member: TeamMember, newStatus: TeamMember['status']) => {
    setTeamMembers(teamMembers.map(m => 
      m.id === member.id ? { ...m, status: newStatus } : m
    ));
    toast.success(`Member status updated to ${newStatus.replace('-', ' ')}`);
  };

  const handleBulkAction = (action: string) => {
    if (selectedMembers.length === 0) {
      toast.error("Please select at least one team member");
      return;
    }
    
    switch (action) {
      case 'activate':
        setTeamMembers(teamMembers.map(m => 
          selectedMembers.includes(m.id!) ? { ...m, status: 'active' as const } : m
        ));
        toast.success(`${selectedMembers.length} members activated`);
        break;
      case 'deactivate':
        setTeamMembers(teamMembers.map(m => 
          selectedMembers.includes(m.id!) ? { ...m, status: 'inactive' as const } : m
        ));
        toast.success(`${selectedMembers.length} members deactivated`);
        break;
      case 'delete':
        if (confirm(`Are you sure you want to delete ${selectedMembers.length} team members?`)) {
          setTeamMembers(teamMembers.filter(m => !selectedMembers.includes(m.id!)));
          toast.success(`${selectedMembers.length} members deleted`);
        }
        break;
    }
    setSelectedMembers([]);
  };

  const exportTeamData = () => {
    const csvContent = [
      ['Name', 'Role', 'Department', 'Email', 'Phone', 'Status', 'Availability', 'Performance', 'Projects Completed'].join(','),
      ...filteredTeamMembers.map(member => 
        [member.name, member.role, member.department, member.email, member.phone, member.status, member.availability, member.performance, member.projectsCompleted].join(',')
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
    <>
      <Card className="max-w-7xl mx-auto">
        <CardHeader>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Users className="h-6 w-6" />
                Team Management
              </CardTitle>
              <CardDescription>
                Manage your service team with advanced analytics and role-based access control
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={exportTeamData}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Import
              </Button>
              <Button onClick={openAddMemberDialog} className="bg-orange-600 hover:bg-orange-700">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Team Member
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Team Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{teamStats.total}</div>
              <div className="text-sm text-blue-600">Total Members</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">{teamStats.active}</div>
              <div className="text-sm text-green-600">Active</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">{teamStats.onProject}</div>
              <div className="text-sm text-purple-600">On Projects</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-orange-600">{teamStats.available}</div>
              <div className="text-sm text-orange-600">Available</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-yellow-600">{teamStats.avgPerformance}%</div>
              <div className="text-sm text-yellow-600">Avg Performance</div>
            </div>
          </div>

          {/* Filters and Controls */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search team members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  {roleOptions.map((role) => (
                    <SelectItem key={role} value={role}>{role}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departmentOptions.map((dept) => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="on-project">On Project</SelectItem>
                  <SelectItem value="on-leave">On Leave</SelectItem>
                </SelectContent>
              </Select>

              <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Availability</SelectItem>
                  {availabilityOptions.map((avail) => (
                    <SelectItem key={avail} value={avail}>{avail}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button 
                variant={viewMode === 'cards' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setViewMode('cards')}
              >
                Cards
              </Button>
              <Button 
                variant={viewMode === 'table' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setViewMode('table')}
              >
                Table
              </Button>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedMembers.length > 0 && (
            <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
              <span className="text-sm text-blue-600">
                {selectedMembers.length} member(s) selected
              </span>
              <Button size="sm" variant="outline" onClick={() => handleBulkAction('activate')}>
                <UserCheck className="h-4 w-4 mr-1" />
                Activate
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleBulkAction('deactivate')}>
                <UserX className="h-4 w-4 mr-1" />
                Deactivate
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleBulkAction('delete')}>
                <Trash className="h-4 w-4 mr-1" />
                Delete
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setSelectedMembers([])}>
                Clear
              </Button>
            </div>
          )}

          {/* Team Members Display */}
          {filteredTeamMembers.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium mb-2">No team members found</h3>
              <p>No team members match your current filters. Try adjusting your search criteria.</p>
            </div>
          ) : viewMode === 'cards' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTeamMembers.map((member) => (
                <Card key={member.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={selectedMembers.includes(member.id!)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedMembers([...selectedMembers, member.id!]);
                            } else {
                              setSelectedMembers(selectedMembers.filter(id => id !== member.id));
                            }
                          }}
                        />
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-orange-100 text-orange-600 text-lg">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => openViewMemberDialog(member)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openEditMemberDialog(member)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleStatusChange(member, member.status === 'active' ? 'inactive' : 'active')}
                          >
                            {member.status === 'active' ? (
                              <>
                                <UserX className="h-4 w-4 mr-2" />
                                Deactivate
                              </>
                            ) : (
                              <>
                                <UserCheck className="h-4 w-4 mr-2" />
                                Activate
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDeleteMember(member.id!)}
                            className="text-red-600"
                          >
                            <Trash className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-lg">{member.name}</h3>
                        <p className="text-orange-600 font-medium">{member.role}</p>
                        <p className="text-sm text-gray-600">{member.department}</p>
                      </div>

                      <div className="flex gap-2 flex-wrap">
                        {getStatusBadge(member.status)}
                        {getAvailabilityBadge(member.availability)}
                      </div>

                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          {member.email}
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          {member.phone}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {member.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4" />
                          {member.experience} • {member.projectsCompleted} projects
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t">
                        <div className="text-sm">
                          <span className="text-gray-600">Performance: </span>
                          <span className={`font-medium ${getPerformanceColor(member.performance)}`}>
                            {member.performance}%
                          </span>
                        </div>
                        <div className="text-sm font-medium text-gray-800">
                          {member.hourlyRate}/hr
                        </div>
                      </div>

                      {member.currentProject && (
                        <div className="text-xs bg-blue-50 text-blue-700 p-2 rounded">
                          Current: {member.currentProject}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedMembers.length === filteredTeamMembers.length}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedMembers(filteredTeamMembers.map(m => m.id!));
                          } else {
                            setSelectedMembers([]);
                          }
                        }}
                      />
                    </TableHead>
                    <TableHead>Member</TableHead>
                    <TableHead>Role & Department</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Projects</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTeamMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedMembers.includes(member.id!)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedMembers([...selectedMembers, member.id!]);
                            } else {
                              setSelectedMembers(selectedMembers.filter(id => id !== member.id));
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-orange-100 text-orange-600">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-sm text-gray-500">{member.specialization}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{member.role}</div>
                          <div className="text-sm text-gray-600">{member.department}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1 text-sm">
                          <div>{member.email}</div>
                          <div>{member.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {getStatusBadge(member.status)}
                          {getAvailabilityBadge(member.availability)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className={`font-medium ${getPerformanceColor(member.performance)}`}>
                          {member.performance}%
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{member.projectsCompleted} completed</div>
                          <div className="text-gray-600">{member.experience}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => openViewMemberDialog(member)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => openEditMemberDialog(member)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleDeleteMember(member.id!)}
                          >
                            <Trash className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Member Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingMember ? "Edit Team Member" : "Add New Team Member"}</DialogTitle>
            <DialogDescription>
              {editingMember
                ? "Update the details of your team member"
                : "Add a new team member to your service team"}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                        <Input placeholder="Enter email" type="email" {...field} />
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
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter location" {...field} />
                      </FormControl>
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
                          {roleOptions.map((role) => (
                            <SelectItem key={role} value={role}>
                              {role}
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
                          {departmentOptions.map((dept) => (
                            <SelectItem key={dept} value={dept}>
                              {dept}
                            </SelectItem>
                          ))}
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
                  name="specialization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Specialization</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select specialization" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {specializationOptions.map((specialization) => (
                            <SelectItem key={specialization} value={specialization}>
                              {specialization}
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
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Experience</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select experience" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {experienceOptions.map((exp) => (
                            <SelectItem key={exp} value={exp}>
                              {exp}
                            </SelectItem>
                          ))}
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
                  name="hourlyRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hourly Rate</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., ₹2,500" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="availability"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Availability</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select availability" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {availabilityOptions.map((avail) => (
                            <SelectItem key={avail} value={avail}>
                              {avail}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skills</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter skills separated by commas"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="certifications"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Certifications (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter certifications separated by commas"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Additional notes about the team member"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter className="pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting} className="bg-orange-600 hover:bg-orange-700">
                  {isSubmitting ? "Saving..." : editingMember ? "Update Member" : "Add Member"}
                </Button>
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
                  <AvatarFallback className="bg-orange-100 text-orange-600 text-xl">
                    {selectedMember.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{selectedMember.name}</h3>
                  <p className="text-orange-600 font-medium">{selectedMember.role}</p>
                  <div className="flex gap-2 mt-2">
                    {getStatusBadge(selectedMember.status)}
                    {getAvailabilityBadge(selectedMember.availability)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Department</label>
                    <p className="mt-1">{selectedMember.department}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Specialization</label>
                    <p className="mt-1">{selectedMember.specialization}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Experience</label>
                    <p className="mt-1">{selectedMember.experience}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Hourly Rate</label>
                    <p className="mt-1 font-medium">{selectedMember.hourlyRate}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1">{selectedMember.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Phone</label>
                    <p className="mt-1">{selectedMember.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Location</label>
                    <p className="mt-1">{selectedMember.location}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Join Date</label>
                    <p className="mt-1">{selectedMember.joinDate}</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Skills</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedMember.skills.split(',').map((skill, index) => (
                    <Badge key={index} variant="secondary">{skill.trim()}</Badge>
                  ))}
                </div>
              </div>

              {selectedMember.certifications && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Certifications</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedMember.certifications.split(',').map((cert, index) => (
                      <Badge key={index} variant="outline" className="text-green-700 border-green-300">
                        <Award className="h-3 w-3 mr-1" />
                        {cert.trim()}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className={`text-xl font-bold ${getPerformanceColor(selectedMember.performance)}`}>
                    {selectedMember.performance}%
                  </div>
                  <div className="text-sm text-gray-600">Performance</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-600">{selectedMember.projectsCompleted}</div>
                  <div className="text-sm text-gray-600">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-green-600">
                    {selectedMember.lastLogin ? 'Active' : 'Pending'}
                  </div>
                  <div className="text-sm text-gray-600">Status</div>
                </div>
              </div>

              {selectedMember.currentProject && (
                <div className="p-3 bg-blue-50 rounded-lg">
                  <label className="text-sm font-medium text-blue-700">Current Project</label>
                  <p className="mt-1 text-blue-800">{selectedMember.currentProject}</p>
                </div>
              )}

              {selectedMember.notes && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Notes</label>
                  <p className="mt-1 text-gray-600">{selectedMember.notes}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TeamMembersSection;
