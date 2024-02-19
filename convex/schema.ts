import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  contacts: defineTable({
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.string(),
    position: v.string(),
    company: v.string(),
    location: v.string(),
    description: v.string(),
  }),
  interactions: defineTable({
    contactId: v.string(),
    type: v.string(),
    datetime: v.string(),
    notes: v.string(),
  }),
});