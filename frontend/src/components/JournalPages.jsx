import TypeStamp from './TypeStamp'
import TypeWeaknesses from './TypeWeaknesses'
import EvolutionChain from './EvolutionChain'
import StatBar from './StatBar'
import StatRadar from './StatRadar'
import NotePad from './NotePad'
import Scribble from './Scribble'
import { usePokemonExtra } from '../hooks/usePokemonExtra'
import { STATS, formatId, getExtremes, totalStats } from '../utils/stats'
import { getPrimaryColor } from '../utils/typeColors'
import { getArtwork, handleImageError } from '../utils/pokemonImage'

// Página esquerda do caderno: foto, nome, tipos, reações, evolução e notas de campo
export function LeftPage({ pokemon, owners, pokemonById, onSelectPokemon, onSelectTrainer, isFavorite, onToggleFavorite }) {
  const extra = usePokemonExtra(pokemon.id)

  return (
    <section className="journal__page journal__page--left">
      <div className="journal__heading">
        <span className="journal__number">Nº {formatId(pokemon.id)}</span>
        {onToggleFavorite && (
          <button
            type="button"
            className={`icon-btn icon-btn--fav ${isFavorite ? 'icon-btn--on' : ''}`}
            onClick={() => onToggleFavorite(pokemon.id)}
            title={isFavorite ? 'Remover dos favoritos' : 'Marcar como favorito'}
          >
            {isFavorite ? '★' : '☆'}
          </button>
        )}
      </div>

      <div className="journal__photo">
        <span className="journal__tape journal__tape--a" />
        <span className="journal__tape journal__tape--b" />
        <img src={getArtwork(pokemon.id)} alt={pokemon.name} data-id={pokemon.id} onError={handleImageError} />
      </div>

      <h2 className="journal__name">{pokemon.name}</h2>
      {extra.data?.genus && <p className="journal__genus">{extra.data.genus}</p>}

      <div className="journal__types">
        {pokemon.types.length === 0 ? (
          <TypeStamp name="Typeless" />
        ) : (
          pokemon.types.map((type) => <TypeStamp key={type.id} name={type.name} />)
        )}
      </div>

      <div className="field-notes">
        <h3>Notas de campo</h3>
        {extra.status === 'loading' && <p className="field-notes__muted">consultando arquivos...</p>}
        {extra.status === 'error' && (
          <p className="field-notes__muted">Sem conexão com a PokéAPI — exibindo apenas os dados locais.</p>
        )}
        {extra.status === 'done' && (
          <>
            <dl className="field-notes__measures">
              <div>
                <dt>altura</dt>
                <dd>{extra.data.height.toFixed(1)} m</dd>
              </div>
              <div>
                <dt>peso</dt>
                <dd>{extra.data.weight.toFixed(1)} kg</dd>
              </div>
            </dl>
            {extra.data.flavor && <blockquote lang="en">“{extra.data.flavor}”</blockquote>}
          </>
        )}
      </div>

      <TypeWeaknesses types={pokemon.types} />

      <EvolutionChain pokemonId={pokemon.id} pokemonById={pokemonById} onSelectPokemon={onSelectPokemon} />

      {owners && owners.length > 0 && (
        <div className="journal__owners">
          <span>visto com:</span>
          {owners.map((trainer) =>
            onSelectTrainer ? (
              <button
                key={trainer.id}
                type="button"
                className="journal__owner-btn"
                onClick={() => onSelectTrainer(trainer.name)}
                title={`Ver ficha de ${trainer.name}`}
              >
                {trainer.name}
              </button>
            ) : (
              <em key={trainer.id}>{trainer.name}</em>
            ),
          )}
        </div>
      )}
    </section>
  )
}

// Página direita do caderno: medições, marcações à mão, anotações e navegação
export function RightPage({ pokemon, note, onSaveNote, onPrev, onNext }) {
  const color = getPrimaryColor(pokemon)
  const { strongest, weakest } = getExtremes(pokemon)

  return (
    <section className="journal__page journal__page--right">
      <h3 className="journal__section-title">Medições</h3>
      <StatRadar series={[{ stats: pokemon.stats, color, label: pokemon.name }]} />

      <div className="journal__stats">
        {STATS.map((stat) => {
          const bar = <StatBar label={stat.label} value={pokemon.stats[stat.key]} color={color} />
          if (stat.key === strongest) {
            return (
              <Scribble key={stat.key} variant="circle" label="ponto forte!" color="var(--margin)" delay={500}>
                {bar}
              </Scribble>
            )
          }
          if (stat.key === weakest) {
            return (
              <Scribble key={stat.key} variant="underline" label="ponto fraco" color="var(--accent)" delay={900}>
                {bar}
              </Scribble>
            )
          }
          return <div key={stat.key}>{bar}</div>
        })}
      </div>

      <p className="journal__total">
        total de atributos <strong>{totalStats(pokemon)}</strong>
      </p>

      {onSaveNote && (
        <NotePad
          key={pokemon.id}
          pokemonName={pokemon.name}
          value={note ?? ''}
          onSave={(text) => onSaveNote(pokemon.id, text)}
        />
      )}

      <nav className="journal__nav">
        <button type="button" className="btn" onClick={onPrev} disabled={!onPrev}>
          ← anterior
        </button>
        <button type="button" className="btn" onClick={onNext} disabled={!onNext}>
          próximo →
        </button>
      </nav>
    </section>
  )
}
