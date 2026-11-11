import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon, ArrowRight01Icon, Cancel01Icon } from "@hugeicons/core-free-icons";
import type { Doc } from "../../convex/_generated/dataModel";
import Layout from "../components/Layout";
import { motion, AnimatePresence } from "framer-motion";
import { useAnimation } from "../context/AnimationContext";
import { ImageGallery } from "@/components/ui/image-gallery";
import { Reveal } from "@/components/motion";
import { EASE_CLIP } from "@/components/motion/ease";
import { PageHero } from "@/components/site/PageHero";
import CTASection from "@/components/home/CTASection";

const Gallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("all");
  const { reduceMotion } = useAnimation();
  const duration = reduceMotion ? 0 : 0.3;

  const queriedImages = useQuery(api.siteImages.listBySection, { section: "gallery" });
  const dbCategories = useQuery(api.categories.listBySection, { section: "gallery" });

  const allImages = useMemo(() => {
    const list = queriedImages || [];
    return [...list]
      .sort((a, b) => a.order - b.order)
      .map((img, i) => ({
        id: i + 1,
        src: img.url,
        alt: img.alt,
        category: img.category || "facilities",
      }));
  }, [queriedImages]);

  const galleryCategories = useMemo(() => {
    if (dbCategories && dbCategories.length > 0) {
      return [{ key: "all", label: "All" }, ...dbCategories.map((c) => ({ key: c.name, label: c.label }))];
    }
    return [
      { key: "all", label: "All" },
      { key: "facilities", label: "Facilities" },
      { key: "workout", label: "Workout" },
      { key: "community", label: "Community" },
      { key: "transformation", label: "Transformation" },
      { key: "accessories", label: "Accessories" },
    ];
  }, [dbCategories]);

  const filteredImages = useMemo(
    () => activeCategory === "all"
      ? allImages
      : allImages.filter((img) => img.category === activeCategory),
    [allImages, activeCategory]
  );

  const currentImage = filteredImages[currentImageIndex];

  const openLightbox = (index: number) => {
    const realIndex = index < filteredImages.length ? index : 0;
    setCurrentImageIndex(realIndex);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
  }, []);

  const goToPrevious = useCallback(() => {
    if (!filteredImages.length) return;
    setCurrentImageIndex((prev) => prev === 0 ? filteredImages.length - 1 : prev - 1);
  }, [filteredImages.length]);

  const goToNext = useCallback(() => {
    if (!filteredImages.length) return;
    setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length);
  }, [filteredImages.length]);

  useEffect(() => {
    if (!filteredImages.length) {
      setCurrentImageIndex(0);
      return;
    }
    if (currentImageIndex >= filteredImages.length) {
      setCurrentImageIndex(0);
    }
  }, [currentImageIndex, filteredImages.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") goToPrevious();
      else if (event.key === "ArrowRight") goToNext();
      else if (event.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeLightbox, goToNext, goToPrevious, lightboxOpen]);

  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [lightboxOpen]);

  return (
    <Layout>
      <PageHero
        index="G"
        label="Gallery"
        title={["Gallery"]}
        intro="Take a look at our facilities and community. Even better in person, so come and visit."
      />

      <section className="section bg-background text-ink">
        <div className="shell">
          <Reveal from="left" className="mb-12 flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-wrap gap-2">
              {galleryCategories.map((cat) => (
                <button
                  key={cat.key}
                  type="button"
                  data-active={activeCategory === cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className="chip"
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <p className="eyebrow text-ink/45 tabular-nums">
              {String(filteredImages.length).padStart(2, "0")} images
            </p>
          </Reveal>

          <ImageGallery
            isLoading={queriedImages === undefined}
            images={filteredImages}
            onImageClick={openLightbox}
          />

          <AnimatePresence>
            {lightboxOpen && (
              <motion.div
                className="fixed inset-0 z-[60] flex items-center justify-center bg-ink text-bone"
                initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
                transition={{ duration: duration ? 0.8 : 0, ease: EASE_CLIP }}
                onClick={closeLightbox}
                role="dialog"
                aria-modal="true"
                aria-label="Image viewer"
              >
                <div className="eyebrow absolute inset-x-0 top-0 flex items-center justify-between px-5 py-5 md:px-8">
                  <span className="tabular-nums text-white/60">
                    {String(currentImageIndex + 1).padStart(2, "0")} / {String(filteredImages.length).padStart(2, "0")}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
                    className="flex items-center gap-2 text-white/80 hover:text-white"
                    aria-label="Close viewer"
                  >
                    Close <HugeiconsIcon icon={Cancel01Icon} size={16} />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                  className="absolute left-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/15 transition-colors hover:bg-bone hover:text-ink md:left-8"
                  aria-label="Previous image"
                >
                  <HugeiconsIcon icon={ArrowLeft01Icon} size={18} />
                </button>
                {currentImage && (
                  <motion.div
                    className="relative max-h-[80vh] max-w-5xl px-16"
                    key={currentImageIndex}
                    initial={{ clipPath: "inset(0% 0% 0% 100%)" }}
                    animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                    transition={{ duration: duration ? 0.7 : 0, ease: EASE_CLIP }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img src={currentImage.src} alt={currentImage.alt} className="max-h-[80vh] max-w-full object-contain" />
                    {currentImage.alt && (
                      <p className="eyebrow mt-4 text-white/50">{currentImage.alt}</p>
                    )}
                  </motion.div>
                )}
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); goToNext(); }}
                  className="absolute right-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/15 transition-colors hover:bg-bone hover:text-ink md:right-8"
                  aria-label="Next image"
                >
                  <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default Gallery;
