// ContactDetails.tsx
import React from 'react';

interface Contact {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  company: string;
  location: string;
  description: string;
}

interface Props {
  contact: Contact;
  isEditing: boolean;
  onFieldChange: (field: keyof Contact, value: string) => void;
  onCancel: () => void;
  onSave: () => void;
  onBack: () => void;
  onEdit: () => void;
}

const ContactDetails: React.FC<Props> = ({ contact, isEditing, onFieldChange, onCancel, onSave, onBack, onEdit }) => (
  <div className="contact-details">
    {isEditing ? (
    <div className="contact-details">
        <input type="text" value={contact.firstName} onChange={(e) => onFieldChange('firstName', e.target.value)} />
        <input type="text" value={contact.lastName} onChange={(e) => onFieldChange('lastName', e.target.value)} />
        <input type="text" value={contact.email} onChange={(e) => onFieldChange('email', e.target.value)} />
        <input type="text" value={contact.phone} onChange={(e) => onFieldChange('phone', e.target.value)} />
        <input type="text" value={contact.position} onChange={(e) => onFieldChange('position', e.target.value)} />
        <input type="text" value={contact.company} onChange={(e) => onFieldChange('company', e.target.value)} />
        <input type="text" value={contact.location} onChange={(e) => onFieldChange('location', e.target.value)} />
        <input type="text" value={contact.description} onChange={(e) => onFieldChange('description', e.target.value)} />
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onSave}>Save</button>
    </div>
    ) : (
      <>
        <button onClick={onBack}>Back</button>
        <h2>{contact.firstName} {contact.lastName}</h2>
        <p><strong>Email:</strong> {contact.email}</p>
        <p><strong>Phone:</strong> {contact.phone}</p>
        <p><strong>Position:</strong> {contact.position}</p>
        <p><strong>Company:</strong> {contact.company}</p>
        <p><strong>Location:</strong> {contact.location}</p>
        <p><strong>Description:</strong> {contact.description}</p>
        <button onClick={onEdit}>Edit</button>
      </>
    )}
  </div>
);

export default ContactDetails;
