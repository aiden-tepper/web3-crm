// ContactDetails.tsx
import React from "react";
import { Contact } from "../types";

interface Props {
  contact: Contact;
  onFieldChange: (field: keyof Contact, value: string) => void;
  onBack: () => void;
  onEdit: () => void;
}

const ContactDetails: React.FC<Props> = ({ contact, onBack, onEdit }) => (
  <div className="contact-details">
    <button onClick={onBack}>Back</button>
    <h2>
      {contact.firstName} {contact.lastName}
    </h2>
    <p>
      <strong>Email:</strong> {contact.email}
    </p>
    <p>
      <strong>Phone:</strong> {contact.phone}
    </p>
    <p>
      <strong>Position:</strong> {contact.position}
    </p>
    <p>
      <strong>Company:</strong> {contact.company}
    </p>
    <p>
      <strong>Location:</strong> {contact.location}
    </p>
    <p>
      <strong>Description:</strong> {contact.description}
    </p>
    <button onClick={onEdit}>Edit</button>
  </div>
);

export default ContactDetails;
