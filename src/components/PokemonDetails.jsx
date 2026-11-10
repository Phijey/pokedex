import { useEffect, useState } from 'react'
import { LeftPage, RightPage } from './JournalPages'
import { getPrimaryColor } from '../utils/typeColors'
import '../css/PokemonDetails.css'

const TURN_DURATION = 850

function PokemonDetails({
  pokemon,
  owners,
  pokemonById,
  onSelectPokemon,
  getOwners,
  onClose,
  onPrev,
  onNext,
  isFavorite,
  onToggleFavorite,
  notes,
  onSaveNote,
}) {
  // turn = { dir: 'next' | 'prev', from: pokemon anterior } enquanto a folha está virando
  const [turn, setTurn] = useState(null)

  function goTo(dir) {
    const navigate = dir === 'next' ? onNext : onPrev
    if (!navigate || turn) return
    // em telas estreitas o caderno tem uma só página, então não há folha para virar
    const singlePage = window.matchMedia('(max-width: 820px)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!singlePage && !reduced) setTurn({ dir, from: pokemon })
    navigate()
  }

  function jumpToPokemon(targetId) {
    if (!onSelectPokemon || targetId === pokemon.id || turn) return
    const dir = targetId > pokemon.id ? 'next' : 'prev'
    const singlePage = window.matchMedia('(max-width: 820px)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!singlePage && !reduced) setTurn({ dir, from: pokemon })
    onSelectPokemon(targetId)
  }

  // Ao fim da animação a folha "pousa" e deixa de existir
  useEffect(() => {
    if (!turn) return undefined
    const timer = setTimeout(() => setTurn(null), TURN_DURATION)
    return () => clearTimeout(timer)
  }, [turn])

  // Fecha com ESC, navega com as setas e trava a rolagem da página de fundo
  useEffect(() => {
    function handleKey(event) {
      if (event.target.tagName === 'TEXTAREA') return
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') goTo('prev')
      if (event.key === 'ArrowRight') goTo('next')
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  })

  // Durante a virada, o lado que ainda não foi coberto continua mostrando o Pokémon anterior
  const leftPokemon = turn?.dir === 'next' ? turn.from : pokemon
  const rightPokemon = turn?.dir === 'prev' ? turn.from : pokemon

  function renderLeft(target, interactive) {
    return (
      <LeftPage
        key={target.id}
        pokemon={target}
        owners={target.id === pokemon.id ? owners : getOwners(target.id)}
        pokemonById={pokemonById}
        onSelectPokemon={interactive ? jumpToPokemon : undefined}
        isFavorite={interactive ? isFavorite : false}
        onToggleFavorite={interactive ? onToggleFavorite : undefined}
      />
    )
  }

  function renderRight(target, interactive) {
    return (
      <RightPage
        key={target.id}
        pokemon={target}
        note={notes?.[target.id]}
        onSaveNote={onSaveNote}
        onPrev={interactive && onPrev ? () => goTo('prev') : null}
        onNext={interactive && onNext ? () => goTo('next') : null}
      />
    )
  }

  return (
    <div className="overlay" onClick={onClose}>
      <article
        className="journal"
        style={{ '--type-color': getPrimaryColor(pokemon) }}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`Detalhes de ${pokemon.name}`}
      >
        <button type="button" className="journal__close" onClick={onClose} aria-label="Fechar">
          ×
        </button>

        {renderLeft(leftPokemon, leftPokemon.id === pokemon.id)}
        {renderRight(rightPokemon, rightPokemon.id === pokemon.id)}

        {turn && (
          <div className={`leaf leaf--${turn.dir}`} aria-hidden="true">
            <div className="leaf__face leaf__face--front" style={{ '--type-color': getPrimaryColor(turn.from) }}>
              {turn.dir === 'next' ? renderRight(turn.from, false) : renderLeft(turn.from, false)}
            </div>
            <div className="leaf__face leaf__face--back">
              {turn.dir === 'next' ? renderLeft(pokemon, false) : renderRight(pokemon, false)}
            </div>
          </div>
        )}
      </article>
    </div>
  )
}

export default PokemonDetails
