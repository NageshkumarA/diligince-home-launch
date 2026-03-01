import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, CheckCircle, AlertTriangle, Clock, Send } from 'lucide-react';
import { toast } from 'sonner';

interface ProgressUpdate {
    submittedAt: string;
    submittedBy: { name: string; email: string };
    progressPercent: number;
    note: string;
    status: 'submitted' | 'acknowledged' | 'flagged';
    acknowledgedAt?: string;
    acknowledgedBy?: { name: string };
    reviewComment?: string;
}

interface MilestoneProgressFeedProps {
    workflowId: string;
    milestoneId: string;
    milestoneName: string;
    progressUpdates: ProgressUpdate[];
    isVendor: boolean;
    onSubmitProgress?: (progressPercent: number, note: string) => Promise<void>;
    onReviewProgress?: (updateIndex: number, decision: 'acknowledge' | 'flag', comment?: string) => Promise<void>;
    onRefresh: () => void;
}

export const MilestoneProgressFeed: React.FC<MilestoneProgressFeedProps> = ({
    workflowId,
    milestoneId,
    milestoneName,
    progressUpdates,
    isVendor,
    onSubmitProgress,
    onReviewProgress,
    onRefresh
}) => {
    const [progressPercent, setProgressPercent] = useState<string>('');
    const [note, setNote] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [reviewingIndex, setReviewingIndex] = useState<number | null>(null);
    const [reviewComment, setReviewComment] = useState('');

    const handleSubmit = async () => {
        if (!onSubmitProgress) return;
        
        const percent = parseFloat(progressPercent);
        if (isNaN(percent) || percent < 0 || percent > 100) {
            toast.error('Progress must be between 0 and 100');
            return;
        }

        setSubmitting(true);
        try {
            await onSubmitProgress(percent, note);
            setProgressPercent('');
            setNote('');
            toast.success('Progress submitted successfully');
            onRefresh();
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to submit progress');
        } finally {
            setSubmitting(false);
        }
    };

    const handleReview = async (index: number, decision: 'acknowledge' | 'flag') => {
        if (!onReviewProgress) return;

        setReviewingIndex(index);
        try {
            await onReviewProgress(index, decision, reviewComment);
            setReviewComment('');
            toast.success(`Progress ${decision}d successfully`);
            onRefresh();
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to review progress');
        } finally {
            setReviewingIndex(null);
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
            submitted: { className: 'bg-blue-100 text-blue-800', icon: <Clock className="h-3 w-3" /> },
            acknowledged: { className: 'bg-green-100 text-green-800', icon: <CheckCircle className="h-3 w-3" /> },
            flagged: { className: 'bg-red-100 text-red-800', icon: <AlertTriangle className="h-3 w-3" /> }
        };
        
        const variant = variants[status] || variants.submitted;
        return (
            <Badge className={variant.className}>
                {variant.icon}
                <span className="ml-1">{status.toUpperCase()}</span>
            </Badge>
        );
    };

    const latestProgress = progressUpdates && progressUpdates.length > 0 
        ? progressUpdates[progressUpdates.length - 1].progressPercent 
        : 0;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Progress Updates
                    {latestProgress > 0 && (
                        <Badge variant="outline" className="ml-auto">
                            {latestProgress}% Complete
                        </Badge>
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Vendor: Submit Progress Form */}
                {isVendor && onSubmitProgress && (
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 space-y-4">
                        <h4 className="font-medium text-sm">Submit Progress Update</h4>
                        <div className="space-y-3">
                            <div className="space-y-2">
                                <Label htmlFor="progressPercent">Progress Percentage *</Label>
                                <div className="flex items-center gap-3">
                                    <Input
                                        id="progressPercent"
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={progressPercent}
                                        onChange={(e) => setProgressPercent(e.target.value)}
                                        placeholder="0"
                                        disabled={submitting}
                                        className="w-24"
                                    />
                                    <span className="text-sm text-gray-600">%</span>
                                    {progressPercent && (
                                        <div className="flex-1">
                                            <Progress value={parseFloat(progressPercent)} className="h-2" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="note">Progress Notes (optional)</Label>
                                <Textarea
                                    id="note"
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    placeholder="Describe the work completed, challenges faced, next steps..."
                                    rows={3}
                                    disabled={submitting}
                                    className="resize-none"
                                />
                            </div>

                            <Button
                                onClick={handleSubmit}
                                disabled={!progressPercent || submitting}
                                className="w-full"
                            >
                                {submitting ? (
                                    'Submitting...'
                                ) : (
                                    <>
                                        <Send className="h-4 w-4 mr-2" />
                                        Submit Progress
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                )}

                {/* Progress Timeline */}
                {progressUpdates && progressUpdates.length > 0 ? (
                    <div className="space-y-4">
                        <h4 className="font-medium text-sm text-gray-700">Progress History</h4>
                        <div className="space-y-3">
                            {progressUpdates.map((update, index) => (
                                <div key={index} className="p-4 border rounded-lg space-y-3">
                                    <div className="flex items-start justify-between">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-2xl font-bold text-blue-600">
                                                    {update.progressPercent}%
                                                </span>
                                                {getStatusBadge(update.status)}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                Submitted by {update.submittedBy.name} on {formatDate(update.submittedAt)}
                                            </div>
                                        </div>
                                        <Progress value={update.progressPercent} className="w-32 h-2" />
                                    </div>

                                    {update.note && (
                                        <p className="text-sm text-gray-700">{update.note}</p>
                                    )}

                                    {update.status === 'acknowledged' && update.acknowledgedBy && (
                                        <div className="pt-2 border-t bg-green-50 -m-4 mt-2 p-3 rounded-b-lg">
                                            <div className="text-xs text-green-700">
                                                <CheckCircle className="h-3 w-3 inline mr-1" />
                                                Acknowledged by {update.acknowledgedBy.name} on {update.acknowledgedAt && formatDate(update.acknowledgedAt)}
                                            </div>
                                            {update.reviewComment && (
                                                <p className="text-xs text-gray-600 mt-1">{update.reviewComment}</p>
                                            )}
                                        </div>
                                    )}

                                    {update.status === 'flagged' && update.acknowledgedBy && (
                                        <div className="pt-2 border-t bg-red-50 -m-4 mt-2 p-3 rounded-b-lg">
                                            <div className="text-xs text-red-700">
                                                <AlertTriangle className="h-3 w-3 inline mr-1" />
                                                Flagged by {update.acknowledgedBy.name} on {update.acknowledgedAt && formatDate(update.acknowledgedAt)}
                                            </div>
                                            {update.reviewComment && (
                                                <p className="text-xs text-gray-600 mt-1">{update.reviewComment}</p>
                                            )}
                                        </div>
                                    )}

                                    {/* Industry: Review Actions */}
                                    {!isVendor && onReviewProgress && update.status === 'submitted' && (
                                        <div className="pt-3 border-t space-y-2">
                                            <Label htmlFor={`review-${index}`} className="text-xs">Review Comment (optional)</Label>
                                            <Textarea
                                                id={`review-${index}`}
                                                value={reviewingIndex === index ? reviewComment : ''}
                                                onChange={(e) => setReviewComment(e.target.value)}
                                                placeholder="Add feedback or notes..."
                                                rows={2}
                                                disabled={reviewingIndex !== null && reviewingIndex !== index}
                                                className="text-sm resize-none"
                                            />
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleReview(index, 'acknowledge')}
                                                    disabled={reviewingIndex !== null}
                                                    className="flex-1 bg-green-600 hover:bg-green-700"
                                                >
                                                    {reviewingIndex === index ? (
                                                        'Acknowledging...'
                                                    ) : (
                                                        <>
                                                            <CheckCircle className="h-4 w-4 mr-1" />
                                                            Acknowledge
                                                        </>
                                                    )}
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleReview(index, 'flag')}
                                                    disabled={reviewingIndex !== null}
                                                    className="flex-1 border-red-300 text-red-700 hover:bg-red-50"
                                                >
                                                    {reviewingIndex === index ? (
                                                        'Flagging...'
                                                    ) : (
                                                        <>
                                                            <AlertTriangle className="h-4 w-4 mr-1" />
                                                            Flag Issue
                                                        </>
                                                    )}
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        <TrendingUp className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                        <p className="text-sm">No progress updates submitted yet</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
