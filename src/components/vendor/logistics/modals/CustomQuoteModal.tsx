
import React, { useState } from "react";
import { FormModal } from "@/components/shared/modals/FormModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CustomQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomQuoteModal = ({ isOpen, onClose }: CustomQuoteModalProps) => {
  const [quoteData, setQuoteData] = useState({
    serviceType: "",
    clientName: "",
    pickup: "",
    delivery: "",
    weight: "",
    dimensions: "",
    price: "",
    timeline: "",
    validityDays: "30",
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Custom quote created:", quoteData);
    // Handle custom quote creation
    onClose();
    setQuoteData({
      serviceType: "",
      clientName: "",
      pickup: "",
      delivery: "",
      weight: "",
      dimensions: "",
      price: "",
      timeline: "",
      validityDays: "30",
      notes: ""
    });
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Custom Transport Quote"
      onSubmit={handleSubmit}
      submitText="Create Quote"
      submitVariant="default"
      maxWidth="max-w-2xl"
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <Label htmlFor="serviceType">Service Type</Label>
          <Select value={quoteData.serviceType} onValueChange={(value) => setQuoteData({...quoteData, serviceType: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select service type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="heavy-machinery">Heavy Machinery Transport</SelectItem>
              <SelectItem value="hazardous">Hazardous Materials</SelectItem>
              <SelectItem value="turbine">Turbine Components</SelectItem>
              <SelectItem value="factory-relocation">Factory Relocation</SelectItem>
              <SelectItem value="general-cargo">General Cargo</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="col-span-2">
          <Label htmlFor="clientName">Client Name</Label>
          <Input
            id="clientName"
            placeholder="Enter client name"
            value={quoteData.clientName}
            onChange={(e) => setQuoteData({...quoteData, clientName: e.target.value})}
            required
          />
        </div>

        <div>
          <Label htmlFor="pickup">Pickup Location</Label>
          <Input
            id="pickup"
            placeholder="Pickup address"
            value={quoteData.pickup}
            onChange={(e) => setQuoteData({...quoteData, pickup: e.target.value})}
            required
          />
        </div>

        <div>
          <Label htmlFor="delivery">Delivery Location</Label>
          <Input
            id="delivery"
            placeholder="Delivery address"
            value={quoteData.delivery}
            onChange={(e) => setQuoteData({...quoteData, delivery: e.target.value})}
            required
          />
        </div>

        <div>
          <Label htmlFor="weight">Weight</Label>
          <Input
            id="weight"
            placeholder="e.g., 50 tons"
            value={quoteData.weight}
            onChange={(e) => setQuoteData({...quoteData, weight: e.target.value})}
            required
          />
        </div>

        <div>
          <Label htmlFor="dimensions">Dimensions</Label>
          <Input
            id="dimensions"
            placeholder="e.g., 6m x 3m x 2.5m"
            value={quoteData.dimensions}
            onChange={(e) => setQuoteData({...quoteData, dimensions: e.target.value})}
            required
          />
        </div>

        <div>
          <Label htmlFor="price">Quote Price (₹)</Label>
          <Input
            id="price"
            type="number"
            placeholder="Enter quote amount"
            value={quoteData.price}
            onChange={(e) => setQuoteData({...quoteData, price: e.target.value})}
            required
          />
        </div>

        <div>
          <Label htmlFor="timeline">Timeline (days)</Label>
          <Input
            id="timeline"
            type="number"
            placeholder="Number of days"
            value={quoteData.timeline}
            onChange={(e) => setQuoteData({...quoteData, timeline: e.target.value})}
            required
          />
        </div>

        <div>
          <Label htmlFor="validityDays">Quote Validity (days)</Label>
          <Input
            id="validityDays"
            type="number"
            value={quoteData.validityDays}
            onChange={(e) => setQuoteData({...quoteData, validityDays: e.target.value})}
          />
        </div>

        <div className="col-span-2">
          <Label htmlFor="notes">Additional Notes</Label>
          <Textarea
            id="notes"
            placeholder="Special requirements, terms & conditions..."
            value={quoteData.notes}
            onChange={(e) => setQuoteData({...quoteData, notes: e.target.value})}
            rows={3}
          />
        </div>
      </div>
    </FormModal>
  );
};
