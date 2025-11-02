import * as z from 'zod';

export const purchaseOrderFormSchema = z.object({
  quotationId: z.string().optional(),
  projectTitle: z.string().min(3, "Project title must be at least 3 characters"),
  scopeOfWork: z.string().min(10, "Scope of work must be at least 10 characters"),
  specialInstructions: z.string().optional(),
  startDate: z.date({
    required_error: "Start date is required"
  }),
  endDate: z.date({
    required_error: "End date is required"
  }),
  paymentTerms: z.string().min(5, "Payment terms are required"),
  deliverables: z.array(z.object({
    id: z.string().optional(),
    description: z.string().min(1, "Description is required"),
    quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
    unit: z.string().min(1, "Unit is required"),
    unitPrice: z.coerce.number().min(0, "Unit price must be positive")
  })).min(1, "At least one deliverable is required"),
  paymentMilestones: z.array(z.object({
    id: z.string().optional(),
    description: z.string().min(1, "Description is required"),
    percentage: z.coerce.number().min(1).max(100, "Percentage must be between 1 and 100"),
    dueDate: z.string().min(1, "Due date is required")
  })).min(1, "At least one payment milestone is required"),
  acceptanceCriteria: z.array(z.object({
    id: z.string().optional(),
    criteria: z.string().min(1, "Criteria is required")
  })).min(1, "At least one acceptance criteria is required")
}).refine(data => data.endDate >= data.startDate, {
  message: "End date must be after start date",
  path: ["endDate"]
}).refine(data => {
  const totalPercentage = data.paymentMilestones.reduce((sum, m) => sum + Number(m.percentage), 0);
  return Math.abs(totalPercentage - 100) < 0.01; // Allow small floating point differences
}, {
  message: "Payment milestone percentages must add up to 100%",
  path: ["paymentMilestones"]
});

export type PurchaseOrderFormData = z.infer<typeof purchaseOrderFormSchema>;
