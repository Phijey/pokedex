import { getSprite, handleImageError } from '../utils/pokemonImage'
import { getPrimaryColor } from '../utils/typeColors'
import '../css/Compare.css'

// Bandeja fixa no rodapé com os Pokémon escolhidos para comparação
function CompareTray({ pokemons, onRemove, onClear, onCompare }) {
  if (pokemons.length === 0) return null

  const slots = [pokemons[0], pokemons[1]]

  return (
    <aside className="compare-tray" aria-label="Comparação">
      <span className="compare-tray__title">comparar</span>

      <div className="compare-tray__slots">
        {slots.map((pokemon, index) =>
          pokemon ? (
            <div key={pokemon.id} className="compare-tray__slot" style={{ '--type-color': getPrimaryColor(pokemon) }}>
              <img src={getSprite(pokemon.id)} alt="" data-id={pokemon.id} data-fallback="sprite" onError={handleImageError} />
              <span>{pokemon.name}</span>
              <button type="button" onClick={() => onRemove(pokemon.id)} aria-label={`Remover ${pokemon.name}`}>
                ×
              </button>
            </div>
          ) : (
            <div key={`empty-${index}`} className="compare-tray__slot compare-tray__slot--empty">
              escolha outro com ⇄
            </div>
          ),
        )}
      </div>

      <div className="compare-tray__actions">
        <button type="button" className="btn" onClick={onCompare} disabled={pokemons.length < 2}>
          Comparar
        </button>
        <button type="button" className="chip" onClick={onClear}>
          limpar
        </button>
      </div>
    </aside>
  )
}

export default CompareTray
