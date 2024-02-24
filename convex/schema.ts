import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  contacts: defineTable({
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
  interactions: defineTable({
    contactId: v.string(),
    type: v.string(),
    datetime: v.string(),
    notes: v.string(),
  }),
});
