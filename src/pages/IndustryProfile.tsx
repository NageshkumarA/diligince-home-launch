import React, { useState, useEffect } from 'react';
import { User, Building2, Mail, Phone, MapPin, Calendar, Edit3, Save, X, Shield, Users, Award } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import IndustryHeader from '@/components/industry/IndustryHeader';
import { useUser } from '@/contexts/UserContext';
import { useEnhancedApproval } from '@/contexts/EnhancedApprovalContext';

const IndustryProfile = () => {
  const { user } = useUser();
  const { userRole, isCompanyAdmin } = useEnhancedApproval();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.profile?.phone || '',
    companyName: user?.profile?.companyName || '',
    industryType: user?.profile?.industryType || '',
    location: user?.profile?.location || '',
    bio: user?.profile?.bio || '',
    website: user?.profile?.website || '',
    establishedYear: user?.profile?.establishedYear || '',
    employeeCount: user?.profile?.employeeCount || '',
    description: user?.profile?.description || '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.profile?.phone || '',
        companyName: user.profile?.companyName || '',
        industryType: user.profile?.industryType || '',
        location: user.profile?.location || '',
        bio: user.profile?.bio || '',
        website: user.profile?.website || '',
        establishedYear: user.profile?.establishedYear || '',
        employeeCount: user.profile?.employeeCount || '',
        description: user.profile?.description || '',
      });
    }
  }, [user]);

  const getRoleDisplayInfo = () => {
    const roleConfig = {
      admin: {
        label: 'Company Administrator',
        color: 'bg-red-100 text-red-800 border-red-200',
        icon: Shield,
        description: 'Full system access and user management'
      },
      approver: {
        label: 'Approver',
        color: 'bg-blue-100 text-blue-800 border-blue-200',
        icon: Award,
        description: 'Can approve requirements and workflows'
      },
      reviewer: {
        label: 'Reviewer',
        color: 'bg-green-100 text-green-800 border-green-200',
        icon: Users,
        description: 'Can review and provide feedback'
      },
      initiator: {
        label: 'Initiator',
        color: 'bg-gray-100 text-gray-800 border-gray-200',
        icon: User,
        description: 'Can create and submit requirements'
      }
    };

    return roleConfig[userRole] || roleConfig.initiator;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // In a real app, this would save to backend
    console.log('Saving profile data:', formData);
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleCancel = () => {
    // Reset form data to original values
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.profile?.phone || '',
      companyName: user?.profile?.companyName || '',
      industryType: user?.profile?.industryType || '',
      location: user?.profile?.location || '',
      bio: user?.profile?.bio || '',
      website: user?.profile?.website || '',
      establishedYear: user?.profile?.establishedYear || '',
      employeeCount: user?.profile?.employeeCount || '',
      description: user?.profile?.description || '',
    });
    setIsEditing(false);
  };

  const roleInfo = getRoleDisplayInfo();
  const RoleIcon = roleInfo.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      <IndustryHeader />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Profile Header */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-10 h-10 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{formData.name}</CardTitle>
                    <CardDescription className="text-lg">{formData.email}</CardDescription>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge className={`${roleInfo.color} border`}>
                        <RoleIcon className="w-3 h-3 mr-1" />
                        {roleInfo.label}
                      </Badge>
                      {isCompanyAdmin && (
                        <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                          <Shield className="w-3 h-3 mr-1" />
                          Company Admin
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{roleInfo.description}</p>
                  </div>
                </div>
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant={isEditing ? "outline" : "default"}
                >
                  {isEditing ? (
                    <>
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </>
                  ) : (
                    <>
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit Profile
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
          </Card>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your personal details and contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  ) : (
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-md">
                      <User className="w-4 h-4 text-gray-500" />
                      <span>{formData.name}</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-md">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span>{formData.email}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="Enter phone number"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-md">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>{formData.phone || 'Not provided'}</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  {isEditing ? (
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="Enter location"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-md">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span>{formData.location || 'Not provided'}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                {isEditing ? (
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    placeholder="Tell us about yourself..."
                    rows={3}
                  />
                ) : (
                  <div className="p-3 bg-gray-50 rounded-md min-h-[80px]">
                    <span>{formData.bio || 'No bio provided'}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Company Information */}
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>Details about your organization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-md">
                    <Building2 className="w-4 h-4 text-gray-500" />
                    <span>{formData.companyName}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="industryType">Industry Type</Label>
                  {isEditing ? (
                    <Input
                      id="industryType"
                      value={formData.industryType}
                      onChange={(e) => handleInputChange('industryType', e.target.value)}
                      placeholder="e.g., Manufacturing, Technology"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-md">
                      <span>{formData.industryType || 'Not specified'}</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  {isEditing ? (
                    <Input
                      id="website"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      placeholder="https://www.example.com"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-md">
                      <span>{formData.website || 'Not provided'}</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="establishedYear">Established Year</Label>
                  {isEditing ? (
                    <Input
                      id="establishedYear"
                      value={formData.establishedYear}
                      onChange={(e) => handleInputChange('establishedYear', e.target.value)}
                      placeholder="e.g., 2010"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-md">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span>{formData.establishedYear || 'Not provided'}</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="employeeCount">Employee Count</Label>
                  {isEditing ? (
                    <Input
                      id="employeeCount"
                      value={formData.employeeCount}
                      onChange={(e) => handleInputChange('employeeCount', e.target.value)}
                      placeholder="e.g., 100-500"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-md">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span>{formData.employeeCount || 'Not provided'}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Company Description</Label>
                {isEditing ? (
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe your company..."
                    rows={4}
                  />
                ) : (
                  <div className="p-3 bg-gray-50 rounded-md min-h-[100px]">
                    <span>{formData.description || 'No description provided'}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Save/Cancel Buttons for Edit Mode */}
          {isEditing && (
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-end space-x-4">
                  <Button variant="outline" onClick={handleCancel}>
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default IndustryProfile;
