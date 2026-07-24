import { useState, useRef } from "react";
import { useQuery, useMutation, useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { gooeyToast } from "goey-toast";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  PlusSignIcon,
  PencilEdit02Icon,
  Delete02Icon,
  Tag01Icon,
  CheckmarkCircle01Icon,
  StarIcon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";
import type { Doc, Id } from "../../../convex/_generated/dataModel";
import { AnimatePresence } from "framer-motion";
import { PricingPlanForm } from "@/components/admin/PricingPlanForm";
import { PricingPlanPanel } from "@/components/admin/PricingPlanPanel";
import { ResponsiveModal } from "@/components/admin/ResponsiveModal";
import { CategoryManager } from "@/components/admin/CategoryManager";
import { CategoryPanel } from "@/components/admin/CategoryPanel";
import { ConfirmModal } from "@/components/admin/ConfirmModal";

export function PricingTab() {
  const tabScrollRef = useRef<HTMLDivElement>(null);

  const scrollTabs = (direction: "left" | "right") => {
    if (tabScrollRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      tabScrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };
  const plans = (useQuery(api.pricing.listPlans) || []) as Doc<"pricingPlans">[];
  const categories = (useQuery(api.pricing.listCategories) || []) as Doc<"pricingCategories">[];
  const registrationConfig = useQuery(api.pricing.getConfig, { key: "registration" });

  const deletePlan = useMutation(api.pricing.removePlan);
  const updateRegistrationConfig = useMutation(api.pricing.updateConfig);
  const createCategory = useMutation(api.pricing.createCategory);
  const removeCategory = useMutation(api.pricing.removeCategory);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renameCategory = useAction(api.pricing.renameCategoryAndSync as any);

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showPlanForm, setShowPlanForm] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Doc<"pricingPlans"> | undefined>(undefined);
  const [showCatPanel, setShowCatPanel] = useState(false);

  // Registration Config Editing state
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [configForm, setConfigForm] = useState({
    title: "",
    price: "",
    description: "",
  });
  const [savingConfig, setSavingConfig] = useState(false);

  const [confirm, setConfirm] = useState<{ title: string; message: string; action: () => Promise<void> } | null>(null);

  const filteredPlans = plans.filter((p) => {
    const matchesCat = activeCategory === "all" || p.category === activeCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.price.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const categoryLabels = Object.fromEntries(categories.map((c) => [c.name, c.label]));

  const handleOpenConfigModal = () => {
    setConfigForm({
      title: registrationConfig?.title || "Gym Registration",
      price: registrationConfig?.price || "₦2,500",
      description:
        registrationConfig?.description ||
        "One-time registration fee for all new members. Includes initial fitness assessment and personalized orientation.",
    });
    setShowConfigModal(true);
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingConfig(true);
    try {
      await updateRegistrationConfig({
        key: "registration",
        title: configForm.title.trim(),
        price: configForm.price.trim(),
        description: configForm.description.trim(),
      });
      gooeyToast.success("Registration fee updated");
      setShowConfigModal(false);
    } catch (err) {
      gooeyToast.error("Failed to update registration fee", {
        description: err instanceof Error ? err.message : "Unknown error",
      });
    } finally {
      setSavingConfig(false);
    }
  };

  return (
    <>
      <div className="space-y-6">
        {/* Registration Fee Card */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm min-h-[120px] flex flex-col justify-center">
          {registrationConfig === undefined ? (
            <div className="space-y-3">
              <div className="w-40 h-5 bg-gray-200 dark:bg-gray-800 rounded-lg shimmer-bg" />
              <div className="w-28 h-8 bg-gray-200 dark:bg-gray-800 rounded-lg shimmer-bg" />
              <div className="w-96 max-w-full h-4 bg-gray-100 dark:bg-gray-800/60 rounded-lg shimmer-bg" />
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-brand-blue/10 text-brand-blue text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    Registration Config
                  </span>
                  <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white">
                    {registrationConfig?.title || "Registration Fee"}
                  </h3>
                </div>
                <p className="text-2xl font-bold text-brand-blue font-heading mt-1">
                  {registrationConfig?.price || "Not configured"}
                </p>
                {registrationConfig?.description && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-2xl">
                    {registrationConfig.description}
                  </p>
                )}
              </div>
              <button
                onClick={handleOpenConfigModal}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-xl text-sm font-medium transition-colors shrink-0"
              >
                <span className="flex items-center gap-2">
                  <HugeiconsIcon icon={PencilEdit02Icon} size={16} />
                  Edit Registration Fee
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Toolbar Header */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Category Tabs with Scroll Arrows */}
          <div className="relative flex items-center gap-1.5 flex-1 min-w-0 max-w-full">
            <button
              onClick={() => scrollTabs("left")}
              aria-label="Scroll categories left"
              className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors shrink-0 border border-gray-200 dark:border-gray-700 shadow-sm"
              title="Scroll left"
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
            </button>

            <div
              ref={tabScrollRef}
              className="flex items-center gap-2 overflow-x-auto py-1 [&::-webkit-scrollbar]:hidden scroll-smooth min-w-0 flex-1"
            >
              <button
                onClick={() => setActiveCategory("all")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  activeCategory === "all"
                    ? "bg-brand-blue text-white shadow-sm"
                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
                }`}
              >
                All Plans ({plans.length})
              </button>
              {categories.map((c) => {
                const count = plans.filter((p) => p.category === c.name).length;
                return (
                  <button
                    key={c.name}
                    onClick={() => setActiveCategory(c.name)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                      activeCategory === c.name
                        ? "bg-brand-blue text-white shadow-sm"
                        : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    {c.label} ({count})
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => scrollTabs("right")}
              aria-label="Scroll categories right"
              className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors shrink-0 border border-gray-200 dark:border-gray-700 shadow-sm"
              title="Scroll right"
            >
              <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
            </button>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search plans..."
              className="px-3.5 py-1.5 border border-gray-200 dark:border-gray-700 rounded-full bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-blue"
            />
            <button
              onClick={() => setShowCatPanel(true)}
              className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-full font-medium text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shrink-0"
            >
              Categories
            </button>
            <button
              onClick={() => {
                setEditingPlan(undefined);
                setShowPlanForm(true);
              }}
              className="px-4 py-2 bg-brand-blue text-white rounded-full font-medium text-sm hover:opacity-90 transition-opacity shrink-0"
            >
              <span className="flex items-center gap-2">
                <HugeiconsIcon icon={PlusSignIcon} size={16} />
                New Plan
              </span>
            </button>
          </div>
        </div>

        {/* Plans Table */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
          {filteredPlans.length === 0 ? (
            <div className="py-16 text-center">
              <HugeiconsIcon icon={Tag01Icon} size={40} className="mx-auto text-gray-400 mb-3" />
              <h4 className="font-heading font-semibold text-lg text-gray-700 dark:text-gray-300">
                No pricing plans found
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {searchQuery ? "Try refining your search query" : "Click 'New Plan' to add your first membership tier."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider border-b border-gray-200 dark:border-gray-800">
                  <tr>
                    <th className="px-6 py-4">Plan Name</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Badges & Details</th>
                    <th className="px-6 py-4">Order</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {filteredPlans.map((plan) => (
                    <tr
                      key={plan._id}
                      className="hover:bg-gray-50/50 dark:hover:bg-gray-800/40 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                        <div>{plan.name}</div>
                        {plan.tagline && (
                          <div className="text-xs text-brand-blue font-normal mt-0.5">
                            {plan.tagline}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">
                        {plan.price}
                        {plan.savings && (
                          <div className="text-xs text-green-600 dark:text-green-400 font-normal">
                            {plan.savings}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium">
                          {categoryLabels[plan.category] || plan.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1.5">
                          {plan.recommended && (
                            <span className="inline-flex items-center gap-1 bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 text-[11px] font-semibold px-2 py-0.5 rounded-md">
                              <HugeiconsIcon icon={StarIcon} size={12} />
                              Spotlight
                            </span>
                          )}
                          {plan.popular && (
                            <span className="inline-flex items-center gap-1 bg-brand-blue/10 text-brand-blue text-[11px] font-semibold px-2 py-0.5 rounded-md">
                              <HugeiconsIcon icon={CheckmarkCircle01Icon} size={12} />
                              Most Popular
                            </span>
                          )}
                          {plan.featured && (
                            <span className="inline-flex items-center gap-1 bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 text-[11px] font-semibold px-2 py-0.5 rounded-md">
                              Homepage
                            </span>
                          )}
                          {plan.trainerAddOn && (
                            <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[200px]" title={plan.trainerAddOn}>
                              {plan.trainerAddOn}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs font-mono text-gray-500">
                        {plan.sortOrder ?? 0}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setEditingPlan(plan);
                              setShowPlanForm(true);
                            }}
                            className="p-1.5 text-gray-500 hover:text-brand-blue hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                            aria-label="Edit plan"
                          >
                            <HugeiconsIcon icon={PencilEdit02Icon} size={16} />
                          </button>
                          <button
                            onClick={() => {
                              setConfirm({
                                title: "Delete Pricing Plan",
                                message: `Are you sure you want to delete "${plan.name}" (${plan.price})?`,
                                action: async () => {
                                  await deletePlan({ id: plan._id });
                                  gooeyToast.success("Plan deleted");
                                },
                              });
                            }}
                            className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
                            aria-label="Delete plan"
                          >
                            <HugeiconsIcon icon={Delete02Icon} size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Pricing Plan Form Drawer / Sidebar */}
      <AnimatePresence>
        {showPlanForm && (
          <PricingPlanPanel
            plan={editingPlan}
            categories={categories.map((c) => ({ name: c.name, label: c.label }))}
            onClose={() => setShowPlanForm(false)}
          />
        )}
      </AnimatePresence>

      {/* Registration Config Edit Modal */}
      <ResponsiveModal
        isOpen={showConfigModal}
        onOpenChange={setShowConfigModal}
        title="Edit Gym Registration Fee"
        description="Update the global registration fee displayed across membership pages"
      >
        <form onSubmit={handleSaveConfig} className="space-y-4 text-left">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              value={configForm.title}
              onChange={(e) => setConfigForm({ ...configForm, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-blue focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Price Display
            </label>
            <input
              type="text"
              value={configForm.price}
              onChange={(e) => setConfigForm({ ...configForm, price: e.target.value })}
              placeholder="e.g. ₦2,500"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-blue focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              value={configForm.description}
              onChange={(e) => setConfigForm({ ...configForm, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-blue focus:outline-none"
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
            <button
              type="button"
              onClick={() => setShowConfigModal(false)}
              className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={savingConfig}
              className="px-5 py-2 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-xl text-sm font-medium transition-all disabled:opacity-50"
            >
              {savingConfig ? "Saving..." : "Save Config"}
            </button>
          </div>
        </form>
      </ResponsiveModal>

      {/* Category Management Drawer/Panel */}
      <AnimatePresence>
        {showCatPanel && (
          <CategoryPanel
            title="Pricing Categories"
            icon={Tag01Icon}
            onClose={() => setShowCatPanel(false)}
          >
            <CategoryManager
              categories={categories}
              onAdd={async (name, label) => {
                await createCategory({ name, label, order: categories.length });
              }}
              onRename={async (id, name, label, oldName) => {
                await renameCategory({ id, name, label, oldName });
              }}
              onRemove={async (id) => {
                await removeCategory({ id: id as Id<"pricingCategories"> });
              }}
            />
          </CategoryPanel>
        )}
      </AnimatePresence>

      {/* Confirm Modal */}
      <ConfirmModal
        open={!!confirm}
        title={confirm?.title || ""}
        message={confirm?.message || ""}
        onConfirm={async () => {
          if (confirm) await confirm.action();
          setConfirm(null);
        }}
        onCancel={() => setConfirm(null)}
      />
    </>
  );
}
