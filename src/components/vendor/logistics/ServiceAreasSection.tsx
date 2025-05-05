
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { MapPin, Plus, Edit, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

const serviceAreaSchema = z.object({
  location: z.string().min(1, { message: "Location is required" }),
  state: z.string().min(1, { message: "State/Region is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  serviceRadius: z.string().min(1, { message: "Service radius is required" }),
  transitTime: z.string().min(1, { message: "Transit time is required" }),
  pricePerKm: z.string().min(1, { message: "Price per km is required" }),
  specialConditions: z.string().optional(),
});

// Mock data for the service areas
const mockServiceAreas = [
  {
    id: "1",
    location: "Mumbai",
    state: "Maharashtra",
    country: "India",
    serviceRadius: "150",
    transitTime: "1-2 days",
    pricePerKm: "₹50",
    specialConditions: "No service during monsoon season in certain coastal areas"
  },
  {
    id: "2",
    location: "Delhi NCR",
    state: "Delhi",
    country: "India",
    serviceRadius: "200",
    transitTime: "2-3 days",
    pricePerKm: "₹55",
    specialConditions: "Restrictions in central Delhi during peak hours"
  },
  {
    id: "3",
    location: "Bangalore",
    state: "Karnataka",
    country: "India",
    serviceRadius: "100",
    transitTime: "1-2 days",
    pricePerKm: "₹60",
    specialConditions: "Additional charges for airport area deliveries"
  }
];

// States in India for dropdown
const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", 
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", 
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Puducherry", "Chandigarh"
];

export const ServiceAreasSection = () => {
  const [serviceAreas, setServiceAreas] = useState(mockServiceAreas);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAreaId, setCurrentAreaId] = useState<string | null>(null);

  const form = useForm<z.infer<typeof serviceAreaSchema>>({
    resolver: zodResolver(serviceAreaSchema),
    defaultValues: {
      location: "",
      state: "",
      country: "India", // Default to India
      serviceRadius: "",
      transitTime: "",
      pricePerKm: "",
      specialConditions: "",
    },
  });

  const openAddDialog = () => {
    form.reset({
      location: "",
      state: "",
      country: "India",
      serviceRadius: "",
      transitTime: "",
      pricePerKm: "",
      specialConditions: "",
    });
    setIsEditing(false);
    setCurrentAreaId(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (id: string) => {
    const areaToEdit = serviceAreas.find(a => a.id === id);
    if (areaToEdit) {
      form.reset(areaToEdit);
      setIsEditing(true);
      setCurrentAreaId(id);
      setIsDialogOpen(true);
    }
  };

  const deleteServiceArea = (id: string) => {
    setServiceAreas(serviceAreas.filter(a => a.id !== id));
    toast.success("Service area deleted successfully");
  };

  const onSubmit = (values: z.infer<typeof serviceAreaSchema>) => {
    if (isEditing && currentAreaId) {
      // Update existing area
      setServiceAreas(serviceAreas.map(a => 
        a.id === currentAreaId ? { ...values, id: currentAreaId } : a
      ));
      toast.success("Service area updated successfully");
    } else {
      // Add new area
      const newId = Math.random().toString(36).substring(2, 9);
      setServiceAreas([...serviceAreas, { ...values, id: newId }]);
      toast.success("New service area added successfully");
    }
    setIsDialogOpen(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-2xl font-bold text-gray-800">Service Areas</CardTitle>
          <CardDescription>
            Define the regions where you provide logistics services
          </CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={openAddDialog}
              className="bg-[#eb2f96] hover:bg-[#c4257d]"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Service Area
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Service Area" : "Add New Service Area"}</DialogTitle>
              <DialogDescription>
                {isEditing 
                  ? "Update the details of your service area" 
                  : "Add details about a new region where you provide services"}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location/City</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Mumbai" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State/Region</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {indianStates.map((state) => (
                              <SelectItem key={state} value={state}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="serviceRadius"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Radius (km)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g. 100" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="transitTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Transit Time Estimate</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 1-2 days" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pricePerKm"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price per km/mile</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. ₹50" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="specialConditions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Special Conditions</FormLabel>
                      <FormControl>
                        <Input placeholder="Any special conditions or restrictions for this area" {...field} />
                      </FormControl>
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
                    {isEditing ? "Update Service Area" : "Add Service Area"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      
      <CardContent>
        {serviceAreas.length === 0 ? (
          <div className="text-center py-8">
            <MapPin className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No service areas added</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by adding your first service area
            </p>
            <div className="mt-6">
              <Button 
                onClick={openAddDialog}
                className="bg-[#eb2f96] hover:bg-[#c4257d]"
              >
                <Plus className="mr-2 h-4 w-4" /> Add Service Area
              </Button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Location</TableHead>
                  <TableHead>State/Region</TableHead>
                  <TableHead>Service Radius</TableHead>
                  <TableHead>Transit Time</TableHead>
                  <TableHead>Price per km</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {serviceAreas.map((area) => (
                  <TableRow key={area.id}>
                    <TableCell className="font-medium">{area.location}</TableCell>
                    <TableCell>{area.state}</TableCell>
                    <TableCell>{area.serviceRadius} km</TableCell>
                    <TableCell>{area.transitTime}</TableCell>
                    <TableCell>{area.pricePerKm}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => openEditDialog(area.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => deleteServiceArea(area.id)}
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
