import React from 'react';
import { Contact } from '../types';

interface ContactItemProps {
    contact: Contact;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

const ContactItem: React.FC<ContactItemProps> = ({ contact, onEdit, onDelete }) => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #eee',
            padding: '0.5rem 0'
        }}>
            <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <strong>{contact.firstName} {contact.lastName}</strong>
                    {contact.group && (
                        <span style={{
                            backgroundColor: '#ffba47',
                            padding: '2px 8px',
                            borderRadius: '12px',
                            fontSize: '0.75rem',
                            color: '#333',
                            fontWeight: 'bold'
                        }}>
                            {contact.group}
                        </span>
                    )}
                </div>
                <div style={{ color: '#666', fontSize: '0.9rem' }}>{contact.phone}</div>
            </div>
            <div>
                <div>
                    <button
                        onClick={() => onEdit(contact.id)}
                        style={{
                            marginRight: '0.5rem',
                            cursor: 'pointer',
                            background: 'none',
                            border: 'none',
                            padding: '4px'
                        }}
                        title="Modifica"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffa420" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                    </button>
                    <button
                        onClick={() => onDelete(contact.id)}
                        style={{
                            cursor: 'pointer',
                            background: 'none',
                            border: 'none',
                            padding: '4px'
                        }}
                        title="Elimina"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d32f2f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContactItem;
