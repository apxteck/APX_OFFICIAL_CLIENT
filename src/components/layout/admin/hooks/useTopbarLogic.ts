import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useUiStore } from "@/store/uiStore";
import { useAuth } from "@/providers/AuthProvider";

export const useTopbarLogic = () => {
  const pathname = usePathname();
  const { toggleMobileSidebar } = useUiStore();
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);

  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };

    const handleGlobalSearchShortcut = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsGlobalSearchOpen((prev) => !prev);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleGlobalSearchShortcut);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleGlobalSearchShortcut);
    };
  }, []);
  
  const getPageTitle = () => {
    if (pathname === "/admin") return "Overview";
    const pathParts = pathname.split("/");
    const lastPart = pathParts[pathParts.length - 1];
    return lastPart.charAt(0).toUpperCase() + lastPart.slice(1);
  };

  return {
    pathname,
    toggleMobileSidebar,
    user,
    mounted,
    isGlobalSearchOpen,
    setIsGlobalSearchOpen,
    isNotificationsOpen,
    setIsNotificationsOpen,
    notifRef,
    getPageTitle,
  };
};
