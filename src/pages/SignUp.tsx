
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IndustryForm } from "@/components/signup/IndustryForm";
import { ProfessionalForm } from "@/components/signup/ProfessionalForm";
import { VendorFormEnhanced } from "@/components/signup/VendorFormEnhanced";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SignUp = () => {
  const [activeTab, setActiveTab] = useState("industry");
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex flex-col md:flex-row flex-grow mt-16">
        {/* Left Column - Blue Background */}
        <div className="bg-blue-600 text-white p-8 flex flex-col items-center justify-between md:w-2/5">
          <div className="pt-10 md:pt-20 text-center max-w-md mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Join the Industrial Revolution</h2>
            <p className="text-base md:text-lg opacity-90">
              Sign up to unlock AI-powered services tailored for industrial excellence
            </p>
          </div>
          
          <div className="mt-8 w-full max-w-md">
            <img 
              src="/placeholder.svg" 
              alt="Industrial Professional" 
              className="w-full h-auto object-cover rounded-lg" 
            />
          </div>
        </div>
        
        {/* Right Column - Form Area */}
        <div className="bg-gray-50 p-8 md:w-3/5 flex flex-col items-center">
          <div className="w-full max-w-md py-8">
            <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">Create Your Account</h1>
            
            <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6">
              <Tabs 
                defaultValue="industry" 
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid grid-cols-3 mb-8 bg-gray-100">
                  <TabsTrigger 
                    value="industry" 
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    Industry
                  </TabsTrigger>
                  <TabsTrigger 
                    value="professional" 
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    Professional
                  </TabsTrigger>
                  <TabsTrigger 
                    value="vendor" 
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    Vendor
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="industry">
                  <IndustryForm />
                </TabsContent>
                
                <TabsContent value="professional">
                  <ProfessionalForm />
                </TabsContent>
                
                <TabsContent value="vendor">
                  <VendorFormEnhanced />
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Already have an account? <Link to="/signin" className="text-blue-600 font-medium hover:underline">Sign In</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default SignUp;
