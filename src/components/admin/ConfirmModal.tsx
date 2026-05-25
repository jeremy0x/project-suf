import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";

interface ConfirmModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  destructive?: boolean;
}

export function ConfirmModal({
  open, onConfirm, onCancel, title, message, confirmLabel = "Delete", destructive = true,
}: ConfirmModalProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onCancel(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onCancel]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[100]"
            onClick={onCancel}
          />
          {isMobile ? (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 260 }}
              className="fixed bottom-0 left-0 right-0 z-[101] bg-white dark:bg-gray-900 rounded-t-3xl shadow-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-bold text-lg">{title}</h3>
                <button onClick={onCancel} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                  <HugeiconsIcon icon={Cancel01Icon} size={18} />
                </button>
              </div>
              <p className="text-sm text-gray-500 mb-6">{message}</p>
              <div className="flex gap-3">
                <button
                  onClick={onCancel}
                  className="flex-1 px-4 py-2.5 rounded-full border border-gray-300 dark:border-gray-600 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  className={`flex-1 px-4 py-2.5 rounded-full text-sm font-medium text-white transition-opacity hover:opacity-90 ${destructive ? "bg-red-500" : "bg-brand-blue"}`}
                >
                  {confirmLabel}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-sm p-6 border border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading font-bold text-lg">{title}</h3>
                  <button onClick={onCancel} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                    <HugeiconsIcon icon={Cancel01Icon} size={18} />
                  </button>
                </div>
                <p className="text-sm text-gray-500 mb-6">{message}</p>
                <div className="flex gap-3">
                  <button
                    onClick={onCancel}
                    className="flex-1 px-4 py-2.5 rounded-full border border-gray-300 dark:border-gray-600 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={onConfirm}
                    className={`flex-1 px-4 py-2.5 rounded-full text-sm font-medium text-white transition-opacity hover:opacity-90 ${destructive ? "bg-red-500" : "bg-brand-blue"}`}
                  >
                    {confirmLabel}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}
