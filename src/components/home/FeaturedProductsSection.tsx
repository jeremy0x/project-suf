import { Link } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { HugeiconsIcon } from "@hugeicons/react";
import { ShoppingCartCheckIn02Icon } from "@hugeicons/core-free-icons";
import { useCart } from "@/context/CartContext";
import { useAnimation } from "../../context/AnimationContext";
import { motion } from "framer-motion";
import { gooeyToast } from "goey-toast";
import { responsiveUrl } from "@/lib/images";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

import { ProductCardSkeleton } from "@/components/shop/ProductCard";

const FeaturedProductsSection = () => {
  const { reduceMotion } = useAnimation();
  const productsRaw = useQuery(api.products.list, { featured: true });
  const products = productsRaw || [];
  const isLoading = productsRaw === undefined;
  const { addItem } = useCart();
  const [carouselApi, setCarouselApi] = React.useState<CarouselApi>();
  const [canScroll, setCanScroll] = React.useState(false);

  React.useEffect(() => {
    if (!carouselApi) return;
    setCanScroll(carouselApi.scrollSnapList().length > 1);
    carouselApi.on("reInit", () => {
      setCanScroll(carouselApi.scrollSnapList().length > 1);
    });
  }, [carouselApi]);

  if (!isLoading && products.length === 0) return null;

  const displayProducts = products.slice(0, 8);

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="sm:container mx-auto px-4">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full"
        >
          <div className="relative flex flex-col items-center justify-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: reduceMotion ? 0 : 0.3 }}
              className="text-center max-w-2xl mx-auto"
            >
              <h2 className="section-title mb-2 text-center">
                Popular <span className="text-brand-blue">Products</span>
              </h2>
              <p className="text-sm text-muted-foreground text-center">
                Gear up with our most popular fitness essentials
              </p>
            </motion.div>

            {canScroll && (
              <div className="hidden md:flex gap-2 absolute right-0 bottom-0 z-10">
                <CarouselPrevious className="static translate-y-0 h-10 w-10 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-foreground hover:bg-gray-100 dark:hover:bg-gray-800" />
                <CarouselNext className="static translate-y-0 h-10 w-10 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-foreground hover:bg-gray-100 dark:hover:bg-gray-800" />
              </div>
            )}
          </div>

          <CarouselContent className="-ml-6">
            {isLoading ? (
              [...Array(4)].map((_, i) => (
                <CarouselItem
                  key={`skeleton-${i}`}
                  className="pl-6 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <ProductCardSkeleton />
                </CarouselItem>
              ))
            ) : (
              displayProducts.map((product, i) => {
                const img = product.images?.[0]?.url || "";
                return (
                  <CarouselItem
                    key={product._id}
                    className="pl-6 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.3,
                        delay: i * 0.05,
                      }}
                      className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
                    >
                      <Link
                        to={`/shop/${product._id.slice(-8)}`}
                        className="block aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0"
                      >
                        <img
                          src={responsiveUrl(img, "medium")}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                          onError={(e) => { e.currentTarget.src = "/placeholder.svg"; }}
                        />
                      </Link>
                      <div className="p-4 flex flex-col flex-1">
                        <Link to={`/shop/${product._id.slice(-8)}`}>
                          <h3 className="font-heading font-bold group-hover:text-brand-blue transition-colors line-clamp-1">
                            {product.name}
                          </h3>
                        </Link>
                        <p className="text-xl font-bold font-heading text-brand-blue mt-2 mb-3">
                          {"\u20A6"}
                          {product.price.toLocaleString()}
                        </p>
                        <button
                          onClick={() => {
                            addItem({
                              id: product._id,
                              name: product.name,
                              price: product.price,
                              image: img,
                              quantity: 1,
                            });
                            gooeyToast.success("Added to cart", {
                              description: product.name,
                            });
                          }}
                          className="mt-auto flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-brand-dark dark:bg-white text-white dark:text-brand-dark rounded-full font-medium text-sm hover:opacity-90 transition-opacity"
                        >
                          <HugeiconsIcon
                            icon={ShoppingCartCheckIn02Icon}
                            size={16}
                          />
                          Add to Cart
                        </button>
                      </div>
                    </motion.div>
                  </CarouselItem>
                );
              })
            )}
          </CarouselContent>
          {canScroll && (
            <div className="flex md:hidden justify-center gap-2 mt-8">
              <CarouselPrevious className="static translate-y-0 h-10 w-10 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-foreground hover:bg-gray-100 dark:hover:bg-gray-800" />
              <CarouselNext className="static translate-y-0 h-10 w-10 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-foreground hover:bg-gray-100 dark:hover:bg-gray-800" />
            </div>
          )}
        </Carousel>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue text-white rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            View All Products
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
