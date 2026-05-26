import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const listBySection = query({
  args: {
    section: v.string(),
    category: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const results = await ctx.db
      .query("siteImages")
      .withIndex("by_section", (q) => q.eq("section", args.section))
      .order("asc")
      .collect();
    if (args.category) {
      return results.filter((img) => img.category === args.category);
    }
    return results;
  },
});

export const create = mutation({
  args: {
    section: v.string(),
    category: v.optional(v.string()),
    url: v.string(),
    alt: v.string(),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("siteImages", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("siteImages"),
    url: v.optional(v.string()),
    alt: v.optional(v.string()),
    category: v.optional(v.string()),
    order: v.optional(v.number()),
    section: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    await ctx.db.patch(id, fields);
  },
});

export const remove = mutation({
  args: { id: v.id("siteImages") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const reorderAdjacent = mutation({
  args: {
    id: v.id("siteImages"),
    direction: v.union(v.literal("up"), v.literal("down")),
  },
  handler: async (ctx, args) => {
    const img = await ctx.db.get(args.id);
    if (!img) throw new Error("Image not found");

    const siblings = await ctx.db
      .query("siteImages")
      .withIndex("by_section", (q) => q.eq("section", img.section))
      .order("asc")
      .collect();

    const idx = siblings.findIndex((s) => s._id === args.id);
    const swapIdx = args.direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= siblings.length) return;

    await ctx.db.patch(args.id, { order: siblings[swapIdx].order });
    await ctx.db.patch(siblings[swapIdx]._id, { order: img.order });
  },
});

export const reorder = mutation({
  args: {
    updates: v.array(
      v.object({ id: v.id("siteImages"), order: v.number() })
    ),
  },
  handler: async (ctx, args) => {
    for (const { id, order } of args.updates) {
      await ctx.db.patch(id, { order });
    }
  },
});

export const getTotalCount = query({
  handler: async (ctx) => {
    const images = await ctx.db.query("siteImages").collect();
    return images.length;
  },
});
