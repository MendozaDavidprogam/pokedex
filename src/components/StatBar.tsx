import React from 'react';

interface StatBarProps {
  name: string;
  value: number;
  color: string;
}

const StatBar: React.FC<StatBarProps> = ({ name, value, color }) => {
  const percent = Math.min((value / 150) * 100, 100);

  const formatStatName = (name: string) => {
    const map: Record<string, string> = {
      hp: 'HP',
      attack: 'Attack',
      defense: 'Defense',
      'special-attack': 'Sp. Atk',
      'special-defense': 'Sp. Def',
      speed: 'Speed',
    };
    return map[name] || name;
  };

  return (
    <div className="stat-row">
      <span className="stat-name">{formatStatName(name)}</span>
      <div className="stat-bar-container">
        <div
          className="stat-bar-fill"
          style={{
            width: `${percent}%`,
            backgroundColor: color,
          }}
        />
      </div>
      <span className="stat-value">{value}</span>
    </div>
  );
};

export default StatBar;
