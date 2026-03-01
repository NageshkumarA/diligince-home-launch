import React, { useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

interface ProjectActionModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description: string;
    icon?: React.ReactNode;
    actionLabel: string;
    actionVariant?: 'default' | 'destructive';
    reasonLabel: string;
    reasonPlaceholder: string;
    includeNotes?: boolean;
    notesLabel?: string;
    notesPlaceholder?: string;
    onSubmit: (reason: string, notes?: string) => void;
    loading: boolean;
}

export const ProjectActionModal: React.FC<ProjectActionModalProps> = ({
    open,
    onOpenChange,
    title,
    description,
    icon,
    actionLabel,
    actionVariant = 'destructive',
    reasonLabel,
    reasonPlaceholder,
    includeNotes = false,
    notesLabel,
    notesPlaceholder,
    onSubmit,
    loading
}) => {
    const [reason, setReason] = useState('');
    const [notes, setNotes] = useState('');

    const handleSubmit = () => {
        if (!reason.trim()) return;
        onSubmit(reason, includeNotes ? notes : undefined);
    };

    const handleOpenChange = (newOpen: boolean) => {
        if (!newOpen && !loading) {
            setReason('');
            setNotes('');
        }
        onOpenChange(newOpen);
    };

    return (
        <AlertDialog open={open} onOpenChange={handleOpenChange}>
            <AlertDialogContent className="max-w-md">
                <AlertDialogHeader>
                    {icon && <div className="mx-auto mb-4">{icon}</div>}
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="reason">{reasonLabel} *</Label>
                        <Textarea
                            id="reason"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder={reasonPlaceholder}
                            rows={3}
                            disabled={loading}
                            className="resize-none"
                        />
                    </div>

                    {includeNotes && (
                        <div className="space-y-2">
                            <Label htmlFor="notes">{notesLabel}</Label>
                            <Textarea
                                id="notes"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder={notesPlaceholder}
                                rows={3}
                                disabled={loading}
                                className="resize-none"
                            />
                        </div>
                    )}
                </div>

                <AlertDialogFooter>
                    <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleSubmit}
                        disabled={!reason.trim() || loading}
                        className={actionVariant === 'destructive' ? 'bg-red-600 hover:bg-red-700' : ''}
                    >
                        {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                        {actionLabel}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};