
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useEnhancedApproval } from '@/contexts/EnhancedApprovalContext';
import { 
  Bell, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle,
  User,
  FileText,
  Workflow 
} from 'lucide-react';

const ApprovalNotificationCenter = () => {
  const { 
    notifications, 
    unreadNotifications, 
    markNotificationAsRead 
  } = useEnhancedApproval();
  
  const [showAll, setShowAll] = useState(false);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'approval_request':
        return <Clock className="h-4 w-4 text-orange-500" />;
      case 'approval_approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'approval_rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'workflow_completed':
        return <Workflow className="h-4 w-4 text-blue-500" />;
      case 'escalation':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'low':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const displayedNotifications = showAll ? notifications : notifications.slice(0, 5);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Approval Notifications
            {unreadNotifications > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadNotifications}
              </Badge>
            )}
          </CardTitle>
          {notifications.length > 5 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'Show Less' : 'Show All'}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {notifications.length === 0 ? (
          <div className="text-center py-8">
            <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No notifications yet</p>
            <p className="text-sm text-gray-400">Approval updates will appear here</p>
          </div>
        ) : (
          <ScrollArea className="max-h-96">
            <div className="space-y-3">
              {displayedNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border transition-colors ${
                    notification.isRead 
                      ? 'bg-gray-50 border-gray-200' 
                      : 'bg-white border-blue-200 shadow-sm'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={`text-sm font-medium ${
                          notification.isRead ? 'text-gray-700' : 'text-gray-900'
                        }`}>
                          {notification.title}
                        </h4>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getPriorityColor(notification.priority)}`}
                        >
                          {notification.priority}
                        </Badge>
                      </div>
                      
                      <p className={`text-sm ${
                        notification.isRead ? 'text-gray-500' : 'text-gray-600'
                      }`}>
                        {notification.message}
                      </p>
                      
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-400">
                          {formatTimestamp(notification.timestamp)}
                        </span>
                        
                        {!notification.isRead && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs h-6 px-2"
                            onClick={() => markNotificationAsRead(notification.id)}
                          >
                            Mark as read
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default ApprovalNotificationCenter;
