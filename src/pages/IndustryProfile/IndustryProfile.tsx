// import { useState, useEffect } from "react";
// import { 
//   Building, 
//   FileText, 
//   Users, 
//   CreditCard, 
//   Bell, 
//   Lock,
//   Edit,
//   Upload,
//   Plus,
//   Trash,
//   Mail,
//   Phone,
//   Globe,
//   Calendar,
//   Save,
//   X,
//   Home,
//   User
// } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Progress } from "@/components/ui/progress";
// import { Link } from "react-router-dom";
// import { 
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow
// } from "@/components/ui/table";
// import Footer from "@/components/Footer";
// import EnterpriseTeamMembers from "@/components/industry/EnterpriseTeamMembers";
// import IndustryHeader from "@/components/industry/IndustryHeader";
// import { ProfileCompletionWidget } from "@/components/shared/ProfileCompletionWidget";
// import { useUser } from "@/contexts/UserContext";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";
// import CompanyProfile from "./CompanyProfile";
// import Documents from "./Documents";
// import Payment from "./Payments";
// import Notification from "./Notifications";
// import Security from "./Security";
// import { useLocation } from "react-router-dom";

// // Types for the content
// export type ContentType = 
//   | "Company Profile" 
//   | "Team Members" 
//   | "Documents & Certification" 
//   | "Payment Settings" 
//   | "Notification Preferences" 
//   | "Security & Login";

// const IndustryProfile = () => {
//   const { user, updateProfile, profileCompletion, isAuthenticated } = useUser();
//   const [companyName, setCompanyName] = useState(user?.profile?.companyName || "Steel Plant Ltd.");
//   const [industryType, setIndustryType] = useState(user?.profile?.industryType || "Manufacturing - Steel Processing");
//   const navigate = useNavigate();
//   const location = useLocation();


//   // Initialize state from user profile

//   const [activeMenu, setActiveMenu] = useState<ContentType>("Company Profile");
  
//   // Redirect if not authenticated
//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate('/signin');
//     }
//   }, [isAuthenticated, navigate]);
  
//   // Mock data for team members
//   const [teamMembers, setTeamMembers] = useState([
//     { id: 1, name: "John Doe", role: "CEO", email: "john@steelplant.com" },
//     { id: 2, name: "Jane Smith", role: "CTO", email: "jane@steelplant.com" },
//     { id: 3, name: "Robert Johnson", role: "Operations Manager", email: "robert@steelplant.com" }
//   ]);

//   useEffect(() => {
//   const params = new URLSearchParams(location.search);
//   const section = params.get("section");

//   if (section) {
//     const map: { [key: string]: ContentType } = {
//       company: "Company Profile",
//       team: "Team Members",
//       documents: "Documents & Certification",
//       payment: "Payment Settings",
//       notifications: "Notification Preferences",
//       security: "Security & Login",
//     };

//     const matched = map[section.toLowerCase()];
//     if (matched) {
//       setActiveMenu(matched);
//     }
//   }
// }, [location]);


//   // State for new team member form
//   const [newTeamMember, setNewTeamMember] = useState({ name: "", role: "", email: "" });
//   const [editingTeamMember, setEditingTeamMember] = useState(null);
//   const [showTeamMemberForm, setShowTeamMemberForm] = useState(false);

//   // Get initials for the avatar
//   const getInitials = (name) => {
//     return name
//       .split(" ")
//       .map((word) => word[0])
//       .join("")
//       .toUpperCase();
//   };

//   // Handle profile save


//   const menuItems = [
//     { name: "Company Profile", icon: <Building className="w-5 h-5" /> },
//     { name: "Team Members", icon: <Users className="w-5 h-5" /> },
//     { name: "Documents & Certification", icon: <FileText className="w-5 h-5" /> },
//     { name: "Payment Settings", icon: <CreditCard className="w-5 h-5" /> },
//     { name: "Notification Preferences", icon: <Bell className="w-5 h-5" /> },
//     { name: "Security & Login", icon: <Lock className="w-5 h-5" /> },
//   ];

//   // Handle team member form submission
//   const handleTeamMemberSubmit = (e) => {
//     e.preventDefault();
//     if (editingTeamMember) {
//       // Update existing team member
//       setTeamMembers(teamMembers.map(member => 
//         member.id === editingTeamMember.id ? 
//           { ...member, ...newTeamMember } : 
//           member
//       ));
//       setEditingTeamMember(null);
//     } else {
//       // Add new team member
//       setTeamMembers([
//         ...teamMembers, 
//         { 
//           id: teamMembers.length ? Math.max(...teamMembers.map(m => m.id)) + 1 : 1,
//           ...newTeamMember 
//         }
//       ]);
//     }
//     setNewTeamMember({ name: "", role: "", email: "" });
//     setShowTeamMemberForm(false);
//   };

//   // Delete team member
//   const deleteTeamMember = (id) => {
//     setTeamMembers(teamMembers.filter(member => member.id !== id));
//   };

