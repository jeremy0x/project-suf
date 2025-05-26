import { useState } from "react";
import Layout from "../components/Layout";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAnimation } from "../context/AnimationContext";

const galleryImages = [
  {
    id: 1,
    src: "/images/modern-gym-equipment.jpg",
    category: "facilities",
    alt: "Modern gym equipment",
  },
  {
    id: 2,
    src: "/images/free-weights-area.jpg",
    category: "facilities",
    alt: "Free weights area",
  },
  {
    id: 3,
    src: "/images/yoga-class-in-session.jpg",
    category: "classes",
    alt: "Yoga class in session",
  },
  {
    id: 4,
    src: "/images/group-fitness-class.jpg",
    category: "classes",
    alt: "Group fitness class",
  },
  {
    id: 5,
    src: "/images/member-transformation.jpg",
    category: "transformations",
    alt: "Member transformation",
  },
  {
    id: 6,
    src: "/images/cardio-equipment-area.jpg",
    category: "facilities",
    alt: "Cardio equipment area",
  },
  {
    id: 7,
    src: "/images/boxing-training-session.jpg",
    category: "classes",
    alt: "Boxing training session",
  },
  {
    id: 8,
    src: "/images/weight-training-area.jpg",
    category: "facilities",
    alt: "Weight training area",
  },
  {
    id: 9,
    src: "/images/strength-training-1.jpg",
    category: "classes",
    alt: "Strength training",
  },
  {
    id: 10,
    src: "/images/strength-training-2.jpg",
    category: "classes",
    alt: "Strength training",
  },
  {
    id: 11,
    src: "/images/outdoor-group-class.jpg",
    category: "classes",
    alt: "Outdoor Group Class",
  },
  {
    id: 12,
    src: "/images/body-weight-training.jpg",
    category: "classes",
    alt: "Body Weight Training",
  },
];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { reduceMotion } = useAnimation();
  const duration = reduceMotion ? 0 : 0.3;

  const filteredImages =
    selectedCategory === "all"
      ? galleryImages
      : galleryImages.filter((image) => image.category === selectedCategory);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? filteredImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % filteredImages.length
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration },
    },
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-brand-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-brand-blue rounded-full filter blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-brand-gold rounded-full filter blur-[100px]"></div>
        </div>
        <div className="sm:container mx-auto px-4 relative">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4 font-crimson">
              Our Gallery
            </h1>
            <p className="text-lg max-w-3xl mx-auto text-gray-300">
              Take a look at our gym facilities and vibrant fitness community
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-brand-blue rounded-full filter blur-[150px]"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-brand-gold rounded-full filter blur-[150px]"></div>
        </div>
        <div className="sm:container mx-auto px-4 relative">
          {/* Category Filter */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration }}
          >
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                selectedCategory === "all"
                  ? "bg-brand-blue text-white shadow-lg"
                  : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory("facilities")}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                selectedCategory === "facilities"
                  ? "bg-brand-blue text-white shadow-lg"
                  : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              Facilities
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory("classes")}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                selectedCategory === "classes"
                  ? "bg-brand-blue text-white shadow-lg"
                  : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              Classes
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory("events")}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                selectedCategory === "events"
                  ? "bg-brand-blue text-white shadow-lg"
                  : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              Events
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory("transformations")}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                selectedCategory === "transformations"
                  ? "bg-brand-blue text-white shadow-lg"
                  : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              Transformations
            </button>
          </motion.div>

          {/* Gallery Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={selectedCategory}
          >
            <AnimatePresence mode="wait">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  onClick={() => openLightbox(index)}
                >
                  <div className="group relative overflow-hidden rounded-xl cursor-pointer">
                    <div className="aspect-square">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <h3 className="text-white text-lg font-bold font-crimson">
                        {image.alt}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Lightbox */}
          <AnimatePresence>
            {lightboxOpen && (
              <motion.div
                className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  type="button"
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 text-white z-10 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
                  aria-label="Close lightbox"
                >
                  <X size={24} />
                </button>

                <button
                  type="button"
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white z-10 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>

                <motion.div
                  className="max-w-4xl max-h-[80vh] relative"
                  key={currentImageIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={filteredImages[currentImageIndex].src}
                    alt={filteredImages[currentImageIndex].alt}
                    className="max-w-full max-h-[80vh] object-contain"
                  />
                  <div className="text-white text-center mt-4 font-crimson">
                    {filteredImages[currentImageIndex].alt}
                  </div>
                </motion.div>

                <button
                  type="button"
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white z-10 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-dark py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-brand-blue rounded-full filter blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-brand-gold rounded-full filter blur-[100px]"></div>
        </div>
        <div className="sm:container mx-auto px-4 relative">
          <motion.div
            className="text-center text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration }}
          >
            <h2 className="text-3xl font-bold mb-6 font-crimson">
              Experience Our Gym in Person
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-sm">
              The photos look great, but nothing compares to seeing our
              facilities in person. Come visit us for a tour!
            </p>
            <a
              href="/contact?source=gallery"
              className="btn-secondary inline-block font-crimson"
            >
              SCHEDULE A VISIT
            </a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Gallery;
