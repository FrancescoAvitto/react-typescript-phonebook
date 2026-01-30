export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
}

export type ContactFormData = Omit<Contact, 'id'>;
