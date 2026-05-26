import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Package02Icon,
  Globe02Icon,
  GalleryHorizontalEndIcon,
  PackageOutOfStockIcon,
} from "@hugeicons/core-free-icons";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import type { Doc } from "../../../convex/_generated/dataModel";

export function DashboardTab() {
  const products = (useQuery(api.products.list, {}) || []) as Doc<"products">[];
  const totalImages = useQuery(api.siteImages.getTotalCount) || 0;
  const galleryImages = (useQuery(api.siteImages.listBySection, { section: "gallery" }) || []) as Doc<"siteImages">[];
  const prodCats = (useQuery(api.productCategories.list) || []) as Doc<"productCategories">[];

  const cats = Array.from(new Set(products.map((p) => p.category)));
  const outQty = products.filter((p) => (p.stockQuantity ?? 0) === 0).length;
  const lowQty = products.filter((p) => {
    const q = p.stockQuantity ?? 0;
    return q > 0 && q <= 10;
  }).length;
  const goodQty = products.length - outQty - lowQty;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { value: products.length, label: "Products", icon: Package02Icon, color: "text-brand-blue" },
          { value: totalImages, label: "Site Images", icon: Globe02Icon, color: "text-brand-blue" },
          { value: galleryImages.length, label: "Gallery Images", icon: GalleryHorizontalEndIcon, color: "text-brand-gold" },
          { value: outQty, label: "Out of Stock", icon: PackageOutOfStockIcon, color: "text-red-500" },
        ].map((card) => (
          <div
            key={card.label}
            className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-800 flex items-center justify-between"
          >
            <div>
              <p className="text-3xl font-bold font-heading">{card.value}</p>
              <p className="text-sm text-gray-500">{card.label}</p>
            </div>
            <HugeiconsIcon icon={card.icon} size={28} className={`${card.color} opacity-30`} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
          <h3 className="font-heading font-bold text-sm mb-4 text-gray-500">Stock Status</h3>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie
                  data={[
                    { name: "In Stock", value: goodQty, color: "#22c55e" },
                    { name: "Low Stock", value: lowQty, color: "#eab308" },
                    { name: "Out of Stock", value: outQty, color: "#ef4444" },
                  ].filter((d) => d.value > 0)}
                  cx="50%" cy="50%" innerRadius={36} outerRadius={60}
                  dataKey="value" stroke="none"
                >
                  {[
                    { name: "In Stock", value: goodQty, color: "#22c55e" },
                    { name: "Low Stock", value: lowQty, color: "#eab308" },
                    { name: "Out of Stock", value: outQty, color: "#ef4444" },
                  ].filter((d) => d.value > 0).map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2 text-sm">
                <span className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-gray-600 dark:text-gray-400">In Stock</span>
                <span className="ml-auto font-medium tabular-nums">{goodQty}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="text-gray-600 dark:text-gray-400">Low Stock</span>
                <span className="ml-auto font-medium tabular-nums">{lowQty}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-gray-600 dark:text-gray-400">Out of Stock</span>
                <span className="ml-auto font-medium tabular-nums">{outQty}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
          <h3 className="font-heading font-bold text-sm mb-4 text-gray-500">Products by Category</h3>
          <ResponsiveContainer width="100%" height={cats.length * 40 + 20}>
            <BarChart
              data={cats.map((cat: string) => ({
                name: cat.charAt(0).toUpperCase() + cat.slice(1),
                count: products.filter((p) => p.category === cat).length,
              }))}
              layout="vertical"
              margin={{ left: 20, right: 20, top: 5, bottom: 5 }}
            >
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={80} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb", fontSize: 12 }}
                formatter={(value) => [value, "Products"]}
              />
              <Bar dataKey="count" fill="#0eb2f1" radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
