import { useRef } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ImageUploadIcon } from "@hugeicons/core-free-icons";
import { gooeyToast } from "goey-toast";

interface ImageDropZoneProps {
  onUpload: (file: File) => Promise<void>;
  uploading: boolean;
}

export function ImageDropZone({ onUpload, uploading }: ImageDropZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (file) {
            if (file.size > 10 * 1024 * 1024) {
              gooeyToast.error("File too large", {
                description: "Maximum size is 10MB",
              });
              return;
            }
            await onUpload(file);
          }
          e.target.value = "";
        }}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="w-24 h-24 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center hover:border-brand-blue transition-colors disabled:opacity-50 shrink-0"
      >
        {uploading ? (
          <div className="animate-spin w-5 h-5 border-2 border-brand-blue border-t-transparent rounded-full" />
        ) : (
          <HugeiconsIcon icon={ImageUploadIcon} size={20} className="text-gray-400" />
        )}
      </button>
    </>
  );
}
