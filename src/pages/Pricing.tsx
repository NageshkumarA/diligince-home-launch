import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'pro' | 'enterprise'>('pro');
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/signup");
  };

  const handleSubscribe = () => {
    // In a real app, this would redirect to payment processing
    navigate("/signup");
  };

  const handleContactSales = () => {
    navigate("/contact");
  };

  const handleContactUs = () => {
    navigate("/contact");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <section className="py-12">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-16">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Choose the plan that works best for your business needs with our freemium model.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Free Tier */}
              <Card 
                className={`bg-white border cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedPlan === 'free' 
                    ? 'border-2 border-blue-500 shadow-lg' 
                    : 'border border-gray-100 shadow-sm hover:shadow-md'
                }`}
                onClick={() => setSelectedPlan('free')}
              >
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-gray-900">Free</CardTitle>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-gray-900">₹0</span>
                    <span className="text-gray-500 ml-1">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Basic profile creation</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Limited matching capabilities</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Access to marketplace</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Basic search functionality</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleGetStarted();
                    }}
                  >
                    Get Started
                  </Button>
                </CardFooter>
              </Card>

              {/* Pro Tier */}
              <Card 
                className={`bg-white border cursor-pointer relative transition-all duration-300 hover:shadow-lg ${
                  selectedPlan === 'pro' 
                    ? 'border-2 border-blue-500 shadow-lg' 
                    : 'border border-gray-100 shadow-sm hover:shadow-md'
                }`}
                onClick={() => setSelectedPlan('pro')}
              >
                <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 text-sm font-medium rounded-bl-lg rounded-tr-lg">
                  Popular
                </div>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-gray-900">Pro</CardTitle>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-gray-900">₹500</span>
                    <span className="text-gray-500 ml-1">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">All Free features</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Unlimited matches</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Advanced AI matching</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Detailed analytics</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Priority support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSubscribe();
                    }}
                  >
                    Subscribe Now
                  </Button>
                </CardFooter>
              </Card>

              {/* Enterprise Tier */}
              <Card 
                className={`bg-white border cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedPlan === 'enterprise' 
                    ? 'border-2 border-blue-500 shadow-lg' 
                    : 'border border-gray-100 shadow-sm hover:shadow-md'
                }`}
                onClick={() => setSelectedPlan('enterprise')}
              >
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-gray-900">Enterprise</CardTitle>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-gray-900">Custom</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">All Pro features</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Custom integration</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Dedicated account manager</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Customized reporting</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">SLA guarantees</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleContactSales();
                    }}
                  >
                    Contact Sales
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="mt-16 text-center">
              <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Transaction Fee</h2>
                <p className="text-gray-600">
                  For all successful transactions through our platform, we charge a 5% commission fee.
                  This helps us maintain and improve our services while ensuring fair value for all parties.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Have questions about our pricing?</h3>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleContactUs}
              >
                Contact Us
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
