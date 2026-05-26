import { useState } from "react";
import { useMutation, useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { gooeyToast } from "goey-toast";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Delete02Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";
import type { Doc } from "../../../convex/_generated/dataModel";
import { ImageDropZone } from "@/components/admin/ImageDropZone";
import { uploadFileToConvex } from "./uploadFileToConvex";

interface ProductFormProps {
  product?: Doc<"products">;
  onDone: () => void;
  categories: { name: string; label: string }[];
}

export function ProductForm({ product, onDone, categories }: ProductFormProps) {
  const createProduct = useMutation(api.products.create);
  const updateProduct = useMutation(api.products.update);
  const generateUrl = useMutation(api.upload.generateUploadUrl);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const processUpload = useAction(api.upload.processUpload as any);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price?.toString() || "",
    category: product?.category || "",
    stockQuantity: product?.stockQuantity ?? 0,
    featured: product?.featured ?? false,
    images: product?.images || ([] as { url: string; alt: string; order: number }[]),
  });

  const handleFileUpload = async (file: File) => {
    setUploading(true);
    try {
      const storageId = await uploadFileToConvex(file, () => generateUrl());
      const result = await processUpload({ storageId, section: "products", alt: form.name || file.name });
      if (result?.url) {
        setForm((prev) => ({ ...prev, images: [...prev.images, { url: result.url, alt: form.name || file.name, order: prev.images.length }] }));
        gooeyToast.success("Image uploaded & compressed");
      }
    } catch (err) {
      gooeyToast.error("Upload failed", { description: err instanceof Error ? err.message : "Unknown error" });
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setForm((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== index).map((img, i) => ({ ...img, order: i })) }));
  };

  const moveImage = (from: number, to: number) => {
    if (to < 0 || to >= form.images.length) return;
    setForm((prev) => {
      const imgs = [...prev.images];
      const [moved] = imgs.splice(from, 1);
      imgs.splice(to, 0, moved);
      return { ...prev, images: imgs.map((img, i) => ({ ...img, order: i })) };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price) {
      gooeyToast.error("Name and price are required");
      return;
    }
    const price = Number(form.price);
    if (!Number.isFinite(price) || price < 0) {
      gooeyToast.error("Price must be a valid non-negative number");
      return;
    }
    const data = {
      name: form.name,
      description: form.description,
      price,
      category: form.category || "general",
      images: form.images,
      stockQuantity: parseInt(form.stockQuantity.toString()) || 0,
      featured: form.featured,
    };
    const promise = product ? updateProduct({ id: product._id, ...data }) : createProduct(data);
    gooeyToast.promise(promise, {
      loading: product ? "Updating product..." : "Creating product...",
      success: product ? "Product updated" : "Product created",
      error: "Failed to save product",
    });
    await promise;
    onDone();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-blue text-sm"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Price (NGN)</label>
          <input
            type="number"
            value={form.price}
            onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))}
            className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-blue text-sm"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
            className="w-full h-10 px-4 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue appearance-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: "right 0.75rem center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "1.25rem",
            }}
          >
            <option value="">Select category</option>
            {categories.map((cat) => (<option key={cat.name} value={cat.name}>{cat.label}</option>))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Stock Quantity</label>
          <input
            type="number"
            min={0}
            value={form.stockQuantity}
            onChange={(e) => setForm((p) => ({ ...p, stockQuantity: parseInt(e.target.value) || 0 }))}
            className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-blue text-sm"
          />
        </div>
        <div className="flex items-center gap-6 pt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm((p) => ({ ...p, featured: e.target.checked }))}
              className="w-4 h-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue"
            />
            <span className="text-sm">Featured</span>
          </label>
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
          rows={4}
          className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-blue text-sm resize-none"
        />
      </div>
      <div className="space-y-3">
        <label className="text-sm font-medium">Images</label>
        <div className="flex flex-wrap gap-3">
          {form.images.map((img, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <div className="relative">
                <img src={img.url} alt="" className="w-24 h-24 rounded-xl object-cover" />
                {i === 0 && <span className="absolute top-1 left-1 text-[10px] font-bold bg-brand-blue text-white px-1.5 py-0.5 rounded-full">Cover</span>}
              </div>
              <div className="flex items-center gap-1">
                <button type="button" onClick={() => moveImage(i, i - 1)} disabled={i === 0}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors disabled:opacity-30">
                  <HugeiconsIcon icon={ArrowLeft01Icon} size={12} />
                </button>
                <button type="button" onClick={() => removeImage(i)}
                  className="p-1 hover:bg-red-50 dark:hover:bg-red-950 text-red-400 rounded-full transition-colors">
                  <HugeiconsIcon icon={Delete02Icon} size={12} />
                </button>
                <button type="button" onClick={() => moveImage(i, i + 1)} disabled={i === form.images.length - 1}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors disabled:opacity-30">
                  <HugeiconsIcon icon={ArrowRight01Icon} size={12} />
                </button>
              </div>
            </div>
          ))}
          <ImageDropZone onUpload={handleFileUpload} uploading={uploading} />
        </div>
      </div>
      <div className="flex gap-3">
        <button type="submit"
          className="px-6 py-2.5 bg-brand-blue text-white rounded-full font-medium hover:opacity-90 transition-opacity">
          {product ? "Update Product" : "Create Product"}
        </button>
        <button type="button" onClick={onDone}
          className="px-6 py-2.5 rounded-full border border-gray-300 dark:border-gray-600 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
}
