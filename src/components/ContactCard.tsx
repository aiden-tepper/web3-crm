// ContactCard.tsx
import React from "react";
import { Contact } from "../types";

interface Props {
  contact: Contact;
  onClick: () => void;
}

const ContactCard: React.FC<Props> = ({ contact, onClick }) => (
  <div className="contact-card" onClick={onClick}>
    <h2>
      {contact.firstName} {contact.lastName}
    </h2>
    <p>
      {contact.position} at {contact.company}
    </p>
  </div>
);

export default ContactCard;
