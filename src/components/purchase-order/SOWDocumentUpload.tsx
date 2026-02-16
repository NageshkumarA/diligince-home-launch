import React, { useRef, useState, useCallback } from 'react';
import { Upload, FileText, X, AlertCircle, Check, Trash2, Loader2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { purchaseOrdersService } from '@/services/modules/purchase-orders';
import { toast } from 'sonner';

// Base URL for API endpoints
const BASE_URL = 'http://localhost:5001';

// Allowed file types and max size
const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx', '.xls', '.xlsx'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export interface UploadedFile {
    id: string;
    file?: File;
    name: string;
    size: number;
    type: string;
    url?: string;
    status: 'pending' | 'uploading' | 'success' | 'error';
    error?: string;
}

interface SOWDocumentUploadProps {
    orderId?: string;
    files: UploadedFile[];
    onFilesChange: (files: UploadedFile[] | ((prev: UploadedFile[]) => UploadedFile[])) => void;
    onEnsureOrderId?: () => Promise<string | undefined>;
    maxFiles?: number;
    disabled?: boolean;
}

const formatFileSize = (bytes: number): string => {
    if (bytes >= 1048576) return `${(bytes / 1048576).toFixed(1)} MB`;
    return `${(bytes / 1024).toFixed(0)} KB`;
};

const getFileExtension = (filename: string): string => {
    return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2).toLowerCase();
};

