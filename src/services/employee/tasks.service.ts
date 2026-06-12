import apiClient from '@/lib/axios';
import { Task } from '@/services/admin/tasks.service';

export interface TasksResponse {
  success: boolean;
  message: string;
  data: {
    data: Task[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  };
}

export const tasksService = {
  getMyTasks: async (params?: { page?: number; limit?: number; status?: string; priority?: string }): Promise<TasksResponse> => {
    try {
      const response = await apiClient.get('/task/mine', { params });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch my tasks", error);
      throw error;
    }
  },

  getMyTaskById: async (id: number): Promise<Task | null> => {
    try {
      const response = await apiClient.get(`/task/mine/${id}`);
      return response.data?.data || null;
    } catch (error) {
      console.error("Failed to fetch task details", error);
      return null;
    }
  },

  updateTaskStatus: async (id: number, status: Task["status"]): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await apiClient.patch(`/task/mine/${id}/status`, { status });
      return { success: response.data.success, message: response.data.message };
    } catch (error: any) {
      console.error("Failed to update task status", error);
      throw error;
    }
  }
};
