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
  TruckDeliveryIcon,
  FavouriteIcon,
  Share01Icon,
} from "@hugeicons/core-free-icons";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/motion";
import { EASE_CLIP } from "@/components/motion/ease";
import { Btn } from "@/components/site/Btn";
import { naira } from "@/lib/format";

function StockDisplay({ qty }: { qty: number | undefined }) {
  if (qty === undefined) return null;
  if (qty === 0)
    return <span className="eyebrow text-red-600">Sold out</span>;
  if (qty <= 3)
    return <span className="eyebrow text-orange-600">Only {qty} left</span>;
  if (qty <= 10)
    return <span className="eyebrow text-ink/60">Low stock, {qty} available</span>;
  return <span className="eyebrow text-green-700">{qty} in stock</span>;
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
        <div className="shell grid min-h-screen grid-cols-1 gap-12 pb-24 pt-32 lg:grid-cols-2">
          <div className="shimmer-bg aspect-square" />
          <div className="space-y-4 pt-4">
            <div className="shimmer-bg h-3 w-24" />
            <div className="shimmer-bg h-12 w-3/4" />
            <div className="shimmer-bg h-8 w-32" />
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="shell flex min-h-screen flex-col items-start justify-center gap-8 pt-24">
          <p className="title text-5xl">Product not found.</p>
          <Btn to="/shop" variant="ink">Back to shop</Btn>
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
      <div className="h-16 bg-ink md:h-20" />
      <section className="bg-background pb-24 pt-10 text-ink md:pb-32">
        <div className="shell">
          <Reveal immediate from="left" delay={0.4}>
            <nav className="eyebrow mb-10 flex items-center gap-3 text-ink/50">
              <Link to="/shop" className="link-line hover:text-ink">Shop</Link>
              <span>/</span>
              <span className="text-ink">{product.category}</span>
            </nav>
          </Reveal>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="space-y-3 lg:col-span-7">
              <Reveal immediate delay={0.45} className="frame group relative aspect-square">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.img
                    key={currentImage}
                    src={responsiveUrl(images[currentImage].url, "medium")}
                    alt={images[currentImage].alt}
                    initial={{ clipPath: "inset(0% 0% 0% 100%)" }}
                    animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                    exit={{ zIndex: 0 }}
                    style={{ zIndex: 1 }}
                    transition={{ duration: 0.8, ease: EASE_CLIP }}
                    className="absolute inset-0 h-full w-full object-cover"
                    onError={(e) => { e.currentTarget.src = "/placeholder.svg"; }}
                  />
                </AnimatePresence>
                {images.length > 1 && (
                  <div className="absolute bottom-0 right-0 z-10 flex">
                    <button
                      type="button"
                      aria-label="Previous image"
                      onClick={() => setCurrentImage((p) => (p === 0 ? images.length - 1 : p - 1))}
                      className="flex h-12 w-12 items-center justify-center bg-bone text-ink transition-colors hover:bg-ink hover:text-bone"
                    >
                      <HugeiconsIcon icon={ArrowLeft01Icon} size={18} />
                    </button>
                    <button
                      type="button"
                      aria-label="Next image"
                      onClick={() => setCurrentImage((p) => (p === images.length - 1 ? 0 : p + 1))}
                      className="flex h-12 w-12 items-center justify-center bg-bone text-ink transition-colors hover:bg-ink hover:text-bone"
                    >
                      <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
                    </button>
                  </div>
                )}
              </Reveal>

              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Show image ${i + 1}`}
                      onClick={() => setCurrentImage(i)}
                      className={`h-20 w-20 flex-shrink-0 overflow-hidden border transition-opacity ${
                        i === currentImage ? "border-ink" : "border-transparent opacity-50 hover:opacity-100"
                      }`}
                    >
                      <img src={responsiveUrl(img.url, "thumb")} alt="" className="h-full w-full object-cover" onError={(e) => { e.currentTarget.src = "/placeholder.svg"; }} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Reveal immediate delay={0.6} className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <h1 className="title text-[clamp(2.25rem,4vw,3.75rem)]">{product.name}</h1>
                <p className="mt-4 font-mono text-2xl tabular-nums">{naira(product.price)}</p>

                <div className="mt-6">
                  <StockDisplay qty={product.stockQuantity} />
                </div>

                <p className="mt-8 border-t border-ink/15 pt-8 text-[15px] leading-relaxed text-ink/70">
                  {product.description}
                </p>

                <div className="mt-10 flex flex-col gap-3">
                  <Btn variant="ink" onClick={handleAddToCart} disabled={!inStock} className="w-full justify-between">
                    {inStock ? "Add to cart" : "Sold out"}
                  </Btn>
                  <Btn href={`https://wa.me/2348134460609?text=${waMessage}`} variant="outline-dark" className="w-full justify-between">
                    Buy on WhatsApp
                  </Btn>
                </div>

                <div className="eyebrow mt-8 flex flex-wrap items-center gap-6 text-ink/55">
                  <button
                    type="button"
                    onClick={() => toggleFavorite(product._id)}
                    aria-pressed={isFavorite(product._id)}
                    className="flex items-center gap-2 hover:text-ink"
                  >
                    <HugeiconsIcon
                      icon={FavouriteIcon}
                      size={14}
                      className={isFavorite(product._id) ? "text-red-500 [&>path]:fill-red-500" : ""}
                    />
                    {isFavorite(product._id) ? "Saved" : "Save"}
                  </button>
                  <button type="button" onClick={handleShare} className="flex items-center gap-2 hover:text-ink">
                    <HugeiconsIcon icon={Share01Icon} size={14} />
                    Share
                  </button>
                </div>

                <p className="mt-8 flex items-center gap-3 border-t border-ink/15 pt-6 text-sm text-ink/55">
                  <HugeiconsIcon icon={TruckDeliveryIcon} size={16} />
                  Free delivery within Akure. Contact us for shipping rates.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetail;
