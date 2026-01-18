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
}

interface ImageGalleryProps {
  images: GalleryImage[];
  onImageClick?: (index: number) => void;
}

export function ImageGallery({ images, onImageClick }: ImageGalleryProps) {
  // Split images into 3 columns
  const columns: GalleryImage[][] = [[], [], []];
  images.forEach((image, index) => {
    columns[index % 3].push(image);
  });

  return (
    <div className="w-full">
      <div className="flex gap-4">
        {columns.map((column, colIndex) => (
          <div key={colIndex} className="flex-1 flex flex-col gap-4">
            {column.map((image, index) => {
              // Determine aspect ratio based on position for variety
              const isPortrait = (colIndex + index) % 3 === 0;
              const ratio = isPortrait ? 3 / 4 : 4 / 3;
              const globalIndex = images.findIndex(img => img.id === image.id);

              return (
                <AnimatedImage
                  key={image.id}
                  alt={image.alt}
                  src={image.src}
                  ratio={ratio}
                  onClick={() => onImageClick?.(globalIndex)}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

interface AnimatedImageProps {
  alt: string;
  src: string;
  className?: string;
  placeholder?: string;
  ratio: number;
  onClick?: () => void;
}

function AnimatedImage({ alt, src, ratio, placeholder, onClick }: AnimatedImageProps) {
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
    <AspectRatio ref={ref} ratio={ratio} className="overflow-hidden rounded-xl cursor-pointer group">
      <img
        src={imgSrc}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-all duration-700",
          isInView ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-105 blur-sm",
          isLoading ? "blur-sm" : "blur-0",
          "group-hover:scale-110 transition-transform duration-500"
        )}
        onLoad={() => setIsLoading(false)}
        loading="lazy"
        onError={handleError}
        onClick={onClick}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <h3 className="text-white text-lg font-bold font-heading">
          {alt}
        </h3>
      </div>
    </AspectRatio>
  );
}
