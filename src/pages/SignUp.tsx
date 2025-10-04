import { useState } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { IndustrySignUpForm } from "@/components/auth/forms/IndustrySignUpForm";
import { ProfessionalForm } from "@/components/signup/ProfessionalForm";
import { VendorFormEnhanced } from "@/components/signup/VendorFormEnhanced";

const SignUp: React.FC = () => {
  const [activeTab, setActiveTab] = useState("industry");

  const leftContent = {
    title: "Join the Industrial Revolution",
    description:
      "Sign up to unlock AI-powered services tailored for industrial excellence",
    imageSrc: "/placeholder.svg",
    imageAlt: "Industrial Professional",
  };

  return (
    <AuthLayout
      title="Create Your Account"
      subtitle=""
      leftContent={leftContent}
    >
      <Tabs
        defaultValue="industry"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        {/* Tab Headers */}
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

        {/* Tab Contents */}
        <TabsContent value="industry">
          <IndustrySignUpForm />
        </TabsContent>

        <TabsContent value="professional">
          <ProfessionalForm />
        </TabsContent>

        <TabsContent value="vendor">
          <VendorFormEnhanced />
        </TabsContent>
      </Tabs>

      {/* Footer Redirect */}
      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
