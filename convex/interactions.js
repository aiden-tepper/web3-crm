import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// export const getContacts = query({
//   args: {},
//   handler: async (ctx) => {
//     return await ctx.db.query("contacts").collect();
//   },
// });

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

// export const updateContact = mutation({
//   args: {
//     id: v.id("contacts"),
//     updates: v.object({
//       firstName: v.string(),
//       lastName: v.string(),
//       email: v.string(),
//       phone: v.string(),
//       position: v.string(),
//       company: v.string(),
//       location: v.string(),
//       description: v.string(),
//     }),
//   },
//   handler: async (ctx, args) => {
//     const {id, updates} = args;
//     await ctx.db.replace(id, updates);
//     return await ctx.db.get(id);
//   },
// });

// export const createContact = mutation({
//   args: {
//     contact: v.object({
//       firstName: v.string(),
//       lastName: v.string(),
//       email: v.string(),
//       phone: v.string(),
//       position: v.string(),
//       company: v.string(),
//       location: v.string(),
//       description: v.string(),
//     }),
//   },
//   handler: async (ctx, args) => {
//     const id = await ctx.db.insert("contacts", args.contact);
//     return id;
//   },
// });

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

// export const deleteContact = mutation({
//   args: {
//     id: v.id("contacts"),
//   },
//   handler: async (ctx, args) => {
//     await ctx.db.delete(args.id);
//     return true;
//   },
// });
