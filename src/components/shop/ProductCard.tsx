import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import { gooeyToast } from "goey-toast";
import { HugeiconsIcon } from "@hugeicons/react";
import { ShoppingCartCheckIn02Icon, FavouriteIcon } from "@hugeicons/core-free-icons";

interface ProductCardProps {
  _id: string;
  name: string;
  price: number;
  description: string;
  images: { url: string; alt: string; order: number }[];
  stockQuantity?: number;
}

function StockBadge({ qty }: { qty: number | undefined }) {
  if (qty === undefined) return null;
  if (qty === 0)
    return <span className="text-xs font-medium text-red-500 bg-red-50 dark:bg-red-950 px-2 py-1 rounded-full">Out of Stock</span>;
  if (qty <= 3)
    return <span className="text-xs font-medium text-orange-500 bg-orange-50 dark:bg-orange-950 px-2 py-1 rounded-full">Only {qty} left</span>;
  if (qty <= 10)
    return <span className="text-xs font-medium text-yellow-600 bg-yellow-50 dark:bg-yellow-950 px-2 py-1 rounded-full">Low Stock</span>;
  return null;
}

export function ProductCard(props: ProductCardProps) {
  const { _id, name, price, description, images, stockQuantity } = props;
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const image = images?.[0]?.url || "/placeholder.svg";
  const linkTo = `/shop/${_id.slice(-8)}`;
  const inStock = stockQuantity === undefined || stockQuantity > 0;

  const handleAddToCart = () => {
    addItem({ id: _id, name, price, image, quantity: 1 });
    gooeyToast.success("Added to cart", { description: name });
  };

  return (
    <div className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-brand-blue/5 hover:-translate-y-1 flex flex-col h-full relative">
      <button
        onClick={(e) => { e.preventDefault(); toggleFavorite(_id); }}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-sm hover:bg-white dark:hover:bg-black transition-colors"
      >
        <HugeiconsIcon
          icon={FavouriteIcon}
          size={18}
          className={isFavorite(_id) ? "text-red-500 [&>path]:fill-red-500" : "text-gray-400"}
        />
      </button>

      <Link to={linkTo} className="block aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0 relative">
        <img
          src={image}
          alt={name}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${!inStock ? "opacity-50" : ""}`}
          onError={(e) => { e.currentTarget.src = "/placeholder.svg"; }}
        />
        {!inStock && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-red-500/10" />
            <div className="relative w-full h-full">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[150%] h-[2px] bg-red-500 rotate-[-25deg] absolute" />
                <div className="w-[150%] h-[2px] bg-red-500 rotate-[25deg] absolute" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                    Sold Out
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <Link to={linkTo}>
          <h3 className="font-heading font-bold text-lg leading-tight group-hover:text-brand-blue transition-colors">
            {name}
          </h3>
        </Link>

        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mt-2 mb-2">
          {description}
        </p>

        <div className="flex items-center justify-between mb-2">
          <span className="text-xl font-bold font-heading text-brand-blue">
            {"\u20A6"}{price.toLocaleString()}
          </span>
          <StockBadge qty={stockQuantity} />
        </div>

        <div className="flex gap-2 mt-auto">
          <button
            onClick={handleAddToCart}
            disabled={!inStock}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-dark dark:bg-white text-white dark:text-brand-dark rounded-full font-medium text-sm transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <HugeiconsIcon icon={ShoppingCartCheckIn02Icon} size={16} />
            Add to Cart
          </button>
          <a
            href={`https://wa.me/2348134460609?text=${encodeURIComponent(`Hi, I'm interested in ${name} (\u20A6${price.toLocaleString()}).`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-green-500 text-white rounded-full font-medium text-sm transition-all hover:bg-green-600"
          >
            Buy Now
          </a>
        </div>
      </div>
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 flex flex-col h-full">
      <div className="aspect-square shimmer-bg w-full" />
      <div className="p-4 flex flex-col flex-1 space-y-3">
        <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded-md w-3/4 shimmer-bg" />
        <div className="space-y-1.5">
          <div className="h-3.5 bg-gray-200 dark:bg-gray-800 rounded-md w-full shimmer-bg" />
          <div className="h-3.5 bg-gray-200 dark:bg-gray-800 rounded-md w-5/6 shimmer-bg" />
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded-md w-1/3 shimmer-bg" />
        </div>
        <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded-full w-full mt-auto shimmer-bg" />
      </div>
    </div>
  );
}
