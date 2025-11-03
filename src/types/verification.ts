export enum VerificationStatus {
  INCOMPLETE = 'incomplete',
  PENDING = 'pending', 
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

export interface Address {
  line1: string;
  city: string;
  state: string;
  pincode: string;
  isPrimary: boolean;
}

export interface CompanyProfile {
  // Basic Info
  companyName: string;
  industryFocus: string;
  companyDescription: string;
  yearEstablished: string;
  
  // Legal
  gstNumber: string;
  registrationNumber: string;
  
  // Contact
  email: string;
  mobile: string;
  telephone?: string;
  website?: string;
  
  // Address
  addresses: Address[];
  
  // Verification
  verificationStatus: VerificationStatus;
  verificationSubmittedAt?: string;
  verificationCompletedAt?: string;
  verificationRemarks?: string;
  
  // Completion
  isProfileComplete: boolean;
  profileCompletionPercentage: number;
}

export const REQUIRED_FIELDS = [
  'companyName',
  'industryFocus',
  'companyDescription',
  'yearEstablished',
  'gstNumber',
  'registrationNumber',
  'email',
  'mobile',
  'addresses'
] as const;
