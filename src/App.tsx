import React, { useState, useMemo } from 'react';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import SearchBar from './components/SearchBar';
import AlphabetSidebar from './components/AlphabetSidebar';
import { generateInitialContacts, sortContacts, groupContactsByLetter } from './utils';
import { Contact, ContactFormData } from './types';
import './index.css';

const App: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>(() => generateInitialContacts(100));
    const [editingId, setEditingId] = useState<number | null>(null);
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const contactToEdit = editingId ? contacts.find(c => c.id === editingId) : null;

    // LOGICA DI FILTRO E ORDINAMENTO
    const processedContacts = useMemo(() => {
        // 1. Filtra
        let filtered = contacts;
        if (searchTerm) {
            const lowerTerm = searchTerm.toLowerCase();
            filtered = contacts.filter(c =>
                c.firstName.toLowerCase().includes(lowerTerm) ||
                c.lastName.toLowerCase().includes(lowerTerm) ||
                c.phone.includes(lowerTerm)
            );
        }
        // 2. Ordina
        return sortContacts(filtered);
    }, [contacts, searchTerm]);

    // 3. Raggruppa
    const groupedContacts = useMemo(() => groupContactsByLetter(processedContacts), [processedContacts]);
    const availableLetters = Object.keys(groupedContacts).sort();

    // ACTIONS
    const handleAddContact = (data: ContactFormData) => {
        const newId = Math.max(...contacts.map(c => c.id), 0) + 1;
        const newContact: Contact = { id: newId, ...data };
        setContacts([newContact, ...contacts]);
        setIsCreating(false);
    };

    const handleUpdateContact = (data: ContactFormData) => {
        if (editingId === null) return;
        setContacts(contacts.map(contact =>
            contact.id === editingId ? { ...contact, ...data } : contact
        ));
        setEditingId(null);
    };

    const handleDeleteContact = (id: number) => {
        if (window.confirm('Sei sicuro di voler eliminare questo contatto?')) {
            setContacts(contacts.filter(c => c.id !== id));
            if (editingId === id) setEditingId(null);
        }
    };

    const handleScrollToLetter = (letter: string) => {
        const element = document.getElementById(`section-${letter}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="container-wrapper">
            <div className="container">
                <header className="header">
                    <h1>Rubrica</h1>
                    {!isCreating && !editingId && (
                        <button onClick={() => setIsCreating(true)} className="add-button">
                            + Nuovo
                        </button>
                    )}
                </header>

                <main>
                    {(isCreating || editingId) ? (
                        <ContactForm
                            initialData={contactToEdit}
                            onSubmit={isCreating ? handleAddContact : handleUpdateContact}
                            onCancel={() => {
                                setIsCreating(false);
                                setEditingId(null);
                            }}
                        />
                    ) : (
                        <>
                            <SearchBar value={searchTerm} onChange={setSearchTerm} />
                            <ContactList
                                groupedContacts={groupedContacts}
                                onEdit={(id) => {
                                    setEditingId(id);
                                    setIsCreating(false);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                onDelete={handleDeleteContact}
                            />
                        </>
                    )}
                </main>
            </div>

            {/* Sidebar visibile solo se non stiamo modificando/creando */}
            {!isCreating && !editingId && (
                <AlphabetSidebar
                    availableLetters={availableLetters}
                    onLetterClick={handleScrollToLetter}
                />
            )}
        </div>
    );
};

export default App;
