import PokemonCard from './PokemonCard'
import EmptyState from './EmptyState'
import { MAX_TEAM_SIZE } from '../hooks/useTeam'
import '../css/PokemonList.css'

function PokemonList({
  pokemons,
  onSelect,
  favorites,
  onToggleFavorite,
  compareIds,
  onToggleCompare,
  teamIds,
  onToggleTeam,
  notes,
  query,
  onReset,
}) {
  if (pokemons.length === 0) {
    return <EmptyState query={query} onReset={onReset} />
  }

  const teamFull = (teamIds?.length ?? 0) >= MAX_TEAM_SIZE

  return (
    <section className="specimen-grid">
      {pokemons.map((pokemon, index) => (
        <div key={pokemon.id} className="specimen-grid__item" style={{ '--i': index % 12 }}>
          <PokemonCard
            pokemon={pokemon}
            onSelect={onSelect}
            isFavorite={favorites?.includes(pokemon.id)}
            onToggleFavorite={onToggleFavorite}
            isComparing={compareIds?.includes(pokemon.id)}
            onToggleCompare={onToggleCompare}
            isInTeam={teamIds?.includes(pokemon.id)}
            teamFull={teamFull}
            onToggleTeam={onToggleTeam}
            note={notes?.[pokemon.id]}
          />
        </div>
      ))}
    </section>
  )
}

export default PokemonList
