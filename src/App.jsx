import { useMemo, useState } from 'react'
import data from './data/pokedex-data.json'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import TypeFilter from './components/TypeFilter'
import PokemonList from './components/PokemonList'
import PokemonDetails from './components/PokemonDetails'
import Trainers from './components/Trainers'
import { matchesQuery, matchesType } from './utils/filters'
import './css/App.css'

const TABS = [
  { id: 'pokedex', label: 'Espécimes', icon: '❦' },
  { id: 'trainers', label: 'Treinadores', icon: '✦' },
]

const POKEMON_BY_ID = new Map(data.pokemon.map((p) => [p.id, p]))

// Apenas os tipos que aparecem em pelo menos um Pokémon
const AVAILABLE_TYPES = data.types.filter((type) =>
  data.pokemon.some((p) => (type.name === 'Typeless' ? p.types.length === 0 : p.types.some((t) => t.id === type.id))),
)

function App() {
  const [view, setView] = useState('pokedex')
  const [query, setQuery] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedId, setSelectedId] = useState(null)

  const filtered = useMemo(
    () => data.pokemon.filter((p) => matchesQuery(p, query) && matchesType(p, selectedType)),
    [query, selectedType],
  )

  const selected = POKEMON_BY_ID.get(selectedId)
  const owners = selected ? data.trainers.filter((t) => t.pokemonIds.includes(selected.id)) : []

  // Navegação anterior/próximo dentro da lista atualmente exibida
  const navList = filtered.some((p) => p.id === selectedId) ? filtered : data.pokemon
  const position = navList.findIndex((p) => p.id === selectedId)
  const prev = position > 0 ? navList[position - 1] : null
  const next = position >= 0 && position < navList.length - 1 ? navList[position + 1] : null

  function resetFilters() {
    setQuery('')
    setSelectedType('all')
  }

  return (
    <div className="app">
      <Header tabs={TABS} view={view} onViewChange={setView} total={data.pokemon.length} />

      {view === 'trainers' ? (
        <main>
          <Trainers trainers={data.trainers} pokemonById={POKEMON_BY_ID} onSelectPokemon={setSelectedId} />
        </main>
      ) : (
        <main>
          <div className="toolbar">
            <SearchBar value={query} onChange={setQuery} />
          </div>
          <TypeFilter types={AVAILABLE_TYPES} selected={selectedType} onSelect={setSelectedType} />

          <p className="result-count">
            Exibindo <strong>{filtered.length}</strong> de {data.pokemon.length} espécimes
          </p>
          <PokemonList pokemons={filtered} onSelect={setSelectedId} query={query} onReset={resetFilters} />
        </main>
      )}

      {selected && (
        <PokemonDetails
          pokemon={selected}
          owners={owners}
          onClose={() => setSelectedId(null)}
          onPrev={prev ? () => setSelectedId(prev.id) : null}
          onNext={next ? () => setSelectedId(next.id) : null}
        />
      )}
    </div>
  )
}

export default App
