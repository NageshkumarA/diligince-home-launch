import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Briefcase, Package, Truck, Wrench } from 'lucide-react';

const demoAccounts = [
  {
    role: 'Industry',
    email: 'industry@demo.com',
    password: 'demo123',
    icon: <Briefcase className="w-4 h-4" />,
    description: 'Complete industry workflow management',
    features: ['Requirements Management', 'Approval Workflows', 'Vendor Management']
  },
  {
    role: 'Professional',
    email: 'professional@demo.com',
    password: 'demo123',
    icon: <User className="w-4 h-4" />,
    description: 'Individual professional services',
    features: ['Project Opportunities', 'Calendar Management', 'Proposals']
  },
  {
    role: 'Service Vendor',
    email: 'service@demo.com',
    password: 'demo123',
    icon: <Wrench className="w-4 h-4" />,
    description: 'Service-based vendor operations',
    features: ['RFQ Management', 'Project Tracking', 'Team Management']
  },
  {
    role: 'Product Vendor',
    email: 'product@demo.com',
    password: 'demo123',
    icon: <Package className="w-4 h-4" />,
    description: 'Product catalog and order management',
    features: ['Product Catalog', 'Order Management', 'Inventory Tracking']
  },
  {
    role: 'Logistics Vendor',
    email: 'logistics@demo.com',
    password: 'demo123',
    icon: <Truck className="w-4 h-4" />,
    description: 'Transportation and logistics services',
    features: ['Fleet Management', 'Delivery Tracking', 'Route Optimization']
  }
];

interface DemoAccountsInfoProps {
  onCredentialClick?: (email: string, password: string) => void;
}

export const DemoAccountsInfo: React.FC<DemoAccountsInfoProps> = ({ onCredentialClick }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <User className="w-5 h-5" />
          Demo Accounts
        </CardTitle>
        <CardDescription>
          Click on any account credentials to auto-fill the login form
        </CardDescription>
        
        <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-xs text-blue-700 dark:text-blue-300">
            <strong>Note:</strong> These demo accounts work as automatic fallback when the real API is unavailable. 
            The system will try the real API first, then seamlessly switch to demo mode if needed.
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {demoAccounts.map((account, index) => (
            <div
              key={index}
              className="p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => onCredentialClick?.(account.email, account.password)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {account.icon}
                    {account.role}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  Click to use
                </div>
              </div>
              
              <div className="text-sm space-y-1">
                <div className="font-mono text-xs bg-muted px-2 py-1 rounded">
                  <span className="text-muted-foreground">Email:</span> {account.email}
                </div>
                <div className="font-mono text-xs bg-muted px-2 py-1 rounded">
                  <span className="text-muted-foreground">Password:</span> {account.password}
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mt-2">
                {account.description}
              </p>
              
              <div className="flex flex-wrap gap-1 mt-2">
                {account.features.map((feature, featureIndex) => (
                  <Badge key={featureIndex} variant="outline" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-primary/5 dark:bg-primary/10 border border-primary/20 dark:border-primary/30 rounded-lg">
          <p className="text-sm text-primary dark:text-primary/80">
            <strong>💡 Tip:</strong> After logging in, you'll see a role-specific sidebar with navigation items based on your user type.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};