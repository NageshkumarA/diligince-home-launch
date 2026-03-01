import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { AlertCircle, CheckCircle, Clock, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

interface Dispute {
    disputeId: string;
    raisedBy: { name: string; email: string };
    raisedByRole: 'industry' | 'vendor';
    raisedAt: string;
    milestoneId?: string;
    description: string;
    status: 'open' | 'under_review' | 'resolved' | 'escalated';
    resolution?: string;
    resolvedAt?: string;
    resolvedBy?: { name: string };
}

interface DisputeListProps {
    disputes: Dispute[];
    isIndustry: boolean;
    onResolve?: (disputeId: string, resolution: string) => Promise<void>;
    loading?: boolean;
}

export const DisputeList: React.FC<DisputeListProps> = ({
    disputes,
    isIndustry,
    onResolve,
    loading = false
}) => {
    const [resolveDialogOpen, setResolveDialogOpen] = useState(false);
    const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
    const [resolution, setResolution] = useState('');
    const [resolving, setResolving] = useState(false);

    const handleResolveClick = (dispute: Dispute) => {
        setSelectedDispute(dispute);
        setResolution('');
        setResolveDialogOpen(true);
    };

    const handleResolveSubmit = async () => {
        if (!selectedDispute || !resolution.trim() || !onResolve) return;
        
        setResolving(true);
        try {
            await onResolve(selectedDispute.disputeId, resolution);
            setResolveDialogOpen(false);
            setSelectedDispute(null);
            setResolution('');
        } catch (error) {
            // Error handled by parent
        } finally {
            setResolving(false);
        }
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusBadge = (status: string) => {
        const variants: Record<string, { className: string; icon: React.ReactNode }> = {
            open: { className: 'bg-red-100 text-red-800 border-red-200', icon: <AlertCircle className="h-3 w-3" /> },
            under_review: { className: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: <Clock className="h-3 w-3" /> },
            resolved: { className: 'bg-green-100 text-green-800 border-green-200', icon: <CheckCircle className="h-3 w-3" /> },
            escalated: { className: 'bg-purple-100 text-purple-800 border-purple-200', icon: <AlertCircle className="h-3 w-3" /> }
        };

        const variant = variants[status] || variants.open;
        return (
            <Badge className={variant.className}>
                {variant.icon}
                <span className="ml-1">{status.replace('_', ' ').toUpperCase()}</span>
            </Badge>
        );
    };

    if (disputes.length === 0) {
        return (
            <Card>
                <CardContent className="py-8 text-center text-gray-500">
                    <MessageSquare className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p>No disputes raised</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <>
            <div className="space-y-4">
                {disputes.map((dispute) => (
                    <Card key={dispute.disputeId} className="border-l-4" style={{
                        borderLeftColor: dispute.status === 'resolved' ? '#10b981' : 
                                         dispute.status === 'open' ? '#ef4444' : '#f59e0b'
                    }}>
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <CardTitle className="text-base">
                                            Dispute #{dispute.disputeId}
                                        </CardTitle>
                                        {getStatusBadge(dispute.status)}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        Raised by {dispute.raisedBy.name} ({dispute.raisedByRole}) on {formatDate(dispute.raisedAt)}
                                    </div>
                                    {dispute.milestoneId && (
                                        <div className="text-xs text-gray-500">
                                            Milestone: {dispute.milestoneId}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <div className="text-sm font-medium mb-1">Description:</div>
                                <p className="text-sm text-gray-700">{dispute.description}</p>
                            </div>

                            {dispute.status === 'resolved' && dispute.resolution && (
                                <div className="pt-3 border-t">
                                    <div className="text-sm font-medium mb-1 text-green-700">Resolution:</div>
                                    <p className="text-sm text-gray-700">{dispute.resolution}</p>
                                    <div className="text-xs text-gray-500 mt-2">
                                        Resolved by {dispute.resolvedBy?.name} on {dispute.resolvedAt && formatDate(dispute.resolvedAt)}
                                    </div>
                                </div>
                            )}

                            {isIndustry && dispute.status === 'open' && onResolve && (
                                <div className="pt-3 border-t">
                                    <Button
                                        size="sm"
                                        onClick={() => handleResolveClick(dispute)}
                                        disabled={loading}
                                        className="bg-green-600 hover:bg-green-700"
                                    >
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        Resolve Dispute
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Resolve Dialog */}
            <Dialog open={resolveDialogOpen} onOpenChange={setResolveDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Resolve Dispute</DialogTitle>
                        <DialogDescription>
                            Provide resolution details for dispute #{selectedDispute?.disputeId}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="resolution">Resolution *</Label>
                            <Textarea
                                id="resolution"
                                value={resolution}
                                onChange={(e) => setResolution(e.target.value)}
                                placeholder="Describe how this dispute was resolved..."
                                rows={4}
                                disabled={resolving}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setResolveDialogOpen(false)} disabled={resolving}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleResolveSubmit}
                            disabled={!resolution.trim() || resolving}
                            className="bg-green-600 hover:bg-green-700"
                        >
                            {resolving ? 'Resolving...' : 'Resolve Dispute'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};