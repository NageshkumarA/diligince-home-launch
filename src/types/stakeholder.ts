
export interface StakeholderApplication {
  id: string;
  requirementId: string;
  stakeholderId: string;
  stakeholderType: 'vendor' | 'expert' | 'logistics';
  stakeholderName: string;
  email: string;
  phone: string;
  rating: number;
  specialization: string[];
  proposalSummary: string;
  quoteAmount?: number;
  deliveryTimeWeeks?: number;
  documents: string[];
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  submittedDate: string;
  reviewedDate?: string;
  reviewComments?: string;
}

export interface StakeholderMatch {
  requirementId: string;
  stakeholderId: string;
  matchScore: number;
  matchCriteria: string[];
  notified: boolean;
  notifiedDate?: string;
}

export interface StakeholderProfile {
  id: string;
  name: string;
  type: 'product_vendor' | 'service_vendor' | 'logistics_vendor' | 'expert';
  email: string;
  phone: string;
  location: string;
  rating: number;
  completedProjects: number;
  specializations: string[];
  certifications: string[];
  description: string;
  established?: string;
  teamSize?: string;
}

export interface StakeholderInvitation {
  id: string;
  stakeholderId: string;
  email: string;
  name: string;
  type: 'vendor' | 'expert';
  invitedBy: string;
  sentDate: string;
  status: 'sent' | 'opened' | 'accepted' | 'declined';
  acceptedDate?: string;
  invitationToken?: string;
}
