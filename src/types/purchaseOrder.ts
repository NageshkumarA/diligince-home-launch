
export interface FormValues {
  vendor: string;
  projectTitle: string;
  poNumber: string;
  orderValue: number;
  taxPercentage: number;
  totalValue: number;
  startDate: Date;
  endDate: Date;
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
