
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, MapPin, Building, Star, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QuotationModalProps {
  isOpen: boolean;
  onClose: () => void;
  rfq: any;
}

export const QuotationModal = ({ isOpen, onClose, rfq }: QuotationModalProps) => {
  const { toast } = useToast();
  const [quotationData, setQuotationData] = useState({
    totalPrice: "",
    deliveryDays: "",
    validityDays: "30",
    terms: "",
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Quotation Submitted",
      description: `Your quotation for "${rfq?.title}" has been submitted successfully.`,
    });
    onClose();
  };

  if (!rfq) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Create Quotation</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* RFQ Details */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">{rfq.title}</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-gray-500" />
                <span>{rfq.company}</span>
                <div className="flex items-center gap-1 ml-2">
                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                  <span className="text-xs">{rfq.clientRating}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span>{rfq.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span>Deadline: {new Date(rfq.deadline).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-500" />
                <span>{rfq.items} items required</span>
              </div>
            </div>
            <div className="mt-3">
              <Badge variant="outline" className="mr-2">Budget: {rfq.budget}</Badge>
              <Badge variant="outline">Payment: {rfq.paymentTerms}</Badge>
            </div>
          </div>

          <Separator />

          {/* Quotation Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="totalPrice">Total Quotation Price *</Label>
                <Input
                  id="totalPrice"
                  type="text"
                  placeholder="₹350,000"
                  value={quotationData.totalPrice}
                  onChange={(e) => setQuotationData({...quotationData, totalPrice: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="deliveryDays">Delivery Timeline (days) *</Label>
                <Input
                  id="deliveryDays"
                  type="number"
                  placeholder="15"
                  value={quotationData.deliveryDays}
                  onChange={(e) => setQuotationData({...quotationData, deliveryDays: e.target.value})}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="validityDays">Quotation Validity (days)</Label>
              <Input
                id="validityDays"
                type="number"
                value={quotationData.validityDays}
                onChange={(e) => setQuotationData({...quotationData, validityDays: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="terms">Terms & Conditions</Label>
              <Textarea
                id="terms"
                placeholder="Payment terms, delivery conditions, warranty details..."
                value={quotationData.terms}
                onChange={(e) => setQuotationData({...quotationData, terms: e.target.value})}
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                placeholder="Any additional information or special offers..."
                value={quotationData.notes}
                onChange={(e) => setQuotationData({...quotationData, notes: e.target.value})}
                rows={2}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Save Draft
              </Button>
              <Button type="submit" className="bg-[#faad14] hover:bg-[#faad14]/90">
                Submit Quotation
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
