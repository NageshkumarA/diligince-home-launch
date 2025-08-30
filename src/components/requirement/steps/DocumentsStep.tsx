
import React, { useRef, useState } from "react";
import { useRequirement } from "@/contexts/RequirementContext";
import { steps } from "@/components/requirement/RequirementStepIndicator";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  File, 
  X, 
  Upload, 
  FileText, 
  Image as ImageIcon, 
  FileArchive 
} from "lucide-react";
import { toast } from "sonner";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DocumentsStepProps {
  onNext: () => void;
  onPrevious: () => void;
}

const DocumentsStep: React.FC<DocumentsStepProps> = ({ onNext, onPrevious }) => {
  const { formData, updateFormData } = useRequirement();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [newDocumentType, setNewDocumentType] = useState<"specification" | "drawing" | "reference" | "compliance" | "other">("specification");

  const handleNext = () => {
    onNext();
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    const newFiles = Array.from(files).map(file => {
      // In a real app, you would upload to server here and get URL back
      // For now we'll create object URLs for preview
      const url = URL.createObjectURL(file);
      return {
        id: Math.random().toString(36).substring(2, 9),
        name: file.name,
        type: file.type,
        size: file.size,
        url,
        documentType: newDocumentType,
        version: 1,
        uploadedAt: new Date(),
        uploadedBy: "Current User" // Would be replaced with actual user context
      };
    });

    updateFormData({
      documents: [...formData.documents, ...newFiles]
    });

    toast.success(`${newFiles.length} document${newFiles.length === 1 ? "" : "s"} uploaded`);
  };

  const handleDeleteDocument = (id: string) => {
    updateFormData({
      documents: formData.documents.filter(doc => doc.id !== id)
    });
    toast.success("Document removed");
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) {
      return <ImageIcon className="h-6 w-6 text-primary" />;
    } else if (
      type === "application/pdf" ||
      type === "application/msword" ||
      type.includes("wordprocessingml")
    ) {
      return <FileText className="h-6 w-6 text-red-500" />;
    } else if (
      type.includes("spreadsheet") ||
      type.includes("excel")
    ) {
      return <FileText className="h-6 w-6 text-green-500" />;
    } else if (
      type.includes("zip") ||
      type.includes("rar") ||
      type.includes("tar") ||
      type.includes("7z")
    ) {
      return <FileArchive className="h-6 w-6 text-yellow-500" />;
    } else {
      return <File className="h-6 w-6 text-gray-500" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) {
      return `${bytes} B`;
    } else if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    } else {
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">{steps[2].name}</h2>
        <p className="text-gray-600">
          {steps[2].description}
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
          <div className="md:col-span-4">
            <div
              className={`flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors ${
                dragActive
                  ? "border-primary bg-primary/5"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="mb-2 h-6 w-6 text-gray-500" />
              <p className="mb-1 text-sm font-medium text-gray-900">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500">
                PDF, DOC, XLS, JPG, PNG (max 10MB)
              </p>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                multiple
                onChange={handleChange}
                accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="documentType" className="text-sm">Document Type</Label>
            <Select
              value={newDocumentType}
              onValueChange={(value: any) => setNewDocumentType(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Document type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="specification">Specification</SelectItem>
                <SelectItem value="drawing">Drawing</SelectItem>
                <SelectItem value="reference">Reference</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {formData.documents.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-medium text-gray-900">Uploaded Documents</h3>
            <div className="divide-y rounded-md border">
              {formData.documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-3">
                    {getFileIcon(doc.type)}
                    <div>
                      <p className="font-medium text-gray-900">{doc.name}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span>{formatFileSize(doc.size)}</span>
                        <span>•</span>
                        <span className="capitalize">{doc.documentType}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-md px-2 py-1 text-xs font-medium text-primary hover:bg-primary/5"
                    >
                      View
                    </a>
                    <button
                      onClick={() => handleDeleteDocument(doc.id)}
                      className="rounded-md p-1 text-gray-500 hover:bg-red-50 hover:text-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between pt-6">
        <Button 
          variant="outline" 
          onClick={onPrevious}
        >
          Previous
        </Button>
        <Button onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default DocumentsStep;
