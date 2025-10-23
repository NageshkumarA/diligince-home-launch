import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const QuotationTechnicalSection: React.FC<{ form: any }> = ({ form }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Technical Proposal</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Technical form fields will be implemented here</p>
      </CardContent>
    </Card>
  );
};
