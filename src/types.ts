export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  group: string;
  tags: string[];
}

export type ContactFormData = Omit<Contact, 'id'>;
