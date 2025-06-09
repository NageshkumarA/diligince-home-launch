
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Submit Quote for {request.title}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
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
          
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-[#eb2f96] hover:bg-[#eb2f96]/90">
              Submit Quote
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
