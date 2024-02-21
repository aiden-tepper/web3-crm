// InteractionForm.tsx
import React from "react";
import { Interaction } from "../types";
import { useAppContext } from "../context/useAppContext";
import { useInteractions } from "../hooks/useInteractions";

interface Props {
  interaction: Interaction;
}

const InteractionForm: React.FC<Props> = ({ interaction }) => {
  const {
    mode,
    handleInteractionFieldChange,
    editableInteraction,
    interactionMode,
    setInteractionMode,
    selectedContact,
    setSelectedInteraction,
  } = useAppContext();

  const { updateInteraction, createInteraction, deleteInteraction } = useInteractions({ contactId: null });

  const handleInteractionSave = () => {
    if (interactionMode === "create") {
      createInteraction({
        interaction: {
          contactId: selectedContact?._id,
          type: editableInteraction?.type,
          datetime: editableInteraction?.datetime,
          notes: editableInteraction?.notes,
        },
      }).then((result) => console.log(result));
    } else if (interactionMode === "edit") {
      updateInteraction({
        id: editableInteraction?._id,
        updates: {
          contactId: selectedContact?._id,
          type: editableInteraction?.type,
          datetime: editableInteraction?.datetime,
          notes: editableInteraction?.notes,
        },
      }).then((result) => console.log(result));
      setSelectedInteraction(editableInteraction);
    }
    setInteractionMode("view");
  };

  const handleInteractionCancel = () => {
    setInteractionMode("view");
  };

  const handleInteractionDelete = () => {
    if (editableInteraction?._id) {
      deleteInteraction({ id: editableInteraction._id }).then((result) => console.log(result));
    }
    setInteractionMode("view");
    setSelectedInteraction(null);
  };

  return (
    <div className="interaction-details">
      <div className="form-group">
        <label htmlFor="type">Type:</label>
        <input
          type="text"
          id="type"
          value={interaction.type}
          onChange={(e) => handleInteractionFieldChange("type", e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="datetime">Date:</label>
        <input
          type="date"
          id="datetime"
          value={interaction.datetime.slice(0, 10)} // Assuming datetime is in ISO format "YYYY-MM-DDTHH:MM:SS.ZZZZ"
          onChange={(e) => handleInteractionFieldChange("datetime", e.target.value + "T00:00:00.000Z")} // Append time part if your backend expects a full datetime string
        />
      </div>

      <div className="form-group">
        <label htmlFor="notes">Notes:</label>
        <input
          type="text"
          id="notes"
          value={interaction.notes}
          onChange={(e) => handleInteractionFieldChange("notes", e.target.value)}
        />
      </div>

      <button onClick={() => handleInteractionCancel}>Cancel</button>
      <button onClick={() => handleInteractionSave}>Save</button>
      {mode === "edit" && <button onClick={() => handleInteractionDelete}>Delete</button>}
    </div>
  );
};

export default InteractionForm;
