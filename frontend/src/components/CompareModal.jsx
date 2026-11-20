import { useEffect } from 'react'
import StatRadar from './StatRadar'
import TypeStamp from './TypeStamp'
import { STATS, STAT_SCALE, formatId, totalStats } from '../utils/stats'
import { getPrimaryColor } from '../utils/typeColors'
import { getArtwork, handleImageError } from '../utils/pokemonImage'
import '../css/Compare.css'

const SECOND_COLOR = '#2e4a7a'

function Side({ pokemon, color, wins }) {
  return (
    <div className="versus__side" style={{ '--type-color': color }}>
      <img src={getArtwork(pokemon.id)} alt={pokemon.name} data-id={pokemon.id} onError={handleImageError} />
      <span className="versus__number">Nº {formatId(pokemon.id)}</span>
      <h3>{pokemon.name}</h3>
      <div className="versus__types">
        {(pokemon.types.length ? pokemon.types : [{ id: 0, name: 'Typeless' }]).map((type) => (
          <TypeStamp key={type.id} name={type.name} small />
        ))}
      </div>
      <span className="versus__wins">
        vence em {wins} {wins === 1 ? 'atributo' : 'atributos'}
      </span>
    </div>
  )
}

function CompareModal({ first, second, onClose }) {
  const colorA = getPrimaryColor(first)
  const colorB = getPrimaryColor(second) === colorA ? SECOND_COLOR : getPrimaryColor(second)

  useEffect(() => {
    function handleKey(event) {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const rows = [
    ...STATS.map((stat) => ({ key: stat.key, label: stat.label, a: first.stats[stat.key], b: second.stats[stat.key] })),
    { key: 'total', label: 'Total', a: totalStats(first), b: totalStats(second) },
  ]
  const winsA = rows.filter((row) => row.key !== 'total' && row.a > row.b).length
  const winsB = rows.filter((row) => row.key !== 'total' && row.b > row.a).length

  return (
    <div className="overlay" onClick={onClose}>
      <article className="versus" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Comparação">
        <button type="button" className="journal__close" onClick={onClose} aria-label="Fechar">
          ×
        </button>

        <header className="versus__header">
          <Side pokemon={first} color={colorA} wins={winsA} />
          <span className="versus__vs">vs</span>
          <Side pokemon={second} color={colorB} wins={winsB} />
        </header>

        <div className="versus__body">
          <StatRadar
            series={[
              { stats: first.stats, color: colorA, label: first.name },
              { stats: second.stats, color: colorB, label: second.name },
            ]}
          />

          <table className="versus__table">
            <tbody>
              {rows.map((row) => {
                const scale = row.key === 'total' ? STAT_SCALE * 6 : STAT_SCALE
                return (
                  <tr key={row.key} className={row.key === 'total' ? 'versus__total' : ''}>
                    <td className={row.a > row.b ? 'versus__win' : ''}>{row.a}</td>
                    <td className="versus__bars">
                      <span className="versus__bar versus__bar--a">
                        <i style={{ width: `${Math.min(row.a / scale, 1) * 100}%`, background: colorA }} />
                      </span>
                      <span className="versus__label">{row.label}</span>
                      <span className="versus__bar versus__bar--b">
                        <i style={{ width: `${Math.min(row.b / scale, 1) * 100}%`, background: colorB }} />
                      </span>
                    </td>
                    <td className={row.b > row.a ? 'versus__win' : ''}>{row.b}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </article>
    </div>
  )
}

export default CompareModal
