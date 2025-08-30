
export interface FormValues {
  poNumber: string;
  vendor: string;
  projectTitle: string;
  orderValue: number;
  taxPercentage: number;
  totalValue: number;
  startDate: Date;
  endDate: Date;
  paymentTerms: string;
  specialInstructions?: string;
  scopeOfWork: string;
  deliverables: {
    id: string;
    description: string;
  }[];
  paymentMilestones: {
    id: string;
    description: string;
    percentage: number;
    dueDate: Date;
  }[];
  acceptanceCriteria: {
    id: string;
    criteria: string;
  }[];
}
