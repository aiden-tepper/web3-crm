// types.ts
import { SVGProps } from "react";

export interface Contact {
  _id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  company: string;
  location: string;
  description: string;
  team: string;
  status: string;
  avatar: string;
}

export interface Interaction {
  _id: string;
  contactId: string;
  type: string;
  datetime: string;
  notes: string;
}

export interface User {
  _id: string;
  name: string;
  walletAddress: string;
}

export interface AppContextProps {
  selectedContact: Contact | null;
  setSelectedContact: (contact: Contact | null) => void;
  editableContact: Contact | null;
  setEditableContact: (contact: Contact | null) => void;
  mode: "create" | "edit" | "view";
  setMode: (mode: "create" | "edit" | "view") => void;
  selectedInteraction: Interaction | null;
  setSelectedInteraction: (interaction: Interaction | null) => void;
  editableInteraction: Interaction | null;
  setEditableInteraction: (interaction: Interaction | null) => void;
  interactionMode: "create" | "edit" | "view";
  setInteractionMode: (mode: "create" | "edit" | "view") => void;
  handleContactFieldChange: (field: keyof Contact, value: string) => void;
  handleInteractionFieldChange: (field: keyof Interaction, value: string) => void;
  userId: string | null;
  userName: string | null;
}

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
