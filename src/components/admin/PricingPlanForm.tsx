import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { gooeyToast } from "goey-toast";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  PlusSignIcon,
  Delete02Icon,
  CheckmarkCircle01Icon,
} from "@hugeicons/core-free-icons";
import type { Doc } from "../../../convex/_generated/dataModel";

interface PricingPlanFormProps {
  plan?: Doc<"pricingPlans">;
  onDone: () => void;
  categories: { name: string; label: string }[];
}

export function PricingPlanForm({ plan, onDone, categories }: PricingPlanFormProps) {
  const createPlan = useMutation(api.pricing.createPlan);
  const updatePlan = useMutation(api.pricing.updatePlan);

  const [saving, setSaving] = useState(false);
  const [featureInput, setFeatureInput] = useState("");

  const [form, setForm] = useState({
    name: plan?.name || "",
    price: plan?.price || "",
    category: plan?.category || (categories[0]?.name ?? "basic"),
    savings: plan?.savings || "",
    tagline: plan?.tagline || "",
    trainerAddOn: plan?.trainerAddOn || "",
    recommended: plan?.recommended ?? false,
    popular: plan?.popular ?? false,
    featured: plan?.featured ?? false,
    description: plan?.description || "",
    features: plan?.features || [],
    sortOrder: plan?.sortOrder ?? 1,
  });

  const handleAddFeature = () => {
    const trimmed = featureInput.trim();
    if (!trimmed) return;
    setForm((prev) => ({
      ...prev,
      features: [...prev.features, trimmed],
    }));
    setFeatureInput("");
  };

  const handleRemoveFeature = (index: number) => {
    setForm((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.price.trim()) {
      gooeyToast.error("Name and price are required");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        name: form.name.trim(),
        price: form.price.trim(),
        category: form.category,
        savings: form.savings.trim() || undefined,
        tagline: form.tagline.trim() || undefined,
        trainerAddOn: form.trainerAddOn.trim() || undefined,
        recommended: form.recommended,
        popular: form.popular,
        featured: form.featured,
        description: form.description.trim() || undefined,
        features: form.features.length > 0 ? form.features : undefined,
        sortOrder: Math.max(1, Number(form.sortOrder) || 1),
      };

      if (plan) {
        await updatePlan({
          id: plan._id,
          ...payload,
        });
        gooeyToast.success("Pricing plan updated");
      } else {
        await createPlan(payload);
        gooeyToast.success("Pricing plan created");
      }
      onDone();
    } catch (err) {
      gooeyToast.error("Failed to save plan", {
        description: err instanceof Error ? err.message : "Unknown error",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full overflow-hidden">
      {/* Scrollable Form Body */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5 text-left">
        {/* Plan Name */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">
            Plan Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="e.g. Gym Session (Monthly) Once Daily"
            className="w-full h-11 px-3.5 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-colors"
            required
          />
        </div>

        {/* Price & Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">
              Price Display <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              placeholder="e.g. ₦12,000"
              className="w-full h-11 px-3.5 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full h-11 px-3 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-colors"
            >
              {categories.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sort Order & Savings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">
              Sort Order (Starts at 1)
            </label>
            <input
              type="number"
              min={1}
              value={form.sortOrder}
              onChange={(e) => setForm({ ...form, sortOrder: Math.max(1, parseInt(e.target.value) || 1) })}
              className="w-full h-11 px-3.5 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">
              Savings Badge (Optional)
            </label>
            <input
              type="text"
              value={form.savings}
              onChange={(e) => setForm({ ...form, savings: e.target.value })}
              placeholder="e.g. saves ₦1,000"
              className="w-full h-11 px-3.5 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-colors"
            />
          </div>
        </div>

        {/* Tagline & Trainer Add-On */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">
            Tagline (Optional)
          </label>
          <input
            type="text"
            value={form.tagline}
            onChange={(e) => setForm({ ...form, tagline: e.target.value })}
            placeholder="e.g. Shared Access for Two"
            className="w-full h-11 px-3.5 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">
            Trainer Add-On Note (Optional)
          </label>
          <input
            type="text"
            value={form.trainerAddOn}
            onChange={(e) => setForm({ ...form, trainerAddOn: e.target.value })}
            placeholder="e.g. Add a Dedicated Personal Trainer for ₦8,000/month"
            className="w-full h-11 px-3.5 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-colors"
          />
        </div>

        {/* Summary Description */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">
            Description (Optional)
          </label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Short summary for card description"
            rows={2}
            className="w-full p-3 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-colors resize-none"
          />
        </div>

        {/* Minimal Toggle Switches */}
        <div className="space-y-3 pt-1">
          <label className="flex items-center justify-between p-3.5 border border-gray-200 dark:border-gray-800 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
            <div>
              <div className="text-sm font-semibold text-gray-900 dark:text-white">Spotlight (Gold Border)</div>
              <div className="text-xs text-gray-500">Highlight card with a gold accent outline</div>
            </div>
            <input
              type="checkbox"
              checked={form.recommended}
              onChange={(e) => setForm({ ...form, recommended: e.target.checked })}
              className="w-4 h-4 rounded text-brand-blue focus:ring-brand-blue cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-3.5 border border-gray-200 dark:border-gray-800 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
            <div>
              <div className="text-sm font-semibold text-gray-900 dark:text-white">Most Popular Badge</div>
              <div className="text-xs text-gray-500">Displays floating 'Most Popular' badge above card</div>
            </div>
            <input
              type="checkbox"
              checked={form.popular}
              onChange={(e) => setForm({ ...form, popular: e.target.checked })}
              className="w-4 h-4 rounded text-brand-blue focus:ring-brand-blue cursor-pointer"
            />
          </label>
        </div>

        {/* Bullet Points */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">
            Feature Bullet Points
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddFeature();
                }
              }}
              placeholder="e.g. Locker room access"
              className="flex-1 h-10 px-3.5 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-colors"
            />
            <button
              type="button"
              onClick={handleAddFeature}
              className="h-10 px-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl text-xs font-semibold transition-colors shrink-0 flex items-center gap-1"
            >
              <HugeiconsIcon icon={PlusSignIcon} size={15} />
              Add
            </button>
          </div>

          {form.features.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {form.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs text-gray-800 dark:text-gray-200"
                >
                  <HugeiconsIcon icon={CheckmarkCircle01Icon} size={13} className="text-green-500 shrink-0" />
                  <span>{feat}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(idx)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-0.5 ml-1"
                    aria-label="Remove feature"
                  >
                    <HugeiconsIcon icon={Delete02Icon} size={13} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Sticky Action Footer */}
      <div className="shrink-0 px-6 py-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex items-center justify-end gap-3 z-20">
        <button
          type="button"
          onClick={onDone}
          className="px-4 py-2.5 border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm disabled:opacity-50"
        >
          {saving ? "Saving..." : plan ? "Update Plan" : "Create Plan"}
        </button>
      </div>
    </form>
  );
}
