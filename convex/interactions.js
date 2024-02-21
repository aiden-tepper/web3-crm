import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getInteractions = query({
  args: {
    contactId: v.id("contacts"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("interactions")
      .filter((q) => q.eq(q.field("contactId"), args.contactId))
      .order("desc")
      .collect();
  },
});

export const updateInteraction = mutation({
  args: {
    id: v.id("interactions"),
    updates: v.object({
      contactId: v.id("contacts"),
      datetime: v.string(),
      type: v.string(),
      notes: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    const { id, updates } = args;
    await ctx.db.replace(id, updates);
    return await ctx.db.get(id);
  },
});

export const createInteraction = mutation({
  args: {
    interaction: v.object({
      contactId: v.id("contacts"),
      datetime: v.string(),
      type: v.string(),
      notes: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("interactions", args.interaction);
    return id;
  },
});

export const deleteInteraction = mutation({
  args: {
    id: v.id("interactions"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return true;
  },
});
