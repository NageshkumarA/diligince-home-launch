/**
 * Mock Authentication Service
 * Provides fallback authentication when the real API is unavailable
 * Used for development and demo purposes
 */

interface MockAuthResponse {
  success: boolean;
  data?: {
    data: {
      user: {
        id: string;
        email: string;
        role: string;
        profile: {
          firstName: string;
          lastName: string;
          companyName?: string;
          vendorCategory?: 'service' | 'product' | 'logistics';
          isProfileComplete: boolean;
        };
      };
    };
    meta: {
      access_token: string;
      refresh_token: string;
    };
  };
  error?: string;
}

// Demo accounts matching DemoAccountsInfo
const mockUsers = [
  {
    email: 'industry@demo.com',
    password: 'demo123',
    user: {
      id: 'mock-industry-1',
      email: 'industry@demo.com',
      role: 'IndustryAdmin',
      profile: {
        firstName: 'Industry',
        lastName: 'Administrator',
        companyName: 'Demo Industry Corp',
        isProfileComplete: true,
      },
    },
  },
  {
    email: 'professional@demo.com',
    password: 'demo123',
    user: {
      id: 'mock-professional-1',
      email: 'professional@demo.com',
      role: 'Professional',
      profile: {
        firstName: 'Professional',
        lastName: 'Consultant',
        isProfileComplete: true,
      },
    },
  },
  {
    email: 'service@demo.com',
    password: 'demo123',
    user: {
      id: 'mock-service-vendor-1',
      email: 'service@demo.com',
      role: 'Vendor',
      profile: {
        firstName: 'Service',
        lastName: 'Vendor',
        companyName: 'Demo Services Ltd',
        vendorCategory: 'service' as const,
        isProfileComplete: true,
      },
    },
  },
  {
    email: 'product@demo.com',
    password: 'demo123',
    user: {
      id: 'mock-product-vendor-1',
      email: 'product@demo.com',
      role: 'Vendor',
      profile: {
        firstName: 'Product',
        lastName: 'Vendor',
        companyName: 'Demo Products Inc',
        vendorCategory: 'product' as const,
        isProfileComplete: true,
      },
    },
  },
  {
    email: 'logistics@demo.com',
    password: 'demo123',
    user: {
      id: 'mock-logistics-vendor-1',
      email: 'logistics@demo.com',
      role: 'Vendor',
      profile: {
        firstName: 'Logistics',
        lastName: 'Vendor',
        companyName: 'Demo Logistics Co',
        vendorCategory: 'logistics' as const,
        isProfileComplete: true,
      },
    },
  },
];

/**
 * Generate a mock JWT token for development purposes
 */
const generateMockToken = (userId: string, type: 'access' | 'refresh'): string => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({
    sub: userId,
    type,
    iat: Date.now(),
    exp: type === 'access' ? Date.now() + 3600000 : Date.now() + 604800000, // 1h or 7d
  }));
  const signature = btoa(`mock-signature-${userId}-${type}`);
  return `${header}.${payload}.${signature}`;
};

/**
 * Mock login function
 * Simulates API login with demo accounts
 */
export const login = async (email: string, password: string): Promise<MockAuthResponse> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));

  // Find matching user
  const mockUser = mockUsers.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!mockUser) {
    return {
      success: false,
      error: 'Invalid email or password',
    };
  }

  // Generate mock tokens
  const accessToken = generateMockToken(mockUser.user.id, 'access');
  const refreshToken = generateMockToken(mockUser.user.id, 'refresh');

  return {
    success: true,
    data: {
      data: {
        user: mockUser.user,
      },
      meta: {
        access_token: accessToken,
        refresh_token: refreshToken,
      },
    },
  };
};

/**
 * Mock authentication service
 */
export const mockAuthService = {
  login,
};

export default mockAuthService;
