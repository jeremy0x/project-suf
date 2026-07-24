import { useEffect } from "react";
import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import type { Doc } from "../../../convex/_generated/dataModel";
import { PricingPlanForm } from "@/components/admin/PricingPlanForm";

interface PricingPlanPanelProps {
  plan?: Doc<"pricingPlans">;
  categories: { name: string; label: string }[];
  onClose: () => void;
}

export function PricingPlanPanel({ plan, categories, onClose }: PricingPlanPanelProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    // Preserve scrollbar gutter to prevent layout shift
    document.documentElement.style.scrollbarGutter = "stable";
  }, []);

  const title = plan ? "Edit Pricing Plan" : "Add Pricing Plan";

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] !m-0"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <motion.div
        initial={isDesktop ? { x: "100%" } : { y: "100%" }}
        animate={isDesktop ? { x: 0 } : { y: 0 }}
        exit={isDesktop ? { x: "100%" } : { y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className={`fixed z-[70] bg-white dark:bg-gray-900 flex flex-col !m-0 shadow-2xl overflow-hidden ${
          isDesktop
            ? "top-0 right-0 bottom-0 w-full max-w-lg border-l border-gray-200 dark:border-gray-800"
            : "inset-x-0 bottom-0 h-[92vh] max-h-[92vh] rounded-t-3xl border-t border-gray-200 dark:border-gray-800"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 shrink-0 bg-gray-50/50 dark:bg-gray-800/30">
          <div>
            <h2 className="font-heading font-bold text-lg text-gray-900 dark:text-white">
              {title}
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Configure plan pricing, category & display options
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200/60 dark:hover:bg-gray-800 text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-full transition-colors shrink-0"
            aria-label="Close drawer"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={20} />
          </button>
        </div>

        {/* Form Container (manages internal scroll and sticky footer) */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <PricingPlanForm plan={plan} categories={categories} onDone={onClose} />
        </div>
      </motion.div>
    </>
  );
}
