import React from 'react';
import { GROUPS } from '../utils';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;

    selectedGroup: string;
    onGroupChange: (group: string) => void;

    tagFilter: string;
    onTagChange: (tag: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
    value, onChange,
    selectedGroup, onGroupChange,
    tagFilter, onTagChange
}) => {
    return (
        <div style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
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
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <select
                    value={selectedGroup}
                    onChange={(e) => onGroupChange(e.target.value)}
                    style={{
                        padding: '0.8rem',
                        borderRadius: '20px',
                        border: '1px solid #ccc',
                        flex: 1
                    }}
                >
                    <option value="">Tutti i gruppi</option>
                    {GROUPS.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
                <input
                    type="text"
                    placeholder="Filtra per tag..."
                    value={tagFilter}
                    onChange={(e) => onTagChange(e.target.value)}
                    style={{
                        padding: '0.8rem',
                        borderRadius: '20px',
                        border: '1px solid #ccc',
                        flex: 1
                    }}
                />
            </div>
        </div>
    );
};

export default SearchBar;
