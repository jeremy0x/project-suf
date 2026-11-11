import { useMemo } from "react";
import Layout from "@/components/Layout";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useFavorites } from "@/context/FavoritesContext";
import { ProductCard, ProductCardSkeleton } from "@/components/shop/ProductCard";
import { Reveal } from "@/components/motion";
import { PageHero } from "@/components/site/PageHero";
import { Btn } from "@/components/site/Btn";

const Favorites = () => {
  const { favorites } = useFavorites();
  const products = useQuery(api.products.list, {});

  const liked = useMemo(
    () => (products || []).filter((p) => favorites.has(p._id)),
    [products, favorites]
  );

  return (
    <Layout>
      <PageHero
        index="♥"
        label="Wishlist"
        title={["Saved", <span className="text-white/30">for later.</span>]}
        intro="Everything you've hearted in the shop, kept on this device."
      />

      <section className="section bg-background text-ink">
        <div className="shell">
          {products === undefined ? (
            <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : liked.length === 0 ? (
            <Reveal className="flex flex-col items-start gap-8 border-y border-ink/15 py-20 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="title text-4xl">Nothing saved yet.</p>
                <p className="mt-3 text-sm text-ink/55">Tap the heart on any product to keep it here.</p>
              </div>
              <Btn to="/shop" variant="ink">
                Browse the shop
              </Btn>
            </Reveal>
          ) : (
            <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {liked.map((product, i) => (
                <Reveal key={product._id} delay={(i % 4) * 0.06}>
                  <ProductCard {...product} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Favorites;
