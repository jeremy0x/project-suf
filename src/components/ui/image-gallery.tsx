import React from 'react';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const FALLBACK = "/placeholder.svg";

function useViewOnce(ref: React.RefObject<HTMLElement | null>) {
  const [seen, setSeen] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setSeen(true); o.disconnect(); } },
      { rootMargin: "-100px" }
    );
    o.observe(el);
    return () => o.disconnect();
  }, [ref]);

  return seen;
}

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category?: string;
  isPortrait?: boolean;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  onImageClick?: (index: number) => void;
  isLoading?: boolean;
}

export function ImageGallery({ images, onImageClick, isLoading }: ImageGalleryProps) {
  const [ratiosBySrc, setRatiosBySrc] = React.useState<Record<string, number>>({});

  React.useEffect(() => {
    if (isLoading) return;
    let active = true;
    for (const img of images) {
      if (typeof img.isPortrait === "boolean") continue;
      if (ratiosBySrc[img.src]) continue;
      const p = new Image();
      p.onload = () => {
        if (!active) return;
        const r = p.naturalWidth && p.naturalHeight ? p.naturalWidth / p.naturalHeight : undefined;
        if (!r) return;
        setRatiosBySrc((prev) => (prev[img.src] ? prev : { ...prev, [img.src]: r }));
      };
      p.src = img.src;
    }
    return () => { active = false; };
  }, [images, ratiosBySrc, isLoading]);

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
          {[...Array(9)].map((_, i) => {
            const ratio = i % 3 === 0 ? 3 / 4 : i % 3 === 1 ? 4 / 3 : 1;
            return (
              <div key={i} className="mb-4 break-inside-avoid">
                <AspectRatio ratio={ratio} className="relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                  <div className="absolute inset-0 shimmer-bg rounded-xl" />
                </AspectRatio>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
        {images.map((image, index) => {
          const isPortrait = typeof image.isPortrait === "boolean"
            ? image.isPortrait
            : /portrait/i.test(image.src);
          const ratio = typeof image.isPortrait === "boolean"
            ? (isPortrait ? 3 / 4 : 4 / 3)
            : ratiosBySrc[image.src] ?? 4 / 3;

          return (
            <div key={image.id} className="mb-4 break-inside-avoid">
              <AnimatedImage
                key={image.src}
                id={image.id}
                alt={image.alt}
                src={image.src}
                ratio={ratio}
                placeholder={FALLBACK}
                onClick={() => onImageClick?.(index)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface AnimatedImageProps {
  id: number;
  alt: string;
  src: string;
  className?: string;
  placeholder?: string;
  ratio: number;
  onClick?: () => void;
}

function AnimatedImage({ id, alt, src, ratio, placeholder, onClick }: AnimatedImageProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const seen = useViewOnce(ref);
  const [loaded, setLoaded] = React.useState(false);
  const [imgSrc, setImgSrc] = React.useState(src);

  const handleError = () => {
    if (placeholder) setImgSrc(placeholder);
  };

  return (
    <AspectRatio ref={ref} ratio={ratio} className="relative overflow-hidden rounded-xl cursor-pointer group bg-gray-100 dark:bg-gray-800">
      {seen && !loaded && (
        <div className="absolute inset-0 shimmer-bg rounded-xl" />
      )}
      <img
        src={imgSrc}
        alt={alt}
        className={cn(
          "w-full h-full object-cover object-top",
          "transition-[opacity,transform] duration-700 ease-out",
          seen && loaded ? "opacity-100" : "opacity-0",
          "group-hover:scale-110 transition-transform duration-500"
        )}
        onLoad={() => setLoaded(true)}
        loading="lazy"
        onError={handleError}
        onClick={onClick}
      />
      <div className="absolute bottom-2 left-2 flex items-center text-xs font-sans text-white/80">
        <span>{id}</span>
        <span aria-hidden="true">.</span>
      </div>
    </AspectRatio>
  );
}
