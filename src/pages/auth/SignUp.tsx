
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex flex-col md:flex-row flex-grow mt-16">
        {/* Left Column - Blue Background */}
        <div className="bg-primary text-white p-8 flex flex-col items-center justify-between md:w-2/5">
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
              className="w-full h-auto object-cover" 
            />
          </div>
        </div>
        
        {/* Right Column - Form Area */}
        <div className="bg-background p-8 md:w-3/5 flex flex-col items-center">
          <div className="w-full max-w-md py-8">
            <h1 className="text-2xl font-bold text-center text-primary mb-8">Create Your Account</h1>
            
            <Tabs 
              defaultValue="industry" 
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="industry">Industry</TabsTrigger>
                <TabsTrigger value="professional">Professional</TabsTrigger>
                <TabsTrigger value="vendor">Vendor</TabsTrigger>
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
            
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Already have an account? <Link to="/signin" className="text-primary font-medium hover:underline">Sign In</Link>
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
