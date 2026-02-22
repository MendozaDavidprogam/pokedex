import React from 'react';
import type { Pokemon } from '../types/pokemon';
import StatBar from './StatBar';

interface PokemonCardProps {
  pokemon: Pokemon;
  habitat: string;
  evolutions: { name: string; sprite: string }[];
  loading: boolean;
  onSelectEvolution: (name: string) => void;
}

const TYPE_COLORS: Record<string, string> = {
  fire: '#FF6B35',
  water: '#4FC3F7',
  grass: '#66BB6A',
  electric: '#FFCA28',
  psychic: '#EC407A',
  ice: '#80DEEA',
  dragon: '#7C4DFF',
  dark: '#37474F',
  fairy: '#F48FB1',
  normal: '#BDBDBD',
  fighting: '#EF5350',
  flying: '#90CAF9',
  poison: '#AB47BC',
  ground: '#BCAAA4',
  rock: '#8D6E63',
  bug: '#9CCC65',
  ghost: '#7E57C2',
  steel: '#78909C',
};

const STAT_COLORS: Record<string, string> = {
  hp: '#FF6B6B',
  attack: '#FFA726',
  defense: '#42A5F5',
  'special-attack': '#AB47BC',
  'special-defense': '#26A69A',
  speed: '#66BB6A',
};

const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  habitat,
  evolutions,
  loading,
  onSelectEvolution,
}) => {
  const mainType = pokemon.types[0]?.type.name || 'normal';
  const accentColor = TYPE_COLORS[mainType] || '#BDBDBD';
  const sprite =
    pokemon.sprites.other?.['official-artwork']?.front_default ||
    pokemon.sprites.front_default;

  if (loading) {
    return (
      <div className="card-loading">
        <div className="pokeball-spin large" />
      </div>
    );
  }

  return (
    <div className="pokemon-card" style={{ '--accent': accentColor } as React.CSSProperties}>
      {/* Header */}
      <div className="card-header">
        <div className="card-id">#{String(pokemon.id).padStart(3, '0')}</div>
        <div className="card-types">
          {pokemon.types.map((t) => (
            <span
              key={t.type.name}
              className="type-badge"
              style={{ backgroundColor: TYPE_COLORS[t.type.name] || '#aaa' }}
            >
              {t.type.name}
            </span>
          ))}
        </div>
      </div>


      <div className="sprite-container">
        <div className="sprite-glow" style={{ background: accentColor }} />
        <img className="main-sprite" src={sprite} alt={pokemon.name} />
      </div>


      <h1 className="pokemon-name">{pokemon.name}</h1>


      <div className="info-row">
        <div className="info-item">
          <span className="info-label">Altura</span>
          <span className="info-value">{pokemon.height * 10} cm</span>
        </div>
        <div className="info-divider" />
        <div className="info-item">
          <span className="info-label">Peso</span>
          <span className="info-value">{pokemon.weight / 10} kg</span>
        </div>
        <div className="info-divider" />
        <div className="info-item">
          <span className="info-label">Hábitat</span>
          <span className="info-value">{habitat || '—'}</span>
        </div>
      </div>


      <div className="stats-section">
        <h3 className="section-title">Base Stats</h3>
        {pokemon.stats.map((s) => (
          <StatBar
            key={s.stat.name}
            name={s.stat.name}
            value={s.base_stat}
            color={STAT_COLORS[s.stat.name] || accentColor}
          />
        ))}
      </div>


      {evolutions.length > 1 && (
        <div className="evolution-section">
          <h3 className="section-title">Evoluciones</h3>
          <div className="evolution-row">
            {evolutions.map((evo, i) => (
              <React.Fragment key={evo.name}>
                <div
                  className={`evo-item ${evo.name === pokemon.name ? 'current' : ''}`}
                  onClick={() => onSelectEvolution(evo.name)}
                >
                  <img src={evo.sprite} alt={evo.name} className="evo-sprite" />
                  <span className="evo-name">{evo.name}</span>
                </div>
                {i < evolutions.length - 1 && (
                  <svg className="evo-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonCard;
