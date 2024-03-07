import React, { createContext, useEffect, useState } from "react";
import { Contact, Interaction, AppContextProps } from "../types";

export const AppContext = createContext<AppContextProps>({} as AppContextProps);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [editableContact, setEditableContact] = useState<Contact | null>(null);
  const [mode, setMode] = useState<"create" | "edit" | "view">("view");
  const [selectedInteraction, setSelectedInteraction] = useState<Interaction | null>(null);
  const [editableInteraction, setEditableInteraction] = useState<Interaction | null>(null);
  const [interactionMode, setInteractionMode] = useState<"create" | "edit" | "view">("view");
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    setEditableContact(selectedContact);
  }, [selectedContact]);

  useEffect(() => {
    setEditableInteraction(selectedInteraction);
  }, [selectedInteraction]);

  const handleContactFieldChange = (field: keyof Contact, value: string) => {
    if (editableContact) {
      setEditableContact({ ...editableContact, [field]: value });
    }
  };

  const handleInteractionFieldChange = (field: keyof Interaction, value: string) => {
    if (editableInteraction) {
      setEditableInteraction({ ...editableInteraction, [field]: value });
    }
  };

  const contextValue = {
    selectedContact,
    setSelectedContact,
    editableContact,
    setEditableContact,
    mode,
    setMode,
    selectedInteraction,
    setSelectedInteraction,
    editableInteraction,
    setEditableInteraction,
    interactionMode,
    setInteractionMode,
    address,
    setAddress,
    handleContactFieldChange,
    handleInteractionFieldChange,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
