import { z } from 'zod';

// Line item schema for pricing
const lineItemSchema = z.object({
  id: z.string().optional(),
  description: z.string().min(1, 'Description is required'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  unitPrice: z.number().min(0, 'Unit price must be positive'),
  total: z.number().min(0, 'Total must be positive'),
});

// Milestone schema for timeline
const milestoneSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Milestone name is required'),
  deliverables: z.string().min(1, 'Deliverables description required'),
  dueDate: z.string().min(1, 'Due date is required'),
  amount: z.number().min(0, 'Amount must be positive'),
});

// Document schema
const documentSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  type: z.string(),
  size: z.number(),
  url: z.string().optional(),
});

export const vendorQuotationFormSchema = z.object({
  // Basic Information
  rfqId: z.string().min(1, 'RFQ ID is required'),
  
  // Pricing Section
  lineItems: z.array(lineItemSchema).min(1, 'At least one line item is required'),
  subtotal: z.number().min(0, 'Subtotal must be positive'),
  taxRate: z.number().min(0).max(100, 'Tax rate must be between 0 and 100'),
  taxAmount: z.number().min(0, 'Tax amount must be positive'),
  totalAmount: z.number().min(0, 'Total amount must be positive'),
  currency: z.string().default('USD'),
  paymentTerms: z.string().min(1, 'Payment terms are required'),
  
  // Timeline Section
  proposedStartDate: z.string().min(1, 'Start date is required'),
  proposedCompletionDate: z.string().min(1, 'Completion date is required'),
  milestones: z.array(milestoneSchema).optional(),
  
  // Technical Proposal
  methodology: z.string().min(50, 'Methodology must be at least 50 characters'),
  technicalSpecifications: z.string().optional(),
  qualityAssurance: z.string().optional(),
  complianceCertifications: z.array(z.string()).optional(),
  
  // Documents
  documents: z.array(documentSchema).optional(),
  
  // Terms & Conditions
  warrantyPeriod: z.string().min(1, 'Warranty period is required'),
  supportTerms: z.string().min(1, 'Support terms are required'),
  cancellationPolicy: z.string().min(1, 'Cancellation policy is required'),
  specialConditions: z.string().optional(),
  
  // Status
  status: z.enum(['draft', 'submitted']).default('draft'),
});

export type VendorQuotationFormData = z.infer<typeof vendorQuotationFormSchema>;
