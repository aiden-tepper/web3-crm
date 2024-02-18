// ContactForm.tsx
import React from 'react';
import { Contact } from '../types';

interface Props {
    contact: Contact;
    onFieldChange: (field: keyof Contact, value: string) => void;
    onCancel: () => void;
    onSave: () => void;
}

const ContactForm: React.FC<Props> = ({ contact, onFieldChange, onCancel, onSave }) => (
    <div className="contact-details">
        <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input type="text" id="firstName" value={contact.firstName} onChange={(e) => onFieldChange('firstName', e.target.value)} />
        </div>
        
        <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input type="text" id="lastName" value={contact.lastName} onChange={(e) => onFieldChange('lastName', e.target.value)} />
        </div>
        
        <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" value={contact.email} onChange={(e) => onFieldChange('email', e.target.value)} />
        </div>
        
        <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input type="text" id="phone" value={contact.phone} onChange={(e) => onFieldChange('phone', e.target.value)} />
        </div>
        
        <div className="form-group">
            <label htmlFor="position">Position:</label>
            <input type="text" id="position" value={contact.position} onChange={(e) => onFieldChange('position', e.target.value)} />
        </div>
        
        <div className="form-group">
            <label htmlFor="company">Company:</label>
            <input type="text" id="company" value={contact.company} onChange={(e) => onFieldChange('company', e.target.value)} />
        </div>
        
        <div className="form-group">
            <label htmlFor="location">Location:</label>
            <input type="text" id="location" value={contact.location} onChange={(e) => onFieldChange('location', e.target.value)} />
        </div>
        
        <div className="form-group">
            <label htmlFor="description">Description:</label>
            <input type="text" id="description" value={contact.description} onChange={(e) => onFieldChange('description', e.target.value)} />
        </div>

        <button onClick={onCancel}>Cancel</button>
        <button onClick={onSave}>Save</button>
    </div>
);

export default ContactForm;
