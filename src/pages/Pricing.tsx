import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PublicHeader from "../components/PublicHeader";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { 
  UserTypeSelector, 
  PlanCard, 
  AddOnSection, 
  PricingFAQ,
  TransactionFeeCard 
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
        {/* Hero Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-10">
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

        {/* Pricing Cards Section */}
        <section className="py-8">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {currentPlans.map((plan) => (
                <PlanCard
                  key={plan.code}
                  plan={plan}
                  onAction={handlePlanAction}
                />
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
            <h3 className="text-xl font-semibold mb-4 text-foreground">
              Still have questions about our pricing?
            </h3>
            <Button 
              className="bg-[hsl(210,64%,23%)] hover:bg-[hsl(210,64%,18%)] text-white"
              onClick={() => navigate("/contact")}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Contact Us
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;