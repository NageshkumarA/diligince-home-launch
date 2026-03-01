import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Pause, Play, XCircle, Calendar, AlertCircle
} from 'lucide-react';
import { ProjectActionModal } from './ProjectActionModal';
import { DateRevisionModal } from './DateRevisionModal';
import { pauseProject, resumeProject, terminateProject } from '@/services/modules/workflows/workflow.service';
import { toast } from 'sonner';

interface ProjectStatusActionsProps {
    workflowId: string;
    status: string;
    onUpdate: () => void;
}

export const ProjectStatusActions: React.FC<ProjectStatusActionsProps> = ({
    workflowId,
    status,
    onUpdate
}) => {
    const [pauseModalOpen, setPauseModalOpen] = useState(false);
    const [resumeModalOpen, setResumeModalOpen] = useState(false);
    const [terminateModalOpen, setTerminateModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handlePause = async (reason: string) => {
        setLoading(true);
        try {
            const response = await pauseProject(workflowId, reason);
            if (response.success) {
                toast.success('Project paused successfully');
                onUpdate();
                setPauseModalOpen(false);
            } else {
                toast.error(response.message || 'Failed to pause project');
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to pause project');
        } finally {
            setLoading(false);
        }
    };

    const handleResume = async (data: { newEndDate?: string; resumeNote?: string }) => {
        setLoading(true);
        try {
            const response = await resumeProject(workflowId, data.newEndDate, data.resumeNote);
            if (response.success) {
                toast.success('Project resumed successfully');
                onUpdate();
                setResumeModalOpen(false);
            } else {
                toast.error(response.message || 'Failed to resume project');
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to resume project');
        } finally {
            setLoading(false);
        }
    };

    const handleTerminate = async (data: { reason: string; settlementNotes?: string }) => {
        setLoading(true);
        try {
            const response = await terminateProject(workflowId, data.reason, data.settlementNotes);
            if (response.success) {
                toast.success('Project terminated successfully');
                onUpdate();
                setTerminateModalOpen(false);
            } else {
                toast.error(response.message || 'Failed to terminate project');
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to terminate project');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="flex items-center gap-3 flex-wrap">
                <Badge className={
                    status === 'active' ? 'bg-green-600' :
                    status === 'paused' ? 'bg-orange-600' :
                    status === 'disputed' ? 'bg-red-600' :
                    status === 'cancelled' ? 'bg-gray-600' :
                    'bg-blue-600'
                }>
                    {status.toUpperCase()}
                </Badge>

                {status === 'active' && (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPauseModalOpen(true)}
                        className="border-orange-300 text-orange-700 hover:bg-orange-50"
                    >
                        <Pause className="h-4 w-4 mr-2" />
                        Pause Project
                    </Button>
                )}

                {status === 'paused' && (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setResumeModalOpen(true)}
                        className="border-green-300 text-green-700 hover:bg-green-50"
                    >
                        <Play className="h-4 w-4 mr-2" />
                        Resume Project
                    </Button>
                )}

                {['active', 'paused', 'disputed'].includes(status) && (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setTerminateModalOpen(true)}
                        className="border-red-300 text-red-700 hover:bg-red-50"
                    >
                        <XCircle className="h-4 w-4 mr-2" />
                        Terminate Project
                    </Button>
                )}
            </div>

            {/* Pause Modal */}
            <ProjectActionModal
                open={pauseModalOpen}
                onOpenChange={setPauseModalOpen}
                title="Pause Project"
                description="Please provide a reason for pausing this project. All pending milestones will be paused."
                icon={<AlertCircle className="h-6 w-6 text-orange-600" />}
                actionLabel="Pause Project"
                actionVariant="destructive"
                reasonLabel="Reason for pausing"
                reasonPlaceholder="e.g., Site issues, pending approvals, budget constraints..."
                onSubmit={(reason) => handlePause(reason)}
                loading={loading}
            />

            {/* Resume Modal */}
            <DateRevisionModal
                open={resumeModalOpen}
                onOpenChange={setResumeModalOpen}
                title="Resume Project"
                description="Resume this project and optionally update the end date."
                onSubmit={(data) => handleResume(data)}
                loading={loading}
                includeDate={true}
                includeNote={true}
            />

            {/* Terminate Modal */}
            <ProjectActionModal
                open={terminateModalOpen}
                onOpenChange={setTerminateModalOpen}
                title="Terminate Project"
                description="This will permanently cancel the project. Please provide termination details and settlement notes if applicable."
                icon={<XCircle className="h-6 w-6 text-red-600" />}
                actionLabel="Terminate Project"
                actionVariant="destructive"
                reasonLabel="Termination reason"
                reasonPlaceholder="e.g., Contract breach, mutual agreement, force majeure..."
                includeNotes={true}
                notesLabel="Settlement notes (optional)"
                notesPlaceholder="Details about settlement, payments, or agreements..."
                onSubmit={(reason, notes) => handleTerminate({ reason, settlementNotes: notes })}
                loading={loading}
            />
        </>
    );
};
