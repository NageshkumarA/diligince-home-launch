import { useState, useEffect } from "react";
import { ServiceVendorHeader } from "@/components/vendor/ServiceVendorHeader";
import { ServiceVendorSidebar } from "@/components/vendor/service/ServiceVendorSidebar";
import CompanyInfoForm from "@/components/vendor/forms/CompanyInfoForm";
import TeamMembersSection from "@/components/vendor/forms/TeamMembersSection";
import ServicesSkillsForm from "@/components/vendor/forms/ServicesSkillsForm";
import CertificationsSection from "@/components/vendor/forms/CertificationsSection";
import ProjectsPortfolioSection from "@/components/vendor/forms/ProjectsPortfolioSection";
import PaymentSettingsForm from "@/components/vendor/forms/PaymentSettingsForm";
import AccountSettingsForm from "@/components/vendor/forms/AccountSettingsForm";
import { ProfileCompletionWidget } from "@/components/shared/ProfileCompletionWidget";
import { useUser } from "@/contexts/UserContext";
import { useNavigate } from "react-router-dom";

// ✅ Define allowed content types
export type ContentType =
  | "company-info"
  | "team-members"
  | "services-skills"
  | "certifications"
  | "projects-portfolio"
  | "payment-settings"
  | "account-settings";

const ServiceVendorProfile: React.FC = () => {
  const { user, isAuthenticated, profileCompletion } = useUser();
  const navigate = useNavigate();

  const [activeContent, setActiveContent] =
    useState<ContentType>("company-info");

  // Debug logs
  console.log("ServiceVendorProfile - user:", user);
  console.log("ServiceVendorProfile - profileCompletion:", profileCompletion);

  // ✅ Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  if (!user) {
    return null;
  }

  // ✅ Vendor data for sidebar
  const vendorData = {
    companyName: user?.profile?.businessName || "TechServe Solutions",
    specialization: user?.profile?.specialization || "Industrial Automation",
    initials: user?.initials || "TS",
    isVerified: true,
  };

  // ✅ Profile completion handler
  const handleCompleteProfile = () => {
    navigate("/profile-completion");
  };

  const handleMenuItemClick = (contentType: ContentType) => {
    setActiveContent(contentType);
  };

  // ✅ Dynamic content rendering
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
      {/* Header */}
      <ServiceVendorHeader />

      <div className="flex flex-grow pt-16">
        {/* Sidebar */}
        <ServiceVendorSidebar
          activeSection={activeContent}
          onSectionChange={handleMenuItemClick}
          vendorData={vendorData}
          profileCompletion={profileCompletion.percentage}
        />

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto bg-gray-50">
          <div className="w-full max-w-4xl mx-auto">
            {/* Profile Completion Widget */}
            <ProfileCompletionWidget
              completion={profileCompletion}
              onCompleteProfile={handleCompleteProfile}
              showCompleteButton={!profileCompletion.isComplete}
            />

            {/* Content Section */}
            <div className="bg-white border border-gray-100 shadow-sm rounded-lg">
              {renderContent()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ServiceVendorProfile;
