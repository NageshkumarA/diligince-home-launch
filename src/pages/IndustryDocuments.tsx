
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import IndustryHeader from "@/components/industry/IndustryHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Filter,
  FileText,
  Upload,
  Download,
  Eye,
  Calendar,
  File,
  Plus
} from "lucide-react";

// Mock document data
const documents = [
  {
    id: 1,
    name: "Industrial Valve RFQ Specification",
    type: "RFQ",
    category: "Requirements",
    size: "2.4 MB",
    uploadDate: "2024-01-15",
    lastModified: "2024-01-15",
    status: "Active",
    requirement: "Industrial Valve Procurement"
  },
  {
    id: 2,
    name: "TechValve Solutions Contract",
    type: "Contract",
    category: "Legal",
    size: "1.8 MB",
    uploadDate: "2024-01-10",
    lastModified: "2024-01-12",
    status: "Signed",
    requirement: "Industrial Valve Procurement"
  },
  {
    id: 3,
    name: "Pipeline Inspection Technical Specs",
    type: "Specification",
    category: "Technical",
    size: "3.2 MB",
    uploadDate: "2024-01-08",
    lastModified: "2024-01-08",
    status: "Active",
    requirement: "Pipeline Inspection Service"
  },
  {
    id: 4,
    name: "Safety Audit Report - Final",
    type: "Report",
    category: "Compliance",
    size: "5.1 MB",
    uploadDate: "2024-01-05",
    lastModified: "2024-01-05",
    status: "Completed",
    requirement: "Safety Audit Services"
  },
  {
    id: 5,
    name: "Purchase Order PO-2023-042",
    type: "Purchase Order",
    category: "Procurement",
    size: "876 KB",
    uploadDate: "2024-01-03",
    lastModified: "2024-01-03",
    status: "Active",
    requirement: "Industrial Valve Procurement"
  }
];

const IndustryDocuments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active": return "bg-green-100 text-green-800";
      case "signed": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-purple-100 text-purple-800";
      case "draft": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "rfq": return <FileText className="w-4 h-4" />;
      case "contract": return <File className="w-4 h-4" />;
      case "specification": return <FileText className="w-4 h-4" />;
      case "report": return <FileText className="w-4 h-4" />;
      case "purchase order": return <FileText className="w-4 h-4" />;
      default: return <File className="w-4 h-4" />;
    }
  };

  const filteredDocuments = documents.filter(doc => {
    if (filterBy === "recent" && new Date(doc.uploadDate) < new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) return false;
    if (filterBy === "active" && doc.status.toLowerCase() !== "active") return false;
    if (categoryFilter !== "all" && doc.category.toLowerCase() !== categoryFilter.toLowerCase()) return false;
    if (searchTerm && !doc.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !doc.type.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Helmet>
        <title>Documents | Industry Dashboard</title>
      </Helmet>
      
      <IndustryHeader />
      
      <main className="flex-1 container mx-auto px-4 py-8 pt-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Document Library</h1>
          <p className="text-gray-700 text-lg">Manage all your requirements, contracts, and project documents</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-gray-200"
            />
          </div>
          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-full lg:w-48 border-gray-200">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Documents</SelectItem>
              <SelectItem value="recent">Recent</SelectItem>
              <SelectItem value="active">Active</SelectItem>
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full lg:w-48 border-gray-200">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="requirements">Requirements</SelectItem>
              <SelectItem value="legal">Legal</SelectItem>
              <SelectItem value="technical">Technical</SelectItem>
              <SelectItem value="compliance">Compliance</SelectItem>
              <SelectItem value="procurement">Procurement</SelectItem>
            </SelectContent>
          </Select>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium">
                <Plus className="w-4 h-4 mr-2" />
                Upload Document
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold text-gray-900">Upload New Document</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Document Name</label>
                  <Input placeholder="Enter document name..." className="mt-1 border-gray-200" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Category</label>
                  <Select>
                    <SelectTrigger className="mt-1 border-gray-200">
                      <SelectValue placeholder="Select category..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="requirements">Requirements</SelectItem>
                      <SelectItem value="legal">Legal</SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="compliance">Compliance</SelectItem>
                      <SelectItem value="procurement">Procurement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Link to Requirement</label>
                  <Select>
                    <SelectTrigger className="mt-1 border-gray-200">
                      <SelectValue placeholder="Select requirement..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="valve">Industrial Valve Procurement</SelectItem>
                      <SelectItem value="pipeline">Pipeline Inspection Service</SelectItem>
                      <SelectItem value="consultant">Chemical Engineering Consultant</SelectItem>
                      <SelectItem value="transport">Equipment Transportation</SelectItem>
                      <SelectItem value="audit">Safety Audit Services</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                  <Upload className="w-8 h-8 mx-auto text-gray-400 mb-3" />
                  <p className="text-sm text-gray-700 font-medium">
                    Drop files here or <span className="text-blue-600 cursor-pointer hover:text-blue-700">browse</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX up to 10MB</p>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50">Cancel</Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium">Upload Document</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Document Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">Total Documents</p>
                  <p className="text-3xl font-bold text-gray-900">{documents.length}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">Active Documents</p>
                  <p className="text-3xl font-bold text-gray-900">{documents.filter(d => d.status === "Active").length}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
                  <File className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">Contracts</p>
                  <p className="text-3xl font-bold text-gray-900">{documents.filter(d => d.type === "Contract").length}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">Recent Uploads</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {documents.filter(d => new Date(d.uploadDate) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Documents Table */}
        <Card className="bg-white border border-gray-100 shadow-sm">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="flex items-center text-lg font-semibold text-gray-900">
              <FileText className="w-5 h-5 mr-2" />
              Documents ({filteredDocuments.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-100">
                  <TableHead className="font-semibold text-gray-700">Document</TableHead>
                  <TableHead className="font-semibold text-gray-700">Type</TableHead>
                  <TableHead className="font-semibold text-gray-700">Category</TableHead>
                  <TableHead className="font-semibold text-gray-700">Size</TableHead>
                  <TableHead className="font-semibold text-gray-700">Status</TableHead>
                  <TableHead className="font-semibold text-gray-700">Upload Date</TableHead>
                  <TableHead className="font-semibold text-gray-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.map((doc) => (
                  <TableRow key={doc.id} className="border-gray-100 hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded bg-blue-50 flex items-center justify-center">
                          {getTypeIcon(doc.type)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{doc.name}</p>
                          <p className="text-sm text-gray-600">{doc.requirement}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-gray-200 text-gray-700">{doc.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-gray-200 text-gray-700">{doc.category}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">{doc.size}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(doc.status)}>
                        {doc.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {new Date(doc.uploadDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default IndustryDocuments;
