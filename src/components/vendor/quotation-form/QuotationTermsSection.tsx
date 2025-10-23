import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const QuotationTermsSection: React.FC<{ form: any }> = ({ form }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Terms & Conditions</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Terms form fields will be implemented here</p>
      </CardContent>
    </Card>
  );
};
