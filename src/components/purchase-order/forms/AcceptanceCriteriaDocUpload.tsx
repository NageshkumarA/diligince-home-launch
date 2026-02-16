import React, { useRef } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Upload, FileText, X, Loader2, Paperclip, ChevronDown, ChevronUp, Check, Eye, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PurchaseOrderFormData, SOWDocument } from '@/schemas/purchase-order-form.schema';
import { purchaseOrdersService } from '@/services/modules/purchase-orders';
import { toast } from 'sonner';

// Base URL for API endpoints
const BASE_URL = 'http://localhost:5001';

// Extended type for documents in this component (includes File for uploads)
type AcceptanceCriteriaDocument = SOWDocument & {
  file?: File; // File object before upload
};

interface AcceptanceCriteriaDocUploadProps {
  form: UseFormReturn<PurchaseOrderFormData>;
  criteriaIndex: number;
  isExpanded: boolean;
  onToggleExpand: () => void;
  poId?: string; // Purchase Order ID for document uploads
}

const ACCEPTED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'image/jpeg',
  'image/png',
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_FILES_PER_CRITERIA = 3;

export const AcceptanceCriteriaDocUpload: React.FC<AcceptanceCriteriaDocUploadProps> = ({
  form,
  criteriaIndex,
  poId,
  isExpanded,
  onToggleExpand,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingFiles, setUploadingFiles] = React.useState<Set<string>>(new Set());

  const documents = form.watch(`acceptanceCriteria.${criteriaIndex}.documents`) || [];

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const currentDocs = form.getValues(`acceptanceCriteria.${criteriaIndex}.documents`) || [];

    if (currentDocs.length + files.length > MAX_FILES_PER_CRITERIA) {
      toast.error(`Maximum ${MAX_FILES_PER_CRITERIA} files allowed per criteria`);
      return;
    }

    const newDocs: SOWDocument[] = [];

    Array.from(files).forEach((file) => {
      if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
        toast.error(`File type not supported: ${file.name}`);
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`File too large: ${file.name} (max 10MB)`);
        return;
      }

      const doc: AcceptanceCriteriaDocument = {
        id: `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'pending', // Not uploaded yet
        file: file, // Store the actual file object
      };
      newDocs.push(doc);
    });

    if (newDocs.length > 0) {
      form.setValue(
        `acceptanceCriteria.${criteriaIndex}.documents`,
        [...currentDocs, ...newDocs]
      );
      toast.success(`${newDocs.length} file(s) selected`);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleManualUpload = async (doc: AcceptanceCriteriaDocument) => {
    console.log("doc Manual upload:\n", doc);
    if (!doc?.file) {
      toast.error('No file to upload');
      return;
    }

    if (!poId) {
      toast.error('Please save the PO as draft first to upload documents');
      return;
    }

    try {
      setUploadingFiles(prev => new Set(prev).add(doc.id));

      const result = await purchaseOrdersService.uploadDocuments(poId, [doc.file]);

      // Update document with URL
      const currentDocs = form.getValues(`acceptanceCriteria.${criteriaIndex}.documents`) || [];
      const updatedDocs = currentDocs.map(d =>
        d.id === doc.id
          ? { ...d, url: result.data?.url || result.data?.[0]?.url, status: 'success' as const, file: undefined }
          : d
      );

      form.setValue(`acceptanceCriteria.${criteriaIndex}.documents`, updatedDocs);
      toast.success(`Uploaded: ${doc.name}`);
    } catch (error: any) {
      toast.error(error.message || 'Upload failed');
      console.error('Upload error:', error);
    } finally {
      setUploadingFiles(prev => {
        const next = new Set(prev);
        next.delete(doc.id);
        return next;
      });
    }
  };

  const handleRemoveFile = (docId: string) => {
    const currentDocs = form.getValues(`acceptanceCriteria.${criteriaIndex}.documents`) || [];
    form.setValue(
      `acceptanceCriteria.${criteriaIndex}.documents`,
      currentDocs.filter((d) => d.id !== docId)
    );
    toast.success('File removed');
  };

  return (
    <div className="mt-2">
      {/* Toggle Button */}
      <button
        type="button"
        onClick={onToggleExpand}
        className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        <Paperclip className="h-3 w-3" />
        <span>
          {documents.length > 0
            ? `${documents.length} document${documents.length > 1 ? 's' : ''} attached`
            : 'Attach documents (optional)'}
        </span>
        {isExpanded ? (
          <ChevronUp className="h-3 w-3" />
        ) : (
          <ChevronDown className="h-3 w-3" />
        )}
      </button>

      {/* Expanded Upload Section */}
      {isExpanded && (
        <div className="mt-3 p-3 bg-muted/30 rounded-lg border border-border/40">
          {/* Uploaded Files List */}
          {documents.length > 0 && (
            <div className="space-y-2 mb-3">
              {documents.map((doc) => {
                const isUploading = uploadingFiles.has(doc.id);
                const isUploaded = doc.status === 'success';

                return (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-2 bg-background rounded-lg border border-border/60"
                  >
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <FileText className="h-4 w-4 text-primary flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate">{doc.name}</p>
                        {doc.size && doc.size > 0 && (
                          <p className="text-xs text-muted-foreground">
                            {formatFileSize(doc.size)}
                          </p>
                        )}
                        {isUploaded && (
                          <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-medium">
                            Uploaded
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      {/* Upload Button (tick mark) */}
                      {(!isUploaded || (isUploaded && !doc.url)) && !isUploading && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                          onClick={() => handleManualUpload(doc)}
                          title="Upload to S3"
                        >
                          <Check className="h-3 w-3" />
                        </Button>
                      )}

                      {/* Uploading Spinner */}
                      {isUploading && (
                        <div className="px-2">
                          <Loader2 className="h-4 w-4 animate-spin text-primary" />
                        </div>
                      )}

                      {/* View Button */}
                      {isUploaded && doc.url && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-primary hover:text-primary hover:bg-primary/10"
                          onClick={() => {
                            const fullUrl = doc.url?.startsWith('http')
                              ? doc.url
                              : `${BASE_URL}/${doc.url}`;
                            window.open(fullUrl, '_blank');
                          }}
                          title="View document"
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                      )}

                      {/* Delete Button */}
                      {!isUploading && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-muted-foreground hover:text-destructive"
                          onClick={() => handleRemoveFile(doc.id)}
                          title="Remove file"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Upload Area */}
          {documents.length < MAX_FILES_PER_CRITERIA && (
            <div
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                "border border-dashed border-border/60 rounded-lg p-4 text-center cursor-pointer",
                "hover:border-primary/50 hover:bg-primary/5 transition-colors"
              )}
            >
              <Upload className="h-5 w-5 mx-auto text-muted-foreground mb-2" />
              <p className="text-xs text-muted-foreground">
                Click to upload (max {MAX_FILES_PER_CRITERIA} files, 10MB each)
              </p>
              <p className="text-xs text-muted-foreground/70 mt-1">
                PDF, DOC, DOCX, XLS, XLSX, JPG, PNG
              </p>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
            multiple
            className="hidden"
            onChange={handleFileSelect}
          />
        </div>
      )}
    </div>
  );
};
