// Requirement Feed Types with AI Recommendations

export type RequirementCategory = 'service' | 'product' | 'logistics' | 'professional';
export type RequirementStatus = 'published' | 'closing-soon' | 'invited' | 'new';
export type RequirementPriority = 'critical' | 'high' | 'medium' | 'low';

export interface AIRecommendation {
  relevanceScore: number; // 0-100
  reasoning: string;
  matchFactors: string[];
  suggestedBid?: string;
  estimatedWinProbability?: number;
  competitorCount?: number;
  clientRating?: number;
}

export interface RequirementWithAI {
  // Basic Requirement Data
  id: string;
  title: string;
  description: string;
  category: RequirementCategory;
  priority: RequirementPriority;
  deadline: string;
  budget: string;
  status: RequirementStatus;
  company: string;
  location: string;
  postedDate: string;
  responses: number;
  requirements: string[];
  
  // AI Recommendation Data (optional)
  aiRecommendation?: AIRecommendation;
}

export interface BrowseFilters {
  category?: RequirementCategory;
  minBudget?: number;
  maxBudget?: number;
  location?: string;
  deadline?: string;
  status?: RequirementStatus;
  search?: string;
  page?: number;
  limit?: number;
}

export interface RequirementListResponse {
  requirements: RequirementWithAI[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface RequirementsFeedStats {
  totalAvailable: number;
  aiRecommended: number;
  yourApplications: number;
  closingSoon: number;
}
