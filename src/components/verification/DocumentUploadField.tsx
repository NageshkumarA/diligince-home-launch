import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Upload, File, X, CheckCircle2, Eye, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { VerificationDocument } from '@/types/verification';

interface DocumentUploadFieldProps {
  label: string;
  documentType: VerificationDocument['documentType'];
  required?: boolean;
  accept?: string;
  maxSizeMB?: number;
  currentDocument?: VerificationDocument;
  onUpload: (file: File, documentType: string) => Promise<VerificationDocument>;
  onDelete: (documentId: string) => Promise<void>;
  helperText?: string;
}

export const DocumentUploadField: React.FC<DocumentUploadFieldProps> = ({
  label,
  documentType,
  required = false,
  accept = ".pdf,.jpg,.jpeg,.png",
  maxSizeMB = 10,
  currentDocument,
  onUpload,
  onDelete,
  helperText
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > maxSizeMB * 1024 * 1024) {
      toast.error(`File size exceeds ${maxSizeMB}MB limit`);
      return;
    }

    try {
      setIsUploading(true);
      setUploadProgress(20);

      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 15, 90));
      }, 300);

      await onUpload(file, documentType);

      clearInterval(progressInterval);
      setUploadProgress(100);
      
      toast.success(`${label} uploaded successfully`);
    } catch (error: any) {
      toast.error(error.message || 'Failed to upload document');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDelete = async () => {
    if (!currentDocument) return;
    
    try {
      await onDelete(currentDocument.id);
      toast.success('Document removed');
    } catch (error: any) {
      toast.error(error.message || 'Failed to remove document');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2">
        {label}
        {required && <span className="text-red-500">*</span>}
        {currentDocument && (
          <CheckCircle2 className="w-4 h-4 text-green-600" />
        )}
        {required && !currentDocument && (
          <AlertCircle className="w-4 h-4 text-red-600" />
        )}
      </Label>

      {helperText && (
        <p className="text-xs text-muted-foreground">{helperText}</p>
      )}

      {currentDocument ? (
        <div className="border rounded-lg p-3 bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-900">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <File className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium">{currentDocument.name}</p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(currentDocument.size)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open(currentDocument.url, '_blank')}
              >
                <Eye className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileSelect}
            className="hidden"
            disabled={isUploading}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className={`w-full ${required && !currentDocument ? 'border-red-300' : ''}`}
          >
            <Upload className="w-4 h-4 mr-2" />
            {isUploading ? 'Uploading...' : 'Upload Document'}
          </Button>

          {isUploading && (
            <div className="mt-2">
              <Progress value={uploadProgress} className="h-1" />
            </div>
          )}
        </div>
      )}

      {required && !currentDocument && (
        <p className="text-xs text-red-600">This document is required</p>
      )}
    </div>
  );
};
