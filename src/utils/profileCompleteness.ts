
import { UserProfile, UserRole, VendorCategory } from '@/types/shared';

// Define minimum required fields for each user type - Updated with more comprehensive requirements
const REQUIRED_FIELDS = {
  industry: ['name', 'email', 'companyName', 'industryType'],
  professional: ['name', 'email', 'fullName', 'expertise'],
  vendor: {
    service: ['name', 'email', 'businessName', 'specialization', 'phone'],
    product: ['name', 'email', 'businessName', 'specialization', 'phone', 'address', 'registrationNumber'],
    logistics: ['name', 'email', 'businessName', 'specialization', 'phone']
  }
};

// Define completion thresholds
export const PROFILE_COMPLETION_THRESHOLD = 80;

export interface ProfileCompletion {
  percentage: number;
  isComplete: boolean;
  missingFields: string[];
  completedFields: string[];
}

export const calculateProfileCompleteness = (user: UserProfile): ProfileCompletion => {
  console.log("Calculating profile completeness for user:", user);
  
  if (!user) {
    return {
      percentage: 0,
      isComplete: false,
      missingFields: [],
      completedFields: []
    };
  }

  let requiredFields: string[] = [];
  
  // Get role-specific required fields
  if (user.role === 'vendor' && user.profile?.vendorCategory) {
    const vendorCategory = user.profile.vendorCategory as keyof typeof REQUIRED_FIELDS.vendor;
    const vendorFields = REQUIRED_FIELDS.vendor[vendorCategory];
    requiredFields = vendorFields ? [...vendorFields] : ['name', 'email', 'businessName', 'specialization'];
  } else if (user.role === 'industry' || user.role === 'professional') {
    const roleFields = REQUIRED_FIELDS[user.role];
    requiredFields = roleFields ? [...roleFields] : ['name', 'email'];
  } else {
    // Default fields for any user
    requiredFields = ['name', 'email'];
  }

  console.log("Required fields for", user.role, ":", requiredFields);

  const completedFields: string[] = [];
  const missingFields: string[] = [];

  // Check each required field
  requiredFields.forEach(field => {
    let fieldValue;
    
    // Check if field exists in user object directly
    if (field === 'name' || field === 'email') {
      fieldValue = user[field as keyof UserProfile];
    } else if (user.profile) {
      // Check if field exists in profile object
      fieldValue = user.profile[field as keyof typeof user.profile];
    }
    
    console.log(`Checking field ${field}:`, fieldValue);
    
    if (fieldValue && String(fieldValue).trim() !== '') {
      completedFields.push(field);
    } else {
      missingFields.push(field);
    }
  });

  const totalFields = requiredFields.length;
  const percentage = totalFields > 0 ? Math.round((completedFields.length / totalFields) * 100) : 0;
  const isComplete = percentage >= PROFILE_COMPLETION_THRESHOLD;

  console.log("Profile completion result:", {
    percentage,
    isComplete,
    completedFields,
    missingFields,
    totalFields
  });

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
    email: 'Email',
    address: 'Address',
    registrationNumber: 'Registration Number'
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
  
  if (percentage < 25) {
    incentives.push('Complete basic information to get started');
    incentives.push('Add your contact details');
  } else if (percentage < 50) {
    incentives.push('Add business information to improve visibility');
    incentives.push('Complete your specialization details');
  } else if (percentage < 75) {
    incentives.push('Almost there! Add remaining details');
    incentives.push('Complete profile for better opportunities');
  } else if (percentage < 100) {
    incentives.push('Final step - complete all information');
    incentives.push('Unlock maximum platform benefits');
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
