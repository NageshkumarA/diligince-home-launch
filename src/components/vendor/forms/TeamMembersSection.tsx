
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PlusCircle, Edit, Trash, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";

// Define team member schema
const teamMemberSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  role: z.string().min(1, { message: "Role is required" }),
  specialization: z.string().min(1, { message: "Specialization is required" }),
  experience: z.string().min(1, { message: "Experience is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: "Phone must be at least 10 digits" }),
});

type TeamMember = z.infer<typeof teamMemberSchema>;

// Mock data for team members
const initialTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Raj Mehta",
    role: "Service Engineer",
    specialization: "Robotics & Automation",
    experience: "8+ years",
    email: "raj.mehta@techserve.com",
    phone: "9876543210",
  },
  {
    id: "2",
    name: "Priya Shah",
    role: "Project Manager",
    specialization: "Process Optimization",
    experience: "12+ years",
    email: "priya.shah@techserve.com",
    phone: "9876543211",
  },
  {
    id: "3",
    name: "Ankit Patel",
    role: "Technical Consultant",
    specialization: "PLC Programming",
    experience: "6+ years",
    email: "ankit.patel@techserve.com",
    phone: "9876543212",
  },
];

// Define role options
const roleOptions = [
  "Service Engineer",
  "Project Manager",
  "Technical Consultant",
  "Business Development Manager",
  "Operations Manager",
  "Field Technician",
  "Software Engineer",
  "Design Engineer",
  "Quality Assurance Specialist",
  "Administrator",
];

// Define specialization options
const specializationOptions = [
  "Robotics & Automation",
  "Process Optimization",
  "PLC Programming",
  "SCADA Systems",
  "Industrial IoT",
  "Mechanical Engineering",
  "Electrical Engineering",
  "Safety Systems",
  "Energy Management",
  "Quality Control",
];

// Define experience options
const experienceOptions = [
  "0-2 years",
  "2-5 years",
  "5-8 years",
  "8-10 years",
  "10-15 years",
  "15+ years",
];

const TeamMembersSection = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<TeamMember>({
    resolver: zodResolver(teamMemberSchema),
    defaultValues: {
      name: "",
      role: "",
      specialization: "",
      experience: "",
      email: "",
      phone: "",
    },
  });

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

  const onSubmit = (values: TeamMember) => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      if (editingMember) {
        // Update existing member
        setTeamMembers(
          teamMembers.map((member) => 
            member.id === editingMember.id ? { ...values, id: member.id } : member
          )
        );
        toast.success("Team member updated successfully!");
      } else {
        // Add new member
        const newMember = {
          ...values,
          id: `${Date.now()}`,
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

  return (
    <>
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-gray-800">Team Members</CardTitle>
            <CardDescription>
              Manage your team members and their details
            </CardDescription>
          </div>
          <Button onClick={openAddMemberDialog} className="bg-orange-600 hover:bg-orange-700">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Team Member
          </Button>
        </CardHeader>
        
        <CardContent>
          {teamMembers.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              No team members added yet. Click "Add Team Member" to get started.
            </div>
          ) : (
            <div className="rounded-md border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium">Name</th>
                      <th className="px-4 py-3 text-left font-medium">Role</th>
                      <th className="px-4 py-3 text-left font-medium">Specialization</th>
                      <th className="px-4 py-3 text-left font-medium">Experience</th>
                      <th className="px-4 py-3 text-left font-medium">Contact</th>
                      <th className="px-4 py-3 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {teamMembers.map((member) => (
                      <tr key={member.id} className="hover:bg-muted/50">
                        <td className="px-4 py-3 whitespace-nowrap font-medium">{member.name}</td>
                        <td className="px-4 py-3 whitespace-nowrap">{member.role}</td>
                        <td className="px-4 py-3 whitespace-nowrap">{member.specialization}</td>
                        <td className="px-4 py-3 whitespace-nowrap">{member.experience}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-xs">
                            <div>{member.email}</div>
                            <div>{member.phone}</div>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => openEditMemberDialog(member)}
                              className="h-8 w-8 text-blue-600"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleDeleteMember(member.id!)}
                              className="h-8 w-8 text-red-600"
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>{editingMember ? "Edit Team Member" : "Add Team Member"}</DialogTitle>
            <DialogDescription>
              {editingMember
                ? "Update the details of your team member"
                : "Add a new team member to your company profile"}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              </div>
              
              <div className="grid grid-cols-2 gap-4">
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
              </div>
              
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
    </>
  );
};

export default TeamMembersSection;
