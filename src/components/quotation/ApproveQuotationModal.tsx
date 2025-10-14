import React, { useState } from "react";
import { FormModal } from "@/components/shared/modals/FormModal";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface ApproveQuotationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApprove: (comments?: string, notifyVendor?: boolean, createPO?: boolean) => Promise<void>;
  quotationNumber: string;
  vendorName: string;
}

export const ApproveQuotationModal = ({
  isOpen,
  onClose,
  onApprove,
  quotationNumber,
  vendorName,
}: ApproveQuotationModalProps) => {
  const [comments, setComments] = useState("");
  const [notifyVendor, setNotifyVendor] = useState(true);
  const [createPO, setCreatePO] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onApprove(comments || undefined, notifyVendor, createPO);
      setComments("");
      setNotifyVendor(true);
      setCreatePO(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title="Approve Quotation"
      onSubmit={handleSubmit}
      submitText="Approve Quotation"
      submitVariant="default"
      isSubmitting={isSubmitting}
    >
      <div className="space-y-4">
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            You are approving quotation <span className="font-semibold text-foreground">{quotationNumber}</span> from{" "}
            <span className="font-semibold text-foreground">{vendorName}</span>
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="comments">Comments (Optional)</Label>
          <Textarea
            id="comments"
            placeholder="Add any comments about this approval..."
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            rows={3}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="notifyVendor"
              checked={notifyVendor}
              onCheckedChange={(checked) => setNotifyVendor(checked as boolean)}
            />
            <Label htmlFor="notifyVendor" className="text-sm font-normal cursor-pointer">
              Notify vendor via email
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="createPO"
              checked={createPO}
              onCheckedChange={(checked) => setCreatePO(checked as boolean)}
            />
            <Label htmlFor="createPO" className="text-sm font-normal cursor-pointer">
              Auto-create Purchase Order
            </Label>
          </div>
        </div>
      </div>
    </FormModal>
  );
};
