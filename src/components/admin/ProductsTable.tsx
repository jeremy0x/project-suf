import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { gooeyToast } from "goey-toast";
import { HugeiconsIcon } from "@hugeicons/react";
import { Edit02Icon, Delete02Icon, ArrowUp01Icon, ArrowDown01Icon } from "@hugeicons/core-free-icons";
import type { Doc } from "../../../convex/_generated/dataModel";

interface ProductsTableProps {
  products: Doc<"products">[];
  onEdit: (product: Doc<"products">) => void;
  onDelete: (product: Doc<"products">) => void;
  categoryLabels?: Record<string, string>;
}

export function ProductsTable({ products, onEdit, onDelete, categoryLabels }: ProductsTableProps) {
  const reorderProducts = useMutation(api.products.reorder);
  const [dragId, setDragId] = useState<string | null>(null);

  const sorted = [...products].sort((a, b) => (a.sortOrder ?? 999) - (b.sortOrder ?? 999));

  const moveUp = (idx: number) => {
    if (idx <= 0) return;
    const reordered = [...sorted];
    [reordered[idx - 1], reordered[idx]] = [reordered[idx], reordered[idx - 1]];
    gooeyToast.promise(reorderProducts({ ids: reordered.map((p) => p._id) }), {
      loading: "Reordering...",
      success: "Product reordered",
      error: "Failed to reorder",
    });
  };

  const moveDown = (idx: number) => {
    if (idx >= sorted.length - 1) return;
    const reordered = [...sorted];
    [reordered[idx], reordered[idx + 1]] = [reordered[idx + 1], reordered[idx]];
    gooeyToast.promise(reorderProducts({ ids: reordered.map((p) => p._id) }), {
      loading: "Reordering...",
      success: "Product reordered",
      error: "Failed to reorder",
    });
  };

  const handleDrop = (targetIdx: number) => {
    if (!dragId) return;
    const fromIdx = sorted.findIndex((p) => p._id === dragId);
    if (fromIdx === -1 || fromIdx === targetIdx) return;
    const reordered = [...sorted];
    const [moved] = reordered.splice(fromIdx, 1);
    reordered.splice(targetIdx, 0, moved);
    setDragId(null);
    gooeyToast.promise(reorderProducts({ ids: reordered.map((p) => p._id) }), {
      loading: "Reordering...",
      success: "Products reordered",
      error: "Failed to reorder",
    });
  };

  const stockColor = (qty: number | undefined | null) => {
    if (!qty || qty <= 0) return "text-red-500 bg-red-50 dark:bg-red-950";
    if (qty <= 3) return "text-orange-500 bg-orange-50 dark:bg-orange-950";
    if (qty <= 10) return "text-yellow-600 bg-yellow-50 dark:bg-yellow-950";
    return "text-green-600 bg-green-50 dark:bg-green-950";
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 dark:bg-gray-800/50">
          <tr>
            <th className="text-left px-3 py-3 font-medium">Product</th>
            <th className="text-left px-3 py-3 font-medium">Price</th>
            <th className="text-left px-3 py-3 font-medium">Category</th>
            <th className="text-left px-3 py-3 font-medium">Stock</th>
            <th className="text-right px-3 py-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          {sorted.map((product, idx) => (
            <tr
              key={product._id}
              className={`hover:bg-gray-50 dark:hover:bg-gray-800/30 ${dragId === product._id ? "opacity-50" : ""}`}
              draggable
              onDragStart={() => setDragId(product._id)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(idx)}
            >
              <td className="px-3 py-3">
                <div className="flex items-center gap-3">
                  {product.images?.[0] && (
                    <img src={product.images[0].url} alt="" className="w-14 h-14 rounded-xl object-cover shrink-0" />
                  )}
                  <div className="min-w-0 max-w-[240px]">
                    <p className="font-medium truncate">{product.name}</p>
                    <p className="text-xs text-gray-400 truncate">{product.description}</p>
                  </div>
                </div>
              </td>
              <td className="px-3 py-3 tabular-nums">
                {"\u20A6"}{product.price.toLocaleString()}
              </td>
              <td className="px-3 py-3 text-gray-500">
                {categoryLabels?.[product.category] || product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </td>
              <td className="px-3 py-3">
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${stockColor(product.stockQuantity)}`}>
                  {product.stockQuantity ?? 0}
                </span>
              </td>
              <td className="px-3 py-3 text-right">
                <div className="flex items-center justify-end gap-0.5">
                  <button
                    onClick={() => moveUp(idx)}
                    disabled={idx === 0}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded disabled:opacity-20 transition-colors"
                    title="Move up"
                    aria-label={`Move ${product.name} up`}
                  >
                    <HugeiconsIcon icon={ArrowUp01Icon} size={14} />
                  </button>
                  <button
                    onClick={() => moveDown(idx)}
                    disabled={idx === sorted.length - 1}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded disabled:opacity-20 transition-colors"
                    title="Move down"
                    aria-label={`Move ${product.name} down`}
                  >
                    <HugeiconsIcon icon={ArrowDown01Icon} size={14} />
                  </button>
                  <button
                    onClick={() => onEdit(product)}
                    className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                    aria-label={`Edit ${product.name}`}
                  >
                    <HugeiconsIcon icon={Edit02Icon} size={14} />
                  </button>
                  <button
                    onClick={() => onDelete(product)}
                    className="p-1.5 hover:bg-red-50 dark:hover:bg-red-950 text-red-400 rounded-full transition-colors"
                    aria-label={`Delete ${product.name}`}
                  >
                    <HugeiconsIcon icon={Delete02Icon} size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
