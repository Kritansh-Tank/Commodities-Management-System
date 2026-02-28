"use client";
import { useTheme } from "@/lib/theme-context";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 mx-auto transition-colors"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
      <div className={`toggle-track ${isDark ? "active" : ""}`}>
        <div className="toggle-thumb" />
      </div>
    </button>
  );
}
