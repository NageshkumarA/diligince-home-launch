
import { UserProfile, UserRole, VendorCategory } from '@/types/shared';

// Define minimum required fields for each user type
const REQUIRED_FIELDS = {
  industry: ['companyName', 'industryType'],
  professional: ['fullName', 'expertise'],
  vendor: {
    service: ['businessName', 'specialization'],
    product: ['businessName', 'specialization'],
    logistics: ['businessName', 'specialization']
  }
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

  let requiredFields: string[] = [];
  
  // Get role-specific required fields
  if (user.role === 'vendor' && user.profile.vendorCategory) {
    const vendorFields = REQUIRED_FIELDS.vendor[user.profile.vendorCategory as keyof typeof REQUIRED_FIELDS.vendor];
    requiredFields = vendorFields || ['businessName', 'specialization'];
  } else {
    requiredFields = REQUIRED_FIELDS[user.role as keyof typeof REQUIRED_FIELDS] as string[] || [];
  }

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

export const getProfileCompletionMessage = (role: UserRole, missingFields: string[], vendorCategory?: VendorCategory): string => {
  const fieldLabels: Record<string, string> = {
    companyName: 'Company Name',
    industryType: 'Industry Type',
    fullName: 'Full Name',
    expertise: 'Area of Expertise',
    businessName: 'Business Name',
    specialization: 'Specialization',
    phone: 'Phone Number',
    name: 'Name',
    email: 'Email'
  };

  const missingLabels = missingFields.map(field => fieldLabels[field] || field);
  
  if (missingLabels.length === 0) {
    return 'Your profile is complete!';
  }

  return `Please complete: ${missingLabels.join(', ')}`;
};

// Get completion incentives based on current percentage
export const getCompletionIncentives = (percentage: number): string[] => {
  const incentives = [];
  
  if (percentage < 50) {
    incentives.push('Unlock basic platform features');
    incentives.push('Receive targeted opportunities');
  } else if (percentage < 80) {
    incentives.push('Increase your visibility to clients');
    incentives.push('Access premium features');
  } else {
    incentives.push('Maximum visibility and trust score');
    incentives.push('Priority in search results');
  }
  
  return incentives;
};

// Get next completion milestone
export const getNextMilestone = (percentage: number): { target: number; message: string } => {
  if (percentage < 25) {
    return { target: 25, message: 'Complete basic information to unlock messaging' };
  } else if (percentage < 50) {
    return { target: 50, message: 'Reach 50% to appear in search results' };
  } else if (percentage < 75) {
    return { target: 75, message: 'Almost there! 75% for verified badge eligibility' };
  } else if (percentage < 100) {
    return { target: 100, message: 'Complete your profile for maximum visibility' };
  }
  
  return { target: 100, message: 'Profile complete! You\'re all set.' };
};
