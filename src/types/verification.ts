export enum VerificationStatus {
  INCOMPLETE = 'incomplete',
  PENDING = 'pending', 
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

export interface VerificationDocument {
  id: string;
  name: string;
  type: string; // MIME type
  size: number; // bytes
  url: string; // preview/download URL
  documentType: 'gst_certificate' | 'registration_certificate' | 'pan_card' | 'company_logo' | 'address_proof' | 'authorization_letter';
  uploadedAt: Date;
  status?: 'pending' | 'verified' | 'rejected';
  remarks?: string;
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
  panNumber: string;
  gstNumber: string;
  registrationNumber: string;
  
  // Contact
  email: string;
  mobile: string;
  telephone?: string;
  website?: string;
  
  // Address
  addresses: Address[];
  
  // Documents
  documents?: VerificationDocument[];
  
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
  'panNumber',
  'gstNumber',
  'registrationNumber',
  'email',
  'mobile',
  'addresses'
] as const;
