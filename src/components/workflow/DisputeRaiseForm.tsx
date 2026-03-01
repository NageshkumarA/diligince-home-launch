import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { AlertTriangle } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

interface DisputeRaiseFormProps {
    onSubmit: (description: string, milestoneId?: string) => Promise<void>;
    milestoneId?: string;
    loading?: boolean;
}

export const DisputeRaiseForm: React.FC<DisputeRaiseFormProps> = ({
    onSubmit,
    milestoneId,
    loading = false
}) => {
    const [open, setOpen] = useState(false);
    const [description, setDescription] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!description.trim()) return;
        
        setSubmitting(true);
        try {
            await onSubmit(description, milestoneId);
            setDescription('');
            setOpen(false);
        } catch (error) {
            // Error handled by parent
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-50">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Raise Dispute
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Raise a Dispute</DialogTitle>
                    <DialogDescription>
                        Describe the issue or concern you want to raise{milestoneId ? ' for this milestone' : ''}.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="description">Dispute Description *</Label>
                        <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe the dispute in detail..."
                            rows={5}
                            disabled={submitting || loading}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)} disabled={submitting || loading}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={!description.trim() || submitting || loading}
                        className="bg-red-600 hover:bg-red-700"
                    >
                        {submitting ? 'Submitting...' : 'Raise Dispute'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};