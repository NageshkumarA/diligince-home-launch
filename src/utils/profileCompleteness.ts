
import { UserProfile, UserRole } from '@/types/shared';

// Define minimum required fields for each user type
const REQUIRED_FIELDS = {
  industry: ['companyName', 'industryType'],
  professional: ['fullName', 'expertise'],
  vendor: ['businessName', 'vendorCategory', 'specialization']
} as const;

// Define completion thresholds
export const PROFILE_COMPLETION_THRESHOLD = 80;

export interface ProfileCompletion {
  percentage: number;
  isComplete: boolean;
  missingFields: string[];
  completedFields: string[];
}

export const calculateProfileCompleteness = (user: UserProfile): ProfileCompletion => {
  if (!user || !user.profile) {
    return {
      percentage: 0,
      isComplete: false,
      missingFields: [],
      completedFields: []
    };
  }

  const requiredFields = REQUIRED_FIELDS[user.role as keyof typeof REQUIRED_FIELDS] || [];
  const profile = user.profile;
  
  const completedFields: string[] = [];
  const missingFields: string[] = [];

  // Check basic profile fields
  const basicFields = ['name', 'email'];
  basicFields.forEach(field => {
    if (user[field as keyof UserProfile]) {
      completedFields.push(field);
    } else {
      missingFields.push(field);
    }
  });

  // Check role-specific required fields
  requiredFields.forEach(field => {
    if (profile[field as keyof typeof profile]) {
      completedFields.push(field);
    } else {
      missingFields.push(field);
    }
  });

  // Additional optional fields that improve completion
  const optionalFields = ['phone'];
  optionalFields.forEach(field => {
    if (profile[field as keyof typeof profile]) {
      completedFields.push(field);
    }
  });

  const totalFields = basicFields.length + requiredFields.length + optionalFields.length;
  const percentage = Math.round((completedFields.length / totalFields) * 100);
  const isComplete = percentage >= PROFILE_COMPLETION_THRESHOLD;

  return {
    percentage,
    isComplete,
    missingFields,
    completedFields
  };
};

export const getProfileCompletionMessage = (role: UserRole, missingFields: string[]): string => {
  const fieldLabels: Record<string, string> = {
    companyName: 'Company Name',
    industryType: 'Industry Type',
    fullName: 'Full Name',
    expertise: 'Area of Expertise',
    businessName: 'Business Name',
    vendorCategory: 'Vendor Category',
    specialization: 'Specialization',
    phone: 'Phone Number'
  };

  const missingLabels = missingFields.map(field => fieldLabels[field] || field);
  
  if (missingLabels.length === 0) {
    return 'Your profile is complete!';
  }

  return `Please complete: ${missingLabels.join(', ')}`;
};
