import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, ArrowRight } from 'lucide-react';

interface DateRevision {
    revisedAt: string;
    revisedBy: { name: string };
    previousEndDate: string;
    newEndDate: string;
    reason: string;
}

interface DateRevisionTimelineProps {
    originalStartDate: string;
    originalEndDate: string;
    currentEndDate: string;
    revisions: DateRevision[];
}

export const DateRevisionTimeline: React.FC<DateRevisionTimelineProps> = ({
    originalStartDate,
    originalEndDate,
    currentEndDate,
    revisions
}) => {
    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    if (!revisions || revisions.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Project Timeline
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Start Date:</span>
                            <span className="font-medium">{formatDate(originalStartDate)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">End Date:</span>
                            <span className="font-medium">{formatDate(originalEndDate)}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Project Timeline
                    <Badge variant="outline" className="ml-auto">
                        {revisions.length} revision{revisions.length > 1 ? 's' : ''}
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Original Dates */}
                <div className="pb-4 border-b">
                    <div className="text-xs text-gray-500 mb-2">Original Timeline</div>
                    <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium">{formatDate(originalStartDate)}</span>
                        <ArrowRight className="h-3 w-3 text-gray-400" />
                        <span className="font-medium">{formatDate(originalEndDate)}</span>
                    </div>
                </div>

                {/* Revisions */}
                <div className="space-y-3">
                    <div className="text-xs text-gray-500">Date Revisions</div>
                    {revisions.map((revision, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-lg space-y-2">
                            <div className="flex items-start justify-between text-xs">
                                <span className="text-gray-600">
                                    {formatDate(revision.revisedAt)}
                                </span>
                                <Badge variant="secondary" className="text-xs">
                                    Revised by {revision.revisedBy?.name || 'Unknown'}
                                </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <span className="line-through text-gray-500">
                                    {formatDate(revision.previousEndDate)}
                                </span>
                                <ArrowRight className="h-3 w-3 text-green-600" />
                                <span className="font-medium text-green-700">
                                    {formatDate(revision.newEndDate)}
                                </span>
                            </div>
                            <div className="text-xs text-gray-600 italic">
                                {revision.reason}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Current End Date */}
                <div className="pt-4 border-t">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Current End Date:</span>
                        <span className="text-sm font-bold text-green-700">{formatDate(currentEndDate)}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};