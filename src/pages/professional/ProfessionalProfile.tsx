
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
import EnhancedAvailabilityCalendar from "@/components/professional/calendar/EnhancedAvailabilityCalendar";
import PaymentSettingsForm from "@/components/professional/forms/PaymentSettingsForm";
import AccountSettingsForm from "@/components/professional/forms/AccountSettingsForm";

export type SidebarMenuItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

export type ContentType = 
  | "personal-info" 
  | "skills" 
  | "certifications" 
  | "experience" 
  | "availability" 
  | "payment" 
  | "account";

const ProfessionalProfile = () => {
  const [activeContent, setActiveContent] = useState<ContentType>("personal-info");
  const [profileCompletion, setProfileCompletion] = useState(35);
  
  useEffect(() => {
    toast.success("Professional profile loaded successfully");
  }, []);
  
  const professionalData = {
    name: "Rahul Sharma",
    expertise: "Mechanical Engineering",
    initials: "RS",
  };

  const menuItems: SidebarMenuItem[] = [
    { id: "personal-info", label: "Personal Info", icon: <User size={18} /> },
    { id: "skills", label: "Skills & Expertise", icon: <LayoutGrid size={18} /> },
    { id: "certifications", label: "Certifications", icon: <Award size={18} /> },
    { id: "experience", label: "Experience", icon: <Briefcase size={18} /> },
    { id: "availability", label: "Availability Calendar", icon: <Calendar size={18} /> },
    { id: "payment", label: "Payment Settings", icon: <Wallet size={18} /> },
    { id: "account", label: "Account Settings", icon: <Settings size={18} /> },
  ];

  const headerNavItems = [
    { label: "Dashboard", icon: <Home size={18} />, href: "/professional-dashboard" },
    { label: "Opportunities", icon: <Briefcase size={18} />, href: "/professional-opportunities" },
    { label: "Calendar", icon: <Calendar size={18} />, href: "/professional-calendar" },
    { label: "Messages", icon: <MessageSquare size={18} />, href: "/professional-messages" },
    { label: "Profile", icon: <User size={18} />, href: "/professional-profile", active: true },
  ];

  const handleMenuItemClick = (contentType: ContentType) => {
    setActiveContent(contentType);
  };

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
        return <EnhancedAvailabilityCalendar />;
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
