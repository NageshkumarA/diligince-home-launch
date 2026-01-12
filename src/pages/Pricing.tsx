import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PublicHeader from "../components/PublicHeader";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle, Sparkles } from "lucide-react";
import { 
  UserTypeSelector, 
  PlanCard, 
  AddOnSection, 
  PricingFAQ,
  TransactionFeeCard,
  PricingHeroBackground,
  PricingCalculator
} from "@/components/pricing";
import { 
  UserType, 
  Plan,
  plansByUserType, 
  userTypes 
} from "@/data/pricingData";
import { usePricingSelection } from "@/contexts/PricingSelectionContext";

const Pricing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selection, setSelectedPlan, toggleAddOn, hasValidSelection } = usePricingSelection();
  
  // Parse hash to get initial user type
  const getInitialUserType = (): UserType => {
    const hash = location.hash.replace('#', '');
    const validTypes: UserType[] = ['industry', 'service_vendor', 'product_vendor', 'logistics', 'professional'];
    if (validTypes.includes(hash as UserType)) {
      return hash as UserType;
    }
    // If we have a selection, use that user type
    if (selection?.userType) {
      return selection.userType;
    }
    return 'industry';
  };

  const [selectedUserType, setSelectedUserType] = useState<UserType>(getInitialUserType);

  // Update URL hash when user type changes
  useEffect(() => {
    window.history.replaceState(null, '', `#${selectedUserType}`);
  }, [selectedUserType]);

  const handleUserTypeChange = (userType: UserType) => {
    setSelectedUserType(userType);
    // Clear plan selection if user type changes
    if (selection?.userType !== userType && selection?.selectedPlan) {
      setSelectedPlan(userType, null);
    }
  };

  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(selectedUserType, plan);
  };

  const handlePlanAction = (action: 'signup' | 'subscribe' | 'contact') => {
    switch (action) {
      case 'signup':
        navigate("/signup");
        break;
      case 'subscribe':
        navigate("/signup");
        break;
      case 'contact':
        navigate("/contact");
        break;
    }
  };

  const currentPlans = plansByUserType[selectedUserType];
  const currentUserTypeConfig = userTypes.find(t => t.id === selectedUserType);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PublicHeader />
      <main className="flex-grow pt-24 pb-16">
        {/* Hero Section with AI Background */}
        <PricingHeroBackground>
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4 md:px-8">
              <div className="text-center mb-10 animate-fade-in">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[hsl(210,64%,23%,0.08)] border border-[hsl(210,64%,23%,0.15)] mb-4">
                  <Sparkles className="h-4 w-4 text-[hsl(210,64%,23%)]" />
                  <span className="text-sm font-medium text-[hsl(210,64%,23%)]">AI-Powered Pricing</span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  Flexible Plans for Every Business
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Choose your role and find the perfect plan to grow your business on Diligince
                </p>
              </div>

              {/* User Type Selector */}
              <UserTypeSelector
                selectedType={selectedUserType}
                onSelect={handleUserTypeChange}
              />
            </div>
          </section>
        </PricingHeroBackground>

        {/* Pricing Cards Section with Calculator */}
        <section className="py-8">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
              {/* Left Column: Plans + Add-ons (Scrollable) */}
              <div className="flex-1">
                {/* Plan Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentPlans.map((plan, index) => (
                    <div 
                      key={plan.code}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <PlanCard
                        plan={plan}
                        onAction={handlePlanAction}
                        selectionMode={true}
                        isSelected={selection?.selectedPlan?.code === plan.code && selection?.userType === selectedUserType}
                        onSelect={handlePlanSelect}
                      />
                    </div>
                  ))}
                </div>

                {/* Add-ons Section - Inside left column */}
                <div className="mt-10">
                  <AddOnSection 
                    userType={selectedUserType}
                    selectionMode={hasValidSelection}
                    selectedAddOns={selection?.selectedAddOns || []}
                    onToggleAddOn={toggleAddOn}
                  />
                </div>
              </div>

              {/* Right Column: Calculator (Sticky) */}
              <div className="lg:w-[340px] xl:w-[380px]">
                <div className="lg:sticky lg:top-24">
                  <PricingCalculator />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Transaction Fee + Still Have Questions - Side by Side */}
        <section className="py-8">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {/* Transaction Fee Card */}
              <TransactionFeeCard />
              
              {/* Still Have Questions Card */}
              <Card className="group relative p-6 bg-white/70 backdrop-blur-sm border border-[hsl(210,64%,23%,0.15)] h-full overflow-hidden transition-all duration-500 hover:shadow-lg hover:border-[hsl(210,64%,23%,0.25)] flex flex-col justify-center items-center text-center">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-[hsl(210,64%,23%,0.05)] via-transparent to-[hsl(210,64%,23%,0.05)]" />
                </div>
                <div className="relative">
                  <h3 className="text-xl font-semibold mb-2 text-foreground flex items-center justify-center gap-2">
                    Still have questions?
                    <Sparkles className="h-4 w-4 text-[hsl(210,64%,23%)] opacity-60" />
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Our team is here to help you find the perfect plan
                  </p>
                  <Button 
                    className="bg-gradient-to-r from-[hsl(210,64%,23%)] to-[hsl(210,64%,28%)] hover:from-[hsl(210,64%,18%)] hover:to-[hsl(210,64%,23%)] text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                    onClick={() => navigate("/contact")}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Contact Us
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-8">
          <div className="container mx-auto px-4 md:px-8">
            <PricingFAQ />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
