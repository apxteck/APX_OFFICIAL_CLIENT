import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { tasksService, Task } from "@/services/admin/tasks.service";
import { useTasksStore } from "../_store/useTasksStore";

export const useTasksLogic = () => {
  const store = useTasksStore();
  const router = useRouter();

  const fetchTasks = () => {
    store.setIsLoading(true);
    tasksService.getTasks()
      .then(data => {
        store.setTasks(data);
        store.setIsLoading(false);
      })
      .catch((err) => {
        toast.error("Failed to load tasks");
        store.setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdateStatus = async (id: number, status: Task["status"]) => {
    const toastId = toast.loading("Updating status...");
    try {
      await tasksService.updateTaskStatus(id, status);
      toast.success(`Task marked as ${status.replace("_", " ")}`, { id: toastId });
      fetchTasks();
    } catch (err: any) {
      toast.error(err.message || "Failed to update status", { id: toastId });
    }
  };

  const handleDeleteTaskClick = (id: number) => {
    store.setTaskToDelete(id);
    store.setIsDeleteModalOpen(true);
  };

  const confirmDeleteTask = async () => {
    if (!store.taskToDelete) return;
    store.setIsDeleting(true);
    try {
      await tasksService.deleteTask(store.taskToDelete);
      toast.success("Task deleted successfully");
      store.setIsDeleteModalOpen(false);
      fetchTasks();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete task");
    } finally {
      store.setIsDeleting(false);
      store.setTaskToDelete(null);
    }
  };

  const filteredTasks = useMemo(() => {
    return store.tasks.filter(task => 
      task.title.toLowerCase().includes(store.searchTerm.toLowerCase()) ||
      (task.assignedTo?.fullName && task.assignedTo.fullName.toLowerCase().includes(store.searchTerm.toLowerCase()))
    );
  }, [store.tasks, store.searchTerm]);

  const navigateToCreate = () => router.push('/admin/tasks/new');
  const navigateToDetails = (id: number) => router.push(`/admin/tasks/${id}`);

  return {
    ...store,
    filteredTasks,
    handleUpdateStatus,
    handleDeleteTaskClick,
    confirmDeleteTask,
    navigateToCreate,
    navigateToDetails,
  };
};
