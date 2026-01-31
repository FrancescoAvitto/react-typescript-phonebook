import { Contact } from './types';

const firstNames = [
    'Alessandro', 'Sofia', 'Lorenzo', 'Giulia', 'Leonardo', 'Aurora', 'Francesco', 'Alice', 'Mattia', 'Ginevra',
    'Andrea', 'Emma', 'Gabriele', 'Giorgia', 'Tommaso', 'Beatrice', 'Riccardo', 'Greta', 'Edoardo', 'Vittoria',
    'Giuseppe', 'Anna', 'Antonio', 'Martina', 'Federico', 'Chiara', 'Marco', 'Ludovica', 'Davide', 'Sara'
];

const lastNames = [
    'Rossi', 'Russo', 'Ferrari', 'Esposito', 'Bianchi', 'Romano', 'Colombo', 'Ricci', 'Marino', 'Greco',
    'Bruno', 'Gallo', 'Conti', 'De Luca', 'Mancini', 'Costa', 'Giordano', 'Rizzo', 'Lombardi', 'Moretti',
    'Barbieri', 'Fontana', 'Santoro', 'Mariani', 'Rinaldi', 'Caruso', 'Ferrara', 'Galli', 'Martini', 'Leone'
];

export const GROUPS = ['Famiglia', 'Lavoro', 'Amici', 'Altro'];
const TAGS = ['Palestra', 'Calcetto', 'Urgenze', 'VIP', 'Scuola', 'Colleghi'];

const generatePhoneNumber = () => {
    const prefix = '3' + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10);
    const number = Math.floor(Math.random() * 10000000).toString().padStart(7, '0');
    return `+39 ${prefix} ${number}`;
};

export const generateInitialContacts = (count: number): Contact[] => {
    const contacts: Contact[] = [];
    for (let i = 1; i <= count; i++) {
        const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];

        contacts.push({
            id: i,
            firstName: randomFirstName,
            lastName: randomLastName,
            phone: generatePhoneNumber(),
            group: GROUPS[Math.floor(Math.random() * GROUPS.length)],
            tags: [
                TAGS[Math.floor(Math.random() * TAGS.length)],
                Math.random() > 0.5 ? TAGS[Math.floor(Math.random() * TAGS.length)] : ''
            ].filter(t => t !== '')
        });
    }
    return contacts;
};

// Ordina per Cognome, poi Nome
export const sortContacts = (contacts: Contact[]): Contact[] => {
    return [...contacts].sort((a, b) => {
        const lastNameComparison = a.lastName.localeCompare(b.lastName);
        if (lastNameComparison !== 0) return lastNameComparison;
        return a.firstName.localeCompare(b.firstName);
    });
};

// Raggruppa per lettera iniziale del Cognome
export const groupContactsByLetter = (contacts: Contact[]): Record<string, Contact[]> => {
    return contacts.reduce((groups, contact) => {
        const letter = contact.lastName.charAt(0).toUpperCase();
        if (!groups[letter]) {
            groups[letter] = [];
        }
        groups[letter].push(contact);
        return groups;
    }, {} as Record<string, Contact[]>);
};
