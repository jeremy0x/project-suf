import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  args: {
    category: v.optional(v.string()),
    featured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    if (args.category) {
      return await ctx.db
        .query("products")
        .withIndex("by_category", (q) => q.eq("category", args.category!))
        .order("desc")
        .collect();
    }
    if (args.featured !== undefined) {
      return await ctx.db
        .query("products")
        .withIndex("by_featured", (q) => q.eq("featured", args.featured!))
        .order("desc")
        .collect();
    }
    return await ctx.db.query("products").order("desc").collect();
  },
});

export const getById = query({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getByShortId = query({
  args: { shortId: v.string() },
  handler: async (ctx, args) => {
    const products = await ctx.db.query("products").collect();
    return products.find((p) => p._id.toString().endsWith(args.shortId)) || null;
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    price: v.number(),
    category: v.string(),
    images: v.array(
      v.object({ url: v.string(), alt: v.string(), order: v.number() })
    ),
    stockQuantity: v.optional(v.number()),
    featured: v.boolean(),
  },
  handler: async (ctx, args) => {
    const all = await ctx.db.query("products").collect();
    return await ctx.db.insert("products", {
      ...args,
      sortOrder: all.length,
      createdAt: Date.now(),
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("products"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    price: v.optional(v.number()),
    category: v.optional(v.string()),
    images: v.optional(
      v.array(
        v.object({ url: v.string(), alt: v.string(), order: v.number() })
      )
    ),
    stockQuantity: v.optional(v.number()),
    featured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    await ctx.db.patch(id, fields);
  },
});

export const remove = mutation({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const reorder = mutation({
  args: {
    ids: v.array(v.id("products")),
  },
  handler: async (ctx, args) => {
    for (let i = 0; i < args.ids.length; i++) {
      await ctx.db.patch(args.ids[i], { sortOrder: i });
    }
  },
});

export const addImage = mutation({
  args: {
    productId: v.id("products"),
    url: v.string(),
    alt: v.string(),
  },
  handler: async (ctx, args) => {
    const product = await ctx.db.get(args.productId);
    if (!product) throw new Error("Product not found");
    const images = [...product.images, { url: args.url, alt: args.alt, order: product.images.length }];
    await ctx.db.patch(args.productId, { images });
  },
});

export const removeImage = mutation({
  args: {
    productId: v.id("products"),
    imageIndex: v.number(),
  },
  handler: async (ctx, args) => {
    const product = await ctx.db.get(args.productId);
    if (!product) throw new Error("Product not found");
    const images = product.images.filter((_, i) => i !== args.imageIndex).map((img, i) => ({ ...img, order: i }));
    await ctx.db.patch(args.productId, { images });
  },
});

export const reorderImages = mutation({
  args: {
    productId: v.id("products"),
    fromIndex: v.number(),
    toIndex: v.number(),
  },
  handler: async (ctx, args) => {
    const product = await ctx.db.get(args.productId);
    if (!product) throw new Error("Product not found");
    const images = [...product.images];
    const [moved] = images.splice(args.fromIndex, 1);
    images.splice(args.toIndex, 0, moved);
    await ctx.db.patch(args.productId, {
      images: images.map((img, i) => ({ ...img, order: i })),
    });
  },
});

export const getCategories = query({
  handler: async (ctx) => {
    const products = await ctx.db.query("products").collect();
    const cats = new Set(products.map((p) => p.category));
    return Array.from(cats).sort();
  },
});
