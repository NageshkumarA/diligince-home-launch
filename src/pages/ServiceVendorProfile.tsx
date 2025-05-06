
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

// Types for content sections
export type ContentType = 
  | "company-info" 
  | "team-members" 
  | "services-skills" 
  | "certifications" 
  | "projects-portfolio" 
  | "payment-settings" 
  | "account-settings";

const ServiceVendorProfile = () => {
  // State to track active content
  const [activeContent, setActiveContent] = useState<ContentType>("company-info");
  const [profileCompletion, setProfileCompletion] = useState(65); // Example value
  
  // Mock vendor data
  const vendorData = {
    companyName: "TechServe Solutions",
    specialization: "Industrial Automation",
    initials: "TS",
    isVerified: true
  };

  // Function to handle menu item click
  const handleMenuItemClick = (contentType: ContentType) => {
    setActiveContent(contentType);
  };

  // Render active content based on selection
  const renderContent = () => {
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
        return <CompanyInfoForm />;
    }
  };

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
};

export default ServiceVendorProfile;
