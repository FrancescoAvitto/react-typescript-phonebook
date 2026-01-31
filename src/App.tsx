import React, { useState, useMemo, useRef } from 'react';
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

    const [selectedGroup, setSelectedGroup] = useState<string>('');
    const [tagFilter, setTagFilter] = useState<string>('');

    const contactToEdit = editingId ? contacts.find(c => c.id === editingId) : null;

    // LOGICA DI FILTRO E ORDINAMENTO
    const processedContacts = useMemo(() => {
        // 1. Filtra
        let filtered = contacts;

        // Filtro testuale
        if (searchTerm) {
            const lowerTerm = searchTerm.toLowerCase();
            filtered = filtered.filter(c =>
                c.firstName.toLowerCase().includes(lowerTerm) ||
                c.lastName.toLowerCase().includes(lowerTerm) ||
                c.phone.includes(lowerTerm)
            );
        }

        // Filtro Gruppo
        if (selectedGroup) {
            filtered = filtered.filter(c => c.group === selectedGroup);
        }

        // Filtro Tag
        if (tagFilter) {
            const lowerTag = tagFilter.toLowerCase();
            filtered = filtered.filter(c =>
                c.tags && c.tags.some(t => t.toLowerCase().includes(lowerTag))
            );
        }

        // 2. Ordina
        return sortContacts(filtered);
    }, [contacts, searchTerm, selectedGroup, tagFilter]);

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


    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleExport = () => {
        const json = JSON.stringify(contacts, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'contacts.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleImportClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const content = e.target?.result as string;
                const importedContacts = JSON.parse(content);
                if (Array.isArray(importedContacts)) {
                    setContacts(importedContacts);
                    alert('Contatti importati con successo!');
                } else {
                    alert('Il file JSON non è valido.');
                }
            } catch (error) {
                alert('Errore durante la lettura del file.');
            }
        };
        reader.readAsText(file);
        // Reset input
        event.target.value = '';
    };

    return (
        <div className="container-wrapper">
            <div className="container">
                <header className="header">
                    <h1>Rubrica</h1>
                    {!isCreating && !editingId && (
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                accept=".json"
                                onChange={handleFileChange}
                            />
                            <button onClick={handleImportClick} className="add-button" style={{ backgroundColor: '#2196F3' }}>
                                Importa
                            </button>
                            <button onClick={handleExport} className="add-button" style={{ backgroundColor: '#4CAF50' }}>
                                Esporta
                            </button>
                            <button onClick={() => setIsCreating(true)} className="add-button">
                                + Nuovo
                            </button>
                        </div>
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
                            <SearchBar
                                value={searchTerm}
                                onChange={setSearchTerm}
                                selectedGroup={selectedGroup}
                                onGroupChange={setSelectedGroup}
                                tagFilter={tagFilter}
                                onTagChange={setTagFilter}
                            />
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
