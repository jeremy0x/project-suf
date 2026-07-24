import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  products: defineTable({
    name: v.string(),
    description: v.string(),
    price: v.number(),
    category: v.string(),
    images: v.array(
      v.object({ url: v.string(), alt: v.string(), order: v.number() })
    ),
    inStock: v.optional(v.boolean()),
    stockQuantity: v.optional(v.number()),
    featured: v.boolean(),
    sortOrder: v.optional(v.number()),
    createdAt: v.number(),
  })
    .index("by_category", ["category"])
    .index("by_featured", ["featured"])
    .index("by_sortOrder", ["sortOrder"]),

  siteImages: defineTable({
    section: v.string(),
    category: v.optional(v.string()),
    url: v.string(),
    alt: v.string(),
    order: v.number(),
    createdAt: v.number(),
  })
    .index("by_section", ["section"])
    .index("by_section_category", ["section", "category"]),

  imageCategories: defineTable({
    section: v.string(),
    name: v.string(),
    label: v.string(),
    order: v.number(),
  }).index("by_section", ["section"]),

  productCategories: defineTable({
    name: v.string(),
    label: v.string(),
    order: v.number(),
  }).index("by_name", ["name"]),

  sessions: defineTable({
    token: v.string(),
    expiresAt: v.number(),
  }).index("by_token", ["token"]),

  pricingPlans: defineTable({
    name: v.string(),
    price: v.string(),
    category: v.string(),
    savings: v.optional(v.string()),
    tagline: v.optional(v.string()),
    trainerAddOn: v.optional(v.string()),
    recommended: v.optional(v.boolean()),
    popular: v.optional(v.boolean()),
    featured: v.optional(v.boolean()),
    description: v.optional(v.string()),
    features: v.optional(v.array(v.string())),
    sortOrder: v.optional(v.number()),
    createdAt: v.number(),
  })
    .index("by_category", ["category"])
    .index("by_sortOrder", ["sortOrder"])
    .index("by_featured", ["featured"]),

  pricingCategories: defineTable({
    name: v.string(),
    label: v.string(),
    order: v.number(),
  })
    .index("by_name", ["name"])
    .index("by_order", ["order"]),

  pricingConfig: defineTable({
    key: v.string(),
    title: v.string(),
    price: v.string(),
    description: v.string(),
    updatedAt: v.number(),
  }).index("by_key", ["key"]),
});
