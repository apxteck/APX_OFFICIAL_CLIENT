import { create } from "zustand";
import { Task } from "@/services/admin/tasks.service";

interface TasksState {
  tasks: Task[];
  isLoading: boolean;
  searchTerm: string;
  isDeleteModalOpen: boolean;
  taskToDelete: number | null;
  isDeleting: boolean;

  setTasks: (tasks: Task[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setSearchTerm: (term: string) => void;
  setIsDeleteModalOpen: (isOpen: boolean) => void;
  setTaskToDelete: (id: number | null) => void;
  setIsDeleting: (isDeleting: boolean) => void;
}

export const useTasksStore = create<TasksState>((set) => ({
  tasks: [],
  isLoading: true,
  searchTerm: "",
  isDeleteModalOpen: false,
  taskToDelete: null,
  isDeleting: false,

  setTasks: (tasks) => set({ tasks }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  setIsDeleteModalOpen: (isDeleteModalOpen) => set({ isDeleteModalOpen }),
  setTaskToDelete: (taskToDelete) => set({ taskToDelete }),
  setIsDeleting: (isDeleting) => set({ isDeleting }),
}));
