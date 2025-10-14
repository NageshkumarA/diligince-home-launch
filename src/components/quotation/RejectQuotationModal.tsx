import React, { useState } from "react";
import { FormModal } from "@/components/shared/modals/FormModal";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

interface RejectQuotationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReject: (reason: string, comments: string) => Promise<void>;
  quotationNumber: string;
  vendorName: string;
}

export const RejectQuotationModal = ({
  isOpen,
  onClose,
  onReject,
  quotationNumber,
  vendorName,
}: RejectQuotationModalProps) => {
  const [reason, setReason] = useState<string>("");
  const [comments, setComments] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reason || !comments) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onReject(reason, comments);
      setReason("");
      setComments("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = reason && comments.trim().length > 0;

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title="Reject Quotation"
      onSubmit={handleSubmit}
      submitText="Reject Quotation"
      submitVariant="destructive"
      isSubmitting={isSubmitting || !isFormValid}
    >
      <div className="space-y-4">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            You are about to reject this quotation. This action will notify the vendor and cannot be undone.
          </AlertDescription>
        </Alert>

        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            Rejecting quotation <span className="font-semibold text-foreground">{quotationNumber}</span> from{" "}
            <span className="font-semibold text-foreground">{vendorName}</span>
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="reason">Rejection Reason *</Label>
          <Select value={reason} onValueChange={setReason}>
            <SelectTrigger id="reason">
              <SelectValue placeholder="Select a reason" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pricing_too_high">Price too high</SelectItem>
              <SelectItem value="timeline_unacceptable">Late delivery timeline</SelectItem>
              <SelectItem value="requirements_not_met">Doesn't meet requirements</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="comments">Additional Comments *</Label>
          <Textarea
            id="comments"
            placeholder="Please provide detailed explanation for the rejection..."
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            rows={4}
            required
          />
          <p className="text-xs text-muted-foreground">
            This will be shared with the vendor
          </p>
        </div>
      </div>
    </FormModal>
  );
};
