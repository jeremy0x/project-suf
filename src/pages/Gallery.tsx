
import { useState } from 'react';
import Layout from '../components/Layout';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnimation } from '../context/AnimationContext';

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    category: "facilities",
    alt: "Modern gym equipment"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    category: "facilities",
    alt: "Free weights area"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
    category: "classes",
    alt: "Yoga class in session"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    category: "classes",
    alt: "Group fitness class"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
    category: "transformations",
    alt: "Member transformation"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
    category: "facilities",
    alt: "Cardio equipment area"
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
    category: "classes",
    alt: "Boxing training session"
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    category: "facilities",
    alt: "Weight training area"
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    category: "classes",
    alt: "Boxing class"
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1596357395217-80de13130e92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
    category: "events",
    alt: "Fitness competition"
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    category: "transformations",
    alt: "Before and after transformation"
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1604480133435-25b86862d276?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80",
    category: "events",
    alt: "Fitness workshop"
  }
];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { reduceMotion } = useAnimation();
  const duration = reduceMotion ? 0 : 0.3;
  
  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(image => image.category === selectedCategory);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? filteredImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % filteredImages.length
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.05,
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration }
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <motion.section 
        className="pt-32 pb-16 bg-brand-dark text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration }}
      >
        <div className="container mx-auto px-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4 font-crimson">Gallery</h1>
            <p className="text-xl max-w-3xl mx-auto text-gray-300 text-sm">
              Explore our facilities, classes, and member transformations through our photo gallery
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Gallery Section */}
      <section className="section-padding bg-background px-8">
        <div className="container mx-auto">
          {/* Category Filter */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration }}
          >
            <button 
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                selectedCategory === 'all' 
                  ? 'bg-brand-blue text-white shadow-lg' 
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              All
            </button>
            <button 
              onClick={() => setSelectedCategory('facilities')}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                selectedCategory === 'facilities' 
                  ? 'bg-brand-blue text-white shadow-lg' 
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              Facilities
            </button>
            <button 
              onClick={() => setSelectedCategory('classes')}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                selectedCategory === 'classes' 
                  ? 'bg-brand-blue text-white shadow-lg' 
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              Classes
            </button>
            <button 
              onClick={() => setSelectedCategory('events')}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                selectedCategory === 'events' 
                  ? 'bg-brand-blue text-white shadow-lg' 
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              Events
            </button>
            <button 
              onClick={() => setSelectedCategory('transformations')}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                selectedCategory === 'transformations' 
                  ? 'bg-brand-blue text-white shadow-lg' 
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
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
            whileInView="visible"
            viewport={{ once: true }}
          >
            {filteredImages.map((image, index) => (
              <motion.div 
                key={image.id} 
                variants={itemVariants}
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
                    <h3 className="text-white text-lg font-bold font-crimson">{image.alt}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
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
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 text-white z-10 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
                >
                  <X size={24} />
                </button>
                
                <button 
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white z-10 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
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
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white z-10 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
                >
                  <ChevronRight size={24} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section 
        className="bg-brand-blue py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration }}
      >
        <div className="container mx-auto px-8">
          <motion.div 
            className="text-center text-white"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration }}
          >
            <h2 className="text-3xl font-bold mb-6 font-crimson">Experience Our Gym in Person</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-sm">
              The photos look great, but nothing compares to seeing our facilities in person. Come visit us for a tour!
            </p>
            <a href="/contact" className="btn-secondary inline-block font-crimson">
              SCHEDULE A VISIT
            </a>
          </motion.div>
        </div>
      </motion.section>
    </Layout>
  );
};

export default Gallery;
