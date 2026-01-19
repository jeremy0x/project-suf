'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useInView } from 'framer-motion';
import { AspectRatio } from '@/components/ui/aspect-ratio';

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
}

export function ImageGallery({ images, onImageClick }: ImageGalleryProps) {
  return (
    <div className="w-full">
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
        {images.map((image, index) => {
          const isPortrait = typeof image.isPortrait === "boolean"
            ? image.isPortrait
            : /portrait/i.test(image.src) || image.id % 3 === 0;
          const ratio = isPortrait ? 3 / 4 : 4 / 3;

          return (
            <div key={image.id} className="mb-4 break-inside-avoid">
              <AnimatedImage
                id={image.id}
                alt={image.alt}
                src={image.src}
                ratio={ratio}
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
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isLoading, setIsLoading] = React.useState(true);
  const [imgSrc, setImgSrc] = React.useState(src);

  const handleError = () => {
    if (placeholder) {
      setImgSrc(placeholder);
    }
  };

  return (
    <AspectRatio ref={ref} ratio={ratio} className="relative overflow-hidden rounded-xl cursor-pointer group">
      <img
        src={imgSrc}
        alt={alt}
        className={cn(
          "w-full h-full object-cover object-top transition-all duration-700",
          isInView ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-105 blur-sm",
          isLoading ? "blur-sm" : "blur-0",
          "group-hover:scale-110 transition-transform duration-500"
        )}
        onLoad={() => setIsLoading(false)}
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
