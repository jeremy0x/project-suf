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
});
