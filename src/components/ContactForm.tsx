// ContactForm.tsx
import React from "react";
import { useAppContext } from "../AppContext";
import { useContacts } from "../hooks/useContacts";

interface Props {}

const ContactForm: React.FC<Props> = () => {
  const { handleContactFieldChange, mode, editableContact, setMode, setSelectedContact } = useAppContext();

  const { updateContact, createContact, deleteContact } = useContacts();

  const handleContactSave = () => {
    if (mode === "create") {
      createContact({
        contact: {
          firstName: editableContact?.firstName,
          lastName: editableContact?.lastName,
          email: editableContact?.email,
          phone: editableContact?.phone,
          position: editableContact?.position,
          company: editableContact?.company,
          location: editableContact?.location,
          description: editableContact?.description,
        },
      }).then((result) => console.log(result));
    } else if (mode === "edit") {
      updateContact({
        id: editableContact?._id,
        updates: {
          firstName: editableContact?.firstName,
          lastName: editableContact?.lastName,
          email: editableContact?.email,
          phone: editableContact?.phone,
          position: editableContact?.position,
          company: editableContact?.company,
          location: editableContact?.location,
          description: editableContact?.description,
        },
      }).then((result) => console.log(result));
      setSelectedContact(editableContact);
    }
    setMode("view");
  };

  const handleContactCancel = () => {
    setMode("view");
  };

  const handleContactDelete = () => {
    if (editableContact?._id) {
      deleteContact({ id: editableContact._id }).then((result) => console.log(result));
    }
    setMode("view");
    setSelectedContact(null);
  };

  const contact = editableContact || {
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    company: "",
    location: "",
    description: "",
  };

  return (
    <div className="contact-details">
      <div className="form-group">
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          value={contact.firstName}
          onChange={(e) => handleContactFieldChange("firstName", e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={contact.lastName}
          onChange={(e) => handleContactFieldChange("lastName", e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          value={contact.email}
          onChange={(e) => handleContactFieldChange("email", e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone:</label>
        <input
          type="text"
          id="phone"
          value={contact.phone}
          onChange={(e) => handleContactFieldChange("phone", e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="position">Position:</label>
        <input
          type="text"
          id="position"
          value={contact.position}
          onChange={(e) => handleContactFieldChange("position", e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="company">Company:</label>
        <input
          type="text"
          id="company"
          value={contact.company}
          onChange={(e) => handleContactFieldChange("company", e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          value={contact.location}
          onChange={(e) => handleContactFieldChange("location", e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          value={contact.description}
          onChange={(e) => handleContactFieldChange("description", e.target.value)}
        />
      </div>

      <button onClick={handleContactCancel}>Cancel</button>
      <button onClick={handleContactSave}>Save</button>
      {mode === "edit" && <button onClick={handleContactDelete}>Delete</button>}
    </div>
  );
};

export default ContactForm;
