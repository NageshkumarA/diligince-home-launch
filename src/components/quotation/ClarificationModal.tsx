import React, { useState } from "react";
import { FormModal } from "@/components/shared/modals/FormModal";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { Mail, Phone, User } from "lucide-react";

interface ClarificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (data: {
    message: string;
    category: string;
    urgency: string;
    ccEmails?: string;
  }) => Promise<void>;
  quotationNumber: string;
  vendorContact?: {
    email: string;
    phone: string;
    primaryContact: string;
    contactRole: string;
  };
}

export const ClarificationModal = ({
  isOpen,
  onClose,
  onSend,
  quotationNumber,
  vendorContact,
}: ClarificationModalProps) => {
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState<string>("other");
  const [urgency, setUrgency] = useState<string>("medium");
  const [ccEmails, setCcEmails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSend({
        message,
        category,
        urgency,
        ccEmails: ccEmails || undefined,
      });
      setMessage("");
      setCategory("other");
      setUrgency("medium");
      setCcEmails("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title="Request Clarification"
      onSubmit={handleSubmit}
      submitText="Send Request"
      submitVariant="default"
      isSubmitting={isSubmitting}
      maxWidth="max-w-3xl"
    >
      <div className="space-y-4">
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground mb-2">
            Request clarification for quotation <span className="font-semibold text-foreground">{quotationNumber}</span>
          </p>
        </div>

        {vendorContact && (
          <Card className="p-4">
            <h4 className="text-sm font-medium mb-3">Vendor Contact Information</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{vendorContact.primaryContact}</span>
                <span className="text-muted-foreground">- {vendorContact.contactRole}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{vendorContact.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{vendorContact.phone}</span>
              </div>
            </div>
          </Card>
        )}

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger id="category">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pricing">Pricing</SelectItem>
              <SelectItem value="technical">Technical</SelectItem>
              <SelectItem value="timeline">Timeline</SelectItem>
              <SelectItem value="terms">Terms & Conditions</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Urgency</Label>
          <RadioGroup value={urgency} onValueChange={setUrgency} className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="low" id="low" />
              <Label htmlFor="low" className="font-normal cursor-pointer">Low</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="medium" id="medium" />
              <Label htmlFor="medium" className="font-normal cursor-pointer">Medium</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="high" id="high" />
              <Label htmlFor="high" className="font-normal cursor-pointer">High</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Clarification Message *</Label>
          <Textarea
            id="message"
            placeholder="Please provide detailed information about what you need clarification on..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ccEmails">CC Emails (Optional)</Label>
          <Input
            id="ccEmails"
            type="text"
            placeholder="email1@example.com, email2@example.com"
            value={ccEmails}
            onChange={(e) => setCcEmails(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Comma-separated list of email addresses to CC
          </p>
        </div>
      </div>
    </FormModal>
  );
};
