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

const PRICING_CATEGORIES = [
  { name: "basic", label: "Basic Memberships", order: 1 },
  { name: "personal", label: "Personal Training", order: 2 },
  { name: "special", label: "Special Packages", order: 3 },
  { name: "inHome", label: "In Home Training", order: 4 },
  { name: "online", label: "Online Training", order: 5 },
  { name: "other", label: "Other Services", order: 6 },
];

const INITIAL_PRICING_PLANS = [
  // Basic
  { name: "Gym Session (Monthly) Once Daily", price: "₦12,000", category: "basic", featured: true, description: "Perfect for beginners", features: ["Once daily gym session", "Access to all equipment", "Locker room access", "Fitness assessment"], sortOrder: 1 },
  { name: "Plus Membership (Monthly)", price: "₦40,000", category: "basic", popular: true, featured: true, description: "Our most popular choice", features: ["Twice daily gym sessions", "Access to all equipment", "Access to all group classes", "Locker room access", "Fitness assessment", "Basic nutritional guidance"], sortOrder: 2 },
  { name: "Premium Membership (Monthly)", price: "₦55,000", category: "basic", featured: true, description: "Recommended for beginners", features: ["Once daily gym session", "Personal trainer guidance", "Customized workout plan", "Access to all equipment", "Locker room access", "Detailed fitness assessment"], sortOrder: 3 },
  { name: "Gym Session (Monthly) Twice Daily", price: "₦17,000", category: "basic", sortOrder: 4 },
  { name: "Gym Session (Per Session)", price: "₦1,500", category: "basic", sortOrder: 5 },
  { name: "Gym Session (Weekly)", price: "₦5,000", category: "basic", sortOrder: 6 },
  { name: "Gym Session (Bi-weekly)", price: "₦7,500", category: "basic", sortOrder: 7 },
  { name: "2 Months Gym Session", price: "₦23,000", category: "basic", savings: "saves ₦1,000", sortOrder: 8 },
  { name: "3 Months Gym Session", price: "₦33,000", category: "basic", savings: "saves ₦3,000", sortOrder: 9 },
  { name: "6 Months Gym Session", price: "₦66,000", category: "basic", savings: "saves ₦6,000", sortOrder: 10 },
  { name: "Boxing Class (Twice Weekly) / Month", price: "₦14,000", category: "basic", sortOrder: 11 },
  { name: "Boxing Session with Trainer (Daily)", price: "₦5,000", category: "basic", sortOrder: 12 },
  { name: "Boxing Session without Trainer (Daily)", price: "₦3,000", category: "basic", sortOrder: 13 },

  // Personal
  { name: "Gym Session (Monthly) Once Daily", price: "₦22,000", category: "personal", recommended: true, sortOrder: 14 },
  { name: "Gym Session (Monthly) Twice Daily", price: "₦25,000", category: "personal", sortOrder: 15 },

  // Special
  { name: "Couples Plan / Monthly", price: "₦22,000", category: "special", savings: "saves ₦2,000", tagline: "Shared Access for Two", trainerAddOn: "Add a Couples Personal Trainer for ₦12,000/month", sortOrder: 16 },
  { name: "3 Days Weekly for a Month", price: "₦10,000", category: "special", tagline: "Most Popular for Consistency", trainerAddOn: "Add a Dedicated Personal Trainer for ₦8,000/month", sortOrder: 17 },
  { name: "2 Days Weekly for a Month", price: "₦8,000", category: "special", tagline: "Perfect for Busy Schedules", trainerAddOn: "Add a Dedicated Personal Trainer for ₦6,000/month", sortOrder: 18 },
  { name: "Weekends Only (Saturdays) / Monthly", price: "₦5,000", category: "special", tagline: "4 Sessions/Month • Saturdays Only", trainerAddOn: "Add a Dedicated Personal Trainer for ₦4,000/month", sortOrder: 19 },

  // In Home
  { name: "3 Sessions Weekly for a Month", price: "₦60,000", category: "inHome", sortOrder: 20 },
  { name: "2 Sessions Weekly for a Month", price: "₦40,000", category: "inHome", sortOrder: 21 },
  { name: "1 Session Weekly for a Month", price: "₦20,000", category: "inHome", sortOrder: 22 },

  // Online
  { name: "4 Sessions Weekly for a Month", price: "₦40,000", category: "online", sortOrder: 23 },
  { name: "3 Sessions Weekly for a Month", price: "₦30,000", category: "online", sortOrder: 24 },
  { name: "2 Sessions Weekly for a Month", price: "₦20,000", category: "online", sortOrder: 25 },

  // Other
  { name: "Customized Diet Plan", price: "₦7,000", category: "other", sortOrder: 26 },
  { name: "Diet Training (Monthly)", price: "₦15,000", category: "other", sortOrder: 27 },
  { name: "Custom Workout Plan", price: "₦25,000", category: "other", sortOrder: 28 },
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

    const pricingCats = await ctx.db.query("pricingCategories").collect();
    if (pricingCats.length === 0) {
      for (const cat of PRICING_CATEGORIES) {
        await ctx.db.insert("pricingCategories", cat);
      }
    }

    const pricingConfig = await ctx.db.query("pricingConfig").collect();
    if (pricingConfig.length === 0) {
      await ctx.db.insert("pricingConfig", {
        key: "registration",
        title: "Gym Registration",
        price: "₦2,500",
        description: "One-time registration fee for all new members. Includes initial fitness assessment and personalized orientation.",
        updatedAt: Date.now(),
      });
    }

    const pricingPlans = await ctx.db.query("pricingPlans").collect();
    if (pricingPlans.length === 0) {
      for (const plan of INITIAL_PRICING_PLANS) {
        await ctx.db.insert("pricingPlans", {
          ...plan,
          createdAt: Date.now(),
        });
      }
    }

    return { skipped: false, message: "Seed complete" };
  },
});
