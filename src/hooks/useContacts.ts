// hooks/useContacts.js
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Contact } from "../types";
import { Id } from "../../convex/_generated/dataModel";

export function useContacts({ userId }: { userId: string | null }) {
  const getContacts = useQuery(api.contacts.getContacts, {
    userId: userId as Id<"users">,
  }) as Contact[];
  const updateContact = useMutation(api.contacts.updateContact);
  const createContact = useMutation(api.contacts.createContact);
  const deleteContact = useMutation(api.contacts.deleteContact);
  // const fetchProfilePic = useAction(api.contacts.fetchProfilePic);

  return { getContacts, updateContact, createContact, deleteContact };
}
