// InteractionLog.tsx
import React from "react";
import { Interaction } from "../types";
import { api } from "../../convex/_generated/api";
import { useQuery } from "convex/react";

interface Props {
  contactId: string;
  onEdit: (interaction: Interaction) => void;
  onAdd: () => void;
}

const InteractionLog: React.FC<Props> = ({ contactId, onEdit, onAdd }) => {
  const interactions = useQuery(api.interactions.getInteractions, { contactId }) as Interaction[] | undefined;

  if (!interactions) {
    return <div>Loading interactions...</div>;
  }

  return (
    <div className="interaction-log">
      <h3>Interactions</h3>
      <ul>
        {interactions.map((interaction) => (
          <React.Fragment key={interaction._id}>
            <li>
              <p>
                <strong>Type:</strong> {interaction.type}
              </p>
              <p>
                <strong>Date:</strong> {interaction.datetime.slice(0, 10)}
              </p>
              <p>
                <strong>Notes:</strong> {interaction.notes}
              </p>
            </li>
            <button onClick={() => onEdit(interaction)}>Edit</button>
          </React.Fragment>
        ))}
      </ul>
      <button onClick={onAdd}>Add Interaction</button>
    </div>
  );
};

export default InteractionLog;
