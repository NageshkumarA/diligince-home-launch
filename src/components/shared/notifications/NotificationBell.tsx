
import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useNotificationStore } from '@/contexts/NotificationStoreContext';
import { NotificationPreview } from './NotificationPreview';
import { NotificationPanel } from './NotificationPanel';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface NotificationBellProps {
  theme: {
    buttonHoverColor: string;
  };
}

export const NotificationBell: React.FC<NotificationBellProps> = ({ theme }) => {
  const { unreadCount } = useNotificationStore();
  const [showPreview, setShowPreview] = useState(false);
  const [showPanel, setShowPanel] = useState(false);

  const handleBellClick = () => {
    setShowPanel(true);
    setShowPreview(false);
  };

  return (
    <>
      <Popover open={showPreview} onOpenChange={setShowPreview}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={`relative ${theme.buttonHoverColor}`}
            onClick={handleBellClick}
            onMouseEnter={() => setShowPreview(true)}
            onMouseLeave={() => setTimeout(() => setShowPreview(false), 300)}
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <Badge
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 hover:bg-red-500 text-white text-xs animate-pulse"
                variant="default"
              >
                {unreadCount > 99 ? '99+' : unreadCount}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-80 p-0"
          align="end"
          onMouseEnter={() => setShowPreview(true)}
          onMouseLeave={() => setShowPreview(false)}
        >
          <NotificationPreview onViewAll={() => setShowPanel(true)} />
        </PopoverContent>
      </Popover>

      <Dialog open={showPanel} onOpenChange={setShowPanel}>
        <DialogContent className="max-w-2xl max-h-[80vh] p-0">
          <NotificationPanel onClose={() => setShowPanel(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
};
