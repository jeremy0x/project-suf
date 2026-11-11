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
      { rootMargin: "0px 0px -10% 0px" }
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
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6">
          {[...Array(9)].map((_, i) => (
            <AspectRatio key={i} ratio={3 / 4} className="relative overflow-hidden">
              <div className="absolute inset-0 shimmer-bg" />
            </AspectRatio>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6">
        {visibleImages.map((image, idx) => {
          const realIndex = images.indexOf(image);

          return (
            <div key={image.id} style={{ ["--d" as string]: `${(idx % 3) * 90}ms` }}>
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
            className="btn btn-outline-dark"
          >
            {loadingMore && (
              <HugeiconsIcon icon={LoaderPinwheelIcon} size={16} className="animate-spin" />
            )}
            {loadingMore ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
      {!hasMore && images.length > PAGE_SIZE && (
        <p className="eyebrow mt-10 text-center text-ink/40">
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
    <AspectRatio
      ref={ref}
      ratio={3 / 4}
      className="frame group cursor-pointer"
      style={{
        clipPath: seen ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
        transition: "clip-path 1.1s cubic-bezier(0.77, 0, 0.175, 1) var(--d, 0ms)",
      }}
    >
      {seen && !loaded && <div className="absolute inset-0 shimmer-bg" />}
      <button type="button" onClick={onClick} aria-label={alt ? `Open ${alt}` : "Open image"} className="block h-full w-full">
        <img
          src={thumbSrc}
          alt={alt}
          className={cn(
            "h-full w-full object-cover transition-opacity duration-700",
            loaded ? "opacity-100" : "opacity-0",
          )}
          onLoad={() => setLoaded(true)}
          loading="lazy"
          onError={(e) => { (e.target as HTMLImageElement).src = placeholder || FALLBACK; }}
        />
      </button>
    </AspectRatio>
  );
}
