
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Plus, Edit, Trash, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const personnelSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  position: z.string().min(1, { message: "Position is required" }),
  licenseType: z.string().min(1, { message: "License type is required" }),
  licenseNumber: z.string().min(1, { message: "License number is required" }),
  experience: z.string().min(1, { message: "Experience is required" }),
  certifications: z.string(),
  availability: z.string().min(1, { message: "Availability status is required" }),
  contactNumber: z.string().min(10, { message: "Contact number must be at least 10 digits" }),
  email: z.string().email({ message: "Invalid email address" }).optional(),
});

// Define a type based on the zod schema
type Personnel = z.infer<typeof personnelSchema> & { id: string };

// Mock data for drivers and personnel
const mockPersonnel: Personnel[] = [
  {
    id: "1",
    name: "Rajesh Kumar",
    position: "Senior Driver",
    licenseType: "Heavy Vehicle License",
    licenseNumber: "DL-1420110123456",
    experience: "12 years",
    certifications: "Hazardous Materials Transport, Mountain Driving",
    availability: "Available",
    contactNumber: "9876543210",
    email: "rajesh.k@translogindia.com",
  },
  {
    id: "2",
    name: "Sunil Verma",
    position: "Crane Operator",
    licenseType: "Heavy Equipment Operation License",
    licenseNumber: "HEOL-98765432",
    experience: "8 years",
    certifications: "Mobile Crane Operation, Safety Training",
    availability: "Assigned",
    contactNumber: "8765432109",
    email: "sunil.v@translogindia.com",
  },
  {
    id: "3",
    name: "Priya Sharma",
    position: "Logistics Coordinator",
    licenseType: "N/A",
    licenseNumber: "N/A",
    experience: "5 years",
    certifications: "Supply Chain Management, Logistics Planning",
    availability: "Available",
    contactNumber: "7654321098",
    email: "priya.s@translogindia.com",
  }
];

const positions = [
  "Driver",
  "Senior Driver",
  "Crane Operator",
  "Forklift Operator",
  "Equipment Operator",
  "Logistics Coordinator",
  "Transport Manager",
  "Dispatcher",
  "Maintenance Technician",
  "Fleet Manager",
];

const licenseTypes = [
  "Heavy Vehicle License",
  "Light Commercial Vehicle License",
  "Heavy Equipment Operation License",
  "Hazardous Materials Transport License",
  "International Driving Permit",
  "N/A",
];

const availabilityStatuses = [
  "Available",
  "Assigned",
  "On Leave",
  "Training",
  "Unavailable",
];

export const DriversPersonnelSection = () => {
  const [personnel, setPersonnel] = useState<Personnel[]>(mockPersonnel);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPersonnelId, setCurrentPersonnelId] = useState<string | null>(null);

  const form = useForm<z.infer<typeof personnelSchema>>({
    resolver: zodResolver(personnelSchema),
    defaultValues: {
      name: "",
      position: "",
      licenseType: "",
      licenseNumber: "",
      experience: "",
      certifications: "",
      availability: "",
      contactNumber: "",
      email: "",
    },
  });

  const openAddDialog = () => {
    form.reset({
      name: "",
      position: "",
      licenseType: "",
      licenseNumber: "",
      experience: "",
      certifications: "",
      availability: "Available",
      contactNumber: "",
      email: "",
    });
    setIsEditing(false);
    setCurrentPersonnelId(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (id: string) => {
    const personnelToEdit = personnel.find(p => p.id === id);
    if (personnelToEdit) {
      form.reset(personnelToEdit);
      setIsEditing(true);
      setCurrentPersonnelId(id);
      setIsDialogOpen(true);
    }
  };

  const deletePersonnel = (id: string) => {
    setPersonnel(personnel.filter(p => p.id !== id));
    toast.success("Personnel deleted successfully");
  };

  const onSubmit = (values: z.infer<typeof personnelSchema>) => {
    if (isEditing && currentPersonnelId) {
      // Update existing personnel
      setPersonnel(personnel.map(p => 
        p.id === currentPersonnelId ? { ...values, id: currentPersonnelId } : p
      ));
      toast.success("Personnel updated successfully");
    } else {
      // Add new personnel
      const newId = Math.random().toString(36).substring(2, 9);
      setPersonnel([...personnel, { ...values, id: newId }]);
      toast.success("New personnel added successfully");
    }
    setIsDialogOpen(false);
  };

  // Function to get the badge color based on availability status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-500 hover:bg-green-600";
      case "Assigned":
        return "bg-blue-500 hover:bg-blue-600";
      case "On Leave":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "Training":
        return "bg-purple-500 hover:bg-purple-600";
      case "Unavailable":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-2xl font-bold text-gray-800">Drivers & Personnel</CardTitle>
          <CardDescription>
            Manage your drivers, operators, and logistics staff
          </CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={openAddDialog}
              className="bg-[#eb2f96] hover:bg-[#c4257d]"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Personnel
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Personnel" : "Add New Personnel"}</DialogTitle>
              <DialogDescription>
                {isEditing 
                  ? "Update the details of your team member" 
                  : "Add details about a new driver or logistics staff member"}
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Position/Role</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select position" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {positions.map((position) => (
                              <SelectItem key={position} value={position}>
                                {position}
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
                        <FormControl>
                          <Input placeholder="e.g. 5 years" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="licenseType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>License Type</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select license type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {licenseTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
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
                    name="licenseNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>License Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter license number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="certifications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Certifications</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="List any relevant certifications, comma separated" 
                          className="resize-none"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="availability"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Availability</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {availabilityStatuses.map((status) => (
                              <SelectItem key={status} value={status}>
                                {status}
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
                    name="contactNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter phone number" {...field} />
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
                        <FormLabel>Email (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter email address" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <DialogFooter className="pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)}
                    type="button"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    className="bg-[#eb2f96] hover:bg-[#c4257d]"
                  >
                    {isEditing ? "Update Personnel" : "Add Personnel"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      
      <CardContent>
        {personnel.length === 0 ? (
          <div className="text-center py-8">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No personnel added</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by adding your first team member
            </p>
            <div className="mt-6">
              <Button 
                onClick={openAddDialog}
                className="bg-[#eb2f96] hover:bg-[#c4257d]"
              >
                <Plus className="mr-2 h-4 w-4" /> Add Personnel
              </Button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>License</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {personnel.map((person) => (
                  <TableRow key={person.id}>
                    <TableCell className="font-medium">{person.name}</TableCell>
                    <TableCell>{person.position}</TableCell>
                    <TableCell>
                      <div>{person.licenseType}</div>
                      <div className="text-xs text-gray-500">{person.licenseNumber}</div>
                    </TableCell>
                    <TableCell>{person.experience}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(person.availability)}>
                        {person.availability}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div>{person.contactNumber}</div>
                      <div className="text-xs text-gray-500">{person.email}</div>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => openEditDialog(person.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => deletePersonnel(person.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
