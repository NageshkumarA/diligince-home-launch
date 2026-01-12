import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  CreditCard, 
  Package, 
  CheckCircle, 
  Crown,
  Sparkles,
  ArrowRight,
  Zap
} from 'lucide-react';
import { CurrentPlanCard, ActiveAddOnsList } from '@/components/subscription';
import { PlanCard, AddOnCard, PricingCalculator } from '@/components/pricing';
import { mockCurrentSubscription, formatCurrency } from '@/data/mockSubscriptionData';
import { 
  plansByUserType, 
  addOns as allAddOns, 
  type UserType,
  type Plan,
  type AddOn
} from '@/data/pricingData';
import { usePricingSelection } from '@/contexts/PricingSelectionContext';
import { toast } from 'sonner';

const SubscriptionPlans = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('current');
  const { 
    selection, 
    setSelectedPlan, 
    toggleAddOn, 
    isAddOnSelected,
    hasValidSelection 
  } = usePricingSelection();

  // For demo, we'll use the user type from current subscription
  const userType: UserType = 'industry';
  const plans = plansByUserType[userType];
  const compatibleAddOns = allAddOns.filter(addon => 
    addon.compatibleUserTypes.includes(userType)
  );

  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan.code);
  };

  const handleAddOnToggle = (addOn: AddOn) => {
    toggleAddOn(addOn.code);
  };

  const handlePayment = () => {
    toast.info('Payment integration coming soon!', {
      description: 'Razorpay checkout will be available shortly.'
    });
  };

  const handleUpgrade = () => {
    setActiveTab('available');
  };

  const handlePlanAction = (action: 'signup' | 'subscribe' | 'contact') => {
    if (action === 'contact') {
      navigate('/contact');
    } else {
      handlePayment();
    }
  };

  return (
    <div className="p-6 bg-background min-h-screen space-y-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <CreditCard className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Subscription Plans</h1>
            <p className="text-muted-foreground">
              Manage your subscription and explore available plans
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="current" className="gap-2">
            <Crown className="h-4 w-4" />
            Current Plan
          </TabsTrigger>
          <TabsTrigger value="available" className="gap-2">
            <Package className="h-4 w-4" />
            Available Plans
          </TabsTrigger>
        </TabsList>

        {/* Current Plan Tab */}
        <TabsContent value="current" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CurrentPlanCard 
              subscription={mockCurrentSubscription}
              onUpgrade={handleUpgrade}
              onManage={() => toast.info('Subscription management coming soon!')}
            />
            <ActiveAddOnsList 
              addOns={mockCurrentSubscription.addOns}
              onAddMore={handleUpgrade}
            />
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Member Since</p>
                    <p className="text-lg font-semibold">June 2025</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Spent</p>
                    <p className="text-lg font-semibold">{formatCurrency(78500)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                    <Zap className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">AI Credits Used</p>
                    <p className="text-lg font-semibold">45 / 100</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Available Plans Tab */}
        <TabsContent value="available" className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Plans Section */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Choose Your Plan
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {plans.map((plan) => (
                    <PlanCard
                      key={plan.code}
                      plan={plan}
                      onAction={handlePlanAction}
                      isSelected={selection?.selectedPlan?.code === plan.code}
                      onSelect={handlePlanSelect}
                      selectionMode
                    />
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Enhance with Add-ons
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {compatibleAddOns.map((addOn, index) => (
                    <AddOnCard
                      key={addOn.code}
                      addon={addOn}
                      index={index}
                      isSelected={isAddOnSelected(addOn.code)}
                      onToggle={handleAddOnToggle}
                      selectionMode
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Pricing Calculator */}
            <div className="lg:col-span-1">
              <div className="sticky top-6">
                {hasValidSelection ? (
                  <Card className="border-2 border-primary/20">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg">Order Summary</CardTitle>
                      <CardDescription>Review your selection</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <PricingCalculator className="border-0 shadow-none p-0" />
                      <Button 
                        className="w-full gap-2 mt-4"
                        size="lg"
                        onClick={handlePayment}
                      >
                        <CreditCard className="h-4 w-4" />
                        Pay with Razorpay
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                      <p className="text-xs text-center text-muted-foreground">
                        Secure payment powered by Razorpay
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="border-dashed">
                    <CardContent className="py-12 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
                        <Package className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="font-medium mb-1">Select a plan</h3>
                      <p className="text-sm text-muted-foreground">
                        Choose a plan to see pricing details
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SubscriptionPlans;
