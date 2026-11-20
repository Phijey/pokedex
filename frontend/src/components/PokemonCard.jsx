import TypeStamp from './TypeStamp'
import StatBar from './StatBar'
import { STATS, formatId, totalStats } from '../utils/stats'
import { getPrimaryColor } from '../utils/typeColors'
import { getArtwork, handleImageError } from '../utils/pokemonImage'
import '../css/PokemonCard.css'

function PokemonCard({
  pokemon,
  onSelect,
  isFavorite,
  onToggleFavorite,
  isComparing,
  onToggleCompare,
  isInTeam,
  teamFull,
  onToggleTeam,
  note,
}) {
  const color = getPrimaryColor(pokemon)

  function handleFavorite(event) {
    event.stopPropagation()
    onToggleFavorite(pokemon.id)
  }

  function handleCompare(event) {
    event.stopPropagation()
    onToggleCompare(pokemon.id)
  }

  function handleTeam(event) {
    event.stopPropagation()
    onToggleTeam(pokemon.id)
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onSelect(pokemon.id)
    }
  }

  return (
    <article
      className={`specimen ${isComparing ? 'specimen--comparing' : ''}`}
      style={{ '--type-color': color }}
      onClick={() => onSelect(pokemon.id)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label={`Ver detalhes de ${pokemon.name}`}
    >
      <header className="specimen__top">
        <span className="specimen__number">Nº {formatId(pokemon.id)}</span>
        <div className="specimen__actions">
          {onToggleTeam && (
            <button
              type="button"
              className={`icon-btn ${isInTeam ? 'icon-btn--on' : ''}`}
              onClick={handleTeam}
              disabled={!isInTeam && teamFull}
              title={
                isInTeam
                  ? 'Remover da equipe de expedição'
                  : teamFull
                    ? 'Equipe de expedição cheia (máx. 6)'
                    : 'Recrutar para a equipe de expedição'
              }
            >
              ⚑
            </button>
          )}
          {onToggleCompare && (
            <button
              type="button"
              className={`icon-btn ${isComparing ? 'icon-btn--on' : ''}`}
              onClick={handleCompare}
              title={isComparing ? 'Remover da comparação' : 'Adicionar à comparação'}
            >
              ⇄
            </button>
          )}
          {onToggleFavorite && (
            <button
              type="button"
              className={`icon-btn icon-btn--fav ${isFavorite ? 'icon-btn--on' : ''}`}
              onClick={handleFavorite}
              title={isFavorite ? 'Remover dos favoritos' : 'Marcar como favorito'}
            >
              {isFavorite ? '★' : '☆'}
            </button>
          )}
        </div>
      </header>

      <div className="specimen__photo">
        <span className="specimen__tape" />
        <img
          src={getArtwork(pokemon.id)}
          alt={pokemon.name}
          data-id={pokemon.id}
          loading="lazy"
          onError={handleImageError}
        />
      </div>

      <h3 className="specimen__name">{pokemon.name}</h3>

      <div className="specimen__types">
        {pokemon.types.length === 0 ? (
          <TypeStamp name="Typeless" small />
        ) : (
          pokemon.types.map((type) => <TypeStamp key={type.id} name={type.name} small />)
        )}
      </div>

      <div className="specimen__stats">
        {STATS.map((stat) => (
          <StatBar key={stat.key} label={stat.short} value={pokemon.stats[stat.key]} color={color} compact />
        ))}
      </div>

      <footer className="specimen__footer">
        {note ? (
          <span className="specimen__note" title={note}>
            ✎ {note}
          </span>
        ) : (
          <span>total</span>
        )}
        <strong>{totalStats(pokemon)}</strong>
      </footer>
    </article>
  )
}

export default PokemonCard
