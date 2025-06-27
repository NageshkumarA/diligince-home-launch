
import React, { useState, useCallback } from 'react';
import { BaseModal } from '@/components/shared/modals/BaseModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, FileText, CheckCircle, AlertCircle, X } from 'lucide-react';
import { VendorQuote } from '@/types/workflow';

interface ManualPOUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File, poNumber: string) => void;
  acceptedQuote: VendorQuote;
}

export const ManualPOUploadModal: React.FC<ManualPOUploadModalProps> = ({
  isOpen,
  onClose,
  onUpload,
  acceptedQuote
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [poNumber, setPONumber] = useState(`PO-${Date.now()}`);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  }, []);

  const handleFileSelect = (file: File) => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
      setUploadError('Please upload a PDF, DOC, or DOCX file.');
      return;
    }

    if (file.size > maxSize) {
      setUploadError('File size must be less than 10MB.');
      return;
    }

    setSelectedFile(file);
    setUploadError(null);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile && poNumber.trim()) {
      onUpload(selectedFile, poNumber.trim());
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Upload Manual Purchase Order"
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6 p-6">
        {/* Quote Summary */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Selected Quote Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-blue-700">Vendor:</span>
                <span className="ml-2 font-medium">{acceptedQuote.vendorName}</span>
              </div>
              <div>
                <span className="text-blue-700">Amount:</span>
                <span className="ml-2 font-medium">${acceptedQuote.quoteAmount.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* PO Number Input */}
        <div>
          <Label htmlFor="poNumber" className="text-sm font-medium text-gray-700">
            Purchase Order Number *
          </Label>
          <Input
            id="poNumber"
            value={poNumber}
            onChange={(e) => setPONumber(e.target.value)}
            className="mt-1"
            placeholder="Enter PO number"
          />
        </div>

        {/* File Upload Area */}
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">
            Upload Purchase Order Document *
          </Label>
          
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-blue-400 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-700 mb-2">
              Drag and drop your PO document here
            </p>
            <p className="text-sm text-gray-500 mb-4">
              or click to browse files
            </p>
            <Input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileInputChange}
              className="hidden"
              id="file-upload"
            />
            <Label
              htmlFor="file-upload"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
            >
              Browse Files
            </Label>
            <p className="text-xs text-gray-500 mt-2">
              Supported formats: PDF, DOC, DOCX (Max 10MB)
            </p>
          </div>
        </div>

        {/* Error Message */}
        {uploadError && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <span className="text-sm text-red-700">{uploadError}</span>
          </div>
        )}

        {/* Selected File Display */}
        {selectedFile && (
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="font-medium text-green-900">{selectedFile.name}</p>
                    <p className="text-sm text-green-700">{formatFileSize(selectedFile.size)}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedFile(null)}
                  className="text-green-700 hover:text-green-900"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            disabled={!selectedFile || !poNumber.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Upload Purchase Order
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};
