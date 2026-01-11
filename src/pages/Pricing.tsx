import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PublicHeader from "../components/PublicHeader";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { MessageCircle, Sparkles } from "lucide-react";
import { 
  UserTypeSelector, 
  PlanCard, 
  AddOnSection, 
  PricingFAQ,
  TransactionFeeCard,
  PricingHeroBackground
} from "@/components/pricing";
import { 
  UserType, 
  plansByUserType, 
  userTypes 
} from "@/data/pricingData";

const Pricing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Parse hash to get initial user type
  const getInitialUserType = (): UserType => {
    const hash = location.hash.replace('#', '');
    const validTypes: UserType[] = ['industry', 'service_vendor', 'product_vendor', 'logistics', 'professional'];
    if (validTypes.includes(hash as UserType)) {
      return hash as UserType;
    }
    return 'industry';
  };

  const [selectedUserType, setSelectedUserType] = useState<UserType>(getInitialUserType);

  // Update URL hash when user type changes
  useEffect(() => {
    window.history.replaceState(null, '', `#${selectedUserType}`);
  }, [selectedUserType]);

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
                onSelect={setSelectedUserType}
              />
            </div>
          </section>
        </PricingHeroBackground>

        {/* Pricing Cards Section */}
        <section className="py-8">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {currentPlans.map((plan, index) => (
                <div 
                  key={plan.code}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <PlanCard
                    plan={plan}
                    onAction={handlePlanAction}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Add-ons Section */}
        <section className="py-8">
          <div className="container mx-auto px-4 md:px-8">
            <AddOnSection userType={selectedUserType} />
          </div>
        </section>

        {/* Transaction Fee Section */}
        <section className="py-8">
          <div className="container mx-auto px-4 md:px-8">
            <TransactionFeeCard />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-8">
          <div className="container mx-auto px-4 md:px-8">
            <PricingFAQ />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12">
          <div className="container mx-auto px-4 md:px-8 text-center">
            <div className="relative max-w-md mx-auto p-8 rounded-2xl bg-white/60 backdrop-blur-sm border border-[hsl(210,64%,23%,0.1)] shadow-lg">
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-[hsl(210,64%,23%,0.1)] via-transparent to-[hsl(210,64%,23%,0.1)] opacity-50" />
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
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;