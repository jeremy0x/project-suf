import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  DashboardSquareIcon,
  Package02Icon,
  GalleryHorizontalEndIcon,
  Globe02Icon,
  Tag01Icon,
  ShoppingBag02Icon,
  Logout01Icon,
} from "@hugeicons/core-free-icons";
import Logo from "@/components/Logo";

type Tab = "dashboard" | "products" | "gallery" | "site" | "pricing";

interface AdminSidebarProps {
  activeTab: Tab;
  onLogout: () => void;
  mobileOpen: boolean;
  onMobileToggle: (open: boolean) => void;
}

export function AdminSidebar({
  activeTab,
  onLogout,
  mobileOpen,
  onMobileToggle,
}: AdminSidebarProps) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const isExpanded = mobileOpen || hovered;

  const items = [
    { key: "dashboard" as Tab, label: "Dashboard", icon: DashboardSquareIcon },
    { key: "products" as Tab, label: "Products", icon: Package02Icon },
    { key: "gallery" as Tab, label: "Gallery", icon: GalleryHorizontalEndIcon },
    { key: "site" as Tab, label: "Site Images", icon: Globe02Icon },
    { key: "pricing" as Tab, label: "Pricing", icon: Tag01Icon },
  ];

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 dark:bg-black/70 z-40 lg:hidden"
          onClick={() => onMobileToggle(false)}
        />
      )}

      <aside
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`fixed left-0 top-0 z-50 h-screen ${isExpanded ? "w-56" : "w-16"} border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 flex flex-col transition-all duration-300 ease-in-out lg:translate-x-0 overflow-hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          aria-hidden="true"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)`,
            backgroundSize: `28px 28px`,
          }}
        />
        <div className="flex h-16 items-center justify-center border-b border-gray-200 dark:border-gray-800">
          <Logo className="h-10 w-auto shrink-0 dark:hidden" variant="header" />
          <Logo className="h-10 w-auto shrink-0 hidden dark:block" variant="white" />
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-2 space-y-1 [&::-webkit-scrollbar]:hidden">
          {items.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                navigate(`/admin/${item.key}`);
                onMobileToggle(false);
              }}
              aria-label={item.label}
              className={`w-full flex items-center justify-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === item.key
                  ? "bg-brand-blue/10 text-brand-blue"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800/50"
              }`}
            >
              <HugeiconsIcon icon={item.icon} size={20} className="shrink-0" />
              <span className={`whitespace-nowrap text-left flex-1 ${isExpanded ? "block" : "hidden"}`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>

        <div className="p-3 border-t border-gray-200 dark:border-gray-800 space-y-1">
          <a
            href="/shop"
            target="_blank"
            aria-label="View Shop"
            className={`w-full flex items-center justify-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800/50 transition-all`}
          >
            <HugeiconsIcon icon={ShoppingBag02Icon} size={20} className="shrink-0" />
            <span className={`whitespace-nowrap text-left flex-1 ${isExpanded ? "block" : "hidden"}`}>
              View Shop
            </span>
          </a>
          <button
            onClick={onLogout}
            aria-label="Logout"
            className={`w-full flex items-center justify-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all`}
          >
            <HugeiconsIcon icon={Logout01Icon} size={20} className="shrink-0" />
            <span className={`whitespace-nowrap text-left flex-1 ${isExpanded ? "block" : "hidden"}`}>
              Logout
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}
