import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("contacts").collect();
  },
});

export const update = mutation({
  args: {
    id: v.id("contacts"),
    updates: v.object({
      firstName: v.string(),
      lastName: v.string(),
      email: v.string(),
      phone: v.string(),
      position: v.string(),
      company: v.string(),
      location: v.string(),
      description: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    const {id, updates} = args;
    await ctx.db.replace(id, updates);
    return await ctx.db.get(id);
  },
});