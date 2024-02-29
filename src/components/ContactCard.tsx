// ContactCard.tsx
import React from "react";
import { Contact } from "../types";
import { Button, Card, CardHeader, Image, CardBody, CardFooter } from "@nextui-org/react";
import { EmailIcon, JobIcon, LocationIcon, PhoneIcon, LinkedInIcon } from "../assets";

interface Props {
  contact: Contact;
  setModalMode: (mode: string) => void;
}

const ContactCard: React.FC<Props> = ({ contact, setModalMode }) => {
  return (
    <Card>
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={100}
          radius="full"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={100}
        />
        <div className="flex flex-col">
          <p className="text-md">{contact.name}</p>
          <p className="text-small text-default-500">{contact.description}</p>
        </div>
      </CardHeader>
      <CardBody>
        <span style={{ display: "flex", alignItems: "center" }}>
          <JobIcon /> &nbsp;
          {contact.position} at {contact.company}
        </span>
        <span style={{ display: "flex", alignItems: "center" }}>
          <EmailIcon /> &nbsp;
          {contact.email}
        </span>
        <span style={{ display: "flex", alignItems: "center" }}>
          <LocationIcon /> &nbsp;
          {contact.location}
        </span>
        <span style={{ display: "flex", alignItems: "center" }}>
          <PhoneIcon /> &nbsp;
          {contact.phone}
        </span>
        <span style={{ display: "flex", alignItems: "center" }}>
          <LinkedInIcon /> &nbsp;linkedin
        </span>
      </CardBody>
      <CardFooter>
        <Button color="primary" onPress={() => setModalMode("edit")}>
          Edit
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ContactCard;
