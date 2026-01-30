import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Contact, ContactFormData } from '../types';

interface ContactFormProps {
    initialData?: Contact | null;
    onSubmit: (data: ContactFormData) => void;
    onCancel: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ initialData, onSubmit, onCancel }) => {
    // Stato locale per gestire i campi del form
    const [formData, setFormData] = useState<ContactFormData>({
        firstName: '',
        lastName: '',
        phone: '',
    });

    // Effetto per popolare il form quando si è in modalità modifica (initialData cambia)
    useEffect(() => {
        if (initialData) {
            setFormData({
                firstName: initialData.firstName,
                lastName: initialData.lastName,
                phone: initialData.phone,
            });
        } else {
            // Reset se si passa a modalità creazione
            setFormData({ firstName: '', lastName: '', phone: '' });
        }
    }, [initialData]);

    // Gestione generica del cambiamento degli input
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        // Reset del form dopo l'invio (opzionale, utile se si rimane sulla schermata)
        setFormData({ firstName: '', lastName: '', phone: '' });
    };

    return (
        <div style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem', borderRadius: '8px' }}>
            <h3>{initialData ? 'Modifica Contatto' : 'Nuovo Contatto'}</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <input
                    type="text"
                    name="firstName"
                    placeholder="Nome"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Cognome"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="tel"
                    name="phone"
                    placeholder="Telefono"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <button type="submit" style={{ cursor: 'pointer', padding: '0.5rem 1rem', backgroundColor: '#ffa420', color: 'white' }}>
                        {initialData ? 'Salva Modifiche' : 'Aggiungi'}
                    </button>
                    <button type="button" onClick={onCancel} style={{ cursor: 'pointer', padding: '0.5rem 1rem' }}>
                        Annulla
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactForm;
