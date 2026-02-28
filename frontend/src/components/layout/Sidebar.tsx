"use client";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home, LayoutDashboard, Store,
  BarChart3, DollarSign,
  User, HelpCircle, ChevronDown, ChevronRight
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href?: string;
  children?: { label: string; href: string }[];
  managerOnly?: boolean;
}

const navItems: NavItem[] = [
  { label: "Home", icon: <Home size={18} />, href: "/", children: [] },
  { label: "Dashboard", icon: <LayoutDashboard size={18} />, href: "/dashboard", managerOnly: true },
  {
    label: "Store", icon: <Store size={18} />, children: [
      { label: "Product", href: "/products" },
      { label: "Add Product", href: "/products/add" },
    ],
  },
  {
    label: "Analytic", icon: <BarChart3 size={18} />, children: [
      { label: "Traffic", href: "#" },
      { label: "Earning", href: "#" },
    ],
  },
  {
    label: "Finances", icon: <DollarSign size={18} />, children: [
      { label: "Payment", href: "#" },
      { label: "Payout", href: "#" },
    ],
  },
  {
    label: "Account Setting", icon: <User size={18} />, children: [
      { label: "My Profile", href: "#" },
      { label: "Security", href: "#" },
    ],
  },
  { label: "Help And Support", icon: <HelpCircle size={18} />, children: [] },
];

export default function Sidebar() {
  const { isManager } = useAuth();
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<string[]>(["Store"]);

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) =>
      prev.includes(label) ? prev.filter((m) => m !== label) : [...prev, label]
    );
  };

  const filteredItems = navItems.filter(
    (item) => !item.managerOnly || isManager
  );

  return (
    <aside className="w-[220px] min-h-screen bg-transparent dark:bg-black flex flex-col">
      {/* Logo */}
      <div className="px-5 py-4 flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-200 flex items-center justify-center text-gray-400 dark:text-gray-400 text-sm font-bold">
          B
        </div>
        <span className="text-lg font-semibold text-gray-800 dark:text-white">Bitstore</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {filteredItems.map((item) => {
          const isOpen = openMenus.includes(item.label);
          const hasChildren = item.children && item.children.length > 0;
          const isActive = item.href === pathname;

          if (!hasChildren && item.href) {
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-white dark:bg-gray-900 text-black dark:text-white border border-gray-200 dark:border-gray-800 font-medium"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          }

          return (
            <div key={item.label}>
              <button
                onClick={() => toggleMenu(item.label)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800`}
              >
                {item.icon}
                <span className="flex-1 text-left">{item.label}</span>
                {hasChildren && (
                  isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />
                )}
              </button>
              {isOpen && item.children && (
                <div className="ml-7 mt-1 border-l-2 border-gray-300 dark:border-gray-600 pl-4 space-y-0.5">
                  {item.children.map((child) => {
                    const childActive = child.href === pathname;
                    return (
                      <Link
                        key={child.label}
                        href={child.href}
                        className={`block px-3 py-1.5 text-sm rounded-md transition-colors ${
                          childActive
                            ? "text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 font-medium"
                            : "text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                        }`}
                      >
                        {child.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

    </aside>
  );
}
