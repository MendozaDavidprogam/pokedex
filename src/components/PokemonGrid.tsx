import React from 'react';
import type { PokemonListItem } from '../types/pokemon';

interface PokemonGridProps {
  list: PokemonListItem[];
  onSelect: (name: string) => void;
  selectedName: string;
  loading: boolean;
}

const getIdFromUrl = (url: string): string => {
  const parts = url.split('/').filter(Boolean);
  return String(parts[parts.length - 1]).padStart(3, '0');
};

const PokemonGrid: React.FC<PokemonGridProps> = ({ list, onSelect, selectedName, loading }) => {
  if (loading) {
    return (
      <div className="list-loading">
        <div className="pokeball-spin" />
      </div>
    );
  }

  return (
    <ul className="pokemon-list">
      {list.map((p) => {
        const id = getIdFromUrl(p.url);
        const isSelected = p.name === selectedName;
        return (
          <li
            key={p.name}
            className={`pokemon-list-item ${isSelected ? 'selected' : ''}`}
            onClick={() => onSelect(p.name)}
          >
            <img
              className="list-sprite"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${parseInt(id)}.png`}
              alt={p.name}
              loading="lazy"
            />
            <div className="list-info">
              <span className="list-number">#{id}</span>
              <span className="list-name">{p.name}</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default PokemonGrid;
