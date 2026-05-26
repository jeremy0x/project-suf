import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {isMobile ? (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 260 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 rounded-t-3xl shadow-2xl flex flex-col max-h-[85vh]"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 shrink-0">
                <div className="flex items-center gap-2">
                  <HugeiconsIcon icon={ShoppingCart02Icon} size={20} className="text-brand-blue" />
                  <h2 className="font-heading font-bold text-lg">Cart ({totalItems})</h2>
                </div>
                <button onClick={onClose} aria-label="Close cart" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
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
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="fixed top-4 right-4 bottom-4 z-50 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl flex flex-col w-full max-w-md border border-gray-200 dark:border-gray-800"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 shrink-0">
                <div className="flex items-center gap-2">
                  <HugeiconsIcon icon={ShoppingCart02Icon} size={20} className="text-brand-blue" />
                  <h2 className="font-heading font-bold text-lg">Cart ({totalItems})</h2>
                </div>
                <button onClick={onClose} aria-label="Close cart" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
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
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {items.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <HugeiconsIcon icon={ShoppingCart02Icon} size={48} className="mx-auto mb-4 opacity-30" />
            <p className="font-medium">Your cart is empty</p>
            <p className="text-sm">Add items to get started</p>
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
              <img
                src={responsiveUrl(item.image, "thumb")}
                alt={item.name}
                className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm truncate">{item.name}</h4>
                <p className="text-brand-blue font-bold text-sm mt-1">
                  {"\u20A6"}{item.price.toLocaleString()}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    aria-label={`Decrease quantity of ${item.name}`}
                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors"
                  >
                    <HugeiconsIcon icon={MinusSignIcon} size={14} />
                  </button>
                  <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    aria-label={`Increase quantity of ${item.name}`}
                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors"
                  >
                    <HugeiconsIcon icon={PlusSignIcon} size={14} />
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.name} from cart`}
                    className="p-1 ml-auto hover:bg-red-50 dark:hover:bg-red-950 text-red-400 rounded-md transition-colors"
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
        <div className="border-t border-gray-200 dark:border-gray-800 p-4 space-y-3 shrink-0">
          <div className="flex justify-between text-lg font-bold font-heading">
            <span>Total</span>
            <span className="text-brand-blue">{"\u20A6"}{totalPrice.toLocaleString()}</span>
          </div>
          <a
            href={`https://wa.me/2348134460609?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-full font-medium text-sm hover:bg-green-600 transition-colors"
          >
            Order via WhatsApp
          </a>
        </div>
      )}
    </>
  );
}
