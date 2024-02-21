// ContactCard.tsx
import React from "react";
import { Contact } from "../types";
import { useAppContext } from "../AppContext";

interface Props {
  contact: Contact;
}

const ContactCard: React.FC<Props> = ({ contact }) => {
  const { setSelectedContact } = useAppContext();
  return (
    <div className="contact-card" onClick={() => setSelectedContact(contact)}>
      <h2>
        {contact.firstName} {contact.lastName}
      </h2>
      <p>
        {contact.position} at {contact.company}
      </p>
    </div>
  );
};

export default ContactCard;
