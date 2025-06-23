
import React, { useState } from "react";
import { FormModal } from "@/components/shared/modals/FormModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AddVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddVehicleModal = ({ isOpen, onClose }: AddVehicleModalProps) => {
  const [vehicleData, setVehicleData] = useState({
    vehicleType: "",
    make: "",
    model: "",
    year: "",
    capacity: "",
    registrationNumber: "",
    driver: "",
    location: "",
    fuelCapacity: "",
    specifications: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New vehicle added:", vehicleData);
    // Handle vehicle creation
    onClose();
    setVehicleData({
      vehicleType: "",
      make: "",
      model: "",
      year: "",
      capacity: "",
      registrationNumber: "",
      driver: "",
      location: "",
      fuelCapacity: "",
      specifications: ""
    });
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Vehicle"
      onSubmit={handleSubmit}
      submitText="Add Vehicle"
      submitVariant="default"
      maxWidth="max-w-2xl"
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <Label htmlFor="vehicleType">Vehicle Type</Label>
          <Select value={vehicleData.vehicleType} onValueChange={(value) => setVehicleData({...vehicleData, vehicleType: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select vehicle type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Heavy Duty Truck">Heavy Duty Truck</SelectItem>
              <SelectItem value="Mobile Crane">Mobile Crane</SelectItem>
              <SelectItem value="Low Bed Trailer">Low Bed Trailer</SelectItem>
              <SelectItem value="Container Truck">Container Truck</SelectItem>
              <SelectItem value="Specialized Transport">Specialized Transport</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="make">Make</Label>
          <Input
            id="make"
            placeholder="e.g., Tata, Volvo"
            value={vehicleData.make}
            onChange={(e) => setVehicleData({...vehicleData, make: e.target.value})}
            required
          />
        </div>

        <div>
          <Label htmlFor="model">Model</Label>
          <Input
            id="model"
            placeholder="Model name"
            value={vehicleData.model}
            onChange={(e) => setVehicleData({...vehicleData, model: e.target.value})}
            required
          />
        </div>

        <div>
          <Label htmlFor="year">Year</Label>
          <Input
            id="year"
            placeholder="YYYY"
            value={vehicleData.year}
            onChange={(e) => setVehicleData({...vehicleData, year: e.target.value})}
            required
          />
        </div>

        <div>
          <Label htmlFor="capacity">Capacity</Label>
          <Input
            id="capacity"
            placeholder="e.g., 40 tons"
            value={vehicleData.capacity}
            onChange={(e) => setVehicleData({...vehicleData, capacity: e.target.value})}
            required
          />
        </div>

        <div>
          <Label htmlFor="registrationNumber">Registration Number</Label>
          <Input
            id="registrationNumber"
            placeholder="Vehicle registration"
            value={vehicleData.registrationNumber}
            onChange={(e) => setVehicleData({...vehicleData, registrationNumber: e.target.value})}
            required
          />
        </div>

        <div>
          <Label htmlFor="driver">Assign Driver</Label>
          <Select value={vehicleData.driver} onValueChange={(value) => setVehicleData({...vehicleData, driver: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select driver" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Rajesh Kumar">Rajesh Kumar</SelectItem>
              <SelectItem value="Suresh Patel">Suresh Patel</SelectItem>
              <SelectItem value="Amit Singh">Amit Singh</SelectItem>
              <SelectItem value="Vikram Sharma">Vikram Sharma</SelectItem>
              <SelectItem value="Unassigned">Unassigned</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="location">Base Location</Label>
          <Input
            id="location"
            placeholder="City/Depot location"
            value={vehicleData.location}
            onChange={(e) => setVehicleData({...vehicleData, location: e.target.value})}
            required
          />
        </div>

        <div>
          <Label htmlFor="fuelCapacity">Fuel Capacity (L)</Label>
          <Input
            id="fuelCapacity"
            type="number"
            placeholder="Fuel tank capacity"
            value={vehicleData.fuelCapacity}
            onChange={(e) => setVehicleData({...vehicleData, fuelCapacity: e.target.value})}
          />
        </div>

        <div className="col-span-2">
          <Label htmlFor="specifications">Specifications & Features</Label>
          <Textarea
            id="specifications"
            placeholder="Additional vehicle specifications, features, and equipment..."
            value={vehicleData.specifications}
            onChange={(e) => setVehicleData({...vehicleData, specifications: e.target.value})}
            rows={3}
          />
        </div>
      </div>
    </FormModal>
  );
};