const SOWDocumentUpload: React.FC<SOWDocumentUploadProps> = ({
    orderId,
    files,
    onFilesChange,
    onEnsureOrderId,
    maxFiles = 5,
    disabled = false
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [uploadingIds, setUploadingIds] = useState<string[]>([]);

    const validateFile = useCallback((file: File): { valid: boolean; error?: string } => {
        // Case-insensitive extension check
        const extension = `.${getFileExtension(file.name)}`.toLowerCase();
        const allowedExtensions = ALLOWED_EXTENSIONS.map(ext => ext.toLowerCase());

        if (!allowedExtensions.includes(extension)) {
            return {
                valid: false,
                error: `Invalid file type "${extension}". Allowed: ${ALLOWED_EXTENSIONS.join(', ')}`
            };
        }

        if (file.size > MAX_FILE_SIZE) {
            return {
                valid: false,
                error: `File "${file.name}" is too large (${formatFileSize(file.size)}). Max size is 10MB.`
            };
        }

        // Additional MIME type validation for PDFs
        if (extension === '.pdf' && file.type && !file.type.includes('pdf')) {
            console.warn(`PDF file has unexpected MIME type: ${file.type}`);
        }

        return { valid: true };
    }, []);

    const handleFiles = useCallback((fileList: FileList | null) => {
        if (!fileList || disabled) return;

        const currentCount = files.length;
        const remainingSlots = maxFiles - currentCount;

        if (remainingSlots <= 0) {
            toast.error(`Maximum ${maxFiles} files allowed`);
            return;
        }

        const filesToProcess = Array.from(fileList).slice(0, remainingSlots);
        const newBatch: UploadedFile[] = [];
        const errors: string[] = [];

        filesToProcess.forEach((file, i) => {
            const validation = validateFile(file);
            if (!validation.valid) {
                errors.push(`${file.name}: ${validation.error}`);
            } else {
                newBatch.push({
                    id: `temp-${Date.now()}-${i}-${Math.random().toString(36).substr(2, 9)}`,
                    file,
                    name: file.name,
                    size: file.size,
                    type: file.type || 'application/octet-stream',
                    status: 'pending' as UploadedFile['status']
                });
            }
        });

        // Show all errors at once
        if (errors.length > 0) {
            errors.forEach(error => toast.error(error));
        }

        if (newBatch.length > 0) {
            onFilesChange([...files, ...newBatch]);
            toast.success(`${newBatch.length} file(s) selected successfully`);
        }

        // Reset input
        if (fileInputRef.current) fileInputRef.current.value = '';
    }, [files, maxFiles, disabled, validateFile, onFilesChange]);

    const handleManualUpload = async (tempFile: UploadedFile) => {
        if (!tempFile.file) {
            toast.error('No file data available');
            return;
        }

        let activeOrderId = orderId;

        // Auto-save logic if orderId is missing
        if (!activeOrderId && onEnsureOrderId) {
            try {
                const loadingToast = toast.loading('Saving purchase order as draft...');
                activeOrderId = await onEnsureOrderId();
                toast.dismiss(loadingToast);

                if (!activeOrderId) {
                    toast.error('Failed to create purchase order. Please save manually first.');
                    return;
                }
                toast.success('Draft saved successfully');
            } catch (err) {
                console.error('Auto-save error:', err);
                toast.error('Failed to auto-save draft. Please save manually first.');
                return;
            }
        }

        if (!activeOrderId) {
            toast.error('Please save the purchase order as a draft first before uploading documents.');
            return;
        }

        try {
            setUploadingIds(prev => [...prev, tempFile.id]);

            const uploadToast = toast.loading(`Uploading ${tempFile.name}...`);

            const response = await purchaseOrdersService.uploadDocuments(activeOrderId, [tempFile.file]);

            toast.dismiss(uploadToast);

            if (response.success && response.data.documents) {
                const uploadedDocs = response.data.documents;
                const uploadedDoc = uploadedDocs.find((d: any) => d.name === tempFile.name);

                if (uploadedDoc) {
                    toast.success(`${tempFile.name} uploaded successfully`);
                    // @ts-ignore
                    onFilesChange(prev => prev.map(f =>
                        f.id === tempFile.id
                            ? {
                                ...f,
                                id: uploadedDoc._id || uploadedDoc.id,
                                status: 'success',
                                url: uploadedDoc.url
                            }
                            : f
                    ));
                } else {
                    throw new Error('Document not found in response');
                }
            } else {
                throw new Error((response as any).error?.message || 'Upload failed');
            }
        } catch (err: any) {
            console.error('Upload error:', err);
            const errorMessage = err.response?.data?.error?.message || err.message || 'Failed to upload document';
            toast.error(errorMessage);

            // Mark file as error state
            // @ts-ignore
            onFilesChange(prev => prev.map(f =>
                f.id === tempFile.id
                    ? { ...f, status: 'error', error: errorMessage }
                    : f
            ));
        } finally {
            setUploadingIds(prev => prev.filter(id => id !== tempFile.id));
        }
    };

    const handleRemoveFile = useCallback(async (fileId: string) => {
        const fileToRemove = files.find(f => f.id === fileId);
        if (!fileToRemove) return;

        if (orderId && fileToRemove.status === 'success' && !fileId.startsWith('temp-')) {
            try {
                const loadingToast = toast.loading('Removing document...');
                await purchaseOrdersService.deleteDocument(orderId, fileId);
                toast.dismiss(loadingToast);
                toast.success('Document removed');
                onFilesChange(files.filter(f => f.id !== fileId));
            } catch (err: any) {
                console.error('Failed to delete document', err);
                toast.error(err.message || 'Failed to remove document');
            }
        } else {
            onFilesChange(files.filter(f => f.id !== fileId));
        }
    }, [files, onFilesChange, orderId]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        if (!disabled) setIsDragging(true);
    }, [disabled]);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
    }, [handleFiles]);

    const canAddMore = files.length < maxFiles && !disabled;

    return (
        <div className="space-y-4">
            {/* Drop zone - Matching QuotationTermsSection UI */}
            <div className="mb-4">
                <label
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={cn(
                        "flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors",
                        isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:bg-muted/50",
                        (disabled || !canAddMore) && "opacity-50 cursor-not-allowed"
                    )}
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className={cn("w-8 h-8 mb-2", isDragging ? "text-primary" : "text-muted-foreground")} />
                        <p className="mb-1 text-sm text-muted-foreground">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">
                            PDF, DOC, DOCX, XLS, XLSX (Max 10MB)
                        </p>
                    </div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        multiple
                        accept={ALLOWED_EXTENSIONS.join(',')}
                        onChange={(e) => handleFiles(e.target.files)}
                        disabled={disabled || !canAddMore}
                    />
                </label>
            </div>

            {/* File list - Matching QuotationDocumentItem UI */}
            {files.length > 0 && (
                <div className="space-y-3">
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                        Documents ({files.length})
                    </p>
                    {files.map((file) => {
                        const isUploaded = file.status === 'success';
                        const isUploading = uploadingIds.includes(file.id);

                        return (
                            <div
                                key={file.id}
                                className={cn(
                                    "flex items-center justify-between p-3 border rounded-lg transition-colors",
                                    isUploaded ? "bg-emerald-50/30 border-emerald-200" : "bg-muted/30 border-muted"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={cn(
                                        "w-10 h-10 rounded-lg flex items-center justify-center",
                                        isUploaded ? "bg-emerald-100" : "bg-primary/10"
                                    )}>
                                        <FileText className={cn("w-5 h-5", isUploaded ? "text-emerald-600" : "text-primary")} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium truncate max-w-[200px] md:max-w-[300px]">
                                            {file.name}
                                        </p>
                                        <div className="flex items-center gap-2">
                                            {file.size && file.size > 0 && (
                                                <p className="text-xs text-muted-foreground">
                                                    {formatFileSize(file.size)}
                                                </p>
                                            )}
                                            {isUploaded && (
                                                <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-medium">
                                                    Uploaded
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-1">
                                    {(!isUploaded || (isUploaded && !file.url)) && !isUploading && (
                                        <>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                                                onClick={() => handleManualUpload(file)}
                                                title="Upload to S3"
                                            >
                                                <Check className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                                onClick={() => handleRemoveFile(file.id)}
                                                title="Remove local file"
                                                disabled={disabled}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </>
                                    )}

                                    {isUploading && (
                                        <div className="px-2">
                                            <Loader2 className="w-4 h-4 animate-spin text-primary" />
                                        </div>
                                    )}

                                    {isUploaded && (
                                        <div className="flex items-center gap-1">
                                            {file.url && (
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-primary hover:text-primary hover:bg-primary/10"
                                                    onClick={() => {
                                                        const fullUrl = file.url?.startsWith('http')
                                                            ? file.url
                                                            : `${BASE_URL}/${file.url}`;
                                                        window.open(fullUrl, '_blank');
                                                    }}
                                                    title="View document"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                            )}
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                                onClick={() => handleRemoveFile(file.id)}
                                                title="Delete from S3"
                                                disabled={disabled}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default SOWDocumentUpload;