//   // Edit team member
//   const editTeamMember = (member) => {
//     setNewTeamMember({ name: member.name, role: member.role, email: member.email });
//     setEditingTeamMember(member);
//     setShowTeamMemberForm(true);
//   };

//   // Render content based on active menu
//   const renderContent = () => {
//     switch (activeMenu) {
//       case "Company Profile":
//         return <CompanyProfile />;
        
//       case "Team Members":
//         return <EnterpriseTeamMembers />;
        
//       case "Documents & Certification":
//         return <Documents />;
        
//       case "Payment Settings":
//         return <Payment />;
        
//       case "Notification Preferences":
//         return <Notification />;
        
//       case "Security & Login":
//         return <Security />;
        
//       default:
//         return <p>Select an option from the sidebar</p>;
//     }
//   };

//   if (!user) {
//     return null;
//   }

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       

//       {/* Main content area with sidebar and main panel */}
//      <div className="flex flex-grow pt-16">
//       {/* Sidebar */}
//       <aside className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto hidden lg:block w-64 bg-white border-r border-gray-200 p-6 space-y-6">
//         {/* Profile Section */}
//         <div className="flex flex-col items-center text-center">
//           <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 text-3xl font-bold mb-4">
//             {getInitials(companyName)}
//           </div>
          
//           <h2 className="text-lg font-bold text-gray-800 mb-2">{companyName}</h2>
          
//           <span className="bg-blue-50 text-blue-500 text-sm px-4 py-1 rounded-full border border-blue-200 mb-6">
//             {industryType.split(" - ")[0]}
//           </span>
          
//           {/* Dynamic Profile Completion */}
//           <div className="w-full mb-6">
//             <div className="flex justify-between items-center mb-1">
//               <span className="text-sm text-gray-600">Profile Completion</span>
//               <span className="text-sm text-blue-500">{profileCompletion.percentage}%</span>
//             </div>
//             <Progress 
//               value={profileCompletion.percentage} 
//               className="h-2" 
//               indicatorClassName={profileCompletion.isComplete ? "bg-green-500" : "bg-primary"}
//             />
//             {!profileCompletion.isComplete && profileCompletion.missingFields.length > 0 && (
//               <p className="text-xs text-gray-500 mt-1">
//                 Complete: {profileCompletion.missingFields.slice(0, 2).join(', ')}
//                 {profileCompletion.missingFields.length > 2 && ` +${profileCompletion.missingFields.length - 2} more`}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Navigation Menu */}
//         <nav className="w-full">
//           <ul className="space-y-1 w-full">
//             {menuItems.map((item) => (
//               <li key={item.name}>
//                 <button
//                   className={`w-full flex items-center px-4 py-3 rounded-md text-left ${
//                     activeMenu === item.name
//                       ? "bg-blue-50 text-blue-600 font-medium"
//                       : "text-gray-600 hover:bg-gray-100"
//                   }`}
//                   onClick={() => {
//                     const reverseMap: { [key in ContentType]: string } = {
//                       "Company Profile": "company",
//                       "Team Members": "team",
//                       "Documents & Certification": "documents",
//                       "Payment Settings": "payment",
//                       "Notification Preferences": "notifications",
//                       "Security & Login": "security",
//                     };
//                     navigate(`/industry-profile?section=${reverseMap[item.name as ContentType]}`);
//                   }}

//                 >
//                   <span className="mr-3">{item.icon}</span>
//                   {item.name}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
//         <div className="max-w-6xl mx-auto">
//           <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Profile & Settings</h1>

        

//           {activeMenu === "Team Members" ? (
//             renderContent()
//           ) : (
//             <Card className="w-full p-6">
//               {renderContent()}
//             </Card>
//           )}
//         </div>
//       </main>
//     </div>


//     </div>
//   );
// };

// export default IndustryProfile;


