// ContactForm.tsx
import React from "react";
import { useAppContext } from "../context/useAppContext";
import { Input } from "@nextui-org/react";

interface Props {}

const ContactForm: React.FC<Props> = () => {
  const { editableContact, handleContactFieldChange } = useAppContext();

  // const { updateContact, createContact, deleteContact } = useContacts();

  // const handleContactSave = () => {
  //   if (mode === "create") {
  //     createContact({
  //       contact: {
  //         firstName: editableContact?.firstName,
  //         lastName: editableContact?.lastName,
  //         email: editableContact?.email,
  //         phone: editableContact?.phone,
  //         position: editableContact?.position,
  //         company: editableContact?.company,
  //         location: editableContact?.location,
  //         description: editableContact?.description,
  //       },
  //     }).then((result) => console.log(result));
  //   } else if (mode === "edit") {
  //     updateContact({
  //       id: editableContact?._id,
  //       updates: {
  //         firstName: editableContact?.firstName,
  //         lastName: editableContact?.lastName,
  //         email: editableContact?.email,
  //         phone: editableContact?.phone,
  //         position: editableContact?.position,
  //         company: editableContact?.company,
  //         location: editableContact?.location,
  //         description: editableContact?.description,
  //       },
  //     }).then((result) => console.log(result));
  //     setSelectedContact(editableContact);
  //   }
  //   setMode("view");
  // };

  // const handleContactCancel = () => {
  //   setMode("view");
  // };

  // const handleContactDelete = () => {
  //   if (editableContact?._id) {
  //     deleteContact({ id: editableContact._id }).then((result) => console.log(result));
  //   }
  //   setMode("view");
  //   setSelectedContact(null);
  // };

  // const contact = editableContact || {
  //   _id: "",
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   phone: "",
  //   position: "",
  //   company: "",
  //   location: "",
  //   description: "",
  // };

  // return (
  //   <div className="contact-details">
  //     <div className="form-group">
  //       <label htmlFor="firstName">First Name:</label>
  //       <input
  //         type="text"
  //         id="firstName"
  //         value={contact.firstName}
  //         onChange={(e) => handleContactFieldChange("firstName", e.target.value)}
  //       />
  //     </div>

  //     <div className="form-group">
  //       <label htmlFor="lastName">Last Name:</label>
  //       <input
  //         type="text"
  //         id="lastName"
  //         value={contact.lastName}
  //         onChange={(e) => handleContactFieldChange("lastName", e.target.value)}
  //       />
  //     </div>

  //     <div className="form-group">
  //       <label htmlFor="email">Email:</label>
  //       <input
  //         type="text"
  //         id="email"
  //         value={contact.email}
  //         onChange={(e) => handleContactFieldChange("email", e.target.value)}
  //       />
  //     </div>

  //     <div className="form-group">
  //       <label htmlFor="phone">Phone:</label>
  //       <input
  //         type="text"
  //         id="phone"
  //         value={contact.phone}
  //         onChange={(e) => handleContactFieldChange("phone", e.target.value)}
  //       />
  //     </div>

  //     <div className="form-group">
  //       <label htmlFor="position">Position:</label>
  //       <input
  //         type="text"
  //         id="position"
  //         value={contact.position}
  //         onChange={(e) => handleContactFieldChange("position", e.target.value)}
  //       />
  //     </div>

  //     <div className="form-group">
  //       <label htmlFor="company">Company:</label>
  //       <input
  //         type="text"
  //         id="company"
  //         value={contact.company}
  //         onChange={(e) => handleContactFieldChange("company", e.target.value)}
  //       />
  //     </div>

  //     <div className="form-group">
  //       <label htmlFor="location">Location:</label>
  //       <input
  //         type="text"
  //         id="location"
  //         value={contact.location}
  //         onChange={(e) => handleContactFieldChange("location", e.target.value)}
  //       />
  //     </div>

  //     <div className="form-group">
  //       <label htmlFor="description">Description:</label>
  //       <input
  //         type="text"
  //         id="description"
  //         value={contact.description}
  //         onChange={(e) => handleContactFieldChange("description", e.target.value)}
  //       />
  //     </div>

  //     <button onClick={handleContactCancel}>Cancel</button>
  //     <button onClick={handleContactSave}>Save</button>
  //     {mode === "edit" && <button onClick={handleContactDelete}>Delete</button>}
  //   </div>
  // );

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
