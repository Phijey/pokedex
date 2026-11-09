import { useMemo, useState } from 'react'
import data from './data/pokedex-data.json'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import TypeFilter from './components/TypeFilter'
import PokemonList from './components/PokemonList'
import { matchesQuery, matchesType } from './utils/filters'
import './css/App.css'

const TABS = [{ id: 'pokedex', label: 'Espécimes', icon: '❦' }]

// Apenas os tipos que aparecem em pelo menos um Pokémon
const AVAILABLE_TYPES = data.types.filter((type) =>
  data.pokemon.some((p) => (type.name === 'Typeless' ? p.types.length === 0 : p.types.some((t) => t.id === type.id))),
)

function App() {
  const [view, setView] = useState('pokedex')
  const [query, setQuery] = useState('')
  const [selectedType, setSelectedType] = useState('all')

  const filtered = useMemo(
    () => data.pokemon.filter((p) => matchesQuery(p, query) && matchesType(p, selectedType)),
    [query, selectedType],
  )

  function resetFilters() {
    setQuery('')
    setSelectedType('all')
  }

  return (
    <div className="app">
      <Header tabs={TABS} view={view} onViewChange={setView} total={data.pokemon.length} />

      <main>
        <div className="toolbar">
          <SearchBar value={query} onChange={setQuery} />
        </div>
        <TypeFilter types={AVAILABLE_TYPES} selected={selectedType} onSelect={setSelectedType} />

        <p className="result-count">
          Exibindo <strong>{filtered.length}</strong> de {data.pokemon.length} espécimes
        </p>
        <PokemonList pokemons={filtered} onSelect={() => {}} query={query} onReset={resetFilters} />
      </main>
    </div>
  )
}

export default App
