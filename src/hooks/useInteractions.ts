// hooks/useInteraction.js
import { useQuery, useMutation} from "convex/react";
import { api } from "../../convex/_generated/api";
import { Interaction } from "../types";

export function useInteractions() {
    const updateInteraction = useMutation(api.interactions.updateInteraction);
    const createInteraction = useMutation(api.interactions.createInteraction);
    const deleteInteraction = useMutation(api.interactions.deleteInteraction);  
    
    return { updateInteraction, createInteraction, deleteInteraction };
};