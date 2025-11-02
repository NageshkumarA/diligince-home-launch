import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Deliverable } from '@/services/modules/purchase-orders';
import { Package } from 'lucide-react';

interface POLineItemsTabProps {
  deliverables: Deliverable[];
}

export const POLineItemsTab: React.FC<POLineItemsTabProps> = ({ deliverables }) => {
  if (!deliverables || deliverables.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center text-muted-foreground">
          <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No line items available</p>
        </CardContent>
      </Card>
    );
  }

  const calculateTotal = () => {
    return deliverables.reduce((sum, item) => {
      const total = (item.quantity || 0) * (item.unitPrice || 0);
      return sum + total;
    }, 0);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Deliverables
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Unit Price</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deliverables.map((item) => {
                const total = (item.quantity || 0) * (item.unitPrice || 0);
                return (
                  <TableRow key={item.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{item.description}</p>
                    </div>
                  </TableCell>
                    <TableCell className="text-right">
                      {item.quantity || 0}
                    </TableCell>
                    <TableCell className="text-right">
                      ${(item.unitPrice || 0).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      ${total.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                        ${item.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                          item.status === 'in_progress' ? 'bg-blue-100 text-blue-800' : 
                          'bg-gray-100 text-gray-800'}`}>
                        {item.status?.replace(/_/g, ' ') || 'Pending'}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow>
                <TableCell colSpan={3} className="text-right font-bold">
                  Total
                </TableCell>
                <TableCell className="text-right font-bold text-primary text-lg">
                  ${calculateTotal().toLocaleString()}
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
