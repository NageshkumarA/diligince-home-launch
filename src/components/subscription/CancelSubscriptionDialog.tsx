import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { AlertTriangle, Loader2 } from 'lucide-react';

interface CancelSubscriptionDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: (data: { reason?: string; feedback?: string }) => Promise<void>;
    planName: string;
    effectiveDate: string;
}

export const CancelSubscriptionDialog: React.FC<CancelSubscriptionDialogProps> = ({
    open,
    onOpenChange,
    onConfirm,
    planName,
    effectiveDate
}) => {
    const [feedback, setFeedback] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleConfirm = async () => {
        setIsLoading(true);
        try {
            await onConfirm({
                reason: 'user_requested',
                feedback: feedback || undefined
            });
            onOpenChange(false);
        } catch (error) {
            // Error handled by parent
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                        <DialogTitle>Cancel Subscription?</DialogTitle>
                    </div>
                    <DialogDescription>
                        You're about to cancel your <strong>{planName}</strong> subscription.
                        Your plan will remain active until{' '}
                        <strong>{new Date(effectiveDate).toLocaleDateString()}</strong>.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div>
                        <Label htmlFor="feedback">
                            Help us improve (optional)
                        </Label>
                        <Textarea
                            id="feedback"
                            placeholder="Tell us why you're cancelling..."
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            rows={3}
                            className="mt-1"
                        />
                    </div>
                </div>

                <DialogFooter className="gap-2">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={isLoading}
                    >
                        Keep Subscription
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleConfirm}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Cancelling...
                            </>
                        ) : (
                            'Confirm Cancellation'
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CancelSubscriptionDialog;
