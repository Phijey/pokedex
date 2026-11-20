import { useMemo, useState } from 'react'
import TrainerCard from './TrainerCard'
import SearchBar from './SearchBar'
import EmptyState from './EmptyState'
import { buildTeam } from '../utils/trainers'
import '../css/Trainers.css'

const ORDERS = [
  { id: 'id', label: 'ordem original' },
  { id: 'name', label: 'nome' },
  { id: 'badges', label: 'insígnias' },
]

const BADGE_FILTERS = [
  { id: 'all', label: 'todos' },
  { id: 'with', label: 'com insígnias' },
  { id: 'without', label: 'sem insígnias' },
]

function Trainers({ trainers, pokemonById, onSelectPokemon, initialQuery = '' }) {
  const [order, setOrder] = useState('id')
  const [query, setQuery] = useState(initialQuery)
  const [badgeFilter, setBadgeFilter] = useState('all')

  const sorted = useMemo(() => {
    const term = query.trim().toLowerCase()
    const filtered = trainers.filter((trainer) => {
      if (badgeFilter === 'with' && trainer.badges === 0) return false
      if (badgeFilter === 'without' && trainer.badges > 0) return false
      if (!term) return true
      const matchesName = trainer.name.toLowerCase().includes(term)
      const matchesTeam = trainer.pokemonIds.some((id) =>
        pokemonById.get(id)?.name.toLowerCase().includes(term),
      )
      return matchesName || matchesTeam
    })

    const list = [...filtered]
    if (order === 'name') list.sort((a, b) => a.name.localeCompare(b.name))
    if (order === 'badges') list.sort((a, b) => b.badges - a.badges || a.name.localeCompare(b.name))
    return list
  }, [trainers, pokemonById, query, badgeFilter, order])

  function resetTrainerFilters() {
    setQuery('')
    setBadgeFilter('all')
  }

  return (
    <section className="trainers">
      <div className="trainers__intro">
        <p>
          Treinadores encontrados durante a expedição, suas insígnias e os Pokémon que os acompanham.
          <span> Clique em um Pokémon para abrir a ficha.</span>
        </p>
        <div className="trainers__order" role="group" aria-label="Ordenar treinadores">
          {ORDERS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`chip ${order === item.id ? 'chip--on' : ''}`}
              onClick={() => setOrder(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="trainers__toolbar">
        <SearchBar value={query} onChange={setQuery} />
        <div className="trainers__order" role="group" aria-label="Filtrar por insígnias">
          {BADGE_FILTERS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`chip ${badgeFilter === item.id ? 'chip--on' : ''}`}
              onClick={() => setBadgeFilter(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {sorted.length === 0 ? (
        <EmptyState query={query} onReset={resetTrainerFilters} />
      ) : (
        <div className="trainers__grid">
          {sorted.map((trainer) => (
            <TrainerCard
              key={trainer.id}
              trainer={trainer}
              team={buildTeam(trainer.pokemonIds, pokemonById)}
              onSelectPokemon={onSelectPokemon}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default Trainers
