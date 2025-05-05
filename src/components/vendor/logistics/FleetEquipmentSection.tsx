
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Plus, Edit, Trash, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

const equipmentSchema = z.object({
  equipmentType: z.string().min(1, { message: "Equipment type is required" }),
  make: z.string().min(1, { message: "Make is required" }),
  model: z.string().min(1, { message: "Model is required" }),
  year: z.string().regex(/^\d{4}$/, { message: "Please enter a valid year" }),
  quantity: z.string().min(1, { message: "Quantity is required" }),
  capacity: z.string().min(1, { message: "Capacity is required" }),
  unit: z.string().min(1, { message: "Unit is required" }),
  registrationNumber: z.string().min(1, { message: "Registration number is required" }),
  features: z.string(),
  location: z.string().min(1, { message: "Location is required" }),
  status: z.string().min(1, { message: "Status is required" }),
});

const equipmentTypes = [
  "Heavy Duty Trucks",
  "Low-bed Trailers",
  "Mobile Cranes",
  "Forklifts",
  "Container handlers",
  "Excavators",
  "Bulldozers",
  "Wheel Loaders",
  "Dump Trucks",
  "Other specialized equipment"
];

const capacityUnits = [
  "Tons",
  "Kg",
  "Metric Tons",
  "Cubic Meters",
  "Feet",
  "Square Meters"
];

const availabilityStatuses = [
  "Available",
  "In Use",
  "Under Maintenance",
  "Reserved",
  "Out of Service"
];

// Mock data for the equipment list
const mockEquipment = [
  {
    id: "1",
    equipmentType: "Heavy Duty Trucks",
    make: "Tata",
    model: "Prima 3718.K",
    year: "2021",
    quantity: "5",
    capacity: "37",
    unit: "Tons",
    registrationNumber: "MH02AB1234",
    features: "Air Conditioning, GPS Tracking, Sleep Cabin",
    location: "Mumbai",
    status: "Available",
  },
  {
    id: "2",
    equipmentType: "Low-bed Trailers",
    make: "Ashok Leyland",
    model: "Multi-axle",
    year: "2020",
    quantity: "3",
    capacity: "70",
    unit: "Tons",
    registrationNumber: "MH04CD5678",
    features: "Hydraulic Ramps, Extendable Bed, Air Suspension",
    location: "Pune",
    status: "In Use",
  },
  {
    id: "3",
    equipmentType: "Mobile Cranes",
    make: "ACE",
    model: "NXT 150",
    year: "2022",
    quantity: "2",
    capacity: "15",
    unit: "Tons",
    registrationNumber: "DL01EF9012",
    features: "Telescopic Boom, 4x4 Drive, Outriggers",
    location: "Delhi",
    status: "Available",
  },
];

export const FleetEquipmentSection = () => {
  const [equipment, setEquipment] = useState(mockEquipment);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEquipmentId, setCurrentEquipmentId] = useState<string | null>(null);

  const form = useForm<z.infer<typeof equipmentSchema>>({
    resolver: zodResolver(equipmentSchema),
    defaultValues: {
      equipmentType: "",
      make: "",
      model: "",
      year: "",
      quantity: "",
      capacity: "",
      unit: "",
      registrationNumber: "",
      features: "",
      location: "",
      status: "",
    },
  });

  const openAddDialog = () => {
    form.reset({
      equipmentType: "",
      make: "",
      model: "",
      year: "",
      quantity: "",
      capacity: "",
      unit: "",
      registrationNumber: "",
      features: "",
      location: "",
      status: "",
    });
    setIsEditing(false);
    setCurrentEquipmentId(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (id: string) => {
    const equipmentToEdit = equipment.find(e => e.id === id);
    if (equipmentToEdit) {
      form.reset(equipmentToEdit);
      setIsEditing(true);
      setCurrentEquipmentId(id);
      setIsDialogOpen(true);
    }
  };

  const deleteEquipment = (id: string) => {
    setEquipment(equipment.filter(e => e.id !== id));
    toast.success("Equipment deleted successfully");
  };

  const onSubmit = (values: z.infer<typeof equipmentSchema>) => {
    if (isEditing && currentEquipmentId) {
      // Update existing equipment
      setEquipment(equipment.map(e => 
        e.id === currentEquipmentId ? { ...values, id: currentEquipmentId } : e
      ));
      toast.success("Equipment updated successfully");
    } else {
      // Add new equipment
      const newId = Math.random().toString(36).substring(2, 9);
      setEquipment([...equipment, { ...values, id: newId }]);
      toast.success("New equipment added successfully");
    }
    setIsDialogOpen(false);
  };

  // Function to get the badge color based on status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-500 hover:bg-green-600";
      case "In Use":
        return "bg-blue-500 hover:bg-blue-600";
      case "Under Maintenance":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "Reserved":
        return "bg-purple-500 hover:bg-purple-600";
      case "Out of Service":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-2xl font-bold text-gray-800">Fleet & Equipment</CardTitle>
          <CardDescription>
            Manage your transport and heavy machinery equipment
          </CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={openAddDialog}
              className="bg-[#eb2f96] hover:bg-[#c4257d]"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Equipment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Equipment" : "Add New Equipment"}</DialogTitle>
              <DialogDescription>
                {isEditing 
                  ? "Update the details of your equipment" 
                  : "Add details about your transportation or handling equipment"}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="equipmentType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Equipment Type</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {equipmentTypes.map((type) => (
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
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Number of units" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="make"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Make</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Tata, Volvo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="model"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Model</FormLabel>
                        <FormControl>
                          <Input placeholder="Model number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year</FormLabel>
                        <FormControl>
                          <Input placeholder="YYYY" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="capacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Capacity</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 20" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="unit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Unit</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select unit" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {capacityUnits.map((unit) => (
                              <SelectItem key={unit} value={unit}>
                                {unit}
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
                    name="registrationNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Registration Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Vehicle registration" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="features"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Features & Specifications</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="List key features and specifications" 
                          className="resize-none"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Base Location</FormLabel>
                        <FormControl>
                          <Input placeholder="City/Region" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Availability Status</FormLabel>
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
                    {isEditing ? "Update Equipment" : "Add Equipment"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      
      <CardContent>
        {equipment.length === 0 ? (
          <div className="text-center py-8">
            <Truck className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No equipment added</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by adding your first equipment
            </p>
            <div className="mt-6">
              <Button 
                onClick={openAddDialog}
                className="bg-[#eb2f96] hover:bg-[#c4257d]"
              >
                <Plus className="mr-2 h-4 w-4" /> Add Equipment
              </Button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Equipment Type</TableHead>
                  <TableHead>Make & Model</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Registration</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {equipment.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.equipmentType}</TableCell>
                    <TableCell>
                      <div>{item.make} {item.model}</div>
                      <div className="text-xs text-gray-500">{item.year}</div>
                    </TableCell>
                    <TableCell>{item.capacity} {item.unit}</TableCell>
                    <TableCell>{item.registrationNumber}</TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(item.status)}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => openEditDialog(item.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => deleteEquipment(item.id)}
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
