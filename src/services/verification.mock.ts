import { CompanyProfile, VerificationStatus } from '@/types/verification';

export const MOCK_INCOMPLETE_PROFILE: Partial<CompanyProfile> = {
  companyName: "TechPro Industries",
  industryFocus: "manufacturing",
  verificationStatus: VerificationStatus.INCOMPLETE,
  isProfileComplete: false,
  profileCompletionPercentage: 30,
  addresses: []
};

export const MOCK_COMPLETE_PROFILE: CompanyProfile = {
  companyName: "TechPro Industries",
  industryFocus: "manufacturing",
  companyDescription: "Leading manufacturer of industrial automation equipment and solutions specialized in cutting-edge technology.",
  yearEstablished: "2010",
  gstNumber: "27AABCU9603R1Z5",
  registrationNumber: "U74900MH2010PTC123456",
  email: "contact@techpro.com",
  mobile: "+919876543210",
  telephone: "+912240123456",
  website: "https://www.techpro.com",
  addresses: [
    {
      line1: "Plot No. 123, Industrial Area, Phase 2",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      isPrimary: true
    }
  ],
  verificationStatus: VerificationStatus.INCOMPLETE,
  isProfileComplete: true,
  profileCompletionPercentage: 100
};

export const mockSaveProfile = async (profile: Partial<CompanyProfile>): Promise<{ success: boolean }> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('Mock: Saving profile...', profile);
  localStorage.setItem('company_profile', JSON.stringify(profile));
  return { success: true };
};

export const mockSubmitForVerification = async (profile: CompanyProfile): Promise<{
  success: boolean;
  verificationId: string;
  estimatedCompletionAt: string;
}> => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  console.log('Mock: Submitting for verification...', profile);
  
  const profileWithStatus = {
    ...profile,
    verificationStatus: VerificationStatus.PENDING,
    verificationSubmittedAt: new Date().toISOString()
  };
  
  localStorage.setItem('company_profile', JSON.stringify(profileWithStatus));
  localStorage.setItem('verification_status', VerificationStatus.PENDING);
  
  const estimatedCompletionAt = new Date();
  estimatedCompletionAt.setHours(estimatedCompletionAt.getHours() + 24);
  
  return {
    success: true,
    verificationId: `VER${Date.now()}`,
    estimatedCompletionAt: estimatedCompletionAt.toISOString()
  };
};

export const mockCheckVerificationStatus = async (): Promise<{
  status: VerificationStatus;
  remarks?: string;
}> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const storedStatus = localStorage.getItem('verification_status');
  if (storedStatus) {
    return { status: storedStatus as VerificationStatus };
  }
  
  const stored = localStorage.getItem('company_profile');
  if (stored) {
    const profile = JSON.parse(stored);
    return {
      status: profile.verificationStatus || VerificationStatus.INCOMPLETE,
      remarks: profile.verificationRemarks
    };
  }
  
  return { status: VerificationStatus.INCOMPLETE };
};
