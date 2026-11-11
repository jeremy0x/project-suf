import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ProductCard, ProductCardSkeleton } from "@/components/shop/ProductCard";
import { CartDrawer } from "@/components/shop/CartDrawer";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon } from "@hugeicons/core-free-icons";
import { Reveal } from "@/components/motion";
import { PageHero } from "@/components/site/PageHero";
import { Roll } from "@/components/site/Btn";
import { useCart } from "@/context/CartContext";

const Shop = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const productsRaw = useQuery(api.products.list, {});
  const prodCatsRaw = useQuery(api.productCategories.list, {});
  const { totalItems } = useCart();

  const products = (productsRaw || []).slice().sort((a, b) => ((a as { sortOrder?: number }).sortOrder ?? 999) - ((b as { sortOrder?: number }).sortOrder ?? 999));
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
      <PageHero
        index="$"
        label="Shop"
        title={["Shop"]}
        intro="Gym wear, gloves, bags and accessories. Add items to your cart and order on WhatsApp."
      />

      <section className="section bg-background text-ink">
        <div className="shell">
          <Reveal from="left" className="mb-14 space-y-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <label className="relative block w-full max-w-md">
                <span className="sr-only">Search products</span>
                <HugeiconsIcon icon={Search01Icon} size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-ink/40" />
                <input
                  type="search"
                  placeholder="Search products"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="field pl-7"
                />
              </label>
              <div className="eyebrow flex items-center gap-6">
                <Link to="/favorites" className="roll-host text-ink/60 hover:text-ink">
                  <Roll>Wishlist</Roll>
                </Link>
                <button
                  type="button"
                  onClick={() => setCartOpen(true)}
                  className="btn btn-ink px-5 py-3"
                >
                  Cart ({String(totalItems).padStart(2, "0")})
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  data-active={activeCategory === cat}
                  onClick={() => setActiveCategory(cat)}
                  className="chip"
                >
                  {cat === "all" ? "All" : catLabels[cat] || cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </Reveal>

          {isLoading ? (
            <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="border-y border-ink/15 py-24 text-center">
              <p className="title text-3xl">Nothing here.</p>
              <p className="mt-3 text-sm text-ink/55">Try another category or search term.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((product, i) => (
                <Reveal key={product._id} delay={(i % 4) * 0.06}>
                  <ProductCard {...product} />
                </Reveal>
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
