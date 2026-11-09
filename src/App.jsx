import { useMemo, useState } from 'react'
import data from './data/pokedex-data.json'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import TypeFilter from './components/TypeFilter'
import SortSelect from './components/SortSelect'
import PokemonList from './components/PokemonList'
import PokemonDetails from './components/PokemonDetails'
import Trainers from './components/Trainers'
import CompareTray from './components/CompareTray'
import CompareModal from './components/CompareModal'
import { useFavorites } from './hooks/useFavorites'
import { matchesQuery, matchesType, sortPokemons } from './utils/filters'
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
  const [sortBy, setSortBy] = useState('id')
  const [direction, setDirection] = useState('asc')
  const [onlyFavorites, setOnlyFavorites] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const [compareIds, setCompareIds] = useState([])
  const [comparing, setComparing] = useState(false)
  const { favorites, toggleFavorite } = useFavorites()

  // Estado derivado: lista filtrada e ordenada a partir dos filtros atuais
  const visible = useMemo(() => {
    const filtered = data.pokemon.filter(
      (p) => matchesQuery(p, query) && matchesType(p, selectedType) && (!onlyFavorites || favorites.includes(p.id)),
    )
    return sortPokemons(filtered, sortBy, direction)
  }, [query, selectedType, onlyFavorites, favorites, sortBy, direction])

  const selected = POKEMON_BY_ID.get(selectedId)
  const owners = selected ? data.trainers.filter((t) => t.pokemonIds.includes(selected.id)) : []
  const comparePokemons = compareIds.map((id) => POKEMON_BY_ID.get(id))

  // Navegação anterior/próximo dentro da lista atualmente exibida
  const navList = visible.some((p) => p.id === selectedId) ? visible : data.pokemon
  const position = navList.findIndex((p) => p.id === selectedId)
  const prev = position > 0 ? navList[position - 1] : null
  const next = position >= 0 && position < navList.length - 1 ? navList[position + 1] : null

  function resetFilters() {
    setQuery('')
    setSelectedType('all')
    setOnlyFavorites(false)
  }

  function openRandom() {
    const pool = visible.length > 0 ? visible : data.pokemon
    const random = pool[Math.floor(Math.random() * pool.length)]
    setSelectedId(random.id)
  }

  function toggleCompare(id) {
    setCompareIds((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id)
      return [...current, id].slice(-2)
    })
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
            <SortSelect sortBy={sortBy} direction={direction} onSortChange={setSortBy} onDirectionChange={setDirection} />
            <div className="toolbar__actions">
              <button
                type="button"
                className={`btn ${onlyFavorites ? 'btn--on' : ''}`}
                onClick={() => setOnlyFavorites((value) => !value)}
                aria-pressed={onlyFavorites}
              >
                ★ Favoritos {favorites.length > 0 && `(${favorites.length})`}
              </button>
              <button type="button" className="btn" onClick={openRandom}>
                ⚄ Aleatório
              </button>
            </div>
          </div>
          <TypeFilter types={AVAILABLE_TYPES} selected={selectedType} onSelect={setSelectedType} />

          <p className="result-count">
            Exibindo <strong>{visible.length}</strong> de {data.pokemon.length} espécimes
          </p>
          <PokemonList
            pokemons={visible}
            onSelect={setSelectedId}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            compareIds={compareIds}
            onToggleCompare={toggleCompare}
            query={query}
            onReset={resetFilters}
          />
        </main>
      )}

      <CompareTray
        pokemons={comparePokemons}
        onRemove={toggleCompare}
        onClear={() => setCompareIds([])}
        onCompare={() => setComparing(true)}
      />

      {comparing && comparePokemons.length === 2 && (
        <CompareModal first={comparePokemons[0]} second={comparePokemons[1]} onClose={() => setComparing(false)} />
      )}

      {selected && (
        <PokemonDetails
          pokemon={selected}
          owners={owners}
          onClose={() => setSelectedId(null)}
          onPrev={prev ? () => setSelectedId(prev.id) : null}
          onNext={next ? () => setSelectedId(next.id) : null}
          isFavorite={favorites.includes(selected.id)}
          onToggleFavorite={toggleFavorite}
        />
      )}
    </div>
  )
}

export default App
