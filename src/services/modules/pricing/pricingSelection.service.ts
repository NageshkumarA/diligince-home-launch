/**
 * Pricing Selection Service
 * 
 * This service handles storing user pricing selections when they complete registration.
 * The selection is only stored if the user type matches between pricing page and signup form.
 * 
 * @module pricingSelectionService
 */

import { API_BASE_PATH } from '@/services/core/api.config';
import apiService from '@/services/core/api.service';
import { UserType, Plan, AddOn } from '@/data/pricingData';
import { calculatePricingBreakdown, GST_RATE } from '@/utils/pricingCalculations';

export interface StorePricingSelectionPayload {
  userId: string;
  userType: UserType;
  selectedPlanCode: string;
  selectedAddOnCodes: string[];
  pricing: {
    planMonthlyMin: number;
    planMonthlyMax: number;
    addOnsMonthlyAmount: number;
    addOnsOneTimeAmount: number;
    gstRate: number;
    estimatedFirstMonthMin: number;
    estimatedFirstMonthMax: number;
    estimatedRecurringMin: number;
    estimatedRecurringMax: number;
  };
  source: 'pricing_page';
  capturedAt: string;
}

export interface StorePricingSelectionResponse {
  success: boolean;
  data?: {
    id: string;
    message: string;
  };
  error?: {
    code: string;
    message: string;
  };
}

/**
 * Validates if the signup user type matches the pricing selection user type
 */
export const validateUserTypeMatch = (
  pricingUserType: UserType,
  signupTab: string,
  vendorCategory?: string
): boolean => {
  const mapping: Record<UserType, { tab: string; category?: string }> = {
    'industry': { tab: 'industry' },
    'service_vendor': { tab: 'vendor', category: 'service' },
    'product_vendor': { tab: 'vendor', category: 'product' },
    'logistics': { tab: 'vendor', category: 'logistics' },
    'professional': { tab: 'professional' },
  };

  const expected = mapping[pricingUserType];
  if (!expected) return false;

  if (signupTab !== expected.tab) return false;
  if (expected.category && vendorCategory && vendorCategory !== expected.category) return false;

  return true;
};

/**
 * Creates the payload for storing pricing selection
 */
export const createPricingSelectionPayload = (
  userId: string,
  userType: UserType,
  plan: Plan,
  addOns: AddOn[]
): StorePricingSelectionPayload => {
  const breakdown = calculatePricingBreakdown(plan, addOns);

  return {
    userId,
    userType,
    selectedPlanCode: plan.code,
    selectedAddOnCodes: addOns.map(a => a.code),
    pricing: {
      planMonthlyMin: breakdown.planMonthly.min,
      planMonthlyMax: breakdown.planMonthly.max,
      addOnsMonthlyAmount: breakdown.addOnsMonthly,
      addOnsOneTimeAmount: breakdown.addOnsOneTime,
      gstRate: GST_RATE * 100,
      estimatedFirstMonthMin: breakdown.firstMonthTotal.min,
      estimatedFirstMonthMax: breakdown.firstMonthTotal.max,
      estimatedRecurringMin: breakdown.recurringMonthly.min,
      estimatedRecurringMax: breakdown.recurringMonthly.max,
    },
    source: 'pricing_page',
    capturedAt: new Date().toISOString(),
  };
};

export const pricingSelectionService = {
  /**
   * Store the pricing selection for a newly registered user
   * 
   * @param payload - The pricing selection data to store
   * @returns Promise with the API response
   */
  storePricingSelection: async (
    payload: StorePricingSelectionPayload
  ): Promise<StorePricingSelectionResponse> => {
    try {
      // TODO: Replace with actual API call when backend is ready
      // const response = await apiService.post<StorePricingSelectionResponse>(
      //   `${API_BASE_PATH}/pricing-selections`,
      //   payload
      // );
      // return response;

      // Placeholder: Log the payload and return mock success
      console.log('[PricingSelection] Would store pricing selection:', payload);
      
      return {
        success: true,
        data: {
          id: `ps_${Date.now()}`,
          message: 'Pricing selection stored successfully (mock)',
        },
      };
    } catch (error) {
      console.error('[PricingSelection] Error storing selection:', error);
      return {
        success: false,
        error: {
          code: 'STORAGE_FAILED',
          message: 'Failed to store pricing selection',
        },
      };
    }
  },

  /**
   * Convenience method to store selection after successful signup
   * Only stores if user type matches
   */
  storeSelectionOnSignup: async (
    userId: string,
    signupTab: string,
    pricingUserType: UserType,
    plan: Plan,
    addOns: AddOn[],
    vendorCategory?: string
  ): Promise<StorePricingSelectionResponse> => {
    // Validate user type match
    if (!validateUserTypeMatch(pricingUserType, signupTab, vendorCategory)) {
      console.log('[PricingSelection] User type mismatch, not storing selection');
      return {
        success: false,
        error: {
          code: 'USER_TYPE_MISMATCH',
          message: 'Pricing selection user type does not match signup user type',
        },
      };
    }

    // Create and store payload
    const payload = createPricingSelectionPayload(userId, pricingUserType, plan, addOns);
    return pricingSelectionService.storePricingSelection(payload);
  },
};

export default pricingSelectionService;
