import React, { useEffect } from 'react';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { Plus, Trash2, AlertCircle } from 'lucide-react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PurchaseOrderFormData } from '@/schemas/purchase-order-form.schema';

interface POFormMilestonesProps {
  form: UseFormReturn<PurchaseOrderFormData>;
}

export const POFormMilestones: React.FC<POFormMilestonesProps> = ({ form }) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "paymentMilestones",
  });

  const milestones = form.watch('paymentMilestones');
  const totalPercentage = milestones.reduce((sum, m) => sum + Number(m.percentage || 0), 0);
  const isValid = Math.abs(totalPercentage - 100) < 0.01;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Payment Milestones</CardTitle>
          <Button
            type="button"
            size="sm"
            onClick={() => append({ description: '', percentage: 0, dueDate: '' })}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Milestone
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isValid && fields.length > 0 && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Total percentage must equal 100%. Current total: {totalPercentage.toFixed(1)}%
            </AlertDescription>
          </Alert>
        )}

        {fields.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            No payment milestones added yet. Click "Add Milestone" to get started.
          </p>
        )}
        
        {fields.map((field, index) => (
          <div key={field.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">Milestone {index + 1}</h4>
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
              name={`paymentMilestones.${index}.description`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description*</FormLabel>
                  <FormControl>
                    <Input placeholder="Milestone description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid md:grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name={`paymentMilestones.${index}.percentage`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment %*</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" max="100" step="0.1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`paymentMilestones.${index}.dueDate`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date*</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        ))}

        {fields.length > 0 && (
          <div className={`p-3 rounded-lg ${isValid ? 'bg-green-50 text-green-800' : 'bg-amber-50 text-amber-800'}`}>
            <strong>Total Percentage:</strong> {totalPercentage.toFixed(1)}% / 100%
          </div>
        )}
      </CardContent>
    </Card>
  );
};
