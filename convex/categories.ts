import { v } from "convex/values";
import { mutation, query, action } from "./_generated/server";
import { api } from "./_generated/api";
import type { Id } from "./_generated/dataModel";

export const listBySection = query({
  args: { section: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("imageCategories")
      .withIndex("by_section", (q) => q.eq("section", args.section))
      .order("asc")
      .collect();
  },
});

export const create = mutation({
  args: {
    section: v.string(),
    name: v.string(),
    label: v.string(),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("imageCategories", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("imageCategories"),
    name: v.optional(v.string()),
    label: v.optional(v.string()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    await ctx.db.patch(id, fields);
  },
});

export const renameAndSync = action({
  args: {
    id: v.id("imageCategories"),
    name: v.string(),
    label: v.string(),
    oldName: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.runMutation(api.categories.update, {
      id: args.id,
      name: args.name,
      label: args.label,
    });
    const images = await ctx.runQuery(api.siteImages.listBySection, { section: "gallery" }) as { _id: Id<"siteImages">; category?: string }[];
    for (const img of images) {
      if (img.category === args.oldName) {
        await ctx.runMutation(api.siteImages.update, { id: img._id, category: args.name });
      }
    }
  },
});

export const remove = mutation({
  args: { id: v.id("imageCategories") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
