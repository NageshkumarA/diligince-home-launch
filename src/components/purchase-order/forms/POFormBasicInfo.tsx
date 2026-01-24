import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { PurchaseOrderFormData } from '@/schemas/purchase-order-form.schema';

interface POFormBasicInfoProps {
  form: UseFormReturn<PurchaseOrderFormData>;
}

export const POFormBasicInfo: React.FC<POFormBasicInfoProps> = ({ form }) => {
  return (
    <div className="space-y-6">
      {/* Project Title */}
      <div className="bg-card/80 backdrop-blur-sm border border-border/60 rounded-xl p-5 shadow-sm">
        <FormField
          control={form.control}
          name="projectTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-foreground">
                Project Title <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter project title"
                  className="h-11 rounded-lg border-border/80 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Scope of Work */}
      <div className="bg-card/80 backdrop-blur-sm border border-border/60 rounded-xl p-5 shadow-sm">
        <FormField
          control={form.control}
          name="scopeOfWork"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-foreground">
                Scope of Work <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the scope of work in detail..."
                  className="min-h-[120px] rounded-lg border-border/80 focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Dates */}
      <div className="bg-card/80 backdrop-blur-sm border border-border/60 rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-medium text-foreground mb-4">Project Timeline</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-sm font-medium text-foreground">
                  Start Date <span className="text-destructive">*</span>
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          'h-11 w-full pl-3 text-left font-normal rounded-lg border-border/80',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? format(field.value, 'PPP') : 'Select date'}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-sm font-medium text-foreground">
                  End Date <span className="text-destructive">*</span>
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          'h-11 w-full pl-3 text-left font-normal rounded-lg border-border/80',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? format(field.value, 'PPP') : 'Select date'}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Payment Terms */}
      <div className="bg-card/80 backdrop-blur-sm border border-border/60 rounded-xl p-5 shadow-sm">
        <FormField
          control={form.control}
          name="paymentTerms"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-foreground">
                Payment Terms <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., Net 30 days from invoice date"
                  className="min-h-[80px] rounded-lg border-border/80 focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Special Instructions */}
      <div className="bg-card/80 backdrop-blur-sm border border-border/60 rounded-xl p-5 shadow-sm">
        <FormField
          control={form.control}
          name="specialInstructions"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-foreground">
                Special Instructions
                <span className="text-muted-foreground text-xs ml-2">(Optional)</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any additional instructions or notes..."
                  className="min-h-[80px] rounded-lg border-border/80 focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};