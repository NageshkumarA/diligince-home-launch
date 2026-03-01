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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

interface DateRevisionModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description: string;
    onSubmit: (data: { newEndDate?: string; resumeNote?: string }) => void;
    loading: boolean;
    includeDate?: boolean;
    includeNote?: boolean;
}

export const DateRevisionModal: React.FC<DateRevisionModalProps> = ({
    open,
    onOpenChange,
    title,
    description,
    onSubmit,
    loading,
    includeDate = true,
    includeNote = true
}) => {
    const [newEndDate, setNewEndDate] = useState('');
    const [resumeNote, setResumeNote] = useState('');

    const handleSubmit = () => {
        const data: { newEndDate?: string; resumeNote?: string } = {};
        if (includeDate && newEndDate) data.newEndDate = newEndDate;
        if (includeNote && resumeNote) data.resumeNote = resumeNote;
        onSubmit(data);
    };

    const handleOpenChange = (newOpen: boolean) => {
        if (!newOpen && !loading) {
            setNewEndDate('');
            setResumeNote('');
        }
        onOpenChange(newOpen);
    };

    return (
        <AlertDialog open={open} onOpenChange={handleOpenChange}>
            <AlertDialogContent className="max-w-md">
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                
                <div className="space-y-4 py-4">
                    {includeDate && (
                        <div className="space-y-2">
                            <Label htmlFor="newEndDate">New End Date (optional)</Label>
                            <Input
                                id="newEndDate"
                                type="date"
                                value={newEndDate}
                                onChange={(e) => setNewEndDate(e.target.value)}
                                disabled={loading}
                                min={new Date().toISOString().split('T')[0]}
                            />
                        </div>
                    )}

                    {includeNote && (
                        <div className="space-y-2">
                            <Label htmlFor="resumeNote">Notes (optional)</Label>
                            <Textarea
                                id="resumeNote"
                                value={resumeNote}
                                onChange={(e) => setResumeNote(e.target.value)}
                                placeholder="Add any notes about resuming this project..."
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
                        disabled={loading}
                        className="bg-green-600 hover:bg-green-700"
                    >
                        {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                        Resume Project
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};