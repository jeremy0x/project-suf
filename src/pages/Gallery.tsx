import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon, ArrowRight01Icon, Cancel01Icon } from "@hugeicons/core-free-icons";
import type { Doc } from "../../convex/_generated/dataModel";
import Layout from "../components/Layout";
import { motion, AnimatePresence } from "framer-motion";
import { useAnimation } from "../context/AnimationContext";
import { ImageGallery } from "@/components/ui/image-gallery";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { GridBackground } from "@/components/ui/grid-background";

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

  return (
    <Layout>
      <GridBackground className="pt-32 pb-16 text-white">
        <div className="sm:container mx-auto px-4 relative">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading">
              Our Gallery
            </h1>
            <p className="text-sm max-w-3xl mx-auto text-gray-300">
              Take a look at our gym facilities and vibrant fitness community
            </p>
          </motion.div>
        </div>
      </GridBackground>

      <section className="section-padding bg-background relative overflow-hidden">
        <div className="sm:container mx-auto px-4 relative">
          <motion.div
            className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration }}
          >
            {galleryCategories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActiveCategory(cat.key)}
                className={`px-3 py-2 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base font-semibold transition-all ${
                  activeCategory === cat.key
                    ? "bg-brand-blue text-white shadow-lg"
                    : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
                aria-label={`Filter by ${cat.label}`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>

          <ImageGallery
            isLoading={queriedImages === undefined}
            images={filteredImages}
            onImageClick={openLightbox}
          />

          <AnimatePresence>
            {lightboxOpen && (
              <motion.div
                className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeLightbox}
              >
                <button
                  type="button"
                  onClick={(event) => { event.stopPropagation(); closeLightbox(); }}
                  className="absolute top-4 right-4 text-white z-10 p-2 rounded-full bg-black/30 hover:bg-black/50"
                  aria-label="Close lightbox"
                >
                  <HugeiconsIcon icon={Cancel01Icon} size={24} />
                </button>
                <button
                  type="button"
                  onClick={(event) => { event.stopPropagation(); goToPrevious(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white z-10 p-2 rounded-full bg-black/30 hover:bg-black/50"
                  aria-label="Previous image"
                >
                  <HugeiconsIcon icon={ArrowLeft01Icon} size={24} />
                </button>
                {currentImage && (
                  <motion.div
                    className="max-w-4xl max-h-[80vh] relative"
                    key={currentImageIndex}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    onClick={(event) => event.stopPropagation()}
                  >
                    <img
                      src={currentImage.src}
                      alt={currentImage.alt}
                      className="max-w-full max-h-[80vh] object-contain rounded-lg"
                    />
                  </motion.div>
                )}
                <button
                  type="button"
                  onClick={(event) => { event.stopPropagation(); goToNext(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white z-10 p-2 rounded-full bg-black/30 hover:bg-black/50"
                  aria-label="Next image"
                >
                  <HugeiconsIcon icon={ArrowRight01Icon} size={24} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <section className="bg-brand-dark py-20 relative overflow-hidden">
        <div className="sm:container mx-auto px-4 relative">
          <motion.div
            className="text-center text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration }}
          >
            <h2 className="text-3xl font-bold mb-6 font-heading">
              Experience Our Gym in Person
            </h2>
            <p className="text-sm mb-8 max-w-2xl mx-auto">
              The photos look great, but nothing compares to seeing our
              facilities in person. Come visit us for a tour!
            </p>
            <Link to="/contact?source=gallery">
              <InteractiveHoverButton
                text="Schedule a Visit"
                className="w-auto px-8 bg-brand-gold border-brand-gold text-brand-dark font-heading"
                aria-label="Schedule a visit to our facility"
              />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Gallery;
