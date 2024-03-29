// hooks/useInteraction.js
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Interaction } from "../types";
import { Id } from "../../convex/_generated/dataModel";

export function useInteractions({ contactId }: { contactId: string | null }) {
  const getInteractions = useQuery(api.interactions.getInteractions, {
    contactId: contactId as Id<"contacts">,
  }) as Interaction[];
  const updateInteraction = useMutation(api.interactions.updateInteraction);
  const createInteraction = useMutation(api.interactions.createInteraction);
  const deleteInteraction = useMutation(api.interactions.deleteInteraction);

  return { getInteractions, updateInteraction, createInteraction, deleteInteraction };
}
