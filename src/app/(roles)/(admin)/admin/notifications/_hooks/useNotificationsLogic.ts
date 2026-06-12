import { useEffect } from "react";
import { useNotificationsStore } from "../_store/useNotificationsStore";
import { notificationsService } from "../_services/notificationsService";

export const useNotificationsLogic = () => {
  const { notifications, isLoading, setNotifications, setLoading } = useNotificationsStore();

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const data = await notificationsService.getNotifications();
        setNotifications(data);
      } catch (error) {
        console.error("Failed to fetch notifications", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [setNotifications, setLoading]);

  const handleGoBack = () => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  return {
    notifications,
    isLoading,
    handleGoBack,
  };
};
