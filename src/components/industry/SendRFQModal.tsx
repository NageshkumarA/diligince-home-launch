
import React, { useState } from 'react';
import { BaseModal } from '@/components/shared/modals/BaseModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { FileText, Send } from 'lucide-react';
import { RFQModalProps } from '@/types/rfq';

export const SendRFQModal = ({
  isOpen,
  onClose,
  stakeholder,
  requirementTitle,
  onSendRFQ
}: RFQModalProps) => {
  const [formData, setFormData] = useState({
    quoteDescription: '',
    deliveryTimeline: '',
    termsAndConditions: 'As per standard industry terms and conditions. Payment terms: 30% advance, 50% on delivery, 20% after installation.'
  });

  const handleSendRFQ = () => {
    // Static implementation - just trigger the callback
    onSendRFQ(stakeholder.id);
    onClose();
  };

  const getStakeholderTypeColor = (type: string) => {
    switch (type) {
      case 'Product Vendor':
        return 'bg-purple-100 text-purple-800';
      case 'Service Vendor':
        return 'bg-blue-100 text-blue-800';
      case 'Logistics Vendor':
        return 'bg-orange-100 text-orange-800';
      case 'Professional Expert':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Send Request for Quotation (RFQ)"
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6">
        {/* Header Info */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <h3 className="font-medium text-blue-800">RFQ Details</h3>
          </div>
          <p className="text-sm text-blue-700">
            You are sending an RFQ to <strong>{stakeholder.name}</strong> for your requirement.
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Readonly Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="requirement-title">Requirement Title</Label>
              <Input
                id="requirement-title"
                value={requirementTitle}
                readOnly
                className="bg-gray-50 border-gray-200"
              />
            </div>
            <div>
              <Label htmlFor="stakeholder-info">Stakeholder</Label>
              <div className="flex items-center gap-2 p-2 bg-gray-50 border border-gray-200 rounded-md">
                <span className="font-medium text-gray-900">{stakeholder.name}</span>
                <Badge className={getStakeholderTypeColor(stakeholder.type)}>
                  {stakeholder.type}
                </Badge>
              </div>
            </div>
          </div>

          {/* Quote Description */}
          <div>
            <Label htmlFor="quote-description">Quote Description *</Label>
            <Textarea
              id="quote-description"
              value={formData.quoteDescription}
              onChange={(e) => setFormData(prev => ({ ...prev, quoteDescription: e.target.value }))}
              placeholder="Please provide detailed specifications, quality requirements, and any specific needs for this quotation..."
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Delivery Timeline */}
          <div>
            <Label htmlFor="delivery-timeline">Expected Delivery Timeline *</Label>
            <Input
              id="delivery-timeline"
              value={formData.deliveryTimeline}
              onChange={(e) => setFormData(prev => ({ ...prev, deliveryTimeline: e.target.value }))}
              placeholder="e.g., 2-3 weeks, 1 month, etc."
            />
          </div>

          {/* Terms & Conditions */}
          <div>
            <Label htmlFor="terms-conditions">Terms & Conditions</Label>
            <Textarea
              id="terms-conditions"
              value={formData.termsAndConditions}
              onChange={(e) => setFormData(prev => ({ ...prev, termsAndConditions: e.target.value }))}
              rows={3}
              className="resize-none"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSendRFQ}
            disabled={!formData.quoteDescription.trim() || !formData.deliveryTimeline.trim()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="h-4 w-4 mr-2" />
            Send RFQ
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};
