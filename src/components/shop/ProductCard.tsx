import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import { gooeyToast } from "goey-toast";
import { HugeiconsIcon } from "@hugeicons/react";
import { FavouriteIcon } from "@hugeicons/core-free-icons";
import { responsiveUrl } from "@/lib/images";
import { Roll } from "@/components/site/Btn";
import { cn } from "@/lib/utils";
import { naira } from "@/lib/format";

interface ProductCardProps {
  _id: string;
  name: string;
  price: number;
  description?: string;
  images: { url: string; alt: string; order: number }[];
  stockQuantity?: number;
}

function stockLabel(qty: number | undefined) {
  if (qty === undefined) return null;
  if (qty === 0) return "Sold out";
  if (qty <= 3) return `Only ${qty} left`;
  if (qty <= 10) return "Low stock";
  return null;
}


export function ProductCard({ _id, name, price, description, images, stockQuantity }: ProductCardProps) {
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const image = images?.[0]?.url || "";
  const linkTo = `/shop/${_id.slice(-8)}`;
  const inStock = stockQuantity === undefined || stockQuantity > 0;
  const stock = stockLabel(stockQuantity);
  const fav = isFavorite(_id);

  const handleAddToCart = () => {
    addItem({ id: _id, name, price, image, quantity: 1 });
    gooeyToast.success("Added to cart", { description: name });
  };

  return (
    <article className="group flex h-full flex-col">
      <div className="frame relative aspect-[4/5]">
        <Link to={linkTo} aria-label={name} className="block h-full w-full">
          <img
            src={responsiveUrl(image, "medium")}
            alt={name}
            loading="lazy"
            className={cn("h-full w-full object-cover", !inStock && "opacity-40 grayscale")}
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg";
            }}
          />
        </Link>

        {stock && (
          <span className="eyebrow absolute left-3 top-3 bg-bone px-2 py-1 text-ink">{stock}</span>
        )}

        <button
          type="button"
          onClick={() => toggleFavorite(_id)}
          aria-label={fav ? `Remove ${name} from wishlist` : `Save ${name} to wishlist`}
          aria-pressed={fav}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center bg-bone/90 text-ink transition-colors hover:bg-bone"
        >
          <HugeiconsIcon
            icon={FavouriteIcon}
            size={16}
            className={fav ? "text-red-500 [&>path]:fill-red-500" : ""}
          />
        </button>

        {/* Quick add slides up from the bottom edge of the image on hover */}
        {inStock && (
          <button
            type="button"
            onClick={handleAddToCart}
            className="roll-host eyebrow absolute inset-x-0 bottom-0 flex items-center justify-between bg-ink px-4 py-4 text-bone transition-[clip-path] duration-500 ease-in-out-quart [clip-path:inset(0_0_0_0)] lg:[clip-path:inset(100%_0_0_0)] lg:group-hover:[clip-path:inset(0_0_0_0)] lg:focus-visible:[clip-path:inset(0_0_0_0)]"
          >
            <Roll>Add to cart</Roll>
            <span>+</span>
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col pt-4">
        <div className="flex items-start justify-between gap-4">
          <Link to={linkTo} className="link-line text-[15px] font-medium leading-snug">
            {name}
          </Link>
          <span className="shrink-0 font-mono text-sm tabular-nums">{naira(price)}</span>
        </div>
        {description && <p className="mt-2 line-clamp-2 text-sm text-ink/50">{description}</p>}
        <a
          href={`https://wa.me/2348134460609?text=${encodeURIComponent(`Hi, I'm interested in ${name} (${naira(price)}).`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="eyebrow mt-4 self-start text-ink/60 link-line hover:text-ink"
        >
          Buy on WhatsApp ↗
        </a>
      </div>
    </article>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="flex h-full flex-col">
      <div className="shimmer-bg aspect-[4/5] w-full" />
      <div className="flex justify-between gap-4 pt-4">
        <div className="shimmer-bg h-4 w-2/3" />
        <div className="shimmer-bg h-4 w-16" />
      </div>
      <div className="shimmer-bg mt-3 h-3 w-5/6" />
    </div>
  );
}
