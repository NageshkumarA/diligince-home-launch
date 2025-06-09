import { useState, useEffect } from "react";
import { User, Home, Calendar, Award, Briefcase, Wallet, Settings, LayoutGrid, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import ExpertHeader from "@/components/expert/ExpertHeader";
import ExpertSidebar from "@/components/expert/ExpertSidebar";
import PersonalInfoForm from "@/components/expert/forms/PersonalInfoForm";
import SkillsForm from "@/components/expert/forms/SkillsForm";
import CertificationsForm from "@/components/expert/forms/CertificationsForm";
import ExperienceForm from "@/components/expert/forms/ExperienceForm";
import AvailabilityCalendar from "@/components/expert/forms/AvailabilityCalendar";
import PaymentSettingsForm from "@/components/expert/forms/PaymentSettingsForm";
import AccountSettingsForm from "@/components/expert/forms/AccountSettingsForm";

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
    // Notify the user that the expert profile is loaded
    toast.success("Expert profile loaded successfully");
  }, []);
  
  // Mock expert data
  const expertData = {
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
      <ExpertHeader navItems={headerNavItems} />
      
      <div className="flex flex-grow pt-16">
        <ExpertSidebar 
          expertData={expertData}
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
