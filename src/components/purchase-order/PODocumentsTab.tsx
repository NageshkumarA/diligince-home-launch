import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Eye, Trash2, Upload, File } from 'lucide-react';
import { Document } from '@/services/modules/purchase-orders';
import { format } from 'date-fns';

interface PODocumentsTabProps {
  orderId: string;
  documents: Document[];
}

export const PODocumentsTab: React.FC<PODocumentsTabProps> = ({ orderId, documents }) => {
  const getDocumentIcon = (type: string) => {
    const icons = {
      contract: FileText,
      invoice: FileText,
      proof: File,
      delivery: FileText,
      other: File,
    };
    const Icon = icons[type as keyof typeof icons] || File;
    return <Icon className="h-5 w-5" />;
  };

  const getTypeColor = (type: string) => {
    const colors = {
      contract: 'bg-blue-100 text-blue-800',
      invoice: 'bg-green-100 text-green-800',
      proof: 'bg-purple-100 text-purple-800',
      delivery: 'bg-orange-100 text-orange-800',
      other: 'bg-gray-100 text-gray-800',
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  if (!documents || documents.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Documents</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="text-center text-muted-foreground space-y-4">
            <FileText className="h-12 w-12 mx-auto opacity-50" />
            <p>No documents uploaded yet</p>
            <Button className="gap-2">
              <Upload className="h-4 w-4" />
              Upload Document
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Group documents by type
  const groupedDocs = documents.reduce((acc, doc) => {
    const type = doc.type || 'other';
    if (!acc[type]) acc[type] = [];
    acc[type].push(doc);
    return acc;
  }, {} as Record<string, Document[]>);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Documents</CardTitle>
          <Button className="gap-2">
            <Upload className="h-4 w-4" />
            Upload Document
          </Button>
        </CardHeader>
      </Card>

      {Object.entries(groupedDocs).map(([type, docs]) => (
        <Card key={type}>
          <CardHeader>
            <div className="flex items-center gap-2">
              {getDocumentIcon(type)}
              <CardTitle className="text-lg capitalize">{type} Documents</CardTitle>
              <Badge variant="secondary">{docs.length}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {docs.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {getDocumentIcon(doc.type)}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{doc.name}</p>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                        <span>{formatFileSize(doc.size)}</span>
                        <span>•</span>
                        <span>
                          Uploaded {format(new Date(doc.uploadedAt), 'PP')}
                        </span>
                        {doc.uploadedBy && (
                          <>
                            <span>•</span>
                            <span>by {doc.uploadedBy}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Badge className={getTypeColor(doc.type)} variant="secondary">
                      {doc.type}
                    </Badge>
                    <Button size="sm" variant="ghost" className="gap-1">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="gap-1">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="gap-1 text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
