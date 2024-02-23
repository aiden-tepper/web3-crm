import { useAppContext } from "../context/useAppContext";
import ContactCard from "../components/ContactCard";
import ContactDetails from "../components/ContactDetails";
import InteractionLog from "../components/InteractionLog";
import InteractionForm from "../components/InteractionForm";
import { useContacts } from "../hooks/useContacts";

const ContactView = () => {
  const { setEditableContact, setMode, selectedContact, interactionMode } = useAppContext();

  const { getContacts } = useContacts();

  const handleNewContactClick = () => {
    setEditableContact({
      _id: "", // should be generated by backend?
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      position: "",
      company: "",
      location: "",
      description: "",
    });
    setMode("create");
  };

  const contacts = getContacts;

  if (selectedContact) {
    if (interactionMode === "view") {
      return (
        <>
          <ContactDetails contact={selectedContact} />
          <InteractionLog contactId={selectedContact._id} />
        </>
      );
    } else if (interactionMode === "edit" || interactionMode === "create") {
      return <InteractionForm contactId={selectedContact._id} />;
    } else {
      return null;
    }
  } else {
    if (contacts) {
      return (
        <>
          <div className="contacts-grid">
            {contacts?.map((contact) => (
              <ContactCard key={contact._id} contact={contact} />
            ))}
          </div>
          <button onClick={handleNewContactClick}>New Contact</button>
        </>
      );
    } else {
      return <p>Loading contacts...</p>;
    }
  }
};

export default ContactView;