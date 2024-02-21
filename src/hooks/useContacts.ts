// hooks/useContacts.js
import { useQuery, useMutation} from "convex/react";
import { api } from "../../convex/_generated/api";
import { Contact } from "../types";

export function useContacts() {
    const contacts = useQuery(api.contacts.getContacts) as Contact[];
    const updateContact = useMutation(api.contacts.updateContact);
    const createContact = useMutation(api.contacts.createContact);
    const deleteContact = useMutation(api.contacts.deleteContact);
    
    return { contacts, updateContact, createContact, deleteContact };
}