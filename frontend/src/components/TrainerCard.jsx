import { useState } from 'react'
import { formatId, totalStats } from '../utils/stats'
import { getPrimaryColor } from '../utils/typeColors'
import { getSprite, handleImageError } from '../utils/pokemonImage'
import { getTrainerImage } from '../utils/trainerImage'

function Badge({ index }) {
  return (
    <svg className="badge" viewBox="0 0 24 24" style={{ '--d': `${index * 60}ms` }} aria-hidden="true">
      <path d="M12 2l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 15.4 6.8 18.1l1-5.8L3.5 8.2l5.9-.9z" />
    </svg>
  )
}

function TrainerCard({ trainer, team, onSelectPokemon }) {
  const photo = getTrainerImage(trainer.name)
  const [photoFailed, setPhotoFailed] = useState(false)

  const initials = trainer.name
    .split(/[\s.]+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)

  const average = team.length
    ? Math.round(team.reduce((sum, item) => sum + totalStats(item.pokemon), 0) / team.length)
    : 0

  return (
    <article className="trainer">
      <header className="trainer__header">
        {photo && !photoFailed ? (
          <figure className="trainer__photo">
            <span className="trainer__photo-tape" />
            <img src={photo} alt={`Foto de ${trainer.name}`} loading="lazy" onError={() => setPhotoFailed(true)} />
          </figure>
        ) : (
          <span className="trainer__avatar">{initials}</span>
        )}
        <div>
          <span className="trainer__label">ficha nº {formatId(trainer.id)}</span>
          <h3 className="trainer__name">{trainer.name}</h3>
        </div>
      </header>

      <div className="trainer__badges">
        {trainer.badges > 0 ? (
          <>
            <div className="trainer__badge-row">
              {Array.from({ length: trainer.badges }, (_, i) => (
                <Badge key={i} index={i} />
              ))}
            </div>
            <span>
              {trainer.badges} {trainer.badges === 1 ? 'insígnia' : 'insígnias'}
            </span>
          </>
        ) : (
          <span className="trainer__none">nenhuma insígnia conquistada</span>
        )}
      </div>

      <ul className="trainer__team">
        {team.map(({ pokemon, count }) => (
          <li key={pokemon.id}>
            <button
              type="button"
              className="trainer__pokemon"
              style={{ '--type-color': getPrimaryColor(pokemon) }}
              onClick={() => onSelectPokemon(pokemon.id)}
              title={`Ver ${pokemon.name}`}
            >
              <img
                src={getSprite(pokemon.id)}
                alt=""
                data-id={pokemon.id}
                data-fallback="sprite"
                loading="lazy"
                onError={handleImageError}
              />
              <span>{pokemon.name}</span>
              {count > 1 && <em>×{count}</em>}
            </button>
          </li>
        ))}
      </ul>

      <footer className="trainer__footer">
        <span>{team.length} {team.length === 1 ? 'espécie' : 'espécies'}</span>
        <span>
          média de atributos <strong>{average}</strong>
        </span>
      </footer>
    </article>
  )
}

export default TrainerCard
