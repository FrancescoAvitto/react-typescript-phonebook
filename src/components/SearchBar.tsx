import React from 'react';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
    return (
        <div style={{ marginBottom: '1rem' }}>
            <input
                type="text"
                placeholder="Cerca per nome o numero..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                style={{
                    width: '100%',
                    padding: '0.8rem',
                    fontSize: '1rem',
                    borderRadius: '20px',
                    border: '1px solid #ccc',
                    boxSizing: 'border-box',
                    outline: 'none',
                    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
                }}
            />
        </div>
    );
};

export default SearchBar;
