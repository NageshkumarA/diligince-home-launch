// Approvals module types
export interface Approval {
  id: string;
  requirementId: string;
  requirementTitle: string;
  priority: string;
  category: string;
  status: string;
  createdAt: string;
}
