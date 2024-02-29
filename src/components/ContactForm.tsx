// ContactForm.tsx
import React from "react";
import { useAppContext } from "../context/useAppContext";
import { Input } from "@nextui-org/react";
import {
  EmailIcon,
  JobIcon,
  PhoneIcon,
  LocationIcon,
  LinkedInIcon,
  CompanyIcon,
  EllipsisIcon,
  PersonIcon,
} from "../assets";

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
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
      <Input
        autoFocus
        size="md"
        type="text"
        label="Name"
        defaultValue={contact.name}
        endContent={<PersonIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
        onValueChange={(e) => handleContactFieldChange("name", e)}
      />
      <Input
        size="md"
        type="text"
        label="Location"
        defaultValue={contact.location}
        endContent={<LocationIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
        onValueChange={(e) => handleContactFieldChange("location", e)}
      />
      <Input
        size="md"
        type="text"
        label="Description"
        defaultValue={contact.description}
        endContent={<EllipsisIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
        onValueChange={(e) => handleContactFieldChange("description", e)}
      />
      <Input
        size="md"
        type="email"
        label="Email"
        defaultValue={contact.email}
        endContent={<EmailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
        onValueChange={(e) => handleContactFieldChange("email", e)}
      />
      <Input
        size="md"
        type="text"
        label="Position"
        defaultValue={contact.position}
        endContent={<JobIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
        onValueChange={(e) => handleContactFieldChange("position", e)}
      />
      <Input
        size="md"
        type="tel"
        label="Phone"
        defaultValue={contact.phone}
        endContent={<PhoneIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
        onValueChange={(e) => handleContactFieldChange("phone", e)}
      />
      <Input
        size="md"
        type="text"
        label="Company"
        defaultValue={contact.company}
        endContent={<CompanyIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
        onValueChange={(e) => handleContactFieldChange("company", e)}
      />
      <Input
        size="md"
        type="text"
        label="LinkedIn"
        defaultValue={contact.avatar}
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">https://linkedin.com/in/</span>
          </div>
        }
        endContent={<LinkedInIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
        onValueChange={(e) => handleContactFieldChange("avatar", e)}
      />
    </div>
  );
};

export default ContactForm;
