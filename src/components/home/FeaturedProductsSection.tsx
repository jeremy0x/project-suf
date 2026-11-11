import React from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ProductCard, ProductCardSkeleton } from "@/components/shop/ProductCard";
import { Reveal } from "../motion";
import { SectionHeader } from "../site/SectionHeader";
import { Arrow, Btn } from "../site/Btn";

const FeaturedProductsSection = () => {
  const productsRaw = useQuery(api.products.list, { featured: true });
  const isLoading = productsRaw === undefined;
  const products = (productsRaw || []).slice(0, 8);
  const [carouselApi, setCarouselApi] = React.useState<CarouselApi>();
  const [state, setState] = React.useState({ prev: false, next: false });

  React.useEffect(() => {
    if (!carouselApi) return;
    const update = () =>
      setState({ prev: carouselApi.canScrollPrev(), next: carouselApi.canScrollNext() });
    update();
    carouselApi.on("select", update);
    carouselApi.on("reInit", update);
    return () => {
      carouselApi.off("select", update);
      carouselApi.off("reInit", update);
    };
  }, [carouselApi]);

  if (!isLoading && products.length === 0) return null;

  const navBtn =
    "flex h-12 w-12 items-center justify-center border border-ink/20 transition-colors duration-500 hover:bg-ink hover:text-bone disabled:pointer-events-none disabled:opacity-30";

  return (
    <section className="section overflow-hidden bg-background text-ink">
      <div className="shell">
        <SectionHeader
          index="05"
          label="The shop"
          title={["Popular products"]}
          description="Gym wear, gloves and accessories available at the gym. Add to your cart here, or order directly on WhatsApp."
          aside={
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous products"
                className={navBtn}
                disabled={!state.prev}
                onClick={() => carouselApi?.scrollPrev()}
              >
                <Arrow className="rotate-180" />
              </button>
              <button
                type="button"
                aria-label="Next products"
                className={navBtn}
                disabled={!state.next}
                onClick={() => carouselApi?.scrollNext()}
              >
                <Arrow />
              </button>
              <Btn to="/shop" variant="outline-dark" className="ml-2">
                Shop all
              </Btn>
            </div>
          }
        />

        <Reveal className="mt-16 md:mt-24">
          <Carousel setApi={setCarouselApi} opts={{ align: "start", loop: false }}>
            <CarouselContent className="-ml-6">
              {isLoading
                ? [...Array(4)].map((_, i) => (
                    <CarouselItem key={i} className="basis-[80%] pl-6 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                      <ProductCardSkeleton />
                    </CarouselItem>
                  ))
                : products.map((p) => (
                    <CarouselItem key={p._id} className="basis-[80%] pl-6 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                      <ProductCard {...p} description={undefined} />
                    </CarouselItem>
                  ))}
            </CarouselContent>
          </Carousel>
        </Reveal>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
