
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, Building2, User, Mail, Phone, MapPin, FileText, Briefcase } from 'lucide-react';
import { useAuth } from '@/components/auth/hooks/useAuth';
import { UserProfile } from '@/types/shared';

export const VendorFormEnhanced = () => {
  const { signUp, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Info
    fullName: '',
    email: '',
    phone: '',
    password: '',
    
    // Business Info
    businessName: '',
    businessAddress: '',
    registrationNumber: '',
    
    // Vendor Specifics
    vendorCategory: '',
    specialization: '',
    
    // Additional Info
    yearsInBusiness: '',
    teamSize: '',
    description: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Required field validation
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
    if (!formData.vendorCategory) newErrors.vendorCategory = 'Vendor category is required';
    if (!formData.specialization.trim()) newErrors.specialization = 'Specialization is required';
    
    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Password validation
    if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      console.log("Form validation failed:", errors);
      return;
    }

    console.log("=== VENDOR SIGNUP FORM SUBMISSION ===");
    console.log("Form data:", { ...formData, password: "***" });
    
    // Create user profile object
    const userProfile: UserProfile & { password: string } = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: formData.fullName,
      email: formData.email.toLowerCase().trim(),
      role: 'vendor',
      avatar: '',
      initials: formData.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      profile: {
        businessName: formData.businessName,
        phone: formData.phone,
        address: formData.businessAddress,
        registrationNumber: formData.registrationNumber,
        vendorCategory: formData.vendorCategory as 'service' | 'product' | 'logistics',
        specialization: formData.specialization,
        yearsInBusiness: formData.yearsInBusiness ? parseInt(formData.yearsInBusiness) : undefined,
        teamSize: formData.teamSize,
        description: formData.description
      },
      password: formData.password
    };

    console.log("User profile to be saved:", { ...userProfile, password: "***" });

    try {
      const result = await signUp(userProfile);
      console.log("Signup result:", result);
      
      if (!result.success) {
        console.error("Signup failed:", result.error);
        // Handle signup error - this will be shown via toast by the useAuth hook
      }
    } catch (error) {
      console.error("Signup error in form:", error);
    }
  };

  const specializations = {
    service: [
      'Industrial Automation', 'Maintenance & Repair', 'Engineering Consulting',
      'Safety & Compliance', 'Installation Services', 'Technical Training',
      'Equipment Calibration', 'Project Management', 'Quality Assurance',
      'Environmental Services'
    ],
    product: [
      'Industrial Equipment', 'Spare Parts', 'Raw Materials',
      'Safety Equipment', 'Tools & Instruments', 'Electrical Components',
      'Mechanical Components', 'Chemical Products', 'Packaging Materials',
      'Manufacturing Supplies'
    ],
    logistics: [
      'Freight Transport', 'Warehousing', 'Supply Chain Management',
      'Last Mile Delivery', 'Heavy Equipment Transport', 'International Shipping',
      'Cold Chain Logistics', 'Hazardous Materials', 'Inventory Management',
      'Distribution Services'
    ]
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <Input
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  placeholder="Enter your full name"
                  className={errors.fullName ? 'border-red-500' : ''}
                  disabled={isLoading}
                />
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="Enter your email"
                    className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                    disabled={isLoading}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="Enter your phone number"
                    className={`pl-10 ${errors.phone ? 'border-red-500' : ''}`}
                    disabled={isLoading}
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password *
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    placeholder="Create a password"
                    className={errors.password ? 'border-red-500' : ''}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Business Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Business Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Name *
                </label>
                <Input
                  value={formData.businessName}
                  onChange={(e) => handleChange('businessName', e.target.value)}
                  placeholder="Enter your business name"
                  className={errors.businessName ? 'border-red-500' : ''}
                  disabled={isLoading}
                />
                {errors.businessName && <p className="text-red-500 text-xs mt-1">{errors.businessName}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Registration Number
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    value={formData.registrationNumber}
                    onChange={(e) => handleChange('registrationNumber', e.target.value)}
                    placeholder="Business registration number"
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Address
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  value={formData.businessAddress}
                  onChange={(e) => handleChange('businessAddress', e.target.value)}
                  placeholder="Enter your business address"
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Years in Business
                </label>
                <Select onValueChange={(value) => handleChange('yearsInBusiness', value)} disabled={isLoading}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Less than 1 year</SelectItem>
                    <SelectItem value="2">1-2 years</SelectItem>
                    <SelectItem value="5">3-5 years</SelectItem>
                    <SelectItem value="10">6-10 years</SelectItem>
                    <SelectItem value="15">11-15 years</SelectItem>
                    <SelectItem value="20">16-20 years</SelectItem>
                    <SelectItem value="25">20+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Team Size
                </label>
                <Select onValueChange={(value) => handleChange('teamSize', value)} disabled={isLoading}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select team size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-5">1-5 employees</SelectItem>
                    <SelectItem value="6-10">6-10 employees</SelectItem>
                    <SelectItem value="11-25">11-25 employees</SelectItem>
                    <SelectItem value="26-50">26-50 employees</SelectItem>
                    <SelectItem value="51-100">51-100 employees</SelectItem>
                    <SelectItem value="100+">100+ employees</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vendor Specialization */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Vendor Specialization
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vendor Category *
              </label>
              <Select onValueChange={(value) => handleChange('vendorCategory', value)} disabled={isLoading}>
                <SelectTrigger className={errors.vendorCategory ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select your vendor category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="service">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Service</Badge>
                      <span>Provide professional services</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="product">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Product</Badge>
                      <span>Supply products & equipment</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="logistics">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Logistics</Badge>
                      <span>Transportation & logistics</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.vendorCategory && <p className="text-red-500 text-xs mt-1">{errors.vendorCategory}</p>}
            </div>

            {formData.vendorCategory && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Specialization *
                </label>
                <Select onValueChange={(value) => handleChange('specialization', value)} disabled={isLoading}>
                  <SelectTrigger className={errors.specialization ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select your specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    {specializations[formData.vendorCategory as keyof typeof specializations]?.map((spec) => (
                      <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.specialization && <p className="text-red-500 text-xs mt-1">{errors.specialization}</p>}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Description
              </label>
              <Input
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Brief description of your business"
                disabled={isLoading}
              />
            </div>
          </CardContent>
        </Card>

        <Button 
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
          disabled={isLoading}
        >
          {isLoading ? "Creating Account..." : "Create Vendor Account"}
        </Button>
      </form>
    </div>
  );
};
