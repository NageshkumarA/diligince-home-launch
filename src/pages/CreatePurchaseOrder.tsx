import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DatePicker } from '@/components/ui/datepicker';
import { v4 as uuidv4 } from 'uuid';

interface Deliverable {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
}

interface AcceptanceCriterion {
  id: string;
  criteria: string;
}

interface FormValues {
  vendor: string;
  poNumber: string;
  projectTitle: string;
  orderValue: number;
  taxPercentage: number;
  totalValue: number;
  startDate: Date;
  endDate: Date;
  paymentTerms: string;
  specialInstructions: string;
  scopeOfWork: string;
  deliverables: Deliverable[];
  acceptanceCriteria: AcceptanceCriterion[];
}

const CreatePurchaseOrder = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormValues>({
    vendor: '',
    poNumber: '',
    projectTitle: '',
    orderValue: 0,
    taxPercentage: 0,
    totalValue: 0,
    startDate: new Date(),
    endDate: new Date(),
    paymentTerms: '',
    specialInstructions: '',
    scopeOfWork: '',
    deliverables: [],
    acceptanceCriteria: []
  });

  const handleInputChange = (field: keyof FormValues, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addDeliverable = () => {
    setFormData(prev => ({
      ...prev,
      deliverables: [
        ...prev.deliverables,
        { id: uuidv4(), title: '', description: '', dueDate: new Date() }
      ]
    }));
  };

  const updateDeliverable = (id: string, field: keyof Deliverable, value: any) => {
    setFormData(prev => ({
      ...prev,
      deliverables: prev.deliverables.map(d =>
        d.id === id ? { ...d, [field]: value } : d
      )
    }));
  };

  const removeDeliverable = (id: string) => {
    setFormData(prev => ({
      ...prev,
      deliverables: prev.deliverables.filter(d => d.id !== id)
    }));
  };

  const addAcceptanceCriterion = () => {
    setFormData(prev => ({
      ...prev,
      acceptanceCriteria: [
        ...prev.acceptanceCriteria,
        { id: uuidv4(), criteria: '' }
      ]
    }));
  };

  const updateAcceptanceCriterion = (id: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      acceptanceCriteria: prev.acceptanceCriteria.map(c =>
        c.id === id ? { ...c, criteria: value } : c
      )
    }));
  };

  const removeAcceptanceCriterion = (id: string) => {
    setFormData(prev => ({
      ...prev,
      acceptanceCriteria: prev.acceptanceCriteria.filter(c => c.id !== id)
    }));
  };

  const calculateTotalValue = () => {
    const taxAmount = (formData.orderValue * formData.taxPercentage) / 100;
    return formData.orderValue + taxAmount;
  };

  const getCompleteFormData = (): FormValues => {
    return {
      vendor: formData.vendor || '',
      poNumber: formData.poNumber || '',
      projectTitle: formData.projectTitle || '',
      orderValue: formData.orderValue || 0,
      taxPercentage: formData.taxPercentage || 0,
      totalValue: formData.totalValue || 0,
      startDate: formData.startDate || new Date(),
      endDate: formData.endDate || new Date(),
      paymentTerms: formData.paymentTerms || '',
      specialInstructions: formData.specialInstructions || '',
      scopeOfWork: formData.scopeOfWork || '',
      deliverables: formData.deliverables || [],
      acceptanceCriteria: formData.acceptanceCriteria || []
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const completeData = getCompleteFormData();
    // Here you would typically send the data to an API or context
    console.log('Submitting Purchase Order:', completeData);
    // Navigate to confirmation or dashboard after submission
    navigate('/industry-workflows');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1 container mx-auto px-4 py-8 pt-20 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Create Purchase Order</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="vendor">Vendor *</Label>
            <Input
              id="vendor"
              value={formData.vendor}
              onChange={e => handleInputChange('vendor', e.target.value)}
              placeholder="Enter vendor name"
              required
            />
          </div>

          <div>
            <Label htmlFor="poNumber">Purchase Order Number *</Label>
            <Input
              id="poNumber"
              value={formData.poNumber}
              onChange={e => handleInputChange('poNumber', e.target.value)}
              placeholder="PO Number"
              required
            />
          </div>

          <div>
            <Label htmlFor="projectTitle">Project Title *</Label>
            <Input
              id="projectTitle"
              value={formData.projectTitle}
              onChange={e => handleInputChange('projectTitle', e.target.value)}
              placeholder="Project Title"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="orderValue">Order Value *</Label>
              <Input
                id="orderValue"
                type="number"
                value={formData.orderValue}
                onChange={e => {
                  const val = parseFloat(e.target.value) || 0;
                  handleInputChange('orderValue', val);
                  handleInputChange('totalValue', val + (val * formData.taxPercentage) / 100);
                }}
                placeholder="0.00"
                required
                min={0}
                step={0.01}
              />
            </div>
            <div>
              <Label htmlFor="taxPercentage">Tax Percentage (%)</Label>
              <Input
                id="taxPercentage"
                type="number"
                value={formData.taxPercentage}
                onChange={e => {
                  const val = parseFloat(e.target.value) || 0;
                  handleInputChange('taxPercentage', val);
                  handleInputChange('totalValue', formData.orderValue + (formData.orderValue * val) / 100);
                }}
                placeholder="0"
                min={0}
                step={0.01}
              />
            </div>
            <div>
              <Label htmlFor="totalValue">Total Value</Label>
              <Input
                id="totalValue"
                type="number"
                value={calculateTotalValue()}
                readOnly
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate">Start Date *</Label>
              <DatePicker
                id="startDate"
                selected={formData.startDate}
                onChange={(date: Date) => handleInputChange('startDate', date)}
                required
              />
            </div>
            <div>
              <Label htmlFor="endDate">End Date *</Label>
              <DatePicker
                id="endDate"
                selected={formData.endDate}
                onChange={(date: Date) => handleInputChange('endDate', date)}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="paymentTerms">Payment Terms *</Label>
            <Textarea
              id="paymentTerms"
              value={formData.paymentTerms}
              onChange={e => handleInputChange('paymentTerms', e.target.value)}
              placeholder="Specify payment terms"
              required
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="specialInstructions">Special Instructions</Label>
            <Textarea
              id="specialInstructions"
              value={formData.specialInstructions}
              onChange={e => handleInputChange('specialInstructions', e.target.value)}
              placeholder="Any special instructions for the vendor"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="scopeOfWork">Scope of Work *</Label>
            <Textarea
              id="scopeOfWork"
              value={formData.scopeOfWork}
              onChange={e => handleInputChange('scopeOfWork', e.target.value)}
              placeholder="Describe the scope of work"
              required
              rows={4}
            />
          </div>

          {/* Deliverables Section */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <Label>Deliverables</Label>
              <Button type="button" onClick={addDeliverable} size="sm">
                Add Deliverable
              </Button>
            </div>
            {formData.deliverables.length === 0 && (
              <p className="text-sm text-gray-500">No deliverables added yet.</p>
            )}
            {formData.deliverables.map((deliverable, index) => (
              <div key={deliverable.id} className="border rounded p-4 mb-4 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold">Deliverable {index + 1}</h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="xs"
                    onClick={() => removeDeliverable(deliverable.id)}
                  >
                    Remove
                  </Button>
                </div>
                <div>
                  <Label htmlFor={`deliverable-title-${deliverable.id}`}>Title *</Label>
                  <Input
                    id={`deliverable-title-${deliverable.id}`}
                    value={deliverable.title}
                    onChange={e => updateDeliverable(deliverable.id, 'title', e.target.value)}
                    placeholder="Deliverable title"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor={`deliverable-description-${deliverable.id}`}>Description *</Label>
                  <Textarea
                    id={`deliverable-description-${deliverable.id}`}
                    value={deliverable.description}
                    onChange={e => updateDeliverable(deliverable.id, 'description', e.target.value)}
                    placeholder="Deliverable description"
                    required
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor={`deliverable-dueDate-${deliverable.id}`}>Due Date *</Label>
                  <DatePicker
                    id={`deliverable-dueDate-${deliverable.id}`}
                    selected={deliverable.dueDate}
                    onChange={(date: Date) => updateDeliverable(deliverable.id, 'dueDate', date)}
                    required
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Acceptance Criteria Section */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <Label>Acceptance Criteria</Label>
              <Button type="button" onClick={addAcceptanceCriterion} size="sm">
                Add Criterion
              </Button>
            </div>
            {formData.acceptanceCriteria.length === 0 && (
              <p className="text-sm text-gray-500">No acceptance criteria added yet.</p>
            )}
            {formData.acceptanceCriteria.map((criterion, index) => (
              <div key={criterion.id} className="flex items-center gap-2 mb-3">
                <Input
                  value={criterion.criteria}
                  onChange={e => updateAcceptanceCriterion(criterion.id, e.target.value)}
                  placeholder={`Criterion ${index + 1}`}
                  required
                />
                <Button
                  type="button"
                  variant="outline"
                  size="xs"
                  onClick={() => removeAcceptanceCriterion(criterion.id)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/industry-workflows')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={
                !formData.vendor ||
                !formData.poNumber ||
                !formData.projectTitle ||
                formData.orderValue <= 0 ||
                !formData.paymentTerms ||
                !formData.scopeOfWork
              }
            >
              Create Purchase Order
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreatePurchaseOrder;
