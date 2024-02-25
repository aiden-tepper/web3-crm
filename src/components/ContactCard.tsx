// ContactCard.tsx
import React from "react";
import { Contact } from "../types";
import { Button } from "@nextui-org/react";

interface Props {
  contact: Contact;
  setModalMode: (mode: string) => void;
}

const ContactCard: React.FC<Props> = ({ contact, setModalMode }) => {
  return (
    <div>
      <p>Name: {contact.name}</p>
      <p>Position: {contact.position}</p>
      <p>Team: {contact.team}</p>
      <p>Email: {contact.email}</p>
      <p>Status: {contact.status}</p>
      <p>Location: {contact.location}</p>
      <p>Company: {contact.company}</p>
      <p>Phone: {contact.phone}</p>
      <p>Description: {contact.description}</p>
      <p>Avatar: {contact.avatar}</p>
      <Button color="primary" onPress={() => setModalMode("edit")}>
        Edit
      </Button>
    </div>
  );
};

export default ContactCard;
