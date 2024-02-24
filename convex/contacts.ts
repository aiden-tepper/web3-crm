import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getContacts = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("contacts").collect();
  },
});

export const updateContact = mutation({
  args: {
    id: v.id("contacts"),
    updates: v.object({
      name: v.string(),
      email: v.string(),
      phone: v.string(),
      position: v.string(),
      company: v.string(),
      location: v.string(),
      description: v.string(),
      team: v.string(),
      status: v.string(),
      avatar: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    const { id, updates } = args;
    await ctx.db.replace(id, updates);
    return await ctx.db.get(id);
  },
});

export const createContact = mutation({
  args: {
    contact: v.object({
      name: v.string(),
      email: v.string(),
      phone: v.string(),
      position: v.string(),
      company: v.string(),
      location: v.string(),
      description: v.string(),
      team: v.string(),
      status: v.string(),
      avatar: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("contacts", args.contact);
    return id;
  },
});

export const deleteContact = mutation({
  args: {
    id: v.id("contacts"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return true;
  },
});
