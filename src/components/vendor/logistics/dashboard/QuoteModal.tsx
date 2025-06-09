
import React, { useState } from "react";
import { FormModal } from "@/components/shared/modals/FormModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: any;
}

export const QuoteModal = ({ isOpen, onClose, request }: QuoteModalProps) => {
  const [quoteData, setQuoteData] = useState({
    price: "",
    timeline: "",
    equipment: "",
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Quote submitted:", quoteData);
    // Handle quote submission
    onClose();
    setQuoteData({ price: "", timeline: "", equipment: "", notes: "" });
  };

  if (!request) return null;

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title={`Submit Quote for ${request.title}`}
      onSubmit={handleSubmit}
      submitText="Submit Quote"
      submitVariant="default"
      maxWidth="max-w-md"
    >
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
        <Label htmlFor="timeline">Timeline Estimate</Label>
        <Input
          id="timeline"
          placeholder="e.g., 2-3 days"
          value={quoteData.timeline}
          onChange={(e) => setQuoteData({...quoteData, timeline: e.target.value})}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="equipment">Equipment Allocation</Label>
        <Input
          id="equipment"
          placeholder="e.g., Low-bed Trailer LB-40"
          value={quoteData.equipment}
          onChange={(e) => setQuoteData({...quoteData, equipment: e.target.value})}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="notes">Special Notes</Label>
        <Textarea
          id="notes"
          placeholder="Any special considerations or requirements"
          value={quoteData.notes}
          onChange={(e) => setQuoteData({...quoteData, notes: e.target.value})}
          rows={3}
        />
      </div>
    </FormModal>
  );
};
