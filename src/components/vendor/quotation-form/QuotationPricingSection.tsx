import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const QuotationPricingSection: React.FC<{ form: any }> = ({ form }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pricing Information</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Pricing form fields will be implemented here</p>
      </CardContent>
    </Card>
  );
};
