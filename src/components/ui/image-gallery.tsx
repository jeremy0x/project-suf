import React from 'react';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { HugeiconsIcon } from '@hugeicons/react';
import { LoaderPinwheelIcon } from '@hugeicons/core-free-icons';
import { responsiveUrl } from '@/lib/images';

const FALLBACK = "/placeholder.svg";
const PAGE_SIZE = 12;
const BATCH_SIZE = 4;

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
}

interface ImageGalleryProps {
  images: GalleryImage[];
  onImageClick?: (index: number) => void;
  isLoading?: boolean;
}

export function ImageGallery({ images, onImageClick, isLoading }: ImageGalleryProps) {
  const [visibleCount, setVisibleCount] = React.useState(PAGE_SIZE);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const visibleImages = React.useMemo(() => images.slice(0, visibleCount), [images, visibleCount]);
  const hasMore = visibleCount < images.length;

  const loadMore = React.useCallback(() => {
    if (loadingMore) return;
    setLoadingMore(true);

    const target = Math.min(visibleCount + PAGE_SIZE, images.length);
    let current = visibleCount;

    const batch = () => {
      current = Math.min(current + BATCH_SIZE, target);
      setVisibleCount(current);
      if (current < target) {
        requestAnimationFrame(batch);
      } else {
        setLoadingMore(false);
      }
    };

    requestAnimationFrame(batch);
  }, [loadingMore, visibleCount, images.length]);

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="flex flex-wrap gap-4">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="w-[calc(33.333%-1rem)] max-sm:w-[calc(50%-0.5rem)]">
              <AspectRatio ratio={3 / 4} className="relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                <div className="absolute inset-0 shimmer-bg rounded-xl" />
              </AspectRatio>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-4">
        {visibleImages.map((image, idx) => {
          const realIndex = images.indexOf(image);

          return (
            <div
              key={image.id}
              className="w-[calc(33.333%-1rem)] max-sm:w-[calc(50%-0.5rem)]"
            >
              <AnimatedImage
                src={image.src}
                alt={image.alt}
                placeholder={FALLBACK}
                onClick={() => onImageClick?.(realIndex)}
              />
            </div>
          );
        })}
      </div>
      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            disabled={loadingMore}
            className="px-8 py-3 bg-brand-blue text-white rounded-full font-medium hover:opacity-90 transition-opacity disabled:opacity-70 flex items-center gap-2"
          >
            {loadingMore && (
              <HugeiconsIcon icon={LoaderPinwheelIcon} size={16} className="animate-spin" />
            )}
            {loadingMore ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
      {!hasMore && images.length > PAGE_SIZE && (
        <p className="text-center text-sm text-gray-400 mt-6">
          Showing all {images.length} images
        </p>
      )}
    </div>
  );
}

interface AnimatedImageProps {
  alt: string;
  src: string;
  placeholder?: string;
  onClick?: () => void;
}

function AnimatedImage({ alt, src, placeholder, onClick }: AnimatedImageProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const seen = useViewOnce(ref);
  const [loaded, setLoaded] = React.useState(false);
  const thumbSrc = React.useMemo(() => responsiveUrl(src, "medium"), [src]);

  return (
    <AspectRatio ref={ref} ratio={3 / 4} className="relative overflow-hidden rounded-xl cursor-pointer group bg-gray-100 dark:bg-gray-800">
      {seen && !loaded && (
        <div className="absolute inset-0 shimmer-bg rounded-xl" />
      )}
      <img
        src={thumbSrc}
        alt={alt}
        className={cn(
          "w-full h-full object-cover",
          "transition-[opacity,transform] duration-700 ease-out",
          seen && loaded ? "opacity-100" : "opacity-0",
          "group-hover:scale-110 transition-transform duration-500"
        )}
        onLoad={() => setLoaded(true)}
        loading="lazy"
        onError={(e) => { (e.target as HTMLImageElement).src = placeholder || FALLBACK; }}
        onClick={onClick}
      />
    </AspectRatio>
  );
}
