import { useState, useEffect } from "react";
import { User, Home, Calendar, Award, Briefcase, Wallet, Settings, LayoutGrid, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import ProfessionalHeader from "@/components/professional/ProfessionalHeader";
import ProfessionalSidebar from "@/components/professional/ProfessionalSidebar";
import PersonalInfoForm from "@/components/professional/forms/PersonalInfoForm";
import SkillsForm from "@/components/professional/forms/SkillsForm";
import CertificationsForm from "@/components/professional/forms/CertificationsForm";
import ExperienceForm from "@/components/professional/forms/ExperienceForm";
import AvailabilityCalendar from "@/components/professional/forms/AvailabilityCalendar";
import PaymentSettingsForm from "@/components/professional/forms/PaymentSettingsForm";
import AccountSettingsForm from "@/components/professional/forms/AccountSettingsForm";

// Types for the navigation menu
export type SidebarMenuItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

// Content type for the main area
export type ContentType = 
  | "personal-info" 
  | "skills" 
  | "certifications" 
  | "experience" 
  | "availability" 
  | "payment" 
  | "account";

const ProfessionalProfile = () => {
  // State to track active content
  const [activeContent, setActiveContent] = useState<ContentType>("personal-info");
  const [profileCompletion, setProfileCompletion] = useState(35); // Example profile completion percentage
  
  useEffect(() => {
    // Notify the user that the professional profile is loaded
    toast.success("Professional profile loaded successfully");
  }, []);
  
  // Mock professional data (renamed from expertData)
  const professionalData = {
    name: "Rahul Sharma",
    expertise: "Mechanical Engineering",
    initials: "RS",
  };

  // Navigation menu items
  const menuItems: SidebarMenuItem[] = [
    { id: "personal-info", label: "Personal Info", icon: <User size={18} /> },
    { id: "skills", label: "Skills & Expertise", icon: <LayoutGrid size={18} /> },
    { id: "certifications", label: "Certifications", icon: <Award size={18} /> },
    { id: "experience", label: "Experience", icon: <Briefcase size={18} /> },
    { id: "availability", label: "Availability Calendar", icon: <Calendar size={18} /> },
    { id: "payment", label: "Payment Settings", icon: <Wallet size={18} /> },
    { id: "account", label: "Account Settings", icon: <Settings size={18} /> },
  ];

  // Header navigation items
  const headerNavItems = [
    { label: "Dashboard", icon: <Home size={18} />, href: "/expert-dashboard" },
    { label: "Opportunities", icon: <Briefcase size={18} />, href: "/expert-opportunities" },
    { label: "Calendar", icon: <Calendar size={18} />, href: "/expert-calendar" },
    { label: "Messages", icon: <MessageSquare size={18} />, href: "/expert-messages" },
    { label: "Profile", icon: <User size={18} />, href: "/expert-profile", active: true },
  ];

  // Function to handle menu item click
  const handleMenuItemClick = (contentType: ContentType) => {
    setActiveContent(contentType);
  };

  // Render active content based on selection
  const renderContent = () => {
    switch (activeContent) {
      case "personal-info":
        return <PersonalInfoForm />;
      case "skills":
        return <SkillsForm />;
      case "certifications":
        return <CertificationsForm />;
      case "experience":
        return <ExperienceForm />;
      case "availability":
        return <AvailabilityCalendar />;
      case "payment":
        return <PaymentSettingsForm />;
      case "account":
        return <AccountSettingsForm />;
      default:
        return <PersonalInfoForm />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <ProfessionalHeader navItems={headerNavItems} />
      
      <div className="flex flex-grow pt-16">
        <ProfessionalSidebar 
          professionalData={professionalData}
          menuItems={menuItems}
          activeMenuItem={activeContent}
          onMenuItemClick={handleMenuItemClick}
          profileCompletion={profileCompletion}
        />
        
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <Card className="w-full max-w-4xl mx-auto shadow-sm">
            {renderContent()}
          </Card>
        </main>
      </div>
    </div>
  );
};

export default ProfessionalProfile;
