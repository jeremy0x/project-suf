import { useState, useEffect, useCallback, lazy, Suspense } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import { LoaderPinwheelIcon, Menu01Icon } from "@hugeicons/core-free-icons";
import { verifyToken, getCookie, eraseCookie } from "@/lib/crypto";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

const DashboardTab = lazy(() => import("@/components/admin/DashboardTab").then((m) => ({ default: m.DashboardTab })));
const ProductsTab = lazy(() => import("@/components/admin/ProductsTab").then((m) => ({ default: m.ProductsTab })));
const GalleryTab = lazy(() => import("@/components/admin/GalleryTab").then((m) => ({ default: m.GalleryTab })));
const SiteImagesTab = lazy(() => import("@/components/admin/SiteImagesTab").then((m) => ({ default: m.SiteImagesTab })));

type Tab = "dashboard" | "products" | "gallery" | "site";

const TAB_LABELS: Record<Tab, string> = {
  dashboard: "Dashboard",
  products: "Products",
  gallery: "Gallery",
  site: "Site Images",
};

function TabFallback() {
  return (
    <div className="flex items-center justify-center py-20">
      <HugeiconsIcon icon={LoaderPinwheelIcon} size={32} className="text-brand-blue animate-spin" />
    </div>
  );
}

export default function Admin() {
  const location = useLocation();
  const navigate = useNavigate();
  const pathTab = location.pathname.replace(/^\/admin\/?/, "");
  const activeTab = (pathTab && TAB_LABELS[pathTab as Tab] ? pathTab : "dashboard") as Tab;

  const [authenticated, setAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    async function verifyPersistedSession() {
      try {
        const token = getCookie("suf_admin_token");
        if (token) {
          const isValid = await verifyToken(token);
          if (isValid) {
            setAuthenticated(true);
          } else {
            eraseCookie("suf_admin_token");
          }
        }
      } catch (err) {
        console.error("Auto-login error:", err);
      } finally {
        setCheckingAuth(false);
      }
    }
    verifyPersistedSession();
  }, []);

  const handleLogout = useCallback(async () => {
    setShowLogoutConfirm(false);
    setIsLoggingOut(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    eraseCookie("suf_admin_token");
    setAuthenticated(false);
    setIsLoggingOut(false);
  }, []);

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center gap-4">
        <HugeiconsIcon icon={LoaderPinwheelIcon} size={48} className="text-brand-blue animate-spin" />
        <p className="text-white font-medium font-heading tracking-wide animate-pulse">Loading...</p>
      </div>
    );
  }

  if (isLoggingOut) {
    return (
      <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center gap-4 transition-all duration-500">
        <HugeiconsIcon icon={LoaderPinwheelIcon} size={48} className="text-brand-blue animate-spin" />
        <p className="text-white font-medium font-heading tracking-wide animate-pulse">Logging out...</p>
      </div>
    );
  }

  if (!authenticated) {
    return <AdminLogin onLogin={() => { setAuthenticated(true); navigate("/admin/dashboard", { replace: true }); }} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <AdminSidebar
        activeTab={activeTab}
        onLogout={() => setShowLogoutConfirm(true)}
        mobileOpen={mobileSidebarOpen}
        onMobileToggle={setMobileSidebarOpen}
      />

      <div className="lg:pl-16 min-h-screen">
        <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <HugeiconsIcon icon={Menu01Icon} size={20} />
            </button>
            <h1 className="font-heading font-bold text-2xl text-gray-950 dark:text-white">
              {TAB_LABELS[activeTab]}
            </h1>
          </div>
        </header>

        <main className="p-6 space-y-6">
          <Suspense fallback={<TabFallback />}>
            {activeTab === "dashboard" && <DashboardTab />}
            {activeTab === "products" && <ProductsTab />}
            {activeTab === "gallery" && <GalleryTab />}
            {activeTab === "site" && <SiteImagesTab />}
          </Suspense>
        </main>
      </div>

      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowLogoutConfirm(false)} />
          <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-sm p-6 border border-gray-200 dark:border-gray-800">
            <h3 className="font-heading font-bold text-lg mb-2">Confirm Logout</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              You will need to enter your admin password again to access the portal next time.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 text-sm font-medium border border-gray-200 dark:border-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
