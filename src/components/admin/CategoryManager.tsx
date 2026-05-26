import { useState, useRef } from "react";
import { gooeyToast } from "goey-toast";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlusSignIcon, Delete02Icon } from "@hugeicons/core-free-icons";
import { ConfirmModal } from "@/components/admin/ConfirmModal";

export interface Category {
  _id: string;
  name: string;
  label: string;
}

interface CategoryManagerProps {
  categories: Category[];
  onAdd: (name: string, label: string) => Promise<void>;
  onRename: (id: string, name: string, label: string, oldName: string) => Promise<void>;
  onRemove: (id: string) => Promise<void>;
}

export function CategoryManager({ categories, onAdd, onRename, onRemove }: CategoryManagerProps) {
  const [label, setLabel] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editVal, setEditVal] = useState("");
  const [confirmDel, setConfirmDel] = useState<string | null>(null);
  const committingRef = useRef(false);

  const handleAdd = async () => {
    if (!label.trim()) return;
    const name = label.toLowerCase().replace(/\s+/g, "-");
    const exists = categories.some((c) => c.name === name);
    if (exists) {
      gooeyToast.error("Category already exists");
      return;
    }
    try {
      await onAdd(name, label.trim());
      gooeyToast.success("Category added");
      setLabel("");
    } catch {
      gooeyToast.error("Failed to add category");
    }
  };

  const handleRename = async (cat: Category, newLabel: string) => {
    if (!newLabel.trim() || newLabel.trim() === cat.label) {
      setEditId(null);
      return;
    }
    const newName = newLabel.toLowerCase().replace(/\s+/g, "-");
    const exists = categories.some((c) => c.name === newName && c._id !== cat._id);
    if (exists) {
      gooeyToast.error("A category with that key already exists");
      setEditId(null);
      return;
    }
    try {
      await onRename(cat._id, newName, newLabel.trim(), cat.name);
      gooeyToast.success("Category renamed");
    } catch {
      gooeyToast.error("Failed to rename");
    }
    setEditId(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="New category label"
          className="flex-1 h-10 px-4 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
        />
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-brand-blue text-white rounded-full font-medium text-sm hover:opacity-90 transition-opacity shrink-0"
        >
          <HugeiconsIcon icon={PlusSignIcon} size={16} />
          Add
        </button>
      </div>

      {categories.length === 0 ? (
        <div className="text-center py-10 text-gray-400 text-sm">No categories yet</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {categories.map((cat, i) => (
            <div key={cat._id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 flex items-center justify-between gap-2 hover:shadow-sm transition-shadow">
              {editId === cat._id ? (
                <input
                  type="text"
                  value={editVal}
                  onChange={(e) => setEditVal(e.target.value)}
                   onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      committingRef.current = true;
                      handleRename(cat, editVal);
                    }
                    if (e.key === "Escape") {
                      e.preventDefault();
                      setEditId(null);
                    }
                  }}
                  onBlur={() => {
                    if (committingRef.current) {
                      committingRef.current = false;
                      return;
                    }
                    handleRename(cat, editVal);
                  }}
                  className="flex-1 text-sm font-medium bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  autoFocus
                />
              ) : (
                <button
                  onClick={() => { setEditId(cat._id); setEditVal(cat.label); }}
                  className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-brand-blue transition-colors text-left truncate"
                >
                  {cat.label}
                </button>
              )}
              <button
                onClick={() => setConfirmDel(cat._id)}
                className="p-1.5 hover:bg-red-50 dark:hover:bg-red-950/30 text-red-500 rounded-full transition-colors shrink-0"
              >
                <HugeiconsIcon icon={Delete02Icon} size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        open={!!confirmDel}
        onConfirm={async () => {
          if (!confirmDel) return;
          try {
            await onRemove(confirmDel);
            gooeyToast.success("Category removed");
          } catch {
            gooeyToast.error("Failed to remove category");
          } finally {
            setConfirmDel(null);
          }
        }}
        onCancel={() => setConfirmDel(null)}
        title="Delete Category"
        message="Remove this category? Items in it may become uncategorized."
        confirmLabel="Delete"
      />
    </div>
  );
}
