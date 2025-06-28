
export interface RFQFormData {
  requirementTitle: string;
  stakeholderName: string;
  stakeholderType: string;
  quoteDescription: string;
  deliveryTimeline: string;
  termsAndConditions: string;
}

export interface RFQModalProps {
  isOpen: boolean;
  onClose: () => void;
  stakeholder: {
    id: string;
    name: string;
    type: string;
  };
  requirementTitle: string;
  onSendRFQ: (stakeholderId: string) => void;
}
