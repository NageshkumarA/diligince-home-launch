
import { useState } from "react";
import VendorHeader from "@/components/vendor/VendorHeader";
import VendorSidebar from "@/components/vendor/VendorSidebar";
import CompanyInfoForm from "@/components/vendor/forms/CompanyInfoForm";
import TeamMembersSection from "@/components/vendor/forms/TeamMembersSection";
import ServicesSkillsForm from "@/components/vendor/forms/ServicesSkillsForm";
import CertificationsSection from "@/components/vendor/forms/CertificationsSection";
import ProjectsPortfolioSection from "@/components/vendor/forms/ProjectsPortfolioSection";
import PaymentSettingsForm from "@/components/vendor/forms/PaymentSettingsForm";
import AccountSettingsForm from "@/components/vendor/forms/AccountSettingsForm";

export type ContentType = 
  | "company-info" 
  | "team-members" 
  | "services-skills" 
  | "certifications" 
  | "projects-portfolio" 
  | "payment-settings" 
  | "account-settings";

const ServiceVendorProfile = () => {
  console.log("ServiceVendorProfile component rendering");
  
  const [activeContent, setActiveContent] = useState<ContentType>("company-info");
  const [profileCompletion, setProfileCompletion] = useState(65);
  
  const vendorData = {
    companyName: "TechServe Solutions",
    specialization: "Industrial Automation",
    initials: "TS",
    isVerified: true
  };

  console.log("Current active content:", activeContent);
  console.log("Vendor data:", vendorData);

  const handleMenuItemClick = (contentType: ContentType) => {
    console.log("Menu item clicked:", contentType);
    setActiveContent(contentType);
  };

  const renderContent = () => {
    console.log("Rendering content for:", activeContent);
    
    try {
      switch (activeContent) {
        case "company-info":
          return <CompanyInfoForm />;
        case "team-members":
          return <TeamMembersSection />;
        case "services-skills":
          return <ServicesSkillsForm />;
        case "certifications":
          return <CertificationsSection />;
        case "projects-portfolio":
          return <ProjectsPortfolioSection />;
        case "payment-settings":
          return <PaymentSettingsForm />;
        case "account-settings":
          return <AccountSettingsForm />;
        default:
          console.log("Default case, rendering CompanyInfoForm");
          return <CompanyInfoForm />;
      }
    } catch (error) {
      console.error("Error rendering content:", error);
      return <CompanyInfoForm />;
    }
  };

  try {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <VendorHeader />
        
        <div className="flex flex-grow pt-16">
          <VendorSidebar
            vendorData={vendorData}
            activeMenuItem={activeContent}
            onMenuItemClick={handleMenuItemClick}
            profileCompletion={profileCompletion}
          />
          
          <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
            {renderContent()}
          </main>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in ServiceVendorProfile render:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Something went wrong</h1>
          <p className="text-gray-600">Please refresh the page and try again.</p>
        </div>
      </div>
    );
  }
};

export default ServiceVendorProfile;
