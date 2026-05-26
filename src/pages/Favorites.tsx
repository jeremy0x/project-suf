import { useMemo } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useFavorites } from "@/context/FavoritesContext";
import { HugeiconsIcon } from "@hugeicons/react";
import { FavouriteIcon, ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { GridBackground } from "@/components/ui/grid-background";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/shop/ProductCard";

const Favorites = () => {
  const { favorites } = useFavorites();
  const products = useQuery(api.products.list, {});

  const liked = useMemo(
    () => (products || []).filter((p) => favorites.has(p._id)),
    [products, favorites]
  );

  return (
    <Layout>
      <GridBackground className="pt-32 pb-16 text-white">
        <div className="sm:container mx-auto px-4">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/shop"
              className="text-sm text-gray-300 hover:text-white inline-flex items-center gap-2 mb-4"
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
              Back to Shop
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading">
              Wishlist
            </h1>
            <p className="text-lg max-w-2xl mx-auto text-gray-300">
              Products you've saved for later
            </p>
          </motion.div>
        </div>
      </GridBackground>

      <section className="py-16 md:py-24 bg-background">
        <div className="sm:container mx-auto px-4 md:px-8">
          {liked.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <HugeiconsIcon icon={FavouriteIcon} size={48} className="mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">Your wishlist is empty</p>
              <p className="text-sm mb-6">Save your favorite products by tapping the heart icon</p>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
              >
                Browse Shop
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {liked.map((product) => (
                <ProductCard key={product._id} {...product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Favorites;
