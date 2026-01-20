import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAnimation } from "../context/AnimationContext";
import { ImageGallery } from "@/components/ui/image-gallery";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { BeamsBackground } from "@/components/ui/beams-background";

const galleryImages = [
  {
    id: 1,
    src: "/images/003.jpg",
    category: "workout",
    alt: "Cable pushdown",
    isPortrait: true,
  },
  {
    id: 2,
    src: "/images/005.jpg",
    category: "workout",
    alt: "Resting athlete",
    isPortrait: true,
  },
  {
    id: 3,
    src: "/images/007.jpg",
    category: "workout",
    alt: "Core workout",
    isPortrait: true,
  },
  {
    id: 4,
    src: "/images/008.jpg",
    category: "accessories",
    alt: "Gym apparel",
  },
  {
    id: 5,
    src: "/images/009.jpg",
    category: "workout",
    alt: "Floor coaching",
    isPortrait: true,
  },
  {
    id: 6,
    src: "/images/012.jpg",
    category: "workout",
    alt: "Back pose",
    isPortrait: true,
  },
  {
    id: 7,
    src: "/images/018.jpg",
    category: "workout",
    alt: "Cable pulldown",
    isPortrait: true,
  },
  {
    id: 8,
    src: "/images/about-story-image.jpg",
    category: "community",
    alt: "Group photo",
    isPortrait: true,
  },
  {
    id: 11,
    src: "/images/body-building 2.jpg",
    category: "workout",
    alt: "Muscle training",
  },
  {
    id: 12,
    src: "/images/body-building.jpg",
    category: "workout",
    alt: "Strength training",
  },
  {
    id: 13,
    src: "/images/body-toning 2.jpg",
    category: "workout",
    alt: "Toning workout",
  },
  {
    id: 14,
    src: "/images/body-toning.jpg",
    category: "workout",
    alt: "Toning session",
  },
  {
    id: 15,
    src: "/images/body-weight-training.jpg",
    category: "workout",
    alt: "Bodyweight training",
    isPortrait: true,
  },
  {
    id: 16,
    src: "/images/boxing-training-session.jpg",
    category: "workout",
    alt: "Boxing session",
  },
  {
    id: 17,
    src: "/images/boxing-training.jpg",
    category: "workout",
    alt: "Boxing training",
  },
  {
    id: 18,
    src: "/images/cardio-training.jpg",
    category: "workout",
    alt: "Cardio training",
  },
  {
    id: 19,
    src: "/images/cardio.jpg",
    category: "workout",
    alt: "Cardio workout",
    isPortrait: true,
  },
  {
    id: 20,
    src: "/images/dance-aerobics.jpg",
    category: "workout",
    alt: "Dance aerobics",
  },
  {
    id: 22,
    src: "/images/free-weights-area.jpg",
    category: "facilities",
    alt: "Free weights",
    isPortrait: true,
  },
  {
    id: 23,
    src: "/images/landing-page-about.jpg",
    category: "workout",
    alt: "Gym squat session",
    isPortrait: true,
  },
  {
    id: 24,
    src: "/images/member-transformation.jpg",
    category: "transformation",
    alt: "Member progress",
    isPortrait: false,
  },
  {
    id: 25,
    src: "/images/outdoor-group-class.jpg",
    category: "community",
    alt: "Outdoor group class",
    isPortrait: false,
  },
  {
    id: 28,
    src: "/images/PXL_20260114_072200361.jpg",
    category: "workout",
    alt: "Back squat",
    isPortrait: true,
  },
  {
    id: 29,
    src: "/images/PXL_20260114_072220312.jpg",
    category: "workout",
    alt: "Cable curls",
  },
  {
    id: 30,
    src: "/images/PXL_20260114_072309276.jpg",
    category: "workout",
    alt: "Squat spotter",
  },
  {
    id: 31,
    src: "/images/PXL_20260114_072349551.jpg",
    category: "workout",
    alt: "Overhead press",
    isPortrait: true,
  },
  {
    id: 32,
    src: "/images/PXL_20260114_072452547.jpg",
    category: "workout",
    alt: "Barbell squat",
    isPortrait: true,
  },
  {
    id: 33,
    src: "/images/PXL_20260114_072506635.jpg",
    category: "workout",
    alt: "Dumbbell lunge",
  },
  {
    id: 34,
    src: "/images/PXL_20260114_072522281.jpg",
    category: "workout",
    alt: "Treadmill walk",
    isPortrait: true,
  },
  {
    id: 35,
    src: "/images/PXL_20260114_072638874.jpg",
    category: "facilities",
    alt: "Squat rack",
    isPortrait: true,
  },
  {
    id: 37,
    src: "/images/PXL_20260114_072718032.jpg",
    category: "facilities",
    alt: "Punching bags",
  },
  {
    id: 38,
    src: "/images/PXL_20260114_073337967.jpg",
    category: "facilities",
    alt: "Loaded barbell",
    isPortrait: true,
  },
  {
    id: 39,
    src: "/images/PXL_20260114_073426612.jpg",
    category: "workout",
    alt: "Heavy squat",
    isPortrait: true,
  },
  {
    id: 40,
    src: "/images/PXL_20260114_073606558.PORTRAIT.jpg",
    category: "workout",
    alt: "Group squat",
    isPortrait: true,
  },
  {
    id: 41,
    src: "/images/PXL_20260114_074238092.jpg",
    category: "facilities",
    alt: "Front desk",
    isPortrait: true,
  },
  {
    id: 42,
    src: "/images/PXL_20260114_074503692.PORTRAIT.jpg",
    category: "workout",
    alt: "Squat training",
    isPortrait: true,
  },
  {
    id: 44,
    src: "/images/PXL_20260114_074527063.PORTRAIT.jpg",
    category: "workout",
    alt: "Leg raises",
    isPortrait: true,
  },
  {
    id: 45,
    src: "/images/PXL_20260114_074603211.jpg",
    category: "workout",
    alt: "Tire workout",
    isPortrait: true,
  },
  {
    id: 46,
    src: "/images/PXL_20260114_075121493.PORTRAIT.jpg",
    category: "workout",
    alt: "Cable row",
    isPortrait: true,
  },
  {
    id: 47,
    src: "/images/PXL_20260114_075223092.PORTRAIT.jpg",
    category: "workout",
    alt: "Bench dips",
    isPortrait: true,
  },
  {
    id: 48,
    src: "/images/PXL_20260114_080458231.PORTRAIT.ORIGINAL.jpg",
    category: "workout",
    alt: "Bench press",
    isPortrait: true,
  },
  {
    id: 49,
    src: "/images/PXL_20260114_080526157.PORTRAIT.jpg",
    category: "workout",
    alt: "Barbell curl",
    isPortrait: true,
  },
  {
    id: 50,
    src: "/images/PXL_20260114_080537291.PORTRAIT.jpg",
    category: "community",
    alt: "Family visit",
    isPortrait: true,
  },
  {
    id: 51,
    src: "/images/PXL_20260114_080922222.PORTRAIT.jpg",
    category: "community",
    alt: "Family at dressing room",
    isPortrait: false,
  },
  {
    id: 52,
    src: "/images/PXL_20260114_081601191.PORTRAIT.jpg",
    category: "workout",
    alt: "Bicep curls",
    isPortrait: false,
  },
  {
    id: 55,
    src: "/images/weight-loss.jpg",
    category: "workout",
    alt: "Treadmill workout",
  },
  {
    id: 56,
    src: "/images/yoga-class-in-session.jpg",
    category: "community",
    alt: "Yoga class",
    isPortrait: true,
  },
  {
    id: 57,
    src: "/images/yoga-training.jpg",
    category: "workout",
    alt: "Yoga training",
    isPortrait: false,
  },
];

