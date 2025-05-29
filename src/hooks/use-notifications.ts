
import { useState, useCallback } from 'react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'message' | 'email' | 'task' | 'system';
  timestamp: Date;
  isRead: boolean;
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New Message',
      message: 'You have a new message from Sarah Chen about the design review.',
      type: 'message',
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      isRead: false,
    },
    {
      id: '2',
      title: 'Task Assignment',
      message: 'You have been assigned to the Mobile App Development task.',
      type: 'task',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      isRead: false,
    },
    {
      id: '3',
      title: 'Email Notification',
      message: 'Weekly project report is ready for review.',
      type: 'email',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      isRead: false,
    },
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  }, []);

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      isRead: false,
    };
    setNotifications(prev => [newNotification, ...prev]);
  }, []);

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    addNotification,
  };
};
