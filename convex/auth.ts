import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

function randomToken(): string {
  const buf = new Uint8Array(32);
  crypto.getRandomValues(buf);
  return Array.from(buf, (b) => b.toString(16).padStart(2, "0")).join("");
}

export const login = mutation({
  args: { password: v.string() },
  handler: async (ctx, args) => {
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) throw new Error("ADMIN_PASSWORD not configured on server");
    if (args.password !== adminPassword) throw new Error("Invalid password");

    const token = randomToken();
    const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
    await ctx.db.insert("sessions", { token, expiresAt });
    return { token, expiresAt };
  },
});

export const verify = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .first();
    if (!session) return false;
    if (Date.now() > session.expiresAt) {
      return false;
    }
    return true;
  },
});

export const logout = mutation({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .first();
    if (session) {
      await ctx.db.delete(session._id);
    }
  },
});
