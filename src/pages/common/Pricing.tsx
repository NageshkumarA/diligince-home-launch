
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "₹0",
      period: "Forever",
      description: "Perfect for getting started with the platform",
      features: [
        "Browse marketplace",
        "Basic profile creation",
        "Contact vendors/professionals",
        "View public information",
        "Community support"
      ],
      limitations: [
        "Limited to 3 requirements per month",
        "No priority support",
        "Basic matching algorithm"
      ],
      popular: false,
      cta: "Get Started"
    },
    {
      name: "Professional",
      price: "₹2,999",
      period: "per month",
      description: "Best for growing businesses and active procurement",
      features: [
        "Unlimited requirements",
        "Advanced matching algorithms",
        "Priority support",
        "Analytics dashboard",
        "Document management",
        "RFQ management",
        "Vendor comparison tools",
        "Basic API access"
      ],
      limitations: [],
      popular: true,
      cta: "Start Free Trial"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      description: "For large organizations with complex needs",
      features: [
        "Everything in Professional",
        "Custom integrations",
        "Dedicated account manager",
        "SLA guarantees",
        "Advanced security features",
        "Custom workflows",
        "Multi-location support",
        "Full API access",
        "White-label options"
      ],
      limitations: [],
      popular: false,
      cta: "Contact Sales"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <section className="py-12">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Simple, Transparent Pricing
              </h1>
              <p className="text-gray-600 max-w-3xl mx-auto text-lg">
                Choose the plan that's right for your business. All plans include access to our 
                comprehensive industrial ecosystem platform.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <Card key={index} className={`relative ${plan.popular ? 'border-2 border-blue-500 shadow-lg' : ''}`}>
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      {plan.price !== "Custom" && (
                        <span className="text-gray-600 ml-1">/{plan.period}</span>
                      )}
                      {plan.price === "Custom" && (
                        <span className="text-gray-600 ml-1">{plan.period}</span>
                      )}
                    </div>
                    <CardDescription className="mt-2">{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">What's included:</h4>
                        <ul className="space-y-2">
                          {plan.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start">
                              <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-600">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {plan.limitations.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Limitations:</h4>
                          <ul className="space-y-2">
                            {plan.limitations.map((limitation, limitIndex) => (
                              <li key={limitIndex} className="flex items-start">
                                <X className="h-5 w-5 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-500">{limitation}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    
                    <Button 
                      className={`w-full mt-8 ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                      variant={plan.popular ? 'default' : 'outline'}
                    >
                      {plan.cta}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-16 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
              <div className="max-w-3xl mx-auto space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-2">Can I change plans anytime?</h3>
                    <p className="text-gray-600">
                      Yes, you can upgrade or downgrade your plan at any time. Changes take effect 
                      immediately, and billing is prorated.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-2">Is there a free trial?</h3>
                    <p className="text-gray-600">
                      We offer a 14-day free trial for the Professional plan. No credit card required 
                      to start your trial.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-2">What payment methods do you accept?</h3>
                    <p className="text-gray-600">
                      We accept all major credit cards, debit cards, UPI, and bank transfers. 
                      Enterprise customers can also pay via invoice.
                    </p>
                  </CardContent>
                </Card>
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
