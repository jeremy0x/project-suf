import { useState } from "react";
import { useQuery, useMutation, useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { gooeyToast } from "goey-toast";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, ImageUploadIcon } from "@hugeicons/core-free-icons";
import type { Doc, Id } from "../../../convex/_generated/dataModel";
import { ImageDropZone } from "@/components/admin/ImageDropZone";
import { uploadFileToConvex } from "./uploadFileToConvex";
import { responsiveUrl } from "@/lib/images";

interface SectionImageManagerProps {
  section: string;
  label: string;
  description?: string;
  replaceOnly?: boolean;
}

export function SectionImageManager({ section, label, description, replaceOnly }: SectionImageManagerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const images = (useQuery(api.siteImages.listBySection, { section }) || []) as Doc<"siteImages">[];
  const removeImage = useMutation(api.siteImages.remove);
  const updateImage = useMutation(api.siteImages.update);
  const generateUrl = useMutation(api.upload.generateUploadUrl);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const processUpload = useAction(api.upload.processUpload as any);
  const [replaceTarget, setReplaceTarget] = useState<Id<"siteImages"> | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file: File, targetId?: Id<"siteImages"> | null) => {
    setUploading(true);
    try {
      const storageId = await uploadFileToConvex(file, () => generateUrl());
      const result = await processUpload({
        storageId,
        section,
        alt: file.name,
      });
      const replaceId = targetId ?? replaceTarget;
      if (result?.url && replaceId) {
        await updateImage({
          id: replaceId,
          url: result.url,
          alt: file.name,
        });
        setReplaceTarget(null);
        gooeyToast.success(`${label} replaced`);
      } else if (result?.url) {
        gooeyToast.success(`${label} image added`);
      }
    } catch (err) {
      gooeyToast.error("Upload failed", {
        description: err instanceof Error ? err.message : "Error",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleReplace = (id: Id<"siteImages">) => {
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
      await handleUpload(file, id);
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
            {label}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            {description || `${images.length} ${images.length === 1 ? "image" : "images"} uploaded`}
          </p>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          {uploading && <span className="text-xs">Uploading...</span>}
          <HugeiconsIcon
            icon={ArrowRight01Icon}
            size={20}
            className={`transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}
          />
        </div>
      </button>

      {isOpen && (
        <div className="p-5 border-t border-gray-200 dark:border-gray-800 space-y-4">
          {images.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {images.map((img) => (
                <div
                  key={img._id}
                  className="relative aspect-[3/4] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 group bg-gray-50 dark:bg-gray-900 shadow-sm"
                >
                  <img
                    src={responsiveUrl(img.url, "thumb")}
                    alt={img.alt || ""}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => handleReplace(img._id)}
                      className="p-2 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-colors shadow-sm"
                      title="Replace image"
                    >
                      <HugeiconsIcon icon={ImageUploadIcon} size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-400">
              <span className="text-sm">No image set</span>
            </div>
          )}
          {!replaceOnly && (
            <div className="pt-2 border-t border-gray-100 dark:border-gray-800/50">
              <ImageDropZone onUpload={handleUpload} uploading={uploading} />
            </div>
          )}
        </div>
      )}

    </div>
  );
}
