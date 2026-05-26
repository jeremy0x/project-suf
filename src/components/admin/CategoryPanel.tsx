import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface CategoryPanelProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  onClose: () => void;
}

export function CategoryPanel({ title, icon, children, onClose }: CategoryPanelProps) {
  const isMobile = !useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] !m-0"
        onClick={onClose}
      />
      {isMobile ? (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 260 }}
          className="fixed bottom-0 left-0 right-0 z-[70] bg-white dark:bg-gray-900 rounded-t-3xl shadow-2xl flex flex-col max-h-[85vh]"
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 shrink-0">
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={icon} size={20} className="text-brand-blue" />
              <h2 className="font-heading font-bold text-lg">{title}</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
              <HugeiconsIcon icon={Cancel01Icon} size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {children}
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 28, stiffness: 220 }}
          className="fixed top-4 right-4 bottom-4 z-[70] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl flex flex-col w-full max-w-md border border-gray-200 dark:border-gray-800 !m-0"
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 shrink-0">
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={icon} size={20} className="text-brand-blue" />
              <h2 className="font-heading font-bold text-lg">{title}</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
              <HugeiconsIcon icon={Cancel01Icon} size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {children}
          </div>
        </motion.div>
      )}
    </>
  );
}
