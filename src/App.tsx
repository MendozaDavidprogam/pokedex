import { usePokemon } from './hooks/usePokemon';
import PokemonCard from './components/PokemonCard';
import PokemonGrid from './components/PokemonGrid';
import SearchBar from './components/SearchBar';
import './App.css';

function App() {
  const {
    pokemonList,
    selectedPokemon,
    habitat,
    evolutions,
    loading,
    listLoading,
    searchQuery,
    setSearchQuery,
    fetchPokemon,
  } = usePokemon();

  return (
    <div className="app">

      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-dot" />
            <span className="logo-text">Pokédex</span>
          </div>
          <p className="logo-sub">Gen I · 151 Pokémon</p>
        </div>
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <PokemonGrid
          list={pokemonList}
          onSelect={fetchPokemon}
          selectedName={selectedPokemon?.name || ''}
          loading={listLoading}
        />
      </aside>


      <main className="main-content">
        {selectedPokemon ? (
          <PokemonCard
            pokemon={selectedPokemon}
            habitat={habitat}
            evolutions={evolutions}
            loading={loading}
            onSelectEvolution={fetchPokemon}
          />
        ) : (
          <div className="empty-state">
            <div className="pokeball-spin large" />
            <p>Cargando Pokédex...</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
