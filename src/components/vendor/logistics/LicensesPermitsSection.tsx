
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Plus, File, Download, Check, Edit, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const licenseSchema = z.object({
  licenseType: z.string().min(1, { message: "License type is required" }),
  licenseNumber: z.string().min(1, { message: "License number is required" }),
  issuingAuthority: z.string().min(1, { message: "Issuing authority is required" }),
  issueDate: z.string().min(1, { message: "Issue date is required" }),
  expiryDate: z.string().min(1, { message: "Expiry date is required" }),
  verificationStatus: z.string().min(1, { message: "Verification status is required" }),
});

// Define a type based on the zod schema
type License = z.infer<typeof licenseSchema> & { id: string };

// Mock data for licenses and permits
const mockLicenses: License[] = [
  {
    id: "1",
    licenseType: "Commercial Vehicle Permit",
    licenseNumber: "CVP-12345678",
    issuingAuthority: "Regional Transport Office, Mumbai",
    issueDate: "2023-03-15",
    expiryDate: "2026-03-14",
    verificationStatus: "Verified",
  },
  {
    id: "2",
    licenseType: "Hazardous Materials Transport License",
    licenseNumber: "HMTL-87654321",
    issuingAuthority: "Ministry of Environment, Govt. of India",
    issueDate: "2022-09-20",
    expiryDate: "2025-09-19",
    verificationStatus: "Pending",
  },
  {
    id: "3",
    licenseType: "Interstate Goods Transport Permit",
    licenseNumber: "IGTP-246813579",
    issuingAuthority: "Ministry of Road Transport & Highways",
    issueDate: "2023-01-05",
    expiryDate: "2028-01-04",
    verificationStatus: "Verified",
  }
];

const licenseTypes = [
  "Commercial Vehicle Permit",
  "Hazardous Materials Transport License",
  "Interstate Goods Transport Permit",
  "Heavy Equipment Operation License",
  "Oversize Load Transport Permit",
  "Goods Carrier License",
  "GPS Implementation Certificate",
  "Environmental Clearance Certificate",
  "Vehicle Fitness Certificate",
  "Special Project Transportation Permit",
];

const verificationStatuses = [
  "Verified",
  "Pending",
  "Rejected",
  "Expired",
];

export const LicensesPermitsSection = () => {
  const [licenses, setLicenses] = useState<License[]>(mockLicenses);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentLicenseId, setCurrentLicenseId] = useState<string | null>(null);

  const form = useForm<z.infer<typeof licenseSchema>>({
    resolver: zodResolver(licenseSchema),
    defaultValues: {
      licenseType: "",
      licenseNumber: "",
      issuingAuthority: "",
      issueDate: "",
      expiryDate: "",
      verificationStatus: "Pending", // Default to pending
    },
  });

  const openAddDialog = () => {
    form.reset({
      licenseType: "",
      licenseNumber: "",
      issuingAuthority: "",
      issueDate: "",
      expiryDate: "",
      verificationStatus: "Pending",
    });
    setIsEditing(false);
    setCurrentLicenseId(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (id: string) => {
    const licenseToEdit = licenses.find(l => l.id === id);
    if (licenseToEdit) {
      form.reset(licenseToEdit);
      setIsEditing(true);
      setCurrentLicenseId(id);
      setIsDialogOpen(true);
    }
  };

  const deleteLicense = (id: string) => {
    setLicenses(licenses.filter(l => l.id !== id));
    toast.success("License deleted successfully");
  };

  const onSubmit = (values: z.infer<typeof licenseSchema>) => {
    if (isEditing && currentLicenseId) {
      // Update existing license
      setLicenses(licenses.map(l => 
        l.id === currentLicenseId ? { ...values, id: currentLicenseId } : l
      ));
      toast.success("License updated successfully");
    } else {
      // Add new license
      const newId = Math.random().toString(36).substring(2, 9);
      setLicenses([...licenses, { ...values, id: newId }]);
      toast.success("New license added successfully");
    }
    setIsDialogOpen(false);
  };

  const handleUpload = () => {
    // Simulate upload functionality
    toast.success("Document uploaded successfully. Verification pending.");
  };

  // Function to get the badge color based on verification status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Verified":
        return "bg-green-500 hover:bg-green-600";
      case "Pending":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "Rejected":
        return "bg-red-500 hover:bg-red-600";
      case "Expired":
        return "bg-gray-500 hover:bg-gray-600";
      default:
        return "bg-blue-500 hover:bg-blue-600";
    }
  };

  // Format date to display in a more readable format
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-2xl font-bold text-gray-800">Licenses & Permits</CardTitle>
          <CardDescription>
            Manage your logistics licenses, permits and certifications
          </CardDescription>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            onClick={handleUpload}
          >
            <File className="mr-2 h-4 w-4" /> Upload Document
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                onClick={openAddDialog}
                className="bg-[#eb2f96] hover:bg-[#c4257d]"
              >
                <Plus className="mr-2 h-4 w-4" /> Add License
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{isEditing ? "Edit License" : "Add New License"}</DialogTitle>
                <DialogDescription>
                  {isEditing 
                    ? "Update the details of your license or permit" 
                    : "Add details about a new license or permit for your logistics operations"}
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                    <FormField
                      control={form.control}
                      name="issuingAuthority"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Issuing Authority</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter issuing authority" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="issueDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Issue Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="expiryDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expiry Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="verificationStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Verification Status</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {verificationStatuses.map((status) => (
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
                      {isEditing ? "Update License" : "Add License"}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      
      <CardContent>
        {licenses.length === 0 ? (
          <div className="text-center py-8">
            <File className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No licenses added</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by adding your first license or permit
            </p>
            <div className="mt-6">
              <Button 
                onClick={openAddDialog}
                className="bg-[#eb2f96] hover:bg-[#c4257d]"
              >
                <Plus className="mr-2 h-4 w-4" /> Add License
              </Button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>License Type</TableHead>
                  <TableHead>License Number</TableHead>
                  <TableHead>Issuing Authority</TableHead>
                  <TableHead>Issue Date</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Document</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {licenses.map((license) => (
                  <TableRow key={license.id}>
                    <TableCell className="font-medium">{license.licenseType}</TableCell>
                    <TableCell>{license.licenseNumber}</TableCell>
                    <TableCell>{license.issuingAuthority}</TableCell>
                    <TableCell>{formatDate(license.issueDate)}</TableCell>
                    <TableCell>{formatDate(license.expiryDate)}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(license.verificationStatus)}>
                        {license.verificationStatus === "Verified" && <Check className="mr-1 h-3 w-3" />}
                        {license.verificationStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => openEditDialog(license.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => deleteLicense(license.id)}
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
