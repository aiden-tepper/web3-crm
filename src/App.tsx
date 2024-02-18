import React, { useState, useEffect } from "react";
import "./App.css";
import { useQuery, useMutation } from "convex/react";
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
  const updateContact = useMutation(api.contacts.update);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null); // State to track the selected contact

  // Function to handle clicking on a contact card
  const handleContactClick = (contact: Contact) => {
    setSelectedContact(contact);
  };

  const [isEditing, setIsEditing] = useState(false); // State to track editing mode

  // Create individual states for editable fields if a contact is selected
  const [editableContact, setEditableContact] = useState<Contact | null>(null);

  // When a contact is selected, initialize editable fields
  useEffect(() => {
    setEditableContact(selectedContact);
  }, [selectedContact]);

  // Handle field changes
  const handleFieldChange = (field: keyof Contact, value: string) => {
    if (editableContact) {
      setEditableContact({ ...editableContact, [field]: value });
    }
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
      ) : isEditing ? (
        <div className="contact-details">
        <input type="text" value={editableContact?.firstName || ''} onChange={(e) => handleFieldChange('firstName', e.target.value)} />
        <input type="text" value={editableContact?.lastName || ''} onChange={(e) => handleFieldChange('lastName', e.target.value)} />
        <input type="text" value={editableContact?.email || ''} onChange={(e) => handleFieldChange('email', e.target.value)} />
        <input type="text" value={editableContact?.phone || ''} onChange={(e) => handleFieldChange('phone', e.target.value)} />
        <input type="text" value={editableContact?.position || ''} onChange={(e) => handleFieldChange('position', e.target.value)} />
        <input type="text" value={editableContact?.company || ''} onChange={(e) => handleFieldChange('company', e.target.value)} />
        <input type="text" value={editableContact?.location || ''} onChange={(e) => handleFieldChange('location', e.target.value)} />
        <input type="text" value={editableContact?.description || ''} onChange={(e) => handleFieldChange('description', e.target.value)} />
        <button onClick={() => setIsEditing(false)}>Cancel</button>
        <button onClick={() => {
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
              description: editableContact?.description
            }
          }).then((result) =>
            console.log(result)
          );
          setIsEditing(false);
          setSelectedContact(editableContact); // Update the main state if saving is successful
        }}>Save</button>
        </div>

      ) : (
        <>
          <button onClick={() => setSelectedContact(null)}>Back</button>
          <h2>{selectedContact.firstName} {selectedContact.lastName}</h2>
          <p><strong>Email:</strong> {selectedContact.email}</p>
          <p><strong>Phone:</strong> {selectedContact.phone}</p>
          <p><strong>Position:</strong> {selectedContact.position}</p>
          <p><strong>Company:</strong> {selectedContact.company}</p>
          <p><strong>Location:</strong> {selectedContact.location}</p>
          <p><strong>Description:</strong> {selectedContact.description}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
    </div>
  );

}

export default App;