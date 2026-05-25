import { v } from "convex/values";
import { mutation, query, action } from "./_generated/server";
import { api } from "./_generated/api";

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("productCategories").order("asc").collect();
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    label: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("productCategories")
      .withIndex("by_name", (q) => q.eq("name", args.name))
      .first();
    if (existing) throw new Error("Category already exists");
    const all = await ctx.db.query("productCategories").collect();
    return await ctx.db.insert("productCategories", {
      name: args.name,
      label: args.label,
      order: all.length,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("productCategories"),
    name: v.optional(v.string()),
    label: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    await ctx.db.patch(id, fields);
  },
});

export const renameAndSync = action({
  args: {
    id: v.id("productCategories"),
    name: v.string(),
    label: v.string(),
    oldName: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.runMutation(api.productCategories.update, {
      id: args.id,
      name: args.name,
      label: args.label,
    });
    const products = await ctx.runQuery(api.products.list, {});
    for (const product of products as any[]) {
      if (product.category === args.oldName) {
        await ctx.runMutation(api.products.update, { id: product._id, category: args.name });
      }
    }
  },
});

export const remove = mutation({
  args: { id: v.id("productCategories") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
