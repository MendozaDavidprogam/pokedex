export interface PokemonStat {
  base_stat: number;
  stat: { name: string };
}

export interface PokemonType {
  type: { name: string };
}

export interface PokemonSprite {
  front_default: string;
  other?: {
    'official-artwork'?: {
      front_default: string;
    };
  };
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  stats: PokemonStat[];
  types: PokemonType[];
  sprites: PokemonSprite;
  species_url?: string;
}

export interface PokemonSpecies {
  habitat?: { name: string };
  evolution_chain?: { url: string };
}

export interface EvolutionChain {
  chain: EvolutionLink;
}

export interface EvolutionLink {
  species: { name: string; url: string };
  evolves_to: EvolutionLink[];
}

export interface PokemonListItem {
  name: string;
  url: string;
}
