
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Building, 
  FileText, 
  Users, 
  CreditCard, 
  Bell, 
  Lock,
  Edit,
  Upload
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const IndustryProfile = () => {
  const [companyName, setCompanyName] = useState("Steel Plant Ltd.");
  const [industryType, setIndustryType] = useState("Manufacturing - Steel Processing");
  const [companyDescription, setCompanyDescription] = useState(
    "Leading steel manufacturing company with over 25 years of experience. Specializing in hot and cold rolled products, galvanized steel, and custom fabrication."
  );
  const [gstNumber, setGstNumber] = useState("27AABCS1429B1ZB");
  const [activeMenu, setActiveMenu] = useState("Company Profile");
  const [profileCompletion, setProfileCompletion] = useState(90);
  
  // Get initials for the avatar
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const menuItems = [
    { name: "Company Profile", icon: <Building className="w-5 h-5" /> },
    { name: "Team Members", icon: <Users className="w-5 h-5" /> },
    { name: "Documents & Certification", icon: <FileText className="w-5 h-5" /> },
    { name: "Payment Settings", icon: <CreditCard className="w-5 h-5" /> },
    { name: "Notification Preferences", icon: <Bell className="w-5 h-5" /> },
    { name: "Security & Login", icon: <Lock className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f2f5]">
      <Navbar />

      <main className="flex-grow py-8 px-4 lg:px-8 mt-16">
        <div className="container mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Profile & Settings</h1>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Profile Sidebar */}
            <Card className="lg:col-span-1 p-6 flex flex-col items-center">
              {/* Profile Photo */}
              <div className="w-32 h-32 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 text-4xl font-bold mb-4">
                {getInitials(companyName)}
              </div>
              
              {/* Company Name */}
              <h2 className="text-xl font-bold text-gray-800 mb-2">{companyName}</h2>
              
              {/* Industry Type */}
              <span className="bg-blue-50 text-blue-500 text-sm px-4 py-1 rounded-full border border-blue-200 mb-6">
                {industryType.split(" - ")[0]}
              </span>
              
              {/* Profile Completion */}
              <div className="w-full mb-6">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Profile Completion</span>
                  <span className="text-sm text-blue-500">{profileCompletion}%</span>
                </div>
                <Progress value={profileCompletion} className="h-2" />
              </div>
              
              {/* Menu Items */}
              <nav className="w-full mt-2">
                <ul className="space-y-1 w-full">
                  {menuItems.map((item) => (
                    <li key={item.name}>
                      <button
                        className={`w-full flex items-center px-4 py-3 rounded-md text-left ${
                          activeMenu === item.name
                            ? "bg-blue-50 text-blue-600 font-medium"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                        onClick={() => setActiveMenu(item.name)}
                      >
                        <span className="mr-3">{item.icon}</span>
                        {item.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </Card>

            {/* Content Area */}
            <Card className="lg:col-span-3 p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Company Profile</h2>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
              
              <hr className="mb-6" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <Input
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Industry Type
                  </label>
                  <Input
                    value={industryType}
                    onChange={(e) => setIndustryType(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Description
                </label>
                <Textarea
                  value={companyDescription}
                  onChange={(e) => setCompanyDescription(e.target.value)}
                  className="w-full min-h-[100px]"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    GST Number
                  </label>
                  <Input
                    value={gstNumber}
                    onChange={(e) => setGstNumber(e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Logo
                  </label>
                  <div className="border-2 border-dashed rounded-md p-4 flex flex-col items-center justify-center h-[100px]">
                    <Upload className="h-6 w-6 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">
                      Drag & drop or click to upload
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Website
                  </label>
                  <Input
                    placeholder="https://www.example.com"
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Founded Year
                  </label>
                  <Input
                    placeholder="1995"
                    className="w-full"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Size
                  </label>
                  <Input
                    placeholder="500-1000 employees"
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Headquarters
                  </label>
                  <Input
                    placeholder="Mumbai, Maharashtra, India"
                    className="w-full"
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-4">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default IndustryProfile;
