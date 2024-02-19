// InteractionLog.tsx
import React from 'react';
import { Interaction } from '../types';
import { api } from "../../convex/_generated/api";
import { useQuery } from 'convex/react';

interface Props {
    contactId: string;
}

const InteractionLog: React.FC<Props> = ({ contactId }) => {
    const interactions = useQuery(api.interactions.getInteractions, {contactId}) as Interaction[] | undefined;

    if (!interactions) {
        return <div>Loading interactions...</div>;
    }

    return (
    <div className="interaction-log">
        <h3>Interactions</h3>
        <ul>
            {interactions.map(interaction => (
                <li key={interaction._id}>
                    <p><strong>Type:</strong> {interaction.type}</p>
                    <p><strong>Date:</strong> {interaction.datetime}</p>
                    <p><strong>Notes:</strong> {interaction.notes}</p>
                </li>
            ))}
        </ul>
    </div>
    );
};

export default InteractionLog