import React, { Suspense } from 'react';
// Removed dynamic import
import { NotificationsHeader } from './_components/NotificationsHeader';
import { fetchNotifications, Notification } from '@/app/services/api/notification.api';
import NotificationsLoading from './loading';

// Lazy load the client component to prevent hydration issues
import { NotificationsCenter } from './_components/NotificationsCenter';

async function NotificationsFetcher() {
  let initialData: { notifications: Notification[]; total: number; unreadCount: number } = {
    notifications: [],
    total: 0,
    unreadCount: 0,
  };
  try {
    initialData = await fetchNotifications(1, 20);
  } catch (error) {
    console.error('Failed to pre-fetch notifications:', error);
  }
  return <NotificationsCenter initialData={initialData} />;
}

export default function NotificationsPage() {
  return (
    <div className="space-y-6 w-full max-w-7xl mx-auto pb-safe pb-10 px-4 sm:px-6 md:px-8">
      <NotificationsHeader />
      <Suspense fallback={<NotificationsLoading />}>
        <NotificationsFetcher />
      </Suspense>
    </div>
  );
}
