// hooks/useInteraction.js
import { useMutation} from "convex/react";
import { api } from "../../convex/_generated/api";

export function useInteractions() {
    const updateInteraction = useMutation(api.interactions.updateInteraction);
    const createInteraction = useMutation(api.interactions.createInteraction);
    const deleteInteraction = useMutation(api.interactions.deleteInteraction);  
    
    return { updateInteraction, createInteraction, deleteInteraction };
}