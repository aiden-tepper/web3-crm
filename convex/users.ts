import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getUser = query({
  args: { walletAddress: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("walletAddress"), args.walletAddress))
      .take(1);
  },
});

export const updateUser = mutation({
  args: {
    id: v.id("users"),
    updates: v.object({
      name: v.string(),
      walletAddress: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    const { id, updates } = args;
    await ctx.db.replace(id, updates);
    return await ctx.db.get(id);
  },
});

export const createUser = mutation({
  args: {
    user: v.object({
      name: v.string(),
      walletAddress: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("users", args.user);
    return id;
  },
});

export const deleteUser = mutation({
  args: {
    id: v.id("users"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return true;
  },
});
