import axios from 'axios';
import { Notification } from '../_types';

// Mock service for handling notification-related API requests
export const notificationsService = {
  getNotifications: async (): Promise<Notification[]> => {
    // In a real scenario, this would be an actual Axios call:
    // const response = await axios.get('/api/notifications');
    // return response.data;

    // Returning an empty array for the construction state
    return [];
  },

  markAsRead: async (id: string): Promise<void> => {
    // await axios.patch(`/api/notifications/${id}/read`);
  },
};
