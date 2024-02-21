// ContactDetails.tsx
import React from "react";
import { Contact } from "../types";
import { useAppContext } from "../AppContext";

interface Props {
  contact: Contact;
}

const ContactDetails: React.FC<Props> = ({ contact }) => {
  const { selectedContact, setSelectedContact, setEditableContact, setMode } = useAppContext();

  const handleContactEditClick = () => {
    setEditableContact(selectedContact);
    setMode("edit");
  };

  return (
    <div className="contact-details">
      <button onClick={() => setSelectedContact(null)}>Back</button>
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
      <button onClick={handleContactEditClick}>Edit</button>
    </div>
  );
};

export default ContactDetails;
