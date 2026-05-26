import { useState } from "react";
import { useQuery, useMutation, useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { gooeyToast } from "goey-toast";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlusSignIcon, Package02Icon } from "@hugeicons/core-free-icons";
import type { Doc, Id } from "../../../convex/_generated/dataModel";
import { AnimatePresence } from "framer-motion";
import { ProductsTable } from "@/components/admin/ProductsTable";
import { ProductForm } from "@/components/admin/ProductForm";
import { ResponsiveModal } from "@/components/admin/ResponsiveModal";
import { CategoryManager } from "@/components/admin/CategoryManager";
import { CategoryPanel } from "@/components/admin/CategoryPanel";
import { ConfirmModal } from "@/components/admin/ConfirmModal";

export function ProductsTab() {
  const products = (useQuery(api.products.list, {}) || []) as Doc<"products">[];
  const prodCats = (useQuery(api.productCategories.list) || []) as Doc<"productCategories">[];
  const deleteProduct = useMutation(api.products.remove);
  const createProductCat = useMutation(api.productCategories.create);
  const removeProductCat = useMutation(api.productCategories.remove);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renameProductCat = useAction(api.productCategories.renameAndSync as any);

  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Doc<"products"> | undefined>(undefined);
  const [showProductCatPanel, setShowProductCatPanel] = useState(false);
  const [confirm, setConfirm] = useState<{ title: string; message: string; action: () => Promise<void> } | null>(null);

  return (
    <>
      <div className="flex flex-col sm:flex-row items-end sm:items-center justify-between gap-3 mb-4">
        <div />
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowProductCatPanel(true)}
            className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-full font-medium text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Categories
          </button>
          <button
            onClick={() => {
              setEditingProduct(undefined);
              setShowProductForm(true);
            }}
            className="px-4 py-2 bg-brand-blue text-white rounded-full font-medium text-sm hover:opacity-90 transition-opacity"
          >
            <span className="flex items-center gap-2">
              <HugeiconsIcon icon={PlusSignIcon} size={16} />
              New Product
            </span>
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <ProductsTable
          products={products}
          categoryLabels={Object.fromEntries(prodCats.map((c) => [c.name, c.label]))}
          onEdit={(product) => {
            setEditingProduct(product);
            setShowProductForm(true);
          }}
          onDelete={(product) => {
            setConfirm({
              title: "Delete Product",
              message: `Delete "${product.name}"?`,
              action: async () => {
                await deleteProduct({ id: product._id });
                gooeyToast.success("Product deleted");
              },
            });
          }}
        />
      </div>

      <ResponsiveModal
        isOpen={showProductForm}
        onOpenChange={setShowProductForm}
        title={editingProduct ? "Edit Product" : "New Product"}
        description={editingProduct ? "Update product details in catalog" : "Add a new product to your catalog"}
      >
        <ProductForm
          product={editingProduct}
          onDone={() => setShowProductForm(false)}
          categories={prodCats.map((c) => ({ name: c.name, label: c.label }))}
        />
      </ResponsiveModal>

      <AnimatePresence>
        {showProductCatPanel && (
        <CategoryPanel
          title="Product Categories"
          icon={Package02Icon}
          onClose={() => setShowProductCatPanel(false)}
        >
          <CategoryManager
            categories={prodCats}
            onAdd={async (name, label) => { await createProductCat({ name, label }); }}
            onRename={async (id, name, label, oldName) => { await renameProductCat({ id, name, label, oldName }); }}
            onRemove={async (id) => { await removeProductCat({ id: id as Id<"productCategories"> }); }}
          />
        </CategoryPanel>
      )}
      </AnimatePresence>

      <ConfirmModal
        open={!!confirm}
        onConfirm={async () => {
          if (!confirm) return;
          try {
            await confirm.action();
          } catch {
            gooeyToast.error("Failed to delete product");
          }
          setConfirm(null);
        }}
        onCancel={() => setConfirm(null)}
        title={confirm?.title || ""}
        message={confirm?.message || ""}
        confirmLabel="Delete"
      />
    </>
  );
}

