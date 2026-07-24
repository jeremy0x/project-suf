import { v } from "convex/values";
import { mutation, query, action } from "./_generated/server";
import { api } from "./_generated/api";
import type { Doc } from "./_generated/dataModel";

// Queries

export const listPlans = query({
  args: {},
  handler: async (ctx) => {
    const plans = await ctx.db.query("pricingPlans").collect();
    return plans.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
  },
});

export const listCategories = query({
  args: {},
  handler: async (ctx) => {
    const categories = await ctx.db.query("pricingCategories").collect();
    return categories.sort((a, b) => a.order - b.order);
  },
});

export const getConfig = query({
  args: { key: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const key = args.key ?? "registration";
    const config = await ctx.db
      .query("pricingConfig")
      .withIndex("by_key", (q) => q.eq("key", key))
      .first();
    return config;
  },
});

// Plan Mutations

export const createPlan = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const createdAt = Date.now();
    let sortOrder = args.sortOrder;
    if (sortOrder === undefined) {
      const existing = await ctx.db.query("pricingPlans").collect();
      sortOrder = existing.length + 1;
    }
    return await ctx.db.insert("pricingPlans", {
      ...args,
      sortOrder,
      createdAt,
    });
  },
});

export const updatePlan = mutation({
  args: {
    id: v.id("pricingPlans"),
    name: v.optional(v.string()),
    price: v.optional(v.string()),
    category: v.optional(v.string()),
    savings: v.optional(v.string()),
    tagline: v.optional(v.string()),
    trainerAddOn: v.optional(v.string()),
    recommended: v.optional(v.boolean()),
    popular: v.optional(v.boolean()),
    featured: v.optional(v.boolean()),
    description: v.optional(v.string()),
    features: v.optional(v.array(v.string())),
    sortOrder: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    await ctx.db.patch(id, fields);
  },
});

export const removePlan = mutation({
  args: { id: v.id("pricingPlans") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// Config Mutations

export const updateConfig = mutation({
  args: {
    key: v.optional(v.string()),
    title: v.string(),
    price: v.string(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    const key = args.key ?? "registration";
    const existing = await ctx.db
      .query("pricingConfig")
      .withIndex("by_key", (q) => q.eq("key", key))
      .first();

    const updatedAt = Date.now();
    if (existing) {
      await ctx.db.patch(existing._id, {
        title: args.title,
        price: args.price,
        description: args.description,
        updatedAt,
      });
      return existing._id;
    } else {
      return await ctx.db.insert("pricingConfig", {
        key,
        title: args.title,
        price: args.price,
        description: args.description,
        updatedAt,
      });
    }
  },
});

// Category Mutations & Actions

export const createCategory = mutation({
  args: {
    name: v.string(),
    label: v.string(),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("pricingCategories", args);
  },
});

export const updateCategory = mutation({
  args: {
    id: v.id("pricingCategories"),
    name: v.optional(v.string()),
    label: v.optional(v.string()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    await ctx.db.patch(id, fields);
  },
});

export const removeCategory = mutation({
  args: { id: v.id("pricingCategories") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const renameCategoryAndSync = action({
  args: {
    id: v.id("pricingCategories"),
    name: v.string(),
    label: v.string(),
    oldName: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.runMutation(api.pricing.updateCategory, {
      id: args.id,
      name: args.name,
      label: args.label,
    });
    const plans = (await ctx.runQuery(api.pricing.listPlans)) as Doc<"pricingPlans">[];
    for (const plan of plans) {
      if (plan.category === args.oldName) {
        await ctx.runMutation(api.pricing.updatePlan, {
          id: plan._id,
          category: args.name,
        });
      }
    }
  },
});
