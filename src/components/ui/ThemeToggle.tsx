"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10 rounded-full bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-white/5" />;
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-[#1a1a1a] overflow-hidden transition-all shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-[#222]"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{
          rotate: theme === "dark" ? 0 : -90,
          scale: theme === "dark" ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="absolute text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors"
      >
        <Moon className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
      </motion.div>

      <motion.div
        initial={false}
        animate={{
          rotate: theme === "light" ? 0 : 90,
          scale: theme === "light" ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="absolute text-gray-500 group-hover:text-gray-900 transition-colors"
      >
        <Sun className="w-5 h-5" />
      </motion.div>
    </motion.button>
  );
}
