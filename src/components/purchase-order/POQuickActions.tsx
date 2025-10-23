import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Eye, CheckCircle, XCircle, Download, Edit, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { POStatus } from '@/services/modules/purchase-orders';

interface POQuickActionsProps {
  orderId: string;
  status: POStatus;
  onApprove?: () => void;
  onReject?: () => void;
  onExport?: () => void;
}

export const POQuickActions: React.FC<POQuickActionsProps> = ({
  orderId,
  status,
  onApprove,
  onReject,
  onExport,
}) => {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/dashboard/purchase-orders/${orderId}`);
  };

  const showApprovalActions = status === 'pending_approval';

  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        variant="ghost"
        onClick={handleView}
        className="gap-1"
      >
        <Eye className="h-4 w-4" />
        View
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm" variant="ghost">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {showApprovalActions && (
            <>
              <DropdownMenuItem onClick={onApprove}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onReject}>
                <XCircle className="h-4 w-4 mr-2" />
                Reject
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuItem onClick={handleView}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onExport}>
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
