import { useState, useEffect } from "react";
import { ProductVendorHeader } from "@/components/vendor/ProductVendorHeader";
import { ProductVendorSidebar } from "@/components/vendor/product/ProductVendorSidebar";
import CompanyInfoForm from "@/components/vendor/forms/ProductVendor/CompanyInfoForm";
import ProductCatalogSection from "@/components/vendor/forms/ProductVendor/ProductCatalogSection";
import BrandsPartnersSection from "@/components/vendor/forms/ProductVendor/BrandsPartnersSection";
import CertificationsSection from "@/components/vendor/forms/ProductVendor/CertificationsSection";
import ShippingReturnsSection from "@/components/vendor/forms/ProductVendor/ShippingReturnsSection";
import PaymentSettingsForm from "@/components/vendor/forms/PaymentSettingsForm";
import AccountSettingsForm from "@/components/vendor/forms/AccountSettingsForm";
import { ProfileCompletionWidget } from "@/components/shared/ProfileCompletionWidget";
import { useUser } from "@/contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { calculateProfileCompleteness } from "@/utils/profileCompleteness";

// Types for content sections
export type ContentType =
  | "company-info"
  | "product-catalog"
  | "brands-partners"
  | "certifications"
  | "shipping-returns"
  | "payment-settings"
  | "account-settings";

const ProductVendorProfile = () => {
  const { user, isAuthenticated } = useUser();
  const navigate = useNavigate();

  const [activeContent, setActiveContent] =
    useState<ContentType>("company-info");

  // ✅ menuConfig paths for vendor
  const headerNavItems = [
    { label: "Dashboard", href: "/dashboard/vendor" },
    { label: "RFQs", href: "/dashboard/vendor-rfqs" },
    { label: "Orders", href: "/dashboard/vendor-orders" },
    { label: "Profile", href: "/dashboard/vendor-profile", active: true },
  ];

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  // Calculate actual profile completion based on current user data
  const profileCompletion = user
    ? calculateProfileCompleteness(user)
    : {
        percentage: 0,
        isComplete: false,
        missingFields: [],
        completedFields: [],
      };

  // Vendor data from user context
  const vendorData = {
    companyName: user?.profile?.businessName || "TechPro Supplies",
    specialization: user?.profile?.specialization || "Industrial Components",
    initials: user?.initials || "TS",
    isVerified: true,
  };

  // Handle profile completion action
  const handleCompleteProfile = () => {
    navigate("/dashboard/vendor-profile/completion");
  };

  const handleMenuItemClick = (contentType: ContentType) => {
    setActiveContent(contentType);
  };

  const renderContent = () => {
    switch (activeContent) {
      case "company-info":
        return <CompanyInfoForm />;
      case "product-catalog":
        return <ProductCatalogSection />;
      case "brands-partners":
        return <BrandsPartnersSection />;
      case "certifications":
        return <CertificationsSection />;
      case "shipping-returns":
        return <ShippingReturnsSection />;
      case "payment-settings":
        return <PaymentSettingsForm />;
      case "account-settings":
        return <AccountSettingsForm />;
      default:
        return <CompanyInfoForm />;
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* ✅ with navItems */}
      {/* <ProductVendorHeader navItems={headerNavItems} /> */}

      <div className="flex flex-grow pt-16">
        <ProductVendorSidebar
          activeSection={activeContent}
          onSectionChange={handleMenuItemClick}
          vendorData={vendorData}
          profileCompletion={profileCompletion.percentage}
        />

        <main className="flex-1 p-6 lg:p-8 overflow-y-auto bg-gray-50">
          <div className="w-full max-w-4xl mx-auto">
            {/* Profile Completion Widget */}
            <ProfileCompletionWidget
              completion={profileCompletion}
              onCompleteProfile={handleCompleteProfile}
              showCompleteButton={!profileCompletion.isComplete}
            />

            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductVendorProfile;
