import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { usersService } from "@/services/admin/users.service";
import { blogsService } from "@/services/admin/blogs.service";
import { Home, Users, Settings, FileText, Shield, CreditCard, TrendingUp, CheckSquare, Layers } from "lucide-react";

export const STATIC_SEARCH_DATA = [
  {
    category: "Navigation",
    items: [
      { id: "nav-dashboard", name: "Dashboard Overview", href: "/admin", icon: Home },
      { id: "nav-users", name: "Users Management", href: "/admin/users", icon: Users },
      { id: "nav-roles", name: "Roles & Permissions", href: "/admin/roles", icon: Shield },
      { id: "nav-payments", name: "Payments", href: "/admin/payments", icon: CreditCard },
      { id: "nav-leads", name: "Leads & CRM", href: "/admin/leads", icon: TrendingUp },
      { id: "nav-tasks", name: "Tasks", href: "/admin/tasks", icon: CheckSquare },
      { id: "nav-services", name: "Services", href: "/admin/services", icon: Layers },
      { id: "nav-blog", name: "Blog Posts", href: "/admin/blog", icon: FileText },
      { id: "nav-settings", name: "System Settings", href: "/admin/settings", icon: Settings },
    ]
  },
  {
    category: "Quick Actions",
    items: [
      { id: "act-new-user", name: "Create New User", href: "/admin/users/create", icon: Users },
      { id: "act-new-blog", name: "Write New Blog Post", href: "/admin/blog/new", icon: FileText },
    ]
  }
];

export const useGlobalSearchLogic = (isOpen: boolean, onClose: () => void) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [dynamicResults, setDynamicResults] = useState<{ category: string; items: any[] }[]>([]);
  
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchDeepData = async (searchQuery: string) => {
      if (searchQuery.trim().length < 2) {
        setDynamicResults([]);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      try {
        const [usersRes, blogsRes] = await Promise.allSettled([
          usersService.getUsers(),
          blogsService.getPosts()
        ]);

        const newDynamicResults = [];
        const q = searchQuery.toLowerCase();

        if (usersRes.status === "fulfilled" && usersRes.value) {
          const matchedUsers = usersRes.value.filter(u => 
            u.fullName?.toLowerCase().includes(q) || 
            u.email?.toLowerCase().includes(q) ||
            u.phone?.includes(q)
          ).slice(0, 5);

          if (matchedUsers.length > 0) {
            newDynamicResults.push({
              category: "Users (Database)",
              items: matchedUsers.map(u => ({
                id: `db-user-${u.id}`,
                name: `${u.fullName} (${u.email})`,
                href: `/admin/users/${u.id}`,
                icon: Users
              }))
            });
          }
        }

        if (blogsRes.status === "fulfilled" && blogsRes.value) {
          const matchedBlogs = blogsRes.value.filter(b => 
            b.title?.toLowerCase().includes(q) || 
            b.excerpt?.toLowerCase().includes(q)
          ).slice(0, 5);

          if (matchedBlogs.length > 0) {
            newDynamicResults.push({
              category: "Blog Posts (Database)",
              items: matchedBlogs.map(b => ({
                id: `db-blog-${b.id}`,
                name: b.title,
                href: `/admin/blog/${b.id}`,
                icon: FileText
              }))
            });
          }
        }

        setDynamicResults(newDynamicResults);
      } catch (error) {
        console.error("Deep search failed:", error);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      if (query.trim().length >= 2) {
        fetchDeepData(query);
      } else {
        setDynamicResults([]);
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  const combinedData = useMemo(() => {
    return [
      ...STATIC_SEARCH_DATA.map((group) => ({
        ...group,
        items: group.items.filter((item) =>
          item.name.toLowerCase().includes(query.toLowerCase())
        ),
      })).filter((group) => group.items.length > 0),
      ...dynamicResults
    ];
  }, [query, dynamicResults]);

  const flatItems = useMemo(() => combinedData.flatMap((group) => group.items), [combinedData]);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setDynamicResults([]);
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (flatItems.length || 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + flatItems.length) % (flatItems.length || 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (flatItems.length > 0) {
          const selectedItem = flatItems[selectedIndex];
          if (selectedItem?.href) {
            router.push(selectedItem.href);
            onClose();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, flatItems, selectedIndex, onClose, router]);

  useEffect(() => {
    if (isOpen && listRef.current) {
      const activeEl = listRef.current.querySelector('[aria-selected="true"]');
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [selectedIndex, isOpen, query, dynamicResults]);

  return {
    query, setQuery,
    selectedIndex, setSelectedIndex,
    isSearching, combinedData, flatItems,
    inputRef, listRef,
    router
  };
};
