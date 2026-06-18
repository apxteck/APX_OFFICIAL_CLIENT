import { useState, useEffect } from 'react';
import { useNotificationStore } from '@/store/notification.store';
import { Notification } from '@/app/services/api/notification.api';

interface InitialData {
  notifications: Notification[];
  total: number;
  unreadCount: number;
}

export function useNotificationsLogic(initialData: InitialData) {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const {
    notifications,
    unreadCount,
    hasMore,
    isLoading,
    loadMore,
    markRead,
    markAllRead,
    clearNotifications,
    hydrate,
  } = useNotificationStore();

  useEffect(() => {
    // Only hydrate if initialData exists, and the store internally will ensure
    // it only hydrates if its own state is empty to prevent overrides.
    if (initialData) {
      hydrate(initialData);
    }
  }, [initialData, hydrate]);

  const filteredNotifications = notifications.filter((n) => {
    if (filter === 'unread') return !n.isRead;
    return true;
  });

  return {
    filter,
    setFilter,
    notifications,
    filteredNotifications,
    unreadCount,
    hasMore,
    isLoading,
    loadMore,
    markRead,
    markAllRead,
    clearNotifications,
  };
}
