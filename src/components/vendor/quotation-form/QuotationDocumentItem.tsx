import React, { useState } from 'react';
import { FileText, Trash2, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { vendorQuotationsService } from '@/services';
import { toast } from 'sonner';

interface QuotationDocumentItemProps {
    document: {
        id?: string;
        name: string;
        type: string;
        size: number;
        url?: string;
    };
    quotationId?: string;
    onRemove: () => void;
    onUploadSuccess: (uploadedDoc: any) => void;
    file?: File; // Present if it's a new local file
}

export const QuotationDocumentItem: React.FC<QuotationDocumentItemProps> = ({
    document,
    quotationId,
    onRemove,
    onUploadSuccess,
    file,
}) => {
    const [isUploading, setIsUploading] = useState(false);
    const isUploaded = !!document.url;

    const handleUpload = async () => {
        if (!file) {
            toast.error('No file selected');
            return;
        }

        if (!quotationId) {
            toast.error('Please save the quotation as a draft first before uploading documents.');
            return;
        }

        try {
            setIsUploading(true);
            const response = await vendorQuotationsService.uploadDocument(quotationId, file);

            if (response.success) {
                toast.success('Document uploaded successfully');
                // The backend returns DocumentUploadResponse which has the document details in data
                onUploadSuccess(response.data);
            } else {
                toast.error('Upload failed');
            }
        } catch (error: any) {
            toast.error(error.message || 'Failed to upload document');
        } finally {
            setIsUploading(false);
        }
    };

    const formatFileSize = (bytes: number) => {
        if (bytes >= 1048576) return `${(bytes / 1048576).toFixed(1)} MB`;
        return `${(bytes / 1024).toFixed(0)} KB`;
    };

    return (
        <div
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
                        {document.name}
                    </p>
                    <div className="flex items-center gap-2">
                        <p className="text-xs text-muted-foreground">
                            {formatFileSize(document.size)}
                        </p>
                        {isUploaded && (
                            <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-medium">
                                Uploaded
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-1">
                {!isUploaded && !isUploading && (
                    <>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                            onClick={handleUpload}
                            title="Upload to S3"
                        >
                            <Check className="w-4 h-4" />
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={onRemove}
                            title="Remove local file"
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
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={onRemove}
                        title="Delete from S3"
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                )}
            </div>
        </div>
    );
};
