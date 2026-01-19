import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAnimation } from "../context/AnimationContext";
import { ImageGallery } from "@/components/ui/image-gallery";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

const galleryImages = [
  { id: 1, src: "/images/013.jpg", category: "facilities", alt: "Gym equipments" },
  { id: 2, src: "/images/free-weights-area.jpg", category: "facilities", alt: "Free weights area" },
  { id: 3, src: "/images/yoga-class-in-session.jpg", category: "classes", alt: "Yoga class in session" },
  { id: 4, src: "/images/007.jpg", category: "classes", alt: "Workout class in session" },
  { id: 5, src: "/images/member-transformation.jpg", category: "transformations", alt: "Member transformation" },
  { id: 6, src: "/images/014.jpg", category: "facilities", alt: "Cardio equipment area" },
  { id: 7, src: "/images/boxing-training-session.jpg", category: "classes", alt: "Boxing training session" },
  { id: 8, src: "/images/004.jpg", category: "classes", alt: "Weight training area" },
  { id: 9, src: "/images/strength-training-1.jpg", category: "classes", alt: "Strength training" },
  { id: 10, src: "/images/016.jpg", category: "classes", alt: "Strength training" },
  { id: 11, src: "/images/outdoor-group-class.jpg", category: "classes", alt: "Outdoor Group Class" },
  { id: 12, src: "/images/body-weight-training.jpg", category: "classes", alt: "Body Weight Training" },
  { id: 13, src: "/images/015.jpg", category: "classes", alt: "Strength training" },
  { id: 14, src: "/images/017_.jpg", category: "classes", alt: "Workout in session" },
  { id: 15, src: "/images/011.jpg", category: "classes", alt: "Workout in session" },
  { id: 16, src: "/images/010.jpg", category: "classes", alt: "Workout in session" },
  { id: 17, src: "/images/012.jpg", category: "classes", alt: "Workout in session" },
  { id: 18, src: "/images/018.jpg", category: "classes", alt: "Workout in session" },
  { id: 19, src: "/images/019.jpg", category: "facilities", alt: "Weightlifting area" },
  { id: 20, src: "/images/005.jpg", category: "classes", alt: "Training in session" },
];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { reduceMotion } = useAnimation();
  const duration = reduceMotion ? 0 : 0.3;

  const filteredImages = selectedCategory === "all" ? galleryImages : galleryImages.filter((image) => image.category === selectedCategory);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
  };

  const goToPrevious = () => setCurrentImageIndex((prev) => (prev === 0 ? filteredImages.length - 1 : prev - 1));
  const goToNext = () => setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length);

  return (
    <Layout>
      <section className="pt-32 pb-16 bg-brand-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-brand-blue rounded-full filter blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-brand-gold rounded-full filter blur-[100px]"></div>
        </div>
        <div className="sm:container mx-auto px-4 relative">
          <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration, delay: 0.2 }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading">Our Gallery</h1>
            <p className="text-sm max-w-3xl mx-auto text-gray-300">Take a look at our gym facilities and vibrant fitness community</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background relative overflow-hidden">
        <div className="sm:container mx-auto px-4 relative">
          <motion.div className="flex flex-wrap justify-center gap-4 mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration }}>
            {["all", "facilities", "classes", "transformations"].map((cat) => (
              <button 
                key={cat} 
                type="button" 
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-3 rounded-full font-semibold transition-all capitalize ${selectedCategory === cat ? "bg-brand-blue text-white shadow-lg" : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"}`}
                aria-label={`Filter by ${cat === "all" ? "all categories" : cat}`}
              >
                {cat === "all" ? "All" : cat}
              </button>
            ))}
          </motion.div>

          <ImageGallery images={filteredImages} onImageClick={openLightbox} />

          <AnimatePresence>
            {lightboxOpen && (
              <motion.div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <button 
                  type="button" 
                  onClick={closeLightbox} 
                  className="absolute top-4 right-4 text-white z-10 p-2 rounded-full bg-black/30 hover:bg-black/50"
                  aria-label="Close lightbox"
                >
                  <X size={24} />
                </button>
                <button 
                  type="button" 
                  onClick={goToPrevious} 
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white z-10 p-2 rounded-full bg-black/30 hover:bg-black/50"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>
                <motion.div className="max-w-4xl max-h-[80vh] relative" key={currentImageIndex} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
                  <img src={filteredImages[currentImageIndex].src} alt={filteredImages[currentImageIndex].alt} className="max-w-full max-h-[80vh] object-contain" />
                  <div className="text-white text-center mt-4 font-heading">{filteredImages[currentImageIndex].alt}</div>
                </motion.div>
                <button 
                  type="button" 
                  onClick={goToNext} 
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
          <motion.div className="text-center text-white" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration }}>
            <h2 className="text-3xl font-bold mb-6 font-heading">Experience Our Gym in Person</h2>
            <p className="text-sm mb-8 max-w-2xl mx-auto">The photos look great, but nothing compares to seeing our facilities in person. Come visit us for a tour!</p>
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
