import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import { gooeyToast } from "goey-toast";
import { HugeiconsIcon } from "@hugeicons/react";
import { responsiveUrl } from "@/lib/images";
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ShoppingCartCheckIn02Icon,
  TruckDeliveryIcon,
  FavouriteIcon,
  Share01Icon,
  Alert01Icon,
} from "@hugeicons/core-free-icons";
import { AnimatePresence, motion } from "framer-motion";
import { GridBackground } from "@/components/ui/grid-background";

function StockDisplay({ qty }: { qty: number | undefined }) {
  if (qty === undefined) return null;
  if (qty === 0)
    return <span className="text-red-500 font-medium text-sm">Out of Stock</span>;
  if (qty <= 3)
    return <span className="text-orange-500 font-medium text-sm">Only {qty} left</span>;
  if (qty <= 10)
    return <span className="text-yellow-600 font-medium text-sm">Low Stock - {qty} available</span>;
  return <span className="text-green-600 font-medium text-sm">{qty} in stock</span>;
}

const ProductDetail = () => {
  const { id } = useParams();
  const [currentImage, setCurrentImage] = useState(0);

  const product = useQuery(api.products.getByShortId, { shortId: id! });
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  if (product === undefined) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-brand-blue border-t-transparent rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-400">Product not found</p>
        </div>
      </Layout>
    );
  }

  const images = ((product.images as { url: string; alt: string; order: number }[]) || [])
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((img) => ({ url: img.url, alt: img.alt }));
  if (images.length === 0) images.push({ url: "", alt: product.name });

  const inStock = product.stockQuantity === undefined || product.stockQuantity > 0;

  const handleAddToCart = () => {
    addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      image: images[0]?.url || "",
      quantity: 1,
    });
    gooeyToast.success("Added to cart!");
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: product.name, url });
    } else {
      await navigator.clipboard.writeText(url);
      gooeyToast.success("Link copied to clipboard");
    }
  };

  const waMessage = encodeURIComponent(
    `Hi, I'm interested in ${product.name} (\u20A6${product.price.toLocaleString()})`
  );

  return (
    <Layout>
      <GridBackground className="pt-24 pb-8 text-white">
        <div className="sm:container mx-auto px-4 relative">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/shop"
              className="text-sm text-gray-300 hover:text-white transition-colors inline-flex items-center gap-2 mb-4"
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
              Back to Shop
            </Link>
          </motion.div>
        </div>
      </GridBackground>

      <section className="bg-background py-16 md:py-24 -mt-8">
        <div className="sm:container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 relative group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImage}
                    src={responsiveUrl(images[currentImage].url, "medium")}
                    alt={images[currentImage].alt}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.src = "/placeholder.svg"; }}
                  />
                </AnimatePresence>
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImage((p) => (p === 0 ? images.length - 1 : p - 1))}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-black/50 text-black dark:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <HugeiconsIcon icon={ArrowLeft01Icon} size={20} />
                    </button>
                    <button
                      onClick={() => setCurrentImage((p) => (p === images.length - 1 ? 0 : p + 1))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-black/50 text-black dark:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <HugeiconsIcon icon={ArrowRight01Icon} size={20} />
                    </button>
                  </>
                )}
              </div>

              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImage(i)}
                      className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                        i === currentImage ? "border-brand-blue" : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={responsiveUrl(img.url, "thumb")} alt="" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = "/placeholder.svg"; }} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-medium text-brand-blue bg-brand-blue/10 px-3 py-1 rounded-full">
                    {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                  </span>
                  <h1 className="text-3xl md:text-4xl font-bold font-heading mt-3">
                    {product.name}
                  </h1>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => toggleFavorite(product._id)}
                    className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <HugeiconsIcon
                      icon={FavouriteIcon}
                      size={20}
                      className={isFavorite(product._id) ? "text-red-500 fill-red-500" : "text-gray-400"}
                    />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <HugeiconsIcon icon={Share01Icon} size={20} className="text-gray-500" />
                  </button>
                </div>
              </div>

              <p className="text-4xl font-bold font-heading text-brand-blue">
                {"\u20A6"}{product.price.toLocaleString()}
              </p>

              {(product.stockQuantity ?? 0) > 0 && (
                    <StockDisplay qty={product.stockQuantity} />
              )}

              {!inStock && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-red-500 font-medium">Out of Stock</span>
                </div>
              )}

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {product.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  disabled={!inStock}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-dark dark:bg-white text-white dark:text-brand-dark rounded-full font-medium transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <HugeiconsIcon icon={ShoppingCartCheckIn02Icon} size={20} />
                  Add to Cart
                </button>
                <a
                  href={`https://wa.me/2348134460609?text=${waMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 transition-colors"
                >
                  Buy Now
                </a>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <HugeiconsIcon icon={TruckDeliveryIcon} size={16} />
                  <span>Free delivery within Akure • Contact for shipping rates</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetail;
