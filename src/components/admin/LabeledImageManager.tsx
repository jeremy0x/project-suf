import { useState } from "react";
import { useMutation, useAction, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { gooeyToast } from "goey-toast";
import { HugeiconsIcon } from "@hugeicons/react";
import { ImageUploadIcon, Delete02Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import type { Id } from "../../../convex/_generated/dataModel";
import { uploadFileToConvex } from "./uploadFileToConvex";
import { responsiveUrl } from "@/lib/images";

interface LabeledSlot {
  key: string;
  label: string;
  iconSize?: boolean;
}

interface LabeledImageManagerProps {
  section: string;
  slots: LabeledSlot[];
  title: string;
  description?: string;
  defaultOpen?: boolean;
  columns?: number;
}

export function LabeledImageManager({ section, slots, title, description, defaultOpen = false, columns = 3 }: LabeledImageManagerProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const images = (useQuery(api.siteImages.listBySection, { section }) || []) as any[];
  const generateUrl = useMutation(api.upload.generateUploadUrl);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const processUpload = useAction(api.upload.processUpload as any);
  const updateImage = useMutation(api.siteImages.update);
  const removeImage = useMutation(api.siteImages.remove);

  const [uploading, setUploading] = useState<string | null>(null);

  const gridCols = columns === 7 ? "grid-cols-2 sm:grid-cols-4 lg:grid-cols-7" : columns === 5 ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5" : columns === 4 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  const handleReplace = (slotKey: string) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e: Event) => {
      const file = (e.target as HTMLInputElement)?.files?.[0];
      if (!file) return;
      if (file.size > 10 * 1024 * 1024) {
        gooeyToast.error("File too large (max 10MB)");
        return;
      }
      setUploading(slotKey);

      try {
        const storageId = await uploadFileToConvex(file, () => generateUrl());
        const result = await processUpload({ storageId, section, category: slotKey, alt: file.name });

        if (result?.url) {
          const existing = images.find((img: any) => img.category === slotKey);
          if (existing) {
            if (result.imageId) {
              await removeImage({ id: result.imageId });
              await updateImage({ id: existing._id, url: result.url, alt: file.name, category: slotKey });
            } else {
              await updateImage({ id: existing._id, url: result.url, alt: file.name, category: slotKey });
            }
            gooeyToast.success("Replaced");
          } else {
            gooeyToast.success("Uploaded");
          }
        }
      } catch (err) {
        gooeyToast.error("Upload failed", { description: err instanceof Error ? err.message : "Error" });
      } finally {
        setUploading(null);
      }
    };
    input.click();
  };

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden shadow-sm">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors text-left"
      >
        <div>
          <h3 className="font-heading font-semibold text-base text-gray-900 dark:text-gray-100">
            {title}
          </h3>
          {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
        </div>
        <HugeiconsIcon
          icon={ArrowRight01Icon}
          size={20}
          className={`text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="p-5 border-t border-gray-200 dark:border-gray-800">
          <div className={`grid ${gridCols} gap-4`}>
            {slots.map((slot) => {
              const img = images.find((i: any) => i.category === slot.key);

              return (
                <div
                  key={slot.key}
                  className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 overflow-hidden"
                >
                  <div className="p-3 border-b border-gray-100 dark:border-gray-800">
                    <h4 className="font-heading font-semibold text-xs text-gray-900 dark:text-gray-100">
                      {slot.label}
                    </h4>
                  </div>

                  {img ? (
                    <div className={`relative bg-gray-100 dark:bg-gray-800 group ${slot.iconSize ? "flex items-center justify-center h-20" : "aspect-[3/4]"}`}>
                      <img
                        src={slot.iconSize ? img.url : responsiveUrl(img.url, "thumb")}
                        alt=""
                        className={slot.iconSize ? "max-h-16 max-w-16 object-contain" : "w-full h-full object-cover"}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => handleReplace(slot.key)}
                          disabled={uploading === slot.key}
                          className="p-2 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-colors shadow-sm"
                          title="Replace image"
                        >
                          {uploading === slot.key ? (
                            <div className="animate-spin w-4 h-4 border-2 border-brand-blue border-t-transparent rounded-full" />
                          ) : (
                            <HugeiconsIcon icon={ImageUploadIcon} size={16} />
                          )}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className={`bg-gray-50 dark:bg-gray-800/50 flex items-center justify-center ${slot.iconSize ? "h-20" : "aspect-[3/4]"}`}>
                      <div className="text-center p-4">
                        {uploading === slot.key ? (
                          <div className="animate-spin w-6 h-6 border-2 border-brand-blue border-t-transparent rounded-full mx-auto" />
                        ) : (
                          <>
                            <div className="flex justify-center text-gray-300 mb-2">
                              <HugeiconsIcon icon={ImageUploadIcon} size={slot.iconSize ? 20 : 32} />
                            </div>
                            <p className="text-xs text-gray-400 mb-3">No image set</p>
                            <button
                              type="button"
                              onClick={() => handleReplace(slot.key)}
                              className="px-3 py-1.5 bg-brand-blue text-white text-xs rounded-full hover:opacity-90 transition-opacity"
                            >
                              Upload Image
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
