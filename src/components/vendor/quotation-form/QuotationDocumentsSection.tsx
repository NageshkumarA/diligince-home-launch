import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const QuotationDocumentsSection: React.FC<{ form: any }> = ({ form }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Documents</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Document upload will be implemented here</p>
      </CardContent>
    </Card>
  );
};
