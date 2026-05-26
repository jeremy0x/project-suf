import { useState, useCallback, useRef } from "react";
import { useQuery, useMutation, useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { gooeyToast } from "goey-toast";
import { HugeiconsIcon } from "@hugeicons/react";
import { GalleryHorizontalEndIcon, PlusSignIcon, ArrowLeft01Icon, ArrowRight01Icon, Delete02Icon, LoaderPinwheelIcon } from "@hugeicons/core-free-icons";
import type { Doc, Id } from "../../../convex/_generated/dataModel";
import { AnimatePresence } from "framer-motion";
import { ResponsiveModal } from "@/components/admin/ResponsiveModal";
import { ImageDropZone } from "@/components/admin/ImageDropZone";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { CategoryManager, type Category } from "@/components/admin/CategoryManager";
import { CategoryPanel } from "@/components/admin/CategoryPanel";
import { uploadFileToConvex } from "./uploadFileToConvex";
import { responsiveUrl } from "@/lib/images";

const PAGE_SIZE = 20;

export function GalleryTab() {
  const rawImages = useQuery(api.siteImages.listBySection, { section: "gallery" });
  const rawCats = useQuery(api.categories.listBySection, { section: "gallery" });
  const images = (rawImages || []) as Doc<"siteImages">[];
  const galleryCats = (rawCats || []) as { _id: string; name: string; label: string }[];
  const isLoading = rawImages === undefined;
  const removeImage = useMutation(api.siteImages.remove);
  const updateImage = useMutation(api.siteImages.update);
  const reorderAdjacent = useMutation(api.siteImages.reorderAdjacent);
  const generateUrl = useMutation(api.upload.generateUploadUrl);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const processUpload = useAction(api.upload.processUpload as any);
  const createCat = useMutation(api.categories.create);
  const removeCat = useMutation(api.categories.remove);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renameCat = useAction(api.categories.renameAndSync as any);

  const [showAddImage, setShowAddImage] = useState(false);
  const [showGalleryCatPanel, setShowGalleryCatPanel] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [activeGalleryCat, setActiveGalleryCat] = useState("all");
  const [uploadCat, setUploadCat] = useState("");
  const [confirmDel, setConfirmDel] = useState<{ id: Id<"siteImages">; label: string } | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loadingMore, setLoadingMore] = useState(false);

  const sorted = [...images].sort((a, b) => a.order - b.order);
  const filtered = activeGalleryCat === "all"
    ? sorted
    : sorted.filter((img) => img.category === activeGalleryCat);
  const visibleImages = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;
  const loadingRef = useRef(false);

  const loadMore = useCallback(() => {
    if (loadingMore || loadingRef.current) return;
    loadingRef.current = true;
    setLoadingMore(true);

    const target = Math.min(visibleCount + PAGE_SIZE, filtered.length);
    let current = visibleCount;
    const batchSize = 6;

    const batch = () => {
      current = Math.min(current + batchSize, target);
      setVisibleCount(current);
      if (current < target) {
        requestAnimationFrame(batch);
      } else {
        setLoadingMore(false);
        loadingRef.current = false;
      }
    };

    requestAnimationFrame(batch);
  }, [loadingMore, visibleCount, filtered.length]);

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const storageId = await uploadFileToConvex(file, () => generateUrl());
      const result = await processUpload({ storageId, section: "gallery", category: uploadCat || undefined, alt: file.name });
      if (result?.url) {
        gooeyToast.success("Image uploaded");
        setShowAddImage(false);
      }
    } catch (err) {
      gooeyToast.error("Upload failed", { description: err instanceof Error ? err.message : "Error" });
    } finally {
      setUploading(false);
    }
  };

  const handleCategoryChange = useCallback(async (imgId: Id<"siteImages">, category: string) => {
    await updateImage({ id: imgId, category });
    gooeyToast.success("Category updated");
  }, [updateImage]);

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">{filtered.length} images</p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowGalleryCatPanel(true)}
            className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-full font-medium text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Categories
          </button>
          <button
            onClick={() => setShowAddImage(true)}
            className="px-4 py-2 bg-brand-blue text-white rounded-full font-medium text-sm hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <HugeiconsIcon icon={PlusSignIcon} size={16} />
            Add Image
          </button>
        </div>
      </div>

      <ResponsiveModal
        isOpen={showAddImage}
        onOpenChange={setShowAddImage}
        title="Add Image"
        description="Choose a category and upload a gallery image."
      >
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900 dark:text-gray-100">Image category</label>
            <select
              value={uploadCat}
              onChange={(e) => setUploadCat(e.target.value)}
              className="w-full h-12 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: "right 0.75rem center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "1.25rem",
              }}
            >
              <option value="">Uncategorized</option>
              {galleryCats.map((c) => (<option key={c.name} value={c.name}>{c.label}</option>))}
            </select>
          </div>
          <div className="space-y-2 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-4">
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Upload image</p>
              <p className="text-xs text-gray-500">Drop a photo here after choosing the category.</p>
            </div>
            <ImageDropZone onUpload={handleUpload} uploading={uploading} />
          </div>
        </div>
      </ResponsiveModal>

      <div className="flex flex-wrap gap-2 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-2">
        {[
          { name: "all", label: "All", count: sorted.length },
          ...galleryCats.map((c) => ({ ...c, count: sorted.filter((i) => i.category === c.name).length })),
        ].map((tab) => (
          <button
            key={tab.name}
            onClick={() => { setActiveGalleryCat(tab.name); setVisibleCount(PAGE_SIZE); setLoadingMore(false); loadingRef.current = false; }}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${activeGalleryCat === tab.name ? "bg-brand-blue text-white shadow-sm" : "bg-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
          >
            <span>{tab.label}</span>
            <span className="ml-2 text-xs opacity-70">{tab.count}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {visibleImages.map((img, idx) => (
          <div key={img._id} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
            <div className="aspect-[3/4] relative group bg-gray-100 dark:bg-gray-800">
              <div className="absolute top-2 left-2 z-10 flex gap-1">
                <span className="text-[10px] font-mono text-white bg-black/50 px-1.5 py-0.5 rounded-full">
                  {idx + 1}
                </span>
                <span className="text-[10px] text-white bg-black/40 px-1.5 py-0.5 rounded-full truncate max-w-20">
                  {img.category || "uncategorized"}
                </span>
              </div>
              <img src={responsiveUrl(img.url, "thumb")} alt="" className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => gooeyToast.promise(reorderAdjacent({ id: img._id, direction: "up" }), { loading: "Moving...", success: "Moved", error: "Failed" })}
                    disabled={idx === 0}
                    className="p-2 bg-white rounded-full disabled:opacity-30 hover:bg-white/90 transition-all shadow"
                  >
                    <HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
                  </button>
                  <button
                    onClick={() => setConfirmDel({ id: img._id, label: img.alt || "this image" })}
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all shadow"
                  >
                    <HugeiconsIcon icon={Delete02Icon} size={16} />
                  </button>
                  <button
                    onClick={() => gooeyToast.promise(reorderAdjacent({ id: img._id, direction: "down" }), { loading: "Moving...", success: "Moved", error: "Failed" })}
                    disabled={idx === visibleImages.length - 1}
                    className="p-2 bg-white rounded-full disabled:opacity-30 hover:bg-white/90 transition-all shadow"
                  >
                    <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
                  </button>
                </div>
                <select
                  value={img.category || ""}
                  onChange={(e) => handleCategoryChange(img._id, e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  className="mt-1 w-full text-xs rounded-full bg-white/90 text-gray-800 px-3 py-1.5 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: "right 0.5rem center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "0.875rem",
                  }}
                >
                  <option value="">Uncategorized</option>
                  {galleryCats.map((c) => (<option key={c.name} value={c.name}>{c.label}</option>))}
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isLoading && (
        <div className="flex items-center justify-center py-16">
          <HugeiconsIcon icon={LoaderPinwheelIcon} size={24} className="text-brand-blue animate-spin" />
        </div>
      )}
      {!isLoading && filtered.length === 0 && <p className="text-center text-sm text-gray-400 py-10">No images in this category</p>}

      {hasMore && (
        <div className="flex justify-center pt-4">
          <button
            onClick={loadMore}
            disabled={loadingMore}
            className="px-8 py-3 bg-brand-blue text-white rounded-full font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-70 flex items-center gap-2"
          >
            {loadingMore && (
              <HugeiconsIcon icon={LoaderPinwheelIcon} size={16} className="animate-spin" />
            )}
            {loadingMore ? "Loading..." : `Load More (${filtered.length - visibleCount} remaining)`}
          </button>
        </div>
      )}

      <AnimatePresence>
        {showGalleryCatPanel && (
        <CategoryPanel title="Gallery Categories" icon={GalleryHorizontalEndIcon} onClose={() => setShowGalleryCatPanel(false)}>
          <CategoryManager
            categories={galleryCats as Category[]}
            onAdd={async (name, label) => { await createCat({ section: "gallery", name, label, order: galleryCats.length + 1 }); }}
            onRename={async (id, name, label, oldName) => { await renameCat({ id, name, label, oldName }); }}
            onRemove={async (id) => { await removeCat({ id }); }}
          />
        </CategoryPanel>
        )}
      </AnimatePresence>

      <ConfirmModal
        open={!!confirmDel}
        onConfirm={() => { if (confirmDel) { removeImage({ id: confirmDel.id }); gooeyToast.success("Image removed"); } setConfirmDel(null); }}
        onCancel={() => setConfirmDel(null)}
        title="Delete Image"
        message={`Remove this image from the gallery?`}
        confirmLabel="Delete"
      />
    </>
  );
}
