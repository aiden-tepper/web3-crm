import React, { useState, useEffect } from "react";
import "./App.css";
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import ContactCard from './components/ContactCard';
import ContactDetails from './components/ContactDetails';
import ContactForm from "./components/ContactForm";
import { Contact, Interaction } from './types';
import InteractionLog from "./components/InteractionLog";
import InteractionForm from "./components/InteractionForm";

function App() {
  // convex contacts
  const contacts = useQuery(api.contacts.getContacts) as Contact[];
  const updateContact = useMutation(api.contacts.updateContact);
  const createContact = useMutation(api.contacts.createContact);
  const deleteContact = useMutation(api.contacts.deleteContact);

  // convex interactions
  const updateInteraction = useMutation(api.interactions.updateInteraction);
  const createInteraction = useMutation(api.interactions.createInteraction);
  const deleteInteraction = useMutation(api.interactions.deleteInteraction);

  // react
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [editableContact, setEditableContact] = useState<Contact | null>(null);
  const [mode, setMode] = useState<'create' | 'edit' | 'view'>('view');
  const [selectedInteraction, setSelectedInteraction] = useState<Interaction | null>(null);
  const [editableInteraction, setEditableInteraction] = useState<Interaction | null>(null);
  const [interactionMode, setInteractionMode] = useState<'create' | 'edit' | 'view'>('view');

  useEffect(() => {
    setEditableContact(selectedContact);
  }, [selectedContact]);

  const handleContactFieldChange = (field: keyof Contact, value: string) => {
    if (editableContact) {
      setEditableContact({ ...editableContact, [field]: value });
    }
  };

  const handleContactSave = () => {
    if (mode === 'create') {
      createContact({
        contact: {
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
    } else if (mode === 'edit') {
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
      setSelectedContact(editableContact);
    }
    setMode('view');
  };

  const handleContactEditClick = () => {
    setEditableContact(selectedContact);
    setMode('edit');
  }

  const handleNewContactClick = () => {
    setEditableContact({
      _id: '', // should be generated by backend?
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      position: '',
      company: '',
      location: '',
      description: ''
    });
    setMode('create');
  };

  const handleContactCancel = () => {
    setMode('view');
  };

  const handleContactDelete = () => {
    if (editableContact?._id) {
      deleteContact({ id: editableContact._id }).then((result) =>
        console.log(result)
      );
    }
    setMode('view');
    setSelectedContact(null);
  }

  useEffect(() => {
    setEditableInteraction(selectedInteraction);
  }, [selectedInteraction]);

  const handleInteractionFieldChange = (field: keyof Interaction, value: string) => {
    if (editableInteraction) {
      setEditableInteraction({ ...editableInteraction, [field]: value });
    }
  };

  const handleInteractionSave = () => {
    if (interactionMode === 'create') {
      createInteraction({
        interaction: {
          contactId: selectedContact?._id,
          type: editableInteraction?.type,
          datetime: editableInteraction?.datetime,
          notes: editableInteraction?.notes
        }
      }).then((result) =>
        console.log(result)
      );
    } else if (interactionMode === 'edit') {
      updateInteraction({
        id: editableInteraction?._id,
        updates: {
          contactId: selectedContact?._id,
          type: editableInteraction?.type,
          datetime: editableInteraction?.datetime,
          notes: editableInteraction?.notes
        }
      }).then((result) =>
        console.log(result)
      );
      setSelectedInteraction(editableInteraction);
    }
    setInteractionMode('view');
  }

  const handleInteractionEditClick = (interaction: Interaction) => {
    setSelectedInteraction(interaction);
    setEditableInteraction(selectedInteraction);
    setInteractionMode('edit');
  }

  const handleNewInteractionClick = () => {
    setEditableInteraction({
      _id: '', // should be generated by backend?
      contactId: selectedContact?._id ?? '',
      type: '',
      datetime: '',
      notes: ''
    });
    setSelectedInteraction(null);
    setInteractionMode('create');
  };

  const handleInteractionCancel = () => {
    setInteractionMode('view');
  };

  const handleInteractionDelete = () => {
    if (editableInteraction?._id) {
      deleteInteraction({ id: editableInteraction._id }).then((result) =>
        console.log(result)
      );
    }
    setInteractionMode('view');
    setSelectedInteraction(null);
  }

  return (
    <div>
      <h1>web3-crm</h1>
      {/* Contacts list and New Contact button */}
      {mode === 'view' && (
        <>
          {!selectedContact ? (
            <>
              <div className="contacts-grid">
                {contacts?.map((contact) => (
                  <ContactCard key={contact._id} contact={contact} onClick={() => setSelectedContact(contact)} />
                ))}
              </div>
              <button onClick={handleNewContactClick}>New Contact</button>
            </>
          ) : (
            <>
              {interactionMode === 'view' && (
                <>
                  <ContactDetails
                    contact={selectedContact}
                    onFieldChange={handleContactFieldChange}
                    onBack={() => {
                      setSelectedContact(null);
                    }}
                    onEdit={handleContactEditClick}
                  />
                  <InteractionLog
                    contactId={selectedContact._id}
                    onEdit={(interaction) => handleInteractionEditClick(interaction)}
                    onAdd={handleNewInteractionClick}
                  />
                </>
              )}

              {interactionMode === 'edit' || interactionMode === 'create' ? (
                <InteractionForm
                  mode={interactionMode}
                  interaction={editableInteraction || { _id: '', contactId: '', type: '', datetime: '', notes: ''}}
                  onFieldChange={handleInteractionFieldChange}
                  onSave={handleInteractionSave}
                  onCancel={handleInteractionCancel}
                  onDelete={handleInteractionDelete}
                />
              ) : null}
            </>
          )}
        </>
      )}

      {/* Edit/Create contact form */}
      {(mode === 'edit' || mode === 'create') && (
        <ContactForm
          mode={mode}
          contact={editableContact || { _id: '', firstName: '', lastName: '', email: '', phone: '', position: '', company: '', location: '', description: ''}}
          onFieldChange={handleContactFieldChange}
          onSave={handleContactSave}
          onCancel={handleContactCancel}
          onDelete={handleContactDelete}
        />
      )}
    </div>
  );
}

export default App;