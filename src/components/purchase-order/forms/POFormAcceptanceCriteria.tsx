import React from 'react';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PurchaseOrderFormData } from '@/schemas/purchase-order-form.schema';

interface POFormAcceptanceCriteriaProps {
  form: UseFormReturn<PurchaseOrderFormData>;
}

export const POFormAcceptanceCriteria: React.FC<POFormAcceptanceCriteriaProps> = ({ form }) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "acceptanceCriteria",
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Acceptance Criteria</CardTitle>
          <Button
            type="button"
            size="sm"
            onClick={() => append({ criteria: '' })}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Criteria
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {fields.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            No acceptance criteria added yet. Click "Add Criteria" to get started.
          </p>
        )}
        
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-3">
            <div className="flex-1">
              <FormField
                control={form.control}
                name={`acceptanceCriteria.${index}.criteria`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input 
                        placeholder={`Acceptance criteria ${index + 1}`}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => remove(index)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
