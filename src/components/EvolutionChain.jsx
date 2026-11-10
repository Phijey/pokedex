import { getEvolutionStages } from '../data/evolutions'
import { formatId } from '../utils/stats'
import { getSprite, handleImageError } from '../utils/pokemonImage'
import { getPrimaryColor } from '../utils/typeColors'

// Diagrama de linha evolutiva desenhado no caderno.
// Clicar em outra fase da evolução abre diretamente a ficha daquele Pokémon.
function EvolutionChain({ pokemonId, pokemonById, onSelectPokemon }) {
  const stages = getEvolutionStages(pokemonId, pokemonById)
  if (stages.length <= 1) return null

  return (
    <div className="evo-chain">
      <h3 className="journal__section-title">Linha evolutiva</h3>
      <div className="evo-chain__stages">
        {stages.map((stagePokemons, stageIndex) => (
          <div key={stageIndex} className="evo-chain__step">
            {stageIndex > 0 && (
              <span className="evo-chain__arrow" aria-hidden="true">
                →
              </span>
            )}
            <div className="evo-chain__branch">
              {stagePokemons.map((member) => {
                const isCurrent = member.id === pokemonId
                const InteractiveTag = !isCurrent && onSelectPokemon ? 'button' : 'div'
                return (
                  <InteractiveTag
                    key={member.id}
                    type={!isCurrent && onSelectPokemon ? 'button' : undefined}
                    className={`evo-chain__node ${isCurrent ? 'evo-chain__node--current' : ''}`}
                    style={{ '--type-color': getPrimaryColor(member) }}
                    onClick={!isCurrent && onSelectPokemon ? () => onSelectPokemon(member.id) : undefined}
                    title={!isCurrent && onSelectPokemon ? `Ir para ${member.name}` : member.name}
                  >
                    <img
                      src={getSprite(member.id)}
                      alt=""
                      data-id={member.id}
                      data-fallback="sprite"
                      loading="lazy"
                      onError={handleImageError}
                    />
                    <span className="evo-chain__id">#{formatId(member.id)}</span>
                    <span className="evo-chain__name">{member.name}</span>
                  </InteractiveTag>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EvolutionChain
