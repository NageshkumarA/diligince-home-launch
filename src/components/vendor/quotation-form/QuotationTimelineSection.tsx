import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const QuotationTimelineSection: React.FC<{ form: any }> = ({ form }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Timeline form fields will be implemented here</p>
      </CardContent>
    </Card>
  );
};
