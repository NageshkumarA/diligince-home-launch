
import { useState } from "react";
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
  X
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

const IndustryProfile = () => {
  const [companyName, setCompanyName] = useState("Steel Plant Ltd.");
  const [industryType, setIndustryType] = useState("Manufacturing - Steel Processing");
  const [companyDescription, setCompanyDescription] = useState(
    "Leading steel manufacturing company with over 25 years of experience. Specializing in hot and cold rolled products, galvanized steel, and custom fabrication."
  );
  const [gstNumber, setGstNumber] = useState("27AABCS1429B1ZB");
  const [regNumber, setRegNumber] = useState("U27100MH1995PLC123456");
  const [email, setEmail] = useState("contact@steelplant.com");
  const [phone, setPhone] = useState("+91 9876543210");
  const [address, setAddress] = useState("Plot No. 123, Industrial Area, Mumbai, Maharashtra, India - 400001");
  const [website, setWebsite] = useState("https://steelplant.com");
  const [yearEstablished, setYearEstablished] = useState("1995");
  const [activeMenu, setActiveMenu] = useState("Company Profile");
  const [profileCompletion, setProfileCompletion] = useState(90);
  
  // Mock data for team members
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: "John Doe", role: "CEO", email: "john@steelplant.com" },
    { id: 2, name: "Jane Smith", role: "CTO", email: "jane@steelplant.com" },
    { id: 3, name: "Robert Johnson", role: "Operations Manager", email: "robert@steelplant.com" }
  ]);

  // Mock data for documents
  const [documents, setDocuments] = useState([
    { id: 1, name: "Company Registration", type: "PDF", uploadDate: "15 Mar 2023", expiry: "N/A", status: "Verified" },
    { id: 2, name: "ISO 9001 Certificate", type: "PDF", uploadDate: "20 Jan 2023", expiry: "20 Jan 2026", status: "Verified" },
    { id: 3, name: "GST Certificate", type: "PDF", uploadDate: "05 Apr 2023", expiry: "N/A", status: "Pending" }
  ]);

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

  const menuItems = [
    { name: "Company Profile", icon: <Building className="w-5 h-5" /> },
    { name: "Team Members", icon: <Users className="w-5 h-5" /> },
    { name: "Documents & Certification", icon: <FileText className="w-5 h-5" /> },
    { name: "Payment Settings", icon: <CreditCard className="w-5 h-5" /> },
    { name: "Notification Preferences", icon: <Bell className="w-5 h-5" /> },
    { name: "Security & Login", icon: <Lock className="w-5 h-5" /> },
  ];

  // Handle team member form submission
  const handleTeamMemberSubmit = (e) => {
    e.preventDefault();
    if (editingTeamMember) {
      // Update existing team member
      setTeamMembers(teamMembers.map(member => 
        member.id === editingTeamMember.id ? 
          { ...member, ...newTeamMember } : 
          member
      ));
      setEditingTeamMember(null);
    } else {
      // Add new team member
      setTeamMembers([
        ...teamMembers, 
        { 
          id: teamMembers.length ? Math.max(...teamMembers.map(m => m.id)) + 1 : 1,
          ...newTeamMember 
        }
      ]);
    }
    setNewTeamMember({ name: "", role: "", email: "" });
    setShowTeamMemberForm(false);
  };

  // Delete team member
  const deleteTeamMember = (id) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
  };

  // Edit team member
  const editTeamMember = (member) => {
    setNewTeamMember({ name: member.name, role: member.role, email: member.email });
    setEditingTeamMember(member);
    setShowTeamMemberForm(true);
  };

  // Render content based on active menu
  const renderContent = () => {
    switch (activeMenu) {
      case "Company Profile":
        return (
          <>
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
                <select 
                  value={industryType}
                  onChange={(e) => setIndustryType(e.target.value)}
                  className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-base md:text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="Manufacturing - Steel Processing">Manufacturing - Steel Processing</option>
                  <option value="Manufacturing - Automotive">Manufacturing - Automotive</option>
                  <option value="Manufacturing - Electronics">Manufacturing - Electronics</option>
                  <option value="Energy - Oil & Gas">Energy - Oil & Gas</option>
                  <option value="Energy - Renewable">Energy - Renewable</option>
                  <option value="Construction">Construction</option>
                  <option value="Pharmaceuticals">Pharmaceuticals</option>
                  <option value="Chemical Industry">Chemical Industry</option>
                  <option value="Food Processing">Food Processing</option>
                  <option value="Textile Industry">Textile Industry</option>
                </select>
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
                  Registration Number
                </label>
                <Input
                  value={regNumber}
                  onChange={(e) => setRegNumber(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Mail className="w-4 h-4 inline mr-1" /> Email
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Phone className="w-4 h-4 inline mr-1" /> Phone
                </label>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <Textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full min-h-[80px]"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Globe className="w-4 h-4 inline mr-1" /> Website
                </label>
                <Input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Calendar className="w-4 h-4 inline mr-1" /> Year Established
                </label>
                <Input
                  value={yearEstablished}
                  onChange={(e) => setYearEstablished(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-4">
              <Button variant="outline">
                <X className="w-4 h-4 mr-2" /> Cancel
              </Button>
              <Button>
                <Save className="w-4 h-4 mr-2" /> Save Changes
              </Button>
            </div>
          </>
        );
        
      case "Team Members":
        return (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Team Members</h2>
              <Button onClick={() => {
                setNewTeamMember({ name: "", role: "", email: "" });
                setEditingTeamMember(null);
                setShowTeamMemberForm(true);
              }}>
                <Plus className="w-4 h-4 mr-2" />
                Add Team Member
              </Button>
            </div>
            
            <hr className="mb-6" />
            
            {showTeamMemberForm && (
              <Card className="p-4 mb-6">
                <h3 className="text-lg font-semibold mb-4">
                  {editingTeamMember ? "Edit Team Member" : "Add New Team Member"}
                </h3>
                <form onSubmit={handleTeamMemberSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <Input
                        value={newTeamMember.name}
                        onChange={(e) => setNewTeamMember({...newTeamMember, name: e.target.value})}
                        required
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Role
                      </label>
                      <Input
                        value={newTeamMember.role}
                        onChange={(e) => setNewTeamMember({...newTeamMember, role: e.target.value})}
                        required
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <Input
                        type="email"
                        value={newTeamMember.email}
                        onChange={(e) => setNewTeamMember({...newTeamMember, email: e.target.value})}
                        required
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setShowTeamMemberForm(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingTeamMember ? "Update Member" : "Add Member"}
                    </Button>
                  </div>
                </form>
              </Card>
            )}
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>{member.role}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => editTeamMember(member)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => deleteTeamMember(member.id)}>
                          <Trash className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        );
        
      case "Documents & Certification":
        return (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Documents & Certification</h2>
            </div>
            
            <hr className="mb-6" />
            
            <div className="border-2 border-dashed rounded-md p-8 flex flex-col items-center justify-center mb-6">
              <Upload className="h-10 w-10 text-blue-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                Drag & drop files or click to upload
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Supported formats: PDF, JPG, PNG (Max size: 5MB)
              </p>
              <Button>
                <Upload className="w-4 h-4 mr-2" />
                Upload Document
              </Button>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Documents</h3>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium">{doc.name}</TableCell>
                    <TableCell>{doc.type}</TableCell>
                    <TableCell>{doc.uploadDate}</TableCell>
                    <TableCell>{doc.expiry}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        doc.status === "Verified" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {doc.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <FileText className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        );
        
      case "Payment Settings":
        return (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Payment Settings</h2>
            </div>
            
            <hr className="mb-6" />
            
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Bank Account Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account Holder Name
                </label>
                <Input
                  placeholder="Steel Plant Ltd."
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account Number
                </label>
                <Input
                  placeholder="XXXXXXXXXXXX"
                  className="w-full"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bank Name
                </label>
                <Input
                  placeholder="HDFC Bank"
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  IFSC Code
                </label>
                <Input
                  placeholder="HDFC0000123"
                  className="w-full"
                />
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Payment Methods</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="p-4 border-2 border-blue-500 bg-blue-50">
                <div className="flex items-center mb-2">
                  <input type="radio" checked className="mr-2" readOnly />
                  <h4 className="font-medium">Bank Transfer</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Direct bank transfer through NEFT/RTGS
                </p>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center mb-2">
                  <input type="radio" className="mr-2" readOnly />
                  <h4 className="font-medium">UPI Payment</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Pay instantly using UPI ID
                </p>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center mb-2">
                  <input type="radio" className="mr-2" readOnly />
                  <h4 className="font-medium">Credit Card</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Visa, MasterCard, Rupay, etc.
                </p>
              </Card>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Invoice Preferences</h3>
            
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <input type="checkbox" checked className="mr-2" readOnly />
                <label className="text-sm font-medium">Receive invoices by email</label>
              </div>
              
              <div className="flex items-center mb-4">
                <input type="checkbox" className="mr-2" readOnly />
                <label className="text-sm font-medium">Generate consolidated monthly invoice</label>
              </div>
              
              <div className="flex items-center">
                <input type="checkbox" checked className="mr-2" readOnly />
                <label className="text-sm font-medium">Include PO number on invoices</label>
              </div>
            </div>
            
            <div className="flex justify-end gap-4 mt-8">
              <Button variant="outline">Cancel</Button>
              <Button>Save Payment Settings</Button>
            </div>
          </>
        );
        
      case "Notification Preferences":
        return (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Notification Preferences</h2>
            </div>
            
            <hr className="mb-6" />
            
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Email Notifications</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div>
                  <h4 className="font-medium">New Requirements</h4>
                  <p className="text-sm text-gray-600">Receive notifications about new requirements matching your profile</p>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" checked className="toggle" readOnly />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div>
                  <h4 className="font-medium">Messages</h4>
                  <p className="text-sm text-gray-600">Get email notifications when you receive new messages</p>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" checked className="toggle" readOnly />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div>
                  <h4 className="font-medium">Document Verification</h4>
                  <p className="text-sm text-gray-600">Notifications about document verification status changes</p>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" checked className="toggle" readOnly />
                </div>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-800 mb-4">SMS Notifications</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div>
                  <h4 className="font-medium">Critical Alerts</h4>
                  <p className="text-sm text-gray-600">Receive SMS for critical updates and alerts</p>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" checked className="toggle" readOnly />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div>
                  <h4 className="font-medium">Payment Confirmations</h4>
                  <p className="text-sm text-gray-600">Get SMS notifications for payment confirmations</p>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="toggle" readOnly />
                </div>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-800 mb-4">In-App Notifications</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div>
                  <h4 className="font-medium">All Activities</h4>
                  <p className="text-sm text-gray-600">Show notifications for all platform activities</p>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" checked className="toggle" readOnly />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div>
                  <h4 className="font-medium">System Updates</h4>
                  <p className="text-sm text-gray-600">Get notified about system updates and maintenance</p>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" checked className="toggle" readOnly />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-4">
              <Button variant="outline">Reset to Default</Button>
              <Button>Save Preferences</Button>
            </div>
          </>
        );
        
      case "Security & Login":
        return (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Security & Login</h2>
            </div>
            
            <hr className="mb-6" />
            
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Change Password</h3>
            
            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <Input
                  type="password"
                  placeholder="Enter your current password"
                  className="w-full max-w-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <Input
                  type="password"
                  placeholder="Enter new password"
                  className="w-full max-w-md"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Password must be at least 8 characters with letters, numbers and special characters
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <Input
                  type="password"
                  placeholder="Confirm new password"
                  className="w-full max-w-md"
                />
              </div>
              
              <Button className="mt-2">Update Password</Button>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Two-Factor Authentication</h3>
            
            <Card className="p-4 mb-8 max-w-md">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-medium">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-600">Enhance your account security</p>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="toggle" readOnly />
                </div>
              </div>
              <Button variant="outline" className="w-full">Setup 2FA</Button>
            </Card>
            
            <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Session Management</h3>
            
            <Card className="p-4 mb-8">
              <h4 className="font-medium mb-4">Active Sessions</h4>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div>
                    <p className="font-medium">Chrome on Windows</p>
                    <p className="text-sm text-gray-600">Mumbai, India • Current Session</p>
                  </div>
                  <Button variant="ghost" size="sm" disabled>
                    Current
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div>
                    <p className="font-medium">Firefox on MacOS</p>
                    <p className="text-sm text-gray-600">Delhi, India • Last active: Yesterday</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Logout
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div>
                    <p className="font-medium">Safari on iPhone</p>
                    <p className="text-sm text-gray-600">Mumbai, India • Last active: 2 days ago</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Logout
                  </Button>
                </div>
              </div>
              
              <div className="mt-4">
                <Button variant="outline" className="w-full">Logout from All Devices</Button>
              </div>
            </Card>
            
            <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Login History</h3>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Device</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>May 5, 2025 09:15 AM</TableCell>
                  <TableCell>Chrome on Windows</TableCell>
                  <TableCell>Mumbai, India</TableCell>
                  <TableCell>192.168.1.1</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      Successful
                    </span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>May 4, 2025 02:30 PM</TableCell>
                  <TableCell>Firefox on MacOS</TableCell>
                  <TableCell>Delhi, India</TableCell>
                  <TableCell>192.168.2.2</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      Successful
                    </span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>May 3, 2025 10:45 AM</TableCell>
                  <TableCell>Safari on iPhone</TableCell>
                  <TableCell>Unknown</TableCell>
                  <TableCell>192.168.3.3</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                      Failed
                    </span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </>
        );
        
      default:
        return <p>Select an option from the sidebar</p>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f2f5]">
      {/* Custom header with Diligince.ai branding */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#1890ff] flex items-center justify-between px-4 lg:px-8 z-10">
        <div className="flex items-center">
          <h1 className="text-xl md:text-2xl font-bold text-white">Diligince.ai</h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/industry-dashboard" className="text-white hover:text-blue-100">Dashboard</Link>
          <Link to="/create-requirement" className="text-white hover:text-blue-100">Requirements</Link>
          <Link to="/vendors" className="text-white hover:text-blue-100">Stakeholders</Link>
          <Link to="/messages" className="text-white hover:text-blue-100">Messages</Link>
          <Link to="/documents" className="text-white hover:text-blue-100">Documents</Link>
        </nav>
        
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#1890ff] font-bold">
            {getInitials(companyName)}
          </div>
        </div>
      </header>

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
              {renderContent()}
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default IndustryProfile;
