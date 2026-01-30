import React from 'react';

interface AlphabetSidebarProps {
    availableLetters: string[];
    onLetterClick: (letter: string) => void;
}

const AlphabetSidebar: React.FC<AlphabetSidebarProps> = ({ availableLetters, onLetterClick }) => {
    // Generiamo l'alfabeto completo per mostrare sempre tutte le lettere (opzionale),
    // ma qui mostriamo solo quelle disponibili o l'intero alfabeto disabilitando quelle vuote?
    // Per semplicità, mostriamo tutte le lettere A-Z e evidenziamo/abilitiamo quelle presenti.
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    return (
        <div className="alphabet-sidebar">
            {alphabet.map((letter) => {
                const isAvailable = availableLetters.includes(letter);
                return (
                    <button
                        key={letter}
                        onClick={() => isAvailable && onLetterClick(letter)}
                        disabled={!isAvailable}
                        className={`alphabet-letter ${isAvailable ? 'available' : 'disabled'}`}
                    >
                        {letter}
                    </button>
                );
            })}
        </div>
    );
};

export default AlphabetSidebar;
