
import React, { useState } from "react";
import { FormModal } from "@/components/shared/modals/FormModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AddDriverModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddDriverModal = ({ isOpen, onClose }: AddDriverModalProps) => {
  const [driverData, setDriverData] = useState({
    name: "",
    phone: "",
    email: "",
    licenseNumber: "",
    licenseType: "",
    experience: "",
    specialization: "",
    address: "",
    emergencyContact: "",
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New driver added:", driverData);
    // Handle driver creation
    onClose();
    setDriverData({
      name: "",
      phone: "",
      email: "",
      licenseNumber: "",
      licenseType: "",
      experience: "",
      specialization: "",
      address: "",
      emergencyContact: "",
      notes: ""
    });
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Driver"
      onSubmit={handleSubmit}
      submitText="Add Driver"
      submitVariant="default"
      maxWidth="max-w-2xl"
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            placeholder="Driver's full name"
            value={driverData.name}
            onChange={(e) => setDriverData({...driverData, name: e.target.value})}
            required
          />
        </div>

        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            placeholder="Contact number"
            value={driverData.phone}
            onChange={(e) => setDriverData({...driverData, phone: e.target.value})}
            required
          />
        </div>

        <div className="col-span-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="Email address"
            value={driverData.email}
            onChange={(e) => setDriverData({...driverData, email: e.target.value})}
          />
        </div>

        <div>
          <Label htmlFor="licenseNumber">License Number</Label>
          <Input
            id="licenseNumber"
            placeholder="Driving license number"
            value={driverData.licenseNumber}
            onChange={(e) => setDriverData({...driverData, licenseNumber: e.target.value})}
            required
          />
        </div>

        <div>
          <Label htmlFor="licenseType">License Type</Label>
          <Select value={driverData.licenseType} onValueChange={(value) => setDriverData({...driverData, licenseType: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select license type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Heavy Vehicle">Heavy Vehicle License</SelectItem>
              <SelectItem value="Commercial">Commercial License</SelectItem>
              <SelectItem value="Crane Operator">Crane Operator License</SelectItem>
              <SelectItem value="Hazmat">Hazmat Certified</SelectItem>
              <SelectItem value="Multi-Axle">Multi-Axle Vehicle</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="experience">Experience (Years)</Label>
          <Input
            id="experience"
            type="number"
            placeholder="Years of experience"
            value={driverData.experience}
            onChange={(e) => setDriverData({...driverData, experience: e.target.value})}
            required
          />
        </div>

        <div>
          <Label htmlFor="specialization">Specialization</Label>
          <Select value={driverData.specialization} onValueChange={(value) => setDriverData({...driverData, specialization: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select specialization" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Heavy Machinery">Heavy Machinery Transport</SelectItem>
              <SelectItem value="Crane Operations">Crane Operations</SelectItem>
              <SelectItem value="Long Distance">Long Distance Haul</SelectItem>
              <SelectItem value="Hazardous Materials">Hazardous Materials</SelectItem>
              <SelectItem value="Over-dimensional">Over-dimensional Cargo</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="col-span-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            placeholder="Residential address"
            value={driverData.address}
            onChange={(e) => setDriverData({...driverData, address: e.target.value})}
          />
        </div>

        <div className="col-span-2">
          <Label htmlFor="emergencyContact">Emergency Contact</Label>
          <Input
            id="emergencyContact"
            placeholder="Emergency contact name and phone"
            value={driverData.emergencyContact}
            onChange={(e) => setDriverData({...driverData, emergencyContact: e.target.value})}
          />
        </div>

        <div className="col-span-2">
          <Label htmlFor="notes">Additional Notes</Label>
          <Textarea
            id="notes"
            placeholder="Additional certifications, training, or notes..."
            value={driverData.notes}
            onChange={(e) => setDriverData({...driverData, notes: e.target.value})}
            rows={3}
          />
        </div>
      </div>
    </FormModal>
  );
};
