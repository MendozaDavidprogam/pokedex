import { useState, useEffect, useCallback } from 'react';
import type { Pokemon, PokemonSpecies, EvolutionChain, EvolutionLink, PokemonListItem } from '../types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

const extractEvolutions = (chain: EvolutionLink): string[] => {
  const evolutions: string[] = [chain.species.name];
  if (chain.evolves_to.length > 0) {
    evolutions.push(...extractEvolutions(chain.evolves_to[0]));
  }
  return evolutions;
};

export const usePokemon = () => {
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [habitat, setHabitat] = useState<string>('');
  const [evolutions, setEvolutions] = useState<{ name: string; sprite: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchList = async () => {
      try {
        const res = await fetch(`${BASE_URL}/pokemon?limit=151`);
        const data = await res.json();
        setPokemonList(data.results);
        fetchPokemon(data.results[0].name);
      } catch (e) {
        console.error(e);
      } finally {
        setListLoading(false);
      }
    };
    fetchList();
  }, []);

  const fetchPokemon = useCallback(async (nameOrId: string | number) => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);
      if (!res.ok) return;
      const data: Pokemon = await res.json();
      setSelectedPokemon(data);

      const speciesRes = await fetch(`${BASE_URL}/pokemon-species/${data.id}`);
      const speciesData: PokemonSpecies = await speciesRes.json();
      setHabitat(speciesData.habitat?.name || 'unknown');

      if (speciesData.evolution_chain?.url) {
        const evoRes = await fetch(speciesData.evolution_chain.url);
        const evoData: EvolutionChain = await evoRes.json();
        const evoNames = extractEvolutions(evoData.chain);

        const evoDetails = await Promise.all(
          evoNames.map(async (name) => {
            const r = await fetch(`${BASE_URL}/pokemon/${name}`);
            const d = await r.json();
            return {
              name,
              sprite: d.sprites.front_default,
            };
          })
        );
        setEvolutions(evoDetails);
      } else {
        setEvolutions([]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const filteredList = pokemonList.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return {
    pokemonList: filteredList,
    selectedPokemon,
    habitat,
    evolutions,
    loading,
    listLoading,
    searchQuery,
    setSearchQuery,
    fetchPokemon,
  };
};
