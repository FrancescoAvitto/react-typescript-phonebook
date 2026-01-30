import React from 'react';
import { Contact } from '../types';
import ContactItem from './ContactItem';

interface ContactListProps {
    groupedContacts: Record<string, Contact[]>;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

const ContactList: React.FC<ContactListProps> = ({ groupedContacts, onEdit, onDelete }) => {
    const letters = Object.keys(groupedContacts).sort();

    if (letters.length === 0) {
        return <p style={{ textAlign: 'center', color: '#666' }}>Nessun contatto trovato.</p>;
    }

    return (
        <div>
            {letters.map((letter) => (
                <div key={letter} id={`section-${letter}`} className="contact-group">
                    <h2 className="group-header">{letter}</h2>
                    {groupedContacts[letter].map((contact) => (
                        <ContactItem
                            key={contact.id}
                            contact={contact}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default ContactList;
