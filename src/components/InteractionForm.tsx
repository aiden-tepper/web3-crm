// InteractionForm.tsx
import React from 'react';
import { Interaction } from '../types';

interface Props {
    mode: 'create' | 'edit';
    interaction: Interaction;
    onFieldChange: (field: keyof Interaction, value: string) => void;
    onCancel: () => void;
    onSave: () => void;
    onDelete: () => void;
}

const InteractionForm: React.FC<Props> = ({ mode, interaction, onFieldChange, onCancel, onSave, onDelete }) => (
    <div className="interaction-details">
        <div className="form-group">
            <label htmlFor="type">Type:</label>
            <input type="text" id="type" value={interaction.type} onChange={(e) => onFieldChange('type', e.target.value)} />
        </div>
        
        <div className="form-group">
            <label htmlFor="datetime">Date:</label>
            <input 
                type="date" 
                id="datetime" 
                value={interaction.datetime.slice(0, 10)} // Assuming datetime is in ISO format "YYYY-MM-DDTHH:MM:SS.ZZZZ"
                onChange={(e) => onFieldChange('datetime', e.target.value + 'T00:00:00.000Z')} // Append time part if your backend expects a full datetime string
            />
        </div>
        
        <div className="form-group">
            <label htmlFor="notes">Notes:</label>
            <input type="text" id="notes" value={interaction.notes} onChange={(e) => onFieldChange('notes', e.target.value)} />
        </div>
        
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onSave}>Save</button>
        {mode === 'edit' && <button onClick={onDelete}>Delete</button>}
    </div>
);

export default InteractionForm;
