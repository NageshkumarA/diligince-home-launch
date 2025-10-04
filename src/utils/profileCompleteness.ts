// utils/profileCompletionUtils.ts
import { UserProfile, UserRole, VendorCategory } from "@/types/shared";

// Minimum required fields for each user type
const REQUIRED_FIELDS = {
  industry: ["name", "email", "companyName", "industryType"],
  professional: ["name", "email", "fullName", "expertise"],
  vendor: {
    service: ["name", "email", "businessName", "specialization", "phone"],
    product: [
      "name",
      "email",
      "businessName",
      "specialization",
      "phone",
      "address",
      "registrationNumber",
    ],
    logistics: ["name", "email", "businessName", "specialization", "phone"],
  },
};

// Define completion thresholds
export const PROFILE_COMPLETION_THRESHOLD = 80;

export interface ProfileCompletion {
  percentage: number;
  isComplete: boolean;
  missingFields: string[];
  completedFields: string[];
}

export const calculateProfileCompleteness = (
  user: UserProfile | null | undefined
): ProfileCompletion => {
  if (!user) {
    return {
      percentage: 0,
      isComplete: false,
      missingFields: [],
      completedFields: [],
    };
  }

  let requiredFields: string[] = [];

  // Get role-specific required fields
  if (user.role === "vendor" && user.profile?.vendorCategory) {
    const vendorCategory = user.profile
      .vendorCategory as keyof typeof REQUIRED_FIELDS.vendor;
    requiredFields = REQUIRED_FIELDS.vendor[vendorCategory] || [
      "name",
      "email",
      "businessName",
      "specialization",
    ];
  } else if (user.role === "industry" || user.role === "professional") {
    requiredFields = REQUIRED_FIELDS[user.role] || ["name", "email"];
  } else {
    // Default fields
    requiredFields = ["name", "email"];
  }

  const completedFields: string[] = [];
  const missingFields: string[] = [];

  requiredFields.forEach((field) => {
    let fieldValue: unknown;

    // Top-level fields
    if (field === "name" || field === "email") {
      fieldValue = user[field as keyof UserProfile];
    } else if (user.profile) {
      // Profile fields
      fieldValue = user.profile[field as keyof typeof user.profile];
    }

    if (fieldValue && String(fieldValue).trim() !== "") {
      completedFields.push(field);
    } else {
      missingFields.push(field);
    }
  });

  const totalFields = requiredFields.length;
  const percentage =
    totalFields > 0
      ? Math.round((completedFields.length / totalFields) * 100)
      : 0;
  const isComplete = percentage >= PROFILE_COMPLETION_THRESHOLD;

  return {
    percentage,
    isComplete,
    missingFields,
    completedFields,
  };
};

// Generate user-friendly messages for missing fields
export const getProfileCompletionMessage = (
  role: UserRole,
  missingFields: string[],
  vendorCategory?: VendorCategory
): string => {
  const fieldLabels: Record<string, string> = {
    companyName: "Company Name",
    industryType: "Industry Type",
    fullName: "Full Name",
    expertise: "Area of Expertise",
    businessName: "Business Name",
    specialization: "Specialization",
    phone: "Phone Number",
    name: "Name",
    email: "Email",
    address: "Address",
    registrationNumber: "Registration Number",
  };

  const missingLabels = missingFields.map(
    (field) => fieldLabels[field] || field
  );

  if (missingLabels.length === 0) {
    return "Your profile is complete!";
  }

  return `Please complete: ${missingLabels.join(", ")}`;
};

// Incentives based on profile completion
export const getCompletionIncentives = (percentage: number): string[] => {
  if (percentage < 25) {
    return [
      "Complete basic information to get started",
      "Add your contact details",
    ];
  } else if (percentage < 50) {
    return [
      "Add business information to improve visibility",
      "Complete your specialization details",
    ];
  } else if (percentage < 75) {
    return [
      "Almost there! Add remaining details",
      "Complete profile for better opportunities",
    ];
  } else if (percentage < 100) {
    return ["Final step - complete all information", "Unlock maximum benefits"];
  }
  return ["Maximum visibility and trust score", "Priority in search results"];
};

// Next milestone calculation
export const getNextMilestone = (
  percentage: number
): { target: number; message: string } => {
  if (percentage < 25) {
    return {
      target: 25,
      message: "Complete basic information to unlock messaging",
    };
  } else if (percentage < 50) {
    return {
      target: 50,
      message: "Reach 50% to appear in search results",
    };
  } else if (percentage < 75) {
    return {
      target: 75,
      message: "Almost there! 75% for verified badge eligibility",
    };
  } else if (percentage < 100) {
    return {
      target: 100,
      message: "Complete your profile for maximum visibility",
    };
  }
  return { target: 100, message: "Profile complete! You're all set." };
};
