import { CompanyProfile, REQUIRED_FIELDS } from '@/types/verification';

export const calculateProfileCompletion = (profile: Partial<CompanyProfile> | null): number => {
  if (!profile) return 0;
  
  let filledCount = 0;
  const totalRequired = REQUIRED_FIELDS.length;
  
  REQUIRED_FIELDS.forEach(field => {
    if (field === 'addresses') {
      if (profile.addresses && profile.addresses.length > 0) {
        const hasCompleteAddress = profile.addresses.some(addr => 
          addr.line1?.trim() && 
          addr.city?.trim() && 
          addr.state?.trim() && 
          addr.pincode?.trim()
        );
        if (hasCompleteAddress) filledCount++;
      }
    } else {
      const value = profile[field as keyof CompanyProfile];
      if (value && String(value).trim() !== '') {
        filledCount++;
      }
    }
  });
  
  return Math.round((filledCount / totalRequired) * 100);
};

export const getMissingFields = (profile: Partial<CompanyProfile> | null): string[] => {
  if (!profile) return [...REQUIRED_FIELDS] as any;
  
  const missing: string[] = [];
  const labels: Record<string, string> = {
    companyName: 'Company Name',
    industryFocus: 'Industry Focus',
    companyDescription: 'Company Description',
    yearEstablished: 'Year Established',
    gstNumber: 'GST Number',
    registrationNumber: 'Registration Number',
    email: 'Email',
    mobile: 'Mobile Number',
    addresses: 'Complete Address'
  };
  
  REQUIRED_FIELDS.forEach(field => {
    if (field === 'addresses') {
      const hasCompleteAddress = profile.addresses?.some(addr => 
        addr.line1?.trim() && addr.city?.trim() && addr.state?.trim() && addr.pincode?.trim()
      );
      if (!hasCompleteAddress) missing.push(labels[field]);
    } else {
      const value = profile[field as keyof CompanyProfile];
      if (!value || String(value).trim() === '') {
        missing.push(labels[field]);
      }
    }
  });
  
  return missing;
};

export const canSubmitForVerification = (profile: Partial<CompanyProfile> | null): boolean => {
  return calculateProfileCompletion(profile) === 100;
};
