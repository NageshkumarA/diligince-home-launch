
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNotificationStore } from '@/contexts/NotificationStoreContext';
import { formatTimeAgo } from '@/utils/dateUtils';
import { useNavigate } from 'react-router-dom';
import { Bell, Eye } from 'lucide-react';

interface NotificationPreviewProps {
  onViewAll: () => void;
}

export const NotificationPreview: React.FC<NotificationPreviewProps> = ({ onViewAll }) => {
  const { getRecentNotifications, unreadCount, markAsRead } = useNotificationStore();
  const navigate = useNavigate();
  const recentNotifications = getRecentNotifications(5);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleNotificationClick = (notification: any) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
  };

  if (recentNotifications.length === 0) {
    return (
      <div className="p-4 text-center">
        <Bell className="h-12 w-12 text-gray-300 mx-auto mb-2" />
        <p className="text-sm text-gray-500">No notifications yet</p>
      </div>
    );
  }

  return (
    <div className="max-h-96 overflow-y-auto">
      <div className="p-3 border-b bg-gray-50">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900">Recent Notifications</h3>
          {unreadCount > 0 && (
            <Badge className="bg-red-100 text-red-800 text-xs">
              {unreadCount} unread
            </Badge>
          )}
        </div>
      </div>
      
      <div className="divide-y divide-gray-100">
        {recentNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-3 hover:bg-gray-50 cursor-pointer transition-colors ${
              !notification.read ? 'bg-blue-50' : ''
            }`}
            onClick={() => handleNotificationClick(notification)}
          >
            <div className="flex items-start gap-3">
              <div className={`w-2 h-2 rounded-full mt-2 ${!notification.read ? 'bg-blue-500' : 'bg-gray-300'}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className={`text-sm truncate ${!notification.read ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                    {notification.title}
                  </h4>
                  <Badge className={getPriorityColor(notification.priority)} variant="outline">
                    {notification.priority}
                  </Badge>
                </div>
                <p className="text-xs text-gray-600 line-clamp-2 mb-1">
                  {notification.message}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {formatTimeAgo(notification.timestamp)}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {notification.category}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-3 border-t bg-gray-50">
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={onViewAll}
        >
          <Eye className="h-4 w-4 mr-2" />
          View All Notifications
        </Button>
      </div>
    </div>
  );
};
