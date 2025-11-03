import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Save, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { CompanyProfile, VerificationStatus } from '@/types/verification';
import { calculateProfileCompletion, canSubmitForVerification } from '@/utils/profileValidation';
import { mockSaveProfile, mockSubmitForVerification } from '@/services/verification.mock';
import { ProfileCompletionBanner } from '@/components/verification/ProfileCompletionBanner';
import { useUser } from '@/contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const Settings: React.FC = () => {
  const { refreshVerificationStatus } = useUser();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profile, setProfile] = useState<Partial<CompanyProfile>>({
    companyName: '',
    industryFocus: '',
    companyDescription: '',
    yearEstablished: '',
    gstNumber: '',
    registrationNumber: '',
    email: '',
    mobile: '',
    telephone: '',
    website: '',
    addresses: [{
      line1: '',
      city: '',
      state: '',
      pincode: '',
      isPrimary: true
    }],
    verificationStatus: VerificationStatus.INCOMPLETE,
    isProfileComplete: false,
    profileCompletionPercentage: 0
  });

  const completionPercentage = calculateProfileCompletion(profile);
  const canSubmit = canSubmitForVerification(profile);

  // Load saved profile from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('company_profile');
    if (saved) {
      try {
        const savedProfile = JSON.parse(saved);
        setProfile(savedProfile);
      } catch (error) {
        console.error('Error loading saved profile:', error);
      }
    }
  }, []);

  const handleChange = (field: keyof CompanyProfile, value: any) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddressChange = (index: number, field: string, value: string) => {
    setProfile(prev => {
      const addresses = [...(prev.addresses || [])];
      addresses[index] = {
        ...addresses[index],
        [field]: value
      };
      return {
        ...prev,
        addresses
      };
    });
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      await mockSaveProfile(profile);
      toast.success('Profile saved successfully!');
    } catch (error) {
      toast.error('Failed to save profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitForVerification = async () => {
    if (!canSubmit) {
      toast.error('Please complete all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await mockSubmitForVerification(profile as CompanyProfile);
      toast.success('Profile submitted for verification!');
      toast.info(`Verification ID: ${result.verificationId}`);
      
      // Refresh verification status and navigate
      await refreshVerificationStatus();
      navigate('/verification-pending');
    } catch (error) {
      toast.error('Failed to submit for verification');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Company Profile</h1>
        <p className="text-muted-foreground mt-2">
          Complete all required fields to submit your profile for verification
        </p>
      </div>

      {/* Profile Completion Banner */}
      <ProfileCompletionBanner 
        profile={profile} 
        completionPercentage={completionPercentage}
      />

      {/* Rejection Notice if applicable */}
      {profile.verificationStatus === VerificationStatus.REJECTED && profile.verificationRemarks && (
        <Card className="mb-6 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 mt-1" />
              <div>
                <h3 className="font-semibold text-red-900 dark:text-red-200">Profile Verification Rejected</h3>
                <p className="text-sm text-red-700 dark:text-red-400 mt-1">
                  {profile.verificationRemarks}
                </p>
                <p className="text-sm text-red-600 dark:text-red-500 mt-2">
                  Please correct the issues and resubmit for verification.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Basic Information
              <Badge variant="outline" className="ml-2">Required</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="companyName">
                Company Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="companyName"
                value={profile.companyName || ''}
                onChange={(e) => handleChange('companyName', e.target.value)}
                placeholder="Enter company name"
              />
            </div>

            <div>
              <Label htmlFor="industryFocus">
                Industry Focus <span className="text-red-500">*</span>
              </Label>
              <Select 
                value={profile.industryFocus || ''} 
                onValueChange={(value) => handleChange('industryFocus', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="construction">Construction</SelectItem>
                  <SelectItem value="automotive">Automotive</SelectItem>
                  <SelectItem value="pharmaceuticals">Pharmaceuticals</SelectItem>
                  <SelectItem value="textiles">Textiles</SelectItem>
                  <SelectItem value="food_beverage">Food & Beverage</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="chemicals">Chemicals</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="companyDescription">
                Company Description <span className="text-red-500">*</span>
                <span className="text-sm text-muted-foreground ml-2">(Min 50 characters)</span>
              </Label>
              <Textarea
                id="companyDescription"
                value={profile.companyDescription || ''}
                onChange={(e) => handleChange('companyDescription', e.target.value)}
                placeholder="Describe your company, products, and services..."
                rows={5}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {(profile.companyDescription || '').length} / 1000 characters
              </p>
            </div>

            <div>
              <Label htmlFor="yearEstablished">
                Year Established <span className="text-red-500">*</span>
              </Label>
              <Input
                id="yearEstablished"
                type="number"
                value={profile.yearEstablished || ''}
                onChange={(e) => handleChange('yearEstablished', e.target.value)}
                placeholder="YYYY"
                min="1900"
                max={new Date().getFullYear()}
              />
            </div>
          </CardContent>
        </Card>

        {/* Legal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Legal Information
              <Badge variant="outline" className="ml-2">Required</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="gstNumber">
                GST Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="gstNumber"
                value={profile.gstNumber || ''}
                onChange={(e) => handleChange('gstNumber', e.target.value.toUpperCase())}
                placeholder="27AABCU9603R1Z5"
                maxLength={15}
              />
              <p className="text-xs text-muted-foreground mt-1">
                15-character GST Identification Number
              </p>
            </div>

            <div>
              <Label htmlFor="registrationNumber">
                Company Registration Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="registrationNumber"
                value={profile.registrationNumber || ''}
                onChange={(e) => handleChange('registrationNumber', e.target.value.toUpperCase())}
                placeholder="U74900MH2010PTC123456"
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Contact Information
              <Badge variant="outline" className="ml-2">Required</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={profile.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="contact@company.com"
              />
            </div>

            <div>
              <Label htmlFor="mobile">
                Mobile Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="mobile"
                type="tel"
                value={profile.mobile || ''}
                onChange={(e) => handleChange('mobile', e.target.value)}
                placeholder="+919876543210"
              />
            </div>

            <div>
              <Label htmlFor="telephone">Telephone (Optional)</Label>
              <Input
                id="telephone"
                type="tel"
                value={profile.telephone || ''}
                onChange={(e) => handleChange('telephone', e.target.value)}
                placeholder="+912240123456"
              />
            </div>

            <div>
              <Label htmlFor="website">Website (Optional)</Label>
              <Input
                id="website"
                type="url"
                value={profile.website || ''}
                onChange={(e) => handleChange('website', e.target.value)}
                placeholder="https://www.company.com"
              />
            </div>
          </CardContent>
        </Card>

        {/* Address Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Address Information
              <Badge variant="outline" className="ml-2">Required</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {profile.addresses && profile.addresses.map((address, index) => (
              <div key={index} className="space-y-4 p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Primary Address</h4>
                  <Badge variant="secondary">Primary</Badge>
                </div>

                <div>
                  <Label htmlFor={`address-line1-${index}`}>
                    Address Line 1 <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id={`address-line1-${index}`}
                    value={address.line1 || ''}
                    onChange={(e) => handleAddressChange(index, 'line1', e.target.value)}
                    placeholder="Street address, building name, etc."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`address-city-${index}`}>
                      City <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id={`address-city-${index}`}
                      value={address.city || ''}
                      onChange={(e) => handleAddressChange(index, 'city', e.target.value)}
                      placeholder="City"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`address-state-${index}`}>
                      State <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id={`address-state-${index}`}
                      value={address.state || ''}
                      onChange={(e) => handleAddressChange(index, 'state', e.target.value)}
                      placeholder="State"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor={`address-pincode-${index}`}>
                    Pincode <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id={`address-pincode-${index}`}
                    value={address.pincode || ''}
                    onChange={(e) => handleAddressChange(index, 'pincode', e.target.value)}
                    placeholder="400001"
                    maxLength={6}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                {canSubmit ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Profile is complete and ready for verification</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>Complete all required fields to submit for verification</span>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                {!canSubmit && (
                  <Button
                    onClick={handleSave}
                    disabled={isSubmitting}
                    variant="outline"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Progress
                  </Button>
                )}

                {canSubmit && (
                  <Button
                    onClick={handleSubmitForVerification}
                    disabled={isSubmitting}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Submit for Verification
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