import { useState, useEffect } from "react";
import { 
  Building, 
  FileText, 
  Users, 
  CreditCard, 
  Bell, 
  Lock,
  Edit,
  Upload,
  Plus,
  Trash,
  Mail,
  Phone,
  Globe,
  Calendar,
  Save,
  X,
  Home,
  User,
  Settings,
  Wallet,
  Award
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import Footer from "@/components/Footer";
import EnterpriseTeamMembers from "@/components/industry/EnterpriseTeamMembers";
import IndustryHeader from "@/components/industry/IndustryHeader";
import { ProfileCompletionWidget } from "@/components/shared/ProfileCompletionWidget";
import { useUser } from "@/contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CompanyProfile from "./CompanyProfile";
import Documents from "./Documents";
import Payment from "./Payments";

import Security from "./Security";
import { useLocation } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Types for the content
export type ContentType = 
  | "Company Profile" 
  | "Team Members" 
  | "Certifications" 
  | "Payment Settings" 
  | "Account Settings";

interface SidebarMenuItem {
  name: ContentType;
  icon: React.ReactNode;
}

const IndustryProfile = () => {
  const { user, updateProfile, profileCompletion, isAuthenticated } = useUser();
  
  const [companyName, setCompanyName] = useState(user?.profile?.companyName || "Steel Plant Ltd.");
  const [industryType, setIndustryType] = useState(user?.profile?.industryType || "Manufacturing - Steel Processing");
  const navigate = useNavigate();
  const location = useLocation();
  
  // Initialize state from user profile
  const [activeMenu, setActiveMenu] = useState<ContentType>("Company Profile");
  
  // Redirect if not authenticated
  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate('/signin');
  //   }
  // }, [isAuthenticated, navigate]);
  
  // Mock data for team members
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: "John Doe", role: "CEO", email: "john@steelplant.com" },
    { id: 2, name: "Jane Smith", role: "CTO", email: "jane@steelplant.com" },
    { id: 3, name: "Robert Johnson", role: "Operations Manager", email: "robert@steelplant.com" }
  ]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const section = params.get("section");

    if (section) {
      const map: { [key: string]: ContentType } = {
        company: "Company Profile",
        team: "Team Members",
        documents: "Certifications",
        payment: "Payment Settings",
        security: "Account Settings",
      };

      const matched = map[section.toLowerCase()];
      if (matched) {
        setActiveMenu(matched);
      }
    }
  }, [location]);

  // State for new team member form
  const [newTeamMember, setNewTeamMember] = useState({ name: "", role: "", email: "" });
  const [editingTeamMember, setEditingTeamMember] = useState(null);
  const [showTeamMemberForm, setShowTeamMemberForm] = useState(false);

  // Get initials for the avatar
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const menuItems: SidebarMenuItem[] = [
    { name: "Company Profile", icon: <Building className="w-5 h-5" /> },
    { name: "Team Members", icon: <Users className="w-5 h-5" /> },
    { name: "Certifications", icon: <Award size={18} /> },
    { name: "Payment Settings", icon: <Wallet size={18} /> },
    { name: "Account Settings", icon:  <Settings size={18} /> },
  ];

  // Render content based on active menu
  const renderContent = () => {
    switch (activeMenu) {
      case "Company Profile":
        return <CompanyProfile />;
      case "Team Members":
        return <EnterpriseTeamMembers />;
      case "Certifications":
        return <Documents />;
      case "Payment Settings":
        return <Payment />;
      
      case "Account Settings":
        return <Security />;
      default:
        return <p>Select an option from the sidebar</p>;
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      

      {/* Main content area with sidebar and main panel */}
      <div className="flex flex-grow pt-16">
        {/* Sidebar - Updated to match ProfessionalSidebar styling */}
        <aside className="sticky top-16 w-64 bg-white border-r border-gray-200 shrink-0 hidden md:block overflow-y-auto max-h-[calc(100vh-4rem)]">
          <div className="flex flex-col items-center py-8 px-4 border-b border-gray-200">
            <Avatar className="h-24 w-24 mb-4 bg-blue-100">
              <AvatarFallback className="text-blue-600 text-2xl font-medium">
                {getInitials(companyName)}
              </AvatarFallback>
            </Avatar>
            
            <h2 className="text-lg font-semibold text-gray-800">{companyName}</h2>
            
            <Badge variant="secondary" className="mt-2 bg-blue-100 text-blue-600 hover:bg-blue-200 border-blue-200">
              {industryType.split(" - ")[0]}
            </Badge>
            
            <div className="w-full mt-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Profile Completion</span>
                <span className="text-blue-600 font-medium">{profileCompletion.percentage}%</span>
              </div>
              <Progress 
                value={profileCompletion.percentage} 
                className="h-2 bg-blue-100" 
                indicatorClassName="bg-blue-600" 
              />
              {!profileCompletion.isComplete && profileCompletion.missingFields.length > 0 && (
                <p className="text-xs text-gray-500 mt-1">
                  Complete: {profileCompletion.missingFields.slice(0, 2).join(', ')}
                  {profileCompletion.missingFields.length > 2 && ` +${profileCompletion.missingFields.length - 2} more`}
                </p>
              )}
            </div>
          </div>
          
          <nav className="py-4">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => {
                      setActiveMenu(item.name);
                      const reverseMap: { [key in ContentType]: string } = {
                        "Company Profile": "company",
                        "Team Members": "team",
                        "Certifications": "documents",
                        "Payment Settings": "payment",
                       
                        "Account Settings": "security",
                      };
                      navigate(`/industry-profile?section=${reverseMap[item.name]}`);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm ${
                      activeMenu === item.name
                        ? "bg-blue-50 text-blue-700 border-r-4 border-blue-600 font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <span className={activeMenu === item.name ? "text-blue-600" : "text-gray-500"}>
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <Card className="w-full max-w-8xl mx-auto shadow-sm">
            {renderContent()}
          </Card>
        </main>
      </div>
    </div>
  );
};

export default IndustryProfile;