import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import { useScrollLock } from "@/hooks/useScrollLock";

const MOBILE_QUERY = "(max-width: 1023px)";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { responsiveUrl } from "@/lib/images";
import {
  Cancel01Icon,
  MinusSignIcon,
  PlusSignIcon,
  ShoppingCart02Icon,
  Delete02Icon,
} from "@hugeicons/core-free-icons";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, totalItems, totalPrice } = useCart();
  // Read the breakpoint on the first render so the drawer never mounts as one
  // panel and swaps to the other.
  const [isMobile, setIsMobile] = useState(() => window.matchMedia(MOBILE_QUERY).matches);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useScrollLock(open);

  const waMessage = encodeURIComponent(
    `Hi, I'm interested in the following items:\n\n${items
      .map((i) => `- ${i.name} (\u20A6${i.price.toLocaleString()}) x${i.quantity}`)
      .join("\n")}\n\nTotal: \u20A6${totalPrice.toLocaleString()}`
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-ink/60 z-50"
            onClick={onClose}
          />

          {isMobile ? (
            <motion.div
              key="cart-sheet"
              initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
              exit={{ clipPath: "inset(100% 0% 0% 0%)" }}
              transition={{ duration: 0.7, ease: [0.77, 0, 0.175, 1] }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-bone text-ink flex flex-col max-h-[85vh]"
            >
              <div className="flex items-center justify-between p-4 border-b border-ink/15 shrink-0">
                <div className="flex items-center gap-2">
                  <h2 className="eyebrow">Cart ({totalItems})</h2>
                </div>
                <button onClick={onClose} aria-label="Close cart" className="p-2 hover:bg-ink hover:text-bone transition-colors">
                  <HugeiconsIcon icon={Cancel01Icon} size={20} />
                </button>
              </div>
              <CartContent
                items={items}
                totalItems={totalItems}
                totalPrice={totalPrice}
                waMessage={waMessage}
                removeItem={removeItem}
                updateQuantity={updateQuantity}
              />
            </motion.div>
          ) : (
            <motion.div
              key="cart-panel"
              initial={{ clipPath: "inset(0% 0% 0% 100%)" }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
              exit={{ clipPath: "inset(0% 0% 0% 100%)" }}
              transition={{ duration: 0.7, ease: [0.77, 0, 0.175, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 bg-bone text-ink flex flex-col w-full max-w-md"
            >
              <div className="flex items-center justify-between p-4 border-b border-ink/15 shrink-0">
                <div className="flex items-center gap-2">
                  <h2 className="eyebrow">Cart ({totalItems})</h2>
                </div>
                <button onClick={onClose} aria-label="Close cart" className="p-2 hover:bg-ink hover:text-bone transition-colors">
                  <HugeiconsIcon icon={Cancel01Icon} size={20} />
                </button>
              </div>
              <CartContent
                items={items}
                totalItems={totalItems}
                totalPrice={totalPrice}
                waMessage={waMessage}
                removeItem={removeItem}
                updateQuantity={updateQuantity}
              />
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}

function CartContent({
  items,
  totalItems,
  totalPrice,
  waMessage,
  removeItem,
  updateQuantity,
}: {
  items: { id: string; name: string; price: number; image: string; quantity: number }[];
  totalItems: number;
  totalPrice: number;
  waMessage: string;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
}) {
  return (
    <>
      <div className="flex-1 overflow-y-auto p-4 ">
        {items.length === 0 ? (
          <div className="text-center py-16 text-ink/40">
            <HugeiconsIcon icon={ShoppingCart02Icon} size={48} className="mx-auto mb-4 opacity-30" />
            <p className="font-medium">Your cart is empty</p>
            <p className="text-sm">Add items to get started</p>
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex gap-4 py-4 border-b border-ink/10">
              <img
                src={responsiveUrl(item.image, "thumb")}
                alt={item.name}
                className="w-20 h-24 object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm truncate">{item.name}</h4>
                <p className="font-mono text-sm mt-1 tabular-nums">
                  {"\u20A6"}{item.price.toLocaleString()}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    aria-label={`Decrease quantity of ${item.name}`}
                    className="p-1 border border-ink/15 hover:bg-ink hover:text-bone transition-colors"
                  >
                    <HugeiconsIcon icon={MinusSignIcon} size={14} />
                  </button>
                  <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    aria-label={`Increase quantity of ${item.name}`}
                    className="p-1 border border-ink/15 hover:bg-ink hover:text-bone transition-colors"
                  >
                    <HugeiconsIcon icon={PlusSignIcon} size={14} />
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.name} from cart`}
                    className="p-1 ml-auto text-ink/50 hover:text-red-600 transition-colors"
                  >
                    <HugeiconsIcon icon={Delete02Icon} size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {items.length > 0 && (
        <div className="border-t border-ink/15 p-4 space-y-3 shrink-0">
          <div className="flex justify-between items-baseline">
            <span className="eyebrow text-ink/60">Total</span>
            <span className="title text-3xl tabular-nums">{"\u20A6"}{totalPrice.toLocaleString()}</span>
          </div>
          <a
            href={`https://wa.me/2348134460609?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ink w-full"
          >
            Order via WhatsApp
          </a>
        </div>
      )}
    </>
  );
}
