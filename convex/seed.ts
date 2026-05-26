import { mutation } from "./_generated/server";

const MOCK_PRODUCTS = [
  {
    name: "Premium Fitness Tank Top",
    description: "Breathable, moisture-wicking fabric designed for intense workouts. Features a relaxed fit with reinforced stitching for durability. Perfect for both gym sessions and casual wear.",
    price: 8500,
    category: "apparel",
    stockQuantity: 50,
    featured: true,
    imageSeed: "tank-top",
  },
  {
    name: "Performance Compression Shorts",
    description: "High-performance compression shorts with 4-way stretch technology. Supports muscle recovery during and after workouts. Flat-lock seams prevent chafing.",
    price: 12000,
    category: "apparel",
    stockQuantity: 35,
    featured: true,
    imageSeed: "shorts",
  },
  {
    name: "Whey Isolate Protein 2kg",
    description: "Premium whey protein isolate with 25g of protein per serving. Zero added sugar, low fat, and fast-absorbing for optimal muscle recovery. Available in vanilla and chocolate.",
    price: 35000,
    category: "supplements",
    stockQuantity: 3,
    featured: true,
    imageSeed: "protein",
  },
  {
    name: "Pre-Workout Extreme 300g",
    description: "Explosive pre-workout formula with beta-alanine, caffeine, and citrulline malate. Delivers intense energy, focus, and pumps for your most demanding sessions.",
    price: 22000,
    category: "supplements",
    stockQuantity: 0,
    featured: false,
    imageSeed: "preworkout",
  },
  {
    name: "Lifting Straps (Pair)",
    description: "Heavy-duty cotton lifting straps for secure grip during deadlifts, rows, and pull-ups. Reinforced stitching ensures longevity under heavy loads.",
    price: 4500,
    category: "gear",
    stockQuantity: 12,
    featured: false,
    imageSeed: "straps",
  },
  {
    name: "Weight Lifting Belt",
    description: "Premium leather lifting belt with double-prong buckle. Provides core stability and back support for heavy compound lifts. 10cm width for optimal support.",
    price: 18000,
    category: "gear",
    stockQuantity: 2,
    featured: true,
    imageSeed: "belt",
  },
  {
    name: "Gym Gloves with Wrist Support",
    description: "Breathable mesh gym gloves with integrated wrist wraps. Silicone padded palm protects against calluses. Adjustable wrist support for pressing movements.",
    price: 6500,
    category: "gear",
    stockQuantity: 20,
    featured: false,
    imageSeed: "gloves",
  },
  {
    name: "Insulated Shaker Bottle 700ml",
    description: "Double-wall insulated shaker bottle keeps drinks cold for hours. Leak-proof design with mixing grid for clump-free shakes. BPA-free and dishwasher safe.",
    price: 5500,
    category: "accessories",
    stockQuantity: 45,
    featured: false,
    imageSeed: "shaker",
  },
  {
    name: "Premium Gym Towel",
    description: "Microfiber gym towel with quick-dry technology. Compact and lightweight — folds neatly into any gym bag. Antimicrobial treatment prevents odors.",
    price: 3500,
    category: "accessories",
    stockQuantity: 100,
    featured: false,
    imageSeed: "towel",
  },
  {
    name: "Resistance Bands Set (5 Levels)",
    description: "Set of 5 resistance bands ranging from light to extra-heavy. Made from natural latex with reinforced edges. Perfect for warm-ups, rehab, and home workouts.",
    price: 9500,
    category: "gear",
    stockQuantity: 1,
    featured: true,
    imageSeed: "bands",
  },
];

const GALLERY_CATEGORIES: { section: string; name: string; label: string; order: number }[] = [
  { section: "gallery", name: "facilities", label: "Facilities", order: 1 },
  { section: "gallery", name: "workout", label: "Workout", order: 2 },
  { section: "gallery", name: "community", label: "Community", order: 3 },
  { section: "gallery", name: "transformation", label: "Transformation", order: 4 },
  { section: "gallery", name: "accessories", label: "Accessories", order: 5 },
];

const PRODUCT_CATEGORIES: { name: string; label: string; order: number }[] = [
  { name: "general", label: "General", order: 0 },
  { name: "supplements", label: "Supplements", order: 1 },
  { name: "apparel", label: "Apparel", order: 2 },
  { name: "equipment", label: "Equipment", order: 3 },
];

export const run = mutation({
  handler: async (ctx) => {
    const existing = await ctx.db.query("products").collect();
    if (existing.length === 0) {
      for (const product of MOCK_PRODUCTS) {
        const { imageSeed, ...data } = product;
        await ctx.db.insert("products", {
          ...data,
          images: [
            { url: `https://picsum.photos/seed/${imageSeed}/600/600`, alt: product.name, order: 0 },
            { url: `https://picsum.photos/seed/${imageSeed}-2/600/600`, alt: `${product.name} (alternate view)`, order: 1 },
          ],
          createdAt: Date.now(),
        });
      }
    }

    const categories = await ctx.db.query("imageCategories").collect();
    if (categories.length === 0) {
      for (const cat of GALLERY_CATEGORIES) {
        await ctx.db.insert("imageCategories", cat);
      }
    }

    const productCats = await ctx.db.query("productCategories").collect();
    if (productCats.length === 0) {
      for (const cat of PRODUCT_CATEGORIES) {
        await ctx.db.insert("productCategories", cat);
      }
    }

    return { skipped: false, message: "Seed complete" };
  },
});