const categories = [
  { key: "all", label: "All" },
  { key: "facilities", label: "Facilities" },
  { key: "workout", label: "Workout" },
  { key: "community", label: "Community" },
  { key: "transformation", label: "Transformation" },
  { key: "accessories", label: "Accessories" },
];

const Gallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("all");
  const { reduceMotion } = useAnimation();
  const duration = reduceMotion ? 0 : 0.3;

  const filteredImages =
    activeCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);
  const currentImage = filteredImages[currentImageIndex];

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
  }, []);

  const goToPrevious = useCallback(() => {
    if (!filteredImages.length) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? filteredImages.length - 1 : prev - 1,
    );
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
      if (event.key === "ArrowLeft") {
        goToPrevious();
      } else if (event.key === "ArrowRight") {
        goToNext();
      } else if (event.key === "Escape") {
        closeLightbox();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeLightbox, goToNext, goToPrevious, lightboxOpen]);

  return (
    <Layout>
      <BeamsBackground className="pt-32 pb-16 text-white" intensity="strong">
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
      </BeamsBackground>

      <section className="section-padding bg-background relative overflow-hidden">
        <div className="sm:container mx-auto px-4 relative">
          {/* Category Filter Tabs */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration }}
          >
            {categories.map((cat) => (
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

          <ImageGallery images={filteredImages} onImageClick={openLightbox} />

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
                  onClick={(event) => {
                    event.stopPropagation();
                    closeLightbox();
                  }}
                  className="absolute top-4 right-4 text-white z-10 p-2 rounded-full bg-black/30 hover:bg-black/50"
                  aria-label="Close lightbox"
                >
                  <X size={24} />
                </button>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    goToPrevious();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white z-10 p-2 rounded-full bg-black/30 hover:bg-black/50"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
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
                  onClick={(event) => {
                    event.stopPropagation();
                    goToNext();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white z-10 p-2 rounded-full bg-black/30 hover:bg-black/50"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
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
