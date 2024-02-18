import React, { useState } from "react";
import "./App.css";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

// Define an interface for the contact object
interface Contact {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  company: string;
  location: string;
  description: string;
}

function App() {
  // Fetch contacts using the Convex useQuery hook
  const contacts = useQuery(api.contacts.get) as Contact[];
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null); // State to track the selected contact

  // Function to handle clicking on a contact card
  const handleContactClick = (contact: Contact) => {
    setSelectedContact(contact);
  };
  
  return (
    <div className="App">
      <h1>Contacts List</h1>
      {!selectedContact ? (
        // Display contacts as cards if no contact is selected
        <div className="contacts-grid">
          {contacts?.map((contact) => (
            <div key={contact._id} className="contact-card" onClick={() => handleContactClick(contact)}>
              <h2>{contact.firstName} {contact.lastName}</h2>
              <p>{contact.position} at {contact.company}</p>
            </div>
          ))}
        </div>
      ) : (
        // Display detailed information for the selected contact
        <div className="contact-details">
          <button onClick={() => setSelectedContact(null)}>Back</button>
          <h2>{selectedContact.firstName} {selectedContact.lastName}</h2>
          <p><strong>Email:</strong> {selectedContact.email}</p>
          <p><strong>Phone:</strong> {selectedContact.phone}</p>
          <p><strong>Position:</strong> {selectedContact.position}</p>
          <p><strong>Company:</strong> {selectedContact.company}</p>
          <p><strong>Location:</strong> {selectedContact.location}</p>
          <p><strong>Description:</strong> {selectedContact.description}</p>
        </div>
      )}
    </div>
  );
}

export default App;