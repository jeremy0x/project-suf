import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ProductCard, ProductCardSkeleton } from "@/components/shop/ProductCard";
import { CartDrawer } from "@/components/shop/CartDrawer";
import { GridBackground } from "@/components/ui/grid-background";
import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ShoppingCart02Icon,
  FavouriteIcon,
  FilterIcon,
  Search01Icon,
} from "@hugeicons/core-free-icons";
import { useCart } from "@/context/CartContext";

const Shop = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const productsRaw = useQuery(api.products.list, {});
  const prodCatsRaw = useQuery(api.productCategories.list, {});
  const { totalItems } = useCart();

  const products = (productsRaw || []).slice().sort((a: any, b: any) => (a.sortOrder ?? 999) - (b.sortOrder ?? 999));
  const prodCats = prodCatsRaw || [];
  const allCategories = ["all", ...prodCats.map((c) => c.name)];
  const catLabels = Object.fromEntries(prodCats.map((c) => [c.name, c.label]));
  const isLoading = productsRaw === undefined || prodCatsRaw === undefined;

  const filtered = products.filter((p) => {
    const matchesCategory =
      activeCategory === "all" || p.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Layout>
      <GridBackground className="pt-32 pb-16 text-white">
        <div className="sm:container mx-auto px-4 relative">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading">
              Shop
            </h1>
            <p className="text-lg max-w-2xl mx-auto text-gray-300">
              Premium fitness gear, supplements, and accessories
            </p>
          </motion.div>
        </div>
      </GridBackground>

      <section className="bg-background py-16 md:py-24">
        <div className="sm:container mx-auto px-4 md:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <HugeiconsIcon
                icon={Search01Icon}
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-blue text-sm"
              />
            </div>

            <div className="flex items-center gap-2">
              <Link
                to="/favorites"
                className="flex items-center gap-2 p-3 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full font-medium text-sm transition-all hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <HugeiconsIcon icon={FavouriteIcon} size={18} />
              </Link>
              <button
                onClick={() => setCartOpen(true)}
                className="relative flex items-center gap-2 px-4 py-2.5 bg-brand-dark dark:bg-white text-white dark:text-brand-dark rounded-full font-medium text-sm transition-all hover:opacity-90"
              >
                <HugeiconsIcon icon={ShoppingCart02Icon} size={18} />
                Cart
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-brand-blue text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-brand-blue text-white shadow-lg"
                    : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {cat === "all" ? "All" : catLabels[cat] || cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <HugeiconsIcon
                icon={FilterIcon}
                size={48}
                className="mx-auto mb-4 opacity-30"
              />
              <p className="text-lg font-medium">No products found</p>
              <p className="text-sm">Try a different category or search term</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((product) => (
                <ProductCard key={product._id} {...product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </Layout>
  );
};

export default Shop;
