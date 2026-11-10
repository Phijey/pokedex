import TypeStamp from './TypeStamp'
import { formatMultiplier, getTypeMatchups } from '../utils/typeEffectiveness'

// Exibe fraquezas, resistências e imunidades elementais do espécime no caderno
function TypeWeaknesses({ types }) {
  const { weaknesses, resistances, immunities } = getTypeMatchups(types)

  if (weaknesses.length === 0 && resistances.length === 0 && immunities.length === 0) {
    return null
  }

  return (
    <div className="matchups">
      <h3 className="journal__section-title">Reações elementais</h3>

      {weaknesses.length > 0 && (
        <div className="matchups__group">
          <span className="matchups__label matchups__label--weak">vulnerável a</span>
          <div className="matchups__list">
            {weaknesses.map(({ type, mult }) => (
              <span key={type} className="matchups__item">
                <TypeStamp name={type} small />
                <em className={`matchups__mult ${mult >= 4 ? 'matchups__mult--double' : ''}`}>
                  {formatMultiplier(mult)}
                </em>
              </span>
            ))}
          </div>
        </div>
      )}

      {resistances.length > 0 && (
        <div className="matchups__group">
          <span className="matchups__label matchups__label--resist">resistente a</span>
          <div className="matchups__list">
            {resistances.map(({ type, mult }) => (
              <span key={type} className="matchups__item">
                <TypeStamp name={type} small />
                <em className="matchups__mult">{formatMultiplier(mult)}</em>
              </span>
            ))}
          </div>
        </div>
      )}

      {immunities.length > 0 && (
        <div className="matchups__group">
          <span className="matchups__label matchups__label--immune">imune a</span>
          <div className="matchups__list">
            {immunities.map(({ type, mult }) => (
              <span key={type} className="matchups__item">
                <TypeStamp name={type} small />
                <em className="matchups__mult">{formatMultiplier(mult)}</em>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default TypeWeaknesses
