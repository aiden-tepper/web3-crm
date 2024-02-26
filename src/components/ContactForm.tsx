// ContactForm.tsx
import React from "react";
import { useAppContext } from "../context/useAppContext";
import { Input } from "@nextui-org/react";

interface Props {}

const ContactForm: React.FC<Props> = () => {
  const { editableContact, handleContactFieldChange } = useAppContext();

  const contact = editableContact || {
    _id: "",
    name: "",
    position: "",
    team: "",
    email: "",
    status: "",
    location: "",
    company: "",
    phone: "",
    description: "",
    avatar: "",
  };

  return (
    <form>
      <Input
        size="md"
        type="text"
        label="Name"
        defaultValue={contact.name}
        onValueChange={(e) => handleContactFieldChange("name", e)}
      />
      <Input
        size="md"
        type="text"
        label="Position"
        defaultValue={contact.position}
        onValueChange={(e) => handleContactFieldChange("position", e)}
      />
      <Input
        size="md"
        type="text"
        label="Team"
        defaultValue={contact.team}
        onValueChange={(e) => handleContactFieldChange("team", e)}
      />
      <Input
        size="md"
        type="email"
        label="Email"
        defaultValue={contact.email}
        onValueChange={(e) => handleContactFieldChange("email", e)}
      />
      <Input
        size="md"
        type="text"
        label="Status"
        defaultValue={contact.status}
        onValueChange={(e) => handleContactFieldChange("status", e)}
      />
      <Input
        size="md"
        type="text"
        label="Location"
        defaultValue={contact.location}
        onValueChange={(e) => handleContactFieldChange("location", e)}
      />
      <Input
        size="md"
        type="text"
        label="Company"
        defaultValue={contact.company}
        onValueChange={(e) => handleContactFieldChange("company", e)}
      />
      <Input
        size="md"
        type="tel"
        label="Phone"
        defaultValue={contact.phone}
        onValueChange={(e) => handleContactFieldChange("phone", e)}
      />
      <Input
        size="md"
        type="text"
        label="Description"
        defaultValue={contact.description}
        onValueChange={(e) => handleContactFieldChange("description", e)}
      />
      <Input
        size="md"
        type="text"
        label="Avatar"
        defaultValue={contact.avatar}
        onValueChange={(e) => handleContactFieldChange("avatar", e)}
      />
    </form>
  );
};

export default ContactForm;
