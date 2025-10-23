import React from 'react';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PurchaseOrderFormData } from '@/schemas/purchase-order-form.schema';

interface POFormDeliverablesProps {
  form: UseFormReturn<PurchaseOrderFormData>;
}

export const POFormDeliverables: React.FC<POFormDeliverablesProps> = ({ form }) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "deliverables",
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Deliverables</CardTitle>
          <Button
            type="button"
            size="sm"
            onClick={() => append({ description: '', quantity: 1, unit: 'unit', unitPrice: 0 })}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Deliverable
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {fields.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            No deliverables added yet. Click "Add Deliverable" to get started.
          </p>
        )}
        
        {fields.map((field, index) => (
          <div key={field.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">Deliverable {index + 1}</h4>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => remove(index)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <FormField
              control={form.control}
              name={`deliverables.${index}.description`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description*</FormLabel>
                  <FormControl>
                    <Input placeholder="Item description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3 gap-3">
              <FormField
                control={form.control}
                name={`deliverables.${index}.quantity`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity*</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`deliverables.${index}.unit`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit*</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., pcs, kg" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`deliverables.${index}.unitPrice`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit Price*</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="bg-muted/50 p-2 rounded text-sm">
              <strong>Total:</strong> {' '}
              {(Number(form.watch(`deliverables.${index}.quantity`)) * 
                Number(form.watch(`deliverables.${index}.unitPrice`))).toFixed(2)}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
