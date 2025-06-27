
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import IndustryHeader from "@/components/industry/IndustryHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  FileText, 
  Calendar, 
  DollarSign, 
  User, 
  MapPin, 
  Clock, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  Edit,
  Workflow,
  MessageSquare,
  Download
} from "lucide-react";

const RequirementDetails = () => {
  const { id } = useParams();
  
  // Mock data - in real app would come from API
  const requirement = {
    id: id || "REQ-001",
    title: "Industrial Valve Procurement",
    category: "Product",
    status: "Active",
    priority: "High",
    description: "Procurement of high-quality industrial valves for chemical processing plant. These valves must meet strict safety and performance standards for handling corrosive chemicals.",
    
    // Basic Info
    costCenter: "CC-001-PROCUREMENT",
    department: "Process Engineering",
    requestedBy: "John Smith",
    businessJustification: "Critical equipment replacement needed for plant safety and operational efficiency. Current valves are showing signs of wear and potential failure.",
    estimatedBudget: 25000,
    riskLevel: "Medium",
    complianceRequired: true,
    
    // Product Details
    productSpecifications: "Stainless steel ball valves, 6-inch diameter, pressure rating 600 PSI, temperature range -20°C to 200°C, corrosion resistant coating",
    quantity: 12,
    technicalStandards: ["ISO 9001:2015", "ASME Standards", "API Standards"],
    qualityRequirements: "ISO 9001",
    
    // Dates
    createdDate: "2024-01-10",
    deadline: "2024-01-25",
    productDeliveryDate: "2024-01-20",
    
    // Workflow
    approvalStatus: "approved",
    currentApprovalStep: 2,
    approvalSteps: [
      { stepName: "Department Review", approverRole: "Department Head", status: "approved", approvedBy: "Jane Doe", approvedAt: "2024-01-11" },
      { stepName: "Budget Approval", approverRole: "Finance Manager", status: "approved", approvedBy: "Mike Johnson", approvedAt: "2024-01-12" },
      { stepName: "Compliance Review", approverRole: "Quality Manager", status: "pending", required: true }
    ],
    
    // Compliance
    complianceChecklist: [
      { item: "ISO 9001:2015 Compliance Verified", completed: true, verifiedBy: "Quality Team" },
      { item: "Technical Specifications Reviewed", completed: true, verifiedBy: "Engineering Team" },
      { item: "Safety Standards Validated", completed: false, verifiedBy: "" },
      { item: "Vendor Pre-qualification Required", completed: true, verifiedBy: "Procurement Team" }
    ],
    
    // Documents
    documents: [
      { name: "Technical Specifications.pdf", type: "specification", uploadedAt: "2024-01-10" },
      { name: "Safety Requirements.pdf", type: "compliance", uploadedAt: "2024-01-10" },
      { name: "Budget Approval.pdf", type: "reference", uploadedAt: "2024-01-12" }
    ],
    
    // Vendor Info
    applicants: 8,
    selectedVendor: null,
    
    // Audit Trail
    auditTrail: [
      { action: "Requirement Created", timestamp: "2024-01-10 09:00", user: "John Smith", details: "Initial requirement creation with basic details" },
      { action: "Technical Details Added", timestamp: "2024-01-10 10:30", user: "John Smith", details: "Added product specifications and technical standards" },
      { action: "Submitted for Approval", timestamp: "2024-01-10 11:00", user: "John Smith", details: "Requirement submitted to approval workflow" },
      { action: "Department Approved", timestamp: "2024-01-11 14:00", user: "Jane Doe", details: "Approved by Department Head" },
      { action: "Budget Approved", timestamp: "2024-01-12 09:30", user: "Mike Johnson", details: "Budget allocation approved" },
      { action: "Published", timestamp: "2024-01-12 15:00", user: "System", details: "Requirement published to vendor marketplace" }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800 border-green-200";
      case "Published": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Completed": return "bg-purple-100 text-purple-800 border-purple-200";
      case "Approved": return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Draft": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-red-100 text-red-800";
      case "High": return "bg-orange-100 text-orange-800";
      case "Medium": return "bg-blue-100 text-blue-800";
      case "Low": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const completedCompliance = requirement.complianceChecklist.filter(item => item.completed).length;
  const totalCompliance = requirement.complianceChecklist.length;
  const compliancePercentage = Math.round((completedCompliance / totalCompliance) * 100);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Helmet>
        <title>Requirement Details - {requirement.title} | Diligince.ai</title>
      </Helmet>
      
      <IndustryHeader />
      
      <main className="flex-1 container mx-auto px-4 py-8 pt-20">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Link to="/industry-requirements" className="text-blue-600 hover:text-blue-700 text-sm">
                ← Back to Requirements
              </Link>
            </div>
            <div className="flex gap-2">
              {requirement.status === "Draft" && (
                <Button variant="outline" asChild>
                  <Link to={`/create-requirement?edit=${requirement.id}`}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Requirement
                  </Link>
                </Button>
              )}
              <Button variant="outline" asChild>
                <Link to={`/industry-project-workflow/${requirement.id}`}>
                  <Workflow className="h-4 w-4 mr-2" />
                  View Workflow
                </Link>
              </Button>
              <Button variant="outline">
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact Vendors
              </Button>
            </div>
          </div>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{requirement.title}</h1>
              <p className="text-gray-600 mb-4">{requirement.id}</p>
              <div className="flex items-center gap-4">
                <Badge className={getStatusColor(requirement.status)}>
                  {requirement.status}
                </Badge>
                <Badge className={getPriorityColor(requirement.priority)}>
                  {requirement.priority} Priority
                </Badge>
                <Badge variant="outline">
                  {requirement.category}
                </Badge>
                {requirement.complianceRequired && (
                  <Badge className="bg-blue-100 text-blue-800">
                    <Shield className="h-3 w-3 mr-1" />
                    ISO 9001 Required
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">${requirement.estimatedBudget.toLocaleString()}</div>
              <div className="text-sm text-gray-500">Estimated Budget</div>
              <div className="text-sm text-gray-500 mt-2">
                {requirement.applicants} vendor applicants
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="workflow">Workflow</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="audit">Audit Trail</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Requirement Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">{requirement.description}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Business Context</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Business Justification</h4>
                      <p className="text-gray-700">{requirement.businessJustification}</p>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Department</h4>
                        <p className="text-gray-600">{requirement.department}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Cost Center</h4>
                        <p className="text-gray-600">{requirement.costCenter}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Request Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-500">Requested By</div>
                      <div className="font-medium">{requirement.requestedBy}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Created Date</div>
                      <div className="font-medium">{new Date(requirement.createdDate).toLocaleDateString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Deadline</div>
                      <div className="font-medium flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {new Date(requirement.deadline).toLocaleDateString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Risk Level</div>
                      <Badge className={getPriorityColor(requirement.riskLevel)}>
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        {requirement.riskLevel}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Compliance Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-4">
                      <div className="text-2xl font-bold text-blue-600">{compliancePercentage}%</div>
                      <div className="text-sm text-gray-500">Compliance Complete</div>
                    </div>
                    <div className="space-y-2">
                      {requirement.complianceChecklist.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          {item.completed ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <Clock className="h-4 w-4 text-yellow-600" />
                          )}
                          <span className="text-sm">{item.item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="specifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Specifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Detailed Specifications</h4>
                  <p className="text-gray-700">{requirement.productSpecifications}</p>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Quantity Required</h4>
                    <p className="text-gray-600">{requirement.quantity} units</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Quality Requirements</h4>
                    <p className="text-gray-600">{requirement.qualityRequirements}</p>
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Technical Standards</h4>
                  <div className="flex flex-wrap gap-2">
                    {requirement.technicalStandards.map((standard, index) => (
                      <Badge key={index} variant="outline">
                        {standard}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Expected Delivery Date</h4>
                  <p className="text-gray-600 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(requirement.productDeliveryDate).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  ISO 9001:2015 Compliance Checklist
                </CardTitle>
                <CardDescription>
                  Track compliance requirements for quality management standards
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {requirement.complianceChecklist.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
                      {item.completed ? (
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      ) : (
                        <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{item.item}</div>
                        {item.verifiedBy && (
                          <div className="text-sm text-gray-500 mt-1">
                            Verified by: {item.verifiedBy}
                          </div>
                        )}
                      </div>
                      <Badge className={item.completed ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                        {item.completed ? "Complete" : "Pending"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="workflow" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Approval Workflow</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {requirement.approvalSteps.map((step, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 rounded-lg border">
                      {step.status === "approved" ? (
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      ) : step.status === "pending" ? (
                        <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{step.stepName}</div>
                        <div className="text-sm text-gray-600">Approver: {step.approverRole}</div>
                        {step.approvedBy && (
                          <div className="text-sm text-gray-500 mt-1">
                            Approved by {step.approvedBy} on {new Date(step.approvedAt).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                      <Badge className={
                        step.status === "approved" ? "bg-green-100 text-green-800" :
                        step.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }>
                        {step.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Attached Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {requirement.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <div>
                          <div className="font-medium text-gray-900">{doc.name}</div>
                          <div className="text-sm text-gray-500">
                            {doc.type} • Uploaded {new Date(doc.uploadedAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audit" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Audit Trail</CardTitle>
                <CardDescription>
                  Complete history of all actions and changes to this requirement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {requirement.auditTrail.map((entry, index) => (
                    <div key={index} className="flex gap-3 p-3 border-l-2 border-blue-200 bg-blue-50/50">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{entry.action}</div>
                        <div className="text-sm text-gray-600 mt-1">{entry.details}</div>
                        <div className="text-xs text-gray-500 mt-2">
                          {entry.timestamp} • {entry.user}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default RequirementDetails;
