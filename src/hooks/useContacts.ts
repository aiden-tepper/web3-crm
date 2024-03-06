// hooks/useContacts.js
import { useQuery, useMutation, useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Contact } from "../types";

export function useContacts() {
  const getContacts = useQuery(api.contacts.getContacts) as Contact[];
  const updateContact = useMutation(api.contacts.updateContact);
  const createContact = useMutation(api.contacts.createContact);
  const deleteContact = useMutation(api.contacts.deleteContact);
  const fetchProfilePic = useAction(api.contacts.fetchProfilePic);

  return { getContacts, updateContact, createContact, deleteContact, fetchProfilePic };
}
