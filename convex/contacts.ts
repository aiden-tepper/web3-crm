import { query, mutation, action, internalQuery, internalMutation } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";
Z;
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

export const fetchProfilePic = action({
  args: { id: v.id("contacts") },
  handler: async (ctx, args) => {
    const url = await ctx.runQuery(internal.contacts.readData, {
      id: args.id,
    });
    console.log(url);

    const res = await ctx.runAction(internal.linkedin.scrapeLinkedIn, {
      url: "https://linkedin.com/in/" + url,
    });

    console.log(res);
  },
});

// export const doSomething = action({
//   args: { a: v.number() },
//   handler: async (ctx, args) => {
//     const data = await ctx.runMutation(internal.myMutations.writeData, {
//       a: args.a,
//     });
//     // do something else, optionally use `data`
//   },
// });

export const readData = internalQuery({
  args: { id: v.id("contacts") },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("contacts")
      .filter((q) => q.eq(q.field("_id"), args.id))
      .unique();
    return user?.avatar;
  },
});
