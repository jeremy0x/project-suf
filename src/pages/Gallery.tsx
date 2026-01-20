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
    src: "/images/cable-triceps-pushdown.jpg",
    category: "workout",
    alt: "Athlete performing cable triceps pushdown exercise",
    isPortrait: true,
  },
  {
    id: 2,
    src: "/images/athlete-resting-gym.jpg",
    category: "workout",
    alt: "Athlete resting between sets in the gym",
    isPortrait: true,
  },
  {
    id: 3,
    src: "/images/woman-core-workout.jpg",
    category: "workout",
    alt: "Woman doing core exercises on yoga mat",
    isPortrait: true,
  },
  {
    id: 4,
    src: "/images/gym-apparel-rack.jpg",
    category: "accessories",
    alt: "Gym apparel and workout clothing on display rack",
  },
  {
    id: 5,
    src: "/images/athlete-floor-coaching.jpg",
    category: "workout",
    alt: "Trainer providing floor coaching during workout",
    isPortrait: true,
  },
  {
    id: 6,
    src: "/images/back-muscles-pose.jpg",
    category: "workout",
    alt: "Athlete showing back muscles definition",
    isPortrait: true,
  },
  {
    id: 7,
    src: "/images/cable-lat-pulldown.jpg",
    category: "workout",
    alt: "Athlete performing cable lat pulldown exercise",
    isPortrait: true,
  },
  {
    id: 8,
    src: "/images/community-outdoor-group-photo.jpg",
    category: "community",
    alt: "Community members in outdoor group photo",
    isPortrait: true,
  },
  {
    id: 11,
    src: "/images/bodybuilding-dumbbell-training.jpg",
    category: "workout",
    alt: "Bodybuilding training with dumbbells",
  },
  {
    id: 12,
    src: "/images/bodybuilding-physique-pose.jpg",
    category: "workout",
    alt: "Bodybuilder showing physique in classic pose",
  },
  {
    id: 13,
    src: "/images/body-toning-session.jpg",
    category: "workout",
    alt: "Member in body toning training session",
  },
  {
    id: 14,
    src: "/images/body-toning-workout.jpg",
    category: "workout",
    alt: "Body toning workout in progress",
  },
  {
    id: 15,
    src: "/images/body-weight-training.jpg",
    category: "workout",
    alt: "Bodyweight training exercise demonstration",
    isPortrait: true,
  },
  {
    id: 16,
    src: "/images/boxing-training-session.jpg",
    category: "workout",
    alt: "Boxing training session with punching bag",
  },
  {
    id: 17,
    src: "/images/boxing-training.jpg",
    category: "workout",
    alt: "Member practicing boxing techniques",
  },
  {
    id: 18,
    src: "/images/cardio-training.jpg",
    category: "workout",
    alt: "Cardio training session in progress",
  },
  {
    id: 19,
    src: "/images/stationary-bike-cardio.jpg",
    category: "workout",
    alt: "Member on stationary bike for cardio workout",
    isPortrait: true,
  },
  {
    id: 20,
    src: "/images/dance-aerobics.jpg",
    category: "workout",
    alt: "Dance aerobics class in action",
  },
  {
    id: 22,
    src: "/images/free-weights-area.jpg",
    category: "facilities",
    alt: "Free weights area with dumbbells and mirrors",
    isPortrait: true,
  },
  {
    id: 23,
    src: "/images/gym-squat-session.jpg",
    category: "workout",
    alt: "Members in gym squat training session",
    isPortrait: true,
  },
  {
    id: 24,
    src: "/images/member-transformation.jpg",
    category: "transformation",
    alt: "Member before and after fitness transformation",
    isPortrait: false,
  },
  {
    id: 25,
    src: "/images/outdoor-community-fitness.jpg",
    category: "community",
    alt: "Outdoor community fitness event",
    isPortrait: false,
  },
  {
    id: 28,
    src: "/images/barbell-back-squat.jpg",
    category: "workout",
    alt: "Athlete performing barbell back squat",
    isPortrait: true,
  },
  {
    id: 29,
    src: "/images/cable-bicep-curls.jpg",
    category: "workout",
    alt: "Athlete doing cable bicep curls",
  },
  {
    id: 30,
    src: "/images/squat-with-spotter.jpg",
    category: "workout",
    alt: "Squat exercise with spotter assistance",
  },
  {
    id: 31,
    src: "/images/overhead-barbell-press.jpg",
    category: "workout",
    alt: "Overhead barbell press exercise",
    isPortrait: true,
  },
  {
    id: 32,
    src: "/images/heavy-barbell-squat.jpg",
    category: "workout",
    alt: "Heavy barbell squat training",
    isPortrait: true,
  },
  {
    id: 33,
    src: "/images/dumbbell-walking-lunge.jpg",
    category: "workout",
    alt: "Dumbbell walking lunge exercise",
  },
  {
    id: 34,
    src: "/images/treadmill-walk-cardio.jpg",
    category: "workout",
    alt: "Member walking on treadmill for cardio",
    isPortrait: true,
  },
  {
    id: 35,
    src: "/images/squat-rack-equipment.jpg",
    category: "facilities",
    alt: "Squat rack with loaded barbell",
    isPortrait: true,
  },
  {
    id: 37,
    src: "/images/punching-bags-area.jpg",
    category: "facilities",
    alt: "Boxing area with punching bags and gloves",
  },
  {
    id: 38,
    src: "/images/loaded-barbell-station.jpg",
    category: "facilities",
    alt: "Weight station with loaded barbell",
    isPortrait: true,
  },
  {
    id: 39,
    src: "/images/heavy-squat-training.jpg",
    category: "workout",
    alt: "Athlete doing heavy squat training",
    isPortrait: true,
  },
  {
    id: 40,
    src: "/images/group-squat-session.jpg",
    category: "workout",
    alt: "Group squat training session",
    isPortrait: true,
  },
  {
    id: 41,
    src: "/images/gym-front-desk.jpg",
    category: "facilities",
    alt: "Gym front desk and reception area",
    isPortrait: true,
  },
  {
    id: 42,
    src: "/images/squat-form-training.jpg",
    category: "workout",
    alt: "Squat form and technique training",
    isPortrait: true,
  },
  {
    id: 44,
    src: "/images/hanging-leg-raises.jpg",
    category: "workout",
    alt: "Athlete performing hanging leg raises",
    isPortrait: true,
  },
  {
    id: 45,
    src: "/images/tire-flip-workout.jpg",
    category: "workout",
    alt: "Tire flip functional training workout",
    isPortrait: true,
  },
  {
    id: 46,
    src: "/images/seated-cable-row.jpg",
    category: "workout",
    alt: "Seated cable row back exercise",
    isPortrait: true,
  },
  {
    id: 47,
    src: "/images/bench-tricep-dips.jpg",
    category: "workout",
    alt: "Bench tricep dips exercise",
    isPortrait: true,
  },
  {
    id: 48,
    src: "/images/barbell-bench-press.jpg",
    category: "workout",
    alt: "Barbell bench press exercise",
    isPortrait: true,
  },
  {
    id: 49,
    src: "/images/standing-barbell-curl.jpg",
    category: "workout",
    alt: "Standing barbell curl for biceps",
    isPortrait: true,
  },
  {
    id: 50,
    src: "/images/family-gym-visit.jpg",
    category: "community",
    alt: "Family visiting the gym facility",
    isPortrait: true,
  },
  {
    id: 51,
    src: "/images/family-at-gym.jpg",
    category: "community",
    alt: "Family members at the gym dressing room",
    isPortrait: false,
  },
  {
    id: 52,
    src: "/images/dumbbell-bicep-curls.jpg",
    category: "workout",
    alt: "Dumbbell bicep curls exercise",
    isPortrait: false,
  },
  {
    id: 55,
    src: "/images/treadmill-cardio-workout.jpg",
    category: "workout",
    alt: "Member on treadmill cardio workout",
  },
  {
    id: 56,
    src: "/images/group-yoga-class.jpg",
    category: "community",
    alt: "Group yoga class in session",
    isPortrait: true,
  },
  {
    id: 57,
    src: "/images/yoga-training.jpg",
    category: "workout",
    alt: "Individual yoga training session",
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
