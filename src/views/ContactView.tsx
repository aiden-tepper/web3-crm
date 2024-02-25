import React, { useState, useMemo, useCallback } from "react";
import { useAppContext } from "../context/useAppContext";
import ContactCard from "../components/ContactCard";
import ContactDetails from "../components/ContactDetails";
import InteractionLog from "../components/InteractionLog";
import InteractionForm from "../components/InteractionForm";
import { useContacts } from "../hooks/useContacts";
import { Contact } from "../types";

const ContactView = () => {
  const {
    editableContact,
    setEditableContact,
    setMode,
    selectedContact,
    setSelectedContact,
    interactionMode,
    handleContactFieldChange,
  } = useAppContext();

  const { getContacts, updateContact, createContact, deleteContact } = useContacts();

  // const handleNewContactClick = () => {
  //   setEditableContact({
  //     _id: "", // generated by backend
  //     firstName: "",
  //     lastName: "",
  //     email: "",
  //     phone: "",
  //     position: "",
  //     company: "",
  //     location: "",
  //     description: "",
  //   });
  //   setMode("create");
  // };

  const contacts = getContacts;

  // if (selectedContact) {
  //   if (interactionMode === "view") {
  //     return (
  //       <>
  //         <ContactDetails contact={selectedContact} />
  //         <InteractionLog contactId={selectedContact._id} />
  //       </>
  //     );
  //   } else if (interactionMode === "edit" || interactionMode === "create") {
  //     return <InteractionForm contactId={selectedContact._id} />;
  //   } else {
  //     return null;
  //   }
  // } else {
  //   if (contacts) {
  //     return (
  //       <>
  //         <div className="contacts-grid">
  //           {contacts?.map((contact) => (
  //             <ContactCard key={contact._id} contact={contact} />
  //           ))}
  //         </div>
  //         <button onClick={handleNewContactClick}>New Contact</button>
  //       </>
  //     );
  //   } else {
  //     return <p>Loading contacts...</p>;
  //   }
  // }
};

export default ContactView;
