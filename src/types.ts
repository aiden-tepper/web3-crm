// types.ts
export interface Contact {
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

export interface Interaction {
    _id: string;
    contactId: string;
    type: string;
    datetime: string;
    notes: string;
}