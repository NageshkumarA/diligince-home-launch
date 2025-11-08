import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, FileText, CheckCircle, XCircle, Clock } from "lucide-react";
import { ConsentDialog } from "@/components/verification/ConsentDialog";
import { getRequiredDocuments, getDocumentDisplayName } from "@/utils/vendorDocumentRequirements";
import { useUser } from "@/contexts/UserContext";
import { VerificationStatus } from "@/types/verification";
import { toast } from "sonner";

export default function VendorSettings() {
  const { user } = useUser();
  const [isConsentOpen, setIsConsentOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Mock vendor profile data - replace with real data from context
  const [profile, setProfile] = useState({
    businessName: user?.profile?.businessName || "",
    vendorCategory: user?.profile?.vendorCategory || "Service Vendor",
    specialization: user?.profile?.specialization || "",
    panNumber: "",
    gstNumber: "",
    registrationNumber: "",
    email: user?.email || "",
    mobile: user?.profile?.mobile || "",
    telephone: "",
    website: "",
    documents: [] as any[],
    verificationStatus: VerificationStatus.INCOMPLETE
  });

  const requiredDocs = getRequiredDocuments(profile.vendorCategory);
  const uploadedDocTypes = profile.documents.map(doc => doc.documentType);
  const missingDocs = requiredDocs.filter(doc => !uploadedDocTypes.includes(doc.type));
  
  const isProfileComplete = 
    profile.businessName &&
    profile.panNumber &&
    profile.gstNumber &&
    profile.registrationNumber &&
    profile.email &&
    profile.mobile &&
    missingDocs.length === 0;

  const handleFileUpload = (documentType: string, file: File) => {
    // Mock file upload - replace with real API call
    const mockDoc = {
      id: Date.now().toString(),
      name: file.name,
      type: file.type,
      size: file.size,
      url: URL.createObjectURL(file),
      documentType,
      uploadedAt: new Date(),
      status: 'pending' as const
    };
    
    setProfile(prev => ({
      ...prev,
      documents: [...prev.documents, mockDoc]
    }));
    
    toast.success(`${getDocumentDisplayName(documentType)} uploaded successfully`);
  };

  const handleDeleteDocument = (docId: string) => {
    setProfile(prev => ({
      ...prev,
      documents: prev.documents.filter(doc => doc.id !== docId)
    }));
    toast.success('Document deleted successfully');
  };

  const handleSubmitForVerification = async () => {
    if (!isProfileComplete) {
      toast.error('Please complete all required fields and upload all documents');
      return;
    }
    
    setIsConsentOpen(true);
  };

  const handleConsentConfirm = async () => {
    setIsSubmitting(true);
    
    try {
      // Mock API call - replace with real vendorProfileService.submitForVerification
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setProfile(prev => ({
        ...prev,
        verificationStatus: VerificationStatus.PENDING
      }));
      
      toast.success('Profile submitted for verification!');
      setIsConsentOpen(false);
      
      // Redirect to pending page
      window.location.href = '/verification-pending';
    } catch (error) {
      toast.error('Failed to submit profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderVerificationBadge = () => {
    switch (profile.verificationStatus) {
      case VerificationStatus.APPROVED:
        return (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            <span className="font-semibold">Verified</span>
          </div>
        );
      case VerificationStatus.PENDING:
        return (
          <div className="flex items-center gap-2 text-yellow-600">
            <Clock className="h-5 w-5" />
            <span className="font-semibold">Pending Verification</span>
          </div>
        );
      case VerificationStatus.REJECTED:
        return (
          <div className="flex items-center gap-2 text-red-600">
            <XCircle className="h-5 w-5" />
            <span className="font-semibold">Verification Rejected</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="h-5 w-5" />
            <span className="font-semibold">Not Verified</span>
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Vendor Profile Settings</h1>
            <p className="text-muted-foreground mt-1">Complete your profile to get verified</p>
          </div>
          {renderVerificationBadge()}
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="legal">Legal Information</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
                <CardDescription>Your basic business details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="businessName">Business Name *</Label>
                  <Input
                    id="businessName"
                    value={profile.businessName}
                    onChange={(e) => setProfile(prev => ({ ...prev, businessName: e.target.value }))}
                    placeholder="Enter business name"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="business@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="mobile">Mobile *</Label>
                    <Input
                      id="mobile"
                      value={profile.mobile}
                      onChange={(e) => setProfile(prev => ({ ...prev, mobile: e.target.value }))}
                      placeholder="9876543210"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="telephone">Telephone (Optional)</Label>
                    <Input
                      id="telephone"
                      value={profile.telephone}
                      onChange={(e) => setProfile(prev => ({ ...prev, telephone: e.target.value }))}
                      placeholder="044-12345678"
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Website (Optional)</Label>
                    <Input
                      id="website"
                      value={profile.website}
                      onChange={(e) => setProfile(prev => ({ ...prev, website: e.target.value }))}
                      placeholder="www.example.com"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="legal" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Legal Information</CardTitle>
                <CardDescription>Required for verification</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="panNumber">PAN Number *</Label>
                  <Input
                    id="panNumber"
                    value={profile.panNumber}
                    onChange={(e) => setProfile(prev => ({ ...prev, panNumber: e.target.value.toUpperCase() }))}
                    placeholder="ABCDE1234F"
                    maxLength={10}
                  />
                </div>
                
                <div>
                  <Label htmlFor="gstNumber">GST Number *</Label>
                  <Input
                    id="gstNumber"
                    value={profile.gstNumber}
                    onChange={(e) => setProfile(prev => ({ ...prev, gstNumber: e.target.value.toUpperCase() }))}
                    placeholder="22ABCDE1234F1Z5"
                    maxLength={15}
                  />
                </div>

                <div>
                  <Label htmlFor="registrationNumber">Registration Number *</Label>
                  <Input
                    id="registrationNumber"
                    value={profile.registrationNumber}
                    onChange={(e) => setProfile(prev => ({ ...prev, registrationNumber: e.target.value }))}
                    placeholder="Enter registration number"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Required Documents</CardTitle>
                <CardDescription>
                  Upload all required documents for {profile.vendorCategory}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {requiredDocs.map(doc => {
                  const uploaded = profile.documents.find(d => d.documentType === doc.type);
                  
                  return (
                    <div key={doc.type} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <span className="font-medium">{doc.name}</span>
                        </div>
                        {uploaded ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                      </div>
                      
                      {uploaded ? (
                        <div className="flex items-center justify-between bg-muted rounded p-2">
                          <span className="text-sm text-muted-foreground">{uploaded.name}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteDocument(uploaded.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <Input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleFileUpload(doc.type, file);
                            }}
                            className="cursor-pointer"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Accepted formats: PDF, JPG, PNG (Max 5MB)
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mt-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground">Ready to Submit?</h3>
                <p className="text-sm text-muted-foreground">
                  {isProfileComplete 
                    ? "All requirements met. Submit for verification." 
                    : `${missingDocs.length} document${missingDocs.length > 1 ? 's' : ''} and required fields pending.`
                  }
                </p>
              </div>
              <Button
                onClick={handleSubmitForVerification}
                disabled={!isProfileComplete || profile.verificationStatus === VerificationStatus.PENDING}
                className="bg-green-600 hover:bg-green-700"
              >
                Submit for Verification
              </Button>
            </div>
          </CardContent>
        </Card>

        <ConsentDialog
          isOpen={isConsentOpen}
          onClose={() => setIsConsentOpen(false)}
          onConfirm={handleConsentConfirm}
          userType="vendor"
          documentsToSubmit={requiredDocs.map(doc => doc.name)}
          isLoading={isSubmitting}
        />
      </div>
    </div>
  );
}
